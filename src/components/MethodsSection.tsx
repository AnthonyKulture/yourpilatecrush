import React from 'react';

interface MethodsSectionProps {
  children: React.ReactNode;
}

/**
 * MethodsSection Component
 * Specialized container for the practices display.
 */
export default function MethodsSection({ children }: MethodsSectionProps) {
  return (
    <section className="bg-cream py-24 sm:py-32 px-gutter-mobile sm:px-gutter-desktop">
      <div className="max-w-[1180px] mx-auto space-y-24">
        
        {/* Section Header */}
        <header className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-1000">
           <p className="text-[11px] font-sans font-medium uppercase tracking-[0.3em] text-red-accent">
             NOS PRATIQUES
           </p>
           <h2 className="text-[36px] sm:text-[56px] leading-[1.1] text-burgundy-deep max-w-[820px]">
             Des méthodes d&apos;exception <br /> 
             <em className="signature-italic text-red-accent font-normal">au service de votre corps</em>
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
