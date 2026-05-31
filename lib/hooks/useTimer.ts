'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { Difficulty } from '@/types';

const TIMES: Record<Difficulty, number> = {
  leicht: 90,
  mittel: 60,
  schwer: 40,
};

export function useTimer(difficulty: Difficulty, onExpire: () => void) {
  const maxTime = TIMES[difficulty];
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const start = useCallback(() => {
    stop();
    setTimeLeft(TIMES[difficulty]);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          onExpireRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [difficulty, stop]);

  const reset = useCallback(() => {
    stop();
    setTimeLeft(TIMES[difficulty]);
  }, [difficulty, stop]);

  useEffect(() => () => stop(), [stop]);

  return { timeLeft, maxTime, start, stop, reset };
}
