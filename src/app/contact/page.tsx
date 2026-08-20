import type { Metadata } from "next";
import { CopyEmail } from "@/components/CopyEmail";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/UI";
import { glyphMap } from "@/components/Icons";
import { profile, socials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} about internships, collaboration, or open-source work.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's build something."
        lead="I read everything that arrives and reply to most of it within a day or two. Email is the surest route; the links below all reach me too."
      />

      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 text-center sm:p-14">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-52 opacity-70"
              style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(34,197,94,0.16), transparent 70%)" }}
              aria-hidden="true"
            />
            <p className="relative font-display text-xs uppercase tracking-[0.2em] text-muted">
              Email me at
            </p>
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

        <Reveal delay={120} className="mt-16">
          <h2 className="text-center font-display text-xs uppercase tracking-[0.2em] text-muted">
            Find me elsewhere
          </h2>
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

        <Reveal delay={200} className="mt-16">
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
