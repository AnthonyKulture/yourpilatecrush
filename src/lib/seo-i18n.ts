import { SITE_URL } from "./seo";

/**
 * Génère les liens alternatifs (hreflang) pour le SEO multilingue.
 * @param locale La locale actuelle
 * @param path Le chemin de la page sans le préfixe de langue (ex: '/about')
 */
export function getAlternateLinks(locale: string, path: string = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const slug = normalizedPath === "/" ? "" : normalizedPath;

  return {
    canonical: `${SITE_URL}/${locale}${slug}`,
    languages: {
      fr: `${SITE_URL}/fr${slug}`,
      en: `${SITE_URL}/en${slug}`,
      "x-default": `${SITE_URL}/fr${slug}`,
    },
  };
}
