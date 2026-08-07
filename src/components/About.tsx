import { about } from "@/lib/content";

export default function About() {
  return (
    <section
      id="about"
      className="px-6 py-24 sm:px-10 sm:py-32 lg:pr-16 lg:pl-44"
    >
      <p className="font-mono text-xs tracking-[0.35em] text-slate uppercase">
        About
      </p>

      <div className="mt-12 grid gap-14 md:grid-cols-12 md:gap-16">
        <h2 className="font-display text-[clamp(1.65rem,3.6vw,2.75rem)] leading-[1.08] font-bold tracking-[-0.025em] md:col-span-6">
          {about.statement}
        </h2>

        <div className="md:col-span-6">
          {about.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="mb-6 max-w-prose leading-relaxed text-slate sm:text-lg"
            >
              {paragraph}
            </p>
          ))}

          <dl className="mt-14 grid gap-8 sm:grid-cols-2">
            {about.skills.map((group) => (
              <div key={group.group}>
                <dt className="font-mono text-[0.7rem] tracking-[0.3em] text-amber uppercase">
                  {group.group}
                </dt>
                <dd className="mt-3 font-mono text-sm leading-relaxed text-paper">
                  {group.items.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
