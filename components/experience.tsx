'use client'

import { useState } from 'react'
import { FallingPetals, ScrollProgress, TapBurst } from '@/components/ambient-fx'
import { BentoGrid } from '@/components/bento/bento-grid'
import { Hero } from '@/components/hero'
import { Loader } from '@/components/loader'
import { MobileGallery } from '@/components/mobile-gallery'
import { MusicDock } from '@/components/music-dock'
import { AudioProvider } from '@/components/providers/audio-provider'
import { GalleryProvider } from '@/components/providers/gallery-provider'
import { BottomNav, SiteHeader } from '@/components/site-nav'
import { CONTENT } from '@/lib/content'
import { Glyph } from '@/components/glyph'

export function Experience() {
  const [ready, setReady] = useState(false)

  return (
    <AudioProvider>
      <GalleryProvider>
        <Loader onDone={() => setReady(true)} />
        <ScrollProgress />
        <FallingPetals />
        <TapBurst />
        <SiteHeader />

        <main className="mx-auto max-w-6xl px-4 pb-32 sm:px-6 sm:pb-24">
          <Hero started={ready} />
          <section id="galeri" aria-label="Kenangan" className="mt-6 scroll-mt-24 space-y-6 sm:mt-8">
            <MobileGallery />
            <BentoGrid />
          </section>
          <footer className="mt-12 text-center text-sm text-muted">
            <p>
              dibuat dengan <Glyph name="heart" className="inline text-accent" /> untuk {CONTENT.nama}
            </p>
          </footer>
        </main>

        <MusicDock />
        <BottomNav />
      </GalleryProvider>
    </AudioProvider>
  )
}
