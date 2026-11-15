import { useRef } from 'react'
import Letters from './Letters'
import { GitHubIcon, LaunchIcon } from './Icons'
import chickadeeShot from '../assets/chickadee-landing-960.jpg'
import musicalShot from '../assets/musical-app-960.jpg'
import adventShot from '../assets/adventofcode-960.jpg'
import { playCall } from '../sound/audio'
import { clamp, prefersReducedMotion, replay, useScrollScene } from '../lib/motion'

// Each project has an animal living at the spring. Descriptions are David's own wording.
const PROJECTS = [
  {
    name: 'Chickadee',
    animal: 'chickadee',
    shot: chickadeeShot,
    description: 'A web app to browse recent bird sightings worldwide, as a list or on a map, with filters by place and species, species photos, and shareable links.',
    stack: ['React', 'React Router', 'Leaflet', 'Bootstrap', 'Netlify Functions', 'eBird API'],
    source: 'https://github.com/davidalantodd/chickadee',
    live: 'https://chickadeeapp.netlify.app',
  },
  {
    name: 'Musical App',
    animal: 'frog',
    shot: musicalShot,
    description: 'A full-stack app to track musical theatre productions.',
    stack: ['C#/.NET', 'Angular', 'TypeScript', 'SCSS', 'PostgreSQL'],
    source: 'https://github.com/davidalantodd/musical-app',
  },
  {
    name: 'Advent of Code',
    animal: 'shimmer',
    shot: adventShot,
    description: 'Solutions to Advent of Code challenge problems.',
    stack: ['Ruby', 'Python', 'JavaScript', 'C', 'Go', 'PHP'],
    source: 'https://github.com/davidalantodd/advent-of-code',
  },
]

// where the view drifts for each project: the whole pond first, then a little closer to each animal
const FOCUS = [null, [110, 318], [180, 490], [440, 470]]
const ZOOM = 1.3

const tag = (x, y, w, label) =>
  `<g class="tag"><rect x="${x}" y="${y}" width="${w}" height="30" rx="15"/><text x="${x + w / 2}" y="${y + 20.5}" text-anchor="middle">${label}</text></g>`

// the spring-fed pond, drawn once
const POND = `
  <rect x="-200" y="-200" width="1000" height="1040" fill="var(--pond-scene)"/>
  <g fill="var(--pine)" opacity=".85"><path d="M-20 250 L20 90 L60 250Z"/><path d="M40 240 L80 120 L120 240Z"/><path d="M480 240 L520 110 L560 240Z"/><path d="M540 250 L585 80 L630 250Z"/><path d="M130 220 L160 140 L190 220Z"/></g>
  <g fill="var(--forest)" opacity=".8"><circle cx="230" cy="190" r="34"/><circle cx="270" cy="180" r="28"/><circle cx="350" cy="186" r="36"/><circle cx="420" cy="196" r="30"/><rect x="246" y="200" width="6" height="30" fill="var(--trunk)"/><rect x="380" y="206" width="6" height="26" fill="var(--trunk)"/></g>
  <ellipse cx="300" cy="420" rx="320" ry="200" fill="var(--pond-bank)"/>
  <ellipse cx="300" cy="420" rx="270" ry="160" fill="var(--sea-1)"/>
  <ellipse cx="300" cy="400" rx="150" ry="80" fill="var(--sea-2)" opacity=".14"/>
  <g class="spring">
    <ellipse class="spring-ring" cx="300" cy="390" rx="40" ry="16" fill="none" stroke="#fff" stroke-width="2"/>
    <g fill="#fff" opacity=".8"><circle class="bubble" cx="294" cy="392" r="3"/><circle class="bubble" cx="306" cy="394" r="2.4" style="animation-delay:-1.5s"/><circle class="bubble" cx="300" cy="388" r="2" style="animation-delay:-3s"/></g>
  </g>
  <g fill="var(--rock)"><ellipse cx="90" cy="350" rx="66" ry="24"/><ellipse cx="520" cy="360" rx="70" ry="24"/><ellipse cx="300" cy="590" rx="60" ry="16"/></g>
  <g stroke="var(--reed)" stroke-width="3" stroke-linecap="round" fill="none"><path d="M40 470 V400 M52 470 V412 M64 470 V420 M548 460 V392 M560 460 V404 M572 460 V414"/></g>
  <g fill="var(--cattail)"><rect x="37" y="398" width="6" height="16" rx="3"/><rect x="545" y="390" width="6" height="16" rx="3"/></g>
  <g class="flicker-g" data-call="drum">
    <rect x="536" y="120" width="16" height="250" rx="6" fill="var(--trunk)"/>
    <path d="M544 170 l30 -26 M544 230 l-24 -20" stroke="var(--trunk)" stroke-width="6" stroke-linecap="round"/>
    <g class="flicker-bird" data-name="northern flicker"><use href="#flicker" x="545" y="186" width="34" height="60"/></g>
  </g>
  <g class="animal-g" data-call="chickadee">
    ${tag(40, 236, 104, 'Chickadee')}
    <g class="dip" data-name="Carolina chickadee" data-label-pos="below"><use href="#chickadee" x="56" y="282" width="74" height="64"/></g>
  </g>
  <g class="animal-g" data-call="frog">
    ${tag(108, 412, 124, 'Musical App')}
    <ellipse cx="170" cy="506" rx="64" ry="18" fill="#4cbf7f"/><path d="M170 506 L234 502 L232 512Z" fill="var(--sea-1)"/>
    <g data-name="green frog" data-label-pos="below"><use href="#frog" x="137" y="470" width="66" height="44"/><ellipse class="throat" cx="170" cy="504" rx="10" ry="5" fill="#f2efc0"/></g>
    <g class="notes-up"><text x="190" y="468">♪</text><text x="176" y="462">♫</text><text x="202" y="464">♪</text></g>
  </g>
  <g class="animal-g" data-call="shimmer">
    ${tag(366, 388, 150, 'Advent of Code')}
    <g class="stars" fill="#f4c542"><path d="M390 410 l4 9 10 1 -8 6 3 10 -9 -6 -9 6 3 -10 -8 -6 10 -1Z"/><path d="M490 420 l3 7 8 1 -6 5 2 8 -7 -5 -7 5 2 -8 -6 -5 8 -1Z"/><path d="M480 510 l4 9 10 1 -8 6 3 10 -9 -6 -9 6 3 -10 -8 -6 10 -1Z"/><path d="M400 520 l3 7 8 1 -6 5 2 8 -7 -5 -7 5 2 -8 -6 -5 8 -1Z"/></g>
    <g class="dfly-path" data-name="blue dasher dragonfly" data-label-pos="below"><use href="#dragonfly" x="402" y="456" width="76" height="30"/></g>
  </g>
  <ellipse cx="420" cy="540" rx="30" ry="9" fill="#4cbf7f"/><circle cx="428" cy="536" r="6" fill="#f7c2cf"/>
`

function ProjectCard({ project, index }) {
  return (
    <article className="proj" data-index={index}>
      <div className="proj-card">
      {/* the screenshot opens the live app, or the code when there isn't one; the icons below are the keyboard-friendly links */}
      <a className="shot" href={project.live || project.source} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
        <img src={project.shot} alt="" loading="lazy" />
      </a>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <div className="tags mono">
        {project.stack.map(t => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="proj-links">
        <a href={project.source} target="_blank" rel="noreferrer" aria-label={`${project.name} source code on GitHub`} data-name="source code" data-label-pos="below">
          <GitHubIcon />
        </a>
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" aria-label={`Open the ${project.name} app`} data-name="deployed app" data-label-pos="below">
            <LaunchIcon />
          </a>
        )}
      </div>
      </div>
    </article>
  )
}

// Projects: a still pond scene beside the projects. As each project scrolls in,
// the view drifts a little closer to its animal, which lights up while the others fade back.
function Projects() {
  const svgRef = useRef(null)
  const listRef = useRef(null)
  const state = useRef({ active: -2, drummed: false, cur: [0, 0, 600, 640], target: [0, 0, 600, 640], raf: 0 })

  const viewFor = i => {
    if (!FOCUS[i]) return [0, 0, 600, 640]
    const w = 600 / ZOOM
    const h = 640 / ZOOM
    const [fx, fy] = FOCUS[i]
    return [clamp(fx - w / 2, 0, 600 - w), clamp(fy - h / 2, 0, 640 - h), w, h]
  }

  const glide = () => {
    const s = state.current
    let done = true
    s.cur = s.cur.map((v, k) => {
      const next = v + (s.target[k] - v) * 0.12
      if (Math.abs(next - s.target[k]) > 0.3) done = false
      return next
    })
    svgRef.current.setAttribute('viewBox', s.cur.map(n => n.toFixed(1)).join(' '))
    s.raf = done ? 0 : requestAnimationFrame(glide)
  }

  const setView = v => {
    const s = state.current
    s.target = v
    if (prefersReducedMotion()) {
      s.cur = v.slice()
      svgRef.current.setAttribute('viewBox', v.join(' '))
      return
    }
    if (!s.raf) s.raf = requestAnimationFrame(glide)
  }

  const update = () => {
    const svg = svgRef.current
    if (!svg) return
    const s = state.current
    const box = svg.getBoundingClientRect()

    // the flicker drums once when the pond first comes into view
    if (!s.drummed && box.top < window.innerHeight * 0.5 && box.bottom > 0) {
      s.drummed = true
      setTimeout(() => {
        playCall('drum')
        replay(svg.querySelector('.flicker-bird'), 'peck')
      }, 500)
    }
    if (box.top > window.innerHeight) s.drummed = false

    let i = -1
    listRef.current.querySelectorAll('.proj').forEach((card, k) => {
      if (card.getBoundingClientRect().top < window.innerHeight * 0.55) i = k
    })
    if (i === s.active) return
    svg.classList.toggle('focus-on', i >= 0)
    svg.querySelectorAll('.animal-g').forEach((g, k) => g.classList.toggle('on', k === i))
    setView(viewFor(i + 1))
    if (s.active !== -2 && i >= 0) playCall(PROJECTS[i].animal)
    s.active = i
  }

  useScrollScene(() => {
    state.current.active = -2
  }, update)

  const onSceneClick = e => {
    const target = e.target.closest('[data-call]')
    if (target) playCall(target.dataset.call)
  }

  return (
    <section className="page spring" id="projects">
      <div className="gutter">
        <div className="inner page-head">
          <Letters text="projects" className="title" fx="lift" instrument="chime" />
        </div>
      </div>
      <div className="gutter">
        <div className="inner scrolly">
          <div className="scene-col">
            <div className="scene-wrap">
              <svg ref={svgRef} viewBox="0 0 600 640" preserveAspectRatio="xMidYMid meet" aria-hidden="true" onClick={onSceneClick} dangerouslySetInnerHTML={{ __html: POND }} />
            </div>
          </div>
          <div ref={listRef}>
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} />
            ))}
          </div>
        </div>
      </div>
      <div className="gutter">
        <figure className="inner closing">
          <blockquote>
            “Never doubt that a small group of thoughtful, committed citizens can change the world. Indeed, it is the only thing that ever has.”
          </blockquote>
          <figcaption>Margaret Mead</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default Projects
