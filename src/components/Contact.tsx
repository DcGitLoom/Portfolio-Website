import { contact, links, profile } from "@/lib/content";

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-6 py-24 sm:px-10 sm:py-32 lg:pr-16 lg:pl-44"
    >
      <p className="font-mono text-xs tracking-[0.35em] text-slate uppercase">
        Contact
      </p>

      <h2 className="mt-8 max-w-3xl font-display text-[clamp(1.5rem,3.2vw,2.4rem)] leading-[1.15] font-bold tracking-[-0.025em]">
        {contact.prompt}
      </h2>

      <a
        href={`mailto:${profile.email}`}
        className="mt-12 inline-block font-display text-[clamp(1.15rem,4.4vw,3rem)] leading-none font-extrabold tracking-[-0.04em] break-all transition-colors duration-200 hover:text-amber focus-visible:text-amber"
      >
        {profile.email}
      </a>

      <ul className="mt-16 flex flex-wrap gap-x-10 gap-y-4">
        {links.map((link) => {
          const external = !link.href.startsWith("mailto:");
          return (
            <li key={link.label}>
              <a
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="font-mono text-xs tracking-[0.25em] text-slate uppercase transition-colors duration-200 hover:text-paper"
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
