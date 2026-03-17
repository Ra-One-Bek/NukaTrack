import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.favorite.findMany({
      where: {
        userId,
      },
      include: {
        listing: {
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
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async add(userId: string, listingId: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing) {
      throw new NotFoundException('Объявление не найдено');
    }

    const existingFavorite = await this.prisma.favorite.findFirst({
      where: {
        userId,
        listingId,
      },
    });

    if (existingFavorite) {
      throw new BadRequestException('Объявление уже добавлено в избранное');
    }

    return this.prisma.favorite.create({
      data: {
        userId,
        listingId,
      },
      include: {
        listing: {
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
        },
      },
    });
  }

  async remove(userId: string, listingId: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: {
        userId,
        listingId,
      },
    });

    if (!favorite) {
      throw new NotFoundException('Объявление не найдено в избранном');
    }

    await this.prisma.favorite.delete({
      where: {
        id: favorite.id,
      },
    });

    return { message: 'Объявление удалено из избранного' };
  }
}