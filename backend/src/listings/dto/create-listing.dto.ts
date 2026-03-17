import { IsBoolean, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export enum ListingType {
  STANDARD = 'STANDARD',
  VIP = 'VIP',
}

export class CreateListingDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  city: string;

  @IsInt()
  pricePerDay: number;

  @IsInt()
  capacityTons: number;

  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsInt()
  year: number;

  @IsString()
  category: string;

  @IsEnum(ListingType)
  @IsOptional()
  listingType?: ListingType;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}