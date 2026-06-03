import { motion } from 'framer-motion';
import { useState } from 'react';
import ContactOwnerModal from './ContactOwnerModal';
import type { Listing } from '../../types/listing';

interface VipCTASectionProps {
  listing: Listing;
  onRequest?: () => void;
}

export default function VipCTASection({
  listing,
  onRequest,
}: VipCTASectionProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-white p-8 text-slate-900 shadow-2xl"
        >
          <h2 className="mb-3 text-3xl font-bold">
            Заинтересовал этот транспорт?
          </h2>

          <p className="mb-8 max-w-2xl text-slate-600">
            Оставьте заявку или свяжитесь напрямую с владельцем через звонок
            или WhatsApp.
          </p>

          <div className="flex w-full flex-row gap-4">
            <button
              onClick={onRequest}
              className="flex-1 rounded-2xl bg-slate-900 px-6 py-4 font-semibold text-white transition hover:bg-slate-700"
            >
              Оставить заявку
            </button>

            <button
              onClick={() => setIsContactOpen(true)}
              className="flex-1 rounded-2xl border border-slate-300 px-6 py-4 font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Связаться с владельцем
            </button>
          </div>
        </motion.div>
      </section>

      <ContactOwnerModal
        owner={listing.owner}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}