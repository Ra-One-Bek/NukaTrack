export type TruckCategory =
  | "Тент"
  | "Фура"
  | "Самосвал"
  | "Рефрижератор"
  | "Бортовой"
  | "Манипулятор";

export interface Truck {
  id: number;
  title: string;
  category: TruckCategory;
  brand: string;
  model: string;
  year: number;
  city: string;
  pricePerDay: number;
  capacityTons: number;
  image: string;
  description: string;
  features: string[];
  available: boolean;
}