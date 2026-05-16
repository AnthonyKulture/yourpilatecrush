import React from 'react';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';
import HeroOrbs from '@/components/HeroOrbs';

/**
 * Hero Component
 * Implements the centerpiece of the Candice Pilates website.
 * Features: vertical gradient, decorative circle, signature typography, and seasonal pills.
 */
export default function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden bg-hero-gradient px-gutter-mobile sm:px-gutter-desktop text-cream">

      {/* Aurora — drifting radial gradient overlay */}
      <div className="absolute inset-0 hero-aurora pointer-events-none" aria-hidden="true" />

      {/* Film grain — editorial texture overlay */}
      <div className="absolute inset-0 hero-grain pointer-events-none opacity-25" aria-hidden="true" />

      {/* Decorative depth layers (parallax orbs + slow dashed ring) */}
      <HeroOrbs />

      {/* Decorative Central Circle (UI/UX Pro Max Liquid Glass) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-cream/10 glass-premium animate-float opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-[1180px] w-full">
        {/* Eyebrow */}
        <Reveal duration={900} distance={16}>
          <p className="text-[11px] font-sans font-medium uppercase tracking-[0.3em] mb-12">
            {t('eyebrow')}
          </p>
        </Reveal>

        {/* Huge H1 Heading */}
        <Reveal duration={1100} distance={32} delay={150}>
          <h1 className="text-[clamp(56px,8vw,96px)] mb-6 leading-tight">
            {t.rich('title', {
              em: (chunks) => <em className="signature-italic signature-shimmer font-normal">{chunks}</em>
            })}
          </h1>
        </Reveal>

        {/* Subtitle */}
        <Reveal duration={1100} distance={32} delay={300}>
          <p className="font-display italic text-[24px] sm:text-[32px] text-cream/90 mb-8">
            {t('subtitle')}
          </p>
        </Reveal>

        {/* Separator Line */}
        <div className="w-10 h-[1px] bg-gold-champagne mb-12" aria-hidden="true" />

        {/* Seasonal Pills */}
        <Reveal duration={1000} distance={24} delay={500}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="border border-cream/35 rounded-pill px-6 py-3 flex items-center gap-3 bg-white/5 backdrop-blur-sm">
              <span className="text-[11px] font-sans font-medium uppercase tracking-widest text-cream/70">{t('seasons.summer.label')}</span>
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-gold-champagne">{t('seasons.summer.location')}</span>
            </div>
            <div className="border border-cream/35 rounded-pill px-6 py-3 flex items-center gap-3 bg-white/5 backdrop-blur-sm">
              <span className="text-[11px] font-sans font-medium uppercase tracking-widest text-cream/70">{t('seasons.winter.label')}</span>
              <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-gold-champagne">{t('seasons.winter.location')}</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scroll-down indicator — gold dot travelling along a vertical hairline */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none hidden sm:block"
        aria-hidden="true"
      >
        <div className="relative w-px h-14 bg-cream/15 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gold-champagne hero-scroll-hint" />
        </div>
      </div>
    </section>
  );
}
