import React from 'react';

/**
 * IntroBand Component
 * Implements the maroon intent/citation band following the design system.
 */
export default function IntroBand() {
  return (
    <section className="bg-maroon py-20 sm:py-32 px-gutter-mobile sm:px-gutter-desktop flex items-center justify-center text-center">
      <div className="max-w-[820px] mx-auto animate-in fade-in duration-1000">
        <blockquote className="font-display italic text-[22px] sm:text-[28px] leading-[1.4] text-cream">
          « Le vrai luxe, c&apos;est de prendre soin de soi avec <em className="not-italic text-gold-champagne">intention</em>… <br className="hidden sm:block" /> un corps fort, une posture affirmée, une présence qui se voit. »
        </blockquote>
      </div>
    </section>
  );
}
