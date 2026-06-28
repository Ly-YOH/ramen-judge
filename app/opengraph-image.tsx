import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '今食いたい一杯 | ラーメン診断'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  // フォント取得（失敗しても続行）
  let fontData: ArrayBuffer | null = null
  try {
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
    if (fontUrl) {
      fontData = await fetch(fontUrl).then((r) => r.arrayBuffer())
    }
  } catch {
    // フォントなしでフォールバック
  }

  // 画像取得（失敗したら絵文字にフォールバック）
  let imgSrc: string | null = null
  try {
    const res = await fetch('https://ramen-judge.vercel.app/images/ramen-start.png')
    if (res.ok) {
      const buf = await res.arrayBuffer()
      const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)))
      imgSrc = `data:image/png;base64,${b64}`
    }
  } catch {
    // 画像なしでフォールバック
  }

  const fonts = fontData
    ? [{ name: 'NotoJP', data: fontData, style: 'normal' as const, weight: 900 as const }]
    : []
  const fontFamily = fontData ? 'NotoJP' : 'sans-serif'

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
            fontFamily,
            letterSpacing: '-2px',
            lineHeight: 1,
            marginBottom: '4px',
          }}
        >
          今食いたい
        </div>

        {/* ラーメンイラスト or 絵文字フォールバック */}
        {imgSrc ? (
          <img src={imgSrc} width={290} height={290} style={{ objectFit: 'contain' }} />
        ) : (
          <div style={{ fontSize: 200, lineHeight: 1 }}>🍜</div>
        )}

        {/* 一杯 */}
        <div
          style={{
            fontSize: 136,
            fontWeight: 900,
            color: '#E67E22',
            fontFamily,
            letterSpacing: '-3px',
            lineHeight: 1,
            marginTop: '-52px',
          }}
        >
          一杯
        </div>
      </div>
    ),
    { ...size, fonts }
  )
}
