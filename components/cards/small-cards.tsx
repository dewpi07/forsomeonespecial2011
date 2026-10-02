'use client'

import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Heart, Camera, Music2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BentoCard, CardKicker } from '@/components/bento/bento-card'
import { CONTENT } from '@/lib/content'
import { burstFrom, haptic } from '@/lib/fx'
import { cn } from '@/lib/utils'

type P = { index: number; className?: string }

export function LoveCard({ index, className }: P) {
  const [count, setCount] = useState<number | null>(null)
  const [pop, setPop] = useState(0)

  useEffect(() => {
    try {
      setCount(Number(localStorage.getItem('fyp_love')) || 0)
    } catch {
      setCount(0)
    }
  }, [])

  const send = (e: React.MouseEvent<HTMLButtonElement>) => {
    const n = (count ?? 0) + 1
    setCount(n)
    setPop((p) => p + 1)
    haptic()
    burstFrom(e.currentTarget, 9)
    try {
      localStorage.setItem('fyp_love', String(n))
    } catch {}
  }

  return (
    <BentoCard tone="pink" index={index} className={cn('items-center text-center', className)}>
      <CardKicker>Kirim cinta</CardKicker>
      <motion.button
        type="button"
        onClick={send}
        whileTap={{ scale: 0.8 }}
        aria-label="Kirim cinta"
        className="relative grid size-20 place-items-center rounded-full bg-bg text-accent shadow-[0_10px_30px_-10px_var(--accent)]"
        data-no-burst
      >
        <motion.span key={pop} initial={{ scale: 1.4 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
          <Heart className="size-9 fill-current" aria-hidden />
        </motion.span>
      </motion.button>
      <p className="text-sm text-muted" aria-live="polite">
        <AnimatePresence mode="popLayout">
          <motion.span key={count} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-block font-serif text-2xl text-ink tabular-nums">
            {count ?? 0}
          </motion.span>
        </AnimatePresence>{' '}
        cinta terkirim
      </p>
    </BentoCard>
  )
}

export function SweetWordsCard({ index, className }: P) {
  const words = CONTENT.kataManis
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!document.hidden) setI((n) => (n + 1) % words.length)
    }, 4500)
    return () => window.clearInterval(id)
  }, [words.length])

  return (
    <BentoCard tone="lilac" index={index} className={className}>
      <CardKicker>Kata manis</CardKicker>
      <div className="relative min-h-[5.5em]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 14, rotateX: -50 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -14, rotateX: 50 }}
            transition={{ duration: 0.45 }}
            className="font-hand text-2xl leading-snug"
          >
            {words[i]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="flex gap-1.5" aria-hidden>
        {words.map((_, n) => (
          <span key={n} className={cn('h-1 rounded-full transition-all duration-500', n === i ? 'w-5 bg-accent' : 'w-1.5 bg-ink/20')} />
        ))}
      </div>
    </BentoCard>
  )
}

export function SocialCard({ kind, index, className }: P & { kind: 'instagram' | 'tiktok' }) {
  const handle = CONTENT.sosmed[kind]
  const url = kind === 'instagram' ? `https://instagram.com/${encodeURIComponent(handle)}` : `https://tiktok.com/@${encodeURIComponent(handle)}`
  const Icon = kind === 'instagram' ? Camera : Music2
  return (
    <BentoCard tone={kind === 'instagram' ? 'peach' : 'mint'} index={index} className={cn('p-0 sm:p-0', className)}>
      <a href={url} target="_blank" rel="noopener noreferrer" className="group flex size-full min-h-[140px] flex-col justify-between gap-3 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="grid size-11 place-items-center rounded-2xl bg-bg/70 transition-transform group-hover:-rotate-6 group-hover:scale-110">
            <Icon className="size-5" aria-hidden />
          </span>
          <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </div>
        <div>
          <CardKicker>{kind === 'instagram' ? 'Instagram' : 'TikTok'}</CardKicker>
          <p className="font-serif text-xl">@{handle}</p>
        </div>
      </a>
    </BentoCard>
  )
}
