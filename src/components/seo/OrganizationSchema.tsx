import { JsonLd } from './JsonLd';

interface OrganizationSchemaProps {
  siteUrl: string;
  siteName: string;
  description?: string;
}

export function OrganizationSchema({ siteUrl, siteName, description }: OrganizationSchemaProps) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    inLanguage: ['fr', 'en'],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: siteName,
    url: siteUrl,
    description,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/images/logo-publisher.png`,
      width: 600,
      height: 60,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+33-6-51-59-02-16',
      contactType: 'customer service',
      availableLanguage: ['French', 'English'],
    },
    email: 'yourpilatescrush@gmail.com',
  };

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
    </>
  );
}
