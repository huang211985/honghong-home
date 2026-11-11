import { useEffect, useState } from 'react'
import { Moon, Sun, Terminal as TerminalIcon, ChevronDown } from 'lucide-react'
import Terminal from '@/components/Terminal'
import VisitorCounter from '@/components/VisitorCounter'
import { useTypewriter } from '@/hooks/useTypewriter'
import photoZhihong from '@/assets/zhihong.jpg'

const HERO_LINES = [
  '欢迎来到我的个人网页。',
  '可以叫我志宏，',
  '俄语名字叫 Сидор，',
  '现在是学习地质的一名学生。',
]

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export default function Home() {
  const [dark, setDark] = useState(true)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const { text: typedLines, done } = useTypewriter(HERO_LINES, 90, 500)
  const [konamiIdx, setKonamiIdx] = useState(0)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  // 按 ` 或 ~ 打开终端
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const typing = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'
      if (e.key === '`' && !typing) {
        setTerminalOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Konami 代码彩蛋
  useEffect(() => {
    if (showAll) return
    const onKey = (e: KeyboardEvent) => {
      const expected = KONAMI[konamiIdx]
      if (e.key === expected || e.key.toLowerCase() === expected) {
        const next = konamiIdx + 1
        if (next === KONAMI.length) {
          setShowAll(true)
          setKonamiIdx(0)
        } else {
          setKonamiIdx(next)
        }
      } else {
        setKonamiIdx(e.key === KONAMI[0] || e.key.toLowerCase() === KONAMI[0] ? 1 : 0)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [konamiIdx, showAll])

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 antialiased selection:bg-emerald-500/30 dark">
      <div className="bg-grid pointer-events-none fixed inset-0" />

      {/* 导航 */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur">
        <nav className="mx-auto flex h-14 max-w-3xl items-center px-6">
          <a href="#top" className="font-mono text-sm font-semibold tracking-wider text-emerald-400">
            ~/zhihong
          </a>
          <div className="ml-auto flex items-center gap-5">
            <a href="#about" className="hidden text-sm text-zinc-400 transition-colors hover:text-zinc-100 sm:block">
              关于
            </a>
            <button
              onClick={() => setTerminalOpen(true)}
              title="打开终端（按 ~ 也可以）"
              className="rounded-md border border-zinc-700 p-1.5 text-zinc-400 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
            >
              <TerminalIcon size={15} />
            </button>
            <button
              onClick={() => setDark((d) => !d)}
              title="切换明暗主题"
              className="rounded-md border border-zinc-700 p-1.5 text-zinc-400 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </nav>
      </header>

      {/* 首屏 */}
      <section id="top" className="relative mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 pt-14">
        <p className="mb-6 font-mono text-xs tracking-widest text-emerald-500">
          {'// 志宏的个人主页 · 一名地质学生'}
        </p>
        <h1 className="space-y-3 font-mono text-2xl leading-snug sm:text-4xl">
          {HERO_LINES.map((_line, i) => (
            <div key={i} className={i === HERO_LINES.length - 1 ? 'text-emerald-400' : 'text-zinc-100'}>
              {typedLines[i] ?? ''}
              {i === typedLines.length - 1 && !done && (
                <span className="cursor-blink ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] bg-emerald-400" />
              )}
            </div>
          ))}
          {done && <span className="cursor-blink ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] bg-emerald-400" />}
        </h1>
        <div className="mt-12 flex items-center gap-6 text-sm">
          <a
            href="#about"
            className="rounded-md border border-emerald-500/40 px-4 py-2 font-mono text-emerald-400 transition-colors hover:bg-emerald-500/10"
          >
            认识我 →
          </a>
          <span className="hidden font-mono text-xs text-zinc-600 sm:block">
            提示：按 <kbd className="rounded border border-zinc-700 px-1.5 py-0.5">~</kbd> 打开终端
          </span>
        </div>
        <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600">
          <ChevronDown className="animate-bounce" size={18} />
        </a>
      </section>

      {/* 关于 */}
      <section id="about" className="relative mx-auto max-w-3xl px-6 py-24">
        <h2 className="mb-10 font-mono text-sm tracking-widest text-zinc-500">
          <span className="text-emerald-500">$</span> whoami
        </h2>
        <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-start">
          <figure className="shrink-0 -rotate-2 rounded-lg border border-zinc-700 bg-zinc-900 p-2 pb-5 shadow-xl shadow-black/50 transition-transform duration-300 hover:rotate-0">
            <img
              src={photoZhihong}
              alt="志宏的童年照"
              className="w-52 rounded-sm sm:w-60"
            />
            <figcaption className="mt-3 text-center font-mono text-xs text-zinc-500">
              fig.1 小时候的我
            </figcaption>
          </figure>
          <div className="space-y-4 leading-8 text-zinc-400">
            <p>
              可以叫我 <span className="text-zinc-100">志宏</span>，俄语名字叫{' '}
              <span className="font-mono text-zinc-100">Сидор（西多尔）</span>。
            </p>
            <p>
              现在是学习<span className="text-emerald-400">地质</span>的一名学生。
              日常就是上课、看石头、敲石头，偶尔也敲敲键盘。
            </p>
            <p>
              这块自留地会放一点学习记录和生活碎片——
              先从这张照片开始认识我吧。
            </p>
          </div>
        </div>
      </section>

      {/* 彩蛋 */}
      {showAll && (
        <section className="relative mx-auto max-w-3xl px-6 pb-24">
          <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-6 font-mono text-sm leading-7 text-emerald-300">
            <p className="mb-2 text-emerald-400">🏆 成就解锁：Konami 代码</p>
            <p className="text-emerald-300/80">
              ↑↑↓↓←→←→BA —— 你居然真的输入了。探索精神，正是学习路上最需要的东西。
              这个彩蛋从此对你常开：它叫「真正的探索者」。
            </p>
          </div>
        </section>
      )}

      {/* 页脚 */}
      <footer className="relative border-t border-zinc-800/60">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-6 py-10">
          <VisitorCounter />
          <p className="font-mono text-xs text-zinc-600">
            © 2026 志宏（Сидор）· 用好奇心手动搭建 · 按 <kbd className="rounded border border-zinc-700 px-1">~</kbd> 打开终端
          </p>
          <p className="font-mono text-[10px] tracking-widest text-zinc-700">
            ↑ ↑ ↓ ↓ ← → ← → B A
          </p>
        </div>
      </footer>

      <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </div>
  )
}
