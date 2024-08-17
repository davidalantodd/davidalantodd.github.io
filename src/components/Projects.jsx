import musicalApp from '../assets/musical-app.png'
import github from '../assets/github.png'
import adventOfCode from '../assets/adventofcode.png'
import chickadee from '../assets/chickadee.png'

function Projects() {

    const projects = [
        {
            name:"Musical App",
            screenshot: musicalApp,
            altText: "musical app screenshot",
            description: "A full-stack app to track musical theatre productions using: C#/.NET, Angular/TypeScript/SCSS, and PostgreSQL",
            githubURL: "https://github.com/davidalantodd/musical-app",
            deploymentURL: null
        },
        {
            name:"Chickadee",
            screenshot: chickadee,
            altText: "chickadee app screenshot",
            description: "A front-end app to view recent bird sightings in your area using JavaScript, React, Bootstrap, Netlify, and eBird API data.",
            githubURL: "https://github.com/davidalantodd/chickadee",
            deploymentURL: "https://chickadeeapp.netlify.app"
        },
        {
            name:"Advent of Code",
            screenshot: adventOfCode,
            altText: "advent of code screenshot",
            description: "Solutions to Advent of Code challenge problems, using Ruby, Python, JavaScript, C, and Go",
            githubURL: "https://github.com/davidalantodd/advent-of-code",
            deploymentURL: null
        }
    ]
    return (
    <>
       <h1 className="title">projects</h1>
       <section className='project-section'>
        {projects.map(p => {
            return <section className="project" key={p.id}>
                <img className="screenshot" src={p.screenshot} alt={p.altText}/>
                <article className='project-text'>
                    <p className='project-title'>{p.name}</p>
                    <p className='description'>{p.description}</p>
                    <p className='links'>
                        <p className="sourceCode"> Source code: <a href={p.githubURL} target="_blank" rel="noreferrer opener"><img className="github" src={github} alt="Github Logo"/></a></p>
                        {(p.deploymentURL ? <p className="deployedURL"> Deployed app: <a href={p.deploymentURL} target="_blank" rel="noreferrer opener"><span className="material-symbols-outlined github">rocket_launch</span></a></p> : null)}
                    </p>
                </article>
            </section>
        })}
       </section>
    </>
    )
}

export default Projects