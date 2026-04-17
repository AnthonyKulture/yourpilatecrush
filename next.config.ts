import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Force un trailing slash cohérent (false par défaut dans App Router, ce qui est préférable pour SEO)
  trailingSlash: false,
  async redirects() {
    return [
      {
        // Redirection www vers non-www pour éviter le duplicate content
        // Attention: Sur Vercel, il est préférable de configurer cela dans les paramètres du domaine.
        // Ce code est utile si hébergé ailleurs.
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.yourpilatecrush.studio',
          },
        ],
        destination: 'https://yourpilatecrush.studio/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
