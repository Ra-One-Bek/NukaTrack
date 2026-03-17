import { apiFetch } from './client';
import type { RentalRequest } from '../types/request';

export async function createRequest(data: {
  listingId: string;
  message?: string;
}) {
  return apiFetch('/requests', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getMyRequests(): Promise<RentalRequest[]> {
  return apiFetch<RentalRequest[]>('/requests/my');
}

export async function getIncomingRequests(): Promise<RentalRequest[]> {
  return apiFetch<RentalRequest[]>('/requests/incoming');
}

export async function updateRequestStatus(
  requestId: string,
  status: 'PENDING' | 'APPROVED' | 'REJECTED',
) {
  return apiFetch(`/requests/${requestId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}