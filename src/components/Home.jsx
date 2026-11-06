import { NavLink } from "react-router-dom"

function Home() {
    return (
    <>
       <section id="home-section">
        <h1 id="home-name">david alan todd</h1>
        <h2 id="home-subtitle">mission-driven software engineer</h2>
        <p>learn more about <NavLink to="about">me</NavLink>, my <NavLink to="experience">experience</NavLink>, and my <NavLink to="projects">work</NavLink>.</p>
       </section>
    </>
    )
}

export default Home