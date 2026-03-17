import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';

@Injectable()
export class RequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, data: CreateRequestDto) {
    const listing = await this.prisma.listing.findUnique({
      where: { id: data.listingId },
      include: {
        owner: true,
      },
    });

    if (!listing) {
      throw new NotFoundException('Объявление не найдено');
    }

    if (listing.ownerId === userId) {
      throw new BadRequestException('Нельзя отправить заявку на собственное объявление');
    }

    const existingRequest = await this.prisma.request.findFirst({
      where: {
        listingId: data.listingId,
        senderId: userId,
      },
    });

    if (existingRequest) {
      throw new BadRequestException('Вы уже отправляли заявку на это объявление');
    }

    return this.prisma.request.create({
      data: {
        listingId: data.listingId,
        senderId: userId,
        message: data.message,
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
        sender: {
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

  async findMyRequests(userId: string) {
    return this.prisma.request.findMany({
      where: {
        senderId: userId,
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

  async findIncomingRequests(userId: string) {
    return this.prisma.request.findMany({
      where: {
        listing: {
          ownerId: userId,
        },
      },
      include: {
        listing: {
          include: {
            images: {
              orderBy: {
                sortOrder: 'asc',
              },
            },
          },
        },
        sender: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateStatus(userId: string, requestId: string, data: UpdateRequestStatusDto) {
    const request = await this.prisma.request.findUnique({
      where: { id: requestId },
      include: {
        listing: true,
      },
    });

    if (!request) {
      throw new NotFoundException('Заявка не найдена');
    }

    if (request.listing.ownerId !== userId) {
      throw new ForbiddenException('Вы не можете менять статус этой заявки');
    }

    return this.prisma.request.update({
      where: { id: requestId },
      data: {
        status: data.status,
      },
      include: {
        listing: {
          include: {
            images: {
              orderBy: {
                sortOrder: 'asc',
              },
            },
          },
        },
        sender: {
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
}