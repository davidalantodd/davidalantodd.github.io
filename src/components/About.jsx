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

const Tags = ({ items }) => (
  <div className="tags mono">
    {items.map(t => (
      <span key={t}>{t}</span>
    ))}
  </div>
)

// Every sign opens like a field-guide plate: the bird at that stop, the topic, and the bird's name.
function SignHead({ index, label }) {
  const bird = BIRDS[index]
  return (
    <header className="sign-head">
      <svg className="sign-bird" viewBox={bird.viewBox} style={bird.colors} aria-hidden="true">
        <use href={`#${bird.symbol}`} />
      </svg>
      <span className="kicker">{label}</span>
      <em>· {bird.name}</em>
    </header>
  )
}

// Every sign has the same shape: field-guide header, heading, one short paragraph, labeled rows.
// The words are David's own, from the original About page.
function Signs({ onFocusStop }) {
  return (
    <>
      <article className="sign" onFocus={() => onFocusStop(0)}>
        <SignHead index={0} label="Hello" />
        <h3 className="with-photo">
          <img src={headshot} alt="" width="48" height="48" />
          David Todd
        </h3>
        <p>
          I&apos;m a mission-driven software engineer who builds things that help people, combining engineering with my background in education.
        </p>
        <div className="field">
          <Row label="Home">
            <span>Maryland → Athens, GA → Boston, MA → Washington, D.C.</span>
          </Row>
          <Row label="Pronouns">
            <span>he/him</span>
          </Row>
          <Row label="Works at">
            <span>
              <a href="https://www.saic.com/" target="_blank" rel="noreferrer">SAIC</a>, full-stack developer
            </span>
          </Row>
        </div>
      </article>

      <article className="sign" onFocus={() => onFocusStop(1)}>
        <SignHead index={1} label="Software engineering" />
        <h3>Full stack, people first</h3>
        <p>
          Since transitioning to software engineering in 2022, I&apos;ve built full-stack apps for clients, mentored junior engineers, and led the
          integration of AI tools. My goal is to combine my technical skills and experiences in education to build software that solves meaningful
          problems.
        </p>
        <div className="field">
          <Row label="Currently using">
            <Tags items={['Vue', 'C#/.NET', 'PostgreSQL', 'AWS', 'Docker', 'Node']} />
          </Row>
          <Row label="Experienced in">
            <Tags items={['TypeScript', 'React', 'Java/Spring', 'Python']} />
          </Row>
          <Row label="Interested in">
            <span>human-computer interaction, accessibility, and AI</span>
          </Row>
        </div>
      </article>

      <article className="sign" onFocus={() => onFocusStop(2)}>
        <SignHead index={2} label="Education" />
        <h3>Seven years on campus</h3>
        <p>
          I spent the first 7 years of my career as a college administrator, and the skills I learned during that time (collaboration, leadership,
          and problem solving) have become my biggest strengths as a developer.
        </p>
        <div className="field">
          <Row label="Experienced in">
            <span>
              one-to-one coaching, teaching &amp; workshop facilitation, program management, data analysis &amp; assessment, and anti-oppression education
            </span>
          </Row>
          <Row label="Interested in">
            <span>
              inclusive education &amp; DEI, applied learning, growth mindset, radical candor, and group dynamics
            </span>
          </Row>
        </div>
      </article>

      <article className="sign" onFocus={() => onFocusStop(3)}>
        <SignHead index={3} label="Outside of work" />
        <h3>A few of my favorite things</h3>
        <div className="field">
          <Row label="Music">
            <span>Audrey Hobert, Demi Lovato, Tori Kelly</span>
          </Row>
          <Row label="Musicals">
            <span>Spring Awakening, Six, Songs for a New World</span>
          </Row>
          <Row label="TV">
            <span>Abbott Elementary, RHOSLC, Bob&apos;s Burgers</span>
          </Row>
          <Row label="Books">
            <span>
              <a href="https://www.goodreads.com/book/show/49127718-anxious-people" target="_blank" rel="noreferrer">Anxious People</a>,{' '}
              <a href="https://www.goodreads.com/book/show/58733693-remarkably-bright-creatures" target="_blank" rel="noreferrer">Remarkably Bright Creatures</a>
            </span>
          </Row>
          <Row label="Game">
            <span>
              <a href="https://zelda.nintendo.com/tears-of-the-kingdom" target="_blank" rel="noreferrer">Zelda: Tears of the Kingdom</a>
            </span>
          </Row>
          <Row label="Hobbies">
            <span>birding (hence the theme!), singing, gardening, the gym, the beach, and travel, often with my husband and son</span>
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
    // all four signs share one text size and one height, so the walk has an even rhythm
    signs.forEach((s, i) => {
      s.style.left = `${stopX[i] - signW / 2}px`
      s.style.width = `${signW}px`
      s.style.removeProperty('--fit')
      s.style.minHeight = ''
    })
    let fit = 1
    for (let pass = 0; pass < 3; pass++) {
      const tallest = Math.max(...signs.map(s => s.offsetHeight))
      if (tallest <= room) break
      fit *= room / tallest
      signs.forEach(s => s.style.setProperty('--fit', fit.toFixed(3)))
    }
    const tallest = Math.max(...signs.map(s => s.offsetHeight))
    signs.forEach(s => {
      s.style.minHeight = `${tallest}px`
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

    const hdr = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hdr')) || 60
    state.current = { VW, travel, stopX, hdr, active: -2 }
  }

  const update = () => {
    const walk = walkRef.current
    if (!walk) return
    const { VW, travel, stopX, hdr } = state.current
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
    const { VW, travel, stopX, hdr } = state.current
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
