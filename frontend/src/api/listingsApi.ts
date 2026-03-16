import { apiFetch } from './client';
import type { Listing } from '../types/listing';

export async function getListings(): Promise<Listing[]> {
  return apiFetch<Listing[]>('/listings');
}

export async function getListingById(id: string): Promise<Listing> {
  return apiFetch<Listing>(`/listings/${id}`);
}

export async function createListing(data: {
  title: string;
  description: string;
  city: string;
  pricePerDay: number;
  capacityTons: number;
  brand: string;
  model: string;
  year: number;
  category: string;
  listingType?: 'STANDARD' | 'VIP';
  isAvailable?: boolean;
}) {
  return apiFetch('/listings', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function addListingImage(
  listingId: string,
  data: { imageUrl: string; sortOrder: number },
) {
  return apiFetch(`/listings/${listingId}/images`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}