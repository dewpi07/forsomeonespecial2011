'use client'

import { motion } from 'motion/react'
import { Loader2, Pause, Play, SkipBack, SkipForward } from 'lucide-react'
import { BentoCard, CardKicker } from '@/components/bento/bento-card'
import { useAudio } from '@/components/providers/audio-provider'
import { cn } from '@/lib/utils'

export function Equalizer({ on, className }: { on: boolean; className?: string }) {
  return (
    <span aria-hidden className={cn('flex h-4 items-end gap-[3px]', className)}>
      {[0, 0.2, 0.4, 0.1].map((d, i) => (
        <span
          key={i}
          className={cn('w-[3px] origin-bottom rounded-full bg-current', on ? 'animate-eq' : 'scale-y-[0.3]')}
          style={{ animationDelay: `${d}s`, height: '100%' }}
        />
      ))}
    </span>
  )
}

export function Vinyl({ spinning, className }: { spinning: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'relative grid shrink-0 place-items-center rounded-full bg-[repeating-radial-gradient(circle,#1a1018_0_2px,#2a1d27_2px_4px)] shadow-lg',
        spinning && 'animate-spin-slow',
        className,
      )}
    >
      <span className="size-[38%] rounded-full bg-[conic-gradient(var(--accent),var(--gold),var(--accent))]" />
      <span className="absolute size-[8%] rounded-full bg-bg" />
    </span>
  )
}

function fmt(s: number) {
  if (!isFinite(s) || s <= 0) return '0:00'
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

export function PlayerCard({ index, className }: { index: number; className?: string }) {
  const { tracks, index: cur, track, playing, loading, error, progress, duration, toggle, play, next, prev, seek } = useAudio()

  return (
    <BentoCard tone="plum" index={index} className={cn('gap-4', className)} id="musik">
      <div className="flex items-center gap-4">
        <Vinyl spinning={playing} className="size-20 sm:size-24" />
        <div className="min-w-0 flex-1">
          <CardKicker className="flex items-center gap-2">
            Lagu untukmu <Equalizer on={playing} className="text-gold" />
          </CardKicker>
          <p className="mt-1 truncate font-serif text-2xl">{track.judul}</p>
          <p className="truncate text-sm opacity-70">{track.artis}</p>
        </div>
      </div>

      <div>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Posisi lagu"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          onPointerDown={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            seek((e.clientX - r.left) / r.width)
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') seek(progress + 0.05)
            if (e.key === 'ArrowLeft') seek(progress - 0.05)
          }}
          className="group relative h-2 cursor-pointer rounded-full bg-white/15"
          data-no-burst
        >
          <motion.div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent to-gold" style={{ width: `${progress * 100}%` }} />
          <span
            className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover:opacity-100"
            style={{ left: `${progress * 100}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-xs tabular-nums opacity-60">
          <span>{fmt(progress * duration)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button type="button" onClick={prev} aria-label="Lagu sebelumnya" className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 active:scale-90">
          <SkipBack className="size-5" aria-hidden />
        </button>
        <motion.button
          type="button"
          onClick={toggle}
          whileTap={{ scale: 0.88 }}
          aria-label={playing ? 'Jeda lagu' : 'Putar lagu'}
          className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-accent to-gold text-white shadow-[0_10px_30px_-8px_var(--accent)]"
        >
          {loading ? <Loader2 className="size-6 animate-spin" aria-hidden /> : playing ? <Pause className="size-6 fill-current" aria-hidden /> : <Play className="size-6 translate-x-0.5 fill-current" aria-hidden />}
        </motion.button>
        <button type="button" onClick={next} aria-label="Lagu berikutnya" className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 active:scale-90">
          <SkipForward className="size-5" aria-hidden />
        </button>
      </div>

      {error && (
        <p role="alert" className="text-center text-xs text-gold">
          {error}
        </p>
      )}

      <ol className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1" aria-label="Daftar lagu">
        {tracks.map((t, i) => (
          <li key={t.file} className="shrink-0">
            <button
              type="button"
              onClick={() => play(i)}
              aria-current={i === cur ? 'true' : undefined}
              className={cn(
                'flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition',
                i === cur ? 'bg-plum-ink text-plum' : 'bg-white/10 hover:bg-white/20',
              )}
            >
              {i === cur && playing ? <Equalizer on className="h-3" /> : <span className="tabular-nums opacity-60">{i + 1}</span>}
              {t.judul}
            </button>
          </li>
        ))}
      </ol>
    </BentoCard>
  )
}
