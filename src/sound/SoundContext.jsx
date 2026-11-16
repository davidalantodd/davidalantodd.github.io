import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { playCall, resumeOnGesture, setSoundEnabled } from './audio'

const SoundContext = createContext({ soundOn: false, toggleSound: () => {} })
const STORAGE_KEY = 'sound-on'

function readSaved() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function SoundProvider({ children }) {
  const [soundOn, setSoundOn] = useState(readSaved)

  // sound is remembered only for this visit (sessionStorage), so a new visit always starts quiet;
  // if it was on before a reload, get ready to play after the first click or key press
  useEffect(() => {
    if (soundOn) {
      setSoundEnabled(true)
      resumeOnGesture()
    }
    // only on first load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleSound = useCallback(() => {
    setSoundOn(prev => {
      const next = setSoundEnabled(!prev)
      try {
        window.sessionStorage.setItem(STORAGE_KEY, next ? '1' : '0')
      } catch {
        // storage can be unavailable, for example in a private window
      }
      if (next) playCall('chord')
      return next
    })
  }, [])

  return <SoundContext.Provider value={{ soundOn, toggleSound }}>{children}</SoundContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSound() {
  return useContext(SoundContext)
}
