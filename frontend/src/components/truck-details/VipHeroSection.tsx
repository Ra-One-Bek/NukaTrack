import { motion } from 'framer-motion';
import type { Listing } from '../../types/listing';

interface VipHeroSectionProps {
  listing: Listing;
}

export default function VipHeroSection({ listing }: VipHeroSectionProps) {
  const bgImage =
    listing.images?.[0]?.imageUrl ||
    'https://via.placeholder.com/1400x800?text=VIP+Truck';

  return (
    <section className="relative overflow-hidden">
      <img
        src={bgImage}
        alt={listing.title}
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="mb-4 inline-flex rounded-full bg-amber-400 px-4 py-2 text-sm font-bold text-slate-950">
            VIP ОБЪЯВЛЕНИЕ
          </span>

          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl">
            {listing.title}
          </h1>

          <p className="mb-4 text-lg text-slate-200">
            {listing.brand} {listing.model} • {listing.year} • {listing.city}
          </p>

          <p className="mb-8 max-w-2xl text-base leading-8 text-slate-300">
            Улучшенный рекламный формат объявления помогает сильнее выделить
            транспорт, повысить доверие арендаторов и быстрее получить отклики.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
              <p className="text-sm text-slate-300">Цена за сутки</p>
              <p className="text-2xl font-bold text-white">
                {listing.pricePerDay.toLocaleString('ru-RU')} ₸
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
              <p className="text-sm text-slate-300">Грузоподъемность</p>
              <p className="text-2xl font-bold text-white">
                {listing.capacityTons} тонн
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
              <p className="text-sm text-slate-300">Категория</p>
              <p className="text-2xl font-bold text-white">
                {listing.category}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}