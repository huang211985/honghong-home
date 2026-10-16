import { useEffect, useState } from 'react'
import { Moon, Sun, Terminal as TerminalIcon, ChevronDown } from 'lucide-react'
import Terminal from '@/components/Terminal'
import VisitorCounter from '@/components/VisitorCounter'
import { useTypewriter } from '@/hooks/useTypewriter'

const HERO_LINES = [
  '你好，我是 Сидор。',
  '一个准备重新学习计算机的 layman。',
  '欢迎来到我的个人网页。',
]

const NOW_ITEMS = [
  { title: '收集学习路线', desc: '把网上关于 CS 自学的资料翻了个底朝天，正在筛选适合自己的那一条。' },
  { title: '搭建这个主页', desc: '把自己放到互联网上，是这次重新学习的第一步——先出发，再完善。' },
  { title: '重新捡起数学', desc: '离散数学、线代、概率……当年逃掉的课，如今笑着补回来。' },
]

const ROADMAP = [
  { stage: '阶段一', title: '导论与数学基础', desc: '计算机科学导论 + 离散数学，建立整栋大楼的地基。', status: '进行中' },
  { stage: '阶段二', title: '第一门语言', desc: 'Python 或 C，先把「程序」跑起来再说。', status: '待开始' },
  { stage: '阶段三', title: '数据结构与算法', desc: '从「会用」到「懂为什么」，开始有点计算机的样子。', status: '待开始' },
  { stage: '阶段四', title: '系统与网络', desc: '操作系统、计算机组成、网络——看见机器的内部。', status: '待开始' },
  { stage: '阶段五', title: '做真正的项目', desc: '学没学会，项目说了算。', status: '待开始' },
]

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export default function Home() {
  const [dark, setDark] = useState(true)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const { text: typedLines, done } = useTypewriter(HERO_LINES, 90, 600)
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
            ~/sidor
          </a>
          <div className="ml-auto flex items-center gap-5">
            <a href="#about" className="hidden text-sm text-zinc-400 transition-colors hover:text-zinc-100 sm:block">
              关于
            </a>
            <a href="#now" className="hidden text-sm text-zinc-400 transition-colors hover:text-zinc-100 sm:block">
              现在
            </a>
            <a href="#roadmap" className="hidden text-sm text-zinc-400 transition-colors hover:text-zinc-100 sm:block">
              路线
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
          {'// 重新学习计算机计划 · 第 0 天'}
        </p>
        <h1 className="space-y-3 font-mono text-2xl leading-snug sm:text-4xl">
          {HERO_LINES.map((_line, i) => (
            <div key={i} className={i === 2 ? 'text-emerald-400' : 'text-zinc-100'}>
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
        <h2 className="mb-8 font-mono text-sm tracking-widest text-zinc-500">
          <span className="text-emerald-500">$</span> whoami
        </h2>
        <div className="space-y-4 leading-8 text-zinc-400">
          <p>
            我叫 <span className="text-zinc-100">Сидор（西多尔）</span>。
            和名字一样，我的人生路线也拐过几个弯——现在，我准备
            <span className="text-emerald-400">重新学习计算机</span>。
          </p>
          <p>
            我不介意别人叫我 <span className="font-mono text-zinc-100">layman</span>（外行）。
            外行意味着眼睛是新的，问题是真的，好奇心是满的。每一个专家，都曾经是个 layman。
          </p>
          <p>
            这个主页是我的「第 0 天」：学习还没有真正开始，但出发的动作已经做出去了。
            以后每一点进展，都会留在这里。
          </p>
        </div>
      </section>

      {/* 现在 */}
      <section id="now" className="relative mx-auto max-w-3xl px-6 py-24">
        <h2 className="mb-2 font-mono text-sm tracking-widest text-zinc-500">
          <span className="text-emerald-500">$</span> cat now.txt
        </h2>
        <p className="mb-8 font-mono text-xs text-zinc-600">最近更新：今天 · 此页面记录我最近在做什么</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {NOW_ITEMS.map((item) => (
            <div
              key={item.title}
              className="group rounded-lg border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-emerald-500/40"
            >
              <h3 className="mb-2 font-mono text-sm text-emerald-400">▸ {item.title}</h3>
              <p className="text-sm leading-6 text-zinc-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 学习路线 */}
      <section id="roadmap" className="relative mx-auto max-w-3xl px-6 py-24">
        <h2 className="mb-8 font-mono text-sm tracking-widest text-zinc-500">
          <span className="text-emerald-500">$</span> cat plan.txt
        </h2>
        <div className="relative space-y-6 border-l border-zinc-800 pl-6">
          {ROADMAP.map((step, i) => (
            <div key={i} className="relative">
              <span
                className={`absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full border-2 ${
                  step.status === '进行中'
                    ? 'border-emerald-400 bg-emerald-400/30'
                    : 'border-zinc-700 bg-zinc-900'
                }`}
              />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-xs text-zinc-500">{step.stage}</span>
                <h3 className="font-mono text-sm text-zinc-100">{step.title}</h3>
                {step.status === '进行中' ? (
                  <span className="rounded-full border border-emerald-500/40 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                    {step.status}
                  </span>
                ) : (
                  <span className="font-mono text-[10px] text-zinc-600">{step.status}</span>
                )}
              </div>
              <p className="mt-1.5 text-sm leading-6 text-zinc-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 彩蛋 */}
      {showAll && (
        <section className="relative mx-auto max-w-3xl px-6 pb-24">
          <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-6 font-mono text-sm leading-7 text-emerald-300">
            <p className="mb-2 text-emerald-400">🏆 成就解锁：Konami 代码</p>
            <p className="text-emerald-300/80">
              ↑↑↓↓←→←→BA —— 你居然真的输入了。探索精神，正是学计算机最需要的东西。
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
            © 2026 Сидор · 用好奇心手动搭建 · 按 <kbd className="rounded border border-zinc-700 px-1">~</kbd> 打开终端
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
