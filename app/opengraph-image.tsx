import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '今食いたい一杯 | ラーメン診断'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  // Noto Sans JP Bold（日本語サブセット）を Google Fonts から取得
  const css = await fetch(
    'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap',
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    }
  ).then((r) => r.text())

  const japaneseSection = css.split('/* japanese */')[1] ?? css
  const fontUrl = japaneseSection.match(/url\((.+?)\) format\('woff2'\)/)?.[1]
  const fontData = fontUrl ? await fetch(fontUrl).then((r) => r.arrayBuffer()) : null

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
          padding: '60px',
        }}
      >
        <div style={{ fontSize: 100, marginBottom: '20px', lineHeight: 1 }}>🍜</div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: '#2C1A0E',
            fontFamily: 'Noto Sans JP',
            marginBottom: '16px',
            letterSpacing: '-2px',
            lineHeight: 1.2,
          }}
        >
          今食いたい一杯
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: '#E67E22',
            fontFamily: 'Noto Sans JP',
            marginBottom: '48px',
          }}
        >
          ラーメン診断
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#7D4E2A',
            fontFamily: 'Noto Sans JP',
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          今の気分を言語化。あなたにぴったりのラーメンジャンルをサクッと診断！
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: 'Noto Sans JP', data: fontData, style: 'normal', weight: 700 }]
        : [],
    }
  )
}
