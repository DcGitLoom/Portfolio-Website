import { profile } from "@/lib/content";

/**
 * The masthead. The surname sits inside a cobalt slab that wipes in from the
 * left on load; an amber cursor blinks after it. Type is fluid so the name
 * stays oversized on desktop and still fits a 375px screen.
 */
export default function Hero() {
  const size = "text-[clamp(3rem,13.5vw,10.5rem)]";

  return (
    <header
      id="top"
      className="px-6 pt-24 pb-12 sm:px-10 sm:pt-32 lg:pt-40 lg:pr-16 lg:pl-44"
    >
      <p className="anim-rise font-mono text-xs tracking-[0.35em] text-slate uppercase sm:text-sm">
        {profile.role}
      </p>

      <h1 className="mt-7 font-display leading-[0.82] font-extrabold tracking-[-0.045em]">
        <span
          className={`anim-rise block ${size}`}
          style={{ animationDelay: "0.05s" }}
        >
          {profile.first}
        </span>

        {/* Flex so the cursor can match the slab's height. Sizing it in `em`
            would resolve against the h1's inherited size, not the display
            size set on the child spans. */}
        <span className="mt-1 flex items-stretch">
          <span className="relative inline-block">
            <span
              aria-hidden="true"
              className="anim-slab absolute inset-0 bg-cobalt"
              style={{ animationDelay: "0.3s" }}
            />
            <span
              className={`anim-rise relative block px-3 py-1 sm:px-6 ${size}`}
              style={{ animationDelay: "0.15s" }}
            >
              {profile.last}
            </span>
          </span>

          <span
            aria-hidden="true"
            className="anim-blink ml-3 w-2 shrink-0 bg-amber sm:ml-5 sm:w-3 lg:w-4"
            style={{ animationDelay: "0.9s" }}
          />
        </span>
      </h1>

      <p
        className="anim-rise mt-10 max-w-2xl text-lg leading-relaxed text-slate sm:mt-14 sm:text-xl"
        style={{ animationDelay: "0.45s" }}
      >
        {profile.tagline}
      </p>
    </header>
  );
}
