import React from 'react';
import { useTranslations } from 'next-intl';

interface TariffCardProps {
  index?: string;
  title: string;
  price1: { label: string; value: string };
  price2?: { label: string; value: string };
  highlight?: string;
  variant?: 'standard' | 'inverted';
}

/**
 * TariffCard Component
 * Implements the minimal editorial grid cards for pricing.
 */
export default function TariffCard({
  index,
  title,
  price1,
  price2,
  highlight,
  variant = 'standard'
}: TariffCardProps) {
  const t = useTranslations('home.tariffs.inverted');
  const isInverted = variant === 'inverted';

  return (
    <div 
      className={`flex flex-col items-center text-center p-8 min-h-[400px] transition-all duration-[800ms] hover:-translate-y-1 ${
        isInverted 
          ? 'bg-burgundy-deep text-cream border-none' 
          : 'bg-cream border border-burgundy-deep/10 text-burgundy-deep'
      }`}
    >
      <div className="flex flex-col items-center h-full w-full">
        {isInverted ? (
          <div className="flex flex-col items-center justify-center flex-1 space-y-8">
            <p className="font-display italic text-[24px] leading-tight">
              {highlight}
            </p>
            <div className="h-[1px] bg-gold-champagne w-10 opacity-30" />
            <div className="space-y-4 text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-gold-champagne/60">
               <p>{t('travel')}</p>
               <p>{t('equipment')}</p>
               <p>{t('payment')}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8 flex flex-col items-center">
            {/* Index Filigree */}
            <span className="text-[14px] font-sans font-bold text-red-accent/40">{index}</span>

            {/* Title */}
            <h4 className="font-display text-[22px] leading-tight text-burgundy-deep">
              {title}
            </h4>

            {/* Price 1 */}
            <div className="space-y-2">
              <p className="text-[11px] font-sans font-medium uppercase tracking-widest opacity-40">
                {price1.label}
              </p>
              <p className="font-display italic text-[32px] leading-tight">
                {price1.value}
              </p>
            </div>

            {/* Price 2 */}
            {price2 && (
              <div className="space-y-2 pt-4">
                <p className="text-[11px] font-sans font-medium uppercase tracking-widest opacity-40">
                  {price2.label}
                </p>
                <p className="font-display italic text-[32px] leading-tight">
                  {price2.value}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
