'use client';

import React, { useState, useEffect } from 'react';
import { ENTRE_NOUS_QUESTIONS } from './CustomizeDateScreen';

interface RecapScreenProps {
  userName: string;
  answers: Record<number, string>;
  onReset: () => void;
}

export default function RecapScreen({ userName, answers, onReset }: RecapScreenProps) {
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(true);

  // Sauvegarde automatique des réponses sur le site pour la chérie !
  useEffect(() => {
    const saveAnswers = async () => {
      try {
        await fetch('/api/answers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userName,
            answers,
          })
        });
        setIsSaved(true);
      } catch (err) {
        console.error("Erreur enregistrement:", err);
      } finally {
        setIsSaving(false);
      }
    };

    saveAnswers();
  }, [userName, answers]);

  const formattedSummaryText = 
`💌 Jeu « Entre Nous » terminé par ${userName} ! 💕🥰

🎟️ TICKET PRIVILÈGE DÉBLOQUÉ :
✨ 1 Massage complet sans limite de temps
🍔 Mon plat préféré préparé par ma chérie
💤 Dodo collé(e)s toute la nuit
👑 Interdiction de me dire non ce soir !

Mes réponses :
${ENTRE_NOUS_QUESTIONS.map((q) => {
  const ans = answers[q.id] || "Pas de réponse";
  return `${q.id}. ${q.question}\n-> « ${ans} »`;
}).join('\n\n')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedSummaryText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="flex flex-col text-center">
      <div className="text-4xl mb-2 animate-bounce">🏆💍✨</div>
      <h2 className="text-lg sm:text-xl font-bold text-pink-500 mb-1">
        Jeu « Entre Nous » réussi ! 🎉
      </h2>

      {/* Confirmation d'envoi automatique sur le site */}
      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-3 mb-4 text-xs font-semibold shadow-xs flex items-center justify-center gap-2">
        {isSaving ? (
          <>
            <span className="animate-spin">⏳</span>
            <span>Transmission de tes réponses à ta chérie...</span>
          </>
        ) : isSaved ? (
          <>
            <span className="text-base">💌✔</span>
            <span>Tes réponses ont été envoyées directement à ta chérie sur le site !</span>
          </>
        ) : (
          <span>Tes réponses sont prêtes pour ta chérie !</span>
        )}
      </div>

      <p className="text-xs text-gray-500 mb-4">
        Félicitations {userName}, tu as débloqué ton cadeau secret :
      </p>

      {/* ========================================================
          LE TICKET PRIVILÈGE SOULMATE (DÉBLOQUÉ)
          ======================================================== */}
      <div className="bg-gradient-to-br from-amber-50 via-rose-50 to-pink-100 border-2 border-amber-300 rounded-2xl p-4 text-left shadow-md mb-5 relative overflow-hidden">
        <div className="absolute top-2 right-2 text-2xl opacity-40">🎟️</div>
        
        <div className="text-[10px] font-extrabold text-amber-600 uppercase tracking-widest mb-1 flex items-center gap-1">
          <span>✨</span> TICKET PRIVILÈGE DÉBLOQUÉ
        </div>
        
        <h3 className="text-sm font-bold text-pink-600 mb-2">
          Pass Privilège pour {userName} 💖
        </h3>

        <ul className="text-[11px] text-gray-700 space-y-1 mb-3 pl-1">
          <li className="flex items-center gap-1.5">
            <span className="text-pink-500">✔</span> 1 Massage complet sans limite de temps 💆
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-pink-500">✔</span> Ton repas préféré préparé par ta chérie 🍳
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-pink-500">✔</span> Dodo collés blottis toute la nuit 💤
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-pink-500">✔</span> <strong>Interdiction de te dire non ce soir ! 👑</strong>
          </li>
        </ul>

        <div className="text-[9px] text-gray-400 border-t border-amber-200/80 pt-1.5 flex justify-between font-mono">
          <span>CODE : #SOULMATES-2026</span>
          <span>VALABLE À VIE</span>
        </div>
      </div>

      <div className="text-xs font-bold text-gray-600 text-left mb-2 px-1">
        📜 Tes 20 réponses enregistrées :
      </div>

      {/* Boîte de défilement des 20 réponses */}
      <div className="bg-[#fff9fa] border-2 border-dashed border-pink-300 rounded-2xl p-4 text-left text-xs space-y-3 mb-4 shadow-xs max-h-[240px] overflow-y-auto">
        {ENTRE_NOUS_QUESTIONS.map((q) => (
          <div key={q.id} className="pb-2 border-b border-pink-100 last:border-b-0">
            <span className="font-bold text-pink-600 block mb-0.5">
              {q.id}. {q.question}
            </span>
            <span className="text-gray-800 italic block pl-2 border-l-2 border-pink-300">
              « {answers[q.id] || "Pas de réponse"} »
            </span>
          </div>
        ))}
      </div>

      {/* Bouton secondaire de copie si besoin */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleCopy}
          className="w-full bg-white hover:bg-pink-50 border border-pink-200 text-gray-700 font-semibold py-2.5 px-5 rounded-full text-xs transition-all"
        >
          Copier mes réponses pour moi 📋
        </button>

        {copied && (
          <div className="text-xs text-white bg-pink-500 py-1.5 px-4 rounded-full animate-fade-in self-center">
            Copié dans le presse-papier ! 💕
          </div>
        )}

        <button
          onClick={onReset}
          className="text-xs text-gray-400 underline hover:text-pink-500 mt-2 transition-colors"
        >
          Recommencer le jeu 🔄
        </button>
      </div>
    </div>
  );
}
