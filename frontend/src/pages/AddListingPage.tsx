import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addListingImage, createListing } from '../api/listingsApi';

export default function AddListingPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    city: '',
    pricePerDay: '',
    capacityTons: '',
    brand: '',
    model: '',
    year: '',
    category: '',
    listingType: 'STANDARD' as 'STANDARD' | 'VIP',
    isAvailable: true,
  });

  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  function updateImage(index: number, value: string) {
    const next = [...imageUrls];
    next[index] = value;
    setImageUrls(next);
  }

  function addImageField() {
    if (imageUrls.length >= 10) return;
    setImageUrls([...imageUrls, '']);
  }

  function removeImageField(index: number) {
    const next = imageUrls.filter((_, i) => i !== index);
    setImageUrls(next.length ? next : ['']);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      const listing = await createListing({
        title: form.title,
        description: form.description,
        city: form.city,
        pricePerDay: Number(form.pricePerDay),
        capacityTons: Number(form.capacityTons),
        brand: form.brand,
        model: form.model,
        year: Number(form.year),
        category: form.category,
        listingType: form.listingType,
        isAvailable: form.isAvailable,
      });

      const validImages = imageUrls
        .map((url) => url.trim())
        .filter((url) => url.length > 0)
        .slice(0, 10);

      for (let i = 0; i < validImages.length; i++) {
        await addListingImage(listing.id, {
          imageUrl: validImages[i],
          sortOrder: i + 1,
        });
      }

      navigate('/my-listings');
    } catch {
      setError('Не удалось создать объявление');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          Разместить объявление
        </h1>
        <p className="mb-8 text-slate-600">
          Добавьте информацию о грузовике и выберите обычное или VIP-размещение.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Название объявления"
              className="rounded-xl border px-4 py-3"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <select
              className="rounded-xl border px-4 py-3"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Выберите категорию</option>
              <option value="Фура">Фура</option>
              <option value="Самосвал">Самосвал</option>
              <option value="Тент">Тент</option>
              <option value="Рефрижератор">Рефрижератор</option>
              <option value="Бортовой">Бортовой</option>
              <option value="Манипулятор">Манипулятор</option>
            </select>

            <input
              type="text"
              placeholder="Марка"
              className="rounded-xl border px-4 py-3"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
            />

            <input
              type="text"
              placeholder="Модель"
              className="rounded-xl border px-4 py-3"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
            />

            <input
              type="number"
              placeholder="Год"
              className="rounded-xl border px-4 py-3"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            />

            <input
              type="text"
              placeholder="Город"
              className="rounded-xl border px-4 py-3"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />

            <input
              type="number"
              placeholder="Цена за сутки"
              className="rounded-xl border px-4 py-3"
              value={form.pricePerDay}
              onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
            />

            <input
              type="number"
              placeholder="Грузоподъемность (тонн)"
              className="rounded-xl border px-4 py-3"
              value={form.capacityTons}
              onChange={(e) => setForm({ ...form, capacityTons: e.target.value })}
            />
          </div>

          <textarea
            placeholder="Описание объявления"
            className="min-h-[140px] w-full rounded-xl border px-4 py-3"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <select
              className="rounded-xl border px-4 py-3"
              value={form.listingType}
              onChange={(e) =>
                setForm({
                  ...form,
                  listingType: e.target.value as 'STANDARD' | 'VIP',
                })
              }
            >
              <option value="STANDARD">Обычное объявление</option>
              <option value="VIP">VIP объявление</option>
            </select>

            <select
              className="rounded-xl border px-4 py-3"
              value={String(form.isAvailable)}
              onChange={(e) =>
                setForm({
                  ...form,
                  isAvailable: e.target.value === 'true',
                })
              }
            >
              <option value="true">Доступно</option>
              <option value="false">Недоступно</option>
            </select>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Фото по URL (до 10)
              </h2>

              <button
                type="button"
                onClick={addImageField}
                disabled={imageUrls.length >= 10}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                Добавить фото
              </button>
            </div>

            <div className="space-y-3">
              {imageUrls.map((url, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    placeholder={`URL фото ${index + 1}`}
                    className="flex-1 rounded-xl border px-4 py-3"
                    value={url}
                    onChange={(e) => updateImage(index, e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="rounded-xl border px-4 py-3 text-sm font-medium text-red-600"
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>
          </div>

          {form.listingType === 'VIP' && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
              VIP-объявление будет отображаться более заметно и иметь premium-оформление
              на странице объявления.
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
          >
            {loading ? 'Создание...' : 'Опубликовать объявление'}
          </button>
        </form>
      </div>
    </div>
  );
}