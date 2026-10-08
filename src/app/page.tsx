'use client';

import React, { useState } from 'react';
import FloatingHearts from '@/components/FloatingHearts';
import FloatingMusicPlayer from '@/components/FloatingMusicPlayer';
import EnvelopeScreen from '@/components/EnvelopeScreen';
import ProposalScreen from '@/components/ProposalScreen';
import CustomizeDateScreen from '@/components/CustomizeDateScreen';
import RecapScreen from '@/components/RecapScreen';

export default function Home() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const userName = "Soulmate";

  return (
    <>
      <FloatingHearts />
      <FloatingMusicPlayer />

      {step === 0 && (
        <EnvelopeScreen onOpen={() => setStep(1)} />
      )}

      {step > 0 && (
        <main className="w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-[32px] shadow-[0_20px_60px_-15px_rgba(255,105,140,0.22)] border border-white/80 p-6 sm:p-8 z-10 transition-all duration-300 ring-1 ring-pink-100/60">
          {step === 1 && (
            <ProposalScreen
              userName={userName}
              onAccept={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <CustomizeDateScreen
              userName={userName}
              onComplete={(completedAnswers) => {
                setAnswers(completedAnswers);
                setStep(3);
              }}
            />
          )}

          {step === 3 && (
            <RecapScreen
              userName={userName}
              answers={answers}
              onReset={() => setStep(1)}
            />
          )}

        </main>
      )}
    </>
  );
}
