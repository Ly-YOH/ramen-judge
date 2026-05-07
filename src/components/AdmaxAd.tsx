'use client'
import { useEffect, useRef } from 'react'

const ADMAX_ID = '45f785f2c648050ded30ac3f29866b46'

export const AdmaxAd = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // 公式非同期タグと同一の順序で DOM を構築
    // 1. admax-ads div（最初）
    const adDiv = document.createElement('div')
    adDiv.className = 'admax-ads'
    adDiv.setAttribute('data-admax-id', ADMAX_ID)
    adDiv.style.display = 'inline-block'
    ref.current.appendChild(adDiv)

    // 2. queue push（公式と同じ構文）
    const initScript = document.createElement('script')
    initScript.type = 'text/javascript'
    initScript.text = `(admaxads = window.admaxads || []).push({admax_id: "${ADMAX_ID}", type: "banner"});`
    ref.current.appendChild(initScript)

    // 3. t.js async（最後）
    const loadScript = document.createElement('script')
    loadScript.type = 'text/javascript'
    loadScript.charset = 'utf-8'
    loadScript.src = 'https://adm.shinobi.jp/st/t.js'
    loadScript.async = true
    ref.current.appendChild(loadScript)

    return () => {
      ref.current?.replaceChildren()
    }
  }, [])

  return <div ref={ref} style={{ width: '100%', textAlign: 'center' }} />
}
