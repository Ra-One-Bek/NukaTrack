import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getListingById } from '../api/listingsApi';
import type { Listing } from '../types/listing';
import StandardTruckDetails from '../components/truck-details/StandardTruckDetails';
import VipTruckDetails from '../components/truck-details/VipTruckDetails';

export default function TruckDetailsPage() {
  const { id } = useParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadListing() {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getListingById(id);
        setListing(data);
      } catch {
        setError('Объявление не найдено');
      } finally {
        setLoading(false);
      }
    }

    loadListing();
  }, [id]);

  if (loading) return <div className="p-6">Загрузка...</div>;
  if (error || !listing) return <div className="p-6 text-red-500">{error}</div>;

  if (listing.listingType === 'VIP') {
    return <VipTruckDetails listing={listing} />;
  }

  return <StandardTruckDetails listing={listing} />;
}