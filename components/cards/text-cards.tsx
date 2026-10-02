'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Crown, Heart, Quote, RotateCcw, Sparkles, Star } from 'lucide-react'
import { useState } from 'react'
import { BentoCard, CardKicker, CardTitle } from '@/components/bento/bento-card'
import { CONTENT } from '@/lib/content'
import { burstFrom } from '@/lib/fx'
import { cn } from '@/lib/utils'

type P = { index: number; className?: string }

export function QueenCard({ index, className }: P) {
  return (
    <BentoCard tone="pink" index={index} className={className}>
      <Crown className="size-8 animate-wiggle text-gold" aria-hidden />
      <div>
        <CardKicker>Ratu</CardKicker>
        <CardTitle className="mt-1 text-xl">{CONTENT.kartu.ratu}</CardTitle>
      </div>
    </BentoCard>
  )
}

export function SpecialCard({ index, className }: P) {
  return (
    <BentoCard tone="mint" index={index} className={className}>
      <Sparkles className="size-7 text-accent" aria-hidden />
      <div>
        <CardKicker>Hal spesial darimu</CardKicker>
        <p className="mt-1 text-pretty font-medium">{CONTENT.kartu.spesial}</p>
      </div>
    </BentoCard>
  )
}

export function FavoritesCard({ index, className }: P) {
  return (
    <BentoCard tone="butter" index={index} className={className}>
      <div className="flex items-center justify-between">
        <CardKicker>Hal-hal favoritmu</CardKicker>
        <Star className="size-5 fill-gold text-gold" aria-hidden />
      </div>
      <ul className="flex flex-wrap gap-2">
        {CONTENT.kartu.favorit.map((f, i) => (
          <motion.li
            key={f}
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 + i * 0.08 }}
            whileHover={{ rotate: i % 2 ? 3 : -3, scale: 1.06 }}
            className="rounded-full bg-bg/70 px-4 py-2 text-sm font-semibold"
          >
            {f}
          </motion.li>
        ))}
      </ul>
    </BentoCard>
  )
}

export function JokeCard({ index, className }: P) {
  const [flipped, setFlipped] = useState(false)
  return (
    <BentoCard tone="lilac" index={index} className={cn('min-h-[200px] p-0 sm:p-0', className)}>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={flipped ? 'Balik kartu ke pertanyaan' : 'Balik kartu untuk lihat jawaban'}
        className="relative size-full min-h-[200px] text-left [perspective:900px]"
      >
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 20 }}
        >
          <div className="absolute inset-0 flex flex-col justify-between p-5 [backface-visibility:hidden] sm:p-6">
            <CardKicker>Joke recehan</CardKicker>
            <p className="font-serif text-xl leading-snug">{CONTENT.kartu.joke.tanya}</p>
            <span className="text-xs font-semibold text-muted">ketuk untuk jawabannya</span>
          </div>
          <div className="absolute inset-0 flex flex-col justify-between rounded-[28px] bg-plum p-5 text-plum-ink [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-6">
            <RotateCcw className="size-4 opacity-60" aria-hidden />
            <p className="font-hand text-2xl leading-snug">{CONTENT.kartu.joke.jawab}</p>
            <span aria-hidden className="text-xs opacity-60">hehe</span>
          </div>
        </motion.div>
      </button>
    </BentoCard>
  )
}

export function WishCard({ index, className }: P) {
  return (
    <BentoCard tone="butter" index={index} className={className}>
      <div className="relative size-10" aria-hidden>
        <motion.span
          className="absolute inset-0 rounded-full bg-gold/40 blur-md"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        <Sparkles className="relative size-10 text-gold" />
      </div>
      <div>
        <CardKicker>Doa kecil</CardKicker>
        <p className="mt-1 font-hand text-2xl leading-snug">{CONTENT.kartu.doa}</p>
      </div>
    </BentoCard>
  )
}

export function MomentCard({ index, className }: P) {
  return (
    <BentoCard tone="peach" index={index} className={className}>
      <CardKicker>Momen paling lucu</CardKicker>
      <p className="font-hand text-3xl leading-tight text-pretty">{`“${CONTENT.kartu.momen}”`}</p>
    </BentoCard>
  )
}

export function StoryCard({ index, className }: P) {
  return (
    <BentoCard tone="plum" index={index} className={className}>
      <Quote className="size-8 text-gold" aria-hidden />
      <blockquote>
        <p className="font-serif text-2xl leading-snug text-pretty">{CONTENT.kartu.cerita.teks}</p>
        <footer className="mt-3 font-hand text-xl text-gold">— {CONTENT.kartu.cerita.dari}</footer>
      </blockquote>
    </BentoCard>
  )
}

export function SurpriseCard({ index, className }: P) {
  const msgs = CONTENT.pesanKejutan
  const [i, setI] = useState(-1)
  return (
    <BentoCard tone="mint" index={index} className={cn('p-0 sm:p-0', className)}>
      <button
        type="button"
        onClick={(e) => {
          setI((n) => (n + 1) % msgs.length)
          burstFrom(e.currentTarget, 8)
        }}
        className="flex size-full min-h-[180px] flex-col justify-between gap-3 p-5 text-left sm:p-6"
        data-no-burst
      >
        <CardKicker>Pesan kejutan</CardKicker>
        <div aria-live="polite" className="relative min-h-[3.5em]">
          <AnimatePresence mode="wait">
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="font-serif text-xl leading-snug"
            >
              {i < 0 ? 'Ketuk aku ya…' : msgs[i]}
            </motion.p>
          </AnimatePresence>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted">
          <Heart className="size-3.5 fill-accent text-accent" aria-hidden /> {i < 0 ? 'ada rahasia kecil' : `${i + 1}/${msgs.length}`}
        </span>
      </button>
    </BentoCard>
  )
}

export function ClosingCard({ index, className }: P) {
  return (
    <BentoCard
      tone="pink"
      index={index}
      className={cn(
        'items-center py-12 text-center bg-[radial-gradient(circle_at_20%_20%,var(--lilac),transparent_50%),radial-gradient(circle_at_80%_80%,var(--peach),transparent_50%),var(--pink)]',
        className,
      )}
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        className="text-accent"
      >
        <Heart className="size-10 fill-current" aria-hidden />
      </motion.div>
      <h2 className="font-serif text-[clamp(2rem,5vw,3.25rem)] leading-tight text-balance">{CONTENT.kartu.penutup.judul}</h2>
      <p className="font-hand text-2xl text-muted">{CONTENT.kartu.penutup.isi}</p>
    </BentoCard>
  )
}
