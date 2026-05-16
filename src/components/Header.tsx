'use client';

import React, { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { GlassEffect } from './ui/liquid-glass';
import { 
  Sparkles, 
  Gem, 
  Palmtree, 
  MessageCircle, 
  Menu, 
  X,
  Dna
} from 'lucide-react';
import LanguageSwitcher from './i18n/LanguageSwitcher';
import { useTranslations } from 'next-intl';

/**
 * Header Component
 * Ultra-modern Liquid Glass Floating Navigation.
 */
export default function Header() {
  const t = useTranslations('common.nav');
  const [isOpen, setIsOpen] = useState(false);
  
  // Liens de navigation Onepage — toutes des ancres (#)
  const NAV_LINKS = [
    { label: t('pratiques'), href: '#pratiques', icon: Gem, isAnchor: true },
    { label: t('tarifs'), href: '#tarifs', icon: Dna, isAnchor: true },
    { label: t('destinations'), href: '#destinations', icon: Palmtree, isAnchor: true },
    { label: t('contact'), href: '#contact', icon: MessageCircle, isAnchor: true },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setPastHero(y > window.innerHeight * 0.75);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track which section is currently in the middle of the viewport
  useEffect(() => {
    const ids = ['pratiques', 'tarifs', 'destinations', 'contact'];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open (iOS Safari-safe pattern)
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  return (
    <>
      {/* --- DESKTOP FLOATING DOCK --- */}
      <header className="fixed top-8 left-0 right-0 z-50 pointer-events-none hidden lg:flex justify-end pr-8">
        <GlassEffect 
          className="pointer-events-auto rounded-full transition-all duration-500 shadow-xl"
          style={{
            background: pastHero
              ? 'linear-gradient(135deg, rgba(247,238,229,0.75) 0%, rgba(247,238,229,0.55) 100%)'
              : 'linear-gradient(135deg, rgba(74,22,19,0.30) 0%, rgba(120,30,25,0.18) 100%)',
            border: pastHero
              ? '1px solid rgba(74, 22, 19, 0.10)'
              : '1px solid rgba(228,200,152,0.20)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
        >
          <nav className="flex items-center gap-1 px-4 py-2">
            {/* Brand Logo inside Dock */}
            <Link href="/" className={`flex items-center gap-3 pr-6 mr-4 border-r group ${pastHero ? 'border-burgundy-deep/15' : 'border-white/20'}`}>
                <div className="w-8 h-8 rounded-full bg-burgundy-deep flex items-center justify-center text-gold-champagne font-display italic text-lg flex-shrink-0">
                  C
                </div>
                <span className={`font-display tracking-[0.18em] text-[11px] font-semibold whitespace-nowrap transition-colors duration-500 ${pastHero ? 'text-burgundy-deep' : 'text-cream'}`}>
                  YOUR PILATE CRUSH
                </span>
            </Link>

            {/* Nav Items */}
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.replace('#', '');
              const navClass = "group relative flex flex-col items-center px-4 py-1 rounded-xl hover:bg-white/10 transition-all duration-500";
              const iconColor = isActive
                ? 'text-red-accent'
                : pastHero ? 'text-burgundy-deep/70' : 'text-cream/80';
              const labelColor = isActive
                ? 'text-red-accent'
                : pastHero ? 'text-burgundy-deep/50' : 'text-cream/50';
              const inner = (
                <>
                  <div className="relative p-1.5">
                    <Icon
                      className={`w-4 h-4 transition-colors duration-500 group-hover:text-red-accent ${iconColor}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className={`text-[8px] font-sans font-medium uppercase tracking-[0.12em] transition-all duration-500 group-hover:text-red-accent ${labelColor}`}>
                    {link.label}
                  </span>
                  {/* Active indicator dot */}
                  <span
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-accent transition-all duration-500"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: `translateX(-50%) scale(${isActive ? 1 : 0.3})`,
                    }}
                    aria-hidden="true"
                  />
                </>
              );
              return link.isAnchor ? (
                <a key={link.label} href={link.href} className={navClass}>{inner}</a>
              ) : (
                <Link key={link.label} href={link.href} className={navClass}>{inner}</Link>
              );
            })}
            <div className={`ml-4 pl-4 border-l ${pastHero ? 'border-burgundy-deep/10' : 'border-white/10'}`}>
              <LanguageSwitcher pastHero={pastHero} />
            </div>
          </nav>
        </GlassEffect>
      </header>

      {/* --- MOBILE HEADER TOP BAR --- */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] lg:hidden flex justify-between items-center px-6 pointer-events-none"
        style={{
          paddingTop: 'calc(1.5rem + env(safe-area-inset-top, 0px))',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {/* Brand Watermark on Mobile */}
        <div className="pointer-events-auto">
          <Link href="/" className="w-10 h-10 rounded-full bg-burgundy-deep flex items-center justify-center text-gold-champagne font-display italic text-xl shadow-lg border border-gold-champagne/20">
            C
          </Link>
        </div>

        {/* Mobile Burger */}
        <div className="pointer-events-auto">
          <GlassEffect 
            onClick={() => setIsOpen(!isOpen)}
            className={`rounded-full p-3.5 cursor-pointer transition-all duration-500 active:scale-90 ${isOpen ? 'bg-burgundy-deep' : ''}`}
            style={{
              background: isOpen 
                ? 'rgba(74,22,19,0.9)'
                : pastHero 
                  ? 'linear-gradient(135deg, rgba(247,238,229,0.75) 0%, rgba(247,238,229,0.55) 100%)'
                  : 'linear-gradient(135deg, rgba(74,22,19,0.30) 0%, rgba(120,30,25,0.18) 100%)',
              border: isOpen 
                ? '1px solid rgba(228,200,152,0.3)'
                : pastHero 
                  ? '1px solid rgba(74,22,19,0.12)'
                  : '1px solid rgba(228,200,152,0.20)',
            }}
          >
            {isOpen ? (
              <X className="w-5 h-5 text-cream" />
            ) : (
              <Menu className={`w-5 h-5 transition-colors ${pastHero ? 'text-burgundy-deep' : 'text-cream'}`} />
            )}
          </GlassEffect>
        </div>
      </div>

      {/* --- MOBILE LIQUID GLASS MENU --- */}
      <div 
        className="fixed inset-0 z-40 lg:hidden"
        style={{
          // GPU-composited transform animation — no layout triggers
          transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
          opacity: isOpen ? 1 : 0,
          transition: 'transform 550ms cubic-bezier(0.19,1,0.22,1), opacity 400ms ease',
          pointerEvents: isOpen ? 'auto' : 'none',
          willChange: 'transform, opacity',
        }}
      >
        {/* Glass Background — no SVG filter on mobile for performance */}
        <div 
          className="absolute inset-0 bg-cream/98"
          style={{ 
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            transform: 'translateZ(0)', // force GPU layer
          }} 
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(247,238,229,0.0) 60%)' }} />

        {/* Content — sized to fit smallest realistic viewport (iPhone SE ~667px) without internal scroll */}
        <div
          className="relative z-10 flex flex-col h-full w-full px-7 overflow-hidden"
          style={{
            paddingTop: 'calc(5rem + env(safe-area-inset-top, 0px))',
            paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
          }}
        >
          {/* Nav links — vertically centred to absorb extra space on tall phones */}
          <nav className="flex flex-col gap-3 flex-1 justify-center">
            {NAV_LINKS.map((link, i) => {
              const Icon = link.icon;
              const mobileClass = "group flex items-center justify-between border-b border-burgundy-deep/10 pb-3";
              const mobileStyle = {
                transform: isOpen ? 'translateX(0)' : 'translateX(24px)',
                opacity: isOpen ? 1 : 0,
                transition: 'transform 600ms cubic-bezier(0.22,1,0.36,1), opacity 500ms ease',
                transitionDelay: `${120 + i * 70}ms`,
                willChange: 'transform, opacity' as const,
              };
              const mobileInner = (
                <>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-burgundy-deep/5 border border-burgundy-deep/8 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-burgundy-deep" strokeWidth={1.2} />
                    </div>
                    <span className="text-[26px] sm:text-[30px] font-display italic text-burgundy-deep leading-none">
                      {link.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-sans font-medium uppercase tracking-[0.3em] text-red-accent/40">→</span>
                </>
              );
              return link.isAnchor ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={mobileClass}
                  style={mobileStyle}
                >
                  {mobileInner}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={mobileClass}
                  style={mobileStyle}
                >
                  {mobileInner}
                </Link>
              );
            })}
            <div className="mt-4 px-2">
              <LanguageSwitcher variant="expanded" />
            </div>
          </nav>

          {/* Contact CTA block — visually distinct, anchored to the bottom */}
          <div
            className="flex flex-col gap-4 pt-5 mt-4 border-t border-burgundy-deep/10"
            style={{
              opacity: isOpen ? 1 : 0,
              transition: 'opacity 600ms ease',
              transitionDelay: '450ms',
            }}
          >
            <p className="text-[10px] font-sans uppercase tracking-[0.35em] text-burgundy-deep/45">
              Expert Pilates &amp; Lagree
            </p>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://wa.me/33651590216"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full border border-burgundy-deep/15 bg-white/70 py-3 text-[12px] font-sans font-semibold text-burgundy-deep active:scale-[0.97] transition-transform"
              >
                <span className="text-[9px] uppercase tracking-[0.25em] text-red-accent/70">WhatsApp</span>
              </a>
              <a
                href="mailto:yourpilatescrush@gmail.com"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full border border-burgundy-deep/15 bg-white/70 py-3 text-[12px] font-sans font-semibold text-burgundy-deep active:scale-[0.97] transition-transform"
              >
                <span className="text-[9px] uppercase tracking-[0.25em] text-red-accent/70">Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
