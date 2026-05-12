import { Answers, Genre, DiagnoseResult } from '../types'
import { genres } from '../data/genres'
import { scoreProfiles } from '../data/scores'

/** 回答から苦手リストを取得 */
export function getDislikes(answers: Answers): string[] {
  const raw = answers['dislikes']
  if (!raw) return []
  const items = Array.isArray(raw) ? raw : [raw]
  return items.filter((v) => v !== '特になし')
}

/**
 * 全ジャンルをスコアリングして順位付きで返す。
 * 苦手項目のペナルティも含む。
 */
function calcScores(answers: Answers, dislikes: string[]): { id: string; score: number }[] {
  return Object.keys(scoreProfiles).map((id) => {
    const p = scoreProfiles[id]
    let score = 0

    // 各軸のスコアを加算
    score += p.texture[answers['texture'] as string]  ?? 0
    score += p.base[answers['base'] as string]        ?? 0
    score += p.noodle[answers['noodle'] as string]    ?? 0
    score += p.richness[answers['richness'] as string] ?? 0
    score += p.soup[answers['soup'] as string]        ?? 0

    // 苦手ペナルティ
    for (const item of dislikes) {
      score += p.dislikes[item] ?? 0
    }

    return { id, score }
  }).sort((a, b) => b.score - a.score)
}

/** リダイレクト発生時の説明文を生成 */
function buildRedirectNote(
  originalId: string,
  finalId: string,
  answers: Answers,
  dislikes: string[]
): string | null {
  if (originalId === finalId) return null

  const name = (id: string) => genres[id]?.name ?? id
  const soup = answers['soup'] as string

  if (soup === '汁なし' && (originalId === 'tantanmen' || dislikes.includes('辛いもの'))) {
    return `汁なしご希望＋辛いものが苦手とのことで、「${name(finalId)}」をご提案します。`
  }
  if (soup === '汁なし') {
    return `汁なしご希望のため、「${name(finalId)}」をご提案します。`
  }
  if (soup === '汁あり') {
    return `汁ありご希望のため、${name(originalId)}の代わりに「${name(finalId)}」をご提案します。`
  }
  if (dislikes.includes('煮干し') && originalId === 'niboshi') {
    return `煮干しが苦手とのことで、「${name(finalId)}」をご提案します。`
  }
  if (dislikes.includes('辛いもの') && originalId === 'tantanmen') {
    return `辛いものが苦手とのことで、担々麺の代わりに「${name(finalId)}」をご提案します。`
  }
  if (dislikes.includes('辛いもの') && originalId === 'taiwan-maze') {
    return `辛いものが苦手とのことで、台湾まぜそばの代わりに「${name(finalId)}」をご提案します。`
  }
  if (dislikes.includes('獣臭')) {
    return `豚骨の匂いが苦手とのことで、${name(originalId)}を避けて「${name(finalId)}」をご提案します。`
  }
  if (dislikes.includes('背脂')) {
    return `背脂が苦手とのことで、${name(originalId)}を避けて「${name(finalId)}」をご提案します。`
  }

  return null
}

export function diagnose(answers: Answers): DiagnoseResult {
  const dislikes = getDislikes(answers)
  const ranked = calcScores(answers, dislikes)

  // 1位（苦手ペナルティ込みの最高スコア）
  const topId = ranked[0].id
  const genre = genres[topId] as Genre

  // 2位（1位と異なるジャンル）
  const secondId = ranked[1].id
  const secondGenre = genres[secondId] as Genre

  // 正反対（最下位スコア）
  const oppositeId = ranked[ranked.length - 1].id
  const oppositeGenre = genres[oppositeId] as Genre

  // リダイレクトノート（スコアリングでは1位が自然に変わるので稀だが一応対応）
  const redirectNote = buildRedirectNote(ranked[0].id, topId, answers, dislikes)

  return { genre, secondGenre, oppositeGenre, redirectNote }
}
