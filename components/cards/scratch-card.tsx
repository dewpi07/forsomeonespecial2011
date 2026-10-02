'use client'

import { AnimatePresence, motion } from 'motion/react'
import { RotateCcw } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BentoCard, CardKicker } from '@/components/bento/bento-card'
import { CONTENT } from '@/lib/content'
import { burstFrom, haptic } from '@/lib/fx'

export function ScratchCard({ index, className }: { index: number; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const moves = useRef(0)
  const [revealed, setRevealed] = useState(false)

  const paint = useCallback(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const { width, height } = wrap.getBoundingClientRect()
    canvas.width = width * dpr
    canvas.height = height * dpr
    const ctx = canvas.getContext('2d')!
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.globalCompositeOperation = 'source-over'
    const g = ctx.createLinearGradient(0, 0, width, height)
    g.addColorStop(0, '#d9c6a0')
    g.addColorStop(0.5, '#f4e7c8')
    g.addColorStop(1, '#c9a96e')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = 'rgba(255,255,255,0.35)'
    for (let i = 0; i < 60; i++) ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2)
    ctx.fillStyle = '#5a4430'
    ctx.font = '600 16px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('gosok di sini', width / 2, height / 2)
  }, [])

  useEffect(() => {
    paint()
    const wrap = wrapRef.current
    if (!wrap) return
    let w = wrap.clientWidth
    const ro = new ResizeObserver(() => {
      if (Math.abs(wrap.clientWidth - w) > 4 && !revealed) {
        w = wrap.clientWidth
        paint()
      }
    })
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [paint, revealed])

  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || revealed) return
    const canvas = e.currentTarget
    const r = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')!
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(e.clientX - r.left, e.clientY - r.top, 22, 0, Math.PI * 2)
    ctx.fill()
    if (++moves.current % 12 === 0) checkCleared(canvas)
  }

  const checkCleared = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')!
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let clear = 0
    const step = 64
    for (let i = 3; i < data.length; i += 4 * step) if (data[i] === 0) clear++
    if (clear / (data.length / (4 * step)) > 0.55) {
      setRevealed(true)
      haptic()
      burstFrom(canvas, 12)
    }
  }

  const reset = () => {
    setRevealed(false)
    moves.current = 0
    requestAnimationFrame(paint)
  }

  return (
    <BentoCard tone="butter" index={index} className={className}>
      <div className="flex items-center justify-between">
        <CardKicker>Kartu gosok</CardKicker>
        {revealed && (
          <button type="button" onClick={reset} className="inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-ink">
            <RotateCcw className="size-3.5" aria-hidden /> ulangi
          </button>
        )}
      </div>
      <div ref={wrapRef} className="relative min-h-[150px] overflow-hidden rounded-2xl bg-bg">
        <div className="absolute inset-0 grid place-items-center p-4 text-center">
          <div>
            <p className="font-serif text-2xl text-accent">{CONTENT.gosok.judul}</p>
            <p className="font-hand text-xl text-muted">{CONTENT.gosok.isi}</p>
          </div>
        </div>
        <AnimatePresence>
          {!revealed && (
            <motion.canvas
              ref={canvasRef}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              aria-label="Gosok area ini untuk membuka pesan"
              role="img"
              className="absolute inset-0 size-full cursor-crosshair touch-none"
              onPointerDown={(e) => {
                drawing.current = true
                e.currentTarget.setPointerCapture(e.pointerId)
                scratch(e)
              }}
              onPointerMove={scratch}
              onPointerUp={(e) => {
                drawing.current = false
                checkCleared(e.currentTarget)
              }}
              onPointerCancel={() => (drawing.current = false)}
            />
          )}
        </AnimatePresence>
      </div>
      <p className="sr-only">
        Pesan: {CONTENT.gosok.judul} {CONTENT.gosok.isi}
      </p>
    </BentoCard>
  )
}
