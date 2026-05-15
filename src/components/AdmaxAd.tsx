'use client'
import { useEffect, useRef } from 'react'

const AD_ELEMENT_ID = 'im-1ac3108164884d2fae4fd925e683282a'

export const AdmaxAd = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // async スクリプト（広告ライブラリ読み込み）
    const loadScript = document.createElement('script')
    loadScript.async = true
    loadScript.src = 'https://imp-adedge.i-mobile.co.jp/script/v1/spot.js?20220104'
    ref.current.appendChild(loadScript)

    // queue push（広告枠の設定）
    const initScript = document.createElement('script')
    initScript.text = `(window.adsbyimobile=window.adsbyimobile||[]).push({pid:84912,mid:592834,asid:1931486,type:"banner",display:"inline",elementid:"${AD_ELEMENT_ID}"})`
    ref.current.appendChild(initScript)

    return () => {
      ref.current?.replaceChildren()
    }
  }, [])

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <div ref={ref} id={AD_ELEMENT_ID} />
    </div>
  )
}
