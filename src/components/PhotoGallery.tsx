'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import GallerySchema from './seo/GallerySchema';

/**
 * PhotoGallery Component
 * Implements a true CSS columns Masonry layout for a "perfect fit".
 * Ensures images respect their natural aspect ratio and section is centered.
 */
export default function PhotoGallery() {
  const t = useTranslations('home.gallery');

  // Total 13 images - Shuffled for better mobile rhythm (avoiding portrait sequences)
  const indices = [10, 1, 2, 5, 3, 4, 6, 11, 12, 8, 7, 9, 13];

  return (
    <section className="w-full bg-cream pt-spacing-3xl pb-spacing-2xl px-gutter-mobile sm:px-gutter-desktop">
      {/* SEO Schema */}
      <GallerySchema />
      
      {/* Container narrowed for a more centered "boutique" feel */}
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <p className="text-[11px] font-sans font-medium uppercase tracking-[0.3em] text-red-accent mb-4">
            {t('eyebrow')}
          </p>
          <h2 className="text-[clamp(32px,5vw,48px)] leading-tight text-burgundy-deep">
            {t.rich('title', {
              em: (chunks) => <em className="signature-italic">{chunks}</em>
            })}
          </h2>
          <div className="w-12 h-[1px] bg-gold-champagne mt-8" aria-hidden="true" />
        </div>

        {/* True Masonry Layout using CSS Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {indices.map((idx) => (
            <div 
              key={idx}
              className="relative overflow-hidden group rounded-sm bg-sand/20 break-inside-avoid shadow-sm"
              style={{ display: 'inline-block', width: '100%' }} // Critical for column layout stability
            >
              {/* Image Container - No fixed height to allow natural ratio */}
              <div className="relative w-full">
                <Image
                  src={`/images/gallery/yourpilatecrush-${idx}.webp`}
                  alt={t(`images.alt${idx}`)}
                  width={400} // Base width for aspect ratio calc
                  height={600} // Placeholder height
                  className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-105"
                  unoptimized
                />
              </div>

              {/* Premium Overlay Info */}
              <div className="absolute inset-0 bg-burgundy-deep/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                <div className="glass-premium p-3 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500 backdrop-blur-sm">
                  <p className="text-[9px] uppercase tracking-widest text-gold-champagne font-medium mb-1 border-b border-gold-champagne/10 pb-1">
                    Your Pilate Crush
                  </p>
                  <p className="text-[11px] text-cream font-display italic leading-tight">
                    {t(`images.alt${idx}`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
