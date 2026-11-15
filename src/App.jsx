import { useEffect } from 'react'
import { SoundProvider } from './sound/SoundContext'
import ArtDefs from './components/art/ArtDefs'
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import { CoastToMarsh, MarshToRiver, RiverToSpring } from './components/Transitions'
import Footer from './components/Footer'
import FieldLabel from './components/FieldLabel'

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

// One continuous walk upstream: the coast, the marsh, the river valley, and the spring where the river begins.
function App() {
  useLegacyLinks()
  return (
    <SoundProvider>
      <ArtDefs />
      <Header />
      <main>
        <Home />
        <CoastToMarsh />
        <About />
        <MarshToRiver />
        <Experience />
        <RiverToSpring />
        <Projects />
      </main>
      <Footer />
      <FieldLabel />
    </SoundProvider>
  )
}

export default App
