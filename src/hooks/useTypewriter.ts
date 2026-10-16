import { useEffect, useState } from 'react'

/**
 * 打字机效果：依次输出 lines 中的每一行，每行打完停顿一下再继续。
 * 全部打完后触发 onDone（可选）。
 */
export function useTypewriter(
  lines: string[],
  speed = 70,
  linePause = 500,
  start = true,
) {
  const [text, setText] = useState<string[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!start) return
    let line = 0
    let char = 0
    const output: string[] = []
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      if (line >= lines.length) {
        setDone(true)
        return
      }
      const current = lines[line]
      char += 1
      output[line] = current.slice(0, char)
      setText([...output])
      if (char >= current.length) {
        line += 1
        char = 0
        timer = setTimeout(tick, linePause)
      } else {
        timer = setTimeout(tick, speed)
      }
    }
    timer = setTimeout(tick, 300)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start])

  return { text, done }
}
