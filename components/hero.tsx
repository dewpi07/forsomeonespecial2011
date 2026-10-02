'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, Camera, Music2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { CONTENT } from '@/lib/content'
import { Glyph } from '@/components/glyph'

function useTypewriter(text: string, active: boolean, speed = 28) {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    if (reduce) {
      setCount(text.length)
      return
    }
    setCount(0)
    let i = 0
    const id = window.setInterval(() => {
      i++
      setCount(i)
      if (i >= text.length) window.clearInterval(id)
    }, speed)
    return () => window.clearInterval(id)
  }, [active, text, speed, reduce])
  return text.slice(0, count)
}

const DUST = Array.from({ length: 14 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin((i + 1) * n) * 10000
    return x - Math.floor(x)
  }
  return { left: r(12.9) * 100, size: 3 + r(78.2) * 5, d: 7 + r(37.7) * 7, delay: -r(91.3) * 10, x: r(45.1) * 60 - 30 }
})

export function Hero({ started }: { started: boolean }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])
  const typed = useTypewriter(CONTENT.hero.kalimat, started)
  const igUrl = `https://instagram.com/${encodeURIComponent(CONTENT.sosmed.instagram)}`
  const ttUrl = `https://tiktok.com/@${encodeURIComponent(CONTENT.sosmed.tiktok)}`
  const title = CONTENT.hero.judul.split('')

  return (
    <section
      ref={ref}
      id="home"
      className="relative mt-4 overflow-hidden rounded-[36px] bg-[radial-gradient(circle_at_20%_25%,var(--pink),transparent_45%),radial-gradient(circle_at_80%_30%,var(--lilac),transparent_45%),radial-gradient(circle_at_50%_100%,var(--peach),transparent_55%),var(--butter)] px-5 py-16 text-center sm:mt-6 sm:px-8 sm:py-24 lg:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {DUST.map((d, i) => (
          <span
            key={i}
            className="absolute bottom-0 animate-float-up rounded-full bg-gold"
            style={
              {
                left: `${d.left}%`,
                width: d.size,
                height: d.size,
                '--d': `${d.d}s`,
                '--x': `${d.x}px`,
                animationDelay: `${d.delay}s`,
                boxShadow: '0 0 10px var(--gold)',
              } as React.CSSProperties
            }
          />
        ))}
        {(['flower', 'petal', 'sparkle', 'heart'] as const).map((g, i) => (
          <span
            key={g}
            className="absolute animate-drift text-3xl text-accent/40 sm:text-4xl"
            style={{
              left: i % 2 ? undefined : `${8 + i * 4}%`,
              right: i % 2 ? `${10 + i * 3}%` : undefined,
              top: i < 2 ? '16%' : undefined,
              bottom: i >= 2 ? '16%' : undefined,
              animationDelay: `${-i * 2}s`,
            }}
          >
            <Glyph name={g} />
          </span>
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="relative">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={started ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.1 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full bg-bg/60 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-muted backdrop-blur"
        >
          a little tribute
        </motion.p>

        <h1 className="font-serif text-[clamp(3.4rem,13vw,7rem)] leading-none text-ink">
          <span className="sr-only">
            {CONTENT.hero.judul} {CONTENT.hero.sorot}
          </span>
          <span aria-hidden>
            {title.map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 40, rotate: -8 }}
                animate={started ? { opacity: 1, y: 0, rotate: 0 } : undefined}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 + i * 0.05 }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </motion.span>
            ))}{' '}
            <motion.i
              className="inline-block text-accent"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={started ? { opacity: 1, scale: 1 } : undefined}
              transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.6 }}
            >
              {CONTENT.hero.sorot}
            </motion.i>
          </span>
        </h1>

        <p className="mx-auto mt-5 min-h-[5.5em] max-w-xl text-pretty text-lg text-ink/85 sm:min-h-[4.5em] sm:text-xl">
          <span className="sr-only">{CONTENT.hero.kalimat}</span>
          <span aria-hidden>
            {typed}
            {started && typed.length < CONTENT.hero.kalimat.length && (
              <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[3px] animate-pulse bg-accent" />
            )}
          </span>
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={started ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 1 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#galeri"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-plum px-6 font-bold text-plum-ink transition-transform hover:scale-105 active:scale-95"
          >
            Lihat kejutannya <ArrowDown className="size-4 animate-bounce" aria-hidden />
          </a>
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-bg/70 px-5 font-semibold text-ink backdrop-blur transition-transform hover:scale-105 active:scale-95"
          >
            <Camera className="size-4" aria-hidden /> Instagram
          </a>
          <a
            href={ttUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-bg/70 px-5 font-semibold text-ink backdrop-blur transition-transform hover:scale-105 active:scale-95"
          >
            <Music2 className="size-4" aria-hidden /> TikTok
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
