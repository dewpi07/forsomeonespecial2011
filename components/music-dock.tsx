'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Pause, Play, SkipForward } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Equalizer, Vinyl } from '@/components/cards/player-card'
import { useAudio } from '@/components/providers/audio-provider'

function usePlayerOffscreen() {
  const [off, setOff] = useState(false)
  useEffect(() => {
    const el = document.getElementById('musik')
    if (!el) return
    const obs = new IntersectionObserver(([e]) => setOff(!e.isIntersecting), { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return off
}

export function MusicDock() {
  const { track, playing, toggle, next, progress } = useAudio()
  const off = usePlayerOffscreen()

  return (
    <>
      <motion.button
        type="button"
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        aria-label={playing ? 'Jeda musik' : 'Putar musik'}
        className="fixed bottom-6 right-6 z-40 hidden size-16 place-items-center rounded-full bg-plum p-1.5 shadow-xl sm:grid"
        data-no-burst
      >
        <Vinyl spinning={playing} className="size-full" />
        <span className="absolute grid size-7 place-items-center rounded-full bg-bg/90 text-ink">
          {playing ? <Pause className="size-3.5 fill-current" aria-hidden /> : <Play className="size-3.5 translate-x-px fill-current" aria-hidden />}
        </span>
      </motion.button>

      <AnimatePresence>
        {(playing || progress > 0) && off && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+82px)] z-40 overflow-hidden rounded-2xl bg-plum text-plum-ink shadow-xl sm:hidden"
            data-no-burst
          >
            <div className="flex items-center gap-3 p-2 pr-3">
              <Vinyl spinning={playing} className="size-10" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{track.judul}</p>
                <p className="flex items-center gap-2 truncate text-xs opacity-70">
                  <Equalizer on={playing} className="h-3 text-gold" /> {track.artis}
                </p>
              </div>
              <button type="button" onClick={toggle} aria-label={playing ? 'Jeda' : 'Putar'} className="grid size-11 place-items-center rounded-full bg-white/10">
                {playing ? <Pause className="size-4 fill-current" aria-hidden /> : <Play className="size-4 fill-current" aria-hidden />}
              </button>
              <button type="button" onClick={next} aria-label="Lagu berikutnya" className="grid size-11 place-items-center rounded-full bg-white/10">
                <SkipForward className="size-4" aria-hidden />
              </button>
            </div>
            <div className="h-0.5 bg-white/10">
              <div className="h-full bg-gradient-to-r from-accent to-gold" style={{ width: `${progress * 100}%` }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
