// line-drawn icons so they match the illustrated style of the rest of the site
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <rect x="2.5" y="2.5" width="19" height="19" rx="4.5" />
      <circle cx="7.6" cy="7.6" r="1.1" className="dot" />
      <path d="M7.6 10.6 V17" />
      <path d="M11.4 17 V10.6 M11.4 13.6 C11.4 11.6 12.6 10.5 14.3 10.5 C16 10.5 16.9 11.6 16.9 13.4 V17" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="icon">
      <path
        className="thin"
        d="M8 .6C3.9.6.6 3.9.6 8c0 3.3 2.1 6 5.1 7 .4.1.5-.2.5-.4v-1.3c-2.1.5-2.5-.9-2.5-.9-.3-.9-.8-1.1-.8-1.1-.7-.5.1-.5.1-.5.7.1 1.1.8 1.1.8.7 1.2 1.8.8 2.2.6.1-.5.3-.8.5-1-1.6-.2-3.4-.8-3.4-3.6 0-.8.3-1.5.8-2-.1-.2-.3-1 .1-2 0 0 .6-.2 2 .8.6-.2 1.2-.2 1.8-.2s1.2.1 1.8.2c1.4-1 2-.8 2-.8.4 1 .1 1.8.1 2 .5.5.8 1.2.8 2 0 2.8-1.7 3.4-3.4 3.6.3.2.5.7.5 1.4v2c0 .2.1.5.6.4 3-1 5.1-3.8 5.1-7C15.4 3.9 12.1.6 8 .6Z"
      />
    </svg>
  )
}

function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="site-foot gutter">
      <div className="inner foot">
        <a className="next" href="#home">
          Back down to the coast ↑
        </a>
        <div className="socials">
          <a href="https://www.linkedin.com/in/david-alan-todd" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <LinkedInIcon />
          </a>
          <a href="https://github.com/davidalantodd/" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
            <GitHubIcon />
          </a>
          <span>©{currentYear} David Todd</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
