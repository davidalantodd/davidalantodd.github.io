import multiverse from '../assets/Multiverse_Symbol_rgb_ultra.png'
import emerson from '../assets/emerson.jpeg'
import wellesley from '../assets/wellesley.jpeg'
import uga from '../assets/uga.jpeg'
import umd from '../assets/umd.jpeg'
import linkedin from '../assets/linkedin.png'
import njpc from '../assets/NJPC.png'

function Experience() {

    const jobs = [
        {
            title: "Software Engineering Coach",
            company: "Multiverse",
            companyLink: "https://www.multiverse.io",
            yearsWorked: "2022 - present",
            responsibilities: [
                "Teach 165+ technical workshops over two years to software engineering apprentices to increase their knowledge of front-end, back-end, and deployment technologies, including Node.js, Express, React, OOP, RESTful APIs, Databases, Data Security, TDD, UI Development, Docker, CI/CD, and Cloud.",
                "Build RESTful API endpoints secured with data encryption, basic auth, JWTs, and OAuth using C#/.NET to serve as alternative learning materials for back-end development. Expand apprenticeship curriculum tech stack coverage by 20% to enable additional apprentices to utilize curriculum materials.",
                "Design and deliver a series of data structures and algorithms coding challenges (JavaScript/Node) to strengthen fundamental programming concepts in junior software engineers. Boost overall Multiverse product credibility by enhancing personal coach expertise score from 5.4 to 5.8/6.",
                "Mentor 77 software engineering apprentices across 11 partner companies (e.g. Cisco, AMEX, Verizon, HP) and 5 cohorts over two years. Elevated end-user experience, increasing apprentice NPS from 23 to 95/100 by providing personalized guidance through 107+ code reviews (in 7 programming languages).",
                "Facilitate 76+ progress reviews and 166+ one-to-one coaching meetings over two years, aligning with apprentices and managers on objectives to create business impact. Drive significant improvement in client satisfaction, increasing manager ROI score from 4.8 to 5.4/6 and manager NPS from 7 to 69/100.",
                "Reduce time of project feedback and progress review workflows by 50% by collaborating with other teammates to develop internal automation tools using Coda.",
                "Improve technical credibility and teaching pedagogy skills by engaging in continuous technical upskilling opportunities, such as participating in Advent of Code and self-study projects."
            ],
            logo: multiverse,
            altText: "multiverse logo"
        },
        {
            title: "Volunteer Software Engineer",
            company: "New Jersey Parents' Caucus",
            companyLink: "https://newjerseyparentscaucus.org/",
            yearsWorked: "2024 - present",
            responsibilities: [
                "Contribute to software development efforts on the volunteer technical team using TypeScript, JavaScript, React, Node.js, and MongoDB.",
                "Build and maintain a centralized hub of resources related to the services provided by the New Jersey Parents' Caucus, including mental health evaluation, family intake, and referral database management."
            ],
            logo: njpc,
            altText: "NJPC logo"
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

    const tech = [
        {
            link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
            imageURL:"https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
            altText: "javascript"
        },
        {
            link: "https://nodejs.org",
            imageURL:"https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg",
            altText: "nodejs"
        },
        {
            link: "https://expressjs.com",
            imageURL:"https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg",
            altText: "express"
        },
        {
            link: "https://reactjs.org/",
            imageURL:"https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg",
            altText: "react"
        },
        {
            link: "https://angular.io",
            imageURL:"https://angular.io/assets/images/logos/angular/angular.svg",
            altText: "angular"
        },
        {
            link: "https://www.java.com",
            imageURL:"https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
            altText: "java"
        },
        {
            link: "https://spring.io/",
            imageURL:"https://www.vectorlogo.zone/logos/springio/springio-icon.svg",
            altText: "spring"
        },
        {
            link: "https://learn.microsoft.com/en-us/dotnet/csharp/",
            imageURL:"https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg",
            altText: "csharp"
        },
        {
            link: "https://dotnet.microsoft.com/",
            imageURL:"https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original-wordmark.svg",
            altText: "dotnet"
        },
        {
            link: "https://www.cprogramming.com/",
            imageURL:"https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg",
            altText: "c"
        },
        {
            link: "https://www.ruby-lang.org/en/",
            imageURL:"https://raw.githubusercontent.com/devicons/devicon/master/icons/ruby/ruby-original.svg",
            altText: "ruby"
        },
        {
            link: "https://www.python.org",
            imageURL:"https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
            altText: "python"
        },
        {
            link: "https://golang.org",
            imageURL:"https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg",
            altText: "go"
        },
        {
            link: "https://ocaml.org/",
            imageURL:"https://avatars.githubusercontent.com/u/1841483?s=280&v=4",
            altText: "ocaml"
        },
        {
            link: "https://www.docker.com/",
            imageURL:"https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg",
            altText: "docker"
        },
        {
            link: "https://www.mysql.com/",
            imageURL:"https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg",
            altText: "mysql"
        },
        {
            link: "https://www.postgresql.org",
            imageURL:"https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg",
            altText: "postgresql"
        },
        {
            link: "https://jestjs.io",
            imageURL:"https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg",
            altText: "jest"
        },
        {
            link: "https://git-scm.com/",
            imageURL:"https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
            altText: "git"
        },
        {
            link: "https://www.w3.org/html/",
            imageURL:"https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg",
            altText: "html5"
        },
        {
            link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
            imageURL:"https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg",
            altText: "css3"
        },
        {
            link: "https://getbootstrap.com",
            imageURL:"https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg",
            altText: "bootstrap"
        },
        {
            link: "https://postman.com",
            imageURL:"https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
            altText: "postman"
        },
        {
            link: "https://aws.amazon.com",
            imageURL:"https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
            altText: "aws"
        },
        {
            link: "https://www.mathworks.com/",
            imageURL:"https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png",
            altText: "matlab"
        },
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
            {tech.map(t => {
                return <a key={t.id} href={t.link} target="_blank" rel="noreferrer"> <img src={t.imageURL} alt={t.altText}/></a>
            })}
        </section>
        <section className="linked-in-section">
            <p> Find out more about my experience on LinkedIn: <a href="https://www.linkedin.com/in/david-alan-todd" target="_blank" rel="noreferrer opener"><img src={linkedin} alt="linkedin logo"/></a></p>
        </section>
        
    </>
    )
}

export default Experience