import { projects } from "@/lib/content";

/**
 * A full-bleed row list rather than a card grid. Rows are keyed by year, which
 * is real metadata — an 01/02/03 index would assert an order the work does not
 * have.
 */
export default function Projects() {
  return (
    <section id="work" className="py-24 sm:py-32">
      <p className="px-6 font-mono text-xs tracking-[0.35em] text-slate uppercase sm:px-10 lg:pr-16 lg:pl-44">
        Selected work
      </p>

      <ul className="mt-12 border-t border-paper/15">
        {projects.map((project) => (
          <li key={project.title} className="border-b border-paper/15">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-4 px-6 py-9 transition-colors duration-200 hover:bg-ink-raised focus-visible:bg-ink-raised sm:px-10 md:grid-cols-12 md:items-baseline md:gap-8 md:py-11 lg:pr-16 lg:pl-44"
            >
              <h3 className="font-display text-3xl font-bold tracking-[-0.025em] transition-colors duration-200 group-hover:text-amber sm:text-4xl md:col-span-4">
                {project.title}
              </h3>

              <p className="leading-relaxed text-slate md:col-span-5">
                {project.blurb}
              </p>

              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-slate uppercase md:col-span-2">
                {project.stack.join(" · ")}
              </p>

              <p className="font-mono text-xs text-amber md:col-span-1 md:text-right">
                {project.year}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
