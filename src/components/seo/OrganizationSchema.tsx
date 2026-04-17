import { JsonLd } from './JsonLd';

interface OrganizationSchemaProps {
  siteUrl: string;
  siteName: string;
  logoUrl?: string;
  description?: string;
}

export function OrganizationSchema({
  siteUrl,
  siteName,
  logoUrl,
  description,
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: description,
    ...(logoUrl && {
      publisher: {
        '@type': 'Organization',
        name: siteName,
        logo: {
          '@type': 'ImageObject',
          url: logoUrl,
        },
      },
    }),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return <JsonLd data={schema} />;
}
