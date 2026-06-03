import type { Listing } from '../../types/listing';
import { useState } from 'react';
import ContactOwnerModal from './ContactOwnerModal';

interface StandardInfoSectionProps {
  listing: Listing;
}

export default function StandardInfoSection({
  listing,
}: StandardInfoSectionProps) {

  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
          {listing.category}
        </span>
      </div>

      <h1 className="mb-2 text-3xl font-bold text-slate-900">
        {listing.title}
      </h1>

      <p className="mb-4 text-slate-500">
        {listing.brand} {listing.model} • {listing.year} • {listing.city}
      </p>

      <p className="mb-6 leading-7 text-slate-700">{listing.description}</p>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-slate-100 p-4">
          <p className="text-sm text-slate-500">Цена за сутки</p>
          <p className="text-xl font-bold text-slate-900">
            {listing.pricePerDay.toLocaleString('ru-RU')} ₸
          </p>
        </div>

        <div className="rounded-2xl bg-slate-100 p-4">
          <p className="text-sm text-slate-500">Грузоподъемность</p>
          <p className="text-xl font-bold text-slate-900">
            {listing.capacityTons} тонн
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 p-4">
        <h3 className="mb-2 font-semibold">Контакты владельца</h3>
        <p>{listing.owner.name}</p>
        <p>{listing.owner.phone}</p>
        <p>{listing.owner.email}</p>
      </div>

      <button
        onClick={() => setIsContactOpen(true)}
        className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Связаться с владельцем
      </button>


      <ContactOwnerModal
        owner={listing.owner}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}