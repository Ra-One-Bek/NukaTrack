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
  const [requestLoading, setRequestLoading] = useState(false);
  const [message, setMessage] = useState('');

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
      setRequestLoading(true);
      setMessage('');

      await createRequest({
        listingId: listing.id,
        message: `Здравствуйте! Хочу оставить заявку на объявление "${listing.title}".`,
      });

      setMessage('Заявка успешно отправлена. Она появится в разделе "Мои заявки".');
    } catch (err: any) {
      setMessage(err.message || 'Не удалось отправить заявку');
    } finally {
      setRequestLoading(false);
    }
  }

  if (loading) {
    return <div className="mx-auto max-w-6xl px-6 py-10">Загрузка...</div>;
  }

  if (error || !listing) {
    return <div className="mx-auto max-w-6xl px-6 py-10 text-red-600">{error}</div>;
  }

  return (
    <>
      {listing.listingType === 'VIP' ? (
        <VipTruckDetails listing={listing} />
      ) : (
        <StandardTruckDetails listing={listing} />
      )}

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">Оставить заявку</h2>

          <p className="mt-2 text-slate-600">
            После отправки заявки владелец объявления увидит ваше имя, телефон и email
            во вкладке “Входящие заявки”.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={handleCreateRequest}
              disabled={requestLoading}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {requestLoading ? 'Отправка...' : 'Оставить заявку'}
            </button>
          </div>

          {message && (
            <p className="mt-4 rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
              {message}
            </p>
          )}
        </div>
      </section>
    </>
  );
}