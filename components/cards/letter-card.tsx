'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Mail, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { BentoCard, CardKicker, CardTitle } from '@/components/bento/bento-card'
import { CONTENT } from '@/lib/content'
import { burstFrom } from '@/lib/fx'
import { cn } from '@/lib/utils'

function LetterDialog({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const full = CONTENT.surat.isi
  const [count, setCount] = useState(reduce ? full.length : 0)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [onClose])

  useEffect(() => {
    if (reduce) return
    let i = 0
    const t = window.setTimeout(() => {
      const id = window.setInterval(() => {
        i += 2
        setCount(Math.min(i, full.length))
        if (i >= full.length) window.clearInterval(id)
      }, 30)
      cleanup = () => window.clearInterval(id)
    }, 900)
    let cleanup = () => {}
    return () => {
      window.clearTimeout(t)
      cleanup()
    }
  }, [full, reduce])

  return (
    <motion.div
      className="fixed inset-0 z-[90] grid place-items-center bg-plum/80 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      data-no-burst
    >
      <div role="dialog" aria-modal="true" aria-labelledby="surat-judul" className="relative w-full max-w-md [perspective:1200px]">
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 z-20 h-24 origin-top rounded-t-[24px] bg-[linear-gradient(160deg,var(--accent),var(--gold))] [clip-path:polygon(0_0,100%_0,50%_100%)]"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: 180, opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, ease: 'easeInOut', opacity: { delay: 0.45, duration: 0.2 } }}
        />
        <motion.article
          initial={reduce ? false : { y: 60, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 160, damping: 20, delay: reduce ? 0 : 0.45 }}
          className="relative max-h-[80dvh] overflow-y-auto rounded-[24px] bg-[repeating-linear-gradient(transparent_0_31px,var(--line)_31px_32px),#fffaf6] p-6 pt-8 text-[#3b2a35] shadow-2xl sm:p-8"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Tutup surat"
            className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-[#ffd9e3] text-[#3b2a35] hover:scale-105"
          >
            <X className="size-4" aria-hidden />
          </button>
          <h2 id="surat-judul" className="font-hand text-3xl font-bold text-[#d94f86]">
            {CONTENT.surat.judul}
          </h2>
          <p className="sr-only">{full}</p>
          <p aria-hidden className="mt-3 whitespace-pre-line font-hand text-2xl leading-8">
            {full.slice(0, count)}
            {count < full.length && <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 animate-pulse bg-[#d94f86]" />}
          </p>
          <motion.p
            className="mt-6 text-right font-hand text-xl text-[#7a6570]"
            initial={{ opacity: 0 }}
            animate={{ opacity: count >= full.length ? 1 : 0 }}
          >
            — {CONTENT.surat.ttd}
          </motion.p>
        </motion.article>
      </div>
    </motion.div>
  )
}

export function LetterCard({ index, className }: { index: number; className?: string }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  useEffect(() => setMounted(true), [])
  const close = useCallback(() => {
    setOpen(false)
    btnRef.current?.focus()
  }, [])

  return (
    <BentoCard tone="lilac" index={index} className={cn('sm:flex-row sm:items-center', className)}>
      <div className="flex-1">
        <CardKicker>Surat rahasia</CardKicker>
        <CardTitle className="mt-1">Ada surat kecil untukmu</CardTitle>
        <p className="mt-1 text-sm text-muted">Bukanya pelan-pelan ya.</p>
      </div>
      <motion.button
        ref={btnRef}
        type="button"
        onClick={(e) => {
          burstFrom(e.currentTarget, 10)
          setOpen(true)
        }}
        whileHover={{ rotate: -4, scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } }}
        className="relative inline-flex min-h-12 items-center gap-2 self-start rounded-2xl bg-plum px-5 py-3 font-bold text-plum-ink shadow-lg sm:self-center"
        data-no-burst
      >
        <Mail className="size-5" aria-hidden /> Buka surat
        <span className="absolute -right-1.5 -top-1.5 size-3 animate-ping rounded-full bg-accent" aria-hidden />
        <span className="absolute -right-1.5 -top-1.5 size-3 rounded-full bg-accent" aria-hidden />
      </motion.button>
      {/* Portal ke <body>: kartu punya isolate/overflow-hidden/transform yang akan menjebak dialog fixed */}
      {mounted && createPortal(<AnimatePresence>{open && <LetterDialog onClose={close} />}</AnimatePresence>, document.body)}
    </BentoCard>
  )
}
