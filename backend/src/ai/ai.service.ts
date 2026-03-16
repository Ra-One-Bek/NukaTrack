import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleGenAI, Type } from '@google/genai';

type ParsedAiQuery = {
  budget?: number;
  quantity?: number;
  city?: string;
  category?: string;
  minCapacity?: number;
};

@Injectable()
export class AiService {
  private readonly ai: GoogleGenAI;

  constructor(private readonly prisma: PrismaService) {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  async getRecommendations(query: string) {
    const parsedQuery = await this.parseQueryWithGemini(query);
    const rawListings = await this.searchListings(parsedQuery);
    const rankedListings = this.rankListings(query, parsedQuery, rawListings);
    const limitedResults = rankedListings.slice(
      0,
      parsedQuery.quantity ? Math.max(parsedQuery.quantity, 5) : 5,
    );
    const summary = this.buildSummary(parsedQuery, limitedResults);

    return {
      parsedQuery,
      summary,
      results: limitedResults,
    };
  }

  private async parseQueryWithGemini(query: string): Promise<ParsedAiQuery> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `
Извлеки параметры поиска грузовых объявлений из пользовательского запроса.

Верни ТОЛЬКО JSON.
Не добавляй markdown.
Не добавляй пояснения.
Если поле не найдено, верни null.

Допустимые поля:
- budget: number | null
- quantity: number | null
- city: string | null
- category: string | null
- minCapacity: number | null

Возможные категории:
- Фура
- Самосвал
- Тент
- Рефрижератор
- Бортовой
- Манипулятор

Примеры:
Запрос: "У меня 200000 тг, нужно 2 грузовика для стройки в Алматы"
Ответ:
{
  "budget": 200000,
  "quantity": 2,
  "city": "Алматы",
  "category": "Самосвал",
  "minCapacity": null
}

Запрос пользователя:
${query}
                `.trim(),
              },
            ],
          },
        ],
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              budget: {
                type: Type.NUMBER,
                nullable: true,
              },
              quantity: {
                type: Type.NUMBER,
                nullable: true,
              },
              city: {
                type: Type.STRING,
                nullable: true,
              },
              category: {
                type: Type.STRING,
                nullable: true,
              },
              minCapacity: {
                type: Type.NUMBER,
                nullable: true,
              },
            },
            required: ['budget', 'quantity', 'city', 'category', 'minCapacity'],
          },
        },
      });

      const text = response.text?.trim() ?? '{}';
      const parsed = JSON.parse(text);

      return {
        budget: parsed.budget ?? undefined,
        quantity: parsed.quantity ?? undefined,
        city: parsed.city ?? undefined,
        category: parsed.category ?? undefined,
        minCapacity: parsed.minCapacity ?? undefined,
      };
    } catch {
      return this.fallbackParseQuery(query);
    }
  }

  private fallbackParseQuery(query: string): ParsedAiQuery {
    const lower = query.toLowerCase();

    const cityList = ['алматы', 'астана', 'шымкент', 'караганда'];

    const categoryMap: Record<string, string[]> = {
      Самосвал: ['самосвал', 'стройка', 'щебень', 'песок'],
      Фура: ['фура', 'межгород', 'дальние рейсы'],
      Тент: ['тент', 'тентованный'],
      Рефрижератор: ['реф', 'рефрижератор', 'холод', 'продукты'],
      Бортовой: ['бортовой', 'доставка'],
      Манипулятор: ['манипулятор', 'кран'],
    };

    let budget: number | undefined;
    let quantity: number | undefined;
    let city: string | undefined;
    let category: string | undefined;
    let minCapacity: number | undefined;

    const budgetMatchK = lower.replace(/\s+/g, '').match(/(\d+)(тыс|k)/);
    if (budgetMatchK) {
      budget = Number(budgetMatchK[1]) * 1000;
    }

    const budgetMatchRaw = lower.match(/(\d{5,9})\s*(тг|тенге)?/);
    if (!budget && budgetMatchRaw) {
      budget = Number(budgetMatchRaw[1]);
    }

    const quantityMatch = lower.match(/(\d+)\s*(грузовик|грузовика|машин|машины|фуры)/);
    if (quantityMatch) {
      quantity = Number(quantityMatch[1]);
    }

    city = cityList.find((item) => lower.includes(item));

    for (const [key, keywords] of Object.entries(categoryMap)) {
      if (keywords.some((word) => lower.includes(word))) {
        category = key;
        break;
      }
    }

    const capacityMatch = lower.match(/(\d+)\s*(тонн|тонна|т)/);
    if (capacityMatch) {
      minCapacity = Number(capacityMatch[1]);
    }

    return {
      budget,
      quantity,
      city: city ? city.charAt(0).toUpperCase() + city.slice(1) : undefined,
      category,
      minCapacity,
    };
  }

  private async searchListings(parsed: ParsedAiQuery) {
    return this.prisma.listing.findMany({
      where: {
        isAvailable: true,
        ...(parsed.city
          ? {
              city: {
                equals: parsed.city,
                mode: 'insensitive',
              },
            }
          : {}),
        ...(parsed.category
          ? {
              category: {
                equals: parsed.category,
                mode: 'insensitive',
              },
            }
          : {}),
        ...(parsed.minCapacity
          ? {
              capacityTons: {
                gte: parsed.minCapacity,
              },
            }
          : {}),
      },
      include: {
        images: {
          orderBy: {
            sortOrder: 'asc',
          },
        },
        owner: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
          },
        },
      },
      take: 30,
    });
  }

  private rankListings(query: string, parsed: ParsedAiQuery, listings: any[]) {
    const lowerQuery = query.toLowerCase();

    return listings
      .map((listing) => {
        let score = 0;

        if (listing.isAvailable) score += 20;

        if (listing.listingType === 'VIP') score += 18;

        if (
          parsed.city &&
          listing.city.toLowerCase() === parsed.city.toLowerCase()
        ) {
          score += 20;
        }

        if (
          parsed.category &&
          listing.category.toLowerCase() === parsed.category.toLowerCase()
        ) {
          score += 25;
        }

        if (
          parsed.minCapacity &&
          Number(listing.capacityTons) >= Number(parsed.minCapacity)
        ) {
          score += 15;
        }

        if (parsed.budget) {
          if (listing.pricePerDay <= parsed.budget) {
            score += 25;
          } else {
            const diff = listing.pricePerDay - parsed.budget;
            score -= Math.min(20, Math.floor(diff / 10000));
          }
        }

        const searchable = `
          ${listing.title}
          ${listing.description}
          ${listing.brand}
          ${listing.model}
          ${listing.category}
          ${listing.city}
        `.toLowerCase();

        const words = lowerQuery.split(/\s+/).filter((word) => word.length > 2);
        const matches = words.filter((word) => searchable.includes(word)).length;
        score += matches * 3;

        return {
          ...listing,
          relevanceScore: score,
        };
      })
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  private buildSummary(parsed: ParsedAiQuery, results: any[]) {
    if (!results.length) {
      return 'Подходящие объявления не найдены. Попробуйте изменить запрос или расширить критерии поиска.';
    }

    const parts: string[] = ['Найдены подходящие варианты'];

    if (parsed.city) {
      parts.push(`в городе ${parsed.city}`);
    }

    if (parsed.category) {
      parts.push(`по категории ${parsed.category}`);
    }

    if (parsed.budget) {
      parts.push(`в пределах бюджета до ${parsed.budget} тг`);
    }

    if (parsed.quantity) {
      parts.push(`с учетом запроса на ${parsed.quantity} ед.`);
    }

    const vipCount = results.filter((item) => item.listingType === 'VIP').length;

    if (vipCount > 0) {
      parts.push(`включая ${vipCount} VIP-объявл.`);
    }

    return `${parts.join(' ')}.`;
  }
}