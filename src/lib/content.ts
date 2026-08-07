/**
 * Every word on the site lives here.
 *
 * This is placeholder content written to read like the real thing, so the
 * layout is exercised against realistic string lengths. To make the site
 * yours, edit this file — you should not need to touch any component.
 */

export const profile = {
  first: "Dhruv",
  last: "Chaudhari",
  role: "Full-stack developer",
  tagline:
    "I take a vague problem, find the actual one underneath it, and ship something that still works six months later.",
  location: "India · IST",
  email: "dhruvchaudhari51659@gmail.com",
  /** Runs in the ticker under the masthead. Keep each item short. */
  statusLine: [
    "Available for freelance",
    "Open to full-time roles",
    "Based in India · IST",
    "Replies within a day",
  ],
};

export const about = {
  statement:
    "I build the parts nobody demos — the sync layer, the migration, the job that has to not fail at 3am.",
  paragraphs: [
    "Most of my work is backend systems and the interfaces that sit on top of them. I like problems where the hard part is state: things that have to stay correct while several processes disagree about what just happened.",
    "I write tests before I write the thing, keep pull requests small enough to actually read, and would rather delete code than add a flag to it.",
  ],
  skills: [
    { group: "Languages", items: ["TypeScript", "Python", "Go", "SQL"] },
    { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
    { group: "Backend", items: ["Node.js", "FastAPI", "PostgreSQL", "Redis"] },
    { group: "Infrastructure", items: ["Docker", "GitHub Actions", "AWS", "Vercel"] },
  ],
};

export type Project = {
  title: string;
  year: string;
  blurb: string;
  stack: string[];
  href: string;
};

export const projects: Project[] = [
  {
    title: "Ledgerline",
    year: "2026",
    blurb:
      "A double-entry bookkeeping engine that reconciles 40,000 transactions a night and refuses to let the books drift.",
    stack: ["TypeScript", "PostgreSQL", "Fastify"],
    href: "https://github.com/DcGitLoom",
  },
  {
    title: "Halfpipe",
    year: "2025",
    blurb:
      "A CI dashboard that tells you why a build failed instead of just that it failed.",
    stack: ["Next.js", "Go", "ClickHouse"],
    href: "https://github.com/DcGitLoom",
  },
  {
    title: "Understudy",
    year: "2025",
    blurb:
      "Local-first notes that sync over CRDTs, so two offline devices can both be edited and neither loses a word.",
    stack: ["React", "Rust", "WebAssembly"],
    href: "https://github.com/DcGitLoom",
  },
  {
    title: "Signalbox",
    year: "2024",
    blurb:
      "A webhook relay that buffers, retries, and replays deliveries for downstream services that go offline.",
    stack: ["Python", "Redis", "Docker"],
    href: "https://github.com/DcGitLoom",
  },
];

export const contact = {
  prompt: "Got something that needs building? Tell me what breaks today.",
};

export const links = [
  { label: "GitHub", href: "https://github.com/DcGitLoom" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/" },
  { label: "Email", href: `mailto:${profile.email}` },
];

export const sections = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];
