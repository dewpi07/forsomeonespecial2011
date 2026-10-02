import { GLYPH_PATHS, type GlyphName } from '@/lib/glyphs'

export function Glyph({ name, className }: { name: GlyphName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden className={className}>
      <path fillRule="evenodd" d={GLYPH_PATHS[name]} />
    </svg>
  )
}
