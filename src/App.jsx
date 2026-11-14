import { useEffect } from 'react'
import { SoundProvider } from './sound/SoundContext'
import ArtDefs from './components/art/ArtDefs'
import Header from './components/Header'
import Home from './components/Home'
import Letters from './components/Letters'
import Footer from './components/Footer'

const SECTIONS = ['home', 'about', 'experience', 'projects']

// Old links like /about land on the 404 page, which redirects to /#/about.
// Turn that into the matching section of the one-page site.
function useLegacyLinks() {
  useEffect(() => {
    const redirect = () => {
      const hash = window.location.hash
      if (!hash.startsWith('#/')) return
      const id = hash.slice(2).replace(/\/$/, '')
      const target = SECTIONS.includes(id) ? id : 'home'
      window.history.replaceState(null, '', `#${target}`)
      setTimeout(() => document.getElementById(target)?.scrollIntoView(), 50)
    }
    redirect()
    window.addEventListener('hashchange', redirect)
    return () => window.removeEventListener('hashchange', redirect)
  }, [])
}

// Placeholder sections while the redesign is built one habitat at a time.
function ComingSoon({ id, title, fx, instrument }) {
  return (
    <section className="page coming-soon gutter" id={id}>
      <div className="inner page-head">
        <Letters text={title} as="h1" className="title" fx={fx} instrument={instrument} />
        <p className="lede">This habitat is next in the build.</p>
      </div>
    </section>
  )
}

function App() {
  useLegacyLinks()
  return (
    <SoundProvider>
      <ArtDefs />
      <Header />
      <main>
        <Home />
        <ComingSoon id="about" title="about me" fx="sway" instrument="reed" />
        <ComingSoon id="experience" title="experience" fx="plop" instrument="pluck" />
        <ComingSoon id="projects" title="projects" fx="lift" instrument="chime" />
      </main>
      <Footer />
    </SoundProvider>
  )
}

export default App
