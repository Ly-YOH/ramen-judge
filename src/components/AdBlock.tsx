import { useEffect, useRef } from 'react'

/** 忍者AdMax 広告ブロック */
export default function AdBlock() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.innerHTML = ''
    const script = document.createElement('script')
    script.src = 'https://adm.shinobi.jp/s/45f785f2c648050ded30ac3f29866b46'
    script.async = true
    container.appendChild(script)
    return () => {
      if (container) container.innerHTML = ''
    }
  }, [])

  return (
    /* admax */
    <div
      ref={containerRef}
      className="w-full min-h-[100px] flex items-center justify-center"
      aria-label="広告"
    />
    /* admax */
  )
}
