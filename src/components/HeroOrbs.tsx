'use client';

import React, { useEffect, useState } from 'react';

/**
 * HeroOrbs — decorative depth layers for the hero.
 * Three blurred color orbs + a dashed slowly-rotating SVG ring.
 * Light parallax follows mouse on pointer-capable devices.
 */
export default function HeroOrbs() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    let raf = 0;
    let next = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      next = {
        x: (e.clientX - innerWidth / 2) / innerWidth,
        y: (e.clientY - innerHeight / 2) / innerHeight,
      };
      if (!raf) {
        raf = requestAnimationFrame(() => {
          setParallax(next);
          raf = 0;
        });
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const shift = (depth: number) =>
    `translate3d(${parallax.x * depth * -1}px, ${parallax.y * depth * -1}px, 0)`;

  return (
    <>
      {/* SVG dashed ring slowly rotating around centre */}
      <div
        className="absolute top-1/2 left-1/2 pointer-events-none"
        style={{
          transform: `translate(-50%, -50%) ${shift(12)}`,
          willChange: 'transform',
        }}
        aria-hidden="true"
      >
        <svg
          width="700"
          height="700"
          viewBox="0 0 700 700"
          className="block"
        >
          {/* Outer dashed gold ring */}
          <circle
            cx="350"
            cy="350"
            r="330"
            fill="none"
            stroke="rgba(228,200,152,0.22)"
            strokeWidth="1"
            strokeDasharray="2 10"
            className="hero-ring-spin"
            style={{ transformOrigin: '350px 350px' }}
          />
          {/* Inner faint cream ring */}
          <circle
            cx="350"
            cy="350"
            r="240"
            fill="none"
            stroke="rgba(247,238,229,0.06)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Blurred gold orb — top-left */}
      <div
        className="absolute top-[16%] left-[6%] w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-gold-champagne/25 blur-3xl pointer-events-none"
        style={{ transform: shift(40), willChange: 'transform' }}
        aria-hidden="true"
      />

      {/* Blurred red orb — bottom-right */}
      <div
        className="absolute bottom-[18%] right-[5%] w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-red-accent/30 blur-3xl pointer-events-none"
        style={{ transform: shift(28), willChange: 'transform' }}
        aria-hidden="true"
      />

      {/* Blurred gold orb — bottom-left */}
      <div
        className="absolute bottom-[12%] left-[18%] w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gold-champagne/15 blur-2xl pointer-events-none"
        style={{ transform: shift(50), willChange: 'transform' }}
        aria-hidden="true"
      />
    </>
  );
}
