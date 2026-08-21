import Image from "next/image";
import { HeroVisual } from "@/components/HeroVisual";
import { SCROLL_OFFSET } from "@/lib/scroll";
import { Reveal } from "@/components/Reveal";
import { CopyEmail } from "@/components/CopyEmail";
import { ContactForm } from "@/components/ContactForm";
import { ArrowUpRight, glyphMap } from "@/components/Icons";
import { DisciplineCard, ProjectCard, Section, SectionHeading, Tag } from "@/components/UI";
import {
  disciplines, education, experience, otherExperience, profile,
  projects, socials, stats, toolbelt,
} from "@/lib/content";


const heroActions = [
  { href: "#projects", glyph: "grid", label: "See my work" },
  { href: "#about", glyph: "doc", label: "About me" },
  { href: "#contact", glyph: "chat", label: "Get in touch" },
] as const;

/** Shared grid rhythm, so every card grid on the page breathes identically. */
const GRID = "grid gap-6 md:gap-8";

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <>
      {/* ================= Hero ================= */}
      {/* Not wrapped in <Section>: the marquee below runs full-bleed, which a
          width-clamped container would cut off. */}
      <section
        id="home"
        className="relative overflow-hidden"
        style={{ scrollMarginTop: SCROLL_OFFSET }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(70% 90% at 50% 0%, rgba(34,197,94,0.13), transparent 68%)" }}
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
          <Reveal className="flex flex-wrap justify-center gap-3">
            {heroActions.map((a) => {
              const Glyph = glyphMap[a.glyph];
              return (
                <a
                  key={a.href}
                  href={a.href}
                  className="group inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-surface/80 py-1.5 pl-1.5 pr-5 text-sm font-medium text-fg backdrop-blur transition-all duration-200 hover:border-accent/50 hover:bg-surface-2 hover:-translate-y-0.5"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-on-accent transition-transform duration-200 group-hover:scale-110">
                    <Glyph className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {a.label}
                </a>
              );
            })}
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

            <Reveal delay={160} className="drift order-1 lg:order-2">
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
      {/* Divider suppressed: the marquee's own border already closes the hero. */}
      <Section divider={false}>
        <Reveal>
          <SectionHeading eyebrow="What I do" title="Areas I work in" />
        </Reveal>
        <div className={`mt-12 ${GRID} sm:grid-cols-2 lg:grid-cols-3`}>
          {disciplines.map((d, i) => (
            <Reveal key={d.title} delay={i * 60} className="h-full">
              <DisciplineCard {...d} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ================= About ================= */}
      <Section id="about">
        <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
          {/* Portrait */}
          <Reveal className="mx-auto w-full max-w-[260px] lg:mx-0 lg:max-w-[300px]">
            <div className="group relative">
              <div
                className="pointer-events-none absolute -inset-4 rounded-[2rem] opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(60% 60% at 50% 40%, rgba(34,197,94,0.28), transparent 70%)" }}
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-surface">
                <Image
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  width={600}
                  height={720}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Fades the frame into the section rather than ending on a hard
                    edge, top and bottom: the photo's overcast sky is far lighter
                    than the section behind it. */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,15,13,0.88) 0%, transparent 42%), " +
                      "linear-gradient(to bottom, rgba(10,15,13,0.55) 0%, transparent 30%)",
                  }}
                  aria-hidden="true"
                />
                <span className="absolute bottom-4 left-4 font-display text-[0.65rem] uppercase tracking-[0.28em] text-accent">
                  {profile.location}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Copy: short, first person, one accented pivot word. */}
          <Reveal delay={100} className="text-plate">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-accent" />
              <span className="font-display text-xs uppercase tracking-[0.22em] text-accent">About me</span>
            </div>

            <p className="font-display text-3xl leading-[1.25] font-light text-balance sm:text-4xl">
              {profile.about.lead}
            </p>

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted">
              {profile.about.body}
            </p>

            <p className="mt-8 font-display text-2xl font-medium tracking-tight text-accent sm:text-3xl">
              {profile.about.curiosity}
            </p>

            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              {profile.about.tail}
            </p>

            <div className="mt-10 flex flex-wrap gap-2">
              {toolbelt.slice(0, 8).map((t) => <Tag key={t}>{t}</Tag>)}
            </div>

            <div className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {stats.slice(0, 4).map((st) => (
                <div key={st.label} className="flex items-baseline gap-3 border-b border-border/60 pb-3">
                  <span className="font-display text-2xl font-light text-accent">{st.value}</span>
                  <span className="text-sm text-muted">{st.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ================= Experience ================= */}
      <Section id="experience">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Where I have worked, and what I actually did."
            lead="A year-long IT internship at eHealth Saskatchewan and university contract work, plus the side hustles that paid for the degree."
          />
        </Reveal>

        {/* Clamped but left-aligned, so the timeline keeps a readable measure
            without leaving the page's shared left baseline. */}
        <div className="mt-14 max-w-4xl">
          {/* Sits on the page's left baseline, like every other heading; the
              rail below starts here too and the cards hang off it. */}
          <h3 className="mb-8 font-display text-xs uppercase tracking-[0.18em] text-muted text-plate">
            Internship &amp; university roles
          </h3>
          <ol className="relative">
            <span className="absolute left-[7px] top-2 bottom-2 w-px bg-border sm:left-[9px]" aria-hidden="true" />
            {experience.map((job, i) => (
              <Reveal as="li" key={`${job.org}-${job.role}`} delay={i * 90} className="relative pl-9 pb-8 last:pb-0 sm:pl-12">
                <span className="absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border-2 border-accent bg-bg sm:h-[19px] sm:w-[19px]" aria-hidden="true">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <div className="rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent/40">
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
        </div>

        <Reveal className="mt-16">
          <h3 className="font-display text-xs uppercase tracking-[0.18em] text-muted text-plate">Side hustles</h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted text-plate">
            Part-time and on-call work carried alongside full-time study. Unrelated to
            software, but where the customer-facing habits came from.
          </p>
          <ul className={`mt-6 ${GRID} sm:grid-cols-2`}>
            {otherExperience.map((job) => (
              <li
                key={`${job.org}-${job.role}`}
                className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition-colors duration-300 hover:border-accent/40"
              >
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
      </Section>

      {/* Education: restored here after the About rewrite dropped it. A
          student portfolio has to state the degree and graduation date. */}
      <Section id="education" divider={false} className="!min-h-0 !py-0">
        <Reveal className="-mt-8 pb-4">
          <h3 className="font-display text-xs uppercase tracking-[0.18em] text-muted text-plate">Education</h3>
          <div className="mt-5 max-w-2xl rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-accent/40">
            {education.map((e) => (
              <div key={e.degree}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-display text-lg font-medium tracking-tight">{e.degree}</h4>
                  <span className="font-display text-xs text-muted">{e.period}</span>
                </div>
                <p className="mt-1 text-sm text-accent">{e.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{e.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ================= Projects ================= */}
      <Section id="projects">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Full-stack applications I have built."
            lead="Three projects: one solo, two on Agile teams. Each description says what the system does and which parts I was responsible for."
          />
        </Reveal>
        <div className={`mt-12 ${GRID} md:grid-cols-2 lg:grid-cols-3`}>
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
            <div className={`mt-12 ${GRID} md:grid-cols-2 lg:grid-cols-3`}>
              {others.map((p, i) => (
                <Reveal key={p.name} delay={i * 80} className="h-full">
                  <ProjectCard {...p} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </Section>

      {/* ================= Contact ================= */}
      <Section id="contact">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Let's connect."
            lead="I read everything that arrives and reply to most of it within a day or two. Use the form, or reach me directly on any of the links below."
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal delay={80}>
            <div className="flex h-full flex-col justify-between gap-10">
              <div>
                <p className="max-w-md text-base leading-relaxed text-muted text-plate">
                  Whether you have a role in mind, a project that needs a second
                  pair of hands, or just want to talk about something you are
                  building, my inbox is open.
                </p>

                <ul className="mt-8 flex flex-wrap gap-3">
                  {socials.map((s) => {
                    const Glyph = glyphMap[s.icon];
                    const external = s.href.startsWith("http");
                    return (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          aria-label={s.label}
                          title={s.label}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noreferrer noopener" : undefined}
                          className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-border bg-surface text-fg transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent hover:text-on-accent"
                        >
                          <Glyph className="h-[18px] w-[18px]" aria-hidden="true" />
                        </a>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-display text-sm break-all transition-colors duration-200 hover:text-accent sm:text-base"
                  >
                    {profile.email}
                  </a>
                  <CopyEmail email={profile.email} />
                </div>
              </div>

              <dl className={`${GRID} sm:grid-cols-2`}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent/40">
                  <dt className="font-display text-sm font-medium">What I am looking for</dt>
                  <dd className="mt-2.5 text-sm leading-relaxed text-muted">
                    New-grad and internship roles in full-stack or backend development, in
                    Saskatchewan or remote. I am equally happy writing the API or the tests
                    around it.
                  </dd>
                </div>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent/40">
                  <dt className="font-display text-sm font-medium">Based in</dt>
                  <dd className="mt-2.5 text-sm leading-relaxed text-muted">
                    {profile.location}, Canada. Comfortable working remotely across time zones.
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-8">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-70"
                style={{ background: "radial-gradient(70% 100% at 50% 0%, rgba(34,197,94,0.14), transparent 72%)" }}
                aria-hidden="true"
              />
              <div className="relative">
                <ContactForm email={profile.email} />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
