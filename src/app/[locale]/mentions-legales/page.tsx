import React from 'react';

/**
 * Mentions Légales Page
 * Minimal compliance page for the Candice Pilates website.
 */
export default function LegalMentions() {
  return (
    <main className="min-h-screen bg-cream text-burgundy-deep py-24 px-gutter-mobile sm:px-gutter-desktop">
      <div className="max-w-[720px] mx-auto space-y-12">
        <header className="space-y-4">
          <p className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-red-accent">Information</p>
          <h1 className="text-5xl font-display">Mentions <em className="signature-italic font-normal">Légales</em></h1>
        </header>

        <section className="space-y-8 font-sans text-[15px] leading-relaxed opacity-80">
          <div className="space-y-4">
            <h2 className="text-xl font-display text-burgundy-deep">Éditeur du site</h2>
            <p>
              Le site <strong>Your Pilate Crush</strong> est édité par Your Pilate Crush. <br />
              Email : yourpilatescrush@gmail.com <br />
              Téléphone : +33 6 51 59 02 16
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-display text-burgundy-deep">Hébergement</h2>
            <p>
              Le site est hébergé par Vercel Inc. <br />
              Adresse : 440 N Barranca Ave #4133 Covina, CA 91723
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-display text-burgundy-deep">Propriété intellectuelle</h2>
            <p>
              L’ensemble de ce site relève de la législation française et internationale sur le droit d’auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
            </p>
          </div>

          <div className="space-y-4 pt-12">
             <a href="/" className="text-red-accent font-bold hover:underline">← Retour à l&apos;accueil</a>
          </div>
        </section>
      </div>
    </main>
  );
}
