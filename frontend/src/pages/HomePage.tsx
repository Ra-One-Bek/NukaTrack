import { useEffect, useState } from 'react';
import { getListings } from '../api/listingsApi';
import { getAiRecommendations } from '../api/aiApi';
import type { Listing } from '../types/listing';
import type { AiRecommendationResponse } from '../types/ai';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import TruckCard from '../components/TruckCard';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [listings, setListings] = useState<Listing[]>([]);
  const [recommendedListings, setRecommendedListings] = useState<Listing[]>([]);
  const [summary, setSummary] = useState(
    'Напишите запрос, и мини-ИИ подберет подходящие грузовые машины.',
  );
  const [loading, setLoading] = useState(false);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadInitialListings() {
      try {
        setCatalogLoading(true);
        const data = await getListings();
        setListings(data);
      } catch {
        setError('Не удалось загрузить объявления');
      } finally {
        setCatalogLoading(false);
      }
    }

    loadInitialListings();
  }, []);

  async function handleAiSearch(searchText?: string) {
    const text = (searchText ?? query).trim();

    if (!text) {
      setRecommendedListings([]);
      setSummary('Напишите запрос, и мини-ИИ подберет подходящие грузовые машины.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response: AiRecommendationResponse = await getAiRecommendations(text);

      setRecommendedListings(response.results);
      setSummary(response.summary);
    } catch {
      setError('Не удалось получить AI-рекомендации');
    } finally {
      setLoading(false);
    }
  }

  const visibleListings =
    recommendedListings.length > 0 ? recommendedListings : listings;

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 inline-block rounded-full bg-white/10 px-4 py-2 text-sm">
              Дипломный проект • Аренда грузовых машин
            </p>

            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
              Подбор грузовых машин с мини-ИИ
            </h1>

            <p className="mb-8 text-lg text-slate-300">
              Пользователь пишет обычный текст, а система находит лучшие варианты
              по бюджету, городу, категории и грузоподъемности.
            </p>

            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={() => handleAiSearch()}
            />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <FilterChips
            onSelect={(text) => {
              setQuery(text);
              handleAiSearch(text);
            }}
          />
        </div>

        <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <h2 className="mb-2 text-lg font-semibold text-slate-900">
            AI-рекомендация
          </h2>

          {loading ? (
            <p className="text-slate-700">ИИ подбирает подходящие варианты...</p>
          ) : (
            <p className="text-slate-700">{summary}</p>
          )}
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            {recommendedListings.length > 0
              ? 'Рекомендованные объявления'
              : 'Доступные грузовики'}
          </h2>

          <p className="text-sm text-slate-500">Найдено: {visibleListings.length}</p>
        </div>

        {catalogLoading ? (
          <div className="text-slate-600">Загрузка объявлений...</div>
        ) : visibleListings.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 text-slate-600 shadow-sm">
            Объявления не найдены.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleListings.map((listing) => (
              <TruckCard key={listing.id} truck={listing} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}