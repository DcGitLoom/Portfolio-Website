import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { CtaBand, PageHeader, SectionHeading, Tag } from "@/components/UI";
import { education, profile, stats, toolbelt } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name}, a Computer Science student at the University of Saskatchewan building full-stack web applications.`,
};

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

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About me"
        title="I build software that works for real people."
        lead={profile.intro}
      />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <SectionHeading eyebrow="Background" title="How I got here" />
            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted">
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
                <h3 className="font-display text-xs uppercase tracking-[0.18em] text-muted">
                  At a glance
                </h3>
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
                <h3 className="font-display text-xs uppercase tracking-[0.18em] text-muted">
                  Education
                </h3>
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
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="How I work" title="Three things I hold to" />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6">
                <span className="font-display text-sm text-accent">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-medium tracking-tight">{v.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Want the full résumé?"
        body="The PDF has the detailed coursework and references. Happy to talk through any of the projects too."
        href={profile.resume}
        label="Download résumé"
        external
      />
    </>
  );
}
