import React from 'react';

interface Phase {
  eyebrow: string;
  title: string;
  description: string;
}

interface SignatureCardProps {
  number: string;
  title: string;
  italicWord: string;
  description: string;
  phases: Phase[];
}

/**
 * SignatureCard Component
 * Integral bordeaux layout with narrative and phases columns.
 */
export default function SignatureCard({
  number,
  title,
  italicWord,
  description,
  phases
}: SignatureCardProps) {
  const renderTitle = () => {
    const parts = title.split(italicWord);
    return (
      <>
        {parts[0]}
        <em className="signature-italic text-gold-champagne">{italicWord}</em>
        {parts[1]}
      </>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row w-full bg-burgundy-deep rounded-lg overflow-hidden border-l-[3px] border-red-accent transition-all duration-[800ms] group hover:-translate-y-1">
      {/* Col gauche - Narratif */}
      <div className="flex-1 p-8 sm:p-12 space-y-8 flex flex-col justify-center">
        <div className="space-y-4">
           <span className="text-[11px] font-sans font-medium uppercase tracking-eyebrow text-gold-champagne/60">
             Session Signature
           </span>
           <h3 className="text-[36px] sm:text-[48px] leading-tight text-cream">
             {renderTitle()}
           </h3>
        </div>
        <p className="text-[16px] sm:text-[18px] leading-[1.6] text-cream/80 max-w-[480px]">
          {description}
        </p>
      </div>

      {/* Col droite - Phases */}
      <div className="lg:w-[45%] bg-maroon p-8 sm:p-12 space-y-10">
        <h4 className="text-[11px] font-sans font-medium uppercase tracking-eyebrow text-cream/40 mb-6 underline underline-offset-8">Déroulé de la séance</h4>
        <div className="space-y-12">
          {phases.map((phase, i) => (
            <div key={i} className="space-y-3">
              <span className="text-[10px] font-sans font-medium uppercase tracking-widest text-red-accent">
                {phase.eyebrow}
              </span>
              <h5 className="text-[22px] font-display text-cream">{phase.title}</h5>
              <p className="text-[13px] leading-relaxed text-gold-champagne/80">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
