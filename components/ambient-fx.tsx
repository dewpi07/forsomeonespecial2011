'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { useIsDesktopPointer, useIsMobile } from '@/hooks/use-media'
import { burst } from '@/lib/fx'
import { glyphEl, type GlyphName } from '@/lib/glyphs'
import { Glyph } from '@/components/glyph'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-accent via-gold to-accent"
    />
  )
}

function seeded(i: number) {
  const x = Math.sin(i * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

export function FallingPetals() {
  const reduce = useReducedMotion()
  const mobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const petals = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        left: seeded(i) * 100,
        size: 12 + seeded(i + 20) * 10,
        dur: 14 + seeded(i + 40) * 12,
        delay: -seeded(i + 60) * 20,
        sway: seeded(i + 80) * 160 - 80,
        rot: 180 + seeded(i + 100) * 360,
        glyph: (i % 3 ? 'petal' : 'flower') as GlyphName,
      })),
    [],
  )

  if (!mounted || reduce) return null
  const list = mobile ? petals.slice(0, 6) : petals

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {list.map((p, i) => (
        <span
          key={i}
          className="petal text-accent/40"
          style={
            {
              left: `${p.left}%`,
              fontSize: p.size,
              '--d': `${p.dur}s`,
              '--dl': `${p.delay}s`,
              '--sw': `${p.sway}px`,
              '--r': `${p.rot}deg`,
            } as React.CSSProperties
          }
        >
          <Glyph name={p.glyph} />
        </span>
      ))}
    </div>
  )
}

export function TapBurst() {
  const desktop = useIsDesktopPointer()
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const onDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('canvas, input, [data-no-burst]')) return
      burst(e.clientX, e.clientY, 5, 120)
    }
    window.addEventListener('pointerdown', onDown)

    let last = 0
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const now = performance.now()
      if (now - last < 70) return
      last = now
      const s = document.createElement('span')
      s.className = 'burst-particle'
      s.setAttribute('aria-hidden', 'true')
      s.appendChild(glyphEl('sparkle'))
      s.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;font-size:${8 + Math.random() * 8}px;color:var(--gold);--dx:${Math.random() * 30 - 15}px;--dy:${10 + Math.random() * 30}px;--t:.8s`
      document.body.appendChild(s)
      window.setTimeout(() => s.remove(), 900)
    }
    if (desktop) window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
    }
  }, [desktop, reduce])

  return null
}
