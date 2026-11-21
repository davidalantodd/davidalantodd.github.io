// Renders the whole page to plain HTML at build time (see scripts/prerender.mjs),
// so the content is there even for visitors and tools that don't run JavaScript.
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export function render() {
  return renderToString(<App />)
}
