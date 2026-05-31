'use client';
import { useState, useEffect } from 'react';
import type { Question } from '@/types';
import { shuffleArray } from '@/lib/utils';
import ProgressBar from '@/components/shared/ProgressBar';
import Confetti from '@/components/shared/Confetti';

interface Props {
  questions: Question[];
  onScore: (pts: number) => void;
  onComplete: () => void;
}

interface Tile {
  idx: number;
  letter: string;
  selected: boolean;
}

interface WordState {
  tiles: Tile[];
  selected: { idx: number; letter: string }[];
  done: boolean;
  wrong: boolean;
}

export default function WoerterGame({ questions, onScore, onComplete }: Props) {
  const [words, setWords] = useState<WordState[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setWords(
      questions.map(q => ({
        tiles: shuffleArray(q.answer.split('')).map((letter, idx) => ({
          idx,
          letter,
          selected: false,
        })),
        selected: [],
        done: false,
        wrong: false,
      }))
    );
    setDone(false);
  }, [questions]);

  const removeLetter = (wordIdx: number, selIdx: number) => {
    setWords(prev =>
      prev.map((w, wi) => {
        if (wi !== wordIdx || w.done) return w;
        const removed = w.selected[selIdx];
        return {
          ...w,
          selected: w.selected.filter((_, i) => i !== selIdx),
          tiles: w.tiles.map(t => t.idx === removed.idx ? { ...t, selected: false } : t),
        };
      })
    );
  };

  const pickLetter = (wordIdx: number, tileIdx: number) => {
    setWords(prev => {
      const next = prev.map(w => ({ ...w, tiles: [...w.tiles], selected: [...w.selected] }));
      const word = next[wordIdx];
      if (!word || word.done) return prev;

      const tile = word.tiles[tileIdx];
      if (!tile) return prev;

      if (tile.selected) {
        word.tiles[tileIdx] = { ...tile, selected: false };
        word.selected = word.selected.filter(s => s.idx !== tileIdx);
        return next;
      }

      word.tiles[tileIdx] = { ...tile, selected: true };
      const newSelected = [...word.selected, { idx: tileIdx, letter: tile.letter }];
      word.selected = newSelected;

      if (newSelected.length === questions[wordIdx].answer.length) {
        const formed = newSelected.map(s => s.letter).join('');
        if (formed === questions[wordIdx].answer) {
          word.done = true;
          onScore(3);
          if (next.every(w => w.done)) {
            setDone(true);
            onComplete();
          }
        } else {
          word.wrong = true;
          setTimeout(() => {
            setWords(p =>
              p.map((w, i) =>
                i === wordIdx
                  ? { ...w, wrong: false, selected: [], tiles: w.tiles.map(t => ({ ...t, selected: false })) }
                  : w
              )
            );
          }, 700);
        }
      }
      return next;
    });
  };

  const solvedCount = words.filter(w => w.done).length;

  return (
    <div>
      <Confetti show={done} />
      <ProgressBar current={solvedCount} total={questions.length} />

      <div className="grid grid-cols-2 gap-4">
        {questions.map((q, i) => {
          const word = words[i];
          if (!word) return null;
          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl border-2 p-4 flex flex-col items-center gap-3 transition-all
                ${word.done ? 'border-blue-500 bg-blue-50 shadow-[0_2px_12px_rgba(59,130,246,0.2)]' : ''}
                ${word.wrong ? 'border-red-400 bg-red-50 animate-shake' : ''}
                ${!word.done && !word.wrong ? 'border-blue-100 hover:border-blue-200' : ''}`}
            >
              <span className="text-4xl">{q.emoji}</span>

              <div className="flex flex-wrap gap-1.5 justify-center">
                {word.tiles.map((tile, j) => (
                  <button
                    key={j}
                    onClick={() => pickLetter(i, j)}
                    className={`w-9 h-11 rounded-xl border-2 font-black text-lg transition-all duration-150
                      ${tile.selected
                        ? word.done
                          ? 'bg-gradient-to-b from-blue-500 to-blue-700 border-transparent text-white shadow-sm'
                          : 'bg-blue-500 border-blue-700 text-white -translate-y-1 shadow-sm'
                        : 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100 hover:border-blue-400 hover:-translate-y-1'
                      }`}
                  >
                    {tile.letter}
                  </button>
                ))}
              </div>

              <div
                className={`flex gap-1.5 min-h-12 rounded-xl px-3 py-1 min-w-28 justify-center
                  items-center border-2 border-dashed flex-wrap transition-all
                  ${word.selected.length ? 'border-blue-400 bg-blue-50' : 'border-blue-100 bg-blue-50/30'}`}
              >
                {word.selected.length === 0 ? (
                  <span className="text-blue-200 text-sm font-bold">?</span>
                ) : (
                  word.selected.map((s, j) => (
                    <div
                      key={j}
                      onClick={() => removeLetter(i, j)}
                      className="w-8 h-10 bg-indigo-100 border-2 border-indigo-300 rounded-lg flex
                        items-center justify-center font-black text-indigo-700 cursor-pointer
                        hover:bg-indigo-200 hover:border-indigo-400 transition-colors text-base"
                    >
                      {s.letter}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {done && (
        <div className="text-center text-3xl py-4 font-black text-blue-700 animate-pop mt-2">
          🏆 Klasse! Du bist super! 🏆
        </div>
      )}
    </div>
  );
}
