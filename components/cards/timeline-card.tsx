'use client'

import { motion, useReducedMotion } from 'motion/react'
import { BentoCard, CardKicker, CardTitle } from '@/components/bento/bento-card'
import { CONTENT } from '@/lib/content'
import { cn } from '@/lib/utils'

export function TimelineCard({ index, className }: { index: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <BentoCard tone="peach" index={index} className={cn('justify-start', className)} id="cerita">
      <div>
        <CardKicker>Linimasa kecil kita</CardKicker>
        <CardTitle className="mt-1">Cerita yang pelan-pelan tumbuh</CardTitle>
      </div>
      <ol className="relative mt-2 space-y-5 pl-7">
        <motion.span
          aria-hidden
          className="absolute bottom-2 left-[9px] top-2 w-[2px] origin-top rounded-full bg-gradient-to-b from-accent via-gold to-transparent"
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
        {CONTENT.timeline.map((m, i) => (
          <motion.li
            key={m.judul}
            className="relative"
            initial={reduce ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
          >
            <motion.span
              aria-hidden
              className="absolute -left-7 top-1 grid size-5 place-items-center rounded-full bg-bg ring-2 ring-accent"
              whileInView={{ scale: [0.4, 1.25, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
            >
              <span className="size-2 rounded-full bg-accent" />
            </motion.span>
            <p className="text-xs font-bold uppercase tracking-wider text-accent">{m.tanggal}</p>
            <p className="font-serif text-lg leading-snug">{m.judul}</p>
            <p className="text-sm text-muted">{m.teks}</p>
          </motion.li>
        ))}
      </ol>
    </BentoCard>
  )
}
