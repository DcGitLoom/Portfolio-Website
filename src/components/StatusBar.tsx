import { profile } from "@/lib/content";

/**
 * Full-bleed amber ticker under the masthead. The list is rendered twice and
 * the row translates -50%, so one copy's width is exactly one loop. The second
 * copy is hidden from assistive tech and from reduced-motion users, who get a
 * static wrapped list instead (see .anim-ticker in globals.css).
 */
export default function StatusBar() {
  return (
    <div
      className="anim-rise overflow-hidden bg-amber py-3"
      style={{ animationDelay: "0.6s" }}
    >
      <div className="anim-ticker flex w-max">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
            className="flex shrink-0"
          >
            {profile.statusLine.map((item) => (
              <li
                key={item}
                className="flex items-center gap-6 px-6 font-mono text-[0.7rem] whitespace-nowrap text-ink uppercase sm:text-xs sm:tracking-[0.3em]"
              >
                {item}
                <span aria-hidden="true" className="opacity-40">
                  /
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
