import Header from '@/components/shared/Header';
import GameGuard from '@/components/shared/GameGuard';
import Link from 'next/link';

const TABS = [
  { href: '/anlaute', emoji: '🔤', label: 'Anlaute' },
  { href: '/silben', emoji: '✂️', label: 'Silben' },
  { href: '/endlaute', emoji: '🔚', label: 'Endlaute' },
  { href: '/woerter', emoji: '📝', label: 'Wörter' },
];

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <GameGuard>
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <Header />

        <nav className="flex gap-2 flex-wrap justify-center my-5">
          {TABS.map(tab => (
            <Link
              key={tab.href}
              href={tab.href}
              className="px-5 py-2 rounded-full font-bold border-2 border-blue-200 text-blue-700
                bg-white hover:border-blue-500 hover:bg-gradient-to-b hover:from-blue-500 hover:to-blue-700
                hover:text-white hover:border-transparent hover:shadow-[0_4px_12px_rgba(59,130,246,0.35)]
                transition-all duration-200 hover:-translate-y-0.5"
            >
              {tab.emoji} {tab.label}
            </Link>
          ))}
        </nav>

        {children}
      </div>
    </GameGuard>
  );
}
