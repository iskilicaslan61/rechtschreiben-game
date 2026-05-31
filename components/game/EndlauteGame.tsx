'use client';
import { useState, useEffect } from 'react';
import type { Question } from '@/types';
import ProgressBar from '@/components/shared/ProgressBar';
import Confetti from '@/components/shared/Confetti';

interface Props {
  questions: Question[];
  onScore: (pts: number) => void;
  onComplete: () => void;
}

type Status = 'idle' | 'correct' | 'wrong';

export default function EndlauteGame({ questions, onScore, onComplete }: Props) {
  const [values, setValues] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setValues(questions.map(() => ''));
    setStatuses(questions.map(() => 'idle'));
    setDone(false);
  }, [questions]);

  const check = () => {
    let gained = 0;
    let allRight = true;
    const next = questions.map((q, i) => {
      const val = values[i]?.toLowerCase() ?? '';
      if (!val) { allRight = false; return 'idle' as Status; }
      if (val === q.answer) { gained++; return 'correct' as Status; }
      allRight = false;
      return 'wrong' as Status;
    });
    setStatuses(next);
    if (gained > 0) onScore(gained);
    if (allRight) { setDone(true); onComplete(); }
  };

  const correctCount = statuses.filter(s => s === 'correct').length;

  return (
    <div>
      <Confetti show={done} />
      <ProgressBar current={correctCount} total={questions.length} />

      <div className="grid grid-cols-2 gap-3">
        {questions.map((q, i) => (
          <div
            key={q.id}
            className={`bg-white rounded-2xl border-2 p-4 flex items-center gap-2 transition-all duration-200
              ${statuses[i] === 'correct' ? 'border-blue-500 bg-blue-50' : ''}
              ${statuses[i] === 'wrong' ? 'border-red-400 bg-red-50 animate-shake' : ''}
              ${statuses[i] === 'idle' ? 'border-gray-200 hover:border-blue-200' : ''}`}
          >
            <span className="text-3xl min-w-[44px] text-center">{q.emoji}</span>
            <span className="font-bold text-blue-800 text-lg flex-1 font-nunito">{q.hint}</span>
            <input
              type="text"
              maxLength={1}
              value={values[i] ?? ''}
              onChange={e =>
                setValues(prev => prev.map((v, idx) => idx === i ? e.target.value : v))
              }
              onKeyDown={e => e.key === 'Enter' && check()}
              placeholder="?"
              className="w-10 text-center text-xl font-black border-b-4 border-dashed border-blue-300
                bg-transparent text-blue-900 outline-none lowercase focus:border-blue-500 transition-colors"
            />
            <span className="text-lg min-w-[24px] text-center">
              {statuses[i] === 'correct' ? '✅' : statuses[i] === 'wrong' ? '❌' : ''}
            </span>
          </div>
        ))}
      </div>

      {done && (
        <div className="text-center text-3xl py-4 font-black text-blue-700 animate-pop mt-2">
          ⭐ Wunderschön! ⭐
        </div>
      )}

      <div className="flex justify-center mt-5">
        <button
          onClick={check}
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full shadow-md
            hover:bg-blue-700 active:translate-y-0.5 transition-all"
        >
          ✅ Prüfen
        </button>
      </div>
    </div>
  );
}
