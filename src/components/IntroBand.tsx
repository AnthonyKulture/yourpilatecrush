import React from 'react';
import { useTranslations } from 'next-intl';

/**
 * IntroBand Component
 * Implements the maroon intent/citation band following the design system.
 */
export default function IntroBand() {
  const t = useTranslations('home.intro');

  return (
    <section className="bg-maroon py-20 sm:py-32 px-gutter-mobile sm:px-gutter-desktop flex items-center justify-center text-center">
      <div className="max-w-[820px] mx-auto animate-in fade-in duration-1000">
        <blockquote className="font-display italic text-[22px] sm:text-[28px] leading-[1.4] text-cream">
          {t.rich('quote', {
            em: (chunks) => <em className="not-italic text-gold-champagne">{chunks}</em>,
            br: () => <br className="hidden sm:block" />
          })}
        </blockquote>
      </div>
    </section>
  );
}
