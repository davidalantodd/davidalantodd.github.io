import { useEffect, useRef } from 'react'

// One shared caption for every animal on the site. Anything with a data-name attribute
// gets a small field-guide style label above it on hover, or on tap on phones.
function FieldLabel() {
  const ref = useRef(null)

  useEffect(() => {
    const label = ref.current
    let current = null

    const show = target => {
      const r = target.getBoundingClientRect()
      label.querySelector('.field-label-text').textContent = target.dataset.name
      // most labels sit above the animal; ones that already have a tag above them get theirs below
      const below = target.dataset.labelPos === 'below'
      label.classList.toggle('below', below)
      label.style.left = `${r.left + r.width / 2}px`
      label.style.top = `${below ? r.bottom : r.top}px`
      label.classList.add('show')
      current = target
    }
    const hide = () => {
      label.classList.remove('show')
      current = null
    }
    const onOver = e => {
      const target = e.target.closest && e.target.closest('[data-name]')
      if (target) show(target)
    }
    const onOut = e => {
      if (!current) return
      const next = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('[data-name]')
      if (next !== current) hide()
    }

    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout', onOut)
    document.addEventListener('focusin', onOver)
    document.addEventListener('focusout', hide)
    window.addEventListener('scroll', hide, { passive: true })
    return () => {
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      document.removeEventListener('focusin', onOver)
      document.removeEventListener('focusout', hide)
      window.removeEventListener('scroll', hide)
    }
  }, [])

  return (
    <div className="field-label" ref={ref} aria-hidden="true">
      <span className="field-label-text" />
    </div>
  )
}

export default FieldLabel
