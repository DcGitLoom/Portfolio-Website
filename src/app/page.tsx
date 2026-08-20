import Link from "next/link";
import { HeroVisual } from "@/components/HeroVisual";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/Icons";
import {
  CtaBand, DisciplineCard, PillLink, ProjectCard, SectionHeading,
} from "@/components/UI";
import { disciplines, heroActions, profile, projects, stats, toolbelt } from "@/lib/content";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(70% 90% at 50% 0%, rgba(34,197,94,0.13), transparent 68%)" }}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-5 pt-10 sm:px-8">
          {/* Pill actions, echoing the reference layout */}
          <Reveal className="flex flex-wrap justify-center gap-3">
            {heroActions.map((a) => (
              <PillLink key={a.label} href={a.href} icon={a.icon}>{a.label}</PillLink>
            ))}
          </Reveal>

          <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
            <Reveal delay={80} className="order-2 lg:order-1">
              <p className="font-display text-sm uppercase tracking-[0.2em] text-muted">
                {profile.kicker}
              </p>
              <h1 className="mt-3 font-display text-xl leading-snug font-light whitespace-pre-line sm:text-2xl">
                <span className="sr-only">{profile.name} — </span>
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
                <Link
                  href="/projects"
                  className="group inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-transform duration-200 hover:scale-[1.03]"
                >
                  View projects
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Toolbelt marquee */}
        <div className="relative mt-14 overflow-hidden border-y border-border py-5">
          <div className="marquee-track flex w-max gap-10 pr-10">
            {[...toolbelt, ...toolbelt].map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="font-display text-sm whitespace-nowrap text-muted/70"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Statement ---------------- */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="What drives me"
            title="Building software that is correct, fast, and still readable a year later."
            lead="I am a computer science student who likes the unglamorous parts — schema design, complexity budgets, and tests that fail for the right reason. Most of what I build starts as a question I could not answer by reading about it."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70} className="bg-surface p-6">
              <p className="font-display text-3xl font-light text-accent sm:text-4xl">{s.value}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- What I do ---------------- */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
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

      {/* ---------------- Featured work ---------------- */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Selected work" title="Things I have built" />
          <Link
            href="/projects"
            className="group inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-accent"
          >
            All projects
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.name} delay={i * 80} className="h-full">
              <ProjectCard {...p} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Looking for an intern who ships?"
        body="I am open to internships and collaboration on backend, systems, and applied ML work. The fastest way to reach me is email."
        href="/contact"
        label="Get in touch"
      />
    </>
  );
}
