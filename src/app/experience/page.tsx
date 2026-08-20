import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { CtaBand, PageHeader, Tag } from "@/components/UI";
import { education, experience, otherExperience, profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experience",
  description: `Internships, research, and teaching experience of ${profile.name}.`,
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Where I have worked, and what I actually did."
        lead="A year-long IT internship at eHealth Saskatchewan and university contract work, plus the side hustles that paid for the degree."
      />

      <section className="mx-auto max-w-4xl px-5 pt-20 pb-12 sm:px-8">
        <h2 className="mb-10 pl-9 font-display text-xs uppercase tracking-[0.18em] text-muted sm:pl-12">
          Internship &amp; university roles
        </h2>
        <ol className="relative">
          {/* Timeline spine */}
          <span
            className="absolute left-[7px] top-2 bottom-2 w-px bg-border sm:left-[9px]"
            aria-hidden="true"
          />

          {experience.map((job, i) => (
            <Reveal as="li" key={`${job.org}-${job.role}`} delay={i * 90} className="relative pl-9 pb-12 last:pb-0 sm:pl-12">
              <span
                className="absolute left-0 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border-2 border-accent bg-bg sm:h-[19px] sm:w-[19px]"
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </span>

              <div className="group rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent/40">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="font-display text-xl font-medium tracking-tight">{job.role}</h2>
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
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-12 sm:px-8">
        <Reveal className="pl-9 sm:pl-12">
          <h2 className="font-display text-xs uppercase tracking-[0.18em] text-muted">
            Side hustles
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            Part-time and on-call work carried alongside full-time study — unrelated to
            software, but where the customer-facing habits came from.
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {otherExperience.map((job) => (
              <li
                key={`${job.org}-${job.role}`}
                className="flex flex-col rounded-2xl border border-border bg-surface p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h3 className="font-display text-base font-medium tracking-tight">{job.role}</h3>
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

      <section className="mx-auto max-w-4xl px-5 pb-20 sm:px-8">
        {/* Same left offset as the timeline cards so the blocks share an edge. */}
        <Reveal className="pl-9 sm:pl-12">
          <h2 className="font-display text-xs uppercase tracking-[0.18em] text-muted">Education</h2>
          {education.map((e) => (
            <div key={e.degree} className="mt-5 rounded-2xl border border-border bg-surface p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-lg font-medium tracking-tight">{e.degree}</h3>
                <span className="font-display text-xs text-muted">{e.period}</span>
              </div>
              <p className="mt-1 text-sm text-accent">{e.org}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{e.detail}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <CtaBand
        title="Hiring a new grad or intern?"
        body="I am looking for full-stack or backend work where I can own a feature end to end — from the schema through to the tests that keep it honest."
        href="/contact"
        label="Start a conversation"
      />
    </>
  );
}
