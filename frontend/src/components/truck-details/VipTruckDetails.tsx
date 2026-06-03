import { motion } from 'framer-motion';
import type { Listing } from '../../types/listing';
import VipHeroSection from './VipHeroSection';
import VipAiInsight from './VipAiInsight';
import VipBenefits from './VipBenefits';
import VipCTASection from './VipCTASection';
import TruckGallery from './TruckGallery';

interface VipTruckDetailsProps {
  listing: Listing;
  onRequest?: () => void;
}

export default function VipTruckDetails({
  listing,
  onRequest,
}: VipTruckDetailsProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <VipHeroSection listing={listing} />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <TruckGallery
            images={listing.images}
            title={listing.title}
            isVip
          />

          <div className="rounded-3xl bg-white/5 p-6 backdrop-blur">
            <h2 className="mb-4 text-2xl font-semibold">Описание</h2>
            <p className="leading-8 text-slate-300">{listing.description}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Категория</p>
                <p className="mt-2 font-semibold">{listing.category}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Марка</p>
                <p className="mt-2 font-semibold">{listing.brand}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Модель</p>
                <p className="mt-2 font-semibold">{listing.model}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <VipAiInsight listing={listing} />
      </section>

      <VipBenefits />
      <VipCTASection listing={listing} onRequest={onRequest} />
    </div>
  );
}