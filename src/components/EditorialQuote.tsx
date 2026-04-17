import React from 'react';

/**
 * EditorialQuote Component
 * Centered closing statement for the landing page.
 */
export default function EditorialQuote() {
  return (
    <section className="bg-cream py-32 px-gutter-mobile sm:px-gutter-desktop flex items-center justify-center text-center">
      <div className="max-w-[720px] mx-auto space-y-8 animate-in fade-in duration-1000 delay-300">
        <h2 className="text-[32px] sm:text-[42px] leading-tight text-burgundy-deep font-display italic">
          « Le vrai luxe, c&apos;est de prendre soin de soi <br />
          <em className="signature-italic text-red-accent font-normal">avec intention —</em> <br className="hidden sm:block" />
          un corps fort, une posture affirmée, une présence qui se voit. »
        </h2>
        <div className="h-[1px] bg-red-accent/20 w-12 mx-auto mt-12" aria-hidden="true" />
      </div>
    </section>
  );
}
