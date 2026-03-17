import { motion } from 'framer-motion';
import type { Listing } from '../../types/listing';

interface VipAiInsightProps {
  listing: Listing;
}

export default function VipAiInsight({ listing }: VipAiInsightProps) {
  const benefits = [
    `Подходит для категории: ${listing.category}`,
    `Размещен в городе: ${listing.city}`,
    `Подходит для грузов до ${listing.capacityTons} тонн`,
    `Тип объявления VIP повышает заметность среди конкурентов`,
  ];

  const marketingText = `ИИ-анализ показывает, что это объявление хорошо воспринимается пользователями за счет сочетания стоимости, категории транспорта и premium-подачи. Такое оформление помогает быстрее заинтересовать клиента и повысить шанс отклика.`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl bg-gradient-to-br from-amber-300 to-orange-400 p-[1px]"
    >
      <div className="h-full rounded-3xl bg-slate-950 p-6">
        <h2 className="mb-4 text-2xl font-semibold text-white">
          AI-анализ объявления
        </h2>

        <p className="mb-6 leading-8 text-slate-300">{marketingText}</p>

        <div className="space-y-3">
          {benefits.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl bg-amber-400 p-4 text-slate-950">
          <p className="text-sm font-medium">Рекламное преимущество</p>
          <p className="mt-2 text-lg font-bold">
            VIP-формат помогает объявлению сильнее выделяться среди обычных.
          </p>
        </div>
      </div>
    </motion.div>
  );
}