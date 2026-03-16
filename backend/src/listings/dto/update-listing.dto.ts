import { IsBoolean, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ListingType } from './create-listing.dto';

export class UpdateListingDto {
  @IsString()
  @IsOptional()
  ownerId?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsInt()
  @IsOptional()
  pricePerDay?: number;

  @IsInt()
  @IsOptional()
  capacityTons?: number;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsInt()
  @IsOptional()
  year?: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsEnum(ListingType)
  @IsOptional()
  listingType?: ListingType;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}