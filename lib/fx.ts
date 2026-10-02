import { glyphEl, type GlyphName } from '@/lib/glyphs'

const GLYPHS: GlyphName[] = ['heart', 'sparkle', 'flower', 'heart', 'petal']
const COLORS = ['var(--accent)', 'var(--gold)', '#f7a8c4', '#b79cf0']

function reducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function burst(x: number, y: number, count = 6, spread = 160) {
  if (reducedMotion()) return
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span')
    el.className = 'burst-particle'
    el.setAttribute('aria-hidden', 'true')
    el.appendChild(glyphEl(GLYPHS[i % GLYPHS.length]))
    const t = 0.9 + Math.random() * 0.6
    el.style.cssText = `left:${x}px;top:${y}px;font-size:${14 + Math.random() * 14}px;color:${COLORS[i % COLORS.length]};--dx:${Math.random() * spread - spread / 2}px;--dy:${-(50 + Math.random() * 120)}px;--t:${t}s`
    document.body.appendChild(el)
    window.setTimeout(() => el.remove(), t * 1000 + 100)
  }
}

export function burstFrom(target: Element, count = 8) {
  const r = target.getBoundingClientRect()
  burst(r.left + r.width / 2, r.top + r.height / 2, count)
}

export function haptic() {
  try {
    navigator.vibrate?.(10)
  } catch {}
}
