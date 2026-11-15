import { useRef } from 'react'
import Letters from './Letters'
import BirdId from './BirdId'
import headshot from '../assets/headshot-400.jpg'
import { playCall } from '../sound/audio'
import { clamp, replay, seeded, useScrollScene } from '../lib/motion'

// The four stops along the boardwalk, each with the bird that lives there.
const BIRDS = [
  { name: 'wood duck', call: 'quack', symbol: 'duck', viewBox: '0 0 34 20', colors: { '--body': '#9a7a62', '--wing': '#4a5a8a', '--head': '#2f7a54', '--crest': '#2f7a54', '--ring': '#fff', '--beak': '#d0623c' } },
  { name: 'green heron', call: 'croak', symbol: 'heron', viewBox: '0 0 40 60', colors: { '--body': '#4f6f5a', '--crest': '#3a2a1a', '--beak': '#e3a23c' } },
  { name: 'red-winged blackbird', call: 'conk', symbol: 'songbird', viewBox: '0 0 30 22', colors: { '--body': '#1f2830', '--patch': '#e8463c', '--beak': '#555' } },
  { name: 'marsh wren', call: 'trill', symbol: 'songbird', viewBox: '0 0 30 22', colors: { '--body': '#9a7a52', '--belly': '#e9dcc4', '--head': '#7a5a3a', '--wing': '#7a5a3a', '--tail': '#6a4a2a' } },
]

const Row = ({ label, children }) => (
  <div className="field-row">
    <b>{label}</b>
    {children}
  </div>
)

const Tags = ({ items, mono }) => (
  <div className={mono ? 'tags mono' : 'tags'}>
    {items.map(t => (
      <span key={t}>{t}</span>
    ))}
  </div>
)

// The sign layout from the mockup, filled with David's own wording from the original About page.
function Signs({ onFocusStop }) {
  return (
    <>
      <article className="sign" onFocus={() => onFocusStop(0)}>
        <div className="who">
          <img src={headshot} alt="Headshot of David Todd" width="92" height="92" />
          <div>
            <b>David Todd</b>
            <span>he/him · Washington, D.C.</span>
          </div>
        </div>
        <p>
          Hello! My name is David and I&apos;m a mission-driven software engineer who likes to build things that help people. Currently a full-stack
          software developer at <a href="https://www.saic.com/">SAIC</a>. I was born and raised in Maryland and I currently live in Washington, D.C.
        </p>
        <p>
          I have always had an interest in the intersection of people and technology and am grateful to be able to combine my software engineering
          skills with my experiences in education.
        </p>
      </article>

      <article className="sign" onFocus={() => onFocusStop(1)}>
        <span className="kicker">Software engineering</span>
        <h3>Building software that solves meaningful problems</h3>
        <p>
          Since transitioning to software engineering in 2022, I&apos;ve built full-stack apps for clients, mentored junior engineers, and led the
          integration of AI tools. My goal is to combine my technical skills and experiences in education to build software that solves meaningful
          problems.
        </p>
        <div className="field">
          <Row label="Mostly using">
            <Tags mono items={['Vue.js', 'C#/.NET', 'PostgreSQL', 'AWS', 'Docker']} />
          </Row>
          <Row label="Experience with">
            <Tags mono items={['TypeScript', 'Node', 'React', 'Java/Spring', 'Python']} />
          </Row>
          <Row label="Interested in">
            <span>human-computer interaction, accessibility, and AI</span>
          </Row>
        </div>
      </article>

      <article className="sign" onFocus={() => onFocusStop(2)}>
        <span className="kicker">Education</span>
        <p>
          I spent the first 7 years of my career as a college administrator, and the skills I learned during that time (collaboration, leadership,
          and problem solving) have become my biggest strengths as a developer.
        </p>
        <div className="field">
          <Row label="Experienced in">
            <Tags
              items={[
                'one-to-one coaching',
                'workshop facilitation',
                'teaching',
                'training',
                'student development',
                'program management',
                'data analysis & assessment',
                'social justice/anti-oppression education',
              ]}
            />
          </Row>
          <Row label="Interested in">
            <Tags
              items={['DEI', 'inclusive education', 'teaching pedagogy', 'applied learning', 'flipped classrooms', 'radical candor', 'growth mindset', 'counseling', 'group dynamics']}
            />
          </Row>
        </div>
      </article>

      <article className="sign" onFocus={() => onFocusStop(3)}>
        <span className="kicker">Outside of work</span>
        <h3>A few of my favorite things</h3>
        <div className="field">
          <Row label="Music">
            <span>singing, and listening to music</span>
          </Row>
          <Row label="Reading">
            <span>
              a favorite: <a href="https://www.goodreads.com/book/show/49127718-anxious-people">Anxious People</a>
            </span>
          </Row>
          <Row label="Playing">
            <span>
              Nintendo Switch (current favorite: <a href="https://zelda.nintendo.com/tears-of-the-kingdom">Legend of Zelda: Tears of the Kingdom</a>)
            </span>
          </Row>
          <Row label="Watching">
            <span>some good TV (some favorites: Abbott Elementary, RHOSLC, and Bob&apos;s Burgers)</span>
          </Row>
          <Row label="Exploring">
            <span>birding, exploring the city, gardening, going to the beach, and traveling, often with my partner and our son</span>
          </Row>
          <Row label="Also">
            <span>going to the gym</span>
          </Row>
        </div>
      </article>
    </>
  )
}

// ---- scenery, drawn to the length of the walk ----

function paintFar(w, h) {
  const rnd = seeded(5)
  let hills = `M0 ${h * 0.52}`
  for (let x = 0; x <= w; x += 40) hills += ` L${x} ${h * 0.5 - rnd() * h * 0.07}`
  hills += ` L${w} ${h} L0 ${h}Z`
  let trees = ''
  for (let x = 10; x < w; x += 36 + rnd() * 60) {
    const th = h * (0.06 + rnd() * 0.07)
    const base = h * 0.54
    trees += `<path d="M${x} ${base - th} L${x - th * 0.35} ${base} H${x + th * 0.35}Z"/>`
  }
  return `<path d="${hills}" fill="var(--hill)" opacity=".7"/><g fill="var(--forest)" opacity=".55">${trees}</g>`
}

function paintMid(w, h) {
  const rnd = seeded(9)
  const waterY = h * 0.56
  let g = `<rect x="0" y="${waterY}" width="${w}" height="${h - waterY}" fill="var(--sea-1)"/>`
  for (let i = 0; i < w / 120; i++) {
    const x = rnd() * w
    const y = waterY + 14 + rnd() * (h - waterY - 30)
    g += `<path d="M${x} ${y} h${40 + rnd() * 80}" stroke="#fff" stroke-width="2" opacity=".45"/>`
  }
  for (let x = 0; x < w; x += 16 + rnd() * 40) {
    const hh = h * (0.06 + rnd() * 0.12)
    const base = waterY + 6 + rnd() * 10
    const lean = (rnd() - 0.5) * 10
    g += `<path d="M${x} ${base} Q${x + lean} ${base - hh / 2} ${x + lean * 1.4} ${base - hh}" stroke="var(--reed)" stroke-width="${(2 + rnd() * 2).toFixed(1)}" fill="none" stroke-linecap="round"/>`
    if (rnd() > 0.7) g += `<rect x="${x + lean * 1.4 - 3.5}" y="${base - hh}" width="7" height="${16 + rnd() * 8}" rx="3.5" fill="var(--cattail)"/>`
  }
  return g
}

function paintNear(w, h) {
  const rnd = seeded(17)
  let g = ''
  for (let x = 0; x < w; x += 120 + rnd() * 280) {
    const n = 2 + Math.floor(rnd() * 4)
    for (let i = 0; i < n; i++) {
      const xx = x + rnd() * 30
      const hh = h * (0.08 + rnd() * 0.1)
      const base = h + 4
      const lean = (rnd() - 0.5) * 16
      g += `<path d="M${xx} ${base} Q${xx + lean} ${base - hh / 2} ${xx + lean * 1.5} ${base - hh}" stroke="var(--reed-dark)" stroke-width="${(3 + rnd() * 3).toFixed(1)}" fill="none" stroke-linecap="round"/>`
      if (rnd() > 0.6) g += `<rect x="${xx + lean * 1.5 - 5}" y="${base - hh}" width="10" height="${24 + rnd() * 10}" rx="5" fill="var(--cattail)"/>`
    }
  }
  return g
}

const FAR = 0.35 // distant hills drift slowly
const NEAR = 1.3 // foreground reeds slide past a little faster

// About: a sideways walk along a boardwalk through the marsh.
// The stage sticks to the screen while you scroll, and scrolling down moves you sideways.
function About() {
  const walkRef = useRef(null)
  const stageRef = useRef(null)
  const farRef = useRef(null)
  const midRef = useRef(null)
  const nearRef = useRef(null)
  const state = useRef({ VW: 0, travel: 1, stopX: [], active: -2 })

  const layout = () => {
    const walk = walkRef.current
    const stage = stageRef.current
    if (!walk || !stage) return
    const VW = document.documentElement.clientWidth
    const SH = stage.clientHeight
    const mobile = VW < 700
    const mid = midRef.current
    const signs = [...mid.querySelectorAll('.sign')]
    const birds = [...mid.querySelectorAll('.h-bird')]
    const signW = Math.min(560, VW * 0.84)
    const gapW = mobile ? VW * 0.92 : Math.max(VW * 0.62, signW + 260)
    const startW = mobile ? VW * 0.9 : VW * 0.6
    const stopX = signs.map((_, i) => startW + i * gapW)
    const midW = startW + signs.length * gapW + (mobile ? VW * 0.6 : VW * 0.5)
    const travel = Math.max(midW - VW, 1)
    walk.style.height = `${SH + travel}px`

    const layers = [
      [farRef.current, VW + travel * FAR + 40, paintFar],
      [mid, midW, paintMid],
      [nearRef.current, VW + travel * NEAR + 40, paintNear],
    ]
    layers.forEach(([layer, w, paint]) => {
      layer.style.width = `${w}px`
      const svg = layer.querySelector('svg.paint')
      svg.setAttribute('viewBox', `0 0 ${w} ${SH}`)
      svg.setAttribute('width', w)
      svg.setAttribute('height', SH)
      svg.innerHTML = paint(w, SH)
    })
    farRef.current.querySelector('.h-sun').style.left = `${VW * 0.62}px`
    mid.querySelector('.boardwalk').style.width = `${midW - (mobile ? VW * 0.2 : VW * 0.25)}px`
    mid.querySelector('.h-intro').style.left = `${mobile ? 20 : VW * 0.1}px`
    // signs never scroll on their own; if one is taller than the space it has, it shrinks slightly to fit
    const room = mobile ? SH - 72 : SH * 0.79 - 60
    signs.forEach((s, i) => {
      s.style.left = `${stopX[i] - signW / 2}px`
      s.style.width = `${signW}px`
      s.style.removeProperty('--fit')
      let fit = 1
      for (let pass = 0; pass < 3 && s.offsetHeight > room; pass++) {
        fit *= room / s.offsetHeight
        s.style.setProperty('--fit', fit.toFixed(3))
      }
    })

    // each bird stands somewhere it would really be: on the water, the boardwalk, a cattail, the reeds
    const boardTop = SH * 0.79 - 26
    const spots = [
      { w: 120, h: 70, dx: signW / 2 + 30, y: SH - SH * 0.21 + 10 },
      { w: 110, h: 165, dx: signW / 2 + 20, y: boardTop - 165 + 30 },
      { w: 96, h: 70, dx: -signW / 2 - 110, y: SH * 0.32 },
      { w: 76, h: 56, dx: signW / 2 + 16, y: SH * 0.5 },
    ]
    birds.forEach((b, i) => {
      const s = mobile ? { ...spots[i], w: spots[i].w * 0.6, h: spots[i].h * 0.6 } : spots[i]
      const x = mobile ? stopX[i] + signW / 2 - s.w - 6 : stopX[i] + s.dx
      // on phones the signs fill most of the height, so the birds wait on the water below them
      const y = mobile ? SH - s.h - 58 : clamp(s.y, 10, SH - s.h - 6)
      Object.assign(b.style, { left: `${x}px`, top: `${y}px`, width: `${s.w}px`, height: `${s.h}px` })
    })

    // a great egret waits where the boardwalk ends
    const egret = mid.querySelector('.h-egret')
    const ew = mobile ? 60 : 96
    const eh = ew * 1.5
    const endX = midW - (mobile ? VW * 0.85 : VW * 0.45)
    Object.assign(egret.style, {
      left: `${mobile ? midW - ew - 16 : endX - ew - 50}px`,
      top: `${boardTop - eh + 34}px`,
      width: `${ew}px`,
      height: `${eh}px`,
    })

    state.current = { VW, travel, stopX, active: -2 }
  }

  const update = () => {
    const walk = walkRef.current
    if (!walk) return
    const { VW, travel, stopX } = state.current
    const hdr = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hdr')) || 60
    const x = clamp((hdr - walk.getBoundingClientRect().top) / travel, 0, 1) * travel
    if (stageRef.current.scrollLeft) stageRef.current.scrollLeft = 0
    farRef.current.style.transform = `translate3d(${-x * FAR}px,0,0)`
    midRef.current.style.transform = `translate3d(${-x}px,0,0)`
    nearRef.current.style.transform = `translate3d(${-x * NEAR}px,0,0)`

    const center = x + VW / 2
    let i = -1
    stopX.forEach((sx, k) => {
      if (center > sx - VW * 0.3) i = k
    })
    if (i === state.current.active) return
    const mid = midRef.current
    mid.querySelectorAll('.sign').forEach((s, k) => s.classList.toggle('act', k === i))
    mid.querySelectorAll('.h-bird').forEach((b, k) => {
      if (k === i) replay(b, 'act')
      else b.classList.remove('act')
    })
    stageRef.current.querySelectorAll('.h-hud i').forEach((d, k) => d.classList.toggle('on', k === i))
    if (state.current.active !== -2 && i >= 0) playCall(BIRDS[i].call)
    state.current.active = i
  }

  useScrollScene(layout, update)

  // keyboard users: tabbing into a sign scrolls the walk so that sign is in view
  const focusStop = i => {
    const walk = walkRef.current
    const { VW, travel, stopX } = state.current
    const hdr = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hdr')) || 60
    const top = walk.getBoundingClientRect().top + window.scrollY - hdr
    const x = clamp(stopX[i] - VW / 2, 0, travel)
    // the browser scrolls to the focused link after this event, so move the walk just after it does
    setTimeout(() => {
      stageRef.current.scrollLeft = 0
      window.scrollTo({ top: top + x, behavior: 'instant' })
    }, 0)
  }

  return (
    <section className="page marsh" id="about">
      <div className="gutter">
        <div className="inner page-head">
          <Letters text="about me" className="title" fx="sway" instrument="reed" />
        </div>
      </div>

      <div className="hwalk" ref={walkRef}>
        <div className="hstage" ref={stageRef}>
          <div className="layer" ref={farRef} aria-hidden="true">
            <div className="h-sun" />
            <svg className="paint" />
          </div>

          <div className="layer" ref={midRef}>
            <svg className="paint" aria-hidden="true" />
            <div className="boardwalk" aria-hidden="true" />
            <div className="h-intro" aria-hidden="true">
              <span className="arrow">→</span>
            </div>
            <Signs onFocusStop={focusStop} />
            {BIRDS.map(b => (
              <BirdId key={b.name} name={b.name} className="h-bird" symbol={b.symbol} viewBox={b.viewBox} colors={b.colors} call={b.call} />
            ))}
            <BirdId name="great egret" className="h-egret" symbol="heron" viewBox="0 0 40 60" colors={{ '--body': '#f4f4f0', '--crest': 'transparent', '--beak': '#e3b23c' }} call="croak" />
          </div>

          <div className="layer near-layer" ref={nearRef} aria-hidden="true">
            <svg className="paint near" />
          </div>

          <BirdId name="osprey" className="osprey" symbol="osprey" viewBox="0 0 64 26" call="osprey" />

          <div className="h-hud" aria-hidden="true">
            {BIRDS.map(b => (
              <i key={b.name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
