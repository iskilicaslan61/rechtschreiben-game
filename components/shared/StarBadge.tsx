'use client';

interface Props {
  stars: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarBadge({ stars, size = 'md' }: Props) {
  const sizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl' };
  return (
    <div className={`flex gap-1 ${sizes[size]}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < stars ? '⭐' : '☆'}</span>
      ))}
    </div>
  );
}
