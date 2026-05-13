import { JsonLd } from './JsonLd';

export function PersonSchema({ siteUrl }: { siteUrl: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#candice`,
    name: 'Candice',
    jobTitle: 'Instructrice privée certifiée STOTT Pilates & Lagree',
    worksFor: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#business`,
    },
    knowsAbout: [
      'Pilates STOTT',
      'Lagree Microformer',
      'Pilates prénatal',
      'Pilates postnatal',
      'Pilates senior',
      'Stretching et mobilité',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certification',
        name: 'STOTT PILATES Certified Instructor',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certification',
        name: 'Lagree Fitness Certified Instructor',
      },
    ],
    url: siteUrl,
    email: 'yourpilatescrush@gmail.com',
  };

  return <JsonLd data={schema} />;
}
