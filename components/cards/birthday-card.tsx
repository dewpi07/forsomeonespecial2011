'use client'

import { Cake } from 'lucide-react'
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

  return (
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
  )
}
