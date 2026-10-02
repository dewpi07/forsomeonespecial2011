'use client'

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { Expand } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'
import { BentoCard } from '@/components/bento/bento-card'
import { useGallery } from '@/components/providers/gallery-provider'
import { useIsDesktopPointer } from '@/hooks/use-media'
import { CONTENT } from '@/lib/content'
import { cn } from '@/lib/utils'
import { Glyph } from '@/components/glyph'

export function PhotoCard({ photoIndex, index, className }: { photoIndex: number; index: number; className?: string }) {
  const photo = CONTENT.foto[photoIndex]
  const { open } = useGallery()
  const desktop = useIsDesktopPointer()
  const reduce = useReducedMotion()
  const btnRef = useRef<HTMLButtonElement>(null)

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 })
  const tilt = desktop && !reduce

  return (
    <BentoCard tone="photo" index={index} className={cn('min-h-[420px] [perspective:900px]', className)}>
      <motion.button
        ref={btnRef}
        type="button"
        onClick={() => open(photoIndex, btnRef.current)}
        aria-label={`Perbesar foto: ${photo.caption}`}
        onPointerMove={(e) => {
          if (!tilt) return
          const r = e.currentTarget.getBoundingClientRect()
          mx.set((e.clientX - r.left) / r.width)
          my.set((e.clientY - r.top) / r.height)
        }}
        onPointerLeave={() => {
          mx.set(0.5)
          my.set(0.5)
        }}
        style={tilt ? { rotateX: rx, rotateY: ry } : undefined}
        className="group absolute inset-0 text-left"
        data-no-burst
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading={index === 0 ? 'eager' : 'lazy'}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-plum/70 via-transparent to-transparent" />
        <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/25 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Expand className="size-4" aria-hidden />
        </span>
        <span className="absolute inset-x-0 bottom-0 p-5 font-hand text-3xl text-white [text-shadow:0_2px_8px_rgb(0_0_0/0.5)]">
          {photo.caption} <Glyph name="flower" className="inline text-pink" />
        </span>
      </motion.button>
    </BentoCard>
  )
}
