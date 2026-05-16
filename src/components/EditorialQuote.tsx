import React from 'react';
import { useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';

/**
 * EditorialQuote Component
 * Centered closing statement for the landing page.
 */
export default function EditorialQuote() {
  const t = useTranslations('home.editorial');

  return (
    <section className="bg-cream py-32 px-gutter-mobile sm:px-gutter-desktop flex items-center justify-center text-center">
      <Reveal className="max-w-[720px] mx-auto" duration={1100} distance={24}>
        <div className="space-y-8">
          <h2 className="text-[32px] sm:text-[42px] leading-tight text-burgundy-deep font-display italic">
            {t.rich('quote', {
              br: () => <br />,
              em: (chunks) => <em className="signature-italic signature-underline text-red-accent font-normal">{chunks}</em>
            })}
          </h2>
          <div className="h-[1px] bg-red-accent/20 w-12 mx-auto mt-12" aria-hidden="true" />
        </div>
      </Reveal>
    </section>
  );
}
