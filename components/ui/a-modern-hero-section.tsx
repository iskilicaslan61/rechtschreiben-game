export default function ElternSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      {/* Dekoratif noktalar */}
      <div className="hidden sm:block absolute top-20 right-20 w-4 h-4 bg-yellow-400 rounded-full" />
      <div className="hidden sm:block absolute top-32 right-32 w-3 h-3 bg-blue-400 rounded-sm transform rotate-45" />
      <div className="hidden sm:block absolute top-40 right-16 w-2 h-8 bg-indigo-500" />
      <div className="hidden sm:block absolute top-48 right-24 w-6 h-2 bg-yellow-400" />
      <div className="hidden sm:block absolute bottom-16 left-12 w-4 h-4 bg-blue-300 rounded-full" />
      <div className="hidden sm:block absolute bottom-32 left-28 w-2 h-6 bg-indigo-400" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Sol: Metin */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full mb-4">
              <span className="text-blue-600 font-bold text-sm">👨‍👩‍👧 Für Eltern</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-4 sm:mb-6"
              style={{ textShadow: '2px 2px 0 rgba(147,197,253,0.4)' }}>
              Den Lernfortschritt
              <br className="hidden sm:block" />
              <span className="text-blue-500"> immer im Blick</span>
            </h2>
            <p className="text-base sm:text-lg text-blue-600 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed opacity-80">
              Verknüpfe deine Kinder mit deinem Konto und behalte den Überblick über Punkte,
              Sterne und Spielverlauf – alles in Echtzeit, übersichtlich im Dashboard.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <a href="/login"
                className="px-7 py-3 bg-gradient-to-b from-blue-500 to-blue-700 text-white font-bold
                  rounded-full text-sm shadow-[0_4px_14px_rgba(59,130,246,0.4)]
                  hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(59,130,246,0.5)]
                  transition-all duration-200">
                Elternteil-Konto erstellen →
              </a>
            </div>
          </div>

          {/* Sağ: Dashboard kartı */}
          <div className="relative mt-8 lg:mt-0">
            <div className="relative bg-white rounded-2xl p-5 sm:p-6 shadow-[0_20px_60px_rgba(59,130,246,0.18)]
              border-2 border-blue-100 transform rotate-3 hover:rotate-0 transition-transform duration-300
              max-w-sm mx-auto lg:max-w-none">

              {/* Kart başlığı */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs text-blue-400 font-semibold uppercase tracking-wide mb-0.5">Eltern-Dashboard</div>
                  <div className="text-blue-900 font-black text-sm">📊 Fortschritt</div>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">👦</div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: 'Punkte', value: '142', color: 'bg-blue-500' },
                  { label: 'Sterne', value: '⭐⭐⭐', color: 'bg-yellow-400' },
                  { label: 'Streak', value: '7 🔥', color: 'bg-orange-400' },
                ].map((s, i) => (
                  <div key={i} className="bg-blue-50 rounded-xl p-2 text-center border border-blue-100">
                    <div className="text-blue-900 font-black text-sm">{s.value}</div>
                    <div className="text-blue-400 text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Mini bar chart */}
              <div className="mb-3">
                <div className="text-xs text-blue-400 mb-1.5 font-semibold">Letzte Spiele</div>
                <div className="flex items-end gap-1 h-10">
                  {[60, 80, 45, 100, 70, 90, 55].map((h, i) => (
                    <div key={i}
                      className={`flex-1 rounded-t-sm transition-all ${i === 3 ? 'bg-blue-500' : 'bg-blue-200'}`}
                      style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>

              {/* Oyun listesi */}
              <div className="space-y-1.5">
                {[
                  { mod: '🔤 Anlaute', diff: 'Leicht', score: 5 },
                  { mod: '✂️ Silben', diff: 'Mittel', score: 8 },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between text-xs bg-blue-50 rounded-lg px-2.5 py-1.5 border border-blue-100">
                    <span className="text-blue-800 font-semibold">{s.mod}</span>
                    <span className="text-blue-400">{s.diff}</span>
                    <span className="text-blue-700 font-black">{s.score} Pkt.</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dekoratif öğeler */}
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-300 rounded-lg transform rotate-45 opacity-60" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-yellow-400 rounded-full opacity-80" />
            <div className="hidden sm:block absolute top-1/2 -right-4 w-3 h-12 bg-indigo-300 opacity-50" />
          </div>
        </div>

        {/* Alt: Modüller */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-blue-200">
          <p className="text-center text-blue-400 text-sm font-semibold mb-5 uppercase tracking-wide">
            4 Lernmodi für dein Kind
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 lg:gap-12">
            {[
              { emoji: '🔤', label: 'Anlaute' },
              { emoji: '✂️', label: 'Silben' },
              { emoji: '🔚', label: 'Endlaute' },
              { emoji: '📝', label: 'Wörter' },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-white rounded-xl border-2 border-blue-200 flex items-center justify-center text-sm shadow-sm">
                  {m.emoji}
                </div>
                <span className="text-blue-700 font-bold text-sm">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
