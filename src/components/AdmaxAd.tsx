'use client'

// 同期タグを /public/admax-frame.html 経由で読み込む
// srcDoc だとドメインが null になり AdMax のドメイン判定が失敗するため、同一ドメインのファイルを使う
export const AdmaxAd = () => {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <iframe
        src="/admax-frame.html"
        scrolling="no"
        style={{ border: 'none', display: 'block', width: '320px', height: '100px', margin: '0 auto' }}
      />
    </div>
  )
}
