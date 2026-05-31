import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/lib/providers';

export const metadata: Metadata = {
  title: 'Rechtschreiben Spiel',
  description: 'Lerne Deutsch – Buchstaben, Silben und Wörter!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body
        className="min-h-screen overflow-x-hidden"
        style={{
          background:
            'radial-gradient(ellipse at 15% 10%, rgba(147,197,253,0.35) 0%, transparent 45%), ' +
            'radial-gradient(ellipse at 85% 85%, rgba(96,165,250,0.25) 0%, transparent 45%), ' +
            'radial-gradient(ellipse at 50% 50%, rgba(219,234,254,0.6) 0%, transparent 70%), ' +
            '#dbeafe',
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
