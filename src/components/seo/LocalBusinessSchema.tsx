import { JsonLd } from './JsonLd';

export function LocalBusinessSchema({ siteUrl }: { siteUrl: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
    '@id': `${siteUrl}/#business`,
    name: 'Your Pilate Crush',
    description:
      "Séances privées de Pilates et Lagree à domicile sur-mesure. Instructrice certifiée STOTT Pilates & Lagree. Côte d'Azur (mai–octobre) et Saint-Barthélemy (novembre–avril).",
    url: siteUrl,
    telephone: '+33651590216',
    email: 'yourpilatescrush@gmail.com',
    priceRange: '€€€',
    areaServed: [
      { '@type': 'City', name: 'Monaco' },
      { '@type': 'City', name: 'Nice' },
      { '@type': 'City', name: 'Cannes' },
      { '@type': 'City', name: 'Saint-Tropez' },
      { '@type': 'AdministrativeArea', name: "Côte d'Azur" },
      { '@type': 'City', name: 'Gustavia' },
      { '@type': 'AdministrativeArea', name: 'Saint-Barthélemy' },
    ],
    founder: {
      '@type': 'Person',
      '@id': `${siteUrl}/#candice`,
      name: 'Candice',
      jobTitle: 'Instructrice certifiée STOTT Pilates & Lagree',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Séances privées de Pilates & Lagree',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Lagree Microformer — Séance privée', description: 'Entraînement haute intensité sur Microformer Lagree, à domicile.' },
          price: '190',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Lagree Microformer — Pack 10 séances' },
          price: '1300',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Sculpt & Lagree — Séance privée', description: 'Session signature 55 min combinant Lagree Microformer et Pilates Sculpt.' },
          price: '190',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Sculpt & Lagree — Pack 10 séances' },
          price: '1300',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Pilates Sculpt & Flow — Séance privée', description: 'Cours dynamique alliant précision du Pilates et flow.' },
          price: '160',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Pilates Sculpt & Flow — Pack 10 séances' },
          price: '1200',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Pilates Foundation — Séance privée', description: 'Cours de Pilates STOTT fondamental, idéal pour débutants et remise en forme.' },
          price: '150',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Pilates Foundation — Pack 10 séances' },
          price: '1100',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Stretch & Mobilité — Séance privée', description: 'Stretching profond et mobilité articulaire, récupération active.' },
          price: '150',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Stretch & Mobilité — Pack 10 séances' },
          price: '1100',
          priceCurrency: 'EUR',
        },
      ],
    },
  };

  return <JsonLd data={schema} />;
}
