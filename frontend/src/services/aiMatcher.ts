import type { Truck } from "../types/truck";

export interface ParsedQuery {
  budget?: number;
  quantity?: number;
  city?: string;
  category?: string;
  minCapacity?: number;
}

const cityList = ["алматы", "астана", "шымкент", "караганда"];

const categoryKeywords: Record<string, string[]> = {
  "Самосвал": ["самосвал", "сыпучие", "стройка", "песок", "щебень"],
  "Фура": ["фура", "дальние рейсы", "межгород", "длинномер"],
  "Тент": ["тент", "тентованный", "мебель", "коробки"],
  "Рефрижератор": ["реф", "рефрижератор", "продукты", "заморозка", "холод"],
  "Бортовой": ["бортовой", "город", "доставка"],
  "Манипулятор": ["манипулятор", "кран", "стройматериалы"],
};

function parseBudget(text: string): number | undefined {
  const normalized = text.toLowerCase().replace(/\s+/g, "");
  const millionMatch = normalized.match(/(\d+)(млн|million)/);
  if (millionMatch) {
    return Number(millionMatch[1]) * 1_000_000;
  }

  const thousandMatch = normalized.match(/(\d+)(тыс|k)/);
  if (thousandMatch) {
    return Number(thousandMatch[1]) * 1_000;
  }

  const tgMatch = normalized.match(/(\d{4,9})\s*(тг|тенге)?/);
  if (tgMatch) {
    return Number(tgMatch[1]);
  }

  return undefined;
}

function parseQuantity(text: string): number | undefined {
  const match = text.toLowerCase().match(/(\d+)\s*(грузовик|грузовика|машин|машины|фуры)/);
  if (match) return Number(match[1]);

  const generalNumber = text.toLowerCase().match(/нужно\s*(\d+)/);
  if (generalNumber) return Number(generalNumber[1]);

  return undefined;
}

function parseCity(text: string): string | undefined {
  const lower = text.toLowerCase();
  return cityList.find((city) => lower.includes(city));
}

function parseCategory(text: string): string | undefined {
  const lower = text.toLowerCase();

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((keyword) => lower.includes(keyword))) {
      return category;
    }
  }

  return undefined;
}

function parseCapacity(text: string): number | undefined {
  const match = text.toLowerCase().match(/(\d+)\s*(тонн|тонна|т)/);
  if (match) return Number(match[1]);
  return undefined;
}

export function parseUserQuery(text: string): ParsedQuery {
  return {
    budget: parseBudget(text),
    quantity: parseQuantity(text),
    city: parseCity(text),
    category: parseCategory(text),
    minCapacity: parseCapacity(text),
  };
}

export function rankTrucksByQuery(text: string, trucks: Truck[]): Truck[] {
  const parsed = parseUserQuery(text);

  const scored = trucks.map((truck) => {
    let score = 0;

    if (truck.available) score += 20;

    if (parsed.city && truck.city.toLowerCase() === parsed.city) {
      score += 20;
    }

    if (parsed.category && truck.category === parsed.category) {
      score += 30;
    }

    if (parsed.minCapacity && truck.capacityTons >= parsed.minCapacity) {
      score += 15;
    }

    if (parsed.budget) {
      if (truck.pricePerDay <= parsed.budget) {
        score += 25;
      } else {
        const diff = truck.pricePerDay - parsed.budget;
        score -= Math.min(20, Math.floor(diff / 10000));
      }
    }

    const lowerText = text.toLowerCase();
    const searchable =
      `${truck.title} ${truck.description} ${truck.features.join(" ")} ${truck.category}`.toLowerCase();

    const words = lowerText.split(" ").filter((word) => word.length > 2);
    const matches = words.filter((word) => searchable.includes(word)).length;
    score += matches * 4;

    return { truck, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .map((item) => item.truck);
}

export function buildAiSummary(text: string, trucks: Truck[]): string {
  const parsed = parseUserQuery(text);
  const top = rankTrucksByQuery(text, trucks).slice(0, parsed.quantity || 3);

  if (!top.length) {
    return "Подходящих вариантов не найдено. Попробуйте изменить запрос.";
  }

  const quantityText = parsed.quantity
    ? `Найдено ${parsed.quantity} подходящих вариантов`
    : "Найдены лучшие варианты";

  const budgetText = parsed.budget
    ? `в пределах бюджета до ${parsed.budget.toLocaleString("ru-RU")} ₸`
    : "по вашему запросу";

  return `${quantityText} ${budgetText}. Сначала показаны самые релевантные предложения.`;
}