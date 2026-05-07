'use client'

const ADMAX_ID = '45f785f2c648050ded30ac3f29866b46'

// 同期タグ（/s/ エンドポイント）を iframe 内で実行する
// document.write() を使う同期スクリプトは React 内では直接動かないため iframe で包む
export const AdmaxAd = () => {
  const srcDoc = `<html><body style="margin:0;padding:0;overflow:hidden;"><script src="https://adm.shinobi.jp/s/${ADMAX_ID}"><\/script></body></html>`

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <iframe
        srcDoc={srcDoc}
        scrolling="no"
        style={{ border: 'none', display: 'block', width: '320px', height: '100px', margin: '0 auto' }}
      />
    </div>
  )
}
