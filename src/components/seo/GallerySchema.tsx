'use client';

import React from 'react';
import { JsonLd } from './JsonLd';
import { useTranslations } from 'next-intl';

/**
 * GallerySchema Component
 * Provides ImageGallery structured data for the atmosphere section.
 */
export default function GallerySchema() {
  const t = useTranslations('home.gallery');

  const images = Array.from({ length: 13 }, (_, i) => ({
    "@type": "ImageObject",
    "url": `/images/gallery/yourpilatecrush-${i + 1}.webp`,
    "caption": t(`images.alt${i + 1}`)
  }));

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": t.raw('title').replace(/<[^>]*>/g, ''),
    "description": "Galerie complète de photos présentant l'univers Your Pilate Crush, le studio et les sessions de Pilates & Lagree.",
    "image": images
  };

  return <JsonLd data={schemaData} />;
}
