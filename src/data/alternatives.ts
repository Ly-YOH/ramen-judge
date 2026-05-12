/**
 * 各ジャンルの「正反対」「2位（別路線）」マッピング
 *
 * opposite  : こってり ↔ あっさり、汁あり ↔ 汁なし など軸を完全に反転
 * secondary : 同じ方向性だが別の個性を持つ隣接ジャンル
 */
export const alternatives: Record<string, { opposite: string; secondary: string }> = {
  // ── 動物系・こってり ──
  'ie-jiro':        { opposite: 'shio-ago',       secondary: 'hakata' },
  'tonkotsu-shoyu': { opposite: 'tori-shio',      secondary: 'hakata' },
  hakata:           { opposite: 'shoyu',           secondary: 'tonkotsu-shoyu' },
  miso:             { opposite: 'shio-ago',        secondary: 'tori-paitan' },
  'tori-paitan':    { opposite: 'niboshi',         secondary: 'miso' },

  // ── ダブルスープ・こってり ──
  tsukemen:         { opposite: 'tanrei',          secondary: 'fish-tonkotsu' },
  tantanmen:        { opposite: 'tori-shio',       secondary: 'tsukemen' },
  'taiwan-maze':    { opposite: 'tanrei',          secondary: 'abura-soba' },

  // ── 汁なし ──
  'abura-soba':     { opposite: 'tori-shio',      secondary: 'taiwan-maze' },

  // ── 魚介系 ──
  'fish-tonkotsu':  { opposite: 'tori-shio',      secondary: 'tsukemen' },
  niboshi:          { opposite: 'tori-paitan',    secondary: 'tanrei' },
  tanrei:           { opposite: 'ie-jiro',        secondary: 'niboshi' },
  'tsukemen-light': { opposite: 'tsukemen',       secondary: 'tanrei' },

  // ── あっさり・すっきり動物系 ──
  'tori-shio':      { opposite: 'ie-jiro',        secondary: 'shoyu' },
  shoyu:            { opposite: 'hakata',         secondary: 'shio-ago' },
  'shio-ago':       { opposite: 'ie-jiro',        secondary: 'tori-shio' },

  // ── フォールバック ──
  creative:         { opposite: 'shoyu',          secondary: 'tori-paitan' },
}
