'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import GallerySchema from './seo/GallerySchema';

/**
 * PhotoGallery Component
 * A premium, unified Bento Grid showcasing all 13 assets.
 * Uses a high-density layout for a professional studio look.
 */
export default function PhotoGallery() {
  const t = useTranslations('home.gallery');

  // Total 13 images
  const indices = Array.from({ length: 13 }, (_, i) => i + 1);

  // Define complex spanning logic for a balanced 13-item grid
  const getSpan = (idx: number) => {
    switch (idx) {
      case 1: return 'md:col-span-2 md:row-span-2'; // Focus
      case 3: return 'md:row-span-2'; // Tall
      case 6: return 'md:col-span-2'; // Wide
      case 10: return 'md:row-span-2'; // Tall
      case 13: return 'md:col-span-2'; // Wide final
      default: return '';
    }
  };

  return (
    <section className="w-full bg-cream py-spacing-2xl px-gutter-mobile sm:px-gutter-desktop">
      {/* SEO Schema */}
      <GallerySchema />
      
      <div className="max-w-container mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <p className="text-[11px] font-sans font-medium uppercase tracking-[0.3em] text-red-accent mb-4">
            {t('eyebrow')}
          </p>
          <h2 className="text-[clamp(32px,5vw,56px)] leading-tight text-burgundy-deep">
            {t.rich('title', {
              em: (chunks) => <em className="signature-italic">{chunks}</em>
            })}
          </h2>
          <div className="w-12 h-[1px] bg-gold-champagne mt-8" aria-hidden="true" />
        </div>

        {/* Dense Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:auto-rows-[200px]">
          {indices.map((idx) => (
            <div 
              key={idx}
              className={`relative overflow-hidden group rounded-sm bg-sand/20 ${getSpan(idx)}`}
            >
              <div className="relative w-full h-full min-h-[250px] md:min-h-full">
                <Image
                  src={`/images/gallery/yourpilatecrush-${idx}.webp`}
                  alt={t(`images.alt${idx}`)}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  unoptimized // Keep as previously fixed
                />
              </div>

              {/* Overlay with subtle info */}
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
