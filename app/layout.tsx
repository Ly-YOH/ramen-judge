import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://ramen-judge.vercel.app'),
  title: '今食いたい一杯 | ラーメン診断',
  description:
    'ラーメン選びでもう失敗しない！今の気分や苦手なものを入力するだけで、あなたにぴったりの一杯を導き出すガチの診断ツールです。検索結果はGoogleマップと連動。今すぐ、最高のラーメンに出会おう！',
  keywords: 'ラーメン診断,ラーメン おすすめ,今日のラーメン,ラーメン選び,ラーメン 種類',
  openGraph: {
    title: '今食いたい一杯 | ラーメン診断',
    description: '今の気分を言語化。あなたにぴったりのラーメンジャンルをサクッと診断！',
    images: [{ url: '/images/ramen-start.png', width: 700, height: 700, alt: '今食いたい一杯 ラーメン診断' }],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    images: [{ url: '/images/ramen-start.png', width: 700, height: 700, alt: '今食いたい一杯 ラーメン診断' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
