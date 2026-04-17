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

  // 2. Exécution du middleware i18n
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
