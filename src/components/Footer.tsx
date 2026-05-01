import { useState } from 'react'
import PrivacyModal from './PrivacyModal'

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false)

  return (
    <>
      <footer className="mt-4 pb-8 px-5 text-center">
        <div className="flex justify-center items-center gap-4 mb-2">
          <a
            href="https://fpde-rouhi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-stone-500 underline underline-offset-2"
          >
            運営者ブログ
          </a>
          <span className="text-stone-300 text-xs">|</span>
          <button
            onClick={() => setShowPrivacy(true)}
            className="text-xs text-stone-500 underline underline-offset-2"
          >
            プライバシーポリシー
          </button>
        </div>
        <p className="text-xs text-stone-400">© 2025 FPだけど浪費家です</p>
      </footer>

      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
    </>
  )
}
