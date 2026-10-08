'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface EnvelopeScreenProps {
  onOpen: () => void;
}

export default function EnvelopeScreen({ onOpen }: EnvelopeScreenProps) {
  const [dateInput, setDateInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isOpening, setIsOpening] = useState(false);

  // Vérification de la date : accepte n'importe quelle date du 25/01/2026 au 02/02/2026
  const checkDateMatch = (raw: string): boolean => {
    const clean = raw.toLowerCase().trim();
    if (!clean) return false;

    const normalized = clean
      .replace(/[éèê]/g, 'e')
      .replace(/[\s\-\.\/]/g, '');

    const janRegex = /^(2[5-9]|3[01])[\/\-\. ]0?1([\/\-\. ](20)?26)?$/;
    const febRegex = /^0?[12][\/\-\. ]0?2([\/\-\. ](20)?26)?$/;

    if (janRegex.test(clean) || febRegex.test(clean)) {
      return true;
    }

    const janDays = ['25', '26', '27', '28', '29', '30', '31'];
    for (const d of janDays) {
      if (normalized.includes(d)) {
        if (
          normalized.includes('01') ||
          normalized.includes('1') ||
          normalized.includes('janvier') ||
          normalized.includes('janv') ||
          normalized.endsWith('2026') ||
          normalized.endsWith('26')
        ) {
          return true;
        }
      }
    }

    const isFebMonth = normalized.includes('02') || normalized.includes('fevrier') || normalized.includes('fevr') || normalized.includes('fev');
    if (isFebMonth) {
      if (
        normalized.includes('01') ||
        normalized.includes('1') ||
        normalized.includes('02') ||
        normalized.includes('2')
      ) {
        return true;
      }
    }

    return false;
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = dateInput.trim();

    if (!trimmed) {
      setErrorMsg("Entre notre date secrète pour ouvrir la lettre ! 🤫");
      return;
    }

    if (checkDateMatch(trimmed)) {
      setIsOpening(true);
      setErrorMsg('');

      try {
        confetti({
          particleCount: 75,
          spread: 85,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      setTimeout(() => {
        onOpen();
      }, 650);
    } else {
      setErrorMsg("Oups... Mauvaise date ! Cherche bien entre fin janvier et tout début février 2026... 🥺💔");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center z-10 w-full max-w-sm transition-all duration-300">
      {/* Bulle iMessage authentique et soignée */}
      <div className="bg-[#e9e9eb]/90 backdrop-blur-md px-5 py-3 rounded-2xl rounded-bl-xs text-gray-900 font-semibold text-xs sm:text-sm shadow-sm mb-6 animate-bounce tracking-wide border border-black/5">
        <p>J'ai un message secret pour toi... 🤫💌</p>
      </div>

      {/* L'enveloppe raffinée et romantique */}
      <div
        className={`w-64 h-44 bg-white/95 rounded-3xl shadow-[0_18px_45px_rgba(255,105,140,0.22)] relative border border-pink-100/90 flex items-center justify-center transition-all duration-500 mb-6 overflow-hidden ${
          isOpening ? 'scale-90 opacity-70 rotate-3' : 'hover:scale-102 hover:shadow-[0_22px_50px_rgba(255,105,140,0.28)]'
        }`}
      >
        {/* Corps intérieur et rabats doux */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#ffdbe3] to-[#fdeef1] rounded-b-3xl border-t border-pink-200/40" />
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#ffd3dd] to-[#ffe5ec] rounded-t-3xl [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-xs" />
        
        {/* Sceau Cœur & Cadenas élégant */}
        <div className="absolute z-20 flex items-center justify-center drop-shadow-md">
          <span className="text-4xl animate-pulse filter drop-shadow-sm">🔒❤️</span>
        </div>
      </div>

      {/* Carte formulaire moderne et douce */}
      <form
        onSubmit={handleUnlock}
        className="w-full bg-white/90 backdrop-blur-xl p-6 rounded-[28px] shadow-[0_16px_40px_rgba(255,120,150,0.14)] border border-white/90 flex flex-col items-center text-center ring-1 ring-pink-100/70"
      >
        <span className="text-2xl mb-1.5 filter drop-shadow-xs">📅✨</span>
        <h2 className="text-sm font-bold text-gray-800 mb-1">
          La date où tout a commencé... 💭
        </h2>
        <p className="text-[11px] text-gray-500 mb-4 leading-relaxed max-w-xs">
          Entre notre date secrète pour déverrouiller la lettre de ta chérie :
        </p>

        <input
          type="text"
          value={dateInput}
          onChange={(e) => {
            setDateInput(e.target.value);
            if (errorMsg) setErrorMsg('');
          }}
          placeholder="Entre notre date secrète..."
          className="w-full text-center text-sm font-semibold py-3 px-4 rounded-2xl border-2 border-pink-200/80 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100/70 mb-2 transition-all bg-pink-50/20 text-gray-800 placeholder:text-gray-400"
          autoFocus
        />

        {errorMsg && (
          <p className="text-[11px] text-rose-500 font-semibold mb-2 animate-shake leading-snug px-1">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3.5 px-5 rounded-full shadow-[0_10px_25px_rgba(255,90,130,0.32)] hover:shadow-[0_12px_28px_rgba(255,90,130,0.4)] hover:scale-[1.01] active:scale-[0.98] transition-all text-xs flex items-center justify-center gap-2 mt-1"
        >
          <span>Valider notre date & ouvrir</span>
          <span>🔓💖</span>
        </button>
      </form>
    </div>
  );
}
