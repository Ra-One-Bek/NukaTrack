import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getListingById } from '../api/listingsApi';
import { createRequest } from '../api/requestsApi';
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

  async function handleCreateRequest() {
    if (!listing) return;

    try {
      await createRequest({
        listingId: listing.id,
        message: `Здравствуйте! Хочу оставить заявку на объявление "${listing.title}".`,
      });

      alert('Заявка успешно отправлена');
    } catch (err: any) {
      alert(err.message || 'Не удалось отправить заявку');
    }
  }

  if (loading) {
    return <div className="mx-auto max-w-6xl px-6 py-10">Загрузка...</div>;
  }

  if (error || !listing) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10 text-red-600">
        {error}
      </div>
    );
  }

  return listing.listingType === 'VIP' ? (
    <VipTruckDetails listing={listing} onRequest={handleCreateRequest} />
  ) : (
    <StandardTruckDetails listing={listing} />
  );
}