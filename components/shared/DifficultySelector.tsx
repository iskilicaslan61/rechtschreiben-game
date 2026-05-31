'use client';
import type { Difficulty } from '@/types';

const LEVELS: { key: Difficulty; label: string; emoji: string }[] = [
  { key: 'leicht', label: 'Leicht', emoji: '🟢' },
  { key: 'mittel', label: 'Mittel', emoji: '🟡' },
  { key: 'schwer', label: 'Schwer', emoji: '🔴' },
];

interface Props {
  value: Difficulty;
  onChange: (d: Difficulty) => void;
}

export default function DifficultySelector({ value, onChange }: Props) {
  return (
    <div className="flex justify-center gap-3 my-4">
      {LEVELS.map(({ key, label, emoji }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-5 py-2 rounded-full font-bold text-sm border-2 transition-all duration-200
            ${value === key
              ? 'bg-gradient-to-b from-blue-500 to-blue-700 border-transparent text-white shadow-[0_4px_12px_rgba(59,130,246,0.4)] scale-105'
              : 'bg-white border-blue-200 text-blue-700 hover:border-blue-400 hover:scale-105 hover:shadow-sm'
            }`}
        >
          {emoji} {label}
        </button>
      ))}
    </div>
  );
}
