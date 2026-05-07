'use client'
import { useEffect, useRef } from 'react'

const ADMAX_ID = '45f785f2c648050ded30ac3f29866b46'

export const AdmaxAd = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // 静的埋め込みコードと全く同じ構造を useEffect 内で再現する
    // 順序: initScript → adDiv → loadScript（AdMaxのHTML埋め込みと同一順序）

    // 1. admaxads キュー初期化スクリプト（同期実行）
    const initScript = document.createElement('script')
    initScript.text = `var admaxads = window.admaxads || []; admaxads.push({admax_id: "${ADMAX_ID}", type: "banner"});`
    ref.current.appendChild(initScript)

    // 2. 広告表示先 div
    const adDiv = document.createElement('div')
    adDiv.className = 'admax-ads'
    adDiv.setAttribute('data-admax-id', ADMAX_ID)
    adDiv.style.display = 'inline-block'
    ref.current.appendChild(adDiv)

    // 3. t.js 読み込みスクリプト（adDiv の直後に配置）
    const loadScript = document.createElement('script')
    loadScript.async = true
    loadScript.charset = 'utf-8'
    loadScript.src = 'https://adm.shinobi.jp/st/t.js'
    ref.current.appendChild(loadScript)

    return () => {
      ref.current?.replaceChildren()
    }
  }, [])

  return <div ref={ref} style={{ width: '100%', textAlign: 'center' }} />
}
