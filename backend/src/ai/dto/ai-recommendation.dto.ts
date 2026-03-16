import { IsString, MinLength } from 'class-validator';

export class AiRecommendationDto {
  @IsString()
  @MinLength(3)
  query: string;
}