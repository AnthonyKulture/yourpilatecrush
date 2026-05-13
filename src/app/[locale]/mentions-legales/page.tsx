import React from 'react';
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: locale === 'fr' ? 'Mentions Légales' : 'Legal Notice',
    description:
      locale === 'fr'
        ? 'Mentions légales du site Your Pilate Crush — Pilates & Lagree privés.'
        : 'Legal notice for Your Pilate Crush — Private Pilates & Lagree.',
    path: '/mentions-legales',
    locale,
    noIndex: true,
  });
}

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
              Téléphone : <a href="tel:+33651590216" className="underline">+33 6 51 59 02 16</a>
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
              L&apos;ensemble de ce site relève de la législation française et internationale sur le droit d&apos;auteur
              et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-display text-burgundy-deep">Politique de confidentialité (RGPD)</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique
              et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données
              personnelles.
            </p>

            <h3 className="text-lg font-display text-burgundy-deep">Données collectées</h3>
            <p>
              Les seules données personnelles collectées sont celles que vous transmettez volontairement via
              WhatsApp ou email : prénom, numéro de téléphone et/ou adresse email. Aucune donnée n&apos;est
              collectée automatiquement via ce site (pas de formulaire, pas de cookies de traçage).
            </p>

            <h3 className="text-lg font-display text-burgundy-deep">Finalité du traitement</h3>
            <p>
              Ces données sont utilisées exclusivement pour répondre à vos demandes de renseignements et
              organiser vos séances privées. Elles ne sont jamais transmises à des tiers ni utilisées à des
              fins commerciales.
            </p>

            <h3 className="text-lg font-display text-burgundy-deep">Durée de conservation</h3>
            <p>
              Vos données sont conservées pendant la durée de notre relation commerciale, puis supprimées dans
              un délai maximum de 3 ans à compter de notre dernier échange.
            </p>

            <h3 className="text-lg font-display text-burgundy-deep">Vos droits</h3>
            <p>
              Conformément aux articles 15 à 17 du RGPD, vous pouvez à tout moment demander l&apos;accès,
              la rectification ou la suppression de vos données en contactant :{' '}
              <a href="mailto:yourpilatescrush@gmail.com" className="underline">
                yourpilatescrush@gmail.com
              </a>. En cas de litige, vous pouvez également introduire une réclamation auprès de la{' '}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="underline">
                CNIL
              </a>.
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
