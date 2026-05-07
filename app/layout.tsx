import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '今日の一杯 | ラーメン診断',
  description:
    'ラーメン選びでもう失敗しない！今の気分や苦手なものを入力するだけで、あなたにぴったりの一杯を導き出すガチの診断ツールです。検索結果はGoogleマップと連動。今日、最高のラーメンに出会おう！',
  keywords: 'ラーメン診断,ラーメン おすすめ,今日のラーメン,ラーメン選び,ラーメン 種類',
  openGraph: {
    title: '今日の一杯 | ラーメン診断',
    description: '30秒で今の気分を言語化。あなたにぴったりのラーメンジャンルをサクッと診断！',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        {children}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://adm.shinobi.jp/s/45f785f2c648050ded30ac3f29866b46" />
      </body>
    </html>
  )
}
