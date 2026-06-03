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
    'Напишите запрос, и исскуственный интеллект подберет подходящие грузовые машины.',
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
    <div
      className="min-h-screen"
      style={{
        background: '#f5f4f0',
        fontFamily: "'DM Sans', 'Inter', sans-serif",
      }}
    >
      

      {/* ── HERO ── */}
      <section
        style={{
          background: '#fff',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Decorative grid lines */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />

        {/* Large decorative number */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: -20,
            top: -30,
            fontSize: 280,
            fontWeight: 800,
            color: 'rgba(0,0,0,0.03)',
            lineHeight: 1,
            userSelect: 'none',
            letterSpacing: '-10px',
          }}
        >
          UberTrack
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8" style={{ paddingTop: 64, paddingBottom: 56, position: 'relative' }}>
          {/* Tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: 20,
                padding: '4px 12px',
                fontSize: 12,
                color: '#16a34a',
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  background: '#22c55e',
                  borderRadius: '50%',
                  display: 'inline-block',
                }}
              />
              Дипломный проект
            </span>
            <span
              style={{
                background: '#f5f4f0',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 20,
                padding: '4px 12px',
                fontSize: 12,
                color: '#888',
              }}
            >
              Аренда и покупка грузовых машин
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(40px, 6vw, 76px)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-2px',
              color: '#0f0f0f',
              marginBottom: 20,
              maxWidth: 680,
            }}
          >
            Подбор грузовых
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #0f0f0f 0%, #555 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              машин
            </span>{' '}
            <span
              style={{
                display: 'inline-block',
                background: '#1a1a1a',
                color: '#fff',
                borderRadius: 12,
                padding: '2px 16px',
                fontSize: 'clamp(32px, 5vw, 62px)',
                letterSpacing: '-1px',
              }}
            >
              с ИИ
            </span>
          </h1>

          <p
            style={{
              fontSize: 16,
              color: '#888',
              lineHeight: 1.7,
              maxWidth: 480,
              marginBottom: 36,
              fontWeight: 400,
            }}
          >
            Пользователь пишет обычный текст, а система находит лучшие варианты
            по бюджету, городу, категории и грузоподъёмности.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
            {[
              { val: '500+', label: 'Грузовиков' },
              { val: '30+', label: 'Городов' },
              { val: '99%', label: 'Точность ИИ' },
            ].map(({ val, label }) => (
              <div key={label}>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#0f0f0f', letterSpacing: '-0.5px' }}>
                  {val}
                </div>
                <div style={{ fontSize: 12, color: '#aaa', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Search */}
          <div style={{ maxWidth: 620 }}>
            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={() => handleAiSearch()}
            />
          </div>
        </div>
      </section>

      {/* ── MAIN ── */}
      <main className="mx-auto max-w-7xl px-6 lg:px-8" style={{ paddingTop: 40, paddingBottom: 60 }}>

        {/* Filter chips */}
        <div style={{ marginBottom: 32 }}>
          <FilterChips
            onSelect={(text) => {
              setQuery(text);
              handleAiSearch(text);
            }}
          />
        </div>

        {/* AI summary */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            alignItems: 'flex-start',
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.07)',
            borderRadius: 16,
            padding: '20px 24px',
            marginBottom: 32,
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              background: '#f5f4f0',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: 1,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15 9H22L16.5 13.5L18.5 21L12 17L5.5 21L7.5 13.5L2 9H9L12 2Z" stroke="#1a1a1a" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: '#bbb',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: 6,
              }}
            >
              AI‑рекомендация
            </p>
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    display: 'flex',
                    gap: 4,
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        background: '#d1d5db',
                        borderRadius: '50%',
                        display: 'inline-block',
                        animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: 14, color: '#aaa' }}>ИИ подбирает варианты...</span>
              </div>
            ) : (
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>{summary}</p>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              marginBottom: 24,
              background: '#fff5f5',
              border: '1px solid #fed7d7',
              borderRadius: 12,
              padding: '14px 18px',
              fontSize: 14,
              color: '#c53030',
            }}
          >
            {error}
          </div>
        )}

        {/* Section header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: '#0f0f0f',
                letterSpacing: '-0.5px',
              }}
            >
              {recommendedListings.length > 0
                ? 'Рекомендованные объявления'
                : 'Доступные грузовики'}
            </h2>
            {recommendedListings.length > 0 && (
              <span
                style={{
                  fontSize: 11,
                  background: '#ecfdf5',
                  color: '#059669',
                  border: '1px solid #a7f3d0',
                  borderRadius: 20,
                  padding: '2px 10px',
                  fontWeight: 500,
                }}
              >
                от ИИ
              </span>
            )}
          </div>
          <span
            style={{
              fontSize: 12,
              color: '#aaa',
              background: '#f5f4f0',
              padding: '4px 12px',
              borderRadius: 20,
            }}
          >
            {visibleListings.length} результатов
          </span>
        </div>

        {/* Listings */}
        {catalogLoading ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: 16,
                  height: 240,
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
            ))}
          </div>
        ) : visibleListings.length === 0 ? (
          <div
            style={{
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.07)',
              borderRadius: 16,
              padding: '48px 24px',
              textAlign: 'center',
              color: '#aaa',
              fontSize: 14,
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            Объявления не найдены
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleListings.map((listing) => (
              <TruckCard key={listing.id} truck={listing} />
            ))}
          </div>
        )}
      </main>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}