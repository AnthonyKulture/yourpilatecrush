import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

/**
 * Composant de sécurité injection pour Schema.org JSON-LD
 * Le set HTML permet d'éviter l'échappement par React tout en s'assurant
 * de l'intégrité de la balise script ld+json.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
