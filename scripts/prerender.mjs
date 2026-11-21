// After `vite build`, render the page to HTML and put it inside <div id="root"> in dist/index.html.
// The browser then hydrates that HTML instead of building the page from scratch, and anything that
// reads the page without running JavaScript (link previews, recruiting tools, AI assistants) sees the content.
import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)

const file = path.join(root, 'dist/index.html')
const html = await readFile(file, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) throw new Error('prerender: <div id="root"></div> not found in dist/index.html')
await writeFile(file, html.replace(marker, `<div id="root">${render()}</div>`))
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log('prerender: wrote the page into dist/index.html')
