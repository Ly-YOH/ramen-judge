'use client'
import { useEffect } from 'react'

const ADMAX_ID = '45f785f2c648050ded30ac3f29866b46'

export const AdmaxAd = () => {
  useEffect(() => {
    // 既存のt.jsを削除してキャッシュを回避（再実行させる）
    document.querySelectorAll('script[data-admax]').forEach(s => s.remove())

    // キューをリセットして再登録
    ;(window as any).admaxads = []
    ;(window as any).admaxads.push({ admax_id: ADMAX_ID, type: 'banner' })

    // t.jsを毎回新しいタグとして追加（キャッシュバスト付き）
    const script = document.createElement('script')
    script.setAttribute('data-admax', '1')
    script.src = `https://adm.shinobi.jp/st/t.js?_=${Date.now()}`
    script.async = true
    script.charset = 'utf-8'
    document.body.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return (
    <div style={{ width: '100%', textAlign: 'center', minHeight: '50px' }}>
      <div
        className="admax-ads"
        data-admax-id={ADMAX_ID}
        style={{ display: 'inline-block' }}
      />
    </div>
  )
}
