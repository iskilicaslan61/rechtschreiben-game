'use client';

interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3 my-3">
      <span className="text-sm text-blue-600 font-bold whitespace-nowrap bg-blue-100 px-2.5 py-0.5 rounded-full">
        {current}/{total}
      </span>
      <div className="flex-1 h-3 bg-blue-100 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)',
            boxShadow: '0 1px 6px rgba(59,130,246,0.5)',
          }}
        />
      </div>
      <span className="text-xs text-blue-500 font-bold w-8 text-right">{Math.round(pct)}%</span>
    </div>
  );
}
