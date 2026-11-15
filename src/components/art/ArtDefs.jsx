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

        {/* a general songbird; color it with --body, --head, --belly, --wing, --tail, --patch, --cap, --beak */}
        <symbol id="songbird" viewBox="0 0 30 22" overflow="visible">
          <path d="M5 13 L0 11 L3 17Z" fill="var(--tail, var(--body))" />
          <ellipse cx="13" cy="13" rx="9" ry="6" fill="var(--body)" />
          <ellipse cx="14" cy="16" rx="6" ry="3" fill="var(--belly, var(--body))" />
          <path d="M8 11 Q13 7 18 11 Q13 14 8 11Z" fill="var(--wing, var(--body))" />
          <path d="M9 10.5 q3 -2.5 6 0" stroke="var(--patch, transparent)" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <circle cx="21" cy="8" r="4.5" fill="var(--head, var(--body))" />
          <path d="M16.6 7 a4.5 4.5 0 0 1 8.8 0" fill="var(--cap, transparent)" />
          <circle cx="22.5" cy="7.5" r="1" fill="#111" />
          <path d="M25 8 L29.5 9 L25 10Z" fill="var(--beak, #333)" />
          <path d="M11 19 v3 M15 19 v3" stroke="#333" strokeWidth="1" strokeLinecap="round" />
        </symbol>

        {/* herons and egrets; color with --body, --crest, --beak */}
        <symbol id="heron" viewBox="0 0 40 60" overflow="visible">
          <path d="M14 42 L12 60 M20 42 L22 60" stroke="#6c7680" strokeWidth="1.6" />
          <ellipse cx="17" cy="34" rx="13" ry="9" fill="var(--body, #8fa2b4)" />
          <path d="M8 34 L2 40 L10 38Z" fill="var(--body, #8fa2b4)" />
          <path d="M26 30 C34 20 22 14 30 6" stroke="var(--body, #8fa2b4)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <circle cx="31" cy="5" r="4" fill="var(--body, #8fa2b4)" />
          <path d="M34 5 L40 6 L34 7Z" fill="var(--beak, #e3b23c)" />
          <path d="M28 3 l-6 -2" stroke="var(--crest, #1f2830)" strokeWidth="1.4" />
          <circle cx="32" cy="4" r=".9" fill="#111" />
        </symbol>

        {/* ducks; color with --body, --head, --wing, --crest, --ring, --beak */}
        <symbol id="duck" viewBox="0 0 34 20" overflow="visible">
          <path d="M2 10 Q4 18 16 18 Q28 18 30 12 Q22 8 2 10Z" fill="var(--body)" />
          <path d="M8 11 Q16 8 22 12 Q14 15 8 11Z" fill="var(--wing, var(--body))" />
          <circle cx="26" cy="7" r="4.5" fill="var(--head, var(--body))" />
          <path d="M22 3 Q27 0 31 5" stroke="var(--crest, transparent)" strokeWidth="2.2" fill="none" />
          <circle cx="27" cy="6" r="1" fill="#c73a2a" />
          <path d="M30 7 L34 8 L30 9.5Z" fill="var(--beak, #e3a23c)" />
          <path d="M22 9 q4 2 8 0" stroke="var(--ring, transparent)" strokeWidth="1" fill="none" />
        </symbol>

        {/* an osprey seen from below, wings out */}
        <symbol id="osprey" viewBox="0 0 64 26" overflow="visible">
          <path d="M32 12 C24 6 14 4 2 8 C10 9 16 12 20 15 C24 14 28 14 32 15 C36 14 40 14 44 15 C48 12 54 9 62 8 C50 4 40 6 32 12Z" fill="#f4f1ea" />
          <path d="M2 8 C8 6 12 6 16 8 L18 11 C14 10 8 9 2 8Z M62 8 C56 6 52 6 48 8 L46 11 C50 10 56 9 62 8Z" fill="#3a2e26" />
          <ellipse cx="17" cy="10.5" rx="2.4" ry="1.6" fill="#3a2e26" />
          <ellipse cx="47" cy="10.5" rx="2.4" ry="1.6" fill="#3a2e26" />
          <ellipse cx="32" cy="15" rx="4" ry="8" fill="#fff" />
          <path d="M29.5 21 L32 26 L34.5 21Z" fill="#8a7a6a" />
          <circle cx="32" cy="8" r="3.2" fill="#fff" />
          <path d="M29.5 8 h5" stroke="#3a2e26" strokeWidth="1.2" />
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
