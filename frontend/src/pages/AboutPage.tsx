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
    title: 'ИИ подбор',
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
    badgeStyle: {
      background: '#f5f4f0',
      color: '#333',
      border: '1px solid rgba(0,0,0,0.08)',
    },
    cardBorder: '1px solid rgba(0,0,0,0.07)',
    items: [
      'Публикация объявления в каталоге',
      'До 3 фотографий',
      'Стандартное оформление страницы',
      'Доступно для поиска и просмотра',
      'Подходит для обычного размещения',
    ],
  },
  {
    type: 'VIP-объявление',
    badge: 'VIP',
    price: '2 000₸',
    badgeStyle: {
      background: '#fbbf24',
      color: '#1a1a1a',
      border: 'none',
    },
    cardBorder: '1px solid #fde68a',
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

const S = {
  page: {
    minHeight: '100vh',
    background: '#f5f4f0',
    fontFamily: "'DM Sans', 'Inter', sans-serif",
    color: '#0f0f0f',
  } as React.CSSProperties,

  tag: (color: string) => ({
    display: 'inline-block',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '2px',
    textTransform: 'uppercase' as const,
    color,
    marginBottom: 12,
  }),

  card: (border = '1px solid rgba(0,0,0,0.07)') => ({
    background: '#fff',
    border,
    borderRadius: 20,
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  } as React.CSSProperties),

  iconBox: (bg: string, color: string) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    background: bg,
    borderRadius: 12,
    color,
    marginBottom: 16,
    flexShrink: 0,
  } as React.CSSProperties),

  stepNum: {
    display: 'inline-flex',
    background: '#0f0f0f',
    color: '#fff',
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '1px',
    borderRadius: 20,
    padding: '4px 12px',
    marginBottom: 14,
  } as React.CSSProperties,

  pill: {
    background: '#f5f4f0',
    border: '1px solid rgba(0,0,0,0.07)',
    borderRadius: 12,
    padding: '10px 14px',
    fontSize: 14,
    color: '#444',
  } as React.CSSProperties,

  section: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 1280,
    padding: '64px 32px',
  } as React.CSSProperties,
};

export default function AboutPage() {
  return (
    <div style={S.page}>

      {/* ── HERO ── */}
      <section
        style={{
          background: '#fff',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid decoration */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: -40,
            top: -20,
            fontSize: 260,
            fontWeight: 800,
            color: 'rgba(0,0,0,0.03)',
            lineHeight: 1,
            userSelect: 'none',
            letterSpacing: '-8px',
          }}
        >
          NT
        </div>

        <motion.div
          style={{ ...S.section, position: 'relative' }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-4xl">
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: 20,
                  padding: '4px 12px',
                  fontSize: 12,
                  color: '#16a34a',
                  fontWeight: 500,
                }}
              >
                <span style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
                О сервисе
              </span>
              <span
                style={{
                  background: '#f5f4f0',
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: 20,
                  padding: '4px 12px',
                  fontSize: 12,
                  color: '#888',
                }}
              >
                NukaTruck
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(38px, 6vw, 72px)',
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-2px',
                color: '#0f0f0f',
                marginBottom: 20,
              }}
            >
              Веб-приложение для аренды{' '}
              <span
                style={{
                  display: 'inline-block',
                  background: '#0f0f0f',
                  color: '#fff',
                  borderRadius: 12,
                  padding: '2px 16px',
                  fontSize: 'clamp(30px, 5vw, 58px)',
                  letterSpacing: '-1px',
                }}
              >
                грузовых машин
              </span>
              <br />с умным подбором
            </h1>

            <p
              style={{
                fontSize: 16,
                color: '#888',
                lineHeight: 1.75,
                maxWidth: 560,
                marginBottom: 36,
                fontWeight: 400,
              }}
            >
              NukaTruck — это платформа, в которой пользователь может находить,
              публиковать и продвигать объявления о грузовом транспорте. Система
              сочетает каталог объявлений, VIP-формат продвижения и ИИ,
              который помогает подбирать подходящие варианты по обычному текстовому запросу.
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link
                to="/catalog"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#0f0f0f',
                  color: '#fff',
                  borderRadius: 20,
                  padding: '12px 22px',
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <Search size={15} color="#fff" />
                Перейти в каталог
              </Link>
              <Link
                to="/add"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#f5f4f0',
                  border: '1px solid rgba(0,0,0,0.09)',
                  color: '#0f0f0f',
                  borderRadius: 20,
                  padding: '12px 22px',
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <FilePlus2 size={15} />
                Разместить объявление
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── CARDS ── */}
      <section style={S.section}>
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: 36 }}
        >
          <p style={S.tag('#2563eb')}>Назначение платформы</p>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 12 }}>
            Для чего создано это приложение
          </h2>
          <p style={{ fontSize: 15, color: '#777', lineHeight: 1.75, maxWidth: 540 }}>
            Цель приложения — упростить поиск грузового транспорта и сделать процесс аренды более
            удобным как для арендаторов, так и для владельцев техники.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                style={S.card()}
              >
                <div style={S.iconBox('rgba(37,99,235,0.08)', '#2563eb')}>
                  <Icon size={20} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.3px' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: 13, color: '#777', lineHeight: 1.7 }}>{card.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── VIP SECTION ── */}
      <section style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={S.section}>
          <div className="grid gap-10 lg:grid-cols-2">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <p style={S.tag('#d97706')}>VIP-объявления</p>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 16 }}>
                В чем смысл VIP-формата
              </h2>
              <p style={{ fontSize: 15, color: '#777', lineHeight: 1.75, marginBottom: 24 }}>
                Главная идея VIP-объявления состоит не в увеличении количества фото, а в более
                сильной рекламной подаче. VIP-формат получает улучшенное визуальное оформление,
                анимации, акцентные блоки и повышенную заметность в каталоге.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {vipBenefits.map((item, i) => (
                  <motion.div
                    key={item}
                    variants={fadeUp} initial="hidden" whileInView="visible"
                    viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                    style={S.pill}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={{ duration: 0.65 }}
              style={{
                background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                border: '1px solid #fde68a',
                borderRadius: 20,
                padding: 28,
              }}
            >
              <div style={S.iconBox('#fbbf24', '#1a1a1a')}>
                <Crown size={20} />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 12, color: '#0f0f0f' }}>
                Почему VIP помогает быстрее найти клиента
              </h3>
              <p style={{ fontSize: 14, color: '#92400e', lineHeight: 1.75, marginBottom: 20 }}>
                VIP-объявление превращает обычную карточку транспорта в более привлекательную
                рекламную страницу, усиливает интерес и повышает шанс отклика.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: 'Выделение в каталоге', val: 'Выше заметность' },
                  { label: 'Оформление страницы', val: 'Premium-подача' },
                  { label: 'Восприятие клиентом', val: 'Больше доверия' },
                  { label: 'Бизнес-эффект', val: 'Больше откликов' },
                ].map(({ label, val }) => (
                  <div
                    key={label}
                    style={{
                      background: 'rgba(255,255,255,0.7)',
                      border: '1px solid rgba(251,191,36,0.3)',
                      borderRadius: 12,
                      padding: '12px 14px',
                    }}
                  >
                    <p style={{ fontSize: 11, color: '#b45309', marginBottom: 4 }}>{label}</p>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#0f0f0f' }}>{val}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PLANS ── */}
      <section style={S.section}>
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ marginBottom: 36 }}
        >
          <p style={S.tag('#2563eb')}>Сравнение форматов</p>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 12 }}>
            Обычное объявление и VIP
          </h2>
          <p style={{ fontSize: 15, color: '#777', lineHeight: 1.75, maxWidth: 540 }}>
            В приложении предусмотрено два формата публикации. Обычный вариант подходит для
            стандартного размещения, а VIP — для более сильной рекламной подачи.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-2">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.type}
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              style={S.card(plan.cardBorder)}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 4 }}>{plan.type}</h3>
                  <p style={{ fontSize: 13, color: '#aaa' }}>Формат публикации объявления</p>
                </div>
                <span style={{ ...plan.badgeStyle, borderRadius: 20, padding: '5px 14px', fontSize: 11, fontWeight: 700, letterSpacing: '1px' }}>
                  {plan.badge}
                </span>
              </div>

              <div
                style={{
                  background: '#f5f4f0',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: 12,
                  padding: '14px 16px',
                  marginBottom: 18,
                }}
              >
                <p style={{ fontSize: 11, color: '#aaa', marginBottom: 4 }}>Стоимость размещения</p>
                <p style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.5px', color: '#0f0f0f' }}>{plan.price}</p>
                {plan.type === 'VIP-объявление' && (
                  <p style={{ fontSize: 12, color: '#aaa', marginTop: 4 }}>
                    Стоимость можно изменить под бизнес-логику. Для диплома — демонстрация монетизации.
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {plan.items.map((item) => (
                  <div key={item} style={S.pill}>{item}</div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STEPS ── */}
      <section style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <div style={S.section}>
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ marginBottom: 36 }}
          >
            <p style={S.tag('#2563eb')}>Как разместить объявление</p>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 12 }}>
              Пошаговый процесс публикации
            </h2>
            <p style={{ fontSize: 15, color: '#777', lineHeight: 1.75, maxWidth: 500 }}>
              Размещение объявления построено так, чтобы пользователь мог быстро заполнить
              данные и опубликовать предложение в каталоге.
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.06 }}
                style={S.card()}
              >
                <div style={S.stepNum}>{item.step}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.3px' }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: '#777', lineHeight: 1.7 }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI + BUSINESS ── */}
      <section style={S.section}>
        <div className="grid gap-5 lg:grid-cols-2">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={S.card()}
          >
            <div style={S.iconBox('rgba(124,58,237,0.08)', '#7c3aed')}>
              <WandSparkles size={20} />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 12 }}>
              Как работает умный поиск
            </h2>
            <p style={{ fontSize: 14, color: '#777', lineHeight: 1.75, marginBottom: 20 }}>
              Пользователь может написать запрос обычным языком, например: «У меня 200 000 тг,
              нужно 2 грузовика для стройки в Алматы». Система анализирует текст и подбирает варианты.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                'Определение бюджета пользователя',
                'Анализ города, категории и параметров груза',
                'Подбор релевантных объявлений из базы',
                'Вывод рекомендаций в удобной форме',
              ].map((item) => (
                <div key={item} style={S.pill}>{item}</div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }} transition={{ duration: 0.65 }}
            style={S.card()}
          >
            <div style={S.iconBox('rgba(5,150,105,0.08)', '#059669')}>
              <BadgeDollarSign size={20} />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 12 }}>
              Бизнес-смысл платформы
            </h2>
            <p style={{ fontSize: 14, color: '#777', lineHeight: 1.75, marginBottom: 20 }}>
              Обычные объявления формируют базовый каталог сервиса, а VIP-размещение становится
              инструментом монетизации платформы.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: 'Для арендатора', val: 'Быстрый поиск транспорта' },
                { label: 'Для владельца', val: 'Удобное размещение' },
                { label: 'Для платформы', val: 'Монетизация через VIP' },
                { label: 'Для диплома', val: 'Fullstack-концепция' },
              ].map(({ label, val }) => (
                <div key={label} style={{ ...S.pill, borderRadius: 12 }}>
                  <p style={{ fontSize: 11, color: '#aaa', marginBottom: 4 }}>{label}</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#0f0f0f' }}>{val}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ paddingBottom: 64, paddingLeft: 32, paddingRight: 32, maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{
            background: '#0f0f0f',
            borderRadius: 24,
            padding: 40,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Grid decoration dark */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative' }} className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p style={{ ...S.tag('#60a5fa'), marginBottom: 8 }}>Начать работу</p>
              <h2
                style={{
                  fontSize: 'clamp(22px, 3.5vw, 38px)',
                  fontWeight: 800,
                  letterSpacing: '-1px',
                  color: '#fff',
                  marginBottom: 12,
                  lineHeight: 1.15,
                }}
              >
                Готов разместить грузовик или найти подходящий транспорт?
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, maxWidth: 480 }}>
                Перейди в каталог, чтобы посмотреть доступные варианты, или размести собственное
                объявление и выбери формат публикации.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
              <Link
                to="/catalog"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#fff',
                  color: '#0f0f0f',
                  borderRadius: 20,
                  padding: '13px 22px',
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                <Search size={15} />
                Каталог
              </Link>
              <Link
                to="/add"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#fff',
                  borderRadius: 20,
                  padding: '13px 22px',
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                <FilePlus2 size={15} />
                Разместить объявление
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}