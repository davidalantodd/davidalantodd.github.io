import { useRef } from 'react'
import { playCall } from '../sound/audio'
import { replay, seeded, useScrollScene } from '../lib/motion'
import { GitHubIcon, LinkedInIcon } from './Icons'

function Footer() {
  const currentYear = new Date().getFullYear()
  const shoreRef = useRef(null)
  const birdRef = useRef(null)

  // the near shore of the spring pond: water fading in from above, lily pads, a grassy bank, reeds and a perch
  useScrollScene(() => {
    const svg = shoreRef.current
    if (!svg) return
    const w = document.documentElement.clientWidth
    const h = 110
    const rnd = seeded(83)
    const waves = n => Array.from({ length: Math.ceil(w / 60) + 1 }, (_, k) => n(k)).join(' ')
    let g =
      `<defs><linearGradient id="shore-fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--sea-1);stop-opacity:0"/><stop offset=".75" style="stop-color:var(--sea-1);stop-opacity:.8"/></linearGradient></defs>` +
      `<path d="M0 0 H${w} V34 ${waves(k => `Q${w - k * 60 - 30} ${40 + (k % 2 ? 6 : -2)} ${w - (k + 1) * 60} 36`)} V0Z" fill="url(#shore-fade)"/>` +
      `<path d="M0 36 ${waves(k => `Q${k * 60 + 30} ${40 + (k % 2 ? -2 : 6)} ${(k + 1) * 60} 36`)} V${h} H0Z" fill="var(--bank)"/>`
    for (let i = 0; i < w / 140; i++) g += `<ellipse cx="${rnd() * w}" cy="${12 + rnd() * 14}" rx="${16 + rnd() * 16}" ry="5" fill="#4cbf7f" opacity=".9"/>`
    for (let i = 0; i < w / 50; i++) g += `<ellipse cx="${rnd() * w}" cy="${50 + rnd() * 50}" rx="${3 + rnd() * 5}" ry="${2 + rnd() * 3}" fill="var(--rock)" opacity=".7"/>`
    for (const [x0, n] of [
      [24, 5],
      [w - 60, 6],
      [w * 0.38, 3],
      [w * 0.7, 4],
    ]) {
      for (let i = 0; i < n; i++) {
        const x = x0 + i * 7 + rnd() * 4
        const hh = 30 + rnd() * 40
        g += `<path d="M${x} 56 Q${x + 2} ${56 - hh / 2} ${x + 1} ${56 - hh}" stroke="var(--reed)" stroke-width="2.6" fill="none" stroke-linecap="round"/>`
        if (rnd() > 0.6) g += `<rect x="${x - 2.5}" y="${56 - hh}" width="5" height="12" rx="2.5" fill="var(--cattail)"/>`
      }
    }
    const px = Math.max(70, w * 0.2)
    g += `<path d="M${px - 4} 92 L${px + 4} 34" stroke="var(--trunk)" stroke-width="4" stroke-linecap="round"/><path d="M${px + 1} 58 l12 -8" stroke="var(--trunk)" stroke-width="2.5" stroke-linecap="round"/>`
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`)
    svg.innerHTML = g
    birdRef.current.style.left = `${px - 22}px`
  })

  const greet = () => {
    playCall('rattle')
    replay(birdRef.current, 'wag')
  }

  return (
    <footer className="site-foot">
      <div className="shore">
        <svg className="shore-art" ref={shoreRef} aria-hidden="true" />
        <svg className="foot-bird" ref={birdRef} viewBox="0 0 30 26" data-name="belted kingfisher" onMouseEnter={greet} onClick={greet}>
          <use href="#kingfisher" />
        </svg>
      </div>
      <div className="foot-band gutter">
      <div className="inner foot">
        <a className="next" href="#home">
          Back to the beach ↑
        </a>
        <div className="socials">
          <a href="https://www.linkedin.com/in/david-alan-todd" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <LinkedInIcon />
          </a>
          <a href="https://github.com/davidalantodd/" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
            <GitHubIcon />
          </a>
          <span>©{currentYear} David Todd</span>
        </div>
      </div>
      </div>
    </footer>
  )
}

export default Footer
