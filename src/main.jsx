import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = document.getElementById('root')
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// The built site ships the page already rendered as HTML (scripts/prerender.mjs), so React picks up
// that markup instead of rebuilding it. In development the root is empty, so it renders from scratch.
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app)
else ReactDOM.createRoot(root).render(app)
