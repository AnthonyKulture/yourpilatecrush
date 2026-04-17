import { buildMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "../globals.css"; // Fixed path
import Header from "@/components/Header";
import { GlassFilter } from "@/components/ui/liquid-glass";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.home' });
  
  return buildMetadata({
    title: t('title'),
    description: t('description'),
    path: ``, // Or dynamic depending on route
  });
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'seo.home' });

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-cream text-burgundy-deep" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <OrganizationSchema 
            siteUrl={SITE_URL} 
            siteName={SITE_NAME}
            description={t('description')}
          />
          <GlassFilter />
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
