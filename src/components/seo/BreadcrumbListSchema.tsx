import { JsonLd } from './JsonLd';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbListSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbListSchema({ items }: BreadcrumbListSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href,
    })),
  };

  return <JsonLd data={schema} />;
}
