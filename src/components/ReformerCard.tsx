import React from 'react';
import { useTranslations } from 'next-intl';

/**
 * ReformerCard Component
 * Simplified full-width card for the Pilates Reformer mention.
 */
export default function ReformerCard() {
  const t = useTranslations('home.methods.reformer');

  return (
    <div className="w-full bg-sand p-8 sm:p-12 border-l-[3px] border-red-accent transition-all duration-[800ms] hover:-translate-y-1">
      <div className="max-w-[820px] space-y-4">
        <h3 className="text-[28px] sm:text-[36px] leading-tight text-burgundy-deep">
          {t.rich('title', {
            em: (chunks) => <em className="signature-italic text-red-accent">{chunks}</em>
          })}
        </h3>
        <p className="text-[15px] sm:text-[16px] leading-[1.7] text-burgundy-deep/80 italic">
          {t('description')}
        </p>
      </div>
    </div>
  );
}
