import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

export const runtime = 'edge';

// Dimensions standards OG Image (1200x630)
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'home.hero' });
  const tSeo = await getTranslations({ locale: params.locale, namespace: 'seo.home' });

  return new ImageResponse(
    (
      <div
        style={{
          background: '#F9F6F0', // bg-cream
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid #4A1A2C', // bg-burgundy-deep
            borderRadius: '24px',
            width: '100%',
            height: '100%',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <span
             style={{
               fontSize: '18px',
               color: '#D4AF37', // gold-champagne
               letterSpacing: '4px',
               marginBottom: '20px',
               textTransform: 'uppercase',
             }}
          >
            Your Pilate Crush
          </span>
          <h1
            style={{
              fontSize: '84px',
              fontStyle: 'italic',
              color: '#4A1A2C',
              margin: '0 0 20px 0',
              fontWeight: 600,
              letterSpacing: '-2px',
            }}
          >
            Pilates & Lagree Privés
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#4A1A2C',
              margin: 0,
              maxWidth: '800px',
              fontWeight: 400,
              opacity: 0.8,
            }}
          >
            {tSeo('description')}
          </p>
          <div
            style={{
              display: 'flex',
              gap: '24px',
              marginTop: '60px',
              fontSize: '24px',
              color: '#4A1A2C',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            <span>{t('seasons.summer.location')}</span>
            <span>•</span>
            <span>{t('seasons.winter.location')}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
