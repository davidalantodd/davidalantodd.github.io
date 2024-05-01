import { NavLink } from "react-router-dom"

function Header() {

return (
    <>
    <header>
          <NavLink to="/"><span className="material-symbols-outlined home-icon">home</span></NavLink>
            <nav className="nav">
              <NavLink to="about" className="header-link">about</NavLink>
              <NavLink to="experience"className="header-link">experience</NavLink>
              <NavLink to="projects"className="header-link">projects</NavLink>
            </nav>
          </header>
    </>
)
}

export default Header