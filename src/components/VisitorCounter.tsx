import { useEffect, useState } from 'react'

const STORAGE_KEY = 'sidor-home-visits'

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    const n = raw ? parseInt(raw, 10) : 0
    const next = n + 1
    localStorage.setItem(STORAGE_KEY, String(next))
    setCount(next)
  }, [])

  return (
    <span className="font-mono text-xs text-zinc-500 tabular-nums">
      你是第 {count === null ? '···' : String(count).padStart(6, '0')} 位访客
    </span>
  )
}
