'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import GallerySchema from './seo/GallerySchema';

interface GalleryProps {
  indices: number[]; // Indices of images to show (e.g. [1, 2, 3, 4, 5])
  title?: string;
  showSchema?: boolean;
}

/**
 * PhotoGallery Component
 * A premium, responsive Bento Grid for showcasing studio atmosphere.
 * Supports multiple instances with different image sets.
 */
export default function PhotoGallery({ indices, title, showSchema = false }: GalleryProps) {
  const t = useTranslations('home.gallery');

  // Map indices to actual image objects with bento-specific class names
  const images = indices.map((idx, index) => {
    let className = '';
    // Custom bento logic based on position in current view
    if (index === 0) className = 'md:col-span-2 md:row-span-2';
    else if (index === 2) className = 'md:col-span-1 md:row-span-2';
    
    return {
      src: `/images/gallery/Yourpilatecrush-${idx}.webp`,
      alt: t(`images.alt${idx}`),
      className
    };
  });

  return (
    <section className="w-full bg-cream py-spacing-2xl px-gutter-mobile sm:px-gutter-desktop">
      {showSchema && <GallerySchema />}
      
      <div className="max-w-container mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <p className="text-[11px] font-sans font-medium uppercase tracking-[0.3em] text-red-accent mb-4">
            {t('eyebrow')}
          </p>
          <h2 className="text-[clamp(32px,5vw,56px)] leading-tight text-burgundy-deep">
            {title ? (
              <em className="signature-italic">{title}</em>
            ) : (
              t.rich('title', {
                em: (chunks) => <em className="signature-italic">{chunks}</em>
              })
            )}
          </h2>
          <div className="w-12 h-[1px] bg-gold-champagne mt-8" aria-hidden="true" />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:auto-rows-[250px]">
          {images.map((img, index) => (
            <div 
              key={index}
              className={`relative overflow-hidden group rounded-sm bg-sand/20 ${img.className || ''}`}
            >
              <div className="relative w-full h-full min-h-[300px] md:min-h-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={showSchema && index === 0}
                  unoptimized
                />
              </div>

              {/* Premium Overlay Info */}
              <div className="absolute inset-0 bg-burgundy-deep/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <div className="glass-premium p-4 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500 backdrop-blur-sm">
                  <p className="text-[10px] uppercase tracking-widest text-gold-champagne font-medium mb-1 border-b border-gold-champagne/20 pb-1">
                    Your Pilate Crush
                  </p>
                  <p className="text-[12px] text-cream font-display italic">
                    {img.alt}
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
