import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Truck, BadgeCheck } from 'lucide-react';

const benefits = [
  {
    title: 'Быстрый отклик',
    text: 'Рекламная подача помогает быстрее привлечь внимание арендатора.',
    icon: Zap,
  },
  {
    title: 'Больше доверия',
    text: 'Подробное и premium-оформление выглядит надежнее для клиента.',
    icon: ShieldCheck,
  },
  {
    title: 'Сильная презентация',
    text: 'Транспорт подается как выгодное и готовое к работе предложение.',
    icon: Truck,
  },
  {
    title: 'Выделение среди обычных',
    text: 'VIP-объявление заметнее в каталоге и на странице просмотра.',
    icon: BadgeCheck,
  },
];

export default function VipBenefits() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white">Преимущества VIP-подачи</h2>
        <p className="mt-2 max-w-2xl text-slate-400">
          Такая страница работает не просто как карточка объявления, а как
          рекламная витрина транспорта.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {benefits.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <div className="mb-4 inline-flex rounded-2xl bg-amber-400 p-3 text-slate-950">
                <Icon size={22} />
              </div>

              <h3 className="mb-2 text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-7 text-slate-300">{item.text}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}