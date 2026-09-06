"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Close } from "./Icons";

/**
 * Replaces a single static screenshot with a strip of thumbnails that open a
 * full-screen viewer. A banner image at the top of every card said less than
 * four small ones: each shows a different part of the app (auth, the main
 * list view, a populated multi-user state, a detail view) rather than
 * whichever single frame happened to be the "hero" shot.
 */
export function ProjectGallery({
  images, name,
}: {
  images: readonly string[];
  name: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);

    // Prevent the page from scrolling behind the full-screen viewer.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, images.length]);

  return (
    <>
      <div className="grid grid-cols-4 gap-1.5">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg border border-border"
            aria-label={`View screenshot ${i + 1} of ${images.length} for ${name}`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="140px"
              className="object-cover object-top transition-transform duration-300 group-hover:scale-110"
            />
            <span className="pointer-events-none absolute inset-0 bg-bg/0 transition-colors duration-200 group-hover:bg-bg/10" />
          </button>
        ))}
      </div>

      {/* Portaled to <body> rather than rendered in place: ProjectCard hovers
          with a transform (hover:-translate-y-1), and any transformed
          ancestor becomes the containing block for a `fixed` descendant per
          the CSS spec — so without the portal, hovering the card while this
          is open would shrink the "full-screen" overlay down to the card's
          own box instead of covering the viewport. */}
      {openIndex !== null && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} screenshots`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/92 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            className="absolute top-4 right-4 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-border bg-surface text-fg transition-colors duration-200 hover:border-accent/50 sm:top-6 sm:right-6"
          >
            <Close className="h-5 w-5" aria-hidden="true" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
                }}
                aria-label="Previous screenshot"
                className="absolute left-2 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-border bg-surface text-fg transition-colors duration-200 hover:border-accent/50 sm:left-6"
              >
                <ArrowRight className="h-5 w-5 rotate-180" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
                }}
                aria-label="Next screenshot"
                className="absolute right-2 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-border bg-surface text-fg transition-colors duration-200 hover:border-accent/50 sm:right-6"
              >
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          )}

          <div
            className="relative aspect-[16/10] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[openIndex]}
              alt={`${name} screenshot ${openIndex + 1} of ${images.length}`}
              fill
              sizes="(min-width: 1024px) 900px, 90vw"
              className="rounded-xl border border-border object-contain"
              priority
            />
          </div>

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-display text-xs text-muted">
            {openIndex + 1} / {images.length}
          </p>
        </div>,
        document.body,
      )}
    </>
  );
}
