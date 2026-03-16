import { apiFetch } from './client';

export async function getFavorites() {
  return apiFetch('/favorites');
}

export async function addFavorite(listingId: string) {
  return apiFetch(`/favorites/${listingId}`, {
    method: 'POST',
  });
}

export async function removeFavorite(listingId: string) {
  return apiFetch(`/favorites/${listingId}`, {
    method: 'DELETE',
  });
}