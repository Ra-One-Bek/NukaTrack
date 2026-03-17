import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getListingById, updateListing } from '../api/listingsApi';

export default function EditListingPage() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadListing() {
      if (!id) return;

      try {
        const listing = await getListingById(id);

        setForm({
          title: listing.title,
          description: listing.description,
          city: listing.city,
          pricePerDay: String(listing.pricePerDay),
          capacityTons: String(listing.capacityTons),
          brand: listing.brand,
          model: listing.model,
          year: String(listing.year),
          category: listing.category,
          listingType: listing.listingType,
          isAvailable: listing.isAvailable,
        });
      } catch {
        setError('Не удалось загрузить объявление');
      } finally {
        setLoading(false);
      }
    }

    loadListing();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!id) return;

    try {
      setSaving(true);
      setError('');

      await updateListing(id, {
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

      navigate('/my-listings');
    } catch {
      setError('Не удалось сохранить изменения');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="mx-auto max-w-4xl px-4 py-10">Загрузка объявления...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">
          Редактировать объявление
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Название"
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
              placeholder="Грузоподъемность"
              className="rounded-xl border px-4 py-3"
              value={form.capacityTons}
              onChange={(e) => setForm({ ...form, capacityTons: e.target.value })}
            />
          </div>

          <textarea
            placeholder="Описание"
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

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
          >
            {saving ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
        </form>
      </div>
    </div>
  );
}