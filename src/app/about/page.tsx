import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { CtaBand, PageHeader, SectionHeading, Tag } from "@/components/UI";
import { education, profile, stats, toolbelt } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name} — ${profile.role} focused on full-stack, systems, and applied machine learning.`,
};

const values = [
  {
    title: "Correctness before cleverness",
    body: "A clever solution nobody can modify is a liability. I optimise for the person reading the code six months from now — often me.",
  },
  {
    title: "Measure, then optimise",
    body: "I profile before I tune. Most performance intuitions are wrong, and a benchmark settles the argument faster than a discussion does.",
  },
  {
    title: "Finish the boring 20%",
    body: "Error paths, docs, and the deploy story are what separate a demo from something usable. That part is the job, not an afterthought.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About me"
        title="I build systems, and I like understanding them all the way down."
        lead={profile.intro}
      />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <SectionHeading eyebrow="Background" title="How I got here" />
            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted">
              <p>
                I started programming because I wanted to know why my computer did what it did.
                That curiosity turned into a computer science degree, and along the way into a
                habit of rebuilding things from scratch — a queue, a compiler, a search engine —
                purely to see the machinery underneath.
              </p>
              <p>
                Most of my time now goes to full-stack and backend work. I am comfortable owning a
                feature end to end: schema, API, interface, tests, and the deploy that puts it in
                front of people. I have also spent enough hours on competitive programming that
                reasoning about complexity is automatic rather than deliberate.
              </p>
              <p>
                Outside coursework I contribute to open source, mentor first-year students, and keep
                a running list of systems papers I intend to reimplement. The list grows faster than
                it shrinks.
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
        body="Happy to send a PDF with detailed coursework, references, and project write-ups."
        href="/contact"
        label="Request résumé"
      />
    </>
  );
}
