export type ListingType = 'STANDARD' | 'VIP';

export interface ListingImage {
  id: string;
  listingId: string;
  imageUrl: string;
  sortOrder: number;
  createdAt: string;
}

export interface ListingOwner {
  id: string;
  name: string;
  phone?: string;
  email: string;
}

export interface Listing {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  city: string;
  pricePerDay: number;
  capacityTons: number;
  brand: string;
  model: string;
  year: number;
  category: string;
  listingType: ListingType;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  images: ListingImage[];
  owner: ListingOwner;
  relevanceScore?: number;
}