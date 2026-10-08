'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface ProposalScreenProps {
  userName: string;
  onAccept: () => void;
}

export default function ProposalScreen({ userName, onAccept }: ProposalScreenProps) {
  const [noClicks, setNoClicks] = useState(0);
  const [isCrying, setIsCrying] = useState(false);

  const refusalQuotes = [
    `Même pas pour un petit jeu avec ta chérie ${userName} ? 🥺`,
    "Attends, ton doigt a glissé non ? 💔",
    "Regarde le chaton comme il est triste 😭",
    `Allez ${userName}, s'il te plaît... 👉👈`,
    "Impossible, tu as trop envie de savoir ce que j'ai préparé ! 😉",
    "Erreur 404 : Le bouton NON est en panne 💕",
    "C'est un jeu rien que pour nous deux, dis OUI ! 🥰"
  ];

  const handleNoClick = () => {
    setNoClicks((prev) => prev + 1);
    setIsCrying(true);
  };

  const handleYesClick = () => {
    try {
      confetti({
        particleCount: 85,
        spread: 100,
        origin: { y: 0.6 }
      });
    } catch (e) {}
    onAccept();
  };

  const yesScale = 1 + noClicks * 0.28;
  const noScale = Math.max(0.65, 1 - noClicks * 0.08);

  const currentHint = noClicks > 0 
    ? refusalQuotes[(noClicks - 1) % refusalQuotes.length]
    : "";

  return (
    <div className="flex flex-col items-center text-center">
      {/* Badge intime */}
      <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-600 font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider mb-2 border border-pink-200/60 shadow-xs">
        <span>✨</span>
        <span>Toi & Moi</span>
        <span>✨</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-pink-500 mb-1 tracking-tight drop-shadow-xs">
        « Entre Nous » 💖
      </h1>

      <div className="text-xs font-bold text-pink-400 mb-2">
        Spécialement pour {userName} 💍
      </div>

      <p className="text-xs text-gray-600 mb-4 max-w-xs leading-relaxed font-medium">
        Un espace rien qu’à nous deux. Réponds sincèrement, partage tes pensées et découvre de nouvelles facettes de ce qu'on partage. ❤️
      </p>

      {/* SVG Chaton Kawaii avec boîte soignée */}
      <div className="mb-3 relative bg-gradient-to-b from-pink-50/50 to-white/30 rounded-3xl p-3 border border-pink-100/40">
        <div className="text-[10px] font-extrabold tracking-[4px] text-gray-400 uppercase mb-1">
          {isCrying ? "S ' I L   T E   P L A Î T   🥺" : "P L E A S E"}
        </div>
        <svg
          className="w-36 h-36 drop-shadow-md animate-wiggle mx-auto"
          viewBox="0 0 200 200"
        >
          <ellipse cx="100" cy="140" rx="65" ry="45" fill="#ffffff" stroke="#333333" strokeWidth="4.5" />
          <ellipse cx="100" cy="100" rx="68" ry="55" fill="#ffffff" stroke="#333333" strokeWidth="4.5" />

          <path d="M 45 65 Q 40 25 72 45 Z" fill="#ffffff" stroke="#333333" strokeWidth="4.5" />
          <path d="M 50 60 Q 48 35 68 48 Z" fill="#ffb4c2" />
          <path d="M 155 65 Q 160 25 128 45 Z" fill="#ffffff" stroke="#333333" strokeWidth="4.5" />
          <path d="M 150 60 Q 152 35 132 48 Z" fill="#ffb4c2" />

          <ellipse cx="55" cy="115" rx="12" ry="8" fill="#ffb0c0" opacity="0.8" />
          <ellipse cx="145" cy="115" rx="12" ry="8" fill="#ffb0c0" opacity="0.8" />

          <ellipse cx="70" cy="95" rx="13" ry="15" fill="#222" />
          <circle cx="66" cy="90" r="5" fill="#fff" />
          <circle cx="75" cy="101" r="3" fill="#fff" />

          <ellipse cx="130" cy="95" rx="13" ry="15" fill="#222" />
          <circle cx="126" cy="90" r="5" fill="#fff" />
          <circle cx="135" cy="101" r="3" fill="#fff" />

          {isCrying && (
            <g>
              <ellipse cx="68" cy="118" rx="6" ry="10" fill="#4ea8de" opacity="0.9" />
              <ellipse cx="132" cy="118" rx="6" ry="10" fill="#4ea8de" opacity="0.9" />
            </g>
          )}

          <path d="M 92 110 Q 100 116 100 110 Q 100 116 108 110" fill="none" stroke="#333" strokeWidth="3.5" strokeLinecap="round" />

          <ellipse cx="86" cy="135" rx="12" ry="16" fill="#fff" stroke="#333" strokeWidth="4" transform="rotate(-15 86 135)" />
          <ellipse cx="114" cy="135" rx="12" ry="16" fill="#fff" stroke="#333" strokeWidth="4" transform="rotate(15 114 135)" />

          <path d="M 32 90 L 35 80 L 38 90 L 48 93 L 38 96 L 35 106 L 32 96 L 22 93 Z" fill="#ffd166" />
          <path d="M 168 90 L 171 80 L 174 90 L 184 93 L 174 96 L 171 106 L 168 96 L 158 93 Z" fill="#ffd166" />
        </svg>
      </div>

      <p className="text-xs font-bold text-gray-700 mb-5">
        Prêt à jouer le jeu avec moi {userName} ? 🥰
      </p>

      {/* Boutons interactifs */}
      <div className="flex items-center justify-center gap-4 min-h-[80px] relative w-full mb-2">
        <button
          onClick={handleYesClick}
          style={{ transform: `scale(${yesScale})` }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold py-3.5 px-8 rounded-full shadow-[0_10px_25px_rgba(16,185,129,0.35)] hover:shadow-[0_12px_28px_rgba(16,185,129,0.45)] transition-all duration-300 z-10 text-xs sm:text-sm active:scale-[0.98]"
        >
          OUI 💕 Commencer le jeu
        </button>

        {noClicks < 6 && (
          <button
            onClick={handleNoClick}
            style={{ transform: `scale(${noScale})` }}
            className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2.5 px-6 rounded-full shadow-md text-xs transition-all duration-200 active:scale-[0.95]"
          >
            Non
          </button>
        )}
      </div>

      {currentHint && (
        <div className="text-xs font-semibold text-rose-500 mt-2 min-h-[20px] animate-fade-in bg-rose-50/80 px-3 py-1.5 rounded-full border border-rose-100">
          {currentHint}
        </div>
      )}
    </div>
  );
}
