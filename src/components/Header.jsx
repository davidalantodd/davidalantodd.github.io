import { useEffect, useRef, useState } from 'react'
import { useSound } from '../sound/SoundContext'
import { MoonIcon, SunIcon } from './Icons'

const SECTIONS = ['home', 'about', 'experience', 'projects']

function Header() {
  const { soundOn, toggleSound } = useSound()
  const [active, setActive] = useState('home')
  const headerRef = useRef(null)
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')

  useEffect(() => {
    const sync = () => setTheme(document.documentElement.dataset.theme)
    window.addEventListener('themechange', sync)
    return () => window.removeEventListener('themechange', sync)
  }, [])

  // the theme was set before first paint (in index.html); this flips it and remembers the choice
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      window.localStorage.setItem('theme', next)
    } catch {
      // storage can be unavailable, for example in a private window
    }
    setTheme(next)
  }

  // keep --hdr in sync with the header's height, so sticky scenes sit just below it
  useEffect(() => {
    const setHeight = () => {
      if (headerRef.current) document.documentElement.style.setProperty('--hdr', `${headerRef.current.offsetHeight}px`)
    }
    setHeight()
    window.addEventListener('resize', setHeight)
    return () => window.removeEventListener('resize', setHeight)
  }, [])

  // highlight whichever section the visitor is currently in
  useEffect(() => {
    let ticking = false
    const mark = () => {
      ticking = false
      let current = 'home'
      SECTIONS.forEach(id => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) current = id
      })
      setActive(current)
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(mark)
      }
    }
    mark()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const link = id => (
    <a href={`#${id}`} className={active === id ? 'active' : undefined} aria-current={active === id ? 'location' : undefined}>
      {id}
    </a>
  )

  return (
    <header className="site-header gutter" ref={headerRef}>
      <div className="inner">
        <span className="home-link">{link('home')}</span>
        <nav className="nav" aria-label="Main">
          {link('about')}
          {link('experience')}
          {link('projects')}
          <button
            className="theme-btn"
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            data-name={theme === 'dark' ? 'light mode' : 'dark mode'}
            data-label-pos="below"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button className="sound-btn" type="button" aria-pressed={soundOn} onClick={toggleSound}>
            <svg viewBox="0 0 18 18" aria-hidden="true">
              <rect x="2" y="3" width="3" height="12" rx="1.5" />
              <rect x="7.5" y="3" width="3" height="12" rx="1.5" />
              <rect x="13" y="3" width="3" height="12" rx="1.5" />
            </svg>
            <span className="sound-label">{soundOn ? 'sound on' : 'sound off'}</span>
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
