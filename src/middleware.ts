import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // 1. SEO : Normalisation des URLs (lowercase)
  if (url.pathname !== url.pathname.toLowerCase() && !url.pathname.startsWith('/api/') && !url.pathname.startsWith('/_next/')) {
    url.pathname = url.pathname.toLowerCase();
    return NextResponse.redirect(url, 308);
  }

  // 2. Détection automatique de la langue
  // On cible les chemins qui n'ont pas de préfixe (donc par défaut en FR avec localePrefix: 'as-needed')
  const isDefaultLocalePath = !url.pathname.startsWith('/en/') && url.pathname !== '/en';
  
  if (isDefaultLocalePath && !request.cookies.has('NEXT_LOCALE')) {
    const acceptLanguage = request.headers.get('accept-language');
    // Si la langue préférée n'inclut pas le français, on redirige vers la version anglaise (/en/...)
    if (acceptLanguage && !acceptLanguage.toLowerCase().includes('fr')) {
      const newPathname = `/en${url.pathname === '/' ? '' : url.pathname}`;
      return NextResponse.redirect(new URL(newPathname, request.url));
    }
  }

  // 3. Exécution du middleware i18n
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
