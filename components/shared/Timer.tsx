'use client';

interface Props {
  timeLeft: number;
  maxTime: number;
}

export default function Timer({ timeLeft, maxTime }: Props) {
  const pct = maxTime > 0 ? (timeLeft / maxTime) * 100 : 0;
  const urgent = timeLeft <= 10 && timeLeft > 0;

  return (
    <div className="mx-auto max-w-sm my-3 px-4">
      <div className={`text-center font-black text-xl mb-1.5 transition-colors ${urgent ? 'text-red-500 animate-pulse' : 'text-blue-700'}`}>
        ⏱️ {timeLeft}s
      </div>
      <div className="h-3 bg-blue-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-linear ${urgent ? 'bg-red-400' : 'bg-blue-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
