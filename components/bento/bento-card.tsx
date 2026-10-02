'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import { forwardRef, type PointerEvent } from 'react'
import { cn } from '@/lib/utils'

export type Tone = 'pink' | 'peach' | 'mint' | 'lilac' | 'butter' | 'plum' | 'photo'

const TONES: Record<Tone, string> = {
  pink: 'bg-pink text-ink',
  peach: 'bg-peach text-ink',
  mint: 'bg-mint text-ink',
  lilac: 'bg-lilac text-ink',
  butter: 'bg-butter text-ink',
  plum: 'bg-plum text-plum-ink',
  photo: 'bg-lilac text-white p-0',
}

type Props = HTMLMotionProps<'article'> & {
  tone?: Tone
  index?: number
}

export const BentoCard = forwardRef<HTMLElement, Props>(function BentoCard(
  { tone = 'pink', index = 0, className, children, onPointerMove, ...rest },
  ref,
) {
  const reduce = useReducedMotion()

  const handleMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
    onPointerMove?.(e as never)
  }

  return (
    <motion.article
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: (index % 4) * 0.08 }}
      whileHover={reduce ? undefined : { scale: 1.02 }}
      onPointerMove={handleMove}
      className={cn(
        'spotlight relative isolate flex flex-col justify-between gap-3 overflow-hidden rounded-[28px] p-5 sm:p-6',
        'shadow-[0_1px_0_rgb(0_0_0/0.02)] transition-shadow duration-300 hover:shadow-[0_22px_44px_-20px_rgb(120_50_90/0.4)]',
        TONES[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </motion.article>
  )
})

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn('font-serif text-2xl leading-tight text-balance', className)}>{children}</h3>
}

export function CardKicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('text-xs font-bold uppercase tracking-[0.18em] opacity-60', className)}>{children}</p>
  )
}
