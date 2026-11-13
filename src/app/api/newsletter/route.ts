import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const honeypot =
      typeof body.website_url === "string" && body.website_url.trim().length > 0
        ? body.website_url.trim()
        : typeof body.companyWebsite === "string"
          ? body.companyWebsite.trim()
          : "";

    if (honeypot.length > 0) {
      return NextResponse.json({ success: true });
    }

    if (!EMAIL_REGEX.test(email) || email.length > 160) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const record = {
      email,
      subscribedAt: new Date().toISOString(),
    };

    const candidateDirs = [
      path.join(process.cwd(), ".data"),
      path.join(os.tmpdir(), "rejubliss-data"),
    ];

    for (const dir of candidateDirs) {
      try {
        await fs.mkdir(dir, { recursive: true });
        const filePath = path.join(dir, "newsletter.json");
        let existing: { email: string; subscribedAt: string }[] = [];
        try {
          const raw = await fs.readFile(filePath, "utf8");
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) existing = parsed;
        } catch {
          existing = [];
        }
        if (!existing.some((item) => item.email === email)) {
          existing.unshift(record);
          await fs.writeFile(
            filePath,
            JSON.stringify(existing.slice(0, 1000), null, 2),
            "utf8"
          );
        }
        break;
      } catch {
        // Fallback to tmpdir
      }
    }

    const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter_subscription", ...record }),
      }).catch(() => null);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Unable to subscribe right now. Please try again shortly.",
      },
      { status: 500 }
    );
  }
}
