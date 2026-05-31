'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/login');
    if (status === 'authenticated' && session?.user?.role !== 'PARENT') router.replace('/anlaute');
  }, [status, session, router]);

  if (status === 'loading' || session?.user?.role !== 'PARENT') {
    return <div className="text-center py-20 text-blue-500 font-bold text-lg animate-pulse">Laden...</div>;
  }

  return <ParentDashboard parentId={session.user.id} parentName={session.user.name ?? ''} />;
}

function StatCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-100">
      <div className="text-2xl font-black text-blue-900">{value}</div>
      <div className="text-xs text-blue-500 font-semibold mt-0.5">{label}</div>
    </div>
  );
}

function moduleEmoji(mod: string) {
  return { anlaute: '🔤', silben: '✂️', endlaute: '🔚', woerter: '📝' }[mod] ?? '🎮';
}

function ParentDashboard({ parentId, parentName }: { parentId: string; parentName: string }) {
  const { data: childrenProgress } = trpc.progress.childrenProgress.useQuery();
  const { data: childrenSessions } = trpc.session.childrenSessions.useQuery();
  const { data: leaderboard } = trpc.progress.leaderboard.useQuery();

  return (
    <main className="max-w-2xl mx-auto px-5 py-10">
      {/* Başlık */}
      <div className="mb-8">
        <h1 className="font-nunito font-black text-3xl text-blue-900"
          style={{ textShadow: '2px 2px 0 #93C5FD' }}>
          📊 Eltern-Dashboard
        </h1>
        <p className="text-blue-400 text-sm mt-0.5">Willkommen, {parentName}!</p>
      </div>

      {/* Eltern-ID */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mb-5 flex items-center gap-3">
        <span className="text-2xl">🔑</span>
        <div>
          <p className="text-xs font-bold text-blue-500 uppercase tracking-wide">Deine Eltern-ID</p>
          <p className="font-mono text-blue-900 font-bold text-sm break-all">{parentId}</p>
          <p className="text-xs text-blue-400 mt-0.5">Teile diese ID mit deinem Kind bei der Registrierung.</p>
        </div>
      </div>

      {/* Çocukların ilerlemesi */}
      <div className="bg-white rounded-2xl border-2 border-blue-200 p-5 mb-5
        shadow-[0_4px_20px_rgba(59,130,246,0.10)]">
        <h2 className="font-bold text-blue-800 text-lg mb-4 flex items-center gap-2">
          <span className="text-xl">👨‍👧‍👦</span> Meine Kinder
        </h2>
        {!childrenProgress?.length ? (
          <p className="text-blue-400 text-sm text-center py-4">
            Noch keine Kinder verknüpft.<br />
            <span className="text-xs">Dein Kind muss deine Eltern-ID bei der Registrierung angeben.</span>
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {(childrenProgress ?? []).map(({ child, progress }) => (
              <div key={child.id} className="bg-blue-50 rounded-xl border border-blue-100 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">👦</span>
                  <span className="font-black text-blue-900">{child.name}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <StatCard label="Punkte" value={progress.totalScore} />
                  <StatCard label="Sterne" value={`${'⭐'.repeat(Math.min(progress.stars, 5))}${'☆'.repeat(Math.max(0, 5 - progress.stars))}`} />
                  <StatCard label="Streak" value={`${progress.streak} 🔥`} />
                </div>
                {progress.lastPlayed && (
                  <p className="text-xs text-blue-400 mt-2 text-right">
                    Zuletzt gespielt: {new Date(progress.lastPlayed).toLocaleDateString('de-DE')}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Çocukların son oyunları */}
      <div className="bg-white rounded-2xl border-2 border-blue-200 p-5 mb-5
        shadow-[0_4px_20px_rgba(59,130,246,0.10)]">
        <h2 className="font-bold text-blue-800 text-lg mb-4 flex items-center gap-2">
          <span className="text-xl">🎮</span> Letzte Spiele der Kinder
        </h2>
        {!childrenSessions?.length ? (
          <p className="text-blue-400 text-sm text-center py-4">Noch keine Spiele.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {(childrenSessions ?? []).map(s => (
              <div key={s.id}
                className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100 text-sm">
                <span className="text-lg">{moduleEmoji(s.module)}</span>
                <span className="font-bold text-blue-800 flex-1">{s.childName}</span>
                <span className="text-blue-600 font-semibold capitalize">{s.module}</span>
                <span className="text-blue-400 text-xs bg-blue-100 px-2 py-0.5 rounded-full">{s.difficulty}</span>
                <span className="font-black text-blue-700">{s.score} Pkt.</span>
                <span>{s.completedAt ? '✅' : '⏳'}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bestenliste */}
      <div className="bg-white rounded-2xl border-2 border-blue-200 p-5
        shadow-[0_4px_20px_rgba(59,130,246,0.10)]">
        <h2 className="font-bold text-blue-800 text-lg mb-4 flex items-center gap-2">
          <span className="text-xl">🏆</span> Bestenliste
        </h2>
        {!leaderboard?.length
          ? <p className="text-blue-400 text-sm text-center py-4">Noch keine Einträge.</p>
          : (leaderboard ?? []).map((entry, i) => (
            <div key={entry.id}
              className="flex items-center gap-3 p-2.5 border-b border-blue-50 last:border-0
                hover:bg-blue-50/50 rounded-lg transition-colors">
              <span className={`font-black w-7 text-center text-sm rounded-full px-1
                ${i === 0 ? 'text-yellow-600 bg-yellow-100' : i === 1 ? 'text-gray-500 bg-gray-100' : i === 2 ? 'text-orange-600 bg-orange-100' : 'text-blue-400'}`}>
                {i + 1}.
              </span>
              <span className="flex-1 font-bold text-blue-900">{entry.user?.name ?? 'Anonym'}</span>
              <span className="font-black text-blue-700 bg-blue-100 px-3 py-0.5 rounded-full text-sm">
                {entry.totalScore}
              </span>
            </div>
          ))
        }
      </div>
    </main>
  );
}
