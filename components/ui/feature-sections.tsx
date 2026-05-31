"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface FeatureItem {
  tag: string;
  title: string;
  highlight: string;
  desc: string;
  cta: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
  reverse?: boolean;
}

const features: FeatureItem[] = [
  {
    tag: "🔤 Anlaute",
    title: "Spielerisch",
    highlight: "Lesen lernen",
    desc: "Mit bunten Spielen Buchstaben, Silben und Wörter üben – für Kinder von 6 bis 10 Jahren. Leicht, mittel oder schwer – du wählst das Tempo!",
    cta: "Jetzt starten",
    href: "/login",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&auto=format&fit=crop&q=80",
    imageAlt: "Kind lernt",
    reverse: false,
  },
  {
    tag: "⭐ Fortschritt",
    title: "Jeden Tag",
    highlight: "besser werden",
    desc: "Sammle Sterne und Punkte bei jedem Spielmodul. Das Streak-System motiviert dein Kind, täglich zu üben – spielerisch und ohne Druck.",
    cta: "Konto erstellen",
    href: "/login",
    imageUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=700&auto=format&fit=crop&q=80",
    imageAlt: "Lernfortschritt",
    reverse: true,
  },
  {
    tag: "👨‍👩‍👧 Eltern",
    title: "Fortschritt",
    highlight: "immer im Blick",
    desc: "Eltern erhalten ihr eigenes Dashboard mit Echtzeit-Statistiken. Verknüpfe deine Kinder und behalte Punkte, Sterne und Spielverlauf immer im Überblick.",
    cta: "Elternteil-Konto",
    href: "/login",
    imageUrl: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=700&auto=format&fit=crop&q=80",
    imageAlt: "Eltern und Kind",
    reverse: false,
  },
  {
    tag: "🎮 Spielmodi",
    title: "4 spannende",
    highlight: "Lernmodi",
    desc: "Anlaute, Silben, Endlaute und Wörter – vier abwechslungsreiche Spielmodi trainieren verschiedene Aspekte der Rechtschreibung und machen Lernen zum Erlebnis.",
    cta: "Alle Modi entdecken",
    href: "/login",
    imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=700&auto=format&fit=crop&q=80",
    imageAlt: "Spielmodi",
    reverse: true,
  },
];

function FeatureSection({ item, index }: { item: FeatureItem; index: number }) {
  const isReverse = item.reverse;

  return (
    <div className="relative overflow-hidden">
      {/* Çapraz ayırıcı */}
      {index > 0 && (
        <div
          className="absolute top-0 left-0 w-full h-16 z-10"
          style={{
            background: index % 2 === 0
              ? "linear-gradient(to bottom right, #f0f9ff 50%, transparent 50%)"
              : "linear-gradient(to bottom left, white 50%, transparent 50%)",
          }}
        />
      )}

      <section
        className={`relative py-20 lg:py-28 px-5 ${
          isReverse
            ? "bg-gradient-to-br from-blue-50 to-indigo-50"
            : "bg-white"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isReverse ? "direction-rtl" : ""}`}>

            {/* Metin — reverse ise sağda */}
            <motion.div
              initial={{ opacity: 0, x: isReverse ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
              className={isReverse ? "lg:order-2" : "lg:order-1"}
            >
              <span className="inline-block bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                {item.tag}
              </span>
              <h2 className="font-nunito font-black text-4xl lg:text-5xl text-blue-900 leading-tight mb-5"
                style={{ textShadow: "2px 2px 0 rgba(147,197,253,0.3)" }}>
                {item.title}
                <br />
                <span className="text-blue-500">{item.highlight}</span>
              </h2>
              <p className="text-blue-600/80 text-lg leading-relaxed mb-8 max-w-md">
                {item.desc}
              </p>
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-b from-blue-500 to-blue-700
                  text-white font-bold rounded-full text-sm
                  shadow-[0_4px_20px_rgba(59,130,246,0.4)]
                  hover:shadow-[0_6px_28px_rgba(59,130,246,0.6)]
                  hover:-translate-y-0.5 transition-all duration-200"
              >
                {item.cta} →
              </Link>
            </motion.div>

            {/* Resim */}
            <motion.div
              initial={{ opacity: 0, x: isReverse ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
              className={`relative ${isReverse ? "lg:order-1" : "lg:order-2"}`}
            >
              {/* Arka dekoratif blok */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-200 to-indigo-300 opacity-30
                  transform ${isReverse ? "-rotate-3 -translate-x-3 translate-y-3" : "rotate-3 translate-x-3 translate-y-3"}`}
              />
              {/* Ana resim */}
              <motion.div
                whileHover={{ scale: 1.02, rotate: 0 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-3xl overflow-hidden shadow-2xl
                  transform ${isReverse ? "rotate-2" : "-rotate-2"}
                  border-4 border-white`}
                style={{ boxShadow: "0 25px 60px rgba(59,130,246,0.2)" }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  className="w-full h-72 lg:h-80 object-cover"
                />
                {/* Resim üstü renk overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
              </motion.div>

              {/* Köşe dekoratif öğeler */}
              <div className={`absolute -bottom-3 ${isReverse ? "-left-3" : "-right-3"} w-8 h-8 bg-yellow-400 rounded-full shadow-lg`} />
              <div className={`absolute -top-3 ${isReverse ? "-right-3" : "-left-3"} w-5 h-5 bg-blue-300 rounded-lg transform rotate-45`} />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function FeatureSections() {
  return (
    <div>
      {features.map((item, i) => (
        <FeatureSection key={i} item={item} index={i} />
      ))}
    </div>
  );
}
