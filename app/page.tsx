import Link from 'next/link';
import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import { FinancialHero } from '@/components/ui/hero-section';
import { GameFloatingSection } from '@/components/ui/game-floating-section';
import { Footer } from '@/components/ui/footer';
import ElternSection from '@/components/ui/a-modern-hero-section';
import { BookOpen, X, MessageCircle, Share2 } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* 1 — Animated Dark Hero */}
      <HeroGeometric
        badge="Rechtschreiben Spiel"
        title1="Deutsch lernen"
        title2="macht Spaß!"
        subtitle="Ein interaktives Lernspiel für Kinder – Buchstaben, Silben und Wörter spielerisch üben. Eltern behalten den Überblick."
        ctaPrimary={
          <Link
            href="/login"
            className="px-8 py-3.5 bg-gradient-to-b from-blue-400 to-blue-600 text-white font-bold rounded-full
              shadow-[0_4px_20px_rgba(59,130,246,0.5)] hover:shadow-[0_6px_28px_rgba(59,130,246,0.7)]
              hover:-translate-y-0.5 transition-all duration-200 text-sm"
          >
            🔐 Anmelden
          </Link>
        }
        ctaSecondary={
          <Link
            href="/register"
            className="px-8 py-3.5 border-2 border-white/20 text-white/80 font-bold rounded-full bg-white/5
              hover:border-white/40 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200 text-sm"
          >
            ✏️ Registrieren
          </Link>
        }
      />

      {/* 2 — Grid Hero */}
      <FinancialHero
        title={
          <>
            Spielerisch{' '}
            <span className="text-primary">Lesen lernen</span>
          </>
        }
        description="Mit bunten Spielen Buchstaben, Silben und Wörter üben – für Kinder von 6 bis 10 Jahren. Leicht, mittel oder schwer – du wählst das Tempo!"
        buttonText="Jetzt starten"
        buttonLink="/register"
        imageUrl1="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80"
        imageUrl2="https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&auto=format&fit=crop&q=80"
      />

      {/* 3 — Floating Icons: Was lernst du hier? */}
      <GameFloatingSection />

      {/* 4 — Für Eltern */}
      <ElternSection />
      {/* 5 — Footer */}
      <Footer
        logo={<BookOpen className="h-8 w-8 text-blue-600" />}
        brandName="Rechtschreiben Spiel"
        socialLinks={[
          { icon: <X className="h-4 w-4" />,              href: "#", label: "X (Twitter)" },
          { icon: <MessageCircle className="h-4 w-4" />,   href: "#", label: "Telegram" },
          { icon: <Share2 className="h-4 w-4" />,          href: "#", label: "Teilen" },
        ]}
        mainLinks={[
          { href: "/login", label: "Anmelden" },
          { href: "/login", label: "Registrieren" },
          { href: "/#features", label: "Spielmodi" },
          { href: "/#eltern", label: "Für Eltern" },
        ]}
        legalLinks={[
          { href: "#", label: "Datenschutz" },
          { href: "#", label: "Impressum" },
          { href: "#", label: "AGB" },
        ]}
        copyright={{
          text: `© ${new Date().getFullYear()} Rechtschreiben Spiel`,
          license: "Alle Rechte vorbehalten.",
        }}
      />
    </>
  );
}
