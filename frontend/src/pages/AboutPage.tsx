import { motion } from 'framer-motion';
import {
  BadgeDollarSign,
  BrainCircuit,
  Crown,
  FilePlus2,
  Search,
  ShieldCheck,
  Truck,
  WandSparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const cards = [
  {
    icon: Search,
    title: 'Удобный поиск транспорта',
    text: 'Пользователь может быстро найти подходящий грузовой транспорт по категории, городу, цене, грузоподъемности и другим параметрам.',
  },
  {
    icon: BrainCircuit,
    title: 'Мини-ИИ подбор',
    text: 'Пользователь пишет текстовый запрос обычными словами, а система подбирает релевантные варианты и показывает подходящие объявления.',
  },
  {
    icon: Truck,
    title: 'Размещение объявлений',
    text: 'Владелец транспорта может самостоятельно разместить объявление, выбрать тип публикации и добавить фотографии грузовика.',
  },
  {
    icon: ShieldCheck,
    title: 'Прозрачная структура сервиса',
    text: 'Платформа объединяет арендаторов и владельцев транспорта в одном понятном интерфейсе и упрощает взаимодействие между ними.',
  },
];

const steps = [
  {
    step: '01',
    title: 'Авторизация в системе',
    text: 'Пользователь регистрируется или входит в аккаунт, чтобы получить доступ к размещению и управлению объявлениями.',
  },
  {
    step: '02',
    title: 'Добавление объявления',
    text: 'Заполняются основные данные: название, описание, город, категория, бренд, модель, грузоподъемность, цена за сутки.',
  },
  {
    step: '03',
    title: 'Выбор типа объявления',
    text: 'Пользователь выбирает стандартное размещение или VIP-формат с улучшенной визуальной подачей.',
  },
  {
    step: '04',
    title: 'Добавление фотографий',
    text: 'К объявлению можно добавить до 10 фотографий, чтобы показать транспорт с разных ракурсов и повысить доверие арендаторов.',
  },
  {
    step: '05',
    title: 'Публикация и отклики',
    text: 'После публикации объявление становится доступным в каталоге, а заинтересованные пользователи могут отправлять заявки.',
  },
];

const plans = [
  {
    type: 'Обычное объявление',
    badge: 'STANDARD',
    price: 'Бесплатно',
    accent: 'bg-slate-100 text-slate-800',
    border: 'border-slate-200',
    items: [
      'Публикация объявления в каталоге',
      'До 10 фотографий',
      'Стандартное оформление страницы',
      'Доступно для поиска и просмотра',
      'Подходит для обычного размещения',
    ],
  },
  {
    type: 'VIP-объявление',
    badge: 'VIP',
    price: 'Например: 2 000–5 000 ₸',
    accent: 'bg-amber-400 text-slate-950',
    border: 'border-amber-300',
    items: [
      'Приоритетное визуальное выделение в каталоге',
      'До 10 фотографий',
      'Премиальный дизайн страницы объявления',
      'Анимированная и рекламная подача',
      'AI-блок и усиленная презентация транспорта',
      'Повышение заметности и интереса клиентов',
    ],
  },
];

const vipBenefits = [
  'VIP-объявление выглядит заметнее среди обычных предложений.',
  'Премиальная подача усиливает доверие и воспринимаемую ценность транспорта.',
  'Красивый интерфейс помогает быстрее заинтересовать арендатора.',
  'Такой формат работает как мини-реклама внутри платформы.',
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.15),transparent_30%),radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <span className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur">
              О сервисе NukaTruck
            </span>

            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
              Веб-приложение для аренды грузовых машин с умным подбором объявлений
            </h1>

            <p className="mb-8 max-w-3xl text-lg leading-8 text-slate-300">
              NukaTruck — это платформа, в которой пользователь может находить,
              публиковать и продвигать объявления о грузовом транспорте. Система
              сочетает каталог объявлений, VIP-формат продвижения и мини-ИИ,
              который помогает подбирать подходящие варианты по обычному текстовому запросу.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/catalog"
                className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Перейти в каталог
              </Link>

              <Link
                to="/add"
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Разместить объявление
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-3xl"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
            Назначение платформы
          </p>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Для чего создано это приложение
          </h2>
          <p className="text-slate-300 leading-8">
            Цель приложения — упростить поиск грузового транспорта и сделать
            процесс аренды более удобным как для арендаторов, так и для владельцев
            техники. Пользователь может быстро найти подходящий транспорт, а владелец
            может выгодно презентовать свой грузовик и получить больше откликов.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="mb-4 inline-flex rounded-2xl bg-blue-600/20 p-3 text-blue-300">
                  <Icon size={22} />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-white">
                  {card.title}
                </h3>
                <p className="text-sm leading-7 text-slate-300">{card.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-amber-400">
              VIP-объявления
            </p>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              В чем смысл VIP-формата
            </h2>
            <p className="mb-6 leading-8 text-slate-300">
              Главная идея VIP-объявления состоит не в увеличении количества фото,
              а в более сильной рекламной подаче объявления. И обычное, и VIP-объявление
              могут содержать до 10 фотографий, но VIP-формат получает улучшенное
              визуальное оформление, анимации, акцентные блоки и повышенную заметность
              в каталоге.
            </p>

            <div className="space-y-3">
              {vipBenefits.map((item, index) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="rounded-3xl bg-gradient-to-br from-amber-300 to-orange-400 p-[1px]"
          >
            <div className="h-full rounded-3xl bg-slate-950 p-6">
              <div className="mb-4 inline-flex rounded-2xl bg-amber-400 p-3 text-slate-950">
                <Crown size={24} />
              </div>

              <h3 className="mb-3 text-2xl font-bold text-white">
                Почему VIP помогает быстрее найти клиента
              </h3>

              <p className="mb-6 leading-8 text-slate-300">
                VIP-объявление превращает обычную карточку транспорта в более
                привлекательную рекламную страницу. Такой формат усиливает интерес,
                делает предложение визуально “дороже”, помогает лучше показать
                преимущества техники и повышает шанс отклика со стороны арендатора.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Выделение в каталоге</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Выше заметность
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Оформление страницы</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Premium-подача
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Восприятие клиентом</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Больше доверия
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Бизнес-эффект</p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Больше откликов
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-3xl"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
            Сравнение форматов
          </p>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Обычное объявление и VIP-объявление
          </h2>
          <p className="text-slate-300 leading-8">
            В приложении предусмотрено два формата публикации. Обычный вариант
            подходит для стандартного размещения информации о грузовике, а VIP —
            для более сильной рекламной подачи и продвижения объявления.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.type}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className={`rounded-3xl border ${plan.border} bg-white/5 p-6 backdrop-blur`}
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-bold text-white">{plan.type}</h3>
                  <p className="mt-2 text-slate-400">Формат публикации объявления</p>
                </div>

                <span className={`rounded-full px-4 py-2 text-sm font-bold ${plan.accent}`}>
                  {plan.badge}
                </span>
              </div>

              <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Стоимость размещения</p>
                <p className="mt-2 text-2xl font-bold text-white">{plan.price}</p>
                {plan.type === 'VIP-объявление' && (
                  <p className="mt-2 text-sm text-slate-400">
                    Стоимость можно изменить под твою бизнес-логику. Для диплома
                    можно оставить примерную цену как демонстрацию монетизации платформы.
                  </p>
                )}
              </div>

              <div className="space-y-3">
                {plan.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 max-w-3xl"
          >
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
              Как разместить объявление
            </p>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Пошаговый процесс публикации
            </h2>
            <p className="text-slate-300 leading-8">
              Размещение объявления построено так, чтобы пользователь мог быстро
              заполнить данные о транспорте и опубликовать предложение в каталоге.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <div className="mb-4 inline-flex rounded-2xl bg-blue-600/20 px-4 py-2 text-sm font-bold text-blue-300">
                  {item.step}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-7 text-slate-300">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        >
          <div className="mb-4 inline-flex rounded-2xl bg-violet-500/20 p-3 text-violet-300">
            <WandSparkles size={24} />
          </div>

          <h2 className="mb-4 text-3xl font-bold">
            Как работает мини-ИИ
          </h2>

          <p className="mb-6 leading-8 text-slate-300">
            Пользователь может написать запрос обычным языком, например:
            “У меня 200 000 тг, нужно 2 грузовика для стройки в Алматы”.
            После этого система анализирует текст, выделяет ключевые параметры
            и подбирает наиболее подходящие объявления.
          </p>

          <div className="space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200">
              Определение бюджета пользователя
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200">
              Анализ города, категории и параметров груза
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200">
              Подбор релевантных объявлений из базы
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200">
              Вывод рекомендаций в удобной форме
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        >
          <div className="mb-4 inline-flex rounded-2xl bg-emerald-500/20 p-3 text-emerald-300">
            <BadgeDollarSign size={24} />
          </div>

          <h2 className="mb-4 text-3xl font-bold">
            Бизнес-смысл платформы
          </h2>

          <p className="mb-6 leading-8 text-slate-300">
            Приложение имеет не только пользовательскую, но и бизнес-ценность.
            Обычные объявления формируют базовый каталог сервиса, а VIP-размещение
            становится инструментом монетизации платформы. Это делает проект ближе
            к реальному digital-продукту, а не просто к учебному макету.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Для арендатора</p>
              <p className="mt-2 font-semibold text-white">
                Быстрый поиск нужного транспорта
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Для владельца</p>
              <p className="mt-2 font-semibold text-white">
                Удобное размещение и продвижение
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Для платформы</p>
              <p className="mt-2 font-semibold text-white">
                Монетизация через VIP-объявления
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Для диплома</p>
              <p className="mt-2 font-semibold text-white">
                Реалистичная fullstack-концепция
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-white p-8 text-slate-900 shadow-2xl"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-blue-600">
                Начать работу
              </p>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Готов разместить свой грузовик или найти подходящий транспорт?
              </h2>
              <p className="max-w-3xl text-slate-600 leading-8">
                Перейди в каталог, чтобы посмотреть доступные варианты, или
                размести собственное объявление и выбери обычный либо VIP-формат
                публикации.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
              >
                <Search size={18} color='white'/>
                <p className='text-white'>Каталог</p>
              </Link>

              <Link
                to="/add"
                className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                <FilePlus2 size={18} />
                Разместить объявление
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}