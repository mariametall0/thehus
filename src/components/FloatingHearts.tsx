'use client';

import React, { useEffect, useState } from 'react';

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number; icon: string }>>([]);

  useEffect(() => {
    const icons = ['💖', '💕', '✨', '🌸', '🤍', '🧸', '🌷', '✨'];
    const generated = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 7,
      duration: 7 + Math.random() * 6,
      size: 16 + Math.random() * 18,
      icon: icons[Math.floor(Math.random() * icons.length)]
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Halos de lumière romantiques en arrière-plan */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-pink-300/30 rounded-full blur-3xl animate-glow" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl animate-glow delay-1000" />
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-peach-100/30 rounded-full blur-3xl animate-glow delay-2000" />

      {/* Particules flottantes */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute text-pink-300 opacity-65 select-none animate-float filter drop-shadow-xs"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}px`,
          }}
        >
          {h.icon}
        </span>
      ))}
    </div>
  );
}
