import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Candice Pilates · Pilates & Lagree privés — Côte d'Azur & Saint-Barthélemy",
  description: "Séances privées de Pilates et Lagree à domicile, sur-mesure. Côte d'Azur (mai-octobre) et Saint-Barthélemy (novembre-avril). Instructrice certifiée STOTT & Lagree.",
  openGraph: {
    title: "Move with intention — Candice Pilates",
    description: "Une pratique exclusive et sur-mesure, dispensée dans le cadre intimiste de votre villa ou résidence.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-cream text-burgundy-deep">
        {children}
      </body>
    </html>
  );
}
