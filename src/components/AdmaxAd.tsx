'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

export const AdmaxAd = () => {
  const adMaxId = '45f785f2c648050ded30ac3f29866b46'
  const pathname = usePathname()

  React.useEffect(() => {
    // admaxadsキューに追加
    ;(window as any).admaxads = (window as any).admaxads || []
    ;(window as any).admaxads.push({
      admax_id: adMaxId,
      type: 'banner'
    })

    // scriptタグを動的に追加
    const tag = document.createElement('script')
    tag.src = 'https://adm.shinobi.jp/st/t.js'
    tag.async = true
    tag.charset = 'utf-8'
    document.body.appendChild(tag)
  }, [pathname])

  return (
    <div
      className="admax-ads"
      data-admax-id={adMaxId}
      style={{ display: 'inline-block' }}
    />
  )
}
