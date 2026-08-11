import { ImageResponse } from 'next/og';

export const alt = 'أذكار وأدعية حسب شعورك';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FBFAF8',
          color: '#392B3D',
          fontFamily: 'sans-serif',
          direction: 'rtl',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '64px 90px',
            border: '3px solid #E3DCE5',
            borderTop: '14px solid #CBA1D4',
            borderRadius: 44,
            background: '#FFFFFF',
          }}
        >
          <div style={{ fontSize: 76, marginBottom: 20 }}>🤲</div>
          <div style={{ fontSize: 64, fontWeight: 800 }}>أذكار وأدعية</div>
          <div style={{ marginTop: 18, fontSize: 32, color: '#392B3D' }}>
            حسب شعورك
          </div>
        </div>
      </div>
    ),
    size,
  );
}
