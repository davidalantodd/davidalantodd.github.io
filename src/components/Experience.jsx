import multiverse from '../assets/Multiverse_Symbol_rgb_ultra.png'
import emerson from '../assets/emerson.jpeg'
import wellesley from '../assets/wellesley.jpeg'
import uga from '../assets/uga.jpeg'
import umd from '../assets/umd.jpeg'
import linkedin from '../assets/linkedin.png'

function Experience() {

    const jobs = [
        {
            title: "Software Engineering Coach",
            company: "Multiverse",
            companyLink: "https://www.multiverse.io",
            yearsWorked: "2022 - present",
            responsibilities: [
                "Deliver technical software engineering workshops to a cohort of apprentices covering tools and skills, such as JavaScript, Node.js, Express.js, Object-Oriented Programming, RESTful APIs, Databases, SQL, Test-Driven Development, Jest, Authentication, Auth0, React.js, User Interfaces, CSS Frameworks, State Management, Docker, CI/CD, Cloud, Security, HTML/CSS, Git, Github Actions, and Web Accessibility.",
                "Empower apprentices to complete curriculum projects demonstrating computer science skills through an applied learning model over the course of a 15-month apprenticeship, beginning with a 3-month software engineering bootcamp.",
                "Coach apprentices one-to-one throughout their first year on the job with partner companies with the goals of improving technical and durable skills and delivering business impact.",
                "Collaborate with apprentice managers to align on apprenticeship objectives, track apprentice progress, and identify opportunities for growth and professional development.",
                "Monitor and act on learner progress data to ensure a high level of coaching and instructional excellence and further improve the apprenticeship curriculum.",
                "Engage in professional development and continuous technical upskilling opportunities within the Delivery team to improve and maintain teaching pedagogy skills and technical credibility."
            ],
            logo: multiverse,
            altText: "multiverse logo"
        },
        {title: "Associate Director of Student Transitions",
            company: "Emerson College",
            companyLink: "https://www.emerson.edu",
            yearsWorked: "2020 - 2022",
            responsibilities: [
                "Managed onboarding experience for 1,300+ new undergraduate students each year with 82% satisfaction and a 9% increase in defined metrics year-over-year in 2021",
                "Lead an onboarding committee with 25 cross-functional stakeholders while engaging subject matter experts",
                "Directed job profile development, recruitment, selection, and hiring for onboarding team of 120+",
                "Delivered and improved a 40-session onboarding team training curriculum covering DEI, teamwork, and CliftonStrengths with a 0.87% increase in participant performance year-over-year in 2021",
                "Expanded DEI learning and development initiatives for 70+ employees to increase organization-wide key performance indicators",
                "Facilitated Faces of Emerson, a DEI workshop with 30 participants during onboarding",
                "Taught FS101: Emersion, a 20-person 1-credit onboarding class, with a 95.66% evaluation score",
                "Leveraged Canvas LMS for student onboarding with 723 completions and 72% pass-rate to drive enrollment impact",
                "Launched Wisr (1,334 active users) to create a digital onboarding cohort in 2020 in partnership with IT",
            ],
            logo: emerson,
            altText: "emerson college logo"
        },
        {title: "Advisor for New Student Programs",
            company: "Wellesley College",
            companyLink: "https://www.wellesley.edu",
            yearsWorked: "2017 - 2020",
            responsibilities: [
                "Developed and implemented onboarding programs for 700+ new undergraduate students with 83% satisfaction in 2019",
                "Served on a committee with 6 cross-functional stakeholders to align recruitment and training processes for 200+",
                "Led job profile development, sourcing, recruitment, selection, and hiring for an onboarding team of 70+",
                "Led a committee on new student onboarding while engaging subject matter experts and key campus stakeholders",
                "Collaborated with stakeholders to manage technology and social media platforms such as Workday, Guidebook, Drupal, Nelnet, Mailchimp, Instagram, Handshake, and Wellesley-specific applications",
                "Evaluated and benchmarked programs and processes to align with institutional objectives and key results",
            ],
            logo: wellesley,
            altText: "wellesley college logo"
        },
        {
            title: "College Student Affairs Administration, M.Ed.",
            company: "The University of Georgia",
            companyLink: "https://www.uga.edu",
            yearsWorked: "2015",
            responsibilities: [
                "Earned an M.Ed. in College Student Affairs Administration while working as a graduate assistant in the UGA LGBT Pride Center",
                "Durable/soft skills: staff development, student counseling, training & development, team building, higher education, student development, diversity & inclusion, orientation programs, and student affairs"
            ],
            logo: uga,
            altText: "uga logo"
        },
        {
            title: "Computer Science (B.S.) and Theatre (B.A.)",
            company: "The University of Maryland",
            companyLink: "https://www.umd.edu",
            yearsWorked: "2013",
            responsibilities: [
                "Earned dual degress in Computer Science (B.S.) and Theatre (B.A.)",
                "Technical skills: Object-Oriented Programming, Java, C, Ruby, OCaml, Matlab, Data Structures, and Algorithms",
                "Coursework: Object Oriented Programming I, Object Oriented Programming II, Introduction to Low-Level Programming Concepts, Discrete Structures, Organization of Programming Languages, Computer Organization, Algorithms ,Advanced Data Structures, Introduction to Human-Computer Interaction, Computer Systems Architecture, Image Processing (Computer Vision), Programming Language Technologies and Paradigms, Cryptology, Computer and Network Security"
            ],
            logo: umd,
            altText: "umd logo"
        }
    ]

    return (
    <>
       <h1 className="title">experience</h1>
       {jobs.map(job => {
            return <section key={job.id} className="about-section job-section">
                    <section className="logo-and-title">
                        <article className="work-box">
                            <img src={job.logo} alt={job.altText}/>
                        </article>
                        <aside>
                            <p className="job-title">{job.title} @ <a href={job.companyLink}>{job.company}</a></p>
                            <p className="years-worked">({job.yearsWorked})</p>
                        </aside>
                    </section>
                    <article className="section-text work-text">
                        <ul>
                            {job.responsibilities.map(r => {
                                return <li key={r.id}>{r}</li>
                            })}
                        </ul>
                        </article>
                </section>
       })}
        <h1 className="tech-stack-title">tech stack</h1>
       <section className="tech-stack">
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript"/></a>
            <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs"/></a>
            <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express"/></a>
            <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react"/></a>
            <a href="https://angular.io" target="_blank" rel="noreferrer"> <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular"/></a>
            <a href="https://www.java.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" alt="java"/></a>
            <a href="https://spring.io/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/springio/springio-icon.svg" alt="spring"/></a> 
            <a href="https://www.w3schools.com/cs/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg" alt="csharp"/></a>
            <a href="https://dotnet.microsoft.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original-wordmark.svg" alt="dotnet"/></a> 
            <a href="https://www.cprogramming.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg" alt="c"/></a>
            <a href="https://www.ruby-lang.org/en/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/ruby/ruby-original.svg" alt="ruby"/></a>
            <a href="https://www.python.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python"/></a>
            <a href="https://golang.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg" alt="go"/></a> 
            <a href="https://ocaml.org/" target="_blank" rel="noreferrer"> <img src="https://avatars.githubusercontent.com/u/1841483?s=280&v=4" alt="ocaml"/></a>
            <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker"/></a>
            <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql"/></a>
            <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql"/></a>
            <a href="https://jestjs.io" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest"/></a>
            <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git"/></a>
            <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5"/></a>
            <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3"/></a>
            <a href="https://getbootstrap.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap"/></a> 
            <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman"/></a>
            <a href="https://aws.amazon.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="aws"/></a>
            <a href="https://www.mathworks.com/" target="_blank" rel="noreferrer"> <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png" alt="matlab"/></a>
        </section>
        <section className="linked-in-section">
            <p> Find out more about my experience on LinkedIn: <a href="https://www.linkedin.com/in/david-alan-todd" target="_blank" rel="noreferrer opener"><img src={linkedin} alt="linkedin logo"/></a></p>
        </section>
        
    </>
    )
}

export default Experience