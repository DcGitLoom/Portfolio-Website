import { HeroVisual } from "@/components/HeroVisual";
import { SCROLL_OFFSET } from "@/lib/scroll";
import { Reveal } from "@/components/Reveal";
import { CopyEmail } from "@/components/CopyEmail";
import { ArrowUpRight } from "@/components/Icons";
import { glyphMap } from "@/components/Icons";
import {
  CtaBand, DisciplineCard, ProjectCard, SectionHeading, Tag,
} from "@/components/UI";
import {
  disciplines, education, experience, otherExperience, profile,
  projects, socials, stats, toolbelt,
} from "@/lib/content";

const values = [
  {
    title: "Reliability over cleverness",
    body: "Software that works for real people has to keep working. I would rather ship something predictable than something impressive that falls over on the second try.",
  },
  {
    title: "Test it before someone else does",
    body: "Writing tests first changes what you build, not just what you verify. Unit, integration, and end-to-end each catch a different class of mistake, and load testing catches the ones that only appear under pressure.",
  },
  {
    title: "Clean code and honest feedback",
    body: "The best teams I have worked on said what was actually wrong with a pull request. Code review is where the standard gets set, so it is worth being direct.",
  },
];

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <>
      {/* ================= Hero ================= */}
      <section id="home" className="relative overflow-hidden" style={{ scrollMarginTop: SCROLL_OFFSET }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(70% 90% at 50% 0%, rgba(34,197,94,0.13), transparent 68%)" }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-5 pt-10 sm:px-8">
          <Reveal className="flex flex-wrap justify-center gap-3">
            <a
              href="#projects"
              className="group inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-surface/80 py-1.5 pl-1.5 pr-5 text-sm font-medium text-fg backdrop-blur transition-all duration-200 hover:border-accent/50 hover:bg-surface-2"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
                <glyphMap.grid className="h-4 w-4" aria-hidden="true" />
              </span>
              See my work
            </a>
            <a
              href="#about"
              className="group inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-surface/80 py-1.5 pl-1.5 pr-5 text-sm font-medium text-fg backdrop-blur transition-all duration-200 hover:border-accent/50 hover:bg-surface-2"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
                <glyphMap.doc className="h-4 w-4" aria-hidden="true" />
              </span>
              About me
            </a>
            <a
              href="#contact"
              className="group inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-surface/80 py-1.5 pl-1.5 pr-5 text-sm font-medium text-fg backdrop-blur transition-all duration-200 hover:border-accent/50 hover:bg-surface-2"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
                <glyphMap.chat className="h-4 w-4" aria-hidden="true" />
              </span>
              Get in touch
            </a>
          </Reveal>

          <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
            <Reveal delay={80} className="order-2 lg:order-1">
              <p className="font-display text-sm uppercase tracking-[0.2em] text-muted">
                {profile.kicker}
              </p>
              <h1 className="mt-3 font-display text-xl leading-snug font-light whitespace-pre-line sm:text-2xl">
                <span className="sr-only">{profile.name}, </span>
                {profile.discipline}
              </h1>
              {profile.available && (
                <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-3.5 py-2 text-xs text-muted">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  {profile.availableLabel}
                </p>
              )}
            </Reveal>

            <Reveal delay={160} className="order-1 drift lg:order-2">
              <HeroVisual name={profile.name} wordmark={profile.wordmark} surname={profile.surname} />
            </Reveal>

            <Reveal delay={240} className="order-3">
              <p className="text-[15px] leading-relaxed text-muted lg:text-right">
                {profile.intro}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 lg:justify-end">
                <a
                  href="#projects"
                  className="group inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-transform duration-200 hover:scale-[1.03]"
                >
                  View projects
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="relative mt-14 overflow-hidden border-y border-border py-5">
          <div className="marquee-track flex w-max gap-10 pr-10">
            {[...toolbelt, ...toolbelt].map((t, i) => (
              <span key={`${t}-${i}`} className="font-display text-sm whitespace-nowrap text-muted/70">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= What I do ================= */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="What I do" title="Areas I work in" />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {disciplines.map((d, i) => (
            <Reveal key={d.title} delay={i * 60} className="h-full">
              <DisciplineCard {...d} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= About ================= */}
      <section id="about" className="mx-auto max-w-6xl px-5 py-20 sm:px-8" style={{ scrollMarginTop: SCROLL_OFFSET }}>
        <Reveal>
          <SectionHeading eyebrow="About me" title="I build software that works for real people." lead={profile.intro} />
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <h3 className="font-display text-xs uppercase tracking-[0.18em] text-muted">How I got here</h3>
            <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-muted">
              <p>
                I am a Computer Science major at the University of Saskatchewan with a minor in
                Mathematics. Between a year of IT support at eHealth Saskatchewan and a set of
                full-stack projects, I have spent most of my degree learning to bridge the gap
                between complex backend logic and an interface someone can actually use.
              </p>
              <p>
                That work has ranged from independently architecting a Dockerised Q&amp;A platform
                to collaborating on a thirteen-person Agile team replacing a legacy archaeological
                database across five milestones. On that project I owned the RESTful CRUD endpoints,
                the container setup, the CI/CD pipeline, and the test suite, from unit through
                end-to-end, plus load and stress runs to confirm the system held under real
                conditions.
              </p>
              <p>
                The year at eHealth taught me a different lesson. Resolving high-volume technical
                tickets means the person on the other end is already blocked, so documenting the fix
                properly matters as much as finding it. Whichever side I am on, the focus is the
                same: reliability and scale.
              </p>
            </div>

            <div className="mt-12">
              <h3 className="font-display text-xs uppercase tracking-[0.18em] text-muted">
                Technologies I reach for
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {toolbelt.map((t) => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={80}>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-display text-xs uppercase tracking-[0.18em] text-muted">At a glance</h3>
                <dl className="mt-5 space-y-4">
                  {stats.map((s) => (
                    <div key={s.label} className="flex items-baseline justify-between gap-4">
                      <dt className="text-sm text-muted">{s.label}</dt>
                      <dd className="font-display text-xl font-light text-accent">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-display text-xs uppercase tracking-[0.18em] text-muted">Education</h3>
                {education.map((e) => (
                  <div key={e.degree} className="mt-5">
                    <p className="font-display text-base font-medium">{e.degree}</p>
                    <p className="mt-1 text-sm text-accent">{e.org}</p>
                    <p className="mt-0.5 font-display text-xs text-muted">{e.period}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{e.detail}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-16">
          <h3 className="font-display text-xs uppercase tracking-[0.18em] text-muted">How I work</h3>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-border bg-surface p-6">
                  <span className="font-display text-sm text-accent">0{i + 1}</span>
                  <h4 className="mt-3 font-display text-lg font-medium tracking-tight">{v.title}</h4>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <div className="mt-16">
          <CtaBand
            title="Want the full résumé?"
            body="The PDF has the detailed coursework and references. Happy to talk through any of the projects too."
            href={profile.resume}
            label="Download résumé"
            external
          />
        </div>
      </section>

      {/* ================= Experience ================= */}
      <section id="experience" className="mx-auto max-w-4xl px-5 py-20 sm:px-8" style={{ scrollMarginTop: SCROLL_OFFSET }}>
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Where I have worked, and what I actually did."
            lead="A year-long IT internship at eHealth Saskatchewan and university contract work, plus the side hustles that paid for the degree."
          />
        </Reveal>

        <h3 className="mb-10 mt-14 pl-9 font-display text-xs uppercase tracking-[0.18em] text-muted sm:pl-12">
          Internship &amp; university roles
        </h3>
        <ol className="relative">
          <span className="absolute left-[7px] top-2 bottom-2 w-px bg-border sm:left-[9px]" aria-hidden="true" />
          {experience.map((job, i) => (
            <Reveal as="li" key={`${job.org}-${job.role}`} delay={i * 90} className="relative pl-9 pb-12 last:pb-0 sm:pl-12">
              <span className="absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border-2 border-accent bg-bg sm:h-[19px] sm:w-[19px]" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <div className="group rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent/40">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-display text-xl font-medium tracking-tight">{job.role}</h4>
                  <span className="font-display text-xs whitespace-nowrap text-muted">{job.period}</span>
                </div>
                <p className="mt-1 text-sm text-accent">{job.org}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{job.summary}</p>
                <ul className="mt-4 space-y-2">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-fg/85">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
                  {job.stack.map((s) => <Tag key={s}>{s}</Tag>)}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-12 pl-9 sm:pl-12">
          <h3 className="font-display text-xs uppercase tracking-[0.18em] text-muted">Side hustles</h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            Part-time and on-call work carried alongside full-time study. Unrelated to
            software, but where the customer-facing habits came from.
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {otherExperience.map((job) => (
              <li key={`${job.org}-${job.role}`} className="flex flex-col rounded-2xl border border-border bg-surface p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h4 className="font-display text-base font-medium tracking-tight">{job.role}</h4>
                  <span className="font-display text-xs whitespace-nowrap text-muted">{job.period}</span>
                </div>
                <p className="mt-1 text-sm text-accent">{job.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{job.summary}</p>
                <ul className="mt-3 space-y-1.5">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-sm leading-relaxed text-fg/85">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ================= Projects ================= */}
      <section id="projects" className="mx-auto max-w-6xl px-5 py-20 sm:px-8" style={{ scrollMarginTop: SCROLL_OFFSET }}>
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Full-stack applications I have built."
            lead="Three projects: one solo, two on Agile teams. Each description says what the system does and which parts I was responsible for."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.name} delay={i * 80} className="h-full">
              <ProjectCard {...p} />
            </Reveal>
          ))}
        </div>

        {others.length > 0 && (
          <>
            <Reveal className="mt-16">
              <SectionHeading eyebrow="Also built" title="Other projects" />
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {others.map((p, i) => (
                <Reveal key={p.name} delay={i * 80} className="h-full">
                  <ProjectCard {...p} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </section>

      {/* ================= Contact ================= */}
      <section id="contact" className="mx-auto max-w-4xl px-5 py-20 sm:px-8" style={{ scrollMarginTop: SCROLL_OFFSET }}>
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something."
            lead="I read everything that arrives and reply to most of it within a day or two. Email is the surest route; the links below all reach me too."
          />
        </Reveal>

        <Reveal delay={80} className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 text-center sm:p-14">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-52 opacity-70"
              style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(34,197,94,0.16), transparent 70%)" }}
              aria-hidden="true"
            />
            <p className="relative font-display text-xs uppercase tracking-[0.2em] text-muted">Email me at</p>
            <a
              href={`mailto:${profile.email}`}
              className="relative mt-4 inline-block font-display text-xl leading-tight font-light break-all transition-colors duration-200 hover:text-accent sm:text-3xl"
            >
              {profile.email}
            </a>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex min-h-11 cursor-pointer items-center rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-on-accent transition-transform duration-200 hover:scale-[1.03]"
              >
                Open mail app
              </a>
              <CopyEmail email={profile.email} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={160} className="mt-16">
          <h3 className="text-center font-display text-xs uppercase tracking-[0.2em] text-muted">Find me elsewhere</h3>
          <ul className="mt-6 flex flex-wrap justify-center gap-3">
            {socials.map((s) => {
              const Glyph = glyphMap[s.icon];
              const external = s.href.startsWith("http");
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer noopener" : undefined}
                    className="group flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-surface py-2.5 pl-3 pr-5 text-sm text-fg transition-all duration-200 hover:border-accent/50 hover:-translate-y-0.5"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-surface-2 text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-on-accent">
                      <Glyph className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={240} className="mt-16">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-display text-sm font-medium">What I am looking for</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                New-grad and internship roles in full-stack or backend development, in Saskatchewan
                or remote. I am equally happy writing the API or the tests around it.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-display text-sm font-medium">Based in</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {profile.location}, Canada. Comfortable working remotely across time zones.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
