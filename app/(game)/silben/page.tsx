'use client';
import { useCallback } from 'react';
import { trpc } from '@/lib/trpc';
import { useGameStore } from '@/lib/store/gameStore';
import { useTimer } from '@/lib/hooks/useTimer';
import { useGameSession } from '@/lib/hooks/useGameSession';
import SilbenGame from '@/components/game/SilbenGame';
import DifficultySelector from '@/components/shared/DifficultySelector';
import Timer from '@/components/shared/Timer';
import type { Difficulty } from '@/types';

export default function SilbenPage() {
  const { difficulty, setDifficulty, addScore, resetSession } = useGameStore();
  const { save } = useGameSession('silben', difficulty);

  const { data: questions = [], refetch, isFetching } = trpc.content.getQuestions.useQuery(
    { type: 'silben', difficulty },
    { staleTime: 0 }
  );

  const handleExpire = useCallback(() => {}, []);
  const { timeLeft, maxTime, start, stop } = useTimer(difficulty, handleExpire);

  const handleDifficulty = (d: Difficulty) => {
    stop(); setDifficulty(d); resetSession(); refetch();
  };

  const handleComplete = () => {
    stop();
    save(useGameStore.getState().sessionScore, questions.length, true);
  };

  const handleReset = () => {
    stop();
    save(useGameStore.getState().sessionScore, questions.length, false);
    resetSession();
    refetch().then(() => start());
  };

  return (
    <div>
      <DifficultySelector value={difficulty} onChange={handleDifficulty} />
      <Timer timeLeft={timeLeft} maxTime={maxTime} />

      <div className="font-nunito font-black text-xl text-blue-900 bg-gradient-to-r from-blue-50
        to-blue-100 border-2 border-blue-200 rounded-2xl px-5 py-3 text-center mb-2">
        ✂️ Silben – Wähle die richtige erste Silbe!
      </div>
      <p className="text-center text-blue-400 text-sm mb-4">Klicke auf die richtige Silbe!</p>

      {isFetching ? (
        <div className="text-center text-blue-400 py-12 text-lg">Lade...</div>
      ) : (
        <SilbenGame questions={questions} onScore={addScore} onComplete={handleComplete} />
      )}

      <div className="flex justify-center mt-6">
        <button onClick={handleReset}
          className="px-7 py-3 bg-orange-400 text-white font-bold rounded-full shadow-md hover:bg-orange-500 transition-all active:translate-y-0.5">
          🔄 Neu
        </button>
      </div>
    </div>
  );
}
