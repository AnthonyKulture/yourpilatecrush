import React from 'react';

interface DestinationCardProps {
  season: string;
  title: string;
  italicWord: string;
  locations: string[];
  description: string;
}

/**
 * DestinationCard Component
 * Implements the seasonal destination showcase (Côte d'Azur / St-Barth).
 */
export default function DestinationCard({
  season,
  title,
  italicWord,
  locations,
  description
}: DestinationCardProps) {
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
    <div className="flex-1 bg-red-primary p-8 sm:p-12 space-y-8 transition-all duration-[800ms] hover:bg-red-bright animate-in fade-in duration-1000">
      {/* Season Pill */}
      <div className="inline-block border border-cream/30 rounded-pill px-4 py-2 bg-white/5">
        <span className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-cream/70">
          {season}
        </span>
      </div>

      <div className="space-y-4">
        <h3 className="text-3xl sm:text-4xl text-cream leading-tight">
          {renderTitle()}
        </h3>
        
        {/* Locations list */}
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {locations.map((loc, i) => (
            <React.Fragment key={i}>
              <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-gold-champagne">
                {loc}
              </span>
              {i < locations.length - 1 && <span className="text-gold-champagne/30 text-[11px]">·</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <p className="text-[14px] leading-relaxed text-cream/70 max-w-[420px]">
        {description}
      </p>
    </div>
  );
}
