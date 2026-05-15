import { Question } from '../types'

export const questions: Question[] = [
  {
    id: 'soup',
    text: '汁あり・汁なし、どちらで食べたいですか？',
    type: 'single',
    options: [
      { value: '汁あり', label: '汁あり　— スープをしっかり味わいたい' },
      { value: '汁なし', label: '汁なし　— まぜそば・つけ麺も可' },
      { value: 'こだわらない', label: 'こだわらない' },
    ],
  },
  {
    id: 'texture',
    text: 'スープの質感はどれが好みですか？',
    type: 'single',
    options: [
      { value: 'あっさり', label: 'あっさり　— 軽くて飲みやすい' },
      { value: 'こってり', label: 'こってり　— 濃厚でパンチがある' },
      { value: 'すっきり', label: 'すっきり　— さっぱりして後味が爽やか' },
    ],
  },
  {
    id: 'richness',
    text: '味の濃さはどのくらいが好きですか？',
    type: 'single',
    options: [
      { value: '濃いめ', label: '濃いめ　— しっかり濃い' },
      { value: 'ふつう', label: 'ふつう　— バランスよく' },
      { value: 'うすめ', label: 'うすめ　— 素材の味を楽しみたい' },
    ],
  },
  {
    id: 'spice',
    text: '辛さの好みは？',
    type: 'single',
    options: [
      { value: '苦手', label: '辛いものは苦手' },
      { value: 'どちらでもいい', label: 'どちらでもいい' },
      { value: '食べたい', label: '辛いものを食べたい！' },
    ],
  },
  {
    id: 'base',
    text: 'スープのベースは何が好みですか？',
    type: 'single',
    options: [
      { value: '動物系', label: '動物系　— 豚骨・鶏など' },
      { value: '魚介系', label: '魚介系　— 節・煮干し・貝など' },
      { value: 'ダブルスープ', label: 'ダブルスープ　— 動物系＋魚介系のミックス' },
    ],
  },
  {
    id: 'noodle',
    text: '麺の太さの好みは？',
    type: 'single',
    options: [
      { value: '細麺', label: '細麺　— スープとよく絡む' },
      { value: '中太麺', label: '中太麺　— バランス重視' },
      { value: '太麺', label: '太麺　— 食べ応えが好き' },
      { value: 'こだわらない', label: 'こだわらない' },
    ],
  },
  {
    id: 'noodle_type',
    text: '麺のタイプはどちらが好みですか？',
    type: 'single',
    options: [
      { value: 'ちぢれ', label: 'ちぢれ麺　— スープがよく絡む' },
      { value: 'ストレート', label: 'ストレート麺　— スープの味をダイレクトに楽しむ' },
      { value: 'こだわらない', label: 'こだわらない' },
    ],
  },
  {
    id: 'chashu',
    text: 'チャーシューはどのタイプが好きですか？',
    type: 'single',
    options: [
      { value: 'なしが好き', label: 'なし派　— チャーシューがないジャンルが好き' },
      { value: 'バラ肉', label: 'バラ肉（とろとろ系）' },
      { value: 'ロース', label: 'ロース（しっかり系）' },
      { value: 'レア系', label: 'レア系　— ピンク色でしっとり' },
      { value: 'こだわらない', label: 'こだわらない' },
    ],
  },
  {
    id: 'toppings',
    text: '追加したいトッピングは？（複数選択可）',
    type: 'multiple',
    options: [
      { value: '煮卵', label: '煮卵' },
      { value: '海苔', label: '海苔' },
      { value: 'メンマ', label: 'メンマ' },
      { value: 'ネギ', label: 'ネギ' },
      { value: 'なし', label: 'なし' },
    ],
  },
  {
    id: 'dislikes',
    text: 'これだけは避けたい！（複数選択可）',
    type: 'multiple',
    options: [
      { value: '貝', label: '貝出汁　— 独特のクセが苦手' },
      { value: '獣臭', label: '豚骨特有の匂い（獣臭）　— ワイルドすぎる匂いが苦手' },
      { value: '背脂', label: '背脂の塊　— 脂っこすぎるのが苦手' },
      { value: '煮干し', label: '煮干し　— いりこ系の風味が苦手' },
      { value: 'パクチー', label: 'パクチー' },
      { value: '特になし', label: '特になし' },
    ],
  },
]
