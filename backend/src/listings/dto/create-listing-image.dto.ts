import { IsInt, IsString, Min } from 'class-validator';

export class CreateListingImageDto {
  @IsString()
  imageUrl: string;

  @IsInt()
  @Min(1)
  sortOrder: number;
}