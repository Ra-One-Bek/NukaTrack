import type { Truck } from "../types/truck";

export const trucks: Truck[] = [
  {
    id: 1,
    title: "КамАЗ 65115",
    category: "Самосвал",
    brand: "КамАЗ",
    model: "65115",
    year: 2019,
    city: "Алматы",
    pricePerDay: 85000,
    capacityTons: 15,
    image:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80",
    description:
      "Надежный самосвал для стройки, вывоза сыпучих материалов и тяжелых работ.",
    features: ["15 тонн", "Дизель", "Подходит для стройки"],
    available: true,
  },
  {
    id: 2,
    title: "Volvo FH",
    category: "Фура",
    brand: "Volvo",
    model: "FH",
    year: 2020,
    city: "Алматы",
    pricePerDay: 120000,
    capacityTons: 20,
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
    description:
      "Фура для междугородних и международных перевозок, высокий комфорт и экономичность.",
    features: ["20 тонн", "Еврофура", "Дальние рейсы"],
    available: true,
  },
  {
    id: 3,
    title: "Газель Next",
    category: "Бортовой",
    brand: "ГАЗ",
    model: "Next",
    year: 2022,
    city: "Шымкент",
    pricePerDay: 45000,
    capacityTons: 2,
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    description:
      "Компактный и доступный бортовой грузовик для городской логистики.",
    features: ["2 тонны", "Экономичный", "Городская доставка"],
    available: true,
  },
  {
    id: 4,
    title: "MAN TGS",
    category: "Тент",
    brand: "MAN",
    model: "TGS",
    year: 2021,
    city: "Астана",
    pricePerDay: 95000,
    capacityTons: 10,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    description:
      "Тентованный грузовик для перевозки мебели, коробок и коммерческих грузов.",
    features: ["10 тонн", "Тент", "Универсальный"],
    available: true,
  },
  {
    id: 5,
    title: "Mercedes Actros",
    category: "Рефрижератор",
    brand: "Mercedes",
    model: "Actros",
    year: 2021,
    city: "Алматы",
    pricePerDay: 140000,
    capacityTons: 18,
    image:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=80",
    description:
      "Рефрижератор для перевозки продуктов, лекарств и других температурных грузов.",
    features: ["18 тонн", "Холодильник", "Температурный режим"],
    available: true,
  },
  {
    id: 6,
    title: "Isuzu NPR",
    category: "Манипулятор",
    brand: "Isuzu",
    model: "NPR",
    year: 2018,
    city: "Караганда",
    pricePerDay: 70000,
    capacityTons: 5,
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
    description:
      "Манипулятор для перевозки стройматериалов и работ с погрузкой/разгрузкой.",
    features: ["5 тонн", "Кран-манипулятор", "Стройматериалы"],
    available: true,
  },
];