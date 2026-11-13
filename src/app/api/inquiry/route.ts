import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";

const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_EXTENSIONS = new Set([
  ".pdf",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".zip",
  ".mp4",
  ".doc",
  ".docx",
  ".pptx",
]);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Simple in-memory IP sliding-window rate limiter
const rateLimitMap = new Map<string, number[]>();
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX_REQUESTS = 6;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX_REQUESTS) {
    rateLimitMap.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

function sanitizeText(input: unknown, maxLen = 1000): string {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, maxLen);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function persistInquiryRecord(record: Record<string, unknown>) {
  const candidateDirs = [
    path.join(process.cwd(), ".data"),
    path.join(os.tmpdir(), "rejubliss-data"),
  ];

  for (const dir of candidateDirs) {
    try {
      await fs.mkdir(dir, { recursive: true });
      const filePath = path.join(dir, "inquiries.json");
      let existing: Record<string, unknown>[] = [];
      try {
        const raw = await fs.readFile(filePath, "utf8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) existing = parsed;
      } catch {
        existing = [];
      }
      existing.unshift(record);
      await fs.writeFile(
        filePath,
        JSON.stringify(existing.slice(0, 500), null, 2),
        "utf8"
      );
      return;
    } catch {
      // Fall through to tmpdir if read-only filesystem
    }
  }
}

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "local";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Too many inquiry attempts in a short period. Please wait a few minutes or email info@rejubliss.co.uk directly.",
        },
        { status: 429 }
      );
    }

    const contentType = request.headers.get("content-type") || "";
    let fullName = "";
    let email = "";
    let company = "";
    let service = "";
    let budget = "";
    let timeline = "";
    let description = "";
    let referenceUrl = "";
    let honeypot = "";
    let renderedAtRaw = "";
    let attachmentFile: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      fullName = sanitizeText(formData.get("fullName"), 120);
      email = sanitizeText(formData.get("email"), 160).toLowerCase();
      company = sanitizeText(formData.get("company"), 120);
      service = sanitizeText(formData.get("service"), 120);
      budget = sanitizeText(formData.get("budget"), 80);
      timeline = sanitizeText(formData.get("timeline"), 80);
      description = sanitizeText(formData.get("description"), 4000);
      referenceUrl = sanitizeText(formData.get("referenceUrl"), 500);
      honeypot = sanitizeText(formData.get("website_url"), 200);
      renderedAtRaw = sanitizeText(formData.get("formRenderedAt"), 40);

      const maybeFile = formData.get("attachment");
      if (maybeFile instanceof File && maybeFile.size > 0) {
        attachmentFile = maybeFile;
      }
    } else {
      const body = await request.json().catch(() => ({}));
      fullName = sanitizeText(body.fullName, 120);
      email = sanitizeText(body.email, 160).toLowerCase();
      company = sanitizeText(body.company, 120);
      service = sanitizeText(body.service, 120);
      budget = sanitizeText(body.budget, 80);
      timeline = sanitizeText(body.timeline, 80);
      description = sanitizeText(body.description, 4000);
      referenceUrl = sanitizeText(body.referenceUrl, 500);
      honeypot = sanitizeText(body.website_url, 200);
      renderedAtRaw = sanitizeText(String(body.formRenderedAt || ""), 40);
    }

    // 1. Honeypot trap
    if (honeypot.length > 0) {
      return NextResponse.json({
        success: true,
        inquiryId: "RJB-ACK",
        submittedAt: new Date().toISOString(),
      });
    }

    // 2. Automated bot speed check (if timestamp provided)
    if (renderedAtRaw) {
      const renderedAt = Number(renderedAtRaw);
      if (!Number.isNaN(renderedAt) && Date.now() - renderedAt < 1200) {
        return NextResponse.json(
          {
            success: false,
            error: "Please take a moment to complete the form before submitting.",
          },
          { status: 400 }
        );
      }
    }

    // 3. Field-level validation
    const fieldErrors: Record<string, string> = {};

    if (fullName.length < 2) {
      fieldErrors.fullName = "Please enter your full name.";
    }
    if (!EMAIL_REGEX.test(email)) {
      fieldErrors.email = "Please enter a valid business email address.";
    }
    if (!service) {
      fieldErrors.service = "Please select the primary service you need.";
    }
    if (!budget) {
      fieldErrors.budget = "Please select an estimated project budget range.";
    }
    if (!timeline) {
      fieldErrors.timeline = "Please select your target timeline.";
    }
    if (description.length < 20) {
      fieldErrors.description =
        "Please share a short project summary (at least 20 characters).";
    }
    if (referenceUrl) {
      try {
        const parsed = new URL(referenceUrl);
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
          fieldErrors.referenceUrl =
            "Reference link must begin with https:// or http://.";
        }
      } catch {
        fieldErrors.referenceUrl =
          "Please enter a valid URL (including https://) or leave blank.";
      }
    }

    let attachmentMeta: {
      name: string;
      size: number;
      type: string;
    } | null = null;
    let attachmentBase64: string | null = null;

    if (attachmentFile) {
      if (attachmentFile.size > MAX_ATTACHMENT_BYTES) {
        fieldErrors.attachment = "Attachment must be 10 MB or smaller.";
      } else {
        const ext = path.extname(attachmentFile.name).toLowerCase();
        if (!ALLOWED_EXTENSIONS.has(ext)) {
          fieldErrors.attachment =
            "Supported file formats: PDF, PNG, JPG, WEBP,DOCX, PPTX, ZIP, or MP4.";
        } else {
          attachmentMeta = {
            name: attachmentFile.name,
            size: attachmentFile.size,
            type: attachmentFile.type || "application/octet-stream",
          };
          const arrayBuffer = await attachmentFile.arrayBuffer();
          attachmentBase64 = Buffer.from(arrayBuffer).toString("base64");
        }
      }
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Please check the highlighted fields and try again.",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const inquiryId = `RJB-${new Date().getFullYear()}-${randomCode}`;
    const submittedAt = new Date().toISOString();

    const record = {
      inquiryId,
      submittedAt,
      fullName,
      email,
      company: company || null,
      service,
      budget,
      timeline,
      description,
      referenceUrl: referenceUrl || null,
      attachment: attachmentMeta,
    };

    // Persist record locally / tmp
    await persistInquiryRecord(record);

    // Optional Resend email integration when RESEND_API_KEY is present
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.INQUIRY_TO_EMAIL || "info@rejubliss.co.uk";
    const fromEmail =
      process.env.INQUIRY_FROM_EMAIL ||
      "Rejubliss Studio <onboarding@resend.dev>";

    const deliveryChannels: string[] = ["studio-queue"];

    if (resendApiKey) {
      const htmlBody = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #071527; max-width: 640px;">
          <h2 style="margin-bottom: 4px;">New Project Inquiry — ${escapeHtml(inquiryId)}</h2>
          <p style="color: #64748b; margin-top: 0;">Submitted ${escapeHtml(submittedAt)}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Company / Brand:</strong> ${escapeHtml(company || "Not specified")}</p>
          <p><strong>Interested Service:</strong> ${escapeHtml(service)}</p>
          <p><strong>Estimated Budget:</strong> ${escapeHtml(budget)}</p>
          <p><strong>Target Timeline:</strong> ${escapeHtml(timeline)}</p>
          ${
            referenceUrl
              ? `<p><strong>Reference Link:</strong> <a href="${escapeHtml(referenceUrl)}">${escapeHtml(referenceUrl)}</a></p>`
              : ""
          }
          <h3 style="margin-top: 20px; margin-bottom: 8px;">Project Description</h3>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; white-space: pre-wrap;">${escapeHtml(description)}</div>
        </div>
      `;

      const emailPayload: Record<string, unknown> = {
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `[${inquiryId}] New ${service} Inquiry from ${fullName}`,
        html: htmlBody,
      };

      if (attachmentMeta && attachmentBase64) {
        emailPayload.attachments = [
          {
            filename: attachmentMeta.name,
            content: attachmentBase64,
          },
        ];
      }

      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      }).catch(() => null);

      if (emailRes?.ok) {
        deliveryChannels.push("email");
      }
    }

    // Optional CRM / Slack / Webhook integration
    const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;
    if (webhookUrl) {
      const hookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      }).catch(() => null);
      if (hookRes?.ok) {
        deliveryChannels.push("webhook");
      }
    }

    return NextResponse.json({
      success: true,
      inquiryId,
      submittedAt,
      deliveryChannels,
      summary: {
        fullName,
        email,
        service,
        timeline,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error:
          "We encountered an unexpected error processing your inquiry. Please try again or email info@rejubliss.co.uk.",
      },
      { status: 500 }
    );
  }
}
