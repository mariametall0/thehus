'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export interface QuestionDef {
  id: number;
  category: string;
  emoji: string;
  question: string;
  suggestions: string[];
  placeholder: string;
}

export const ENTRE_NOUS_QUESTIONS: QuestionDef[] = [
  {
    id: 1,
    category: "Émotion & Présent",
    emoji: "💭❤️",
    question: "Comment tu vas vraiment en ce moment ? Pas juste « ça va », je veux savoir comment tu te sens réellement. ❤️",
    suggestions: [
      "Un peu fatigué mais le moral tient bon 🥱",
      "Sous pression avec beaucoup de choses à gérer 🤯",
      "Bien et apaisé, surtout quand je te parle 🥰",
      "J'ai des hauts et des bas en ce moment 🥺"
    ],
    placeholder: "Raconte-moi ce que tu ressens réellement dans ton cœur..."
  },
  {
    id: 2,
    category: "Bonheur",
    emoji: "☀️✨",
    question: "Qu’est-ce qui te rend heureux en ce moment ?",
    suggestions: [
      "Nos moments ensemble et nos fous rires 🥰",
      "Quand je réussis ce que j'entreprends au quotidien 💪",
      "Les petits plaisirs simples (me poser, bien manger, décompresser) ☕",
      "Savoir que tu es là dans ma vie 💖"
    ],
    placeholder: "Dis-moi ce qui te met le sourire aux lèvres..."
  },
  {
    id: 3,
    category: "Pensées & Charge mentale",
    emoji: "🧠🌧️",
    question: "Qu’est-ce qui te préoccupe le plus ces derniers temps ?",
    suggestions: [
      "L'avenir et mes objectifs personnels/pros 🎯",
      "La charge de travail et le rythme fatiguant 💼",
      "Trouver le bon équilibre dans mon quotidien ⚖️",
      "Rien de grave, juste un besoin de repos 💤"
    ],
    placeholder: "Ce qui tourne un peu trop dans ta tête..."
  },
  {
    id: 4,
    category: "Confidences",
    emoji: "🤫💌",
    question: "Est-ce qu’il y a quelque chose que tu aimerais me raconter mais que tu n’as pas encore trouvé le moment de me dire ?",
    suggestions: [
      "Une petite fierté dont je ne t'ai pas encore parlé ✨",
      "Une inquiétude que je gardais pour moi pour ne pas t'embêter 🥺",
      "À quel point tu prends de la place dans mes pensées 🥰",
      "Rien de caché, je te dis tout au fur et à mesure 💖"
    ],
    placeholder: "Ouvre ton cœur, je t'écoute avec bienveillance..."
  },
  {
    id: 5,
    category: "Soutien & Réconfort",
    emoji: "🧸🤍",
    question: "Quand tu ne vas pas bien, tu préfères que je te laisse tranquille ou que je reste près de toi ?",
    suggestions: [
      "Que tu restes près de moi, même en silence 🤫❤️",
      "Que tu me laisses un moment pour souffler, puis venir me chercher 🧘",
      "Un énorme câlin sans poser trop de questions 🧸",
      "Que tu me changes les idées avec des rires 😂"
    ],
    placeholder: "Ta façon idéale de recevoir de l'amour dans ces moments-là..."
  },
  {
    id: 6,
    category: "Compréhension mutuelle",
    emoji: "🤝🔍",
    question: "Qu’est-ce que tu aimerais que je comprenne mieux sur toi ?",
    suggestions: [
      "Ma façon de réagir quand je suis fatigué ou stressé 🥱",
      "Mon besoin de moments calmes pour recharger mes batteries 🔋",
      "Que même si je ne le montre pas toujours, je tiens énormément à toi 💖",
      "Mes silences qui ne veulent pas dire que je t'aime moins 🤫"
    ],
    placeholder: "Une facette de toi que tu aimerais que je cerne encore mieux..."
  },
  {
    id: 7,
    category: "Attentes & Présence",
    emoji: "👑💖",
    question: "En ce moment, qu’est-ce que tu attends le plus de moi ?",
    suggestions: [
      "Ta douceur et tes câlins réconfortants 🧸",
      "Des encouragements et ton soutien dans mes projets 🚀",
      "Qu'on passe plus de temps de qualité rien que tous les deux ⏳",
      "Juste que tu restes exactement comme tu es 🥰"
    ],
    placeholder: "Ce qui te ferait le plus de bien venant de ma part..."
  },
  {
    id: 8,
    category: "Toi & Moi",
    emoji: "🌱💕",
    question: "Est-ce qu’il y a quelque chose qui te manque dans notre relation ?",
    suggestions: [
      "Plus de moments spontanés et d'aventures imprévues 🚗",
      "Un peu plus de temps à deux sans regarder l'heure ⏰",
      "Des soirées posées sans écrans ni distractions 🕯️",
      "Rien du tout, notre équilibre me convient parfaitement 💖"
    ],
    placeholder: "Dis-moi en toute franchise ce qu'on pourrait cultiver ensemble..."
  },
  {
    id: 9,
    category: "Nostalgie & Souvenirs",
    emoji: "🎞️✨",
    question: "Quel est le moment avec moi que tu aimerais revivre exactement comme la première fois ?",
    suggestions: [
      "Notre tout premier rendez-vous et les papillons dans le ventre 🦋",
      "Notre premier vrai bisou 💋",
      "Cette soirée où on a parlé pendant des heures sans voir le temps passer 🌙",
      "Notre premier fou rire incontrôlable 😂"
    ],
    placeholder: "Raconte-moi ce souvenir gravé dans ta mémoire..."
  },
  {
    id: 10,
    category: "Reconnaissance & Admiration",
    emoji: "🌸🥰",
    question: "Qu’est-ce que tu apprécies le plus chez moi aujourd’hui ?",
    suggestions: [
      "Ton grand cœur et ton attention envers moi 💖",
      "Ton sourire qui illumine ma journée dès que je te vois ☀️",
      "Ta façon d'être drôle et naturelle avec moi 😂",
      "La complicité unique qu'on a créée tous les deux 🤞"
    ],
    placeholder: "Ce trait chez moi qui te touche le plus..."
  },
  {
    id: 11,
    category: "Séduction & Complicité",
    emoji: "😏🔥",
    question: "Quelle est la chose chez moi qui te fait toujours craquer, même après tout ce temps ? 😏",
    suggestions: [
      "Ton regard quand tu me fixes avec un petit sourire 😏",
      "Quand tu ris aux éclats et que tes yeux pétillent ✨",
      "Ta voix toute douce quand on est au lit 🌙",
      "Ton odeur et quand tu te colles contre moi 🧸"
    ],
    placeholder: "Ce petit truc qui te fait fondre à chaque coup..."
  },
  {
    id: 12,
    category: "Tension & Émotion",
    emoji: "❤️🔥",
    question: "Quel geste de ma part peut instantanément te faire perdre tes moyens ? ❤️🔥",
    suggestions: [
      "Une main dans mes cheveux ou sur ma nuque 💆",
      "Un baiser volé dans le cou par surprise 💋",
      "Quand tu me regardes dans les yeux sans rien dire 😏",
      "Quand tu passes tes bras autour de moi par derrière 🧸"
    ],
    placeholder: "Le geste infaillible qui te fait trembler..."
  },
  {
    id: 13,
    category: "Secrets intimes",
    emoji: "🤫💭",
    question: "Quelle pensée sur moi as-tu déjà eue mais que tu n’as jamais osé me dire ?",
    suggestions: [
      "À quel point je te trouve magnifique même au réveil en pyjama 🥰",
      "Que j'ai souvent peur de ne pas être à la hauteur pour toi 🥺",
      "Des pensées très coquines qui me traversent l'esprit en pleine journée 😏🔥",
      "Que je me projette très loin dans le futur avec toi 💍"
    ],
    placeholder: "Allez, avoue tout... aucun jugement ici !"
  },
  {
    id: 14,
    category: "Moments à deux",
    emoji: "⏳💕",
    question: "Qu’est-ce que tu aimerais que je fasse plus souvent quand on est tous les deux ?",
    suggestions: [
      "Prendre l'initiative des câlins et des papouilles 🧸",
      "Me surprendre avec des petites attentions inattendues 🎁",
      "Me masser le dos ou la tête sans que j'aie à demander 💆",
      "Juste poser ta tête sur mon torse pendant qu'on discute 💤"
    ],
    placeholder: "Ce qui te ferait plaisir qu'on fasse plus régulièrement..."
  },
  {
    id: 15,
    category: "Dévouement & Folie",
    emoji: "🚀❤️",
    question: "Quelle est la chose la plus folle que tu serais capable de faire uniquement pour moi ?",
    suggestions: [
      "Faire des kilomètres en pleine nuit juste pour te faire un bisou 🚗",
      "Partir sur un coup de tête au bout du monde avec toi ✈️",
      "Surmonter une de mes plus grandes peurs juste pour te faire plaisir 🧗",
      "Apprendre quelque chose de complètement fou pour t'impressionner 🎩"
    ],
    placeholder: "Jusqu'où tu irais pour ton amoureuse ?"
  },
  {
    id: 16,
    category: "Évasion à deux",
    emoji: "🏝️🌙",
    question: "Si on pouvait disparaître ensemble pendant 24 heures, juste toi et moi, où m’emmènerais-tu ?",
    suggestions: [
      "Dans une cabane perdue dans la forêt au coin du feu 🪵",
      "Dans un hôtel magnifique avec vue sur la mer 🌊",
      "Enfermés dans une chambre avec room-service et interdiction de sortir 🛌",
      "Dans une ville qu'on ne connaît pas pour se perdre main dans la main 🏙️"
    ],
    placeholder: "L'endroit de rêve pour nos 24h d'évasion..."
  },
  {
    id: 17,
    category: "Désirs inavoués",
    emoji: "🫣🔥",
    question: "Est-ce qu’il y a une envie que tu as envers moi que tu n’as jamais osé avouer ? 🫣",
    suggestions: [
      "Un jeu ou un fantasme qu'on n'a pas encore testé tous les deux 😏🔥",
      "Que tu sois plus directive et que tu prennes les rênes 👑",
      "Une escapade secrète rien qu'à nous deux 🤫",
      "Passer une journée entière au lit sans rien faire d'autre 🛌"
    ],
    placeholder: "C'est entre nous deux, tu peux tout me dire..."
  },
  {
    id: 18,
    category: "La soirée parfaite",
    emoji: "🍕🎬",
    question: "Si je te laissais choisir notre soirée parfaite, tu voudrais qu’on fasse quoi ?",
    suggestions: [
      "Bon petit plat, plaid douillet, film et câlins collés 🎬",
      "Resto romantique aux chandelles puis balade de nuit 🕯️",
      "Cuisiner ensemble en musique, un verre à la main 🍷",
      "Une soirée jeu et rires sans se prendre la tête 🎲"
    ],
    placeholder: "Décris ta soirée de rêve de A à Z..."
  },
  {
    id: 19,
    category: "Vérité du cœur",
    emoji: "💬❤️",
    question: "Si tu pouvais me dire exactement ce que tu as dans le cœur maintenant, sans avoir peur de ma réaction, tu me dirais quoi ?",
    suggestions: [
      "Que je suis fou amoureux de toi et que tu illumines ma vie 💖",
      "Que j'ai parfois des peurs mais qu'avec toi je me sens fort 🛡️",
      "Que j'ai juste besoin de toi tout près de moi là maintenant 🥺",
      "Que je ne me vois plus du tout avancer sans toi 💍"
    ],
    placeholder: "Dis-moi tout sans aucun filtre..."
  },
  {
    id: 20,
    category: "L'indicible & L'Amour pur",
    emoji: "❤️✨",
    question: "Si tu devais me dire une seule chose que tu ressens pour moi mais que les mots n’arrivent pas à expliquer, ce serait quoi ? ❤️",
    suggestions: [
      "Cette chaleur apaisante dans ma poitrine dès que je te serre fort 🧸",
      "Le sentiment d'être enfin à la maison quand je suis avec toi 🏡",
      "Cette certitude absolue que tu es ma personne 💖",
      "Un amour si profond qu'aucun mot du dictionnaire ne suffit ✨"
    ],
    placeholder: "Ce que ton cœur ressent au plus profond..."
  }
];

interface CustomizeDateScreenProps {
  userName: string;
  onComplete: (answers: Record<number, string>) => void;
}

export default function CustomizeDateScreen({ userName, onComplete }: CustomizeDateScreenProps) {
  const [currentIdx, setCurrentIdx] = useState(0); // 0 à 19
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showMidwaySurprise, setShowMidwaySurprise] = useState(false);

  const q = ENTRE_NOUS_QUESTIONS[currentIdx];
  const currentAnswer = answers[q.id] || "";

  const handleSelectSuggestion = (text: string) => {
    setAnswers((prev) => ({
      ...prev,
      [q.id]: text
    }));
  };

  const handleCustomText = (text: string) => {
    setAnswers((prev) => ({
      ...prev,
      [q.id]: text
    }));
  };

  const handleNext = () => {
    try {
      confetti({
        particleCount: 15,
        spread: 45,
        origin: { y: 0.7 }
      });
    } catch (e) {}

    // Surprise de mi-parcours à la fin de la Question 10 !
    if (currentIdx === 9 && !showMidwaySurprise) {
      setShowMidwaySurprise(true);
      return;
    }

    if (currentIdx < ENTRE_NOUS_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Fin des 20 questions
      try {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.6 }
        });
      } catch (e) {}
      onComplete(answers);
    }
  };

  const handleResumeAfterSurprise = () => {
    setShowMidwaySurprise(false);
    setCurrentIdx(10); // Passe à la question 11
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const progressPercent = Math.round(((currentIdx + 1) / ENTRE_NOUS_QUESTIONS.length) * 100);



  return (
    <div className="flex flex-col text-center relative">
      {/* ========================================================
          POP-UP SURPRISE DE MI-PARCOURS (Après la Question 10)
          ======================================================== */}
      {showMidwaySurprise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-sm w-full text-center shadow-2xl border-2 border-pink-300 animate-pop">
            <span className="text-5xl block mb-3 animate-bounce">💌✨</span>
            <div className="inline-block bg-pink-100 text-pink-600 font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              Pause Tendresse
            </div>
            <h3 className="text-lg font-bold text-pink-500 mb-2">
              Bravo {userName}... 💕
            </h3>
            <p className="text-xs text-gray-700 leading-relaxed mb-4">
              {userName === 'Sa Chérie'
                ? "Tu as déjà fait la moitié du chemin ! Merci de t'ouvrir avec autant de sincérité. Tu es tellement précieuse à ses yeux."
                : "Tu as déjà fait la moitié du chemin ! Merci de t'ouvrir à moi avec autant de sincérité. Tu es tellement précieux à mes yeux."}
            </p>
            <div className="bg-pink-50 border border-pink-200 rounded-2xl p-3 mb-5 text-[11px] text-pink-700 italic">
              « Respire un coup... la seconde moitié devient encore plus croustillante et intime... 😏🔥 »
            </div>
            <button
              onClick={handleResumeAfterSurprise}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-pink-500/30 text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-all"
            >
              <span>{userName === 'Sa Chérie' ? 'Continuer pour mon Soulmate' : 'Continuer avec ma chérie'}</span>
              <span>➜</span>
            </button>
          </div>
        </div>
      )}

      {/* Barre de progression discrète et épurée */}
      <div className="mb-4">
        <div className="w-full bg-pink-100/80 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-pink-400 to-rose-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* En-tête de la question */}
      <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-pink-400 mb-2">
        <span className="bg-pink-50 border border-pink-200 px-2.5 py-0.5 rounded-full text-pink-500 font-semibold">
          {q.category}
        </span>
        <span className="font-semibold text-gray-500">
          Question {q.id} / 20
        </span>
      </div>

      <div className="animate-fade-in flex flex-col items-center">
        {/* Emoji icône */}
        <div className="text-3xl sm:text-4xl mb-2 animate-bounce">
          {q.emoji}
        </div>

        {/* Intitulé de la question */}
        <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4 leading-snug px-1">
          {q.question}
        </h2>

        {/* Suggestions en un clic */}
        <div className="flex flex-col gap-2.5 w-full mb-4">
          {q.suggestions.map((sug) => (
            <button
              type="button"
              key={sug}
              onClick={() => handleSelectSuggestion(sug)}
              className={`p-3 rounded-2xl flex items-center gap-2.5 text-left text-xs transition-all duration-200 border ${
                currentAnswer === sug
                  ? 'bg-gradient-to-r from-pink-50 to-rose-50 border-pink-400 font-semibold text-pink-800 shadow-sm ring-2 ring-pink-300/70 scale-[1.01]'
                  : 'bg-white border-pink-100/90 text-gray-700 hover:border-pink-300 hover:bg-pink-50/30 hover:scale-[1.005]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${currentAnswer === sug ? 'bg-pink-500 ring-2 ring-pink-200' : 'bg-pink-300'}`} />
              <span className="leading-snug">{sug}</span>
            </button>
          ))}
        </div>

        {/* Zone de saisie libre */}
        <div className="w-full mb-5 text-left">
          <label className="block text-[11px] font-bold text-gray-600 mb-1.5 pl-1">
            Ou écris ta propre réponse avec tes mots :
          </label>
          <textarea
            rows={2}
            value={currentAnswer}
            onChange={(e) => handleCustomText(e.target.value)}
            placeholder={q.placeholder}
            className="w-full text-xs p-3.5 rounded-2xl border-2 border-pink-100 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100/60 bg-pink-50/20 text-gray-800 placeholder:text-gray-400 shadow-xs resize-none transition-all"
          />
        </div>

        {/* Boutons Navigation */}
        <div className="flex gap-2.5 w-full">
          {currentIdx > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              className="flex-1 bg-white border border-pink-200 text-gray-700 font-semibold py-3 px-4 rounded-full text-xs hover:bg-pink-50 hover:border-pink-300 transition-all shadow-xs"
            >
              Retour
            </button>
          )}

          <button
            type="button"
            onClick={handleNext}
            className="flex-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3.5 px-6 rounded-full shadow-[0_8px_22px_rgba(255,80,120,0.32)] hover:shadow-[0_10px_26px_rgba(255,80,120,0.42)] text-xs sm:text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-all active:scale-[0.98]"
          >
            <span>{currentIdx === ENTRE_NOUS_QUESTIONS.length - 1 ? "Débloquer mon Ticket Privilège 🎟️" : "Suivant"}</span>
            <span>➜</span>
          </button>
        </div>
      </div>
    </div>
  );
}
