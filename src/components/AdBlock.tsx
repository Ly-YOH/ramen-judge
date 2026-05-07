'use client'

export default function AdBlock() {
  return (
    <iframe
      src="/admax.html"
      scrolling="no"
      title="広告"
      style={{ border: 'none', width: '100%', minHeight: '100px', display: 'block' }}
    />
  )
}
