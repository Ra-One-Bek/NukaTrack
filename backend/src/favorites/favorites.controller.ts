import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll(@Req() req: any) {
    return this.favoritesService.findAll(req.user.id);
  }

  @Post(':listingId')
  add(@Req() req: any, @Param('listingId') listingId: string) {
    return this.favoritesService.add(req.user.id, listingId);
  }

  @Delete(':listingId')
  remove(@Req() req: any, @Param('listingId') listingId: string) {
    return this.favoritesService.remove(req.user.id, listingId);
  }
}