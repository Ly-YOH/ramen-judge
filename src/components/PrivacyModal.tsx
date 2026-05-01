interface Props {
  onClose: () => void
}

export default function PrivacyModal({ onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="プライバシーポリシー"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h2 className="text-base font-bold text-ramen-dark">プライバシーポリシー</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-stone-400 hover:bg-stone-100 active:scale-95 transition-transform"
            aria-label="閉じる"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-5 text-sm text-stone-700 leading-relaxed space-y-5">
          <section>
            <h3 className="font-bold text-ramen-dark mb-1">1. Cookieの利用について</h3>
            <p>
              当サイトは、ユーザーの利便性向上および広告配信の最適化を目的として、Cookie（クッキー）を使用しています。Cookieとは、ウェブサイトがブラウザに保存する小さなテキストデータです。ブラウザの設定でCookieを無効にすることも可能ですが、一部機能が正常に動作しない場合があります。
            </p>
          </section>

          <section>
            <h3 className="font-bold text-ramen-dark mb-1">2. 広告配信について</h3>
            <p>
              当サイトは、忍者AdMaxをはじめとする第三者配信事業者の広告サービスを利用しています。これらの事業者はCookieを使用し、ユーザーの当サイトや他サイトへのアクセス情報に基づいた広告を表示することがあります。第三者による広告配信やCookieの利用については、各事業者のプライバシーポリシーをご参照ください。なお、ユーザーはGoogle広告設定ページ等にアクセスすることで、パーソナライズ広告を無効にすることができます。
            </p>
          </section>

          <section>
            <h3 className="font-bold text-ramen-dark mb-1">3. アクセス解析について</h3>
            <p>
              当サイトでは、サービス改善を目的としてアクセス解析ツールを使用する場合があります。収集されるデータは匿名であり、個人を特定するものではありません。
            </p>
          </section>

          <section>
            <h3 className="font-bold text-ramen-dark mb-1">4. 免責事項</h3>
            <p>
              当アプリの診断結果はアルゴリズムによる自動判定であり、特定の店舗・商品を推薦・保証するものではありません。診断結果の利用によって生じたいかなる損害・トラブルについても、運営者は一切の責任を負いません。最終的なお店選びはご自身の判断でお願いします。
            </p>
          </section>

          <section>
            <h3 className="font-bold text-ramen-dark mb-1">5. プライバシーポリシーの変更</h3>
            <p>
              本ポリシーは、法令の改正や運営上の必要に応じて予告なく変更する場合があります。変更後の内容は当サイトに掲載した時点で効力を生じるものとします。
            </p>
          </section>

          <p className="text-xs text-stone-400 pt-2">運営：FPだけど浪費家です　/ お問い合わせは運営ブログよりお願いします。</p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-100">
          <button onClick={onClose} className="btn-primary py-3 text-base">
            閉じる
          </button>
        </div>
      </div>
    </div>
  )
}
