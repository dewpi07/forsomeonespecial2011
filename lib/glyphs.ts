// SVG path (viewBox 0 0 24 24). Dipakai pengganti karakter dingbat (✿ ❀ ✦ ♡)
// karena font di sebagian perangkat tidak punya glyph-nya dan tampil sebagai kotak.
export const GLYPH_PATHS = {
  heart: 'M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 4.3 2.6h2c.7-1.4 2.2-2.6 4.3-2.6 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z',
  sparkle: 'M12 1.5c.6 5.4 3.6 9.4 10.5 10.5-6.9 1.1-9.9 5.1-10.5 10.5C11.4 17.1 8.4 13.1 1.5 12 8.4 10.9 11.4 6.9 12 1.5z',
  flower:
    'M12 8.2a3.4 3.4 0 1 1 3.3-4.3A3.4 3.4 0 1 1 19 9.6a3.4 3.4 0 1 1-1.4 5.6 3.4 3.4 0 1 1-5.6 3.5 3.4 3.4 0 1 1-5.6-3.5A3.4 3.4 0 1 1 5 9.6a3.4 3.4 0 1 1 3.7-5.7A3.4 3.4 0 0 1 12 8.2zm0 1.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4z',
  petal: 'M12 2C7 7 5 11 5 14.5A7 7 0 0 0 12 22a7 7 0 0 0 7-7.5C19 11 17 7 12 2z',
} as const

export type GlyphName = keyof typeof GLYPH_PATHS

// Membuat elemen SVG lewat DOM API (tanpa innerHTML)
export function glyphEl(name: GlyphName) {
  const ns = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(ns, 'svg')
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('width', '1em')
  svg.setAttribute('height', '1em')
  svg.setAttribute('fill', 'currentColor')
  svg.setAttribute('aria-hidden', 'true')
  const path = document.createElementNS(ns, 'path')
  path.setAttribute('fill-rule', 'evenodd')
  path.setAttribute('d', GLYPH_PATHS[name])
  svg.appendChild(path)
  return svg
}

export function glyphSvg(name: GlyphName) {
  return `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="${GLYPH_PATHS[name]}"/></svg>`
}
