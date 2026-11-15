// Line-drawn icons, so they match the illustrated style of the rest of the site.
// They take their color from the surrounding text and are styled by the .icon class.

export function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <rect x="2.5" y="2.5" width="19" height="19" rx="4.5" />
      <circle cx="7.6" cy="7.6" r="1.1" className="dot" />
      <path d="M7.6 10.6 V17" />
      <path d="M11.4 17 V10.6 M11.4 13.6 C11.4 11.6 12.6 10.5 14.3 10.5 C16 10.5 16.9 11.6 16.9 13.4 V17" />
    </svg>
  )
}

export function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="icon">
      <path
        className="thin"
        d="M8 .6C3.9.6.6 3.9.6 8c0 3.3 2.1 6 5.1 7 .4.1.5-.2.5-.4v-1.3c-2.1.5-2.5-.9-2.5-.9-.3-.9-.8-1.1-.8-1.1-.7-.5.1-.5.1-.5.7.1 1.1.8 1.1.8.7 1.2 1.8.8 2.2.6.1-.5.3-.8.5-1-1.6-.2-3.4-.8-3.4-3.6 0-.8.3-1.5.8-2-.1-.2-.3-1 .1-2 0 0 .6-.2 2 .8.6-.2 1.2-.2 1.8-.2s1.2.1 1.8.2c1.4-1 2-.8 2-.8.4 1 .1 1.8.1 2 .5.5.8 1.2.8 2 0 2.8-1.7 3.4-3.4 3.6.3.2.5.7.5 1.4v2c0 .2.1.5.6.4 3-1 5.1-3.8 5.1-7C15.4 3.9 12.1.6 8 .6Z"
      />
    </svg>
  )
}

// a little rocket for "deployed app", a nod to the launch icon on the old site
export function LaunchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d="M12 2.6 C15.4 5 16.9 8.6 16.9 12.6 V16.2 H7.1 V12.6 C7.1 8.6 8.6 5 12 2.6Z" />
      <circle cx="12" cy="9.6" r="1.8" />
      <path d="M7.1 12.8 L4.6 15.8 V18.6 L7.1 17.2 M16.9 12.8 L19.4 15.8 V18.6 L16.9 17.2" />
      <path d="M10.2 16.2 L12 21 L13.8 16.2" />
    </svg>
  )
}
