'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useState, useRef, useEffect } from 'react';
import FlagFR from '../flags/FlagFR';
import FlagEN from '../flags/FlagEN';

interface LanguageSwitcherProps {
  variant?: 'compact' | 'expanded';
  pastHero?: boolean;
}

/**
 * LanguageSwitcher Component
 * Modern, accessible language picker with SVG flags and smooth transitions.
 */
export default function LanguageSwitcher({ variant = 'compact', pastHero = false }: LanguageSwitcherProps) {
  const t = useTranslations('common.buttons');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const locales = [
    { code: 'fr' as const, label: 'FR', flag: FlagFR },
    { code: 'en' as const, label: 'EN', flag: FlagEN },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLocaleChange = (newLocale: 'fr' | 'en') => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Define colors based on scrolled state/variant
  const buttonStyles = variant === 'compact'
    ? pastHero 
      ? 'bg-burgundy-deep/5 text-burgundy-deep' 
      : 'bg-white/10 text-cream border-white/20'
    : 'bg-burgundy-deep text-cream';

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t('switchLanguage')}
        className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border transition-all duration-300 active:scale-95 ${buttonStyles}`}
      >
        <span className="sr-only">Langue sélectionnée :</span>
        {locale === 'fr' ? <FlagFR className="w-4 h-3" /> : <FlagEN className="w-4 h-3" />}
        <span className="text-[10px] font-sans font-bold tracking-[0.2em]">{locale.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div 
          role="listbox"
          className="absolute right-0 mt-3 py-2 w-28 bg-white/95 border border-burgundy-deep/10 rounded-2xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-3 duration-300 z-50 overflow-hidden"
        >
          {locales.map((loc) => (
            <button
              key={loc.code}
              role="option"
              aria-selected={locale === loc.code}
              onClick={() => handleLocaleChange(loc.code)}
              className={`flex items-center gap-3 w-full px-4 py-2.5 text-[11px] font-sans font-medium transition-all group ${
                locale === loc.code 
                  ? 'text-red-accent bg-red-accent/5' 
                  : 'text-burgundy-deep/60 hover:bg-burgundy-deep/5 hover:text-burgundy-deep'
              }`}
            >
              <loc.flag className="w-4 h-3 flex-shrink-0" />
              <span>{loc.label}</span>
              {locale === loc.code && (
                <div 
                  className="ml-auto w-1 h-1 rounded-full bg-red-accent animate-pulse" 
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
