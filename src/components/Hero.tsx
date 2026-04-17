import React from 'react';

/**
 * Hero Component
 * Implements the centerpiece of the Candice Pilates website.
 * Features: vertical gradient, decorative circle, signature typography, and seasonal pills.
 */
export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-hero-gradient px-gutter-mobile sm:px-gutter-desktop text-cream">
      
      {/* Decorative Central Circle (UI/UX Pro Max Liquid Glass) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-cream/10 glass-premium animate-float opacity-40 pointer-events-none" 
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-[1180px] w-full">
        {/* Eyebrow */}
        <p className="text-[11px] font-sans font-medium uppercase tracking-[0.3em] mb-12 animate-in fade-in slide-in-from-bottom-2 duration-1000">
          STOTT PILATES · LAGREE CERTIFICATION
        </p>

        {/* Huge H1 Heading */}
        <h1 className="text-[clamp(56px,8vw,96px)] mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1200 delay-150">
          Move with <em className="signature-italic text-gold-champagne font-normal">intention.</em>
        </h1>

        {/* Subtitle */}
        <p className="font-display italic text-[24px] sm:text-[32px] text-cream/90 mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1400 delay-300">
          Pilates · Lagree
        </p>

        {/* Separator Line */}
        <div className="w-10 h-[1px] bg-gold-champagne mb-12" aria-hidden="true" />

        {/* Seasonal Pills */}
        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <div className="border border-cream/35 rounded-pill px-6 py-3 flex items-center gap-3 bg-white/5 backdrop-blur-sm">
            <span className="text-[11px] font-sans font-medium uppercase tracking-widest text-cream/70">Mai — Octobre</span>
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-gold-champagne">Côte d&apos;Azur</span>
          </div>
          <div className="border border-cream/35 rounded-pill px-6 py-3 flex items-center gap-3 bg-white/5 backdrop-blur-sm">
            <span className="text-[11px] font-sans font-medium uppercase tracking-widest text-cream/70">Novembre — Avril</span>
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-gold-champagne">Saint-Barthélemy</span>
          </div>
        </div>
      </div>
    </section>
  );
}
