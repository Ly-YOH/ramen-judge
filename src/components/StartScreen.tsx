import { AdmaxAd } from './AdmaxAd'
import Footer from './Footer'

interface Props {
  onStart: () => void
}

export default function StartScreen({ onStart }: Props) {
  return (
    <div className="flex flex-col min-h-screen px-6 py-3">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center text-center">
        {/* メインビジュアル */}
        <img
          src="/images/ramen-start.png"
          alt="ラーメン"
          className="w-36 mb-1"
        />

        {/* Title */}
        <h1 className="text-4xl font-black text-ramen-dark mb-1 tracking-tight leading-tight">
          今日の一杯
        </h1>
        <p className="text-ramen-orange font-bold text-base mb-3 tracking-wide">
          ラーメン診断
        </p>

        {/* Hero story text */}
        <div className="bg-white rounded-3xl border border-stone-100 shadow-sm px-5 py-3 mb-2 text-left w-full">
          <p className="text-stone-600 text-sm leading-relaxed">
            「近くのラーメン屋」で検索して、お店選びに失敗した経験はありませんか？
          </p>
          <p className="text-ramen-brown font-semibold text-sm mt-2 leading-relaxed">
            今のあなたが本当に求めている一杯を、数問の質問からサクッと診断！
          </p>
        </div>

        {/* Map chip */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-ramen-brown bg-orange-100 border border-orange-200 rounded-full px-3 py-1.5">
            ✓ 診断結果をGoogleMapでそのまま検索
          </span>
        </div>

        {/* CTA */}
        <div className="w-full">
          <button onClick={onStart} className="btn-primary text-xl py-4">
            診断スタート 🍥
          </button>
          <p className="text-stone-400 text-xs mt-2">所要時間：約30秒 ・ 全8問</p>
        </div>
      </div>

      {/* 広告 */}
      <div className="mt-10">
        <AdmaxAd />
      </div>

      {/* フッター */}
      <Footer />
    </div>
  )
}
