"use client";

import { FloatingIconsHero } from '@/components/ui/floating-icons-hero-section';
import {
  BookOpen, Star, Pencil, Trophy, Smile, Zap, GraduationCap,
  Lightbulb, Music, Palette, Target, Heart, Gamepad2, Globe,
  Sparkles, Brain,
} from 'lucide-react';

const gameIcons = [
  { id: 1,  icon: BookOpen,      className: 'top-[10%] left-[8%]' },
  { id: 2,  icon: Star,          className: 'top-[15%] right-[10%]' },
  { id: 3,  icon: Pencil,        className: 'top-[75%] left-[12%]' },
  { id: 4,  icon: Trophy,        className: 'bottom-[12%] right-[10%]' },
  { id: 5,  icon: Smile,         className: 'top-[5%] left-[30%]' },
  { id: 6,  icon: Zap,           className: 'top-[5%] right-[28%]' },
  { id: 7,  icon: GraduationCap, className: 'bottom-[8%] left-[28%]' },
  { id: 8,  icon: Lightbulb,     className: 'top-[42%] left-[5%]' },
  { id: 9,  icon: Music,         className: 'top-[72%] right-[22%]' },
  { id: 10, icon: Palette,       className: 'top-[88%] left-[65%]' },
  { id: 11, icon: Target,        className: 'top-[48%] right-[5%]' },
  { id: 12, icon: Heart,         className: 'top-[55%] left-[5%]' },
  { id: 13, icon: Gamepad2,      className: 'top-[5%] left-[52%]' },
  { id: 14, icon: Globe,         className: 'bottom-[5%] right-[42%]' },
  { id: 15, icon: Sparkles,      className: 'top-[28%] right-[18%]' },
  { id: 16, icon: Brain,         className: 'top-[62%] left-[28%]' },
// eslint-disable-next-line @typescript-eslint/no-explicit-any
] as any[];

export function GameFloatingSection() {
  return (
    <FloatingIconsHero
      title="Was lernst du hier?"
      subtitle="4 Spielmodi – Anlaute, Silben, Endlaute und Wörter. Bewege die Maus und entdecke die Welt des Lernens!"
      ctaText="Jetzt registrieren →"
      ctaHref="/register"
      icons={gameIcons}
    />
  );
}
