import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Dimensions standards OG Image (1200x630)
export const alt = 'Your Pilate Crush - Séances privées sur la Côte d\'Azur et Saint-Barthélemy';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  // Optionnel: Chargement de Custom Fonts pour un rendu exact
  // const interRegular = await fetch(new URL('./fonts/Inter-Regular.ttf', import.meta.url)).then((res) => res.arrayBuffer());

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
            Your Pilate Crush
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
            Séances privées de Pilates & Lagree
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
            <span>Côte d'Azur</span>
            <span>•</span>
            <span>Saint-Barthélemy</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
