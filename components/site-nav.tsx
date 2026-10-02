'use client'

import { motion } from 'motion/react'
import { BookHeart, Home, Images, Music2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CONTENT } from '@/lib/content'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'

export const SECTIONS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'galeri', label: 'Galeri', icon: Images },
  { id: 'cerita', label: 'Cerita', icon: BookHeart },
  { id: 'musik', label: 'Musik', icon: Music2 },
] as const

function useActiveSection() {
  const [active, setActive] = useState<string>('home')
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    // Simpan semua bagian yang sedang terlihat (bukan hanya entri yang baru berubah)
    const visible = new Map<string, number>()
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio)
          else visible.delete(e.target.id)
        }
        const best = [...visible.entries()].sort((a, b) => b[1] - a[1])[0]
        if (best) setActive(best[0])
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return active
}

export function SiteHeader() {
  const active = useActiveSection()
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#home" className="font-serif text-2xl">
          {CONTENT.hero.judul} <i className="text-accent">{CONTENT.hero.sorot}</i>
        </a>
        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 sm:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? 'true' : undefined}
              className={cn(
                'relative rounded-full px-4 py-1.5 text-sm transition-colors',
                active === s.id ? 'text-ink' : 'text-muted hover:text-ink',
              )}
            >
              {active === s.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-pink"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {s.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}

export function BottomNav() {
  const active = useActiveSection()
  return (
    <nav
      aria-label="Navigasi bawah"
      className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+10px)] z-40 rounded-full border border-line bg-bg/85 p-1.5 shadow-[0_10px_30px_-12px_rgb(80_30_60/0.35)] backdrop-blur-md sm:hidden"
    >
      <ul className="grid grid-cols-4">
        {SECTIONS.map((s) => {
          const Icon = s.icon
          const on = active === s.id
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={on ? 'true' : undefined}
                className={cn(
                  'relative flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[11px] font-semibold transition-colors',
                  on ? 'text-ink' : 'text-muted',
                )}
              >
                {on && (
                  <motion.span
                    layoutId="bottom-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-pink"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="size-[18px]" aria-hidden />
                {s.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
