import React from 'react';

/**
 * Footer Component
 * Final contact section with WhatsApp/Email pills.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-burgundy-deep text-cream py-20 px-gutter-mobile sm:px-gutter-desktop">
      <div className="max-w-[1180px] mx-auto flex flex-col items-center gap-16">
        
        {/* Contact CTA */}
        <div className="text-center space-y-10">
          <h2 className="text-[36px] sm:text-[48px] font-display italic leading-tight">
            Commençons <em className="signature-italic text-gold-champagne font-normal">ensemble</em>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            {/* WhatsApp Pill */}
            <a 
              href="https://wa.me/33651590216" 
              className="flex items-center gap-4 bg-white/5 border border-cream/20 rounded-pill px-8 py-4 hover:bg-white/10 transition-colors group"
            >
              <span className="text-[10px] font-sans font-bold uppercase tracking-eyebrow text-gold-champagne">WhatsApp</span>
              <span className="text-[14px] font-sans">+33 6 51 59 02 16</span>
            </a>

            {/* Email Pill */}
            <a 
              href="mailto:yourpilatescrush@gmail.com" 
              className="flex items-center gap-4 bg-white/5 border border-cream/20 rounded-pill px-8 py-4 hover:bg-white/10 transition-colors group"
            >
              <span className="text-[10px] font-sans font-bold uppercase tracking-eyebrow text-gold-champagne">Email</span>
              <span className="text-[14px] font-sans">yourpilatescrush@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="w-full pt-16 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-center gap-8 text-[11px] font-sans uppercase tracking-[0.2em] text-cream/40">
          <div className="flex gap-8">
            <a href="/mentions-legales" className="hover:text-gold-champagne transition-colors">Mentions Légales</a>
            <p>© {currentYear} Candice Pilates</p>
          </div>
          <div className="text-center sm:text-right">
            <p>Pilates & Lagree Privés — Côte d&apos;Azur & Saint-Barthélemy</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
