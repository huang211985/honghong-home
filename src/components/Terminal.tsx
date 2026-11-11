import { useEffect, useRef, useState } from 'react'

type HistoryItem = { type: 'in' | 'out'; text: string }

const FILE_SYSTEM: Record<string, string> = {
  'about.txt': [
    '姓名：志宏',
    '俄语名：Сидор（西多尔）',
    '身份：学习地质的一名学生',
    '日常：上课、看石头、敲石头，偶尔敲敲键盘。',
  ].join('\n'),
  'now.txt': [
    '状态：在读地质专业',
    '正在做的事：上课、实验、攒石头标本',
    '下一步：野外实习',
  ].join('\n'),
  'plan.txt': [
    '本学期：普通地质学',
    '然后是：结晶学与矿物学',
    '重头戏：野外实习，去山里看真的地层',
    '长期目标：亲手摸到教科书里的每一类石头',
  ].join('\n'),
  'secret.txt': '你发现了一个秘密文件。\n其实也没什么秘密——坚持本身就是彩蛋。\n（输入 konami 有惊喜）',
}

function respond(input: string): string[] {
  const cmd = input.trim()
  if (!cmd) return []
  const [name, ...args] = cmd.split(/\s+/)
  switch (name) {
    case 'help':
      return [
        '可用命令：',
        '  whoami     我是谁',
        '  ls         列出文件',
        '  cat <file> 查看文件，例如 cat about.txt',
        '  uname      系统信息',
        '  date       现在的时间',
        '  konami     传说中上上下下的那个',
        '  sudo       试试看',
        '  clear      清屏',
        '  exit       关闭终端',
      ]
    case 'whoami':
      return ['zhihong —— 一名学地质的学生，石头和代码一样有趣。']
    case 'ls':
      return [...Object.keys(FILE_SYSTEM), 'hello.py']
    case 'cat': {
      const f = args[0]
      if (!f) return ['用法：cat <文件名>，先 ls 看看有什么']
      if (f === 'hello.py') return ['print("Hello, I study rocks.")']
      if (FILE_SYSTEM[f]) return FILE_SYSTEM[f].split('\n')
      return [`cat: ${f}: 没有这个文件（但你能找到它，说明你在探索，很好）`]
    }
    case 'uname':
      return ['ZhihongOS 1.0 geology-edition (sidor-terminal)']
    case 'date':
      return [new Date().toString()]
    case 'sudo':
      return ['zhihong 不在 sudoers 文件中。', '这件事将被报告。……开玩笑的，学习路上人人平等。']
    case 'konami':
      return ['↑ ↑ ↓ ↓ ← → ← → B A —— 你做到了！', '成就解锁：真正的探索者。']
    case 'clear':
      return ['__CLEAR__']
    case 'exit':
      return ['__EXIT__']
    default:
      return [
        `zsh: command not found: ${name}`,
        '输入 help 查看可用命令。 unknown command 也没关系，学习就是从报错开始的。',
      ]
  }
}

export default function Terminal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'out', text: 'Last login: 刚才，来自一个学地质的人。' },
    { type: 'out', text: '输入 help 查看可用命令。' },
  ])
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [history, open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const run = () => {
    const cmd = value
    setValue('')
    const outs = respond(cmd)
    if (outs.includes('__EXIT__')) {
      setHistory((h) => [...h, { type: 'in', text: cmd }, { type: 'out', text: '再见，继续加油。' }])
      setTimeout(onClose, 400)
      return
    }
    if (outs.includes('__CLEAR__')) {
      setHistory([])
      return
    }
    setHistory((h) => [
      ...h,
      { type: 'in', text: cmd },
      ...outs.map((t) => ({ type: 'out' as const, text: t })),
    ])
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex h-[70vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-emerald-500/30 bg-zinc-950 shadow-2xl shadow-emerald-500/10"
        onClick={(e) => {
          e.stopPropagation()
          inputRef.current?.focus()
        }}
      >
        <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-zinc-500">zhihong@geology: ~</span>
          <button
            className="ml-auto text-xs text-zinc-500 hover:text-zinc-300"
            onClick={onClose}
          >
            esc 关闭
          </button>
        </div>
        <div
          ref={bodyRef}
          className="flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed text-emerald-400/90"
        >
          {history.map((h, i) =>
            h.type === 'in' ? (
              <div key={i}>
                <span className="text-zinc-500">$ </span>
                <span className="text-zinc-100">{h.text}</span>
              </div>
            ) : (
              <div key={i} className="whitespace-pre-wrap text-emerald-400/90">
                {h.text}
              </div>
            ),
          )}
          <div className="flex">
            <span className="text-zinc-500">$ </span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') run()
              }}
              className="ml-1 flex-1 bg-transparent text-zinc-100 outline-none"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
