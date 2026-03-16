import { useEffect, useMemo, useState } from 'react';
import { getListings } from '../api/listingsApi';
import type { Listing, ListingType } from '../types/listing';
import TruckCard from '../components/TruckCard';

type SortOption =
  | 'default'
  | 'price-asc'
  | 'price-desc'
  | 'newest'
  | 'capacity-desc';

export default function CatalogPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [listingType, setListingType] = useState<ListingType | ''>('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minCapacity, setMinCapacity] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  useEffect(() => {
    async function loadListings() {
      try {
        setLoading(true);
        setError('');
        const data = await getListings();
        setListings(data);
      } catch {
        setError('Не удалось загрузить каталог');
      } finally {
        setLoading(false);
      }
    }

    loadListings();
  }, []);

  const cities = useMemo(() => {
    return [...new Set(listings.map((item) => item.city))].sort((a, b) =>
      a.localeCompare(b, 'ru'),
    );
  }, [listings]);

  const categories = useMemo(() => {
    return [...new Set(listings.map((item) => item.category))].sort((a, b) =>
      a.localeCompare(b, 'ru'),
    );
  }, [listings]);

  const filteredListings = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    let result = listings.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        `${item.title} ${item.description} ${item.brand} ${item.model} ${item.city} ${item.category}`
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesCity = !city || item.city === city;
      const matchesCategory = !category || item.category === category;
      const matchesType = !listingType || item.listingType === listingType;

      const matchesMinPrice =
        !minPrice || item.pricePerDay >= Number(minPrice);
      const matchesMaxPrice =
        !maxPrice || item.pricePerDay <= Number(maxPrice);

      const matchesMinCapacity =
        !minCapacity || item.capacityTons >= Number(minCapacity);

      return (
        matchesSearch &&
        matchesCity &&
        matchesCategory &&
        matchesType &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesMinCapacity
      );
    });

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.pricePerDay - b.pricePerDay;

        case 'price-desc':
          return b.pricePerDay - a.pricePerDay;

        case 'newest':
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        case 'capacity-desc':
          return b.capacityTons - a.capacityTons;

        case 'default':
        default: {
          if (a.listingType === 'VIP' && b.listingType !== 'VIP') return -1;
          if (a.listingType !== 'VIP' && b.listingType === 'VIP') return 1;

          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
      }
    });

    return result;
  }, [
    listings,
    search,
    city,
    category,
    listingType,
    minPrice,
    maxPrice,
    minCapacity,
    sortBy,
  ]);

  function resetFilters() {
    setSearch('');
    setCity('');
    setCategory('');
    setListingType('');
    setMinPrice('');
    setMaxPrice('');
    setMinCapacity('');
    setSortBy('default');
  }

  if (loading) {
    return <div className="mx-auto max-w-7xl px-4 py-10">Загрузка каталога...</div>;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-blue-600">Каталог объявлений</p>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Аренда грузовых машин
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Подберите подходящий транспорт по городу, категории, цене,
            грузоподъемности и типу объявления.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="h-fit rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Фильтры</h2>
              <button
                onClick={resetFilters}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Сбросить
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Поиск
                </label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Volvo, фура, Алматы..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Город
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">Все города</option>
                  {cities.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Категория
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">Все категории</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Тип объявления
                </label>
                <select
                  value={listingType}
                  onChange={(e) =>
                    setListingType((e.target.value as ListingType | '') || '')
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">Все</option>
                  <option value="STANDARD">Обычное</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Цена от
                </label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Например 50000"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Цена до
                </label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Например 150000"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Грузоподъемность от
                </label>
                <input
                  type="number"
                  value={minCapacity}
                  onChange={(e) => setMinCapacity(e.target.value)}
                  placeholder="Например 10"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </aside>

          <section>
            <div className="mb-5 flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Найдено объявлений: {filteredListings.length}
                </h2>
                <p className="text-sm text-slate-500">
                  VIP-объявления по умолчанию показываются выше обычных.
                </p>
              </div>

              <div className="w-full md:w-64">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Сортировка
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="default">Сначала VIP и новые</option>
                  <option value="price-asc">Цена по возрастанию</option>
                  <option value="price-desc">Цена по убыванию</option>
                  <option value="newest">Сначала новые</option>
                  <option value="capacity-desc">По грузоподъемности</option>
                </select>
              </div>
            </div>

            {filteredListings.length === 0 ? (
              <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  Ничего не найдено
                </h3>
                <p className="mb-4 text-slate-600">
                  Попробуйте изменить параметры фильтрации или сбросить фильтры.
                </p>
                <button
                  onClick={resetFilters}
                  className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                >
                  Сбросить фильтры
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredListings.map((listing) => (
                  <TruckCard key={listing.id} truck={listing} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}