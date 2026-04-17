import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { GlassFilter } from "@/components/ui/liquid-glass";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = buildMetadata({
  title: "Your Pilate Crush · Pilates & Lagree privés — Côte d'Azur & Saint-Barthélemy",
  description: "Séances privées de Pilates et Lagree à domicile, sur-mesure. Côte d'Azur (mai-octobre) et Saint-Barthélemy (novembre-avril). Instructrice certifiée STOTT & Lagree.",
  path: "",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-cream text-burgundy-deep" suppressHydrationWarning>
        <OrganizationSchema 
          siteUrl={SITE_URL} 
          siteName={SITE_NAME}
          description="Votre expert Pilates et Lagree sur-mesure à domicile."
        />
        <GlassFilter />
        <Header />
        {children}
      </body>
    </html>
  );
}
