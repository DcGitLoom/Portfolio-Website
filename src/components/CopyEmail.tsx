"use client";

import { useState } from "react";

/** Copies the address to the clipboard, with a visible confirmation. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by permissions; the mailto link beside this
      // button remains the working path, so fail quietly rather than alarm.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="min-h-11 cursor-pointer rounded-full border border-border bg-surface px-5 py-2.5 text-sm text-fg transition-colors duration-200 hover:border-accent/50"
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
    </button>
  );
}
