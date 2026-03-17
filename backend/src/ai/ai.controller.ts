import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiRecommendationDto } from './dto/ai-recommendation.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('recommendations')
  getRecommendations(@Body() dto: AiRecommendationDto) {
    return this.aiService.getRecommendations(dto.query);
  }
}