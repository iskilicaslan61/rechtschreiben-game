'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useGameStore } from '@/lib/store/gameStore';

export default function Header() {
  const { data: session } = useSession();
  const { score, stars } = useGameStore();
  const starsDisplay = '⭐'.repeat(stars) + '☆'.repeat(5 - stars);

  return (
    <header className="text-center pt-6 pb-4">
      <h1
        className="font-nunito font-black text-4xl text-blue-900 leading-tight"
        style={{ textShadow: '2px 2px 0 #93C5FD, 4px 4px 0 rgba(30,58,138,0.1)' }}
      >
        🌟 Rechtschreiben Spiel 🌟
      </h1>
      <p className="text-blue-500 mt-1 text-base font-semibold">
        Lerne Deutsch – Buchstaben, Silben und Wörter!
      </p>

      <div className="flex items-center justify-center gap-4 mt-3">
        <div className="bg-white border-2 border-blue-200 rounded-2xl px-4 py-1.5 shadow-sm flex items-center gap-2">
          <span className="text-lg tracking-wide">{starsDisplay}</span>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-black text-base
          rounded-2xl px-4 py-1.5 shadow-[0_3px_10px_rgba(59,130,246,0.4)]">
          {score} Punkte
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-3 text-sm">
        {session ? (
          <>
            <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full border border-blue-200">
              👤 {session.user?.name}
            </span>
            {session.user?.role === 'PARENT' && (
              <Link href="/dashboard"
                className="text-blue-600 font-semibold hover:text-blue-800 px-3 py-1 rounded-full
                  hover:bg-blue-100 transition-colors">
                📊 Dashboard
              </Link>
            )}
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-blue-400 hover:text-blue-600 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors"
            >
              Abmelden
            </button>
          </>
        ) : (
          <>
            <Link href="/login"
              className="text-blue-600 font-semibold hover:text-blue-800 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
              Anmelden
            </Link>
            <Link href="/register"
              className="text-blue-600 font-semibold hover:text-blue-800 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
              Registrieren
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
