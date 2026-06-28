import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '今食いたい一杯 | ラーメン診断'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FDF6EC',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
        }}
      >
        <div style={{ fontSize: 160, lineHeight: 1 }}>🍜</div>
        <div style={{ fontSize: 60, color: '#E67E22', fontWeight: 900 }}>
          Ramen Diagnosis
        </div>
      </div>
    ),
    size
  )
}
