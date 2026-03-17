import type { Listing } from './listing';

export interface ParsedAiQuery {
  budget?: number;
  quantity?: number;
  city?: string;
  category?: string;
  minCapacity?: number;
}

export interface AiRecommendationResponse {
  parsedQuery: ParsedAiQuery;
  summary: string;
  results: Listing[];
}