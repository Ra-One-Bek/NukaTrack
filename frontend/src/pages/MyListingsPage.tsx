import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteListing, getMyListings } from '../api/listingsApi';
import type { Listing } from '../types/listing';

export default function MyListingsPage() {
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    loadMyListings();
  }, [navigate]);

  async function loadMyListings() {
    try {
      setLoading(true);
      setError('');
      const data = await getMyListings();
      setListings(data);
    } catch {
      setError('Не удалось загрузить мои объявления');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm('Удалить это объявление?');

    if (!confirmed) return;

    try {
      await deleteListing(id);
      setListings((prev) => prev.filter((item) => item.id !== id));
    } catch {
      setError('Не удалось удалить объявление');
    }
  }

  if (loading) {
    return <div className="mx-auto max-w-7xl px-4 py-10">Загрузка моих объявлений...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Мои объявления</h1>
            <p className="mt-2 text-slate-600">
              Управляйте своими опубликованными объявлениями.
            </p>
          </div>

          <Link
            to="/add"
            className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Добавить объявление
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {listings.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
              У вас пока нет объявлений
            </h2>
            <p className="mb-4 text-slate-600">
              Разместите первое объявление, чтобы оно появилось в каталоге.
            </p>
            <Link
              to="/add"
              className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white hover:bg-slate-700"
            >
              Разместить объявление
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {listings.map((listing) => {
              const image =
                listing.images?.[0]?.imageUrl ||
                'https://via.placeholder.com/400x250?text=No+Image';

              return (
                <div
                  key={listing.id}
                  className="grid gap-6 rounded-3xl bg-white p-5 shadow-sm md:grid-cols-[220px_minmax(0,1fr)]"
                >
                  <img
                    src={image}
                    alt={listing.title}
                    className="h-52 w-full rounded-2xl object-cover"
                  />

                  <div className="flex flex-col justify-between gap-4">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl font-semibold text-slate-900">
                          {listing.title}
                        </h2>

                        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                          {listing.category}
                        </span>

                        {listing.listingType === 'VIP' && (
                          <span className="rounded-full bg-amber-400 px-3 py-1 text-sm font-bold text-slate-900">
                            VIP
                          </span>
                        )}
                      </div>

                      <p className="mb-3 text-slate-600">
                        {listing.brand} {listing.model} • {listing.year} • {listing.city}
                      </p>

                      <p className="line-clamp-2 text-slate-600">
                        {listing.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Цена за сутки</p>
                        <p className="text-xl font-bold text-slate-900">
                          {listing.pricePerDay.toLocaleString('ru-RU')} ₸
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Link
                          to={`/truck/${listing.id}`}
                          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                        >
                          Открыть
                        </Link>

                        <Link
                          to={`/edit-listing/${listing.id}`}
                          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                          Редактировать
                        </Link>

                        <button
                          onClick={() => handleDelete(listing.id)}
                          className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}