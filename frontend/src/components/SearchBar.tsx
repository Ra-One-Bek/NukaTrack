import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function SearchBar({
  value,
  onChange,
  onSubmit,
}: SearchBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm md:flex-row">
      <div className="relative flex-1">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Например: У меня 200 тыс тг, нужно 2 грузовика в Алматы"
          className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 text-black"
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSubmit();
          }}
        />
      </div>

      <button
        onClick={onSubmit}
        className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        Подобрать
      </button>
    </div>
  );
}