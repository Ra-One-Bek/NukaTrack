interface FilterChipsProps {
  onSelect: (text: string) => void;
}

const suggestions = [
  'Нужно 2 грузовика до 200 тыс тг',
  'Самосвал для стройки в Алматы',
  'Фура для дальних рейсов',
  'Недорогой грузовик для городской доставки',
];

export default function FilterChips({ onSelect }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
        >
          {item}
        </button>
      ))}
    </div>
  );
}