import headshot from '../assets/headshot.jpg'
import provincetown from '../assets/provincetown.jpeg'

function About() {
    return (
    <>
        <h1 className="title">about me</h1>
        <section className="about-section">
            <img className="picture" src={headshot} alt="headshot of David Todd"/>
            <article className="section-text">
                <h3>David Todd (he/him)</h3>
                <p>Hello! My name is David and I&apos;m a mission-driven software engineer who likes to build things that help people. Currently a full-stack software developer at <a href='https://www.saic.com/'>SAIC</a>. I was born and raised in Maryland and I currently live in Washington, D.C.</p>
                <p>I have always had an interest in the intersection of people and technology and am grateful to be able to combine my software engineering skills with my experiences in education.</p>
            </article>
        </section>
        <section className="about-section reversed-section">
            <article className="section-text">
                <p>Since transitioning to software engineering in 2022, I&apos;ve built full-stack apps for clients, mentored junior engineers, and led the integration of AI tools. My goal is to combine my technical skills and experiences in education to build software that solves meaningful problems.</p>   
                <p>I&apos;m mostly using Vue.js, C#/.NET, PostgreSQL, AWS, and Docker currently, but I also have experience with TypeScript, Node, React, Java/Spring, and Python.</p>
                <p>I am interested in human-computer interaction, accessibility, and AI.</p>
            </article>
            <article className="title-box" id="swe-box">
                <p>software engineering</p>
            </article>
        </section>
        <section className="about-section">
            <article className="title-box" id="edu-box">
                <p>education</p>
            </article>
            <article className="section-text">
                <p>I spent the first 7 years of my career as a college administrator, and the skills I learned during that time (collaboration, leadership, and problem solving) have become my biggest strengths as a developer.</p>   
                <p>Experienced in one-to-one coaching, workshop facilitation, teaching, training, student development, program management, data analysis & assessment, and social justice/anti-oppression education.</p>
                <p>Interested in DEI, inclusive education, teaching pedagogy, applied learning, flipped classrooms, radical candor, growth mindset, counseling, and group dynamics.</p>
            </article>
        </section>
        <section className="about-section reversed-section">
            <article className="section-text">
                <p>Outside of work, I enjoy spending time with my partner and our son. As a family, we enjoy birding, exploring the city, gardening, going to the beach, and traveling.</p>
                <p>I also like singing, listening to music (I love musical theatre!), reading (a favorite: <a href="https://www.goodreads.com/book/show/49127718-anxious-people">Anxious People</a>), going to the gym, playing a game on Nintendo Switch (current favorite: <a href="https://zelda.nintendo.com/tears-of-the-kingdom">Legend of Zelda: Tears of the Kingdom</a>), or watching some good TV (some favorites: Abbott Elementary, RHOSLC, and Bob&apos;s Burgers).</p> 
            </article>
            <img className="picture" src={provincetown} alt="picture of a beach in provincetown, ma"/>
        </section>
        <section className="quote-section">
            <p id="quote"><em> “Never doubt that a small group of thoughtful, committed, citizens can change the world. Indeed, it is the only thing that ever has.” <strong>― Margaret Mead</strong></em></p>
        </section>
    </>
    )
}

export default About