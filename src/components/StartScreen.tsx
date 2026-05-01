import AdBlock from './AdBlock'
import Footer from './Footer'

interface Props {
  onStart: () => void
}

export default function StartScreen({ onStart }: Props) {
  return (
    <div className="flex flex-col min-h-screen px-6 py-10">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center text-center">
        {/* メインビジュアル */}
        <img
          src="/images/ramen-start.png"
          alt="ラーメン"
          className="w-full max-w-xs mb-5 mt-2 mx-auto"
        />

        {/* Title */}
        <h1 className="text-5xl font-black text-ramen-dark mb-1 tracking-tight leading-tight">
          今日の一杯
        </h1>
        <p className="text-ramen-orange font-bold text-base mb-5 tracking-wide">
          ラーメン診断
        </p>

        {/* Catchcopy chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['30秒で今の気分を言語化', '失敗しないお店選び', 'Googleマップと連動'].map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold text-ramen-brown bg-orange-100 border border-orange-200 rounded-full px-3 py-1"
            >
              ✓ {tag}
            </span>
          ))}
        </div>

        {/* Hero story text */}
        <div className="bg-white rounded-3xl border border-stone-100 shadow-sm px-5 py-4 mb-8 text-left max-w-sm">
          <p className="text-stone-600 text-sm leading-relaxed">
            ラーメンが食べたい気分だけど、「近くのラーメン屋」で検索して適当に入り、お店選びに失敗する…そんな経験はありませんか？
          </p>
          <p className="text-ramen-brown font-semibold text-sm mt-2 leading-relaxed">
            今のあなたが本当に求めている一杯を、数問の質問からサクッと診断！
          </p>
        </div>

        {/* CTA */}
        <div className="w-full max-w-sm">
          <button onClick={onStart} className="btn-primary text-xl py-5">
            診断スタート 🍥
          </button>
          <p className="text-stone-400 text-xs mt-3">所要時間：約30秒 ・ 全8問</p>
        </div>
      </div>

      {/* 広告 */}
      <div className="mt-10">
        <AdBlock />
      </div>

      {/* フッター */}
      <Footer />
    </div>
  )
}
