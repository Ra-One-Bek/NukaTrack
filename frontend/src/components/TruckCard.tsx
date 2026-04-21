import { Link } from 'react-router-dom';
import type { Listing } from '../types/listing';

interface TruckCardProps {
  truck: Listing;
}

export default function TruckCard({ truck }: TruckCardProps) {
  const image =
    truck.images?.[0]?.imageUrl ||
    'https://via.placeholder.com/800x500?text=No+Image';

  return (
    <div
      className={`overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
        truck.listingType === 'VIP' ? 'ring-2 ring-amber-300' : ''
      }`}
    >
      <div className="relative">
        <img src={image} alt={truck.title} className="h-52 w-full object-cover" />

        {truck.listingType === 'VIP' && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-slate-900 shadow">
            VIP
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{truck.title}</h3>
            <p className="text-sm text-slate-500">
              {truck.city} • {truck.year}
            </p>
          </div>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            {truck.category}
          </span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-slate-600">
          {truck.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
            {truck.brand}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
            {truck.model}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
            {truck.capacityTons} тонн
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Цена за сутки</p>
            <p className="text-lg font-bold text-slate-900">
              {truck.pricePerDay.toLocaleString('ru-RU')} ₸
            </p>
          </div>

          <Link
            to={`/truck/${truck.id}`}
            className="rounded-xl bg-slate-200 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-400"
          >
            Открыть
          </Link>
        </div>
      </div>
    </div>
  );
}