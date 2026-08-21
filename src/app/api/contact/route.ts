import { NextResponse } from "next/server";
import { profile } from "@/lib/content";

const MAX_LEN = 4000;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const from = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !message || name.length > MAX_LEN || message.length > MAX_LEN || from.length > MAX_LEN) {
    return NextResponse.json({ error: "Missing or invalid fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    // Sender stays on Resend's shared testing domain, which only needs a
    // verified sending domain if the recipient differs from the account
    // owner's own address — here it's always profile.email, so this works
    // without any domain setup.
    body: JSON.stringify({
      from: "Portfolio site <onboarding@resend.dev>",
      to: profile.email,
      reply_to: from || undefined,
      subject: `Portfolio enquiry from ${name}`,
      text: `${message}\n\n—\n${name}${from ? ` <${from}>` : ""}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to send." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
