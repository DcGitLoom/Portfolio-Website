/**
 * Every piece of editable copy on the site lives here.
 * Change your details in this file and all five pages follow.
 */

export const profile = {
  name: "Dhruv Chaudhari",
  wordmark: "dhruv",
  kicker: "Computer Science",
  role: "Computer Science Student",
  discipline: "Full-Stack Developer\n& Systems Engineer",
  intro:
    "Hi, I'm Dhruv, a computer science student building full-stack products, distributed systems, and machine learning tools. I care about clean architecture, measurable performance, and software that stays readable a year later.",
  location: "India",
  email: "dhruvchaudhari51659@gmail.com",
  github: "https://github.com/DcGitLoom",
  available: true,
} as const;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

/** The three pill actions across the top of the hero. */
export const heroActions = [
  { label: "See my work", href: "/projects", icon: "grid" as const },
  { label: "My résumé", href: "/about", icon: "doc" as const },
  { label: "Get in touch", href: "/contact", icon: "chat" as const },
];

export const toolbelt = [
  "TypeScript", "Python", "React", "Next.js", "Node.js", "PostgreSQL",
  "Docker", "Go", "Rust", "AWS", "Redis", "Kubernetes",
];

/** Home page "what I do" grid. */
export const disciplines = [
  {
    title: "Full-Stack Engineering",
    blurb: "End-to-end web apps with typed APIs, sensible data models, and tests that mean something.",
    tags: ["Next.js", "Node", "PostgreSQL"],
    glyph: "stack" as const,
  },
  {
    title: "Machine Learning",
    blurb: "Applied ML — training loops, evaluation harnesses, and getting models into production.",
    tags: ["PyTorch", "NumPy", "MLflow"],
    glyph: "spark" as const,
  },
  {
    title: "Systems & Backend",
    blurb: "Concurrency, caching layers, and services that hold their latency budget under load.",
    tags: ["Go", "Rust", "Redis"],
    glyph: "server" as const,
  },
  {
    title: "Data Structures & Algorithms",
    blurb: "Competitive programming background — complexity analysis is a reflex, not a chore.",
    tags: ["C++", "Python"],
    glyph: "graph" as const,
  },
  {
    title: "Cloud & DevOps",
    blurb: "Containerised deploys, CI pipelines, and infrastructure that is reproducible from a clean clone.",
    tags: ["Docker", "AWS", "GH Actions"],
    glyph: "cloud" as const,
  },
  {
    title: "Open Source",
    blurb: "Contributing patches, writing docs, and maintaining small libraries other people actually use.",
    tags: ["Git", "OSS"],
    glyph: "branch" as const,
  },
];

export const stats = [
  { value: "12+", label: "Projects shipped" },
  { value: "5", label: "Languages used in production" },
  { value: "800+", label: "DSA problems solved" },
  { value: "3", label: "Open-source contributions" },
];

export const experience = [
  {
    role: "Software Engineering Intern",
    org: "Placeholder Technologies",
    period: "Jun 2026 — Aug 2026",
    summary:
      "Built an internal analytics service consumed by three product teams, cutting a nightly report job from 40 minutes to under 4.",
    points: [
      "Designed a partitioned PostgreSQL schema and rewrote the aggregation pipeline in Go.",
      "Added a Redis read-through cache, dropping p95 dashboard latency from 1.8s to 220ms.",
      "Wrote the integration test suite that now gates every deploy to production.",
    ],
    stack: ["Go", "PostgreSQL", "Redis", "Docker"],
  },
  {
    role: "Undergraduate Research Assistant",
    org: "University Systems Lab",
    period: "Jan 2026 — May 2026",
    summary:
      "Investigated scheduling strategies for GPU-shared training workloads under a faculty advisor.",
    points: [
      "Implemented a simulation harness in Python to compare four scheduling policies.",
      "Reproduced the baseline results from two prior papers and documented the deltas.",
      "Presented findings to the lab and contributed the harness back to the group's repo.",
    ],
    stack: ["Python", "PyTorch", "Matplotlib"],
  },
  {
    role: "Teaching Assistant — Data Structures",
    org: "Department of Computer Science",
    period: "Aug 2025 — Dec 2025",
    summary:
      "Ran weekly lab sections for 60 second-year students and graded algorithm assignments.",
    points: [
      "Held office hours focused on debugging technique rather than answers.",
      "Authored four supplementary problem sets on graphs and dynamic programming.",
    ],
    stack: ["C++", "Java"],
  },
  {
    role: "Freelance Web Developer",
    org: "Self-employed",
    period: "2024 — 2025",
    summary:
      "Delivered five small-business sites end to end, from design through deployment and handover.",
    points: [
      "Shipped every project on static hosting with sub-second first paint.",
      "Handed each client a written maintenance guide so they were not dependent on me.",
    ],
    stack: ["Next.js", "Tailwind", "Vercel"],
  },
];

export const education = [
  {
    degree: "B.Sc. Computer Science",
    org: "Your University",
    period: "2024 — 2028",
    detail: "Coursework: Algorithms, Operating Systems, Databases, Distributed Systems, Machine Learning, Compilers.",
  },
];

export const projects = [
  {
    name: "Distributed Task Queue",
    tagline: "A fault-tolerant job queue with at-least-once delivery and exponential backoff.",
    stack: ["Go", "Redis", "gRPC", "Docker"],
    highlights: [
      "Sustains 12k jobs/sec on a single node in benchmarks",
      "Leases reclaimed within 5s of a worker crash",
      "Property-based tests covering the retry state machine",
    ],
    year: "2026",
    featured: true,
  },
  {
    name: "Semantic Code Search",
    tagline: "Embedding-based search across a codebase, with ranking you can explain.",
    stack: ["Python", "PyTorch", "FastAPI", "pgvector"],
    highlights: [
      "Sub-100ms query latency over 40k indexed chunks",
      "Hybrid lexical + vector scoring with tunable weights",
      "Evaluation set of 200 labelled queries to catch regressions",
    ],
    year: "2026",
    featured: true,
  },
  {
    name: "Toy Compiler",
    tagline: "A statically typed language compiled to a custom bytecode VM.",
    stack: ["Rust", "LLVM IR"],
    highlights: [
      "Full pipeline from source text to executing bytecode",
      "Type inference for local bindings",
      "180 test programs pinning language semantics",
    ],
    year: "2025",
    featured: true,
  },
  {
    name: "Realtime Collaboration Editor",
    tagline: "Multi-cursor text editing backed by CRDTs.",
    stack: ["TypeScript", "React", "WebSocket", "Yjs"],
    highlights: [
      "Convergence verified with randomised concurrent-edit fuzzing",
      "Offline edits reconcile cleanly on reconnect",
    ],
    year: "2025",
    featured: false,
  },
  {
    name: "Campus Transit Tracker",
    tagline: "Live shuttle positions and arrival predictions for a university campus.",
    stack: ["Next.js", "PostgreSQL", "Mapbox"],
    highlights: [
      "Arrival predictions within ±90s of actual on average",
      "Used by roughly 400 students over one semester",
    ],
    year: "2025",
    featured: false,
  },
  {
    name: "dotfiles & devbox",
    tagline: "A reproducible development environment from a single clone.",
    stack: ["Nix", "Bash", "Docker"],
    highlights: [
      "Clean machine to working environment in under 4 minutes",
      "Same image used locally and in CI",
    ],
    year: "2024",
    featured: false,
  },
];

export const socials = [
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" as const },
  { label: "GitHub", href: profile.github, icon: "github" as const },
  { label: "LinkedIn", href: "https://linkedin.com/in/your-handle", icon: "linkedin" as const },
  { label: "X", href: "https://x.com/your-handle", icon: "x" as const },
  { label: "LeetCode", href: "https://leetcode.com/your-handle", icon: "code" as const },
];
