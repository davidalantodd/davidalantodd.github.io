import saic from '../assets/logos/saic.png'
import njpc from '../assets/logos/njpc.png'
import multiverse from '../assets/logos/multiverse.png'
import emerson from '../assets/logos/emerson.jpg'
import wellesley from '../assets/logos/wellesley.jpg'
import uga from '../assets/logos/uga.jpg'
import umd from '../assets/logos/umd.jpg'

// Each stop on the river trail, newest first, since the walk goes upstream from today toward where it started.
// `bird` is the bird spotted at that bend, usually the official bird of the place David was working.
// `stats` are the quick read; `notes` are the full original bullets.

export const ROLES = [
  {
    years: '2025 – present',
    title: 'Full Stack Developer',
    org: 'SAIC',
    logo: saic,
    url: 'https://www.saic.com/',
    bird: { name: 'wood thrush', note: "D.C.'s official bird", call: 'thrush', symbol: 'songbird', viewBox: '0 0 30 22', colors: { '--body': '#a0703c', '--belly': '#f4ece0', '--head': '#b07a40', '--wing': '#8a5a2c' } },
    notes: [
      'Design, develop, and implement features for an application built with C#/.NET, Vue.js, and PostgreSQL, following agile development practices.',
      'Update software design documentation and provide support for solutions deployed to production.',
    ],
  },
  {
    years: '2024',
    title: 'Volunteer Software Engineer',
    org: "New Jersey Parents' Caucus",
    logo: njpc,
    url: 'https://newjerseyparentscaucus.org/',
    bird: { name: 'American goldfinch', note: "New Jersey's state bird", call: 'chip', symbol: 'songbird', viewBox: '0 0 30 22', colors: { '--body': '#f2d02b', '--belly': '#f7e27a', '--wing': '#222', '--cap': '#222', '--beak': '#e8a23c' } },
    notes: [
      'Decrease database maintenance task time and improve user experience by implementing a bulk delete feature for admin users to remove resources with confirmation modal and snack bar components.',
      'Improve data quality by adding a 409 HTTP response in back-end auth microservice and alerting users in UI when an attempt is made to register an email that already exists in the database during signup.',
      'Contribute to codebase and complete code reviews as part of the technical team using JavaScript/TS, React, Node, MongoDB, and Vercel.',
      "Build and maintain a centralized hub of resources related to the services provided by the New Jersey Parents' Caucus, including mental health evaluation, family intake, and referral database management.",
    ],
  },
  {
    years: '2022 – 2025',
    title: 'Software Engineering Instructor',
    org: 'Multiverse',
    logo: multiverse,
    url: 'https://www.multiverse.io',
    bird: { name: 'great blue heron', note: 'the patient teacher of the river', call: 'croak', symbol: 'heron', viewBox: '0 0 40 60', colors: {} },
    stats: [
      ['165+', 'technical workshops taught'],
      ['77', 'apprentices mentored'],
      ['23 → 95', 'apprentice NPS'],
      ['4.84/5', 'AI coaching session satisfaction'],
    ],
    notes: [
      "Developed API endpoints secured with data encryption, basic auth, JWTs, and OAuth using C#/.NET to contribute to back-end curriculum codebase and expand tech stack coverage by 20%.",
      "Built Cloudflare-hosted MCP server using TypeScript, OAuth GitHub integration, and Supabase backend to surface AI tool adoption productivity gains and impact stories within a user’s IDE.",
      "Taught 165+ technical workshops to junior software engineers covering JavaScript/Node, React, OOP, RESTful APIs, Databases, Security, TDD, UI, Docker, CI/CD, and Cloud.",
      "Designed DSA coding challenge series to strengthen fundamental programming concepts for junior engineers to enhance client ROI score from 4.8 to 5.4/6 and boost Multiverse product credibility.",
      "Facilitated 60+ coaching sessions to enable Multiverse platform users to adopt AI tools such as GitHub Copilot and Microsoft Copilot, earning a 4.84/5 for session satisfaction and a 4.71/5 coaching score.",
      "Mentored 77 software engineering apprentices across 11 partner companies (e.g. Cisco, AMEX, Verizon, HP) by providing personalized guidance through 107+ code reviews to increase NPS from 23 to 95/100.",
      "Facilitated 76+ progress reviews and 166+ coaching meetings, aligning with apprentices and managers on impact objectives. Drive improvement in client satisfaction, increasing manager NPS from 7 to 69/100.",
      "Reduced time of project feedback and progress review workflows by 50% by collaborating with other teammates to develop internal automation tools using Coda.",
      "Improved technical credibility and teaching pedagogy skills by engaging in technical upskilling opportunities, such as participating in Advent of Code and self-study projects.",
    ],
  },
  // the turtle log marks the switch from higher ed to software
  { log: true },
  {
    years: '2020 – 2022',
    title: 'Associate Director of Student Transitions',
    org: 'Emerson College',
    logo: emerson,
    url: 'https://www.emerson.edu',
    bird: { name: 'black-capped chickadee', note: "Massachusetts' state bird", call: 'chickadee', symbol: 'chickadee', viewBox: '0 0 64 56', colors: {} },
    stats: [
      ['1,300+', 'new students onboarded each year'],
      ['95.66%', 'FS101 evaluation score'],
      ['1,334', 'active users on Wisr'],
    ],
    notes: [
      'Managed onboarding experience for 1,300+ new undergraduate students each year with 82% satisfaction and a 9% increase in defined metrics year-over-year in 2021.',
      'Lead an onboarding committee with 25 cross-functional stakeholders while engaging subject matter experts.',
      'Directed job profile development, recruitment, selection, and hiring for onboarding team of 120+.',
      'Delivered and improved a 40-session onboarding team training curriculum covering DEI, teamwork, and CliftonStrengths with a 0.87% increase in participant performance year-over-year in 2021.',
      'Expanded DEI learning and development initiatives for 70+ employees to increase organization-wide key performance indicators.',
      'Facilitated Faces of Emerson, a DEI workshop with 30 participants during onboarding.',
      'Taught FS101: Emersion, a 20-person 1-credit onboarding class, with a 95.66% evaluation score.',
      'Leveraged Canvas LMS for student onboarding with 723 completions and 72% pass-rate to drive enrollment impact.',
      'Launched Wisr (1,334 active users) to create a digital onboarding cohort in 2020 in partnership with IT.',
    ],
  },
  {
    years: '2017 – 2020',
    title: 'Advisor for New Student Programs',
    org: 'Wellesley College',
    logo: wellesley,
    url: 'https://www.wellesley.edu',
    bird: { name: 'wood duck', note: 'a common sight on New England ponds', call: 'quack', symbol: 'duck', viewBox: '0 0 34 20', wide: true, colors: { '--body': '#9a7a62', '--wing': '#4a5a8a', '--head': '#2f7a54', '--crest': '#2f7a54', '--ring': '#fff', '--beak': '#d0623c' } },
    stats: [
      ['700+', 'new students onboarded'],
      ['83%', 'satisfaction in 2019'],
      ['70+', 'onboarding team hired'],
    ],
    notes: [
      'Developed and implemented onboarding programs for 700+ new undergraduate students with 83% satisfaction in 2019.',
      'Served on a committee with 6 cross-functional stakeholders to align recruitment and training processes for 200+.',
      'Led job profile development, sourcing, recruitment, selection, and hiring for an onboarding team of 70+.',
      'Led a committee on new student onboarding while engaging subject matter experts and key campus stakeholders.',
      'Collaborated with stakeholders to manage technology and social media platforms such as Workday, Guidebook, Drupal, Nelnet, Mailchimp, Instagram, Handshake, and Wellesley-specific applications.',
      'Evaluated and benchmarked programs and processes to align with institutional objectives and key results.',
    ],
  },
  {
    years: '2015 – 2017',
    title: 'Assistant Director of Visitor Experience',
    org: 'Emerson College',
    logo: emerson,
    url: 'https://www.emerson.edu',
    bird: { name: 'mallard', note: "Boston's Make Way for Ducklings bird", call: 'quack', symbol: 'duck', viewBox: '0 0 34 20', wide: true, colors: { '--body': '#b8b0a2', '--wing': '#6a7a9a', '--head': '#2f6e3e', '--ring': '#fff', '--beak': '#e8c33c' } },
    stats: [
      ['17,000+', 'prospective students and families'],
      ['45+', 'recruitment team led'],
    ],
    notes: [
      'Led full life-cycle recruitment process for a recruitment team of 45+ while assessing defined metrics.',
      'Designed and evaluated recruitment team training curriculum by liaising with campus stakeholders.',
      'Facilitated program assessment and tracked data to align with institutional objectives and key results.',
      'Developed and implemented recruitment, sourcing, and experiential marketing strategy for 17,000+ prospective students and families through campus tours, information sessions, and class visits.',
      'Directed program management of large-scale event logistics for student recruitment events.',
      "Co-led eQual, Emerson's LGBTQ+ staff ERG, and served on Enrollment Management Diversity Committee.",
    ],
  },
  {
    years: '2015',
    title: 'College Student Affairs Administration, M.Ed.',
    org: 'The University of Georgia',
    logo: uga,
    url: 'https://www.uga.edu',
    bird: { name: 'brown thrasher', note: "Georgia's state bird", call: 'trill', symbol: 'songbird', viewBox: '0 0 30 22', colors: { '--body': '#a5542b', '--belly': '#f0e0c0', '--head': '#a5542b', '--wing': '#8a4422', '--tail': '#8a4422' } },
    notes: [
      'Earned an M.Ed. in College Student Affairs Administration while working as a graduate assistant in the UGA LGBT Pride Center.',
      'Durable/soft skills: staff development, student counseling, training & development, team building, higher education, student development, diversity & inclusion, orientation programs, and student affairs.',
    ],
  },
  {
    years: '2013',
    title: 'Computer Science (B.S.) and Theatre (B.A.)',
    org: 'The University of Maryland',
    logo: umd,
    url: 'https://www.umd.edu',
    bird: { name: 'Baltimore oriole', note: "Maryland's state bird", call: 'thrush', symbol: 'songbird', viewBox: '0 0 30 22', colors: { '--body': '#f08a24', '--belly': '#f6a24a', '--head': '#1f1f1f', '--wing': '#1f1f1f', '--tail': '#1f1f1f' } },
    notes: [
      'Earned dual degrees in Computer Science (B.S.) and Theatre (B.A.).',
      'Technical skills: Object-Oriented Programming, Java, C, Ruby, OCaml, Matlab, Data Structures, and Algorithms.',
      'Coursework: Object Oriented Programming I & II, Low-Level Programming Concepts, Discrete Structures, Organization of Programming Languages, Computer Organization, Algorithms, Advanced Data Structures, Human-Computer Interaction, Computer Systems Architecture, Image Processing (Computer Vision), Programming Language Technologies and Paradigms, Cryptology, Computer and Network Security.',
    ],
  },
]

// the tech life list: `often` marks the tools David uses regularly
export const LIFE_LIST = [
  ['Vue.js', true],
  ['C#', true],
  ['.NET', true],
  ['PostgreSQL', true],
  ['AWS', true],
  ['Docker', true],
  ['JavaScript', true],
  ['Node.js', true],
  ['HTML5', true],
  ['CSS3', true],
  ['Bootstrap', true],
  ['Git', true],
  ['Jest', true],
  ['TypeScript'],
  ['React'],
  ['Angular'],
  ['Express'],
  ['Java'],
  ['Spring'],
  ['Python'],
  ['Ruby'],
  ['Go'],
  ['C'],
  ['OCaml'],
  ['MySQL'],
  ['Postman'],
  ['MATLAB'],
]
