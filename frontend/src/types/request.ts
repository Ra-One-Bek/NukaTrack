import type { Listing } from './listing';
import type { User } from './user';

export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface RentalRequest {
  id: string;
  listingId: string;
  senderId: string;
  message?: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  listing: Listing;
  sender: User;
}