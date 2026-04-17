import React from 'react';

interface TariffGridProps {
  id?: string;
  children: React.ReactNode;
}

/**
 * TariffGrid Component
 * Implements the responsive grid layout for pricing sections.
 */
export default function TariffGrid({ id, children }: TariffGridProps) {
  return (
    <section id={id} className="bg-white py-24 sm:py-32 px-gutter-mobile sm:px-gutter-desktop border-t border-burgundy-deep/5">
      <div className="max-w-[1180px] mx-auto space-y-16">
        
        {/* Section Header */}
        <header className="space-y-4 text-center animate-in fade-in duration-1000">
           <p className="text-[11px] font-sans font-medium uppercase tracking-[0.3em] text-red-accent">
             INVESTISSEMENT
           </p>
           <h2 className="text-[36px] sm:text-[48px] leading-tight text-burgundy-deep">
             Tarifs & <em className="signature-italic text-red-accent font-normal">Formules</em>
           </h2>
        </header>

        {/* 6-Column Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 overflow-hidden rounded-lg border border-burgundy-deep/10">
          {children}
        </div>

        <p className="text-center text-[12px] opacity-40 font-sans italic pt-4">
          Toutes les séances incluent le déplacement et le matériel nécessaire.
        </p>
      </div>
    </section>
  );
}
