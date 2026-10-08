'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ENTRE_NOUS_QUESTIONS } from '@/components/CustomizeDateScreen';
import FloatingHearts from '@/components/FloatingHearts';

interface Submission {
  id: number;
  submittedAt: string;
  userName: string;
  answers: Record<number, string>;
  ticketUnlocked: boolean;
}

export default function ReponsesPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAnswers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/answers');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setSubmissions(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  return (
    <div className="min-h-screen w-full max-w-2xl mx-auto p-4 sm:p-6 z-10 relative">
      <FloatingHearts />

      {/* En-tête */}
      <header className="text-center mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-500 bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-xs mb-3 hover:bg-white transition-all border border-pink-100"
        >
          <span>⬅️</span>
          <span>Retour à l'accueil du jeu</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-1">
          L'Espace Privé de la Chérie 👑💖
        </h1>
        <p className="text-xs text-gray-600 max-w-md mx-auto">
          Retrouve ici toutes les réponses et confidences envoyées directement par ton Soulmate sur le site.
        </p>

        <div className="mt-3">
          <button
            onClick={fetchAnswers}
            className="text-xs bg-white border border-pink-200 text-pink-600 font-semibold px-4 py-1.5 rounded-full shadow-xs hover:bg-pink-50 transition-all inline-flex items-center gap-1.5"
          >
            <span>🔄</span>
            <span>Actualiser les réponses</span>
          </button>
        </div>
      </header>

      {/* Contenu */}
      {loading ? (
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 text-center shadow-lg border border-pink-100">
          <span className="text-3xl block animate-spin mb-2">⏳</span>
          <p className="text-xs text-gray-500 font-medium">Chargement des confidences...</p>
        </div>
      ) : submissions.length === 0 ? (
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 text-center shadow-lg border border-pink-100">
          <span className="text-5xl block mb-3 animate-bounce">💌🥺</span>
          <h2 className="text-base font-bold text-gray-800 mb-1">
            Aucune réponse enregistrée pour l'instant
          </h2>
          <p className="text-xs text-gray-500 max-w-xs mx-auto mb-4">
            Dès que ton Soulmate aura terminé de répondre aux 20 questions sur le site, tout apparaîtra ici comme par magie !
          </p>
          <Link
            href="/"
            className="text-xs text-pink-500 underline font-semibold"
          >
            Aller tester le jeu ➜
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {submissions.map((sub, idx) => {
            const dateObj = new Date(sub.submittedAt);
            const formattedDate = dateObj.toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <article
                key={sub.id || idx}
                className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-xl border border-pink-100"
              >
                {/* Badge d'en-tête de soumission */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-pink-100 pb-3 mb-4">
                  <div>
                    <span className="text-xs font-extrabold text-pink-600 uppercase tracking-wide flex items-center gap-1.5">
                      <span>💌</span> Confidences de {sub.userName}
                    </span>
                    <span className="text-[11px] text-gray-400 block mt-0.5">
                      Reçu le {formattedDate}
                    </span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-200">
                    ✔ 20 / 20 Répondues
                  </span>
                </div>

                {/* Ticket Privilège Débloqué */}
                <div className="bg-gradient-to-r from-amber-50 to-rose-50 border-2 border-amber-300 rounded-2xl p-4 mb-5 shadow-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                      🎟️ TICKET PRIVILÈGE DÉBLOQUÉ PAR {sub.userName.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-amber-500 font-mono">#VALIDE</span>
                  </div>
                  <p className="text-[11px] text-gray-700 leading-relaxed">
                    Il a validé son pass pour : <strong>1 Massage complet</strong> + <strong>son repas préféré préparé par toi</strong> + <strong>dodo collés toute la nuit</strong> + <strong>interdiction de lui dire non ce soir !</strong> 👑
                  </p>
                </div>

                {/* Les 20 réponses détaillées */}
                <h3 className="text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-3">
                  Ses 20 Réponses :
                </h3>

                <div className="space-y-3">
                  {ENTRE_NOUS_QUESTIONS.map((q) => {
                    const ans = sub.answers[q.id];
                    return (
                      <div
                        key={q.id}
                        className="bg-pink-50/40 rounded-2xl p-3.5 border border-pink-100/80 text-left"
                      >
                        <div className="flex items-start gap-2 mb-1">
                          <span className="text-sm">{q.emoji}</span>
                          <span className="text-xs font-bold text-gray-800 leading-snug">
                            {q.id}. {q.question}
                          </span>
                        </div>
                        <div className="pl-6 pt-1 text-xs text-pink-700 font-semibold italic border-l-2 border-pink-300 ml-1">
                          « {ans || "Pas de réponse renseignée"} »
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
