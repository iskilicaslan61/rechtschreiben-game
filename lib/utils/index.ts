export function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function clamp(val: number, min: number, max: number) {
  return Math.min(max, Math.max(min, val));
}
