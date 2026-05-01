import { useEffect } from 'react'
import { Genre } from '../types'
import AdBlock from './AdBlock'
import Footer from './Footer'

interface Props {
  genre: Genre
  dislikes: string[]
  redirectNote: string | null
  onRestart: () => void
}

export default function ResultScreen({ genre, dislikes, redirectNote, onRestart }: Props) {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  // -貝 をマップ検索ワードに付与
  const mapKeyword = dislikes.includes('貝')
    ? `${genre.mapKeyword} -貝`
    : genre.mapKeyword
  // ジャンル名に「ラーメン」が含まれる場合は重複して付加しない
  const searchQuery = mapKeyword.includes('ラーメン') ? mapKeyword : `${mapKeyword}ラーメン`
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(searchQuery)}`

  const hasDisliked = dislikes.length > 0

  return (
    <div className="flex flex-col min-h-screen px-5 py-10">
      <div className="flex-1">
        {/* Top label */}
        <p className="text-center text-ramen-orange font-bold text-sm tracking-widest uppercase mb-3">
          診断結果
        </p>

        {/* Genre name + 結果画像 */}
        <div className="flex items-end justify-start mb-6 gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-3xl font-black text-ramen-dark mb-1 leading-tight">
              {genre.name}
            </h2>
            <p className="text-ramen-orange font-semibold text-base">
              があなたにぴったり！
            </p>
          </div>
          <img
            src="/images/ramen-result.png"
            alt="ラーメン"
            className="w-28 flex-shrink-0"
          />
        </div>

        {/* Redirect notice */}
        {redirectNote && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-4 flex gap-3">
            <span className="text-xl flex-shrink-0">🔄</span>
            <p className="text-blue-800 text-sm leading-relaxed">{redirectNote}</p>
          </div>
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
          className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-green-600 to-emerald-500 shadow-lg active:scale-95 transition-transform duration-100 mb-4"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          近くのお店を探す
        </a>

        {/* Restart button */}
        <button onClick={onRestart} className="btn-secondary">
          もう一度診断する
        </button>
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
