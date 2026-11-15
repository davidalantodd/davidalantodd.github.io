import { Fragment, useEffect, useRef } from 'react'
import { playInstrument } from '../sound/audio'
import { prefersReducedMotion, replay } from '../lib/motion'

// letter colors for each habitat, picked from the site palette
const PALETTES = {
  bob: ['var(--foam)', 'var(--orange-deep)', 'var(--sea-3)', 'var(--green-deep)'],
  sway: ['var(--reed-dark)', 'var(--orange-deep)', 'var(--cattail)', 'var(--green-deep)'],
  plop: ['var(--forest)', 'var(--orange-deep)', 'var(--sea-3)', 'var(--green-deep)'],
  lift: ['var(--green-deep)', 'var(--orange-deep)', '#d8323c', 'var(--sea-3)'],
}

// A big blue heading split into letters. Each letter moves and changes color on hover,
// and plays a note when sound is on. The whole word does one wave when it scrolls into view.
function Letters({ text, as: Tag = 'h1', fx = 'bob', instrument = 'bell', className = '' }) {
  const ref = useRef(null)

  const animate = (el, i) => {
    if (!prefersReducedMotion()) replay(el, `go-${fx}`)
    const palette = PALETTES[fx]
    el.style.color = palette[(i * 3 + Math.floor(Math.random() * palette.length)) % palette.length]
    clearTimeout(el._colorTimer)
    el._colorTimer = setTimeout(() => {
      el.style.color = ''
    }, 1200)
  }

  useEffect(() => {
    const root = ref.current
    if (!root || prefersReducedMotion() || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          root.querySelectorAll('.l').forEach((el, i) => setTimeout(() => animate(el, i), 350 + i * 65))
        })
      },
      { threshold: 0.6 },
    )
    observer.observe(root)
    return () => observer.disconnect()
    // the letters never change after the first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let index = 0
  return (
    <Tag ref={ref} className={`letters ${className}`} data-fx={fx} aria-label={text}>
      {text.split(' ').map((word, wi) => (
        <Fragment key={wi}>
          {wi > 0 && ' '}
          <span className="word" aria-hidden="true">
            {[...word].map(ch => {
              const i = index++
              return (
                <span
                  key={i}
                  className="l"
                  onMouseEnter={e => {
                    animate(e.currentTarget, i)
                    playInstrument(instrument, i)
                  }}
                >
                  {ch}
                </span>
              )
            })}
          </span>
        </Fragment>
      ))}
    </Tag>
  )
}

export default Letters
