import { IsOptional, IsString } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  listingId: string;

  @IsOptional()
  @IsString()
  message?: string;
}