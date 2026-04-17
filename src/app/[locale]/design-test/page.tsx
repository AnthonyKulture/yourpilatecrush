import React from 'react';

/**
 * Design Verification Page
 * This page serves to verify all design tokens, signatures, 
 * and utilities imported from the design brief.
 */
export default function DesignTestPage() {
  return (
    <main className="min-h-screen p-8 sm:p-24 space-y-24 bg-cream text-burgundy-deep max-w-[1180px] mx-auto">
      
      {/* 1. TYPOGRAPHY & SIGNATURES */}
      <section className="space-y-8 bg-light">
        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-eyebrow text-red-accent font-medium">01 · Typography & Signature</p>
          <h1 className="text-5xl sm:text-7xl">
            Move with <em className="signature-italic">intention.</em>
          </h1>
          <p className="font-display italic text-2xl text-red-accent">Pilates · Lagree</p>
        </div>
        
        <div className="max-w-prose space-y-4">
          <p className="text-lg leading-relaxed">
            La méthode Lagree est une révolution du fitness à haute intensité, conçue par Sébastien Lagree à Los Angeles. 
            Pratiquée sur le <em className="signature-italic">Microformer</em>, elle optimise chaque seconde de votre temps.
          </p>
        </div>
      </section>

      {/* 2. COLORS & COMPONENTS */}
      <section className="space-y-12">
        <p className="text-[11px] uppercase tracking-eyebrow text-red-accent font-medium">02 · Brand Palette</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="h-24 bg-burgundy-deep flex items-end p-4 text-cream text-xs">Burgundy Deep</div>
          <div className="h-24 bg-maroon flex items-end p-4 text-cream text-xs">Maroon</div>
          <div className="h-24 bg-red-primary flex items-end p-4 text-cream text-xs">Red Primary</div>
          <div className="h-24 bg-gold-champagne flex items-end p-4 text-burgundy-deep text-xs">Gold Champagne</div>
          <div className="h-24 bg-sand flex items-end p-4 text-burgundy-deep text-xs">Sand</div>
          <div className="h-24 bg-cream border border-burgundy-deep/10 flex items-end p-4 text-burgundy-deep text-xs">Cream</div>
        </div>
      </section>

      {/* 3. EDITORIAL DIVIDER */}
      <section>
        <div className="editorial-divider">
          <div className="divider-diamond" />
        </div>
      </section>

      {/* 4. CARDS & BUTTONS */}
      <section className="space-y-12">
        <p className="text-[11px] uppercase tracking-eyebrow text-red-accent font-medium">03 · UI Components</p>
        
        <div className="grid sm:grid-cols-2 gap-8">
          {/* Method Card Shell (Bicolore concept) */}
          <div className="flex flex-col sm:flex-row rounded-lg overflow-hidden border border-burgundy-deep/5 transition-transform duration-[800ms] hover:-translate-y-1 cursor-pointer">
            <div className="bg-sand p-8 flex-1 space-y-4">
               <h3 className="text-3xl">Sculpt & <em className="signature-italic">Lagree</em></h3>
               <p className="text-xs tracking-widest text-red-accent font-medium uppercase">Intensité Maximale</p>
               <div className="h-[1px] bg-burgundy-deep/20 w-10"></div>
               <p className="text-sm">Session signature de 55 minutes alliant Microformer et Pilates Sculpt.</p>
            </div>
            <div className="bg-red-primary p-8 sm:w-1/3 text-cream">
               <ul className="space-y-2 text-sm italic">
                 <li>+ Silhouette affinée</li>
                 <li>+ Cardio sans impact</li>
                 <li>+ Gainage profond</li>
               </ul>
            </div>
          </div>

          <div className="space-y-6 flex flex-col items-start justify-center">
            <button className="bg-gold-champagne text-burgundy-deep px-8 py-4 rounded-pill text-[11px] tracking-eyebrow font-medium uppercase hover:bg-[#D4B680] transition-colors duration-200">
              Réserver une séance
            </button>
            <button className="border border-burgundy-deep text-burgundy-deep px-8 py-4 rounded-pill text-[11px] tracking-eyebrow font-medium uppercase hover:bg-burgundy-deep hover:text-cream transition-all duration-[800ms]">
              Découvrir les tarifs
            </button>
            
            {/* Liquid Glass Test */}
            <div className="glass-premium p-6 rounded-lg text-burgundy-deep w-full">
              <p className="text-xs font-medium uppercase tracking-widest text-red-accent mb-2">UI/UX Pro Max Enhancement</p>
              <p className="italic text-lg">Subtle Premium Glass Blur Effect</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
