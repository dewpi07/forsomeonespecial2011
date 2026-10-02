'use client'

import { AnimatePresence, motion, type PanInfo } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { CONTENT } from '@/lib/content'

const GalleryCtx = createContext<{ open: (i: number, trigger?: HTMLElement | null) => void } | null>(null)

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const photos = CONTENT.foto
  const [index, setIndex] = useState<number | null>(null)
  const [dir, setDir] = useState(0)
  const triggerRef = useRef<HTMLElement | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const open = useCallback((i: number, trigger?: HTMLElement | null) => {
    triggerRef.current = trigger ?? null
    setDir(0)
    setIndex(i)
  }, [])
  const close = useCallback(() => {
    setIndex(null)
    triggerRef.current?.focus()
  }, [])
  const go = useCallback(
    (d: number) => {
      setDir(d)
      setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length))
    },
    [photos.length],
  )

  useEffect(() => {
    if (index === null) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [index, close, go])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1)
    else if (info.offset.x > 60) go(-1)
    else if (info.offset.y > 120) close()
  }

  const photo = index === null ? null : photos[index]

  return (
    <GalleryCtx.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {photo && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Foto ${index! + 1} dari ${photos.length}`}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-plum/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && close()}
            data-no-burst
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Tutup galeri"
              className="absolute right-4 top-[calc(env(safe-area-inset-top)+16px)] grid size-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
            >
              <X className="size-5" aria-hidden />
            </button>

            <AnimatePresence mode="popLayout" custom={dir} initial={false}>
              <motion.figure
                key={photo.src}
                custom={dir}
                initial={{ opacity: 0, x: dir * 80, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dir * -80, scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                drag
                dragSnapToOrigin
                dragElastic={0.6}
                onDragEnd={onDragEnd}
                className="relative flex max-h-[80dvh] w-full max-w-sm cursor-grab flex-col items-center active:cursor-grabbing"
              >
                <div className="relative aspect-[9/16] max-h-[72dvh] w-full overflow-hidden rounded-[28px] shadow-2xl">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 640px) 90vw, 384px" className="pointer-events-none object-cover" priority />
                </div>
                <figcaption className="mt-3 font-hand text-2xl text-white">{photo.caption}</figcaption>
              </motion.figure>
            </AnimatePresence>

            <div className="mt-2 flex items-center gap-4">
              <button type="button" onClick={() => go(-1)} aria-label="Foto sebelumnya" className="grid size-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25">
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <span className="text-sm tabular-nums text-white/80">
                {index! + 1} / {photos.length}
              </span>
              <button type="button" onClick={() => go(1)} aria-label="Foto berikutnya" className="grid size-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25">
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </div>
            <p className="mt-2 text-xs text-white/60 sm:hidden">geser kiri/kanan, tarik ke bawah untuk tutup</p>
          </motion.div>
        )}
      </AnimatePresence>
    </GalleryCtx.Provider>
  )
}

export function useGallery() {
  const ctx = useContext(GalleryCtx)
  if (!ctx) throw new Error('useGallery harus dipakai di dalam <GalleryProvider>')
  return ctx
}
