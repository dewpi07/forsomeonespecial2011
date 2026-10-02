'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { useGallery } from '@/components/providers/gallery-provider'
import { CONTENT } from '@/lib/content'
import { cn } from '@/lib/utils'

export function MobileGallery() {
  const { open } = useGallery()
  const scroller = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const onScroll = () => {
    const el = scroller.current
    if (!el) return
    const w = el.firstElementChild?.clientWidth ?? el.clientWidth
    setActive(Math.round(el.scrollLeft / (w + 12)))
  }

  const scrollTo = (i: number) => {
    const el = scroller.current
    const child = el?.children[i] as HTMLElement | undefined
    child?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <section aria-label="Galeri foto" className="sm:hidden">
      <div className="mb-3 flex items-end justify-between px-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Galeri</p>
          <h2 className="font-serif text-3xl text-ink">Potret favoritku</h2>
        </div>
        <p className="font-hand text-xl text-accent">geser →</p>
      </div>
      <div
        ref={scroller}
        onScroll={onScroll}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2"
      >
        {CONTENT.foto.map((p, i) => (
          <motion.button
            key={p.src}
            type="button"
            onClick={(e) => open(i, e.currentTarget)}
            aria-label={`Perbesar foto: ${p.caption}`}
            animate={{ scale: active === i ? 1 : 0.92, opacity: active === i ? 1 : 0.7 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="relative aspect-[9/14] w-[78vw] shrink-0 snap-center overflow-hidden rounded-[28px] shadow-lg"
            data-no-burst
          >
            <Image src={p.src} alt={p.alt} fill sizes="78vw" className="object-cover" priority={i === 0} />
            <span className="absolute inset-0 bg-gradient-to-t from-plum/70 via-transparent to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-5 text-left font-hand text-3xl text-white">{p.caption}</span>
          </motion.button>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-2" role="tablist" aria-label="Pilih foto">
        {CONTENT.foto.map((p, i) => (
          <button
            key={p.src}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={`Foto ${i + 1}`}
            onClick={() => scrollTo(i)}
            className="grid size-6 place-items-center"
          >
            <span className={cn('block h-2 rounded-full transition-all', active === i ? 'w-6 bg-accent' : 'w-2 bg-line')} />
          </button>
        ))}
      </div>
    </section>
  )
}
