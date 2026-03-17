import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.listing.findMany({
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
      orderBy: [
        {
          listingType: 'desc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });
  }

  async findOne(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
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
    });

    if (!listing) {
      throw new NotFoundException('Объявление не найдено');
    }

    return listing;
  }

  async create(userId: string, data: CreateListingDto) {
  return this.prisma.listing.create({
    data: {
      ownerId: userId,
      title: data.title,
      description: data.description,
      city: data.city,
      pricePerDay: data.pricePerDay,
      capacityTons: data.capacityTons,
      brand: data.brand,
      model: data.model,
      year: data.year,
      category: data.category,
      listingType: data.listingType ?? 'STANDARD',
      isAvailable: data.isAvailable ?? true,
    },
    include: {
      images: true,
      owner: {
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
        },
      },
    },
  });
}

  async update(id: string, data: UpdateListingDto) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      throw new NotFoundException('Объявление не найдено');
    }

    return this.prisma.listing.update({
      where: { id },
      data: {
        ownerId: data.ownerId,
        title: data.title,
        description: data.description,
        city: data.city,
        pricePerDay: data.pricePerDay,
        capacityTons: data.capacityTons,
        brand: data.brand,
        model: data.model,
        year: data.year,
        category: data.category,
        listingType: data.listingType,
        isAvailable: data.isAvailable,
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
    });
  }

  async remove(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
    });

    if (!listing) {
      throw new NotFoundException('Объявление не найдено');
    }

    await this.prisma.listing.delete({
      where: { id },
    });

    return { message: 'Объявление удалено' };
  }

  async addImage(listingId: string, data: { imageUrl: string; sortOrder: number }) {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
      include: { images: true },
    });

    if (!listing) {
      throw new NotFoundException('Объявление не найдено');
    }

    if (listing.images.length >= 10) {
      throw new BadRequestException('Максимум 10 фото для одного объявления');
    }

    return this.prisma.listingImage.create({
      data: {
        listingId,
        imageUrl: data.imageUrl,
        sortOrder: data.sortOrder,
      },
    });
  }
}