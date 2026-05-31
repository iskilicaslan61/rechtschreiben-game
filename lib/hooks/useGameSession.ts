'use client';
import { useSession } from 'next-auth/react';
import { trpc } from '@/lib/trpc';
import type { Difficulty, GameModule } from '@/types';

export function useGameSession(module: GameModule, difficulty: Difficulty) {
  const { data: session } = useSession();
  const saveSession = trpc.session.save.useMutation();

  const save = (score: number, totalItems: number, completed: boolean) => {
    if (!session?.user?.id) return;
    saveSession.mutate({ module, difficulty, score, totalItems, completed });
  };

  return { save, isLoggedIn: !!session?.user };
}
