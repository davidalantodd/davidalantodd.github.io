import { useEffect, useRef } from 'react'

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// a small, repeatable random number generator so drawings look the same on every visit
export function seeded(seed) {
  let s = seed
  return () => (s = (s * 9301 + 49297) % 233280) / 233280
}

// restart a CSS animation class on an element
export function replay(el, className) {
  if (!el) return
  el.classList.remove(className)
  void el.getBoundingClientRect()
  el.classList.add(className)
}

// call `onScroll` once per frame while the page scrolls, and `onLayout` on load and resize
export function useScrollScene(onLayout, onScroll) {
  const layoutRef = useRef(onLayout)
  const scrollRef = useRef(onScroll)
  layoutRef.current = onLayout
  scrollRef.current = onScroll

  useEffect(() => {
    let ticking = false
    let resizeTimer = 0
    let lastW = window.innerWidth
    let lastH = window.innerHeight
    const update = () => scrollRef.current && scrollRef.current()
    const layout = () => {
      if (layoutRef.current) layoutRef.current()
      update()
    }
    const onScrollEvent = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        update()
      })
    }
    const onResize = () => {
      // phones fire resize whenever the toolbar slides in or out while scrolling;
      // the scenes use stable heights, so skip those and only redraw for real size changes
      const w = window.innerWidth
      const h = window.innerHeight
      if (w === lastW && Math.abs(h - lastH) < 160) return
      lastW = w
      lastH = h
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(layout, 120)
    }
    layout()
    // fonts and images change sizes after first paint, so lay out again once they settle
    const fontsReady = document.fonts && document.fonts.ready
    if (fontsReady) fontsReady.then(layout)
    window.addEventListener('load', layout)
    window.addEventListener('scroll', onScrollEvent, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('scenes:relayout', layout)
    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener('load', layout)
      window.removeEventListener('scroll', onScrollEvent)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scenes:relayout', layout)
    }
  }, [])
}
