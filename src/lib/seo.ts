import { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourpilatecrush.studio";
export const SITE_NAME = "Your Pilate Crush";
export const TWITTER_HANDLE = "@yourpilatecrush"; // Remplacez par le handle réel

interface BuildMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
}

/**
 * Fonction centrale de génération de metadata pour Next.js App Router (2024-2025)
 * Paramètres par défaut optimisés pour SEO, avec surcharge par page possible.
 */
export function buildMetadata({
  title,
  description = "Séances privées de Pilates et Lagree à domicile, sur-mesure. Côte d'Azur et Saint-Barthélemy. Instructrice certifiée STOTT & Lagree.",
  image = "/favicon.ico", // Par défaut, opengraph-image.tsx de Next remplacera ça si présent au root
  path = "",
  noIndex = false,
}: BuildMetadataProps = {}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    ...(title && { title }), // Remplace title complet si fourni, sinon garde default/template
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: {
        "fr": url,
      },
    },
    openGraph: {
      type: "website",
      locale: "fr_FR",
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
