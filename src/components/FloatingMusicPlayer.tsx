'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<any>(null);

  const startLofiChords = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Progression d'accords romantiques et doux (Fmaj7 -> G -> Em7 -> Am7)
      const chordProgressions = [
        [349.23, 440.00, 523.25, 659.25], // Fmaj7
        [392.00, 493.88, 587.33, 698.46], // G
        [329.63, 392.00, 493.88, 587.33], // Em7
        [440.00, 523.25, 659.25, 783.99], // Am7
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!ctx || ctx.state === 'closed') return;
        const now = ctx.currentTime;
        const notes = chordProgressions[chordIndex % chordProgressions.length];
        chordIndex++;

        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.08);

          // Volume très doux et chaleureux
          gain.gain.setValueAtTime(0.025, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0008, now + i * 0.08 + 2.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 2.8);
        });
      };

      playChord();
      timerRef.current = setInterval(playChord, 3200);
      setIsPlaying(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopMusic = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state === 'running') {
      audioContextRef.current.suspend();
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startLofiChords();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleMusic}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-md border transition-all duration-300 ${
          isPlaying
            ? 'bg-pink-500 text-white border-pink-400 shadow-pink-300/50 scale-105'
            : 'bg-white/80 text-pink-600 border-pink-200 hover:bg-white'
        }`}
        title={isPlaying ? "Couper la musique" : "Lancer la musique douce"}
      >
        <span className={isPlaying ? "animate-spin" : ""}>🎵</span>
        <span className="hidden sm:inline">
          {isPlaying ? "Musique d'ambiance active" : "Musique douce"}
        </span>
        {isPlaying && (
          <span className="flex gap-0.5 items-end h-3">
            <span className="w-1 bg-white rounded-full animate-bounce h-3" />
            <span className="w-1 bg-white rounded-full animate-bounce h-2 delay-100" />
            <span className="w-1 bg-white rounded-full animate-bounce h-3 delay-200" />
          </span>
        )}
      </button>
    </div>
  );
}
