import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-paper/15 px-6 py-10 sm:px-10 lg:pr-16 lg:pl-44">
      <p className="font-mono text-[0.7rem] tracking-[0.25em] text-slate uppercase">
        {profile.first} {profile.last} · {profile.location} · Built with Next.js
        and Tailwind CSS
      </p>
    </footer>
  );
}
