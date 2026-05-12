import { useEffect, useState } from 'react'
import { Genre } from '../types'
import { AdmaxAd } from './AdmaxAd'
import Footer from './Footer'

interface Props {
  genre: Genre
  secondGenre: Genre
  oppositeGenre: Genre
  dislikes: string[]
  redirectNote: string | null
  onRestart: () => void
}

type View = 'primary' | 'opposite' | 'secondary'

const APP_URL = 'https://ramen-judge.vercel.app'

const VIEW_LABEL: Record<View, string> = {
  primary:   '診断結果',
  opposite:  '正反対の結果',
  secondary: '2位の結果',
}

export default function ResultScreen({ genre: primaryGenre, secondGenre, oppositeGenre, dislikes, redirectNote, onRestart }: Props) {
  const [view, setView] = useState<View>('primary')
  useEffect(() => { window.scrollTo(0, 0) }, [])
  useEffect(() => { window.scrollTo(0, 0) }, [view])

  const genre =
    view === 'opposite'  ? oppositeGenre  :
    view === 'secondary' ? secondGenre    :
    primaryGenre

  // Googleマップ検索クエリ
  const baseQuery = genre.mapsQuery ?? (
    genre.mapKeyword.includes('ラーメン') ? genre.mapKeyword : `${genre.mapKeyword}ラーメン`
  )
  const mapsQuery = dislikes.includes('貝') ? `${baseQuery} -貝` : baseQuery
  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(mapsQuery)}/`

  // SNSシェア
  const shareText = `今の気分にぴったりの一杯は【${genre.name}】でした！ #今日の一杯 #ラーメン診断`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(APP_URL)}`
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(APP_URL)}&text=${encodeURIComponent(shareText)}`

  const hasDisliked = dislikes.length > 0

  return (
    <div className="flex flex-col min-h-screen px-5 py-10">
      <div className="flex-1">
        {/* Top label */}
        <p className="text-center text-ramen-orange font-bold text-sm tracking-widest uppercase mb-3">
          {VIEW_LABEL[view]}
        </p>

        {/* Genre name + 結果画像 */}
        <div className="flex items-end justify-start mb-6 gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-3xl font-black text-ramen-dark mb-1 leading-tight">
              {genre.name}
            </h2>
            <p className="text-ramen-orange font-semibold text-base">
              {view === 'primary'   && 'があなたにぴったり！'}
              {view === 'opposite'  && 'は正反対の一杯です'}
              {view === 'secondary' && 'も合うかもしれません'}
            </p>
          </div>
          <img
            src="/images/ramen-result.png"
            alt="ラーメン"
            className="w-28 flex-shrink-0"
          />
        </div>

        {/* Redirect notice（診断結果のみ表示） */}
        {view === 'primary' && redirectNote && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-4 flex gap-3">
            <span className="text-xl flex-shrink-0">🔄</span>
            <p className="text-blue-800 text-sm leading-relaxed">{redirectNote}</p>
          </div>
        )}

        {/* 元の結果に戻るバナー（alternative表示中のみ） */}
        {view !== 'primary' && (
          <button
            onClick={() => setView('primary')}
            className="w-full mb-4 py-2 px-4 rounded-2xl text-sm font-semibold text-ramen-orange bg-orange-50 border border-orange-200 active:scale-95 transition-transform duration-100"
          >
            ← 元の診断結果（{primaryGenre.name}）に戻る
          </button>
        )}

        {/* Description card */}
        <div className="bg-white rounded-3xl shadow-md p-5 mb-3 border border-stone-100">
          <p className="text-stone-700 text-base leading-relaxed">
            {genre.description}
          </p>
          {genre.followUpNote && (
            <p className="mt-3 pt-3 border-t border-stone-100 text-stone-500 text-sm leading-relaxed italic">
              {genre.followUpNote}
            </p>
          )}
        </div>

        {/* Flavor note */}
        <div className="bg-orange-50 border border-orange-100 rounded-2xl px-4 py-3 mb-4 flex items-start gap-2.5">
          <span className="text-lg flex-shrink-0 mt-0.5">💡</span>
          <div>
            <p className="text-xs font-bold text-ramen-orange mb-0.5">味の特徴 ＆ 味変のヒント</p>
            <p className="text-sm text-ramen-brown leading-snug">{genre.flavorNote}</p>
          </div>
        </div>

        {/* Dislikes notice */}
        {hasDisliked && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4 flex gap-3">
            <span className="text-xl flex-shrink-0">⚠️</span>
            <div className="text-amber-800 text-sm leading-relaxed">
              <span className="font-bold">{dislikes.join('・')}</span>
              は含まれにくい店をおすすめします。
              {dislikes.includes('貝') && (
                <span className="block mt-1 text-amber-700">
                  マップ検索に貝系の店が混ざらないよう絞り込んでいます。
                </span>
              )}
              {dislikes.includes('獣臭') && !redirectNote && (
                <span className="block mt-1 text-amber-700">
                  ※ 匂いの強い店が多いので、口コミで「臭みなし」と書かれた店を選ぶと安心です。
                </span>
              )}
            </div>
          </div>
        )}

        {/* Map button */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-green-600 to-emerald-500 shadow-lg active:scale-95 transition-transform duration-100 mb-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          近くのお店を探す
        </a>

        {/* SNS share */}
        <div className="mb-4">
          <p className="text-center text-xs text-stone-400 mb-2">結果をシェアする</p>
          <div className="flex gap-3">
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm text-white bg-black active:scale-95 transition-transform duration-100"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              X でシェア
            </a>
            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm text-white active:scale-95 transition-transform duration-100"
              style={{ backgroundColor: '#06C755' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.630 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.630 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
              LINE でシェア
            </a>
          </div>
          <p className="text-center text-xs text-stone-400 mt-2">
            📸 結果をスクショしてインスタのストーリーズでシェアしよう！
          </p>
        </div>

        {/* Alternative view buttons */}
        <div className="flex flex-col gap-2 mb-4">
          <p className="text-center text-xs text-stone-400">他の結果を見る</p>
          {view !== 'opposite' && (
            <button
              onClick={() => setView('opposite')}
              className="w-full py-3 px-4 rounded-2xl font-bold text-sm text-stone-600 bg-stone-100 border border-stone-200 active:scale-95 transition-transform duration-100"
            >
              🔄 正反対の結果を見る（{oppositeGenre.name}）
            </button>
          )}
          {view !== 'secondary' && (
            <button
              onClick={() => setView('secondary')}
              className="w-full py-3 px-4 rounded-2xl font-bold text-sm text-stone-600 bg-stone-100 border border-stone-200 active:scale-95 transition-transform duration-100"
            >
              🥈 2位の結果を見る（{secondGenre.name}）
            </button>
          )}
        </div>

        {/* Restart button */}
        <button onClick={onRestart} className="btn-secondary">
          もう一度診断する
        </button>
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
