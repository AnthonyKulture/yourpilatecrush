'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

/**
 * Footer Component
 * Final contact section with WhatsApp/Email pills.
 */
export default function Footer({ id }: { id?: string }) {
  const t = useTranslations('common.footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer id={id} className="bg-burgundy-deep text-cream py-20 px-gutter-mobile sm:px-gutter-desktop">
      <div className="max-w-[1180px] mx-auto flex flex-col items-center gap-16">
        
        {/* Contact CTA */}
        <div className="text-center space-y-10">
          <h2 className="text-[36px] sm:text-[48px] font-display italic leading-tight">
            {t.rich('cta', {
              em: (chunks) => <em className="signature-italic text-gold-champagne font-normal">{chunks}</em>
            })}
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            {/* WhatsApp Pill */}
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const p = ['33', '6', '51', '59', '02', '16'].join('');
                window.open(`https://wa.me/${p}`, '_blank');
              }}
              className="flex items-center gap-4 bg-white/5 border border-cream/20 rounded-pill px-8 py-4 hover:bg-white/10 transition-colors group cursor-pointer"
            >
              <span className="text-[10px] font-sans font-bold uppercase tracking-eyebrow text-gold-champagne">{t('pills.whatsapp')}</span>
              <span className="text-[14px] font-sans">+33 6 51 59 02 <span>16</span></span>
            </a>

            {/* Email Pill */}
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const user = "yourpilatescrush";
                const domain = "gmail.com";
                window.location.href = `mailto:${user}@${domain}`;
              }}
              className="flex items-center gap-4 bg-white/5 border border-cream/20 rounded-pill px-8 py-4 hover:bg-white/10 transition-colors group cursor-pointer"
            >
              <span className="text-[10px] font-sans font-bold uppercase tracking-eyebrow text-gold-champagne">{t('pills.email')}</span>
              <span className="text-[14px] font-sans">yourpilatescrush<span>@</span>gmail.com</span>
            </a>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="w-full pt-16 border-t border-cream/10 flex flex-col items-center gap-8 text-[11px] font-sans uppercase tracking-[0.2em] text-cream/40">
          <div className="flex flex-col sm:flex-row justify-between w-full items-center gap-4 sm:gap-8">
            <div className="flex gap-8">
              <a href="/mentions-legales" className="hover:text-gold-champagne transition-colors">{t('mentions')}</a>
              <p>{t('copyright', { year: currentYear })}</p>
            </div>
            <div className="text-center sm:text-right">
              <p>{t('description')}</p>
            </div>
          </div>
          
          <div className="pb-4 text-center">
            <p className="normal-case tracking-normal text-[12px] opacity-75">
              Made with ❤️ by <a href="https://www.kulturecom.fr" target="_blank" rel="noopener noreferrer" className="hover:text-gold-champagne transition-colors underline decoration-cream/20 underline-offset-4">Anthony PROFIT</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
