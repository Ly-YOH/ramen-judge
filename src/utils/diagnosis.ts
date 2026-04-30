import { Answers, Genre, DiagnoseResult } from '../types'
import { genres } from '../data/genres'

// ジャンルの汁なし分類
const NOODLE_ONLY = new Set(['abura-soba', 'taiwan-maze'])
const TSUKEMEN = new Set(['tsukemen', 'tsukemen-light'])

function resolveGenreId(answers: Answers): string {
  const texture = answers['texture'] as string
  const richness = answers['richness'] as string
  const base = answers['base'] as string
  const noodle = answers['noodle'] as string

  // ── こってり + 動物系 ──────────────────────────────────────────────────────
  if (texture === 'こってり' && base === '動物系') {
    if (noodle === '太麺') {
      return richness === 'ふつう' || richness === 'うすめ' ? 'miso' : 'ie-jiro'
    }
    if (noodle === '細麺') return 'hakata'
    if (noodle === '中太麺') {
      return richness === '濃いめ' ? 'tonkotsu-shoyu' : 'tori-paitan'
    }
    return 'ie-jiro'
  }

  // ── こってり + ダブルスープ ───────────────────────────────────────────────
  if (texture === 'こってり' && base === 'ダブルスープ') {
    if (noodle === '太麺') return 'taiwan-maze'
    if (noodle === '中太麺') return 'tsukemen'
    if (noodle === '細麺') return 'tantanmen'
    return 'tsukemen'
  }

  // ── こってり + 魚介系 ──────────────────────────────────────────────────────
  if (texture === 'こってり' && base === '魚介系') return 'fish-tonkotsu'

  // ── あっさり + 魚介系 ──────────────────────────────────────────────────────
  if (texture === 'あっさり' && base === '魚介系') {
    if (noodle === '太麺') return 'tsukemen-light'
    return 'tanrei'
  }

  // ── あっさり + 動物系 ──────────────────────────────────────────────────────
  if (texture === 'あっさり' && base === '動物系') return 'tori-shio'

  // ── あっさり + ダブルスープ ───────────────────────────────────────────────
  if (texture === 'あっさり' && base === 'ダブルスープ') {
    if (noodle === '太麺') return 'tsukemen-light'
    if (noodle === '中太麺') return 'tanrei'
    return 'tsukemen-light'
  }

  // ── すっきり + 魚介系 ──────────────────────────────────────────────────────
  if (texture === 'すっきり' && base === '魚介系') {
    if (noodle === '細麺') return 'niboshi'
    return 'shio-ago'
  }

  // ── すっきり + 動物系 ──────────────────────────────────────────────────────
  if (texture === 'すっきり' && base === '動物系') {
    if (noodle === '細麺') return 'tori-shio'
    return 'shoyu'
  }

  // ── すっきり + ダブルスープ ───────────────────────────────────────────────
  if (texture === 'すっきり' && base === 'ダブルスープ') {
    if (noodle === '細麺') return 'shio-ago'
    if (noodle === '中太麺') return 'shoyu'
    return 'tsukemen-light'
  }

  return 'creative'
}

/**
 * 汁気の有無（soup）に応じてジャンルを調整する。
 * 汁あり → 汁なし・つけ麺系を有汁ジャンルへ振り替え
 * 汁なし → 有汁ジャンルをまぜそば・汁なし系へ振り替え
 */
function applySoupPreference(id: string, answers: Answers, dislikes: string[]): string {
  const soup = answers['soup'] as string
  if (!soup || soup === 'こだわらない') return id

  if (soup === '汁あり') {
    // 汁なし系（油そば・まぜそば）を除外
    if (NOODLE_ONLY.has(id)) {
      const texture = answers['texture'] as string
      // こってり系の文脈 → 濃厚魚介豚骨、それ以外 → 淡麗系
      return texture === 'こってり' ? 'fish-tonkotsu' : 'tanrei'
    }
    // つけ麺系を除外
    if (id === 'tsukemen') return 'fish-tonkotsu'
    if (id === 'tsukemen-light') return 'tanrei'
  }

  if (soup === '汁なし') {
    // 既に汁なし・つけ麺系なら変更なし
    if (NOODLE_ONLY.has(id) || TSUKEMEN.has(id)) return id
    // 有汁ジャンル → 太麺なら台湾まぜそば、それ以外は油そば
    // （辛いもの苦手の場合は後段の applyDislikeOverrides が台湾→油そばへ振り替える）
    const noodle = answers['noodle'] as string
    const isSpicy = dislikes.includes('辛いもの')
    if (noodle === '太麺' && !isSpicy) return 'taiwan-maze'
    return 'abura-soba'
  }

  return id
}

/** ジャンルIDを苦手選択に応じてリダイレクト */
function applyDislikeOverrides(id: string, dislikes: string[]): string {
  const isSpicy = dislikes.includes('辛いもの')
  const isAnimalSmell = dislikes.includes('獣臭')
  const isBackFat = dislikes.includes('背脂')

  if (isSpicy) {
    if (id === 'tantanmen') id = 'tsukemen'
    if (id === 'taiwan-maze') id = 'abura-soba'
  }

  if (isAnimalSmell) {
    if (id === 'hakata') id = 'tori-paitan'
    if (id === 'ie-jiro') id = 'miso'
    if (id === 'tonkotsu-shoyu') id = 'tori-paitan'
    if (id === 'fish-tonkotsu') id = 'tanrei'
  }

  if (isBackFat) {
    if (id === 'ie-jiro') id = 'fish-tonkotsu'
    if (id === 'tonkotsu-shoyu') id = 'tori-paitan'
  }

  // 二次チェック：背脂override後の fish-tonkotsu に獣臭嫌いが重なる場合
  if (isAnimalSmell && id === 'fish-tonkotsu') id = 'tanrei'

  return id
}

/** リダイレクト発生時の説明文を生成 */
function buildRedirectNote(
  original: string,
  afterSoup: string,
  final: string,
  answers: Answers,
  dislikes: string[]
): string | null {
  if (original === final) return null

  const name = (id: string) => genres[id]?.name ?? id
  const soup = answers['soup'] as string

  // ① 汁なし希望で台湾まぜそばになったが、辛いもの苦手で油そばに変更
  if (soup === '汁なし' && afterSoup === 'taiwan-maze' && final === 'abura-soba') {
    return `汁なしご希望＋辛いものが苦手とのことで、「油そば」をご提案します。醤油・塩ベースのまぜそば系のお店もあわせてお探しください。`
  }

  // ② 汁なし希望によるリダイレクト
  if (soup === '汁なし' && original !== afterSoup) {
    return `汁なしご希望のため、「${name(final)}」をご提案します。`
  }

  // ③ 汁あり希望で汁なし・つけ麺系を回避
  if (soup === '汁あり' && (NOODLE_ONLY.has(original) || TSUKEMEN.has(original))) {
    return `汁ありご希望のため、${name(original)}の代わりに「${name(final)}」をご提案します。`
  }

  // ④ 辛いもの嫌いによるリダイレクト（soup関係なし）
  if (dislikes.includes('辛いもの')) {
    if (original === 'taiwan-maze' || afterSoup === 'taiwan-maze')
      return `辛いものが苦手とのことで、台湾まぜそばの代わりに「${name(final)}」をご提案します。醤油・塩ベースのまぜそばもあわせてお探しください。`
    if (original === 'tantanmen' || afterSoup === 'tantanmen')
      return `辛いものが苦手とのことで、担々麺の代わりに「${name(final)}」をご提案します。`
  }

  // ⑤ 獣臭・背脂によるリダイレクト
  if (dislikes.includes('獣臭')) {
    const odorSources = ['hakata', 'ie-jiro', 'tonkotsu-shoyu', 'fish-tonkotsu']
    if (odorSources.includes(original))
      return `豚骨の匂いが苦手とのことで、${name(original)}を避けて「${name(final)}」をご提案します。匂いが少なくまろやかな一杯です。`
  }
  if (dislikes.includes('背脂')) {
    if (original === 'ie-jiro' || original === 'tonkotsu-shoyu')
      return `背脂が苦手とのことで、${name(original)}を避けて「${name(final)}」をご提案します。同じ満足感でよりすっきりいただけます。`
  }

  return null
}

export function diagnose(answers: Answers): DiagnoseResult {
  const baseId = resolveGenreId(answers)
  const dislikes = getDislikes(answers)

  // 汁気の有無 → 苦手項目 の順に適用
  const afterSoupId = applySoupPreference(baseId, answers, dislikes)
  const finalId = applyDislikeOverrides(afterSoupId, dislikes)

  return {
    genre: genres[finalId] as Genre,
    redirectNote: buildRedirectNote(baseId, afterSoupId, finalId, answers, dislikes),
  }
}

/** Returns disliked items from the final 'dislikes' question, excluding '特になし' */
export function getDislikes(answers: Answers): string[] {
  const raw = answers['dislikes']
  if (!raw) return []
  const items = Array.isArray(raw) ? raw : [raw]
  return items.filter((v) => v !== '特になし')
}
