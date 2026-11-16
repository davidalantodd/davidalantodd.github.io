import { useEffect, useRef, useState } from 'react'
import Letters from './Letters'
import BirdId from './BirdId'
import { playCall } from '../sound/audio'
import { clamp, prefersReducedMotion, useScrollScene } from '../lib/motion'

// one sentence, written into the sand a piece at a time as the sandpiper walks
const LINES = [
  'I build software that helps people.',
  'Before that, I coached engineers',
  'and mentored college students.',
]

const WAVES = [
  { className: 'w1', d: 'M0 80 Q100 60 200 80 T400 80 T600 80 T800 80 T1000 80 T1200 80 T1400 80 T1600 80 V150 H0Z', fill: 'var(--sea-1)' },
  { className: 'w2', d: 'M0 100 Q80 84 160 100 T320 100 T480 100 T640 100 T800 100 T960 100 T1120 100 T1280 100 T1440 100 T1600 100 V150 H0Z', fill: 'var(--sea-2)' },
  { className: 'w3', d: 'M0 124 Q100 112 200 124 T400 124 T600 124 T800 124 T1000 124 T1200 124 T1400 124 T1600 124 V150 H0Z', fill: 'var(--sea-3)' },
]

function Home() {
  const beachRef = useRef(null)
  const walkRef = useRef(null)
  const piperRef = useRef(null)
  const tracksRef = useRef(null)
  const inlandRef = useRef(null)
  const path = useRef({ pts: [], segs: [], total: 0, prints: [], stopT: [], last: 99 })

  // a gentle nudge to scroll, only if the visitor sits on the first screen for a few seconds without moving
  const [showHint, setShowHint] = useState(false)
  useEffect(() => {
    if (window.scrollY > 40) return
    const timer = setTimeout(() => setShowHint(true), 4000)
    const onScroll = () => {
      if (window.scrollY < 40) return
      clearTimeout(timer)
      setShowHint(false)
      window.removeEventListener('scroll', onScroll)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Map the walk: from the top of the beach, past each line, to the marsh link.
  // Footprints are laid along that path and appear as the sandpiper passes them.
  const layout = () => {
    const walk = walkRef.current
    if (!walk) return
    const lines = [...walk.querySelectorAll('.line')]
    const wr = walk.getBoundingClientRect()
    const rel = r => ({ x: r.left - wr.left, y: r.top - wr.top })
    const pts = [{ x: 8, y: 34 }]
    lines.forEach(line => {
      const r = rel(line.querySelector('.text').getBoundingClientRect())
      pts.push({ x: r.x, y: r.y - 40 })
    })
    const ir = inlandRef.current.getBoundingClientRect()
    const ip = rel(ir)
    pts.push({ x: ip.x - 20, y: ip.y + ir.height / 2 - 26 })

    const segs = []
    let total = 0
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1]
      const b = pts[i]
      const len = Math.hypot(b.x - a.x, b.y - a.y)
      segs.push({ a, b, len, start: total })
      total += len
    }

    const tracks = tracksRef.current
    tracks.innerHTML = ''
    const prints = []
    let k = 0
    segs.forEach(sg => {
      const ang = Math.atan2(sg.b.y - sg.a.y, sg.b.x - sg.a.x)
      const nx = -Math.sin(ang)
      const ny = Math.cos(ang)
      for (let d = 10; d < sg.len; d += 16) {
        const side = k++ % 2 ? 4 : -4
        const f = document.createElement('span')
        f.className = 'fp'
        f.style.left = `${sg.a.x + Math.cos(ang) * d + nx * side}px`
        f.style.top = `${sg.a.y + Math.sin(ang) * d + ny * side + 30}px`
        f.style.transform = `rotate(${(ang * 180) / Math.PI + 90}deg)`
        tracks.appendChild(f)
        prints.push({ el: f, t: sg.start + d })
      }
    })
    path.current = { pts, segs, total, prints, stopT: lines.map((_, i) => segs[i].start + segs[i].len), last: 99 }
    update()
    path.current.last = -1
  }

  const pointAt = L => {
    const { segs, pts } = path.current
    for (const sg of segs) {
      if (L <= sg.start + sg.len) {
        const u = sg.len ? (L - sg.start) / sg.len : 0
        return { x: sg.a.x + (sg.b.x - sg.a.x) * u, y: sg.a.y + (sg.b.y - sg.a.y) * u, dir: sg.b.x >= sg.a.x ? 1 : -1 }
      }
    }
    const end = pts[pts.length - 1]
    return { x: end.x, y: end.y, dir: 1 }
  }

  const update = () => {
    const p = path.current
    if (!p.segs.length || !beachRef.current) return
    const reduce = prefersReducedMotion()
    const r = beachRef.current.getBoundingClientRect()
    // the walk starts only once the beach has scrolled well into view, so the first screen stays clean
    const progress = reduce ? 1 : clamp((window.innerHeight * 0.55 - r.top) / (r.height * 0.95), 0, 1)
    const L = progress * p.total
    const pt = pointAt(L)
    const hop = reduce ? 0 : Math.abs(Math.sin(L / 9)) * 3
    piperRef.current.style.transform = `translate(${pt.x - 23}px, ${pt.y - hop}px) scaleX(${pt.dir})`
    p.prints.forEach(f => f.el.classList.toggle('on', f.t <= L))
    let reached = -1
    walkRef.current.querySelectorAll('.line').forEach((line, i) => {
      const on = L >= p.stopT[i] - 2
      line.classList.toggle('on', on)
      if (on) reached = i
    })
    if (reached > p.last) playCall('peep')
    // once the sandpiper finishes writing, the header may point out that the birds have sound
    if (reached === p.stopT.length - 1 && p.last < reached) window.dispatchEvent(new Event('sound:hint'))
    p.last = reached
  }

  useScrollScene(layout, update)

  return (
    <section className="page" id="home">
      <div className="gutter">
        <div className="inner hero">
          <Letters text="david alan todd" className="name" fx="bob" instrument="bell" />
          <h2 className="subtitle">mission-driven software engineer</h2>
          <p className={showHint ? 'scroll-hint show' : 'scroll-hint'} aria-hidden={!showHint}>
            scroll to follow the sandpiper ↓
          </p>
        </div>
      </div>

      <div className="sea">
        <div className="sun" aria-hidden="true" />
        {WAVES.slice(0, 2).map(w => (
          <svg key={w.className} className={`wave ${w.className}`} viewBox="0 0 1600 150" preserveAspectRatio="none" aria-hidden="true">
            <path d={w.d} fill={w.fill} />
          </svg>
        ))}
        <BirdId name="surf scoter" className="scoter" symbol="scoter" viewBox="0 0 44 24" call="whistle" />
        <svg className={`wave ${WAVES[2].className}`} viewBox="0 0 1600 150" preserveAspectRatio="none" aria-hidden="true">
          <path d={WAVES[2].d} fill={WAVES[2].fill} />
        </svg>
      </div>

      <div className="beach gutter" ref={beachRef}>
        <div className="inner walk" ref={walkRef}>
          <div className="tracks" ref={tracksRef} aria-hidden="true" />
          <div className="piper" ref={piperRef} aria-hidden="true">
            <svg viewBox="0 0 60 46">
              <use href="#sandpiper" />
            </svg>
          </div>
          <div className="lines">
            {LINES.map((text, i) => (
              <p className="line" style={{ '--i': i }} key={text}>
                <span className="text">{text}</span>
              </p>
            ))}
          </div>
          <div className="marsh-edge">
            <a className="onward" href="#about" ref={inlandRef}>
              <span>Into the marsh ↓</span>
              <svg aria-hidden="true">
                <use href="#reeds-icon" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
