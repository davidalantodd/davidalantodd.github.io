import { useEffect, useRef, useState } from 'react'
import Letters from './Letters'
import { ROLES, LIFE_LIST } from '../data/experience'
import { playCall } from '../sound/audio'
import { clamp, prefersReducedMotion, replay, seeded, useScrollScene } from '../lib/motion'
import { curve, tree } from '../lib/draw'

function SpottedBird({ bird }) {
  return (
    <div className="spotted">
      <svg className={bird.wide ? 'wide' : undefined} viewBox={bird.viewBox} style={bird.colors} onClick={() => playCall(bird.call)} aria-hidden="true">
        <use href={`#${bird.symbol}`} />
      </svg>
      <em>
        {bird.name} · {bird.note}
      </em>
    </div>
  )
}

// cards show the first two bullets; the rest open with a toggle so the trail stays easy to walk
const SHOWN = 2

function RoleCard({ role, side }) {
  const [open, setOpen] = useState(false)
  const extra = role.notes.length - SHOWN
  const toggled = useRef(false)
  const toggle = () => {
    toggled.current = true
    setOpen(o => !o)
  }
  // the river and trail are drawn around the cards, so redraw them once the card has resized
  useEffect(() => {
    if (toggled.current) window.dispatchEvent(new Event('scenes:relayout'))
  }, [open])

  // The extra bullets stay on the page, just collapsed with hidden="until-found". That way a recruiter's
  // Ctrl-F still finds them: the browser fires "beforematch" and we open the card to show the match.
  // (Chrome, Edge and Firefox support this; Safari treats it as plain hidden.)
  const moreRef = useRef(null)
  useEffect(() => {
    const el = moreRef.current
    if (!el) return
    if (open) el.removeAttribute('hidden')
    else el.setAttribute('hidden', 'until-found')
  }, [open])
  useEffect(() => {
    const el = moreRef.current
    if (!el) return
    const onMatch = () => {
      toggled.current = true
      setOpen(true)
    }
    el.addEventListener('beforematch', onMatch)
    return () => el.removeEventListener('beforematch', onMatch)
  }, [])

  const listId = `notes-${role.org}-${role.years}`.replace(/[^a-z0-9]+/gi, '-')
  return (
    <article className={`card ${side}`} data-call={role.bird.call}>
      <SpottedBird bird={role.bird} />
      <div className="role-head">
        <img className="logo" src={role.logo} alt={`${role.org} logo`} width="44" height="44" loading="lazy" />
        <div>
          <span className="yrs">{role.years}</span>
          <h3>
            {role.title}{' '}
            <a href={role.url} target="_blank" rel="noreferrer">
              @ {role.org}
            </a>
          </h3>
        </div>
      </div>
      {role.stats && (
        <div className="stats">
          {role.stats.map(([big, label]) => (
            <div className="stat" key={label}>
              <b>{big}</b>
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
      <ul className="notes-list">
        {role.notes.slice(0, SHOWN).map(note => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {extra > 0 && (
        <div className="notes-more" id={listId} ref={moreRef}>
          <ul className="notes-list">
            {role.notes.slice(SHOWN).map(note => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      )}
      {extra > 0 && (
        <button className="more-btn mono" type="button" aria-expanded={open} aria-controls={listId} onClick={toggle}>
          {open ? 'show less' : `show ${extra} more`}
          <span aria-hidden="true">{open ? ' ↑' : ' ↓'}</span>
        </button>
      )}
    </article>
  )
}

function TurtleLog({ logRef }) {
  const plop = e => {
    replay(e.currentTarget, 'plopped')
    playCall('plop')
  }
  return (
    <div className="log-divider" ref={logRef}>
      <svg viewBox="0 0 420 90" aria-hidden="true">
        <g className="splash">
          <circle cx="210" cy="72" r="26" fill="none" stroke="var(--sea-2)" strokeWidth="3" />
        </g>
        <path d="M40 66 L380 60" stroke="var(--wood-dark)" strokeWidth="18" strokeLinecap="round" />
        <path d="M40 60 L380 54" stroke="var(--wood)" strokeWidth="6" strokeLinecap="round" opacity=".7" />
        <path d="M350 58 l20 -26" stroke="var(--wood-dark)" strokeWidth="5" strokeLinecap="round" />
        <g className="turtle" data-name="eastern painted turtle" onClick={plop}>
          <use href="#turtle" x="110" y="36" width="52" height="26" />
        </g>
        <g className="turtle" data-name="eastern painted turtle" onClick={plop}>
          <use href="#turtle" x="180" y="32" width="60" height="30" />
        </g>
        <g className="turtle" data-name="eastern painted turtle" onClick={plop}>
          <use href="#turtle" x="262" y="32" width="46" height="23" />
        </g>
      </svg>
      <p>
        <b>2022</b> · from higher ed to software
      </p>
    </div>
  )
}

function LifeList() {
  return (
    <div className="stack-panel">
      <h2>life list</h2>
      <p className="sub">
        Birders keep a life list of every species they&apos;ve seen. This is mine for technology. More of the trail is on{' '}
        <a href="https://www.linkedin.com/in/david-alan-todd" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        .
      </p>
      <div className="ll-legend" aria-hidden="true">
        <span>
          <span className="box on">
            <svg viewBox="0 0 12 12">
              <use href="#check" />
            </svg>
          </span>
          seen often
        </span>
        <span>
          <span className="box" />
          on the list
        </span>
      </div>
      <ul className="ll-grid">
        {LIFE_LIST.map(([name, often]) => (
          <li className={often ? 'll often' : 'll'} key={name}>
            <span className="box" aria-hidden="true">
              {often && (
                <svg viewBox="0 0 12 12">
                  <use href="#check" />
                </svg>
              )}
            </span>
            {name}
            {often && <span className="visually-hidden"> (seen often)</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Experience: a river trail walking upstream through the woods, newest role first.
// The river runs down the page behind the cards, and a dotted trail draws itself as you scroll.
function Experience() {
  const wrapRef = useRef(null)
  const svgRef = useRef(null)
  const listRef = useRef(null)
  const logRef = useRef(null)
  const state = useRef({ H: 0, plopped: false })

  const layout = () => {
    const wrap = wrapRef.current
    const svg = svgRef.current
    if (!wrap || !svg) return
    const wr = wrap.getBoundingClientRect()
    const W = wr.width
    const VW = document.documentElement.clientWidth
    const ox = (VW - W) / 2
    const mobile = window.innerWidth <= 860
    const H = wrap.offsetHeight
    svg.setAttribute('viewBox', `0 0 ${VW} ${H}`)
    svg.style.height = `${H}px`

    // the river bends toward each card, then runs on past the bottom of the section
    const cx = (mobile ? 22 : W / 2) + ox
    const pts = [{ x: cx, y: 0 }]
    const stops = [...listRef.current.children]
    stops.forEach((el, i) => {
      const r = el.getBoundingClientRect()
      const off = mobile ? (i % 2 ? 8 : -8) : el.classList.contains('left') ? 44 : el.classList.contains('right') ? -44 : 0
      pts.push({ x: cx + off, y: r.top - wr.top + r.height / 2 })
    })
    pts.push({ x: cx, y: H })

    const xAt = y => {
      for (let i = 1; i < pts.length; i++) {
        if (y <= pts[i].y) {
          const a = pts[i - 1]
          const b = pts[i]
          const u = clamp((y - a.y) / Math.max(b.y - a.y, 1), 0, 1)
          return a.x + (b.x - a.x) * (3 * u * u - 2 * u * u * u)
        }
      }
      return pts[pts.length - 1].x
    }

    // woods on both banks and out into the margins on wide screens
    const rnd = seeded(23)
    let woods = ''
    if (!mobile) {
      for (let y = 60; y < H + 20; y += 52 + rnd() * 60) {
        const px = xAt(y)
        const spots = []
        if (ox > 30) spots.push(rnd() * (ox - 16) + 8, VW - ox + 8 + rnd() * (ox - 16))
        spots.push(px + (rnd() > 0.5 ? 1 : -1) * (70 + rnd() * 50))
        if (rnd() > 0.5) spots.push(rnd() * (W * 0.9) + ox + W * 0.05)
        spots.forEach(x => {
          woods += tree(rnd, x, y, 0.8 + rnd() * 0.5)
        })
      }
    }

    // the river narrows as it climbs upstream
    let river = ''
    pts.slice(1).forEach((b, i) => {
      const width = (mobile ? 22 : 54) * (1 - (i + 1) / pts.length) + (mobile ? 6 : 12)
      river += `<path d="${curve(pts[i], b)}" stroke="var(--sea-1)" stroke-width="${width.toFixed(1)}" fill="none" stroke-linecap="round"/>`
    })
    const trail = pts
      .slice(1)
      .map((b, i) => curve(pts[i], b, mobile ? 18 : 34))
      .join(' ')

    svg.innerHTML =
      `<defs><clipPath id="trail-clip"><rect class="trail-reveal" x="0" y="0" width="${VW}" height="0"/></clipPath></defs>` +
      `<g>${woods}</g><g>${river}</g>` +
      `<g clip-path="url(#trail-clip)"><path d="${trail}" stroke="var(--wood)" stroke-width="2.5" fill="none" stroke-dasharray="3 7" stroke-linecap="round"/></g>`
    state.current.H = H
  }

  const update = () => {
    const wrap = wrapRef.current
    if (!wrap) return
    const vh = window.innerHeight
    const reduce = prefersReducedMotion()
    const { H } = state.current
    const p = reduce ? 1 : clamp((vh * 0.65 - wrap.getBoundingClientRect().top) / Math.max(H, 1), 0, 1)
    const reveal = svgRef.current.querySelector('.trail-reveal')
    if (reveal) reveal.setAttribute('height', (p * H).toFixed(0))

    // each card settles in, and its bird calls, the first time it comes into view
    listRef.current.querySelectorAll('.card').forEach(card => {
      if (card.classList.contains('seen') || card.getBoundingClientRect().top > vh * 0.8) return
      card.classList.add('seen')
      if (!reduce) playCall(card.dataset.call)
    })

    // the turtles slide off the log as you get close, like they always do
    const log = logRef.current
    if (log && !state.current.plopped && log.getBoundingClientRect().top < vh * 0.6) {
      state.current.plopped = true
      log.querySelectorAll('.turtle').forEach((t, i) =>
        setTimeout(() => {
          replay(t, 'plopped')
          replay(log.querySelector('.splash'), 'go')
          playCall('plop')
        }, i * 380),
      )
    }
  }

  useScrollScene(layout, update)

  let side = 0
  return (
    <section className="page river" id="experience">
      <div className="gutter">
        <div className="inner trail-wrap" ref={wrapRef}>
          <svg className="trail-svg" ref={svgRef} aria-hidden="true" />
          <div className="page-head on-trail">
            <Letters text="experience" className="title" fx="plop" instrument="pluck" />
          </div>
          <div className="trail-list" ref={listRef}>
            {ROLES.map((role, i) => (role.log ? <TurtleLog key="log" logRef={logRef} /> : <RoleCard key={i} role={role} side={side++ % 2 ? 'right' : 'left'} />))}
          </div>
          <LifeList />
          <div className="river-tail" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

export default Experience
