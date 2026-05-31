'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Difficulty, GameModule } from '@/types';

interface GameState {
  score: number;
  stars: number;
  difficulty: Difficulty;
  activeModule: GameModule;
  sessionScore: number;
  addScore: (pts: number) => void;
  setDifficulty: (d: Difficulty) => void;
  setActiveModule: (m: GameModule) => void;
  resetSession: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      score: 0,
      stars: 1,
      difficulty: 'mittel',
      activeModule: 'anlaute',
      sessionScore: 0,

      addScore: (pts) =>
        set((state) => {
          const newScore = state.score + pts;
          const stars = Math.min(5, Math.floor(newScore / 5) + 1);
          return { score: newScore, stars, sessionScore: state.sessionScore + pts };
        }),

      setDifficulty: (difficulty) => set({ difficulty }),
      setActiveModule: (activeModule) => set({ activeModule }),
      resetSession: () => set({ sessionScore: 0 }),
    }),
    { name: 'rechtschreiben-game-store' }
  )
);
