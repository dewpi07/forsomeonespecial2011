'use client'

import { animate, useInView, useReducedMotion } from 'motion/react'
import { CalendarHeart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { BentoCard, CardKicker } from '@/components/bento/bento-card'
import { CONTENT } from '@/lib/content'

function elapsed(start: string) {
  const [y, m, d] = start.split('-').map(Number)
  const ms = Math.max(0, Date.now() - new Date(y, m - 1, d).getTime())
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  }
}

export function DaysCard({ index, className }: { index: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(0)
  const [clock, setClock] = useState<ReturnType<typeof elapsed> | null>(null)

  useEffect(() => {
    const tick = () => !document.hidden && setClock(elapsed(CONTENT.start))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (!inView) return
    const target = elapsed(CONTENT.start).days
    if (reduce) {
      setShown(target)
      return
    }
    const ctrl = animate(0, target, { duration: 1.2, ease: 'easeOut', onUpdate: (v) => setShown(Math.round(v)) })
    return () => ctrl.stop()
  }, [inView, reduce])

  const pad = (n: number) => String(n).padStart(2, '0')
  const startLabel = new Date(CONTENT.start + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <BentoCard tone="plum" index={index} className={className}>
      <div className="flex items-center justify-between">
        <CardKicker>Sudah kenal selama</CardKicker>
        <CalendarHeart className="size-5 text-gold" aria-hidden />
      </div>
      <div>
        <p className="font-serif text-6xl leading-none tabular-nums">
          <span ref={ref}>{shown}</span>
          <span className="ml-2 font-sans text-base font-semibold opacity-70">hari</span>
        </p>
        <p className="mt-2 font-mono text-sm tabular-nums text-gold" aria-hidden>
          {clock ? `${pad(clock.hours)}:${pad(clock.minutes)}:${pad(clock.seconds)}` : '--:--:--'}
        </p>
        <p className="mt-1 text-xs opacity-60">sejak {startLabel}</p>
      </div>
    </BentoCard>
  )
}
