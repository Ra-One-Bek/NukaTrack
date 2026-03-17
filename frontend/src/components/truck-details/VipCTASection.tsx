import { motion } from 'framer-motion';

interface VipCTASectionProps {
  onRequest?: () => void;
}

export default function VipCTASection({ onRequest }: VipCTASectionProps) {
  return (
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

        <p className="mb-6 max-w-2xl text-slate-600">
          Оставьте заявку прямо сейчас. VIP-объявление создано так, чтобы быстрее
          помочь клиенту принять решение.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={onRequest}
            className="rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
          >
            Оставить заявку
          </button>

          <button className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100">
            Связаться с владельцем
          </button>
        </div>
      </motion.div>
    </section>
  );
}