import { playCall } from '../sound/audio'

// A bird in the scenery that shows its name on hover (or on tap, on phones) and plays its call when clicked.
function BirdId({ name, className = '', symbol, viewBox, colors, call }) {
  return (
    <span className={`bird-id ${className}`} data-name={name} role="img" aria-label={name} tabIndex={-1} onClick={() => playCall(call)}>
      <svg viewBox={viewBox} style={colors} aria-hidden="true">
        <use href={`#${symbol}`} />
      </svg>
    </span>
  )
}

export default BirdId
