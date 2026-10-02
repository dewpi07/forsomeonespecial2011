'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CONTENT } from '@/lib/content'

const MESSAGES = ['menyiapkan kejutan…', 'merangkai kenangan…', 'menata bunga & lagu…', 'hampir siap…']

export function Loader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion()
  const [pct, setPct] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const MIN = reduce ? 300 : 1800
    const MAX = 6000
    const t0 = performance.now()
    let loaded = document.readyState === 'complete'
    const onLoad = () => (loaded = true)
    window.addEventListener('load', onLoad)
    let raf = 0
    const frame = (now: number) => {
      const el = now - t0
      let p = Math.min(el / MIN, 1)
      if (!loaded) p = Math.min(p, 0.92)
      setPct(Math.floor(p * 100))
      if ((p >= 1 && loaded) || el > MAX) {
        setPct(100)
        setVisible(false)
        return
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('load', onLoad)
      document.documentElement.style.overflow = ''
    }
  }, [reduce])

  useEffect(() => {
    if (!visible) document.documentElement.style.overflow = ''
  }, [visible])

  const msg = MESSAGES[Math.min(MESSAGES.length - 1, Math.floor((pct / 100) * MESSAGES.length))]

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="loader"
          role="status"
          aria-live="polite"
          onClick={() => setVisible(false)}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
          transition={{ duration: reduce ? 0 : 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-0 z-[100] grid cursor-pointer place-items-center bg-[radial-gradient(circle_at_30%_20%,var(--pink),transparent_55%),radial-gradient(circle_at_75%_80%,var(--lilac),transparent_55%),var(--bg)]"
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative size-32">
              <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
                <defs>
                  <linearGradient id="ld-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="var(--accent)" />
                    <stop offset="1" stopColor="var(--gold)" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="54" fill="none" stroke="var(--line)" strokeWidth="5" />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="url(#ld-grad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  style={{ pathLength: pct / 100 }}
                />
              </svg>
              <motion.div
                className="absolute inset-0 grid place-items-center text-accent"
                animate={reduce ? undefined : { scale: [1, 1.18, 1] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Heart className="size-10 fill-current" aria-hidden />
              </motion.div>
            </div>
            <p className="mt-6 font-serif text-4xl text-ink">
              {CONTENT.hero.judul} <i className="text-accent">{CONTENT.hero.sorot}</i>
            </p>
            <p className="font-hand text-xl text-muted">a little tribute</p>
            <p className="mt-4 font-serif text-2xl tabular-nums text-ink">{pct}%</p>
            <p className="text-sm text-muted">{msg}</p>
            <p className="mt-6 text-xs text-muted/70">ketuk untuk lewati</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
