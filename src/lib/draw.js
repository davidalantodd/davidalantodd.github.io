// Small drawing helpers that return SVG markup strings for scenery.

// A pine or a leafy tree standing at (x, y), sized by `scale`.
export function tree(rnd, x, y, scale) {
  const h = (40 + rnd() * 34) * scale
  const w = h * (0.55 + rnd() * 0.15)
  const colors = ['var(--pine)', 'var(--forest)', 'var(--leaf)', 'var(--hill)']
  const opacity = (0.75 + rnd() * 0.25).toFixed(2)
  if (rnd() < 0.6) {
    const c = colors[Math.floor(rnd() * 2)]
    return (
      `<g opacity="${opacity}"><rect x="${x - 2}" y="${y - h * 0.18}" width="4" height="${h * 0.18}" fill="var(--trunk)"/>` +
      `<path d="M${x} ${y - h} L${x - w / 2} ${y - h * 0.45} H${x + w / 2}Z M${x} ${y - h * 0.7} L${x - w * 0.6} ${y - h * 0.15} H${x + w * 0.6}Z" fill="${c}"/></g>`
    )
  }
  const c = colors[1 + Math.floor(rnd() * 3)]
  const r = w * 0.45
  return (
    `<g opacity="${opacity}"><rect x="${x - 2.5}" y="${y - h * 0.4}" width="5" height="${h * 0.4}" fill="var(--trunk)"/>` +
    `<circle cx="${x}" cy="${y - h * 0.55}" r="${r}" fill="${c}"/><circle cx="${x - r * 0.6}" cy="${y - h * 0.45}" r="${r * 0.7}" fill="${c}"/>` +
    `<circle cx="${x + r * 0.6}" cy="${y - h * 0.47}" r="${r * 0.65}" fill="${c}"/></g>`
  )
}

// A smooth vertical curve from a to b, optionally shifted sideways by dx.
export const curve = (a, b, dx = 0) => {
  const dy = (b.y - a.y) / 2
  return `M${a.x + dx} ${a.y} C${a.x + dx} ${a.y + dy} ${b.x + dx} ${b.y - dy} ${b.x + dx} ${b.y}`
}
