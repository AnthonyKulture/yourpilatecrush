'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import FlagFR from '../flags/FlagFR';
import FlagEN from '../flags/FlagEN';

interface LanguageSwitcherProps {
  variant?: 'compact' | 'expanded';
  pastHero?: boolean;
}

/**
 * LanguageSwitcher — hover to reveal, click to switch.
 * Le dropdown sort du flux (position: fixed) pour éviter le clipping
 * dans les conteneurs overflow:hidden du header.
 */
export default function LanguageSwitcher({ variant = 'compact', pastHero = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const locales = [
    { code: 'fr' as const, label: 'FR', flag: FlagFR },
    { code: 'en' as const, label: 'EN', flag: FlagEN },
  ];

  const handleLocaleChange = (newLocale: 'fr' | 'en') => {
    router.replace(pathname, { locale: newLocale });
  };

  const buttonStyles = variant === 'compact'
    ? pastHero
      ? 'bg-burgundy-deep/5 text-burgundy-deep border-burgundy-deep/15'
      : 'bg-white/10 text-cream border-white/20'
    : 'bg-burgundy-deep text-cream border-transparent';

  return (
    <div className="relative group inline-block">
      {/* Trigger */}
      <button
        aria-label="Changer de langue"
        className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border transition-all duration-300 active:scale-95 ${buttonStyles}`}
      >
        <span className="sr-only">Langue sélectionnée :</span>
        {locale === 'fr' ? <FlagFR className="w-4 h-3" /> : <FlagEN className="w-4 h-3" />}
        <span className="text-[10px] font-sans font-bold tracking-[0.2em]">{locale.toUpperCase()}</span>
      </button>

      {/* Dropdown — apparaît au hover, visible au-dessus du header */}
      <div
        role="listbox"
        className="
          absolute right-0 top-full mt-3 py-2 w-28
          bg-white/98 border border-burgundy-deep/10 rounded-2xl shadow-2xl backdrop-blur-xl
          opacity-0 invisible translate-y-1
          group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
          transition-all duration-200 ease-out
          z-[9999]
          overflow-hidden
        "
      >
        {locales.map((loc) => (
          <button
            key={loc.code}
            role="option"
            aria-selected={locale === loc.code}
            onClick={() => handleLocaleChange(loc.code)}
            className={`flex items-center gap-3 w-full px-4 py-2.5 text-[11px] font-sans font-medium transition-all ${
              locale === loc.code
                ? 'text-red-accent bg-red-accent/5'
                : 'text-burgundy-deep/60 hover:bg-burgundy-deep/5 hover:text-burgundy-deep'
            }`}
          >
            <loc.flag className="w-4 h-3 flex-shrink-0" />
            <span>{loc.label}</span>
            {locale === loc.code && (
              <div className="ml-auto w-1 h-1 rounded-full bg-red-accent animate-pulse" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
