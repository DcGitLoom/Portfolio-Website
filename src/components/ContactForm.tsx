"use client";

import { useState } from "react";
import { ArrowUpRight } from "./Icons";

/**
 * Composes a mail draft rather than posting anywhere.
 *
 * The site is a static export with no backend, so a form that appeared to
 * "send" would silently drop every message. This hands the text to the
 * visitor's own mail client, where they can see it leave.
 */
export function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  const ready = name.trim() !== "" && message.trim() !== "";

  function compose(e: React.FormEvent) {
    e.preventDefault();
    if (!ready) return;
    const subject = `Portfolio enquiry from ${name.trim()}`;
    const body = [message.trim(), "", name.trim(), from.trim()]
      .filter(Boolean)
      .join("\n");
    window.location.href =
      `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const field =
    "w-full rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm text-fg " +
    "placeholder:text-muted/60 outline-none transition-colors duration-200 " +
    "focus:border-accent/60 focus-visible:outline-none";
  const label =
    "font-display text-[0.65rem] uppercase tracking-[0.2em] text-muted";

  return (
    <form onSubmit={compose} className="space-y-5">
      <p className="flex items-center gap-2.5 font-display text-[0.65rem] uppercase tracking-[0.2em] text-muted">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        Direct line
      </p>

      <div className="space-y-2">
        <label htmlFor="cf-name" className={label}>Your name</label>
        <input
          id="cf-name" name="name" value={name} onChange={(e) => setName(e.target.value)}
          className={field} placeholder="Enter your name" autoComplete="name" required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="cf-email" className={label}>Email address</label>
        <input
          id="cf-email" name="email" type="email" value={from} onChange={(e) => setFrom(e.target.value)}
          className={field} placeholder="you@domain.com" autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="cf-msg" className={label}>Message</label>
        <textarea
          id="cf-msg" name="message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)}
          className={`${field} resize-y`} placeholder="Type your message here..." required
        />
      </div>

      <button
        type="submit"
        disabled={!ready}
        className="group flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-on-accent transition-all duration-200 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
      >
        Open in mail app
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </button>

      <p className="text-center text-xs leading-relaxed text-muted/80">
        Opens a draft in your own mail app, so nothing is sent until you press send.
      </p>
    </form>
  );
}
