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
  return apiFetch<Listing>('/listings', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateListing(
  id: string,
  data: Partial<{
    title: string;
    description: string;
    city: string;
    pricePerDay: number;
    capacityTons: number;
    brand: string;
    model: string;
    year: number;
    category: string;
    listingType: 'STANDARD' | 'VIP';
    isAvailable: boolean;
  }>,
) {
  return apiFetch<Listing>(`/listings/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteListing(id: string) {
  return apiFetch<{ message: string }>(`/listings/${id}`, {
    method: 'DELETE',
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

export async function getMyListings(): Promise<Listing[]> {
  return apiFetch<Listing[]>('/users/me/listings');
}