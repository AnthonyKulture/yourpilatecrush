import React from 'react';
import { useTranslations } from 'next-intl';

interface TariffGridProps {
  id?: string;
  children: React.ReactNode;
}

/**
 * TariffGrid Component
 * Implements the responsive grid layout for pricing sections.
 */
export default function TariffGrid({ id, children }: TariffGridProps) {
  const t = useTranslations('home.tariffs');

  return (
    <section id={id} className="bg-white py-24 sm:py-32 px-gutter-mobile sm:px-gutter-desktop border-t border-burgundy-deep/5">
      <div className="max-w-[1180px] mx-auto space-y-16">
        
        {/* Section Header */}
        <header className="space-y-4 text-center animate-in fade-in duration-1000">
           <p className="text-[11px] font-sans font-medium uppercase tracking-[0.3em] text-red-accent">
             {t('investEyebrow')}
           </p>
           <h2 className="text-[36px] sm:text-[48px] leading-tight text-burgundy-deep">
             {t.rich('title', {
               em: (chunks) => <em className="signature-italic text-red-accent font-normal">{chunks}</em>
             })}
           </h2>
        </header>

        {/* 6-Column Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 overflow-hidden rounded-lg border border-burgundy-deep/10">
          {children}
        </div>

        <p className="text-center text-[12px] opacity-40 font-sans italic pt-4">
          {t('footerDisclaimer')}
        </p>
      </div>
    </section>
  );
}
