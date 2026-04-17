import React from 'react';

interface MethodCardProps {
  number: string;
  title: string;
  italicWord: string;
  intensityLabel: string;
  intensityValue: string;
  eyebrow: string;
  description: string[];
  bullets: string[];
  benefits: string[];
  benefitsLabel: string;
}

/**
 * MethodCard Component
 * Implements the bicolore 60/40 layout for standard practices.
 */
export default function MethodCard({
  number,
  title,
  italicWord,
  intensityLabel,
  intensityValue,
  eyebrow,
  description,
  bullets,
  benefits,
  benefitsLabel
}: MethodCardProps) {
  // Logic to inject the italic word into the title
  const renderTitle = () => {
    if (!italicWord) return title;
    const parts = title.split(italicWord);
    if (parts.length === 1) return title;
    return (
      <>
        {parts[0]}
        <em className="signature-italic text-red-accent">{italicWord}</em>
        {parts[1]}
      </>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row w-full rounded-lg overflow-hidden border border-burgundy-deep/5 transition-all duration-[800ms] group hover:-translate-y-1">
      
      {/* Zone Gauche (60%) - Sand */}
      <div className="relative flex-[1.5] bg-sand p-8 sm:p-12 overflow-hidden">
        {/* Filigree Number */}
        <span className="absolute -top-4 -left-2 font-display text-[120px] sm:text-[180px] leading-none text-[#D4C3B0]/60 select-none pointer-events-none">
          {number}
        </span>

        <div className="relative z-10 space-y-6">
          <div className="space-y-4">
            <h3 className="text-[32px] sm:text-[40px] leading-tight text-burgundy-deep">
              {renderTitle()}
            </h3>
            <p className="text-[11px] font-sans font-medium uppercase tracking-eyebrow text-red-accent">
              {eyebrow}
            </p>
          </div>

          <div className="flex items-center gap-3 text-[13px] uppercase tracking-widest">
            <span className="text-burgundy-deep/40">{intensityLabel} :</span>
            <span className="text-red-accent font-bold">{intensityValue}</span>
          </div>

          <div className="space-y-4 max-w-[540px]">
            {description.map((para, i) => (
              <p key={i} className="text-[15px] sm:text-[16px] leading-[1.7] text-burgundy-deep/80">
                {para}
              </p>
            ))}
          </div>

          {/* Bullets Box */}
          <div className="bg-[#DFD2C2] border-l-[3px] border-red-accent p-6 sm:p-8 mt-8">
            <ul className="space-y-3">
              {bullets.map((bullet, i) => (
                <li key={i} className="text-[14px] leading-relaxed text-burgundy-deep flex gap-3">
                  <span className="text-red-accent">·</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Zone Droite (40%) - Bordeaux */}
      <div className="flex-1 bg-red-primary p-8 sm:p-12 flex flex-col justify-center">
        <h4 className="text-[11px] font-sans font-medium uppercase tracking-eyebrow text-cream/40 mb-8">{benefitsLabel}</h4>
        <ul className="space-y-0 text-cream">
          {benefits.map((benefit, i) => (
            <li 
              key={i} 
              className={`py-4 text-[16px] flex gap-3 items-start border-red-accent/30 ${i !== benefits.length - 1 ? 'border-b' : ''}`}
            >
              <span className="text-gold-champagne font-bold">+</span>
              <span className="leading-tight">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
