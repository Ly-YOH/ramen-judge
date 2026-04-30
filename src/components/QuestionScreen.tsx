import { useState, useEffect } from 'react'
import { Question, Answers } from '../types'
import ProgressBar from './ProgressBar'

interface Props {
  question: Question
  questionIndex: number
  totalQuestions: number
  answers: Answers
  onAnswer: (questionId: string, value: string | string[]) => void
  onNext: () => void
  onBack: () => void
}

export default function QuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  answers,
  onAnswer,
  onNext,
  onBack,
}: Props) {
  const current = answers[question.id]
  const isMultiple = question.type === 'multiple'

  const selectedValues: string[] = isMultiple
    ? Array.isArray(current) ? current : []
    : typeof current === 'string' ? [current] : []

  const isSelected = (value: string) => selectedValues.includes(value)
  const hasAnswer = selectedValues.length > 0

  // Auto-advance guard for single-select
  const [advancing, setAdvancing] = useState(false)

  useEffect(() => {
    setAdvancing(false)
  }, [question.id])

  // ── 選択ハンドラ ────────────────────────────────────────────
  function handleSingleSelect(value: string) {
    if (advancing) return
    onAnswer(question.id, value)
    setAdvancing(true)
    setTimeout(() => onNext(), 200)
  }

  function handleMultiSelect(value: string) {
    if (value === '特になし' || value === 'なし') {
      onAnswer(question.id, isSelected(value) ? [] : [value])
      return
    }
    const withoutExclusive = selectedValues.filter((v) => v !== '特になし' && v !== 'なし')
    onAnswer(
      question.id,
      isSelected(value)
        ? withoutExclusive.filter((v) => v !== value)
        : [...withoutExclusive, value]
    )
  }

  function handleSelect(value: string) {
    isMultiple ? handleMultiSelect(value) : handleSingleSelect(value)
  }

  const isLastQuestion = questionIndex + 1 === totalQuestions

  return (
    <div className="flex flex-col min-h-screen px-5 py-8">
      {/* プログレスバーのみ（戻るリンクなし） */}
      <div className="mb-6">
        <ProgressBar current={questionIndex + 1} total={totalQuestions} />
      </div>

      {/* 質問コンテンツ */}
      <div className="flex-1">
        <div className="mb-1">
          {isMultiple ? (
            <span className="text-xs font-medium text-ramen-orange bg-orange-50 border border-orange-200 rounded-full px-2.5 py-0.5">
              複数選択OK
            </span>
          ) : (
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
              タップで次へ
            </span>
          )}
        </div>

        <h2 className="text-xl font-bold text-ramen-dark mt-3 mb-6 leading-snug">
          {question.text}
        </h2>

        <div className="flex flex-col gap-3">
          {question.options.map((opt) => {
            const selected = isSelected(opt.value)
            return (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                disabled={advancing}
                className={`option-card ${selected ? 'option-card-selected' : ''} ${
                  advancing && selected ? 'scale-95 opacity-90' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Single → 丸ラジオ / Multiple → 角チェック */}
                  <span
                    className={`flex-shrink-0 w-5 h-5 border-2 flex items-center justify-center transition-colors
                      ${isMultiple ? 'rounded-md' : 'rounded-full'}
                      ${selected ? 'border-ramen-orange bg-ramen-orange' : 'border-stone-300'}`}
                  >
                    {selected && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </span>
                  <span className="text-left leading-snug">{opt.label}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── フッターボタン群 ─────────────────────────────────── */}
      <div className="mt-8 flex flex-col gap-3">
        {/* 複数選択のみ：決定ボタン（上段・目立つ） */}
        {isMultiple && (
          <button
            onClick={onNext}
            disabled={!hasAnswer}
            className="btn-primary"
          >
            {isLastQuestion ? '結果を見る 🍜' : '選択完了 →'}
          </button>
        )}

        {/* 戻るボタン（下段・控えめ、全問共通） */}
        <button
          onClick={onBack}
          className="w-full py-3 px-6 rounded-2xl text-sm font-medium text-stone-500
                     border border-stone-200 bg-white
                     active:scale-95 transition-transform duration-100"
        >
          ← 戻る
        </button>
      </div>
    </div>
  )
}
