'use client'

import { Cake, Heart, Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BentoCard, CardKicker } from '@/components/bento/bento-card'
import { CONTENT } from '@/lib/content'
import { birthdayInfo } from '@/lib/waktu'

export function BirthdayCard({ index, className }: { index: number; className?: string }) {
  const [info, setInfo] = useState<ReturnType<typeof birthdayInfo> | null>(null)

  useEffect(() => {
    const tick = () => !document.hidden && setInfo(birthdayInfo(CONTENT.lahir))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')
  const [, m, d] = CONTENT.lahir.split('-').map(Number)
  const label = new Date(2000, m - 1, d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <BentoCard tone="pink" index={index} className={className}>
        <div className="flex items-center justify-between">
          <CardKicker>{CONTENT.ultah.kicker}</CardKicker>
          <Cake className="size-5 text-accent" aria-hidden />
        </div>
        {info?.isToday ? (
          <div>
            <p className="font-serif text-3xl leading-tight sm:text-4xl">
              Selamat ulang tahun yang ke-{info.age}, {CONTENT.nama}!
            </p>
            <p className="mt-2 text-sm text-muted">{CONTENT.ultah.hariH}</p>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-plum px-5 text-sm font-bold text-plum-ink transition-transform hover:scale-[1.03] active:scale-95"
            >
              <Sparkles className="size-4" aria-hidden />
              Buka ucapan spesial
            </button>
          </div>
        ) : (
          <div>
            <p className="font-serif text-6xl leading-none tabular-nums">
              {info ? info.days : '--'}
              <span className="ml-2 font-sans text-base font-semibold text-muted">hari lagi</span>
            </p>
            <p className="mt-2 font-mono text-sm tabular-nums text-accent" aria-hidden>
              {info ? `${pad(info.hours)}:${pad(info.minutes)}:${pad(info.seconds)}` : '--:--:--'}
            </p>
            <p className="mt-1 text-xs text-muted">
              menuju ulang tahunmu yang ke-{info ? info.age : '--'} · {label}
            </p>
          </div>
        )}
      </BentoCard>

      {isOpen && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-plum/70 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={() => setIsOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="birthday-title"
            className="relative w-full max-w-lg overflow-hidden rounded-[32px] bg-bg p-7 text-center shadow-2xl sm:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Tutup ucapan"
              className="absolute right-4 top-4 rounded-full p-2 text-muted transition-colors hover:bg-pink hover:text-ink"
            >
              <X className="size-5" aria-hidden />
            </button>
            <div className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-pink text-accent">
              <Heart className="size-8 fill-current" aria-hidden />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">07 Oktober · hari spesialmu</p>
            <h2 id="birthday-title" className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              Selamat ulang tahun, {CONTENT.nama}!
            </h2>
            <p className="mx-auto mt-5 max-w-md whitespace-pre-line text-base leading-7 text-muted">
              {CONTENT.ultah.hariH}{'\n\n'}Semoga tahun ini membawa lebih banyak tawa, langkah yang ringan, dan hal-hal baik yang pantas kamu dapatkan.
            </p>
            <div className="mt-7 flex items-center justify-center gap-2 text-sm font-semibold text-accent">
              <Sparkles className="size-4" aria-hidden />
              Dari seseorang yang senang mengenalmu
              <Sparkles className="size-4" aria-hidden />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
