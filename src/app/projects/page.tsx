import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { CtaBand, PageHeader, ProjectCard, SectionHeading } from "@/components/UI";
import { profile, projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: `Software projects built by ${profile.name} — distributed systems, compilers, machine learning, and web applications.`,
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Things I built to answer a question."
        lead="Each of these started because reading about the idea was not enough. Descriptions focus on what the project does and what it cost to make it work."
      />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Featured" title="Work I am most proud of" />
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.name} delay={i * 80} className="h-full">
              <ProjectCard {...p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Also built" title="Other projects" />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {others.map((p, i) => (
            <Reveal key={p.name} delay={i * 80} className="h-full">
              <ProjectCard {...p} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Curious about the code?"
        body="Most of these live on GitHub with a README explaining the design decisions and the trade-offs I made."
        href="/contact"
        label="Ask me anything"
      />
    </>
  );
}
