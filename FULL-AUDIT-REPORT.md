# SEO Full Audit Report — yourpilatecrush.studio

**Date:** 2026-05-13  
**Site:** https://www.yourpilatecrush.studio  
**Business:** Your Pilate Crush — Pilates & Lagree privés, Candice  
**Stack:** Next.js 16.2.4 App Router · next-intl (fr/en) · Tailwind CSS 4 · Vercel  
**Business type detected:** Service Area Business (SAB) — luxury private instructor; Côte d'Azur (mai–oct) & Saint-Barthélemy (nov–avr)

---

## Overall SEO Health Score: 40 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 55/100 | 12.1 |
| Content Quality | 23% | 34/100 | 7.8 |
| On-Page SEO | 20% | 44/100 | 8.8 |
| Schema / Structured Data | 10% | 20/100 | 2.0 |
| Performance (CWV) | 10% | 65/100 | 6.5 |
| AI Search Readiness | 10% | 22/100 | 2.2 |
| Images | 5% | 10/100 | 0.5 |
| **Total** | **100%** | | **40 / 100** |

**Interpretation:** The site has an excellent technical foundation (security headers, i18n routing, SSG, clean build) and outstanding design quality. The critical SEO deficit is structural, not aesthetic: the content layer is nearly absent (one 6-word stub article, no About page, no testimonials, no location pages), and the local SEO infrastructure (GBP, LocalBusiness schema, crawlable phone number) does not yet exist. Every dimension can be improved without touching the design. The score projects to 72+ with the Critical and High fixes applied.

---

## Executive Summary

### Top 5 Critical Issues

1. **www / non-www domain split** — `seo.ts` declares `www.yourpilatecrush.studio`; `robots.ts` and `sitemap.ts` use `yourpilatecrush.studio` without www. Canonicals and sitemap point to different origins, splitting crawl authority.
2. **Blog stub article is live and indexable** — The only blog article has 6 words of real content and has been live for 2 years. This is the canonical example of thin content and actively damages the domain-level quality assessment.
3. **No LocalBusiness schema, no GBP listing** — A luxury local service business with zero local SEO infrastructure. The site is categorically excluded from Google's local 3-pack, which is the primary SERP feature for "pilates privé Monaco" queries.
4. **`seo-i18n.ts` generates broken canonical and hreflang URLs** — The helper always prefixes French with `/fr/` but the routing uses `localePrefix: 'as-needed'` (French is at `/`, not `/fr/`). Any page using this helper has an incorrect canonical.
5. **No About/Bio page** — The `seo.about` metadata exists in both locale files pointing to a page that 404s. Candice has no page where credentials, certifications, story, or expertise are established. This is the primary E-E-A-T gap.

### Top 5 Quick Wins

1. **Fix domain constants** — Unify `SITE_URL` to one shared constant (15 min). Fixes canonicals, sitemap, and robots.txt in one change.
2. **Add `noindex` to design-test page and robots.ts** — Stops a dev page from being indexed (30 min).
3. **Set blog mock article to `noIndex: true`** — Stops thin content from harming domain quality immediately (15 min).
4. **Make phone number crawlable** — Add a static `<a href="tel:+33651590216">` to the homepage (10 min).
5. **Change OG image default from `favicon.ico` to `undefined`** — Stops favicon appearing as social preview for all pages (5 min).

---

## Section 1: Technical SEO

### 1.1 URL Consistency — CRITICAL

**Files:** `src/lib/seo.ts:3`, `src/app/sitemap.ts:3`, `src/app/robots.ts:3`

Three independent `SITE_URL` constants with conflicting values:
- `seo.ts` → `https://www.yourpilatecrush.studio` (www)
- `sitemap.ts` → `https://yourpilatecrush.studio` (no www)
- `robots.ts` → `https://yourpilatecrush.studio` (no www)

Google treats these as separate origins. Canonical tags (from seo.ts) point to www; the sitemap and robots `Sitemap:` directive point to non-www. The crawl authority is split.

**Fix:** Create one shared constant and use it everywhere:
```ts
// src/lib/seo.ts — already the right value
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.yourpilatecrush.studio";
```
In `sitemap.ts` and `robots.ts`, replace the local const with:
```ts
import { SITE_URL } from '@/lib/seo';
```
Also set `NEXT_PUBLIC_SITE_URL=https://www.yourpilatecrush.studio` in Vercel environment variables so both files use the env var rather than the hardcoded fallback.

---

### 1.2 `seo-i18n.ts` — Broken Canonical Generator — CRITICAL

**File:** `src/lib/seo-i18n.ts`

`getAlternateLinks()` generates URLs as `${SITE_URL}/${locale}${slug}` (e.g., `/fr/` for the French homepage). The i18n routing uses `localePrefix: 'as-needed'`, which means French has **no URL prefix** — the homepage is at `/`, not `/fr/`. A canonical pointing to `/fr/` either 404s or redirects, and Google ignores it.

Additionally, for the homepage where `slug` is empty, the function produces `https://www.yourpilatecrush.studio//fr/` (double slash) due to concatenation.

**Fix:** Audit all `import { getAlternateLinks }` across the codebase. If this function is unused (the main `buildMetadata` in `seo.ts` already has its own correct `getFullUrl`), delete `seo-i18n.ts` entirely. If it is used, rewrite it to mirror `seo.ts:30-39`.

---

### 1.3 design-test Page is Publicly Indexable — CRITICAL

**File:** `src/app/[locale]/design-test/page.tsx`

This development artifact exports no `generateMetadata` and therefore inherits the root layout's homepage metadata (title "Your Pilate Crush", homepage canonical). It appears in Google's index at `/design-test` and `/en/design-test`.

**Fix A:** Add to `design-test/page.tsx`:
```ts
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};
```
**Fix B:** Add to `robots.ts` disallow list:
```ts
disallow: ['/api/', '/_next/', '/admin/', '/design-test', '/en/design-test'],
```

Apply both fixes. robots.txt prevents crawl; meta robots prevents indexing of any already-cached URL.

---

### 1.4 mentions-légales Has No Metadata — HIGH

**File:** `src/app/[locale]/mentions-legales/page.tsx`

No `generateMetadata` export. The page inherits root layout metadata — homepage title, homepage canonical URL, homepage Open Graph. This means `/mentions-legales` appears in SERPs as "Your Pilate Crush" with a homepage canonical.

**Fix:**
```ts
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    title: locale === 'fr' ? 'Mentions Légales' : 'Legal Notice',
    description: locale === 'fr' ? 'Mentions légales du site Your Pilate Crush.' : 'Legal notice for Your Pilate Crush.',
    path: '/mentions-legales',
    locale,
    noIndex: true,
  });
}
```

---

### 1.5 Homepage Metadata Lives in Layout, Not Page — HIGH

**File:** `src/app/[locale]/layout.tsx`

`generateMetadata` in the layout generates homepage metadata. Architecturally, each page should own its metadata. The layout's metadata currently applies to all child routes, and if Next.js metadata merging behaves unexpectedly in future versions, the homepage could silently lose its specific metadata.

**Fix:** Move `generateMetadata` from `layout.tsx` to `page.tsx`. Replace the layout's export with:
```ts
export const metadata: Metadata = { metadataBase: new URL(SITE_URL) };
```

---

### 1.6 Middleware Language Redirect — No Cookie Set — HIGH

**File:** `src/middleware.ts:19-28`

The middleware redirects non-French `Accept-Language` users to `/en/`. It reads the `NEXT_LOCALE` cookie but never sets it. A user explicitly navigating back to `/` after a redirect gets redirected again indefinitely, overriding their intent. Also, browsers sending `Accept-Language: de,fr;q=0.8` (German primary, French secondary) will be incorrectly redirected to `/en/` because the check only uses `includes('fr')` without respecting `q` values.

**Fix:**
```ts
const response = NextResponse.redirect(new URL(newPathname, request.url));
response.cookies.set('NEXT_LOCALE', 'en', { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
return response;
```

---

### 1.7 Sitemap lastModified Always `new Date()` — HIGH

**File:** `src/app/sitemap.ts:25`

Every entry shows the current request time as `lastModified`. Googlebot learns to ignore dynamic `lastmod` values it cannot trust. Real static dates should be used, or the field omitted.

---

### 1.8 Blog Index Metadata Not Locale-Aware — MEDIUM

**File:** `src/app/[locale]/blog/page.tsx`

Hardcoded French strings for title and description regardless of the `locale` parameter. An English user at `/en/blog` gets a French browser tab and French social preview.

---

### 1.9 No Content Security Policy Header — MEDIUM

**File:** `next.config.ts`

Security headers include HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy, but no CSP. CSP is flagged by Lighthouse as a best-practice failure and is the primary XSS defence (`X-XSS-Protection` is deprecated in modern browsers). A minimum CSP should be added.

---

### 1.10 robots.ts `isProduction` Check Fragile — LOW

**File:** `src/app/robots.ts`

The `process.env.VERCEL_ENV !== 'preview'` check is correct for Vercel deployments but would pass (and allow crawling) on any non-Vercel host where `VERCEL_ENV` is undefined. Document this assumption.

---

### 1.11 Twitter Handle Placeholder — LOW

**File:** `src/lib/seo.ts:5`

`TWITTER_HANDLE = "@yourpilatecrush"; // Remplacez par le handle réel` — verify this matches the actual X/Twitter account. An incorrect handle means articles receive no Twitter Card attribution.

---

## Section 2: Content Quality & E-E-A-T

### E-E-A-T Composite Score: 29 / 100

| Signal | Score | Note |
|---|---|---|
| Experience | 30/100 | Candice named but no bio, no photos of sessions, no narrative |
| Expertise | 35/100 | Certifications mentioned in eyebrow text only, no detail |
| Authoritativeness | 22/100 | No press, no social proof, no testimonials, no external links |
| Trustworthiness | 32/100 | Gmail for luxury service, no RGPD, no booking transparency |

---

### 2.1 Blog Stub Article — CRITICAL

**File:** `src/lib/articles.ts:13`

The only blog article has `content: '## Introduction\n\nTous les bienfaits du Pilates...'` — 6 words of real content on a page that has been indexed for 2+ years. This is the canonical example of thin content. The March 2024 core update (which absorbed the Helpful Content System) classifies this as Lowest quality content. It actively degrades the domain-level quality assessment.

**Immediate fix:** Add `noIndex: true` to the article data or the blog page metadata, OR delete the mock article from the array so no static page is generated.

Long-term: Write 4+ real articles (1,500+ words each) before re-enabling the blog. See content strategy in Section 2.8.

---

### 2.2 No About/Bio Page — CRITICAL

**File:** `messages/fr.json:218-219`, `messages/en.json`

The `seo.about` namespace exists in both locale files and references a page that **does not exist**. There is no route at `/a-propos` or `/about`. Any URL that declared this as a canonical would serve a 404.

More critically: Candice has no page where her certifications (STOTT Pilates, Lagree), years of experience, training background, client philosophy, or personal story are established. This is the single biggest E-E-A-T gap for a solo practitioner in a health/fitness YMYL-adjacent vertical.

**Fix:** Build `/src/app/[locale]/a-propos/page.tsx` (or `/about` for the English equivalent) with: full biography, STOTT/Lagree certification details, professional photo, years of experience, methodology philosophy, and links to external verification (STOTT instructor registry, Lagree Fitness directory).

---

### 2.3 No RGPD / Privacy Policy — HIGH (Legal)

**File:** `src/app/[locale]/mentions-legales/page.tsx`

The Mentions Légales page contains editor identity and hosting info but zero RGPD compliance content. French law (RGPD, article 13 CNIL) requires disclosure of: data collected, processing purpose, retention period, user rights, and DPO contact. A WhatsApp contact form and any analytics (even Vercel's) constitute data processing that must be disclosed.

**Fix:** Add a "Politique de confidentialité" section to the Mentions Légales page, or create a separate `/politique-de-confidentialite` page.

---

### 2.4 H1 Has No Keywords — HIGH

**File:** `src/components/Hero.tsx:28`

The H1 is `"Move with intention."` — a brand tagline with zero searchable terms. The eyebrow above it (`"STOTT PILATES · CERTIFICATION LAGREE"`) is a `<p>` tag, not a heading element, so it carries no heading weight.

A user searching "pilates privé domicile Monaco", "instructrice lagree côte d'azur", or "private pilates French Riviera" finds nothing in the H1 that signals relevance.

**Options:**
- Option A: Keep tagline as-is, insert a visually smaller but semantically primary H1 above it: `"Instructrice Pilates & Lagree Privée — Côte d'Azur & Saint-Barth"`
- Option B: Append location/service keywords in a visually secondary line immediately below the tagline, wrapped in an H2.
- Option C: Add a keyword-rich introductory paragraph below the hero (first content block below fold).

---

### 2.5 Keywords Nearly Absent from Body Content — HIGH

Critical keywords that should appear throughout the homepage but are largely absent:

| Keyword | Occurrences in rendered content |
|---|---|
| "domicile" | 1 (bullet in Method 01 only) |
| "privé/privées" | Footer description + SEO title only |
| "luxe" / "luxury" | 0 |
| "Monaco" | Pill label only (no heading/paragraph context) |
| "Nice" / "Cannes" / "Saint-Tropez" | Pill labels only |
| "STOTT certifiée" | Eyebrow `<p>` tag only |
| "Lagree" | Method section (good) |

The three words most critical for this business — **privé**, **domicile**, **luxe** — are each nearly absent from indexable body copy.

---

### 2.6 Meta Title / Description Length Issues — MEDIUM

| Page | Language | Character Count | Issue |
|---|---|---|---|
| Homepage | FR | Title: 67 chars | Will truncate on mobile (safe limit: ~60) |
| Homepage | EN | Title: 70 chars | Over display limit |
| Homepage | FR | Description: 176 chars | "Résultats visibles." will be cut |
| Homepage | EN | Description: 164 chars | "Visible results." will be cut |
| Blog index | FR | Hardcoded FR strings in EN locale | Language mismatch |

**Files:** `messages/fr.json:222-225`, `messages/en.json`

---

### 2.7 Gmail Address for Luxury Service — MEDIUM

**File:** `src/components/Footer.tsx:47`, `src/app/[locale]/mentions-legales/page.tsx:21`

`yourpilatescrush@gmail.com` is displayed as the business contact for a 150–190€/session private service. HNWI clients expect professional domain email. This undermines trust signals for both users and Google's quality assessment.

Additionally, the business name in the email (`yourpilatescrush` with "s") conflicts with the domain and SITE_NAME (`yourpilatecrush` without "s") — a NAP inconsistency that will damage local rankings once a GBP listing exists.

**Fix:** Set up `hello@yourpilatecrush.studio` (or `candice@yourpilatecrush.studio`) and forward to Gmail. Update all references.

---

### 2.8 Missing Critical Pages — HIGH / MEDIUM

| Page | Priority | Reason |
|---|---|---|
| `/a-propos` (About/Bio) | Critical | E-E-A-T anchor; SEO metadata exists but page 404s |
| Privacy Policy / RGPD | High (Legal) | Required by French law |
| `/destinations/cote-dazur` | High | Captures local search for Monaco/Nice/Cannes/Saint-Tropez |
| `/destinations/saint-barthelemy` | High | Captures local search for Saint-Barth season |
| `/faq` | Medium | Captures voice/AI queries; addresses booking objections |
| `/contact` (dedicated) | Medium | The entire CTA chain is a footer link |
| `/monaco-pilates`, `/nice-pilates`, `/cannes-pilates` | Medium | Long-tail local SEO |

---

### 2.9 Placeholder `about.description` in Translation Files — LOW

**File:** `messages/fr.json:218`: `"Nous sommes passionnés par le Pilates."` — a textbook generic placeholder. Same in `en.json`. If these strings are ever rendered, they would trigger a quality rater flag.

---

### 2.10 Blog Content Strategy

When the blog is ready to relaunch, the recommended content pillars:

**Pillar 1 — Method education (mid-funnel):**
- "Lagree vs Pilates : quelles différences pour votre corps ?" (2,000 words)
- "STOTT Pilates : qu'est-ce que c'est et pourquoi c'est différent" (1,800 words)
- "Combien de séances de Pilates pour voir des résultats ?" (1,500 words)
- "Pilates prénatal : ce que toute femme enceinte doit savoir" (2,000 words)

**Pillar 2 — Luxury lifestyle / location (HNWI + AI citation):**
- "Pilates sur yacht : comment Candice adapte les séances en mer" (1,500 words) — unique first-person content
- "S'entraîner à Saint-Barthélemy : le guide wellness de la saison hivernale" (2,000 words)
- "Côte d'Azur wellness : les meilleures pratiques pour votre été" (1,800 words)

**Pillar 3 — Client trust / bottom-funnel:**
- "À quoi s'attendre lors de votre première séance privée avec Candice" (1,200 words)
- "Pourquoi le Pilates à domicile est supérieur au studio" (1,500 words)

Each article must contain genuine first-person perspective from Candice to satisfy the Experience criterion (Sept 2025 QRG).

---

## Section 3: Schema & Structured Data

### 3.1 OrganizationSchema.tsx — CRITICAL (Invalid Schema)

**File:** `src/components/seo/OrganizationSchema.tsx`

**Problem 1:** The component is named `OrganizationSchema` but emits `@type: "WebSite"`. These are separate schema types with different purposes. `WebSite` is for Sitelinks Searchbox; `Organization` establishes entity identity. You need both as separate blocks.

**Problem 2:** The `potentialAction` SearchAction targets `${siteUrl}?q={search_term_string}`. The site has no search functionality. This is invalid markup — Google's Sitelinks Searchbox eligibility requires the target URL to actually return search results. Remove it.

**Problem 3:** The `publisher` block with logo is never emitted because `logoUrl` is not passed at the call site in `layout.tsx`.

**Fix:** Replace with two separate components rendered in the root layout:

```tsx
// WebSite block (clean)
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Your Pilate Crush",
  "url": "https://www.yourpilatecrush.studio",
  "inLanguage": ["fr", "en"]
}

// Organization block (entity identity)
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Pilate Crush",
  "url": "https://www.yourpilatecrush.studio",
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.yourpilatecrush.studio/images/logo-publisher.png",
    "width": 600,
    "height": 60
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+33-6-51-59-02-16",
    "contactType": "customer service",
    "availableLanguage": ["French", "English"]
  },
  "email": "yourpilatescrush@gmail.com"
}
```

---

### 3.2 No LocalBusiness Schema — CRITICAL

No `LocalBusiness` or any subtype exists anywhere. For a local service business, this is the primary schema type that enables local pack eligibility, rich results, and AI entity understanding.

**Correct schema for an SAB instructor:**

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
  "@id": "https://www.yourpilatecrush.studio/#business",
  "name": "Your Pilate Crush",
  "description": "Séances privées de Pilates et Lagree à domicile sur-mesure. Instructrice certifiée STOTT Pilates & Lagree. Côte d'Azur (mai–octobre) et Saint-Barthélemy (novembre–avril).",
  "url": "https://www.yourpilatecrush.studio",
  "telephone": "+33651590216",
  "email": "yourpilatescrush@gmail.com",
  "priceRange": "€€€",
  "areaServed": [
    { "@type": "City", "name": "Monaco" },
    { "@type": "City", "name": "Nice" },
    { "@type": "City", "name": "Cannes" },
    { "@type": "City", "name": "Saint-Tropez" },
    { "@type": "AdministrativeArea", "name": "Côte d'Azur" },
    { "@type": "City", "name": "Gustavia" },
    { "@type": "AdministrativeArea", "name": "Saint-Barthélemy" }
  ],
  "founder": {
    "@type": "Person",
    "@id": "https://www.yourpilatecrush.studio/#candice",
    "name": "Candice",
    "jobTitle": "Instructrice certifiée STOTT Pilates & Lagree"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Séances privées de Pilates & Lagree",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Lagree Microformer — Séance privée" }, "price": "190", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Lagree Microformer — Pack 10 séances" }, "price": "1300", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sculpt & Lagree — Séance privée" }, "price": "190", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sculpt & Lagree — Pack 10 séances" }, "price": "1300", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pilates Sculpt & Flow — Séance privée" }, "price": "160", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pilates Sculpt & Flow — Pack 10 séances" }, "price": "1200", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pilates Foundation — Séance privée" }, "price": "150", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pilates Foundation — Pack 10 séances" }, "price": "1100", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Stretch & Mobilité — Séance privée" }, "price": "150", "priceCurrency": "EUR" },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Stretch & Mobilité — Pack 10 séances" }, "price": "1100", "priceCurrency": "EUR" }
    ]
  }
}
```

---

### 3.3 No Person Schema for Candice — HIGH

No `Person` schema anywhere. A solo practitioner in a health/fitness field (YMYL-adjacent) needs a machine-readable entity graph connecting her credentials to the business.

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.yourpilatecrush.studio/#candice",
  "name": "Candice",
  "jobTitle": "Instructrice privée certifiée STOTT Pilates & Lagree",
  "worksFor": { "@type": "Organization", "@id": "https://www.yourpilatecrush.studio/#business" },
  "knowsAbout": ["Pilates STOTT", "Lagree Microformer", "Pilates prénatal", "Pilates postnatal", "Pilates senior", "Stretching"],
  "hasCredential": [
    { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "STOTT PILATES Certified Instructor" },
    { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "Lagree Fitness Certified Instructor" }
  ],
  "url": "https://www.yourpilatecrush.studio",
  "email": "yourpilatescrush@gmail.com"
}
```

---

### 3.4 ArticleJsonLd Uses favicon.ico as Publisher Logo — HIGH

**File:** `src/components/seo/ArticleJsonLd.tsx:34`

Google requires publisher logos to be at minimum 600×60px, rectangular, raster format. A favicon (32×32 or 16×16 square icon) fails all three criteria. Blog posts are ineligible for the author-byline rich result appearance until this is fixed.

**Fix:** Create `/public/images/logo-publisher.png` at 600×60px and update the URL:
```ts
logo: {
  '@type': 'ImageObject',
  url: `${SITE_URL}/images/logo-publisher.png`,
  width: 600,
  height: 60,
}
```

Also add `@id` to the author block to link the entity graph:
```ts
author: {
  '@type': 'Person',
  '@id': `${SITE_URL}/#candice`,
  name: article.author.name,
  url: SITE_URL,
}
```

---

### 3.5 BreadcrumbListSchema Missing on Blog Index — LOW

**File:** `src/app/[locale]/blog/page.tsx`

BreadcrumbList schema exists on individual article pages but not on the blog index page. A breadcrumb for `/blog` would also be valuable.

---

## Section 4: Sitemap

### 4.1 Blog Pages Missing — HIGH

**File:** `src/app/sitemap.ts`

Only two routes included: homepage and `/mentions-legales`. The blog index (`/blog`) and all blog articles are absent. Any future blog article will have no sitemap entry.

**Rewritten sitemap** (see ACTION-PLAN.md for complete code):
- Import `getAllArticles()` from `src/lib/articles.ts`
- Add `/blog` route
- Add all article slugs dynamically
- Add `x-default` to all `alternates.languages`
- Import `SITE_URL` from `src/lib/seo` instead of declaring locally
- Replace `lastModified: new Date()` with static dates

---

### 4.2 x-default Missing from Sitemap hreflang — MEDIUM

**File:** `src/app/sitemap.ts:29-31`

`alternates.languages` only includes `fr` and `en`. Without `x-default`, Google cannot determine which variant to serve when no locale matches the user.

---

## Section 5: Images

### 5.1 Zero Images Used Anywhere on the Site — HIGH

Not a single `<img>` tag or `next/image` component exists anywhere in the source code. The hero section is pure CSS gradients and text. The site is invisible to Google Image Search and offers no visual content for crawlers to index.

There are **13 JPEG photos** in `public/images/raw_gallery/` (yourpilatecrush-{1..13}.jpeg) that are completely unused.

**Immediate action:** Add at least one real session photo to the hero using `next/image` with a keyword-rich `alt` text:
```tsx
<Image
  src="/images/raw_gallery/yourpilatecrush-1.jpeg"
  alt="Séance privée de Pilates Lagree à domicile sur la Côte d'Azur avec Candice"
  width={1200}
  height={800}
  priority
/>
```

---

### 5.2 Blog Cover Image References Non-Existent File — HIGH

**File:** `src/lib/articles.ts:24`

`coverImage: '/images/blog/reformer-benefits.webp'` — this path does not exist. The OG image tag for the blog article points to a 404. Any `<img>` or `next/image` rendering it will show a broken image or throw.

**Fix:** Change to an existing file until real images are available:
```ts
coverImage: '/images/raw_gallery/yourpilatecrush-1.jpeg'
```

---

### 5.3 OG Image Defaults to favicon.ico — HIGH

**File:** `src/lib/seo.ts:22`

`image = "/favicon.ico"` is the default for all pages that don't pass an explicit image. The dynamic `opengraph-image.tsx` exists for the homepage and is correct. For the blog index, articles, and legal page, the OG image would be a favicon.

**Fix:** Change the default to `undefined` — the conditional `...(image && { images: [...] })` block already handles the undefined case gracefully.

---

## Section 6: Local SEO

### Local SEO Score: 12 / 100

| Signal | Score |
|---|---|
| GBP Signals | 0/100 |
| Reviews & Reputation | 0/100 |
| Local On-Page SEO | 28/100 |
| NAP Consistency | 30/100 |
| Local Schema Markup | 5/100 |
| Local Authority Signals | 10/100 |

### 6.1 No Google Business Profile — CRITICAL

The site is categorically excluded from Google's local 3-pack without a GBP listing. For queries like "pilates privé Monaco", "cours lagree côte d'azur", the local 3-pack is the primary SERP feature and receives the majority of clicks.

**Action:** Create a GBP as a Service Area Business (SAB — no physical address displayed). Set service area to Alpes-Maritimes (Côte d'Azur) and Collectivité de Saint-Barthélemy. Primary category: "Fitness Instructor" or "Personal Trainer".

### 6.2 Phone Number Not Crawlable — HIGH

**File:** `src/components/Footer.tsx:29-38`

The phone number is assembled via JavaScript (`['33', '6', '51', '59', '02', '16'].join('')`) with `href="#"`. Google's crawler does not execute this JavaScript. The only crawlable phone reference is the mentions-légales page.

**Fix:** Add a static `<a href="tel:+33651590216">` somewhere on the homepage. It can be visually hidden via CSS or styled as desired — the href just needs to be present in the static HTML.

### 6.3 Business Name Inconsistency — HIGH

`yourpilatecrush` (domain, SITE_NAME, Twitter handle) vs `yourpilatescrush` (email address). Once GBP citations start building, this inconsistency will create NAP mismatches that suppress local rankings.

**Fix:** Canonicalize to "Your Pilate Crush" (no 's'). Update the Gmail address to a domain email, or at minimum ensure any directories/citations use "yourpilatecrush" consistently.

### 6.4 No Location Landing Pages — HIGH

Zero dedicated pages for the eight named locations. The cities (Monaco, Nice, Cannes, Saint-Tropez, Gustavia, St-Jean, Flamands, Lorient) appear only as text pill labels in React component props — they have no semantic heading weight, no body copy context, and no chance of ranking for location-specific queries.

### 6.5 No Testimonials or Reviews — HIGH

No `aggregateRating`, no `Review` schema, no visible testimonials section. For a 150–190€/session luxury service, social proof is critical for conversion. Three anonymous testimonials (first name + city) with `Review` schema would address both the conversion gap and the authority signal gap.

---

## Section 7: AI / GEO Search Readiness

### AI Readiness Score: 22 / 100

### 7.1 No llms.txt — MEDIUM

**Expected path:** `public/llms.txt`

This file does not exist. AI crawlers (ClaudeBot, GPTBot, PerplexityBot) have no guidance on which content to cite, what is off-limits, or how to summarize the business.

**Recommended content:**
```
# Your Pilate Crush — llms.txt
## Business
Private Pilates & Lagree instructor. Certified STOTT Pilates & Lagree. Sessions at client's home, villa, or yacht.

## Services
- Lagree Microformer: 190€/session, 1300€/10 sessions
- Sculpt & Lagree: 190€/session, 1300€/10 sessions
- Pilates Sculpt & Flow: 160€/session, 1200€/10 sessions
- Pilates Foundation: 150€/session, 1100€/10 sessions
- Stretch & Restore: 150€/session, 1100€/10 sessions

## Service Areas
- May–October: Côte d'Azur (Monaco, Nice, Cannes, Saint-Tropez)
- November–April: Saint-Barthélemy (Gustavia, St-Jean, Flamands, Lorient)

## Contact
WhatsApp: +33 6 51 59 02 16
Email: yourpilatescrush@gmail.com

## Allow
/
/blog/
/a-propos

## Disallow
/design-test
/mentions-legales
```

### 7.2 Content Lacks Passage-Level Citability — HIGH

AI systems extract specific paragraphs for citation. For a passage to be cited it needs to be factually specific, self-contained, and attributable.

**Missing citable facts:**
- Candice's certification body and year
- How far she travels from a base point
- Whether she is a solo practitioner
- Languages spoken (implied bilingual but not stated)
- Years of experience or session count
- Travel policy for yacht sessions

---

## Section 8: Performance

### Performance Score: 65 / 100 (estimated)

Cannot measure live CWV without deployment access. Code-level assessment:

**Positive signals:**
- CSS gradients instead of images — good for initial LCP (but bad for content quality)
- `display: "swap"` on both Google Fonts — prevents render-blocking
- `generateStaticParams` — all pages pre-rendered at build time
- `poweredByHeader: false` — removes fingerprinting overhead
- No third-party scripts detected (no analytics, no chat widget, no ads)

**Risk factors:**
- Liquid glass CSS effects (`animate-float`, backdrop-blur) may impact CLS and INP on lower-powered devices
- No `next/image` usage means no automatic WebP conversion, lazy loading, or blur placeholders for future images
- When images are added, they must use `next/image` with `priority` on above-the-fold images to avoid LCP regression

---

## Files Referenced in This Audit

| File | Issues Found |
|---|---|
| `src/lib/seo.ts` | Domain constant (www), favicon OG default, Twitter placeholder |
| `src/lib/seo-i18n.ts` | Broken canonical generator — delete or rewrite |
| `src/app/sitemap.ts` | Wrong domain, blog missing, no x-default, dynamic lastmod |
| `src/app/robots.ts` | Wrong domain, design-test not blocked |
| `src/middleware.ts` | Language redirect with no cookie set |
| `src/app/[locale]/layout.tsx` | Metadata should move to page.tsx |
| `src/app/[locale]/page.tsx` | No generateMetadata export |
| `src/app/[locale]/mentions-legales/page.tsx` | No generateMetadata, no RGPD content |
| `src/app/[locale]/design-test/page.tsx` | No noindex, dev artifact in production |
| `src/app/[locale]/blog/page.tsx` | Non-localized metadata strings |
| `src/app/[locale]/blog/[slug]/page.tsx` | OK — structure good |
| `src/lib/articles.ts` | Stub article with 6-word content, non-existent cover image |
| `src/components/Hero.tsx` | H1 has zero keywords |
| `src/components/Footer.tsx` | Phone obfuscated in JS, Gmail business email |
| `src/components/seo/OrganizationSchema.tsx` | Wrong @type, phantom SearchAction |
| `src/components/seo/ArticleJsonLd.tsx` | favicon.ico as publisher logo |
| `messages/fr.json` | Placeholder about description, title length issues |
| `next.config.ts` | Missing CSP header |
| `public/images/raw_gallery/` | 13 JPEGs completely unused |
