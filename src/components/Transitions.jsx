import { useRef } from 'react'
import { seeded, useScrollScene } from '../lib/motion'

// Short bands of scenery between habitats. Each one is drawn to the full width of the window
// with a fixed random seed, so it looks the same on every visit.

const gradient = (id, top, middle, bottom) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">` +
  `<stop offset="0" style="stop-color:${top}"/><stop offset=".45" style="stop-color:${middle}"/><stop offset="1" style="stop-color:${bottom}"/>` +
  `</linearGradient>`

// the sand gets wetter, puddles appear, reeds rise, and the sandpiper's tracks fade into the grass
function paintCoastToMarsh(w, h) {
  const rnd = seeded(41)
  let g = `<defs>${gradient('coast-marsh', 'var(--sand)', 'var(--sand-wet)', 'var(--dawn-1)')}</defs><rect width="${w}" height="${h}" fill="url(#coast-marsh)"/>`
  for (let i = 0; i < w / 80; i++) {
    const y = h * (0.25 + rnd() * 0.6)
    g += `<ellipse cx="${rnd() * w}" cy="${y}" rx="${16 + rnd() * 50 * (y / h)}" ry="${4 + rnd() * 6}" fill="var(--sea-1)" opacity="${(0.25 + (0.5 * y) / h).toFixed(2)}"/>`
  }
  for (let x = 0; x < w; x += 10 + rnd() * 36) {
    const base = h * (0.35 + rnd() * 0.65)
    if (rnd() > (base / h) * 1.1) continue
    const hh = (18 + rnd() * 60) * (base / h)
    const lean = (rnd() - 0.5) * 8
    g += `<path d="M${x} ${base} Q${x + lean} ${base - hh / 2} ${x + lean * 1.3} ${base - hh}" stroke="var(--reed)" stroke-width="${(2 + rnd() * 2).toFixed(1)}" fill="none" stroke-linecap="round"/>`
    if (rnd() > 0.75) g += `<rect x="${x + lean * 1.3 - 3}" y="${base - hh}" width="6" height="${12 + rnd() * 8}" rx="3" fill="var(--cattail)"/>`
  }
  for (let k = 0; k < 14; k++) {
    const u = k / 14
    const x = w * (0.86 - u * 0.3) + (k % 2 ? 4 : -4)
    const y = h * (0.04 + u * 0.7)
    g += `<ellipse cx="${x}" cy="${y}" rx="2.5" ry="3.5" fill="var(--sand-deep)" opacity="${(1 - u * 0.8).toFixed(2)}"/>`
  }
  return g
}

function Band({ paint, height, mobileHeight, children }) {
  const svgRef = useRef(null)
  useScrollScene(() => {
    const svg = svgRef.current
    if (!svg) return
    const w = document.documentElement.clientWidth
    const h = window.innerWidth <= 860 ? mobileHeight : height
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`)
    svg.setAttribute('height', h)
    svg.innerHTML = paint(w, h)
  })
  return (
    <div className="tr" aria-hidden="true">
      <svg className="tr-art" ref={svgRef} />
      {children}
    </div>
  )
}

export function CoastToMarsh() {
  return <Band paint={paintCoastToMarsh} height={260} mobileHeight={180} />
}
