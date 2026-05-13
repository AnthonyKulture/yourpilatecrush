# SEO Action Plan — yourpilatecrush.studio

**Generated:** 2026-05-13  
**Overall Score:** 40 / 100 → Projected 72+ after Critical + High fixes  

---

## CRITICAL — Fix Immediately

### C1. Unify SITE_URL to a single constant ⏱ 15 min

The www / non-www split is the most foundational bug. All other URL-related fixes inherit from this.

**1. Set the env variable in Vercel:**  
`NEXT_PUBLIC_SITE_URL = https://www.yourpilatecrush.studio`

**2. Delete the local const in `src/app/sitemap.ts` line 3 and replace:**
```ts
// Remove:
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourpilatecrush.studio';

// Add at top:
import { SITE_URL } from '@/lib/seo';
```

**3. Delete the local const in `src/app/robots.ts` line 3 and replace:**
```ts
// Remove:
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourpilatecrush.studio';

// Add at top:
import { SITE_URL } from '@/lib/seo';
```

---

### C2. Fix or delete `src/lib/seo-i18n.ts` ⏱ 20 min

`getAlternateLinks()` generates `/fr/` and `/en/` prefixes, but French has no URL prefix in this router (`localePrefix: 'as-needed'`). The function is broken by design.

**Check if it is used anywhere:**
```bash
grep -r "getAlternateLinks\|seo-i18n" src/ --include="*.ts" --include="*.tsx"
```

If zero results: delete `src/lib/seo-i18n.ts`.

If it is imported: replace every call with the equivalent logic already in `buildMetadata` (the `getFullUrl` function in `seo.ts:30-39`).

---

### C3. Block the design-test page ⏱ 30 min

**In `src/app/[locale]/design-test/page.tsx`, add at the top:**
```ts
import { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
```

**In `src/app/robots.ts`, update the disallow list:**
```ts
disallow: [
  '/api/',
  '/_next/',
  '/admin/',
  '/design-test',
  '/en/design-test',
],
```

---

### C4. Fix the blog stub article (stop active content harm) ⏱ 15 min

The 6-word stub article at `/blog/les-bienfaits-du-pilates-reformer` is actively harming domain quality. 

**Option A (recommended for now):** In `src/lib/articles.ts`, clear the `mockArticles` array:
```ts
const mockArticles: Article[] = [];
```
This means `generateStaticParams` produces no static blog pages, and `/blog` shows an empty listing — much better than a 6-word indexed article.

**Option B (if you want to keep the listing visible):** Keep the article but mark it noIndex:
```ts
// In src/app/[locale]/blog/[slug]/page.tsx, inside generateMetadata:
if (!article) return buildMetadata({ noIndex: true, locale });
// Also add a noIndex flag to the Article type and pass it:
if (article.draft) return buildMetadata({ noIndex: true, locale });
```
Then add `draft: true` to the mock article data.

---

### C5. Create the About/Bio page ⏱ 1-2 days

The `seo.about` metadata namespace exists in both locale files but no page exists at `/about` or `/a-propos`. This is simultaneously an SEO 404 risk and the biggest E-E-A-T gap on the site.

**Create `src/app/[locale]/a-propos/page.tsx`** with:
- Full biography (Candice's background, years of experience, where she trained)
- STOTT Pilates certification details and level
- Lagree Fitness certification details
- Professional photo (use one of the 13 gallery images)
- Methodology philosophy ("pourquoi le mouvement avec intention ?")
- Links to STOTT instructor registry and/or Lagree trainer directory
- A CTA to book a session

```tsx
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.about' });
  return buildMetadata({
    title: t('title'),
    description: t('description'),
    path: '/a-propos',
    locale,
  });
}
```

---

### C6. Create Google Business Profile ⏱ 30 min setup

Go to business.google.com and create a Service Area Business listing:
- Business name: **Your Pilate Crush** (no "s")
- Category: **Fitness Instructor** (primary), Personal Trainer (secondary)
- Address: Do NOT display (SAB option)
- Service area: Alpes-Maritimes (06) + Var (83) for Côte d'Azur; Collectivité de Saint-Barthélemy (971) for winter
- Description: Use the French SEO meta description from `messages/fr.json:224`
- Phone: +33 6 51 59 02 16
- Website: https://www.yourpilatecrush.studio

Request 3 reviews from past clients within the first 30 days to establish baseline trust.

---

## HIGH — Fix Within 1 Week

### H1. Add LocalBusiness schema ⏱ 2 hours

Create `src/components/seo/LocalBusinessSchema.tsx`:

```tsx
import { JsonLd } from './JsonLd';

export function LocalBusinessSchema({ siteUrl }: { siteUrl: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
    '@id': `${siteUrl}/#business`,
    name: 'Your Pilate Crush',
    description: 'Séances privées de Pilates et Lagree à domicile sur-mesure. Instructrice certifiée STOTT Pilates & Lagree. Côte d\'Azur (mai–octobre) et Saint-Barthélemy (novembre–avril).',
    url: siteUrl,
    telephone: '+33651590216',
    email: 'yourpilatescrush@gmail.com',
    priceRange: '€€€',
    areaServed: [
      { '@type': 'City', name: 'Monaco' },
      { '@type': 'City', name: 'Nice' },
      { '@type': 'City', name: 'Cannes' },
      { '@type': 'City', name: 'Saint-Tropez' },
      { '@type': 'AdministrativeArea', name: 'Côte d\'Azur' },
      { '@type': 'City', name: 'Gustavia' },
      { '@type': 'AdministrativeArea', name: 'Saint-Barthélemy' },
    ],
    founder: {
      '@type': 'Person',
      '@id': `${siteUrl}/#candice`,
      name: 'Candice',
      jobTitle: 'Instructrice certifiée STOTT Pilates & Lagree',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Séances privées de Pilates & Lagree',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lagree Microformer — Séance privée' }, price: '190', priceCurrency: 'EUR' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lagree Microformer — Pack 10 séances' }, price: '1300', priceCurrency: 'EUR' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sculpt & Lagree — Séance privée' }, price: '190', priceCurrency: 'EUR' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sculpt & Lagree — Pack 10 séances' }, price: '1300', priceCurrency: 'EUR' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pilates Sculpt & Flow — Séance privée' }, price: '160', priceCurrency: 'EUR' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pilates Sculpt & Flow — Pack 10 séances' }, price: '1200', priceCurrency: 'EUR' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pilates Foundation — Séance privée' }, price: '150', priceCurrency: 'EUR' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pilates Foundation — Pack 10 séances' }, price: '1100', priceCurrency: 'EUR' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Stretch & Mobilité — Séance privée' }, price: '150', priceCurrency: 'EUR' },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Stretch & Mobilité — Pack 10 séances' }, price: '1100', priceCurrency: 'EUR' },
      ],
    },
  };

  return <JsonLd data={schema} />;
}
```

Render it in `src/app/[locale]/layout.tsx` alongside `OrganizationSchema`.

---

### H2. Add Person schema for Candice ⏱ 1 hour

Create `src/components/seo/PersonSchema.tsx`:

```tsx
import { JsonLd } from './JsonLd';

export function PersonSchema({ siteUrl }: { siteUrl: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#candice`,
    name: 'Candice',
    jobTitle: 'Instructrice privée certifiée STOTT Pilates & Lagree',
    worksFor: { '@type': 'Organization', '@id': `${siteUrl}/#business` },
    knowsAbout: ['Pilates STOTT', 'Lagree Microformer', 'Pilates prénatal', 'Pilates postnatal', 'Pilates senior', 'Stretching'],
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'certification', name: 'STOTT PILATES Certified Instructor' },
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'certification', name: 'Lagree Fitness Certified Instructor' },
    ],
    url: siteUrl,
    email: 'yourpilatescrush@gmail.com',
  };

  return <JsonLd data={schema} />;
}
```

Render in the root layout alongside `LocalBusinessSchema`.

---

### H3. Fix OrganizationSchema.tsx ⏱ 30 min

Replace the current `OrganizationSchema.tsx` content with two clean blocks:
1. A `WebSite` block (no `SearchAction` — there is no site search)
2. An `Organization` block with logo, contactPoint, and email

Remove the `potentialAction` entirely. Remove the `publisher` with logoUrl pattern (it belongs on `ArticleJsonLd`).

---

### H4. Fix ArticleJsonLd publisher logo ⏱ 2 hours (includes creating the logo file)

Create `/public/images/logo-publisher.png` — a 600×60px horizontal logo image.

Update `src/components/seo/ArticleJsonLd.tsx:34`:
```ts
logo: {
  '@type': 'ImageObject',
  url: `${SITE_URL}/images/logo-publisher.png`,
  width: 600,
  height: 60,
},
```

Also update the `author` block:
```ts
author: {
  '@type': 'Person',
  '@id': `${SITE_URL}/#candice`,
  name: article.author.name,
  url: SITE_URL,
},
```

---

### H5. Add generateMetadata to mentions-légales ⏱ 20 min

In `src/app/[locale]/mentions-legales/page.tsx`, add at the top:

```ts
import { buildMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: locale === 'fr' ? 'Mentions Légales' : 'Legal Notice',
    description: locale === 'fr'
      ? 'Mentions légales du site Your Pilate Crush — Pilates & Lagree privés.'
      : 'Legal notice for Your Pilate Crush — Private Pilates & Lagree.',
    path: '/mentions-legales',
    locale,
    noIndex: true,
  });
}
```

---

### H6. Make phone number crawlable ⏱ 10 min

In `src/components/Footer.tsx`, replace the current WhatsApp pill JavaScript link with a static `href`:

```tsx
<a 
  href="https://wa.me/33651590216"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-4 bg-white/5 border border-cream/20 rounded-pill px-8 py-4 hover:bg-white/10 transition-colors group"
>
```

Also add a visually hidden but crawlable phone anchor somewhere on the homepage (e.g., inside the Footer or as a microdata element):
```tsx
<a href="tel:+33651590216" className="sr-only">+33 6 51 59 02 16</a>
```

---

### H7. Rewrite sitemap.ts ⏱ 45 min

Replace `src/app/sitemap.ts` entirely:

```ts
import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { getAllArticles } from '@/lib/articles';

const locales = ['fr', 'en'] as const;

const getFullUrl = (locale: string, path: string) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const normalizedPath = cleanPath === '/' ? '' : cleanPath;
  const prefix = locale === 'en' ? '/en' : '';
  return `${SITE_URL}${prefix}${normalizedPath || '/'}`;
};

const buildAlternates = (path: string) => ({
  languages: {
    fr: getFullUrl('fr', path),
    en: getFullUrl('en', path),
    'x-default': getFullUrl('fr', path),
  },
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();

  const staticRoutes = [
    { path: '',                   lastModified: new Date('2025-05-01') },
    { path: '/blog',              lastModified: new Date('2025-05-01') },
    { path: '/mentions-legales',  lastModified: new Date('2025-01-01') },
  ];

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: getFullUrl(locale, route.path),
      lastModified: route.lastModified,
      alternates: buildAlternates(route.path),
    }))
  );

  const articleEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    articles.map((article) => ({
      url: getFullUrl(locale, `/blog/${article.slug}`),
      lastModified: new Date(article.publishedAt),
      alternates: buildAlternates(`/blog/${article.slug}`),
    }))
  );

  return [...staticEntries, ...articleEntries];
}
```

---

### H8. Add real images to the hero ⏱ 2 hours

The hero section has zero images. 13 session photos exist unused in `public/images/raw_gallery/`.

In `src/components/Hero.tsx`, add a `next/image` behind the decorative circle or as a background:

```tsx
import Image from 'next/image';

// Inside the section, add:
<div className="absolute inset-0 -z-10">
  <Image
    src="/images/raw_gallery/yourpilatecrush-1.jpeg"
    alt="Séance privée de Pilates Lagree à domicile sur la Côte d'Azur"
    fill
    className="object-cover opacity-30"
    priority
  />
</div>
```

Select the most visually appropriate of the 13 images. Adjust opacity to maintain text readability.

---

### H9. Fix blog cover image path ⏱ 5 min

In `src/lib/articles.ts:24`, change:
```ts
coverImage: '/images/blog/reformer-benefits.webp'
```
to:
```ts
coverImage: '/images/raw_gallery/yourpilatecrush-1.jpeg'
```

---

### H10. Fix OG image default in seo.ts ⏱ 5 min

In `src/lib/seo.ts:22`, change:
```ts
image = "/favicon.ico",
```
to:
```ts
image,
```
(Remove the default — undefined means no OG image tag is emitted, which is better than a favicon.)

---

### H11. Add keyword to H1 ⏱ 1 hour

Current H1: `"Move with intention."` (zero search keywords)

The brand tagline is strong — preserve it. Add keyword context in the heading hierarchy:

**Option A** — Insert a visually smaller H1 semantically above the tagline:
```tsx
<h1 className="sr-only">Instructrice Pilates & Lagree Privée — Côte d'Azur & Saint-Barthélemy</h1>
<p className="text-[clamp(56px,8vw,96px)] ...">{t.rich('title', ...)}</p>
```

**Option B** — Make the eyebrow an H1, demote the tagline to H2:
```tsx
<h1 className="text-[11px] font-sans ...">{t('eyebrow')}</h1>
<h2 className="text-[clamp(56px,8vw,96px)] ...">{t.rich('title', ...)}</h2>
```

**Option C** — Add a keyword-rich `<p>` directly below the hero as the first visible content block:
```tsx
<p className="sr-only">
  Séances de Pilates et Lagree privées à domicile avec Candice — instructrice certifiée STOTT & Lagree. Disponible sur la Côte d'Azur (Monaco, Nice, Cannes, Saint-Tropez) de mai à octobre, et à Saint-Barthélemy de novembre à avril.
</p>
```

---

## MEDIUM — Fix Within 1 Month

### M1. Add RGPD / Privacy Policy section ⏱ 2 hours

Add to `src/app/[locale]/mentions-legales/page.tsx` a new section covering:
- Data collected (name, email, phone via WhatsApp/email contact)
- Processing purpose (service delivery, not marketing)
- Retention period
- User rights (access, rectification, deletion — Article 15-17 GDPR)
- Cookie policy (if analytics are added later)
- DPO contact or CNIL complaint procedure

---

### M2. Migrate to professional domain email ⏱ 1 hour

Set up `hello@yourpilatecrush.studio` (or `candice@yourpilatecrush.studio`) via Vercel's Email, Cloudflare Email Routing, or a dedicated provider (Fastmail, Proton).

Update all references:
- `src/components/Footer.tsx:47`
- `src/app/[locale]/mentions-legales/page.tsx:21`
- Any schema blocks that reference the email

---

### M3. Fix blog metadata locale-awareness ⏱ 20 min

In `src/app/[locale]/blog/page.tsx`, replace hardcoded strings with translations:

```ts
// Add to messages/fr.json under "seo":
"blog": {
  "title": "Blog | Le Journal Pilate & Lagree",
  "description": "Conseils et expertises Pilates & Lagree par Candice, instructrice privée sur la Côte d'Azur et Saint-Barthélemy."
}

// Add to messages/en.json under "seo":
"blog": {
  "title": "Blog | Pilates & Lagree Journal",
  "description": "Expert Pilates & Lagree advice from Candice, private instructor on the French Riviera and Saint-Barthélemy."
}
```

Then update `generateMetadata` in `blog/page.tsx` to use `getTranslations`.

---

### M4. Fix middleware language detection ⏱ 30 min

In `src/middleware.ts`, set a cookie when redirecting so the user preference is remembered:

```ts
const response = NextResponse.redirect(new URL(newPathname, request.url));
response.cookies.set('NEXT_LOCALE', 'en', {
  path: '/',
  maxAge: 60 * 60 * 24 * 365,
  sameSite: 'lax',
});
return response;
```

---

### M5. Create llms.txt ⏱ 20 min

Create `public/llms.txt` (see full content in FULL-AUDIT-REPORT.md Section 7.1).

---

### M6. Add testimonials section to homepage ⏱ 1 day

Collect 3 real client testimonials (can be first name + city, e.g., "Marie, Monaco"). Create a `TestimonialsSection` component and render it between the Tariffs and Destinations sections.

Add `Review` schema under the `LocalBusiness` entity:
```json
"review": [
  {
    "@type": "Review",
    "author": { "@type": "Person", "name": "Marie, Monaco" },
    "reviewBody": "...",
    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
  }
]
```

---

### M7. Add Content Security Policy ⏱ 1 hour

In `next.config.ts`, add to the headers array:

```ts
{
  key: "Content-Security-Policy",
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
  ].join('; '),
},
```

Remove `X-XSS-Protection` (deprecated, superseded by CSP).

---

### M8. Move homepage metadata from layout to page ⏱ 30 min

Move `generateMetadata` from `src/app/[locale]/layout.tsx` to `src/app/[locale]/page.tsx`.

Replace the layout's export with:
```ts
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};
```

---

## LOW — Backlog

### L1. Build destination landing pages

Create `/src/app/[locale]/destinations/cote-dazur/page.tsx` and `/saint-barthelemy/page.tsx` with unique location-specific content (neighborhoods, logistics, session environment descriptions).

Eventually: `/monaco-pilates`, `/nice-pilates`, `/cannes-pilates`, `/saint-tropez-pilates` for long-tail local SEO.

### L2. Verify Twitter/X handle

In `src/lib/seo.ts:5`, verify `@yourpilatecrush` matches the actual account. Update if different.

### L3. Add RSS autodiscovery in `<head>`

The `feed.xml` route exists but is not linked. Add to the layout:
```ts
// In generateMetadata or layout metadata:
alternates: {
  types: { 'application/rss+xml': `${SITE_URL}/feed.xml` }
}
```

### L4. Write first real blog article

Target keyword: "pilates privé à domicile côte d'azur : comment ça fonctionne ?"  
Minimum 1,500 words. Include genuine first-person perspective from Candice on what a typical session looks like (setting, equipment setup, client interaction). This is impossible for a competitor to replicate and is the highest-E-E-A-T content type available.

### L5. Fix blog `x-default` locale routing

In `src/app/[locale]/blog/[slug]/page.tsx`, the hreflang alternates only map `locale` → URL for the current locale. A full alternates block with `fr`, `en`, and `x-default` should be generated for each article.

### L6. Add HSTS preload submission

`next.config.ts` already has `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`. Submit the domain to [hstspreload.org](https://hstspreload.org) to join the browser preload list if not already done.

---

## Score Projection After Fixes

| Phase | Fixes Applied | Projected Score |
|---|---|---|
| Current | None | 40/100 |
| After Critical fixes (C1–C6) | Domain, schema, blog, GBP | 58/100 |
| After High fixes (H1–H11) | All infrastructure | 72/100 |
| After Medium fixes | Content, email, CSP | 82/100 |
| After Low + content production | Blog, destination pages | 90+/100 |

---

## Immediate Next Steps (Today)

1. `src/lib/seo.ts` → confirm it has `www` in the URL ✓ already correct
2. `src/app/sitemap.ts` → import SITE_URL from seo.ts (5 min)
3. `src/app/robots.ts` → import SITE_URL from seo.ts + add design-test disallow (10 min)
4. `src/app/[locale]/design-test/page.tsx` → add noindex metadata (5 min)
5. `src/lib/articles.ts` → clear mockArticles array (2 min)
6. `src/lib/seo.ts:22` → change `image = "/favicon.ico"` to `image` (2 min)
7. `src/lib/articles.ts:24` → fix coverImage path to existing file (2 min)
8. Vercel dashboard → set `NEXT_PUBLIC_SITE_URL=https://www.yourpilatecrush.studio`

**Total for today:** ~30 minutes of code changes. No design changes required.
