export type GameModule = 'anlaute' | 'silben' | 'endlaute' | 'woerter';
export type Difficulty = 'leicht' | 'mittel' | 'schwer';
export type UserRole = 'CHILD' | 'PARENT';

export interface Question {
  id: number;
  type: GameModule;
  emoji: string;
  word: string;
  answer: string;
  wrongAnswer?: string | null;
  hint?: string | null;
  difficulty: Difficulty;
}

export interface GameSessionData {
  id: string;
  module: GameModule;
  difficulty: Difficulty;
  score: number;
  totalItems: number;
  completedAt: Date | null;
  createdAt: Date;
}

export interface UserProgress {
  totalScore: number;
  stars: number;
  badges: string[];
  streak: number;
  lastPlayed: Date | null;
}
