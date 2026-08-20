/**
 * Every piece of editable copy on the site lives here.
 * Change your details in this file and all five pages follow.
 */

export const profile = {
  name: "Dhruv Chaudhari",
  wordmark: "Dhruv",
  surname: "Chaudhari",
  kicker: "Computer Science",
  role: "Computer Science Student",
  discipline: "Full-Stack Developer\n& Software Engineer",
  intro:
    "Hi, I'm Dhruv. I'm a Computer Science student at the University of Saskatchewan with a minor in Mathematics. I build software that works for real people, bridging complex backend logic and interfaces people can actually use. My focus is reliability and scale, whether that means RESTful APIs, CI/CD pipelines, or a test suite that catches things before users do.",
  location: "Saskatoon, Saskatchewan",
  email: "dhruvchaudhari51659@gmail.com",
  github: "https://github.com/DcGitLoom",
  linkedin: "https://www.linkedin.com/in/dhruv-chaudhari-b999192a4",
  resume: "/dhruv-chaudhari-resume.pdf",
  available: true,
  availableLabel: "Open to new-grad & internship roles",
} as const;

export const toolbelt = [
  "JavaScript", "Python", "Java", "C", "React", "Node.js",
  "Express", "MySQL", "MongoDB", "Docker", "Vitest", "Git",
];

/** Home page "what I do" grid. */
export const disciplines = [
  {
    title: "Full-Stack Web Development",
    blurb: "End-to-end applications on the MERN and SERN stacks: React on the front, Node and Express behind it, SQL or Mongo underneath.",
    tags: ["React", "Node.js", "Express"],
    glyph: "stack" as const,
  },
  {
    title: "REST API Design",
    blurb: "CRUD endpoints structured around MVC, so the routing, data access, and business logic stay in separate places.",
    tags: ["REST", "MVC", "MySQL"],
    glyph: "server" as const,
  },
  {
    title: "Testing & QA",
    blurb: "Unit, integration, end-to-end, and coverage tests written test-first, plus load and stress runs to see what actually breaks.",
    tags: ["Vitest", "TDD", "E2E"],
    glyph: "graph" as const,
  },
  {
    title: "Docker & CI/CD",
    blurb: "Containerised services and pipelines that build, test, and deploy without anyone running steps by hand.",
    tags: ["Docker", "CI/CD"],
    glyph: "cloud" as const,
  },
  {
    title: "Agile Delivery",
    blurb: "Scrum on real teams, one of them thirteen people delivering across five incremental milestones.",
    tags: ["Scrum", "Agile"],
    glyph: "branch" as const,
  },
  {
    title: "IT Support & Troubleshooting",
    blurb: "A year on a service desk diagnosing hardware, software, and network faults, and documenting the fixes so they scale.",
    tags: ["Support", "Ticketing"],
    glyph: "spark" as const,
  },
];

export const stats = [
  { value: "3", label: "Full-stack apps built" },
  { value: "1 yr", label: "IT support internship at eHealth" },
  { value: "13", label: "Person Agile team on PCubed" },
  { value: "5", label: "Incremental milestones delivered" },
];

/** Internship and university roles — the work most relevant to engineering. */
export const experience = [
  {
    role: "Service Desk Analyst",
    org: "eHealth Saskatchewan · Internship",
    period: "May 2024 – Apr 2025",
    summary:
      "A year-long professional internship providing frontline technical support across the provincial health IT system.",
    points: [
      "Diagnosed and resolved hardware, software, and network faults, keeping disruption to clinical workflow minimal.",
      "Documented incidents and their solutions in the ticketing system, building a knowledge base others could work from.",
      "Escalated and resolved complex issues with cross-functional IT teams.",
    ],
    stack: ["Troubleshooting", "Ticketing", "Documentation"],
  },
  {
    role: "Grader, Math 110",
    org: "University of Saskatchewan · Contract",
    period: "Jan 2024 – Apr 2024",
    summary:
      "Marked assignments and exams for a first-year mathematics course.",
    points: [
      "Evaluated student work for fairness and accuracy, and fed patterns in the mistakes back to instructors.",
      "Maintained grade records and handled course materials under academic confidentiality.",
    ],
    stack: ["Mathematics", "Assessment"],
  },
];

/** Side hustles: part-time work held alongside full-time study. */
export const otherExperience = [
  {
    role: "Server",
    org: "Olive Garden",
    period: "Sep 2025 – Mar 2026",
    summary: "Ran sections of a fast-paced dining room through peak service.",
    points: [
      "Listened to what guests wanted and made menu recommendations that fit their tastes.",
      "Kept orders and payments accurate across busy shifts.",
      "Made sure every guest felt welcomed and looked after.",
    ],
  },
  {
    role: "Sales Associate",
    org: "Cabela's",
    period: "Oct 2023 – Mar 2024",
    summary: "Advised customers on merchandise on a busy retail floor.",
    points: [
      "Provided product information and helped customers choose between options.",
      "Processed sales, returns, and exchanges accurately.",
      "Backed up teammates through peak hours to keep the floor running.",
    ],
  },
  {
    role: "Convocation Usher",
    org: "University of Saskatchewan · On-call",
    period: "Jul 2023 – Apr 2024",
    summary: "Managed seating logistics and guest flow at formal university ceremonies.",
    points: [
      "Guided guests, graduates, and faculty to their seating areas and ran a smooth check-in.",
      "Optimised seating layout for capacity and comfort.",
      "Worked with event staff to keep each ceremony moving to schedule.",
    ],
  },
  {
    role: "Sales Representative",
    org: "Petro-Canada Lubricants",
    period: "Mar 2022 – Jul 2023",
    summary: "Handled purchases, payments, and enquiries on a permanent part-time basis.",
    points: [
      "Gave customers accurate information on products, pricing, and services.",
      "Processed transactions and balanced daily sales.",
      "Built repeat relationships with regular customers.",
    ],
  },
];

export const education = [
  {
    degree: "B.Sc. Computer Science",
    org: "University of Saskatchewan",
    period: "Jan 2022 – Dec 2026",
    detail: "Minor in Mathematics. Graduating December 2026. Software engineering coursework (CMPT 371) produced the PCubed team project.",
  },
];

export const projects = [
  {
    name: "PCubed",
    tagline: "A full-stack replacement for a legacy archaeological database, delivered by a 13-person Agile team.",
    stack: ["React", "Node.js", "Express", "MySQL", "Docker", "Vitest"],
    highlights: [
      "Built the RESTful CRUD endpoints for artifact and site data",
      "Wrote unit, integration, end-to-end, and coverage tests test-first",
      "Set up Docker containerisation and the CI/CD pipeline",
      "Ran load, stress, and UX testing to check behaviour under real conditions",
    ],
    href: "https://github.com/UniversityOfSaskatchewanCMPT371/term-project-2024-team-4",
    year: "2024",
    featured: true,
  },
  {
    name: "Discussion Board",
    tagline: "A Dockerised Q&A platform where developers ask programming questions inside topic-based channels.",
    stack: ["React", "Node.js", "Express", "MySQL", "Docker"],
    highlights: [
      "Threaded replies, code screenshot uploads, and like/dislike voting",
      "Bookmarking so users can return to channels and questions",
      "Admin dashboard for managing users and channels",
      "Whole stack comes up with a single docker compose up, with no manual setup",
    ],
    href: "https://github.com/DcGitLoom/Discussion-Board",
    year: "2025",
    featured: true,
  },
  {
    name: "Doc-Directory",
    tagline: "A platform that simplifies finding, filtering, and booking appointments with healthcare professionals.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    highlights: [
      "Search and filter practitioners, then book directly",
      "Built on the MERN stack following Agile web development practice",
    ],
    year: "2024",
    featured: true,
  },
];

export const socials = [
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" as const },
  { label: "GitHub", href: profile.github, icon: "github" as const },
  { label: "LinkedIn", href: profile.linkedin, icon: "linkedin" as const },
  { label: "Résumé", href: profile.resume, icon: "doc" as const },
];
