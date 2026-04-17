import { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.yourpilatecrush.studio";
export const SITE_NAME = "Your Pilate Crush";
export const TWITTER_HANDLE = "@yourpilatecrush"; // Remplacez par le handle réel

interface BuildMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
  locale?: string;
}

/**
 * Fonction centrale de génération de metadata pour Next.js App Router (2024-2025)
 */
export function buildMetadata({
  title,
  description = "Séances privées de Pilates et Lagree à domicile, sur-mesure. Côte d'Azur et Saint-Barthélemy. Instructrice certifiée STOTT & Lagree.",
  image = "/favicon.ico", 
  path = "",
  noIndex = false,
  locale = "fr",
}: BuildMetadataProps = {}): Metadata {
  // Gestion de l'URL canonique en fonction de la locale (as-needed)
  // fr -> /path (sans préfixe)
  // en -> /en/path
  const getFullUrl = (l: string, p: string) => {
    const cleanPath = p.startsWith("/") ? p.slice(1) : p;
    const prefix = l === "en" ? "/en" : "";
    
    // Avoid trailing slash if path is empty
    const finalPath = cleanPath ? `/${cleanPath}` : "";
    const fullUrl = `${SITE_URL}${prefix}${finalPath}`;
    
    // Fallback to SITE_URL if everything else is empty (homepage)
    return fullUrl || SITE_URL;
  };

  const url = getFullUrl(locale, path);

  return {
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    ...(title && { title }), 
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: {
        "fr": getFullUrl("fr", path),
        "en": getFullUrl("en", path),
        "x-default": getFullUrl("fr", path), // Le français est la langue par défaut
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url,
      title: title || SITE_NAME,
      description,
      siteName: SITE_NAME,
      ...(image && {
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title || SITE_NAME,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: title || SITE_NAME,
      description,
      images: [image],
      creator: TWITTER_HANDLE,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Nettoie une chaîne pour en faire un slug SEO-friendly
 */
export function generateSlug(title: string): string {
  return title
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Enlève les accents
    .replace(/\s+/g, "-") // Remplace espaces par tirets
    .replace(/[^\w-]+/g, "") // Supprime les caractères non alphanumériques
    .replace(/--+/g, "-") // Remplace multiples tirets par un seul
    .replace(/^-+/, "") // Trim au début
    .replace(/-+$/, "") // Trim à la fin
    .substring(0, 60); // Limite raisonnable
}
