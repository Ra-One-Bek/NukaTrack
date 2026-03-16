import { apiFetch } from './client';
import type { AiRecommendationResponse } from '../types/ai';

export async function getAiRecommendations(
  query: string,
): Promise<AiRecommendationResponse> {
  return apiFetch<AiRecommendationResponse>('/ai/recommendations', {
    method: 'POST',
    body: JSON.stringify({ query }),
  });
}