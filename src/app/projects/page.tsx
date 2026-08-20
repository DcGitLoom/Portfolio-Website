import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { CtaBand, PageHeader, ProjectCard, SectionHeading } from "@/components/UI";
import { profile, projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: `Full-stack web applications built by ${profile.name} using React, Node.js, Express, MySQL, and Docker.`,
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Full-stack applications I have built."
        lead="Three projects: one solo, two on Agile teams. Each description says what the system does and which parts I was responsible for."
      />

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Selected work" title="Projects" />
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.name} delay={i * 80} className="h-full">
              <ProjectCard {...p} />
            </Reveal>
          ))}
        </div>
      </section>

      {others.length > 0 && (
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
      )}

      <CtaBand
        title="Curious about the code?"
        body="PCubed and Discussion Board are on GitHub. Happy to walk through any of the architecture or testing decisions."
        href="/contact"
        label="Ask me anything"
      />
    </>
  );
}
