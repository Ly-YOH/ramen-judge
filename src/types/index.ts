export type Screen = 'start' | 'question' | 'result'

export type QuestionType = 'single' | 'multiple'

export interface Option {
  value: string
  label: string
}

export interface Question {
  id: string
  text: string
  type: QuestionType
  options: Option[]
  /** When defined, question is shown only if this returns true */
  condition?: (answers: Answers) => boolean
}

export type Answers = Record<string, string | string[]>

export interface DiagnoseResult {
  genre: Genre
  /** Shown when dislikes caused a genre redirect */
  redirectNote: string | null
}

export interface Genre {
  id: string
  name: string
  description: string
  mapKeyword: string
  /** ~30 chars: 味の特徴＋おすすめ味変 */
  flavorNote: string
  /** Optional extra context shown below description */
  followUpNote?: string
}
