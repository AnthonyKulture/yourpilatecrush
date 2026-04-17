import React from 'react';
import { useTranslations } from 'next-intl';

interface MethodsSectionProps {
  id?: string;
  children: React.ReactNode;
}

/**
 * MethodsSection Component
 * Specialized container for the practices display.
 */
export default function MethodsSection({ id, children }: MethodsSectionProps) {
  const t = useTranslations('home.methods');

  return (
    <section id={id} className="bg-cream py-24 sm:py-32 px-gutter-mobile sm:px-gutter-desktop">
      <div className="max-w-[1180px] mx-auto space-y-24">
        
        {/* Section Header */}
        <header className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-1000">
           <p className="text-[11px] font-sans font-medium uppercase tracking-[0.3em] text-red-accent">
             {t('eyebrow')}
           </p>
           <h2 className="text-[36px] sm:text-[56px] leading-[1.1] text-burgundy-deep max-w-[820px]">
             {t.rich('sectionTitle', {
               br: () => <br />,
               em: (chunks) => <em className="signature-italic text-red-accent font-normal">{chunks}</em>
             })}
           </h2>
        </header>

        {/* Content Area */}
        <div className="space-y-16 sm:space-y-24">
          {children}
        </div>
      </div>
    </section>
  );
}
