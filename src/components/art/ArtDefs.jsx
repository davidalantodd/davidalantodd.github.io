// Shared drawings, defined once and reused anywhere with <use href="#name" />.
// Colors that vary per bird come from CSS custom properties set on the <use> or its <svg>.
function ArtDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="sandpiper" viewBox="0 0 60 46" overflow="visible">
          <path d="M10 22 L0 20 L9 27 Z" fill="#8a7f72" />
          <ellipse cx="24" cy="24" rx="15" ry="9" fill="#b9ab98" />
          <ellipse cx="26" cy="28" rx="11" ry="5" fill="#fbf8f2" />
          <path d="M14 21 q9 -5 19 1" fill="none" stroke="#8a7f72" strokeWidth="2" strokeLinecap="round" />
          <circle cx="38" cy="16" r="7" fill="#c7baa7" />
          <circle cx="40" cy="14.5" r="1.4" fill="#1b1b1b" />
          <path d="M44 16.5 L58 19 L44 18.5 Z" fill="#2a2a2a" />
          <path d="M22 32 L20 45 M29 32 L31 45" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" />
        </symbol>

        <symbol id="scoter" viewBox="0 0 44 24" overflow="visible">
          <path d="M2 14 Q4 22 18 22 Q32 22 34 15 Q26 9 2 14Z" fill="#1c1c1e" />
          <path d="M2 14 L-3 11 L3 17Z" fill="#1c1c1e" />
          <circle cx="32" cy="9" r="6.5" fill="#1c1c1e" />
          <ellipse cx="33" cy="3.6" rx="3.4" ry="1.6" fill="#fff" />
          <ellipse cx="27" cy="9" rx="1.8" ry="3.2" fill="#fff" />
          <path d="M36 6 Q42 7 44 11 Q40 12.5 36 12Z" fill="#f08a24" />
          <circle cx="38.6" cy="9.4" r="1.6" fill="#1c1c1e" />
          <path d="M36.5 6.5 l2.6 1.4 -2.6 1Z" fill="#fff" />
          <circle cx="33.5" cy="8" r="1.3" fill="#fff" />
          <circle cx="33.6" cy="8" r=".6" fill="#111" />
        </symbol>

        <symbol id="reeds-icon" viewBox="0 0 46 44">
          <g stroke="var(--reed)" strokeWidth="2.4" strokeLinecap="round">
            <path d="M10 44 V10" />
            <path d="M20 44 V18" />
            <path d="M32 44 V6" />
            <path d="M40 44 V20" />
          </g>
          <g fill="var(--cattail)">
            <rect x="7.5" y="8" width="5" height="12" rx="2.5" />
            <rect x="29.5" y="4" width="5" height="13" rx="2.5" />
          </g>
        </symbol>
      </defs>
    </svg>
  )
}

export default ArtDefs
