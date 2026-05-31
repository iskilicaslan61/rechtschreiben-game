'use client';
import { useEffect, useState } from 'react';

const COLORS = ['#3B82F6', '#FFD54F', '#FF8A65', '#F48FB1', '#A855F7', '#10B981'];

interface Particle {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
}

export default function Confetti({ show }: { show: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!show) return;
    const ps: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 1.5,
      duration: 1.5 + Math.random() * 1,
    }));
    setParticles(ps);
    const t = setTimeout(() => setParticles([]), 4000);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed w-2.5 h-2.5 rounded-sm pointer-events-none z-50"
          style={{
            left: `${p.left}vw`,
            top: '-20px',
            backgroundColor: p.color,
            animationName: 'fall',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'linear',
            animationFillMode: 'forwards',
          }}
        />
      ))}
    </>
  );
}
