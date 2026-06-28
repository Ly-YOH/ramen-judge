import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '今食いたい一杯 | ラーメン診断'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const css = await fetch(
    'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@900&display=swap',
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
        }}
      >
        {/* 今食いたい */}
        <div
          style={{
            fontSize: 112,
            fontWeight: 900,
            color: '#2C1A0E',
            fontFamily: 'Noto Sans JP',
            letterSpacing: '-2px',
            lineHeight: 1,
            marginBottom: '4px',
          }}
        >
          今食いたい
        </div>

        {/* ラーメンイラスト */}
        <img
          src="https://ramen-judge.vercel.app/images/ramen-start.png"
          width={290}
          height={290}
          style={{ objectFit: 'contain' }}
        />

        {/* 一杯（イラスト下部に重ねる） */}
        <div
          style={{
            fontSize: 136,
            fontWeight: 900,
            color: '#E67E22',
            fontFamily: 'Noto Sans JP',
            letterSpacing: '-3px',
            lineHeight: 1,
            marginTop: '-52px',
          }}
        >
          一杯
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: 'Noto Sans JP', data: fontData, style: 'normal', weight: 900 }]
        : [],
    }
  )
}
