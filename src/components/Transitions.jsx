import { useRef } from 'react'
import { clamp, seeded, useScrollScene } from '../lib/motion'
import { tree } from '../lib/draw'
import { playCall, playRush } from '../sound/audio'

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

// Where the river trail starts on the Experience section, so the channel lines up with it exactly.
function riverStart() {
  const wrap = document.querySelector('#experience .trail-wrap')
  const mobile = window.innerWidth <= 860
  if (!wrap) return { cx: document.documentElement.clientWidth / 2, half: mobile ? 13 : 30 }
  const r = wrap.getBoundingClientRect()
  return { cx: r.left + (mobile ? 22 : r.width / 2), half: mobile ? 13 : 30 }
}

// the open water of the marsh narrows into a river channel; reeds give way to trees, and a muskrat swims upstream
function paintMarshToRiver(w, h, band) {
  const rnd = seeded(53)
  const { cx, half } = riverStart()
  const halfAt = y => {
    const u = clamp((y - h * 0.08) / (h * 0.92), 0, 1)
    const e = 1 - Math.pow(1 - u, 2.2)
    return (w / 2) * (1 - e) + half * e
  }
  const centerAt = y => w / 2 + (cx - w / 2) * clamp(y / h, 0, 1)
  let left = ''
  let right = ''
  for (let y = 0; y <= h; y += h / 30) left += `${left ? 'L' : 'M'}${(centerAt(y) - halfAt(y)).toFixed(1)} ${y.toFixed(1)} `
  for (let y = h; y >= 0; y -= h / 30) right += `L${(centerAt(y) + halfAt(y)).toFixed(1)} ${y.toFixed(1)} `
  let g = `<rect width="${w}" height="${h}" fill="var(--bg)"/><path d="${left}${right}Z" fill="var(--sea-1)"/>`
  for (let i = 0; i < 18; i++) {
    const y = h * (0.05 + rnd() * 0.8)
    const c = centerAt(y)
    const hw = halfAt(y) * 0.7
    g += `<path d="M${c - hw * rnd()} ${y} h${12 + rnd() * 40}" stroke="#fff" stroke-width="1.6" opacity=".5"/>`
  }
  for (let y = h * 0.1; y < h; y += 20 + rnd() * 28) {
    for (const s of [-1, 1]) {
      const bank = centerAt(y) + s * (halfAt(y) + 8 + rnd() * 30)
      const x = bank + s * rnd() * (w * 0.4)
      if (x < -20 || x > w + 20) continue
      if (y < h * 0.5) {
        const hh = 20 + rnd() * 40
        g += `<path d="M${x} ${y} Q${x + 3} ${y - hh / 2} ${x + 2} ${y - hh}" stroke="var(--reed)" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
      } else if (rnd() > 0.25) {
        g += tree(rnd, x, y, 0.7 + (y / h) * 0.6)
      }
    }
  }
  const musk = band.querySelector('.tr-animal')
  if (musk) {
    musk.style.left = `${centerAt(h * 0.62) - 35}px`
    musk.style.top = `${h * 0.62 - 17}px`
  }
  return g
}

// the stream climbs through the woods, over a short stretch of rocky rapids, and opens into the spring-fed pond
function paintRiverToSpring(w, h, band) {
  const rnd = seeded(67)
  const mobile = w < 700
  const { cx } = riverStart()
  const base = mobile ? 9 : 14
  const start = mobile ? 4 : 7
  // pick up exactly where the river left off, then ease toward the middle of the screen
  const ease = t => {
    const u = clamp(t / 0.25, 0, 1)
    return u * u * (3 - 2 * u)
  }
  const X = t => cx + (w / 2 + Math.sin(t * Math.PI * 1.4) * (mobile ? w * 0.1 : 40) - cx) * ease(t)
  const HW = t => start + (base - start) * ease(t) + (t > 0.25 && t < 0.7 ? Math.sin(((t - 0.25) / 0.45) * Math.PI) * (mobile ? 12 : 24) : 0)

  let g = `<defs>${gradient('river-spring', 'var(--bg)', 'var(--bg)', 'var(--pond-bg)')}</defs><rect width="${w}" height="${h}" fill="url(#river-spring)"/>`
  for (let y = 30; y < h + 30; y += 24 + rnd() * 28) {
    const t = clamp(y / h, 0, 1)
    for (let k = 0; k < 5; k++) {
      if (rnd() > 0.3 + t * 0.8) continue
      const s = rnd() > 0.5 ? 1 : -1
      const x = X(t) + s * (HW(t) + 46 + rnd() * w * 0.45)
      if (x > -20 && x < w + 20) g += tree(rnd, x, y, (mobile ? 0.55 : 0.7) + t * 0.7)
    }
  }
  let left = ''
  let right = ''
  for (let t = 0; t <= 1.0001; t += 0.025) left += `${left ? 'L' : 'M'}${(X(t) - HW(t)).toFixed(1)} ${(t * h).toFixed(1)} `
  for (let t = 1; t >= -0.0001; t -= 0.025) right += `L${(X(t) + HW(t)).toFixed(1)} ${(t * h).toFixed(1)} `
  g += `<path d="${left}${right}Z" fill="var(--sea-1)"/>`
  // rocks in the current with white water curling around their upstream side
  for (const [t, o] of [
    [0.31, -0.45],
    [0.37, 0.5],
    [0.44, -0.1],
    [0.5, 0.55],
    [0.56, -0.55],
    [0.62, 0.3],
  ]) {
    const x = X(t) + o * HW(t)
    const y = t * h
    const r = (mobile ? 6 : 10) + rnd() * 5
    g += `<ellipse cx="${x}" cy="${y}" rx="${r * 1.3}" ry="${r}" fill="var(--rock)"/><ellipse cx="${x - r * 0.3}" cy="${y - r * 0.3}" rx="${r * 0.6}" ry="${r * 0.35}" fill="#fff" opacity=".25"/>`
    g += `<path d="M${x - r * 1.6} ${y - r * 0.1} Q${x} ${y - r * 2} ${x + r * 1.6} ${y - r * 0.1}" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round"/>`
    g += `<path d="M${x - r * 1.1} ${y - r * 1.5} Q${x} ${y - r * 2.6} ${x + r * 1.1} ${y - r * 1.5}" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>`
  }
  for (let i = 0; i < 10; i++) {
    const t = 0.28 + rnd() * 0.4
    const x = X(t) + (rnd() - 0.5) * HW(t) * 1.2
    g += `<path d="M${x - 5} ${t * h} h10" stroke="#fff" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>`
  }
  for (const [t, s] of [
    [0.4, -1],
    [0.52, 1],
    [0.3, 1],
  ]) {
    g += `<ellipse cx="${X(t) + s * (HW(t) + 10)}" cy="${t * h}" rx="${mobile ? 12 : 18}" ry="${mobile ? 8 : 11}" fill="var(--rock-dark)" opacity=".9"/>`
  }
  g += `<ellipse cx="${w / 2}" cy="${h + 30}" rx="${Math.min(w * 0.45, 360)}" ry="70" fill="var(--sea-1)"/>`
  // a turtle basking on a flat rock just below the rapids
  const tt = 0.8
  g += `<ellipse cx="${X(tt) + HW(tt) + (mobile ? 24 : 29)}" cy="${tt * h + 8}" rx="${mobile ? 24 : 30}" ry="${mobile ? 8 : 10}" fill="var(--rock)"/>`
  const turtle = band.querySelector('.tr-animal')
  if (turtle) {
    Object.assign(turtle.style, {
      left: `${X(tt) + HW(tt) + 2}px`,
      top: `${tt * h - 16}px`,
      width: mobile ? '44px' : '54px',
      height: mobile ? '22px' : '27px',
    })
  }
  return g
}

function Band({ paint, height, mobileHeight, onScroll, children }) {
  const bandRef = useRef(null)
  const svgRef = useRef(null)
  useScrollScene(() => {
    const svg = svgRef.current
    if (!svg) return
    const w = document.documentElement.clientWidth
    const h = window.innerWidth <= 860 ? mobileHeight : height
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`)
    svg.setAttribute('height', h)
    svg.innerHTML = paint(w, h, bandRef.current)
  }, onScroll && (() => onScroll(bandRef.current)))
  return (
    <div className="tr" ref={bandRef}>
      <svg className="tr-art" ref={svgRef} aria-hidden="true" />
      {children}
    </div>
  )
}

export function CoastToMarsh() {
  return <Band paint={paintCoastToMarsh} height={260} mobileHeight={180} />
}

export function MarshToRiver() {
  return (
    <Band paint={paintMarshToRiver} height={360} mobileHeight={260}>
      <svg className="tr-animal swim" viewBox="0 0 70 34" data-name="muskrat" onClick={() => playCall('swim')}>
        <use href="#muskrat" />
      </svg>
    </Band>
  )
}

// play the sound of the rapids once each time the climb comes into view
let heardRapids = false
function listenForRapids(band) {
  if (!band) return
  const top = band.getBoundingClientRect().top
  if (!heardRapids && top < window.innerHeight * 0.7) {
    heardRapids = true
    playRush()
  }
  if (top > window.innerHeight) heardRapids = false
}

export function RiverToSpring() {
  return (
    <Band paint={paintRiverToSpring} height={380} mobileHeight={260} onScroll={listenForRapids}>
      <svg className="tr-animal" viewBox="0 0 32 16" data-name="eastern painted turtle" onClick={() => playCall('plop')}>
        <use href="#turtle" />
      </svg>
    </Band>
  )
}
