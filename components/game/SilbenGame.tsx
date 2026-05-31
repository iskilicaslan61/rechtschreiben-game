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

type RowStatus = 'idle' | 'correct' | 'wrong';

interface RowState {
  status: RowStatus;
  chosen: string | null;
  options: [string, string];
}

export default function SilbenGame({ questions, onScore, onComplete }: Props) {
  const [rows, setRows] = useState<RowState[]>([]);
  const [solvedCount, setSolvedCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setRows(
      questions.map(q => {
        const opts: [string, string] =
          Math.random() > 0.5
            ? [q.answer, q.wrongAnswer ?? '?']
            : [q.wrongAnswer ?? '?', q.answer];
        return { status: 'idle', chosen: null, options: opts };
      })
    );
    setSolvedCount(0);
    setDone(false);
  }, [questions]);

  const pick = (i: number, chosen: string) => {
    if (rows[i]?.status === 'correct') return;
    const isRight = chosen === questions[i].answer;

    setRows(prev =>
      prev.map((r, idx) =>
        idx === i ? { ...r, status: isRight ? 'correct' : 'wrong', chosen } : r
      )
    );

    if (isRight) {
      onScore(2);
      const next = solvedCount + 1;
      setSolvedCount(next);
      if (next === questions.length) { setDone(true); onComplete(); }
    } else {
      setTimeout(() => {
        setRows(prev =>
          prev.map((r, idx) =>
            idx === i && r.status === 'wrong' ? { ...r, status: 'idle', chosen: null } : r
          )
        );
      }, 700);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Confetti show={done} />
      <ProgressBar current={solvedCount} total={questions.length} />

      {questions.map((q, i) => {
        const row = rows[i];
        if (!row) return null;
        return (
          <div
            key={q.id}
            className={`bg-white rounded-2xl border-2 p-4 flex items-center gap-3 transition-all duration-200
              ${row.status === 'correct'
                ? 'border-blue-500 bg-blue-50 shadow-[0_2px_12px_rgba(59,130,246,0.2)]'
                : ''}
              ${row.status === 'wrong' ? 'border-red-400 bg-red-50 animate-shake' : ''}
              ${row.status === 'idle' ? 'border-blue-100 hover:border-blue-200' : ''}`}
          >
            <span className="text-3xl min-w-[44px] text-center">{q.emoji}</span>
            <div className="flex-1 font-bold text-blue-800 text-lg font-nunito">
              {row.status === 'correct' ? q.word : `___ ${q.word.slice(q.answer.length)}`}
            </div>
            <div className="flex gap-2">
              {row.options.map((opt, j) => (
                <button
                  key={j}
                  onClick={() => pick(i, opt)}
                  className={`px-4 py-1.5 rounded-xl font-bold border-2 text-sm transition-all duration-150
                    ${row.chosen === opt && row.status === 'correct'
                      ? 'bg-gradient-to-b from-blue-500 to-blue-700 text-white border-transparent shadow-[0_3px_8px_rgba(59,130,246,0.4)]'
                      : ''}
                    ${row.chosen === opt && row.status === 'wrong'
                      ? 'bg-red-400 text-white border-red-400'
                      : ''}
                    ${row.status === 'idle' || row.chosen !== opt
                      ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-400 hover:scale-105'
                      : ''}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      {done && (
        <div className="text-center text-3xl py-4 font-black text-blue-700 animate-pop">
          🌟 Fantastisch! 🌟
        </div>
      )}
    </div>
  );
}
