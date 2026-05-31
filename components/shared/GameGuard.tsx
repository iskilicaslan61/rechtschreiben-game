'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function GameGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.replace('/login');
    if (status === 'authenticated' && session?.user?.role === 'PARENT') router.replace('/dashboard');
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-blue-500 font-bold text-lg animate-pulse">Laden...</div>
      </div>
    );
  }

  if (status !== 'authenticated' || session?.user?.role === 'PARENT') return null;

  return <>{children}</>;
}
