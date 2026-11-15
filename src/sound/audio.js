// A tiny Web Audio sound kit. Everything is generated in code, so there are no audio files to load.
// Sound is off until the visitor turns it on, and every sound checks that switch first.

let ctx = null
let enabled = false

const PENTA = [0, 2, 4, 7, 9]
const step = i => PENTA[i % 5] + 12 * Math.floor(i / 5)
const semis = (base, n) => base * Math.pow(2, n / 12)

export function setSoundEnabled(on) {
  enabled = on
  if (on && !ctx) {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)()
    } catch {
      enabled = false
    }
  }
  if (ctx && ctx.state === 'suspended') ctx.resume()
  return enabled
}

// browsers only start audio after a click or key press, so wake it on the next one
export function resumeOnGesture() {
  const wake = () => {
    if (ctx && ctx.state === 'suspended') ctx.resume()
  }
  window.addEventListener('pointerdown', wake, { once: true })
  window.addEventListener('keydown', wake, { once: true })
}

function tone(freq, o = {}) {
  if (!enabled || !ctx) return
  const t = ctx.currentTime + (o.d || 0)
  const len = o.len || 0.6
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = o.type || 'sine'
  osc.frequency.setValueAtTime(freq, t)
  if (o.glide) osc.frequency.exponentialRampToValueAtTime(freq * o.glide, t + len * 0.7)
  gain.gain.setValueAtTime(0, t)
  gain.gain.linearRampToValueAtTime(o.vol || 0.08, t + (o.att || 0.015))
  gain.gain.exponentialRampToValueAtTime(0.0001, t + len)
  osc.connect(gain).connect(ctx.destination)
  osc.start(t)
  osc.stop(t + len + 0.05)
}

// one instrument per habitat, each playing the pentatonic scale so any order sounds pleasant
const instruments = {
  bell: i => {
    const f = semis(261.63, step(i))
    tone(f, { len: 0.95, vol: 0.1 })
    tone(f * 2.76, { len: 0.45, vol: 0.02 })
  },
  reed: i => tone(semis(220, step(i)), { type: 'triangle', len: 0.8, vol: 0.08, att: 0.06 }),
  pluck: i => tone(semis(196, step(i)), { type: 'triangle', len: 0.32, vol: 0.12, att: 0.004 }),
  chime: i => {
    const f = semis(523.25, step(i))
    tone(f, { len: 1.1, vol: 0.06 })
    tone(f * 2, { len: 0.5, vol: 0.015 })
  },
}

// bird and animal calls, simplified into short musical phrases
const calls = {
  chord: () => [0, 2, 4].forEach((s, k) => tone(semis(261.63, PENTA[s]), { d: k * 0.09, len: 0.8, vol: 0.08 })),
  hum: () => tone(110 + Math.random() * 40, { len: 1.4, vol: 0.06, att: 0.2 }),
  peep: () => {
    tone(2300, { len: 0.12, vol: 0.04, type: 'triangle' })
    tone(2550, { d: 0.16, len: 0.12, vol: 0.04, type: 'triangle' })
  },
  whistle: () => [0, 0.22, 0.44].forEach(d => tone(1700, { d, len: 0.2, vol: 0.025, glide: 1.35 })),
  quack: () => {
    tone(420, { len: 0.14, vol: 0.03, type: 'square', glide: 0.7 })
    tone(400, { d: 0.2, len: 0.14, vol: 0.03, type: 'square', glide: 0.7 })
  },
  croak: () => tone(150, { len: 0.35, vol: 0.05, type: 'sawtooth', glide: 0.8 }),
  conk: () => {
    tone(1200, { len: 0.1, vol: 0.04, type: 'triangle' })
    tone(1500, { d: 0.12, len: 0.1, vol: 0.04, type: 'triangle' })
    for (let k = 0; k < 7; k++) tone(k % 2 ? 2900 : 3100, { d: 0.26 + k * 0.04, len: 0.05, vol: 0.03, type: 'triangle' })
  },
  trill: () => {
    for (let k = 0; k < 12; k++) tone(3300 + (k % 3) * 200, { d: k * 0.045, len: 0.05, vol: 0.025, type: 'triangle' })
  },
  osprey: () => {
    for (let k = 0; k < 6; k++) tone(2100 + k * 90, { d: k * 0.13, len: 0.1, vol: 0.03, type: 'triangle', glide: 1.1 })
  },
  thrush: () => {
    const notes = [660, 880, 990]
    notes.forEach((f, k) => tone(f, { d: k * 0.15, len: 0.25, vol: 0.05 }))
    for (let k = 0; k < 5; k++) tone(1600 + k * 120, { d: 0.5 + k * 0.04, len: 0.05, vol: 0.025 })
  },
  chip: () => tone(3600, { len: 0.07, vol: 0.03, type: 'triangle', glide: 0.8 }),
  chickadee: () => {
    tone(3000, { len: 0.08, vol: 0.035, type: 'triangle', glide: 0.85 })
    tone(3400, { d: 0.11, len: 0.06, vol: 0.03, type: 'triangle' })
    for (let k = 0; k < 3; k++) tone(2000, { d: 0.22 + k * 0.2, len: 0.16, vol: 0.04 })
  },
  frog: () => [0, 4, 7].forEach((s, k) => tone(semis(180, s), { d: k * 0.22, len: 0.22, vol: 0.07, glide: 1.15 })),
  shimmer: () => {
    for (let k = 0; k < 6; k++) tone(1800 + k * 260, { d: k * 0.05, len: 0.4, vol: 0.02 })
  },
  plop: () => tone(620, { len: 0.16, vol: 0.08, glide: 0.4 }),
  swim: () => {
    tone(300, { len: 0.3, vol: 0.05, glide: 1.4 })
    tone(420, { d: 0.25, len: 0.25, vol: 0.04, glide: 0.7 })
  },
  drum: () => {
    for (let k = 0; k < 16; k++) tone(170, { d: k * 0.045, len: 0.035, vol: 0.06, type: 'square' })
    for (let k = 0; k < 4; k++) tone(1350, { d: 1 + k * 0.14, len: 0.09, vol: 0.03, type: 'triangle' })
  },
  rattle: () => {
    for (let k = 0; k < 14; k++) tone(k % 2 ? 2100 : 1900, { d: k * 0.035, len: 0.03, vol: 0.025, type: 'square' })
  },
}

export function playInstrument(name, i) {
  if (enabled && instruments[name]) instruments[name](i)
}

export function playCall(name) {
  if (enabled && calls[name]) calls[name]()
}

// soft rushing water: filtered noise that swells and fades
export function playRush() {
  if (!enabled || !ctx) return
  const len = 2.6
  const buf = ctx.createBuffer(1, ctx.sampleRate * len, ctx.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  const src = ctx.createBufferSource()
  const filter = ctx.createBiquadFilter()
  const gain = ctx.createGain()
  const t = ctx.currentTime
  src.buffer = buf
  filter.type = 'lowpass'
  filter.frequency.value = 900
  gain.gain.setValueAtTime(0, t)
  gain.gain.linearRampToValueAtTime(0.05, t + 1)
  gain.gain.linearRampToValueAtTime(0, t + len)
  src.connect(filter).connect(gain).connect(ctx.destination)
  src.start(t)
}
