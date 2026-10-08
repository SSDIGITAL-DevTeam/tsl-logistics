import { NextRequest, NextResponse } from "next/server";
import { LEAD_COOKIE, LEAD_COOKIE_MAX_AGE, sanitizeSource } from "@/lib/leadConversion";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot: bots fill this field, humans don't. The response deliberately
    // mirrors a real success so the bot learns nothing — but carries no lead
    // cookie, so the thank-you gate stays shut and no conversion is possible.
    if (body._h) {
      return NextResponse.json({ success: true });
    }

    const apiUrl = process.env.TSL_API_URL;
    if (!apiUrl) {
      return NextResponse.json({ error: "API not configured" }, { status: 503 });
    }

    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : (realIp || "");

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (clientIp) {
      headers["x-forwarded-for"] = clientIp;
    }

    const response = await fetch(`${apiUrl}/api/v1/leads`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        phone: body.phone,
        enquiry: body.enquiry,
        message: body.message,
        notes: body.notes || body.message,
        // Forwarded verbatim — the backend's SOURCE_NOTIFY_MAP keys off this
        // exact string to pick a notification inbox. Sanitising happens only
        // for the cookie value below.
        source: body.source || "contact",
        pagePath: body.pagePath || "/contact",
        utmSource: body.utmSource || null,
        utmMedium: body.utmMedium || null,
        utmCampaign: body.utmCampaign || null,
        gclid: body.gclid || null,
        gbraid: body.gbraid || null,
        wbraid: body.wbraid || null,
        _h: body._h,
      }),
    });

    const data = await response.json();
    const res = NextResponse.json(data, { status: response.status });

    // Proof-of-submission for the gated thank-you page. Only on a real 2xx: a
    // 429 from the leads rate limiter or a 400 validation failure must not open
    // the gate. httpOnly is false on purpose — the thank-you page's client
    // component clears this cookie right after firing the conversion, so a
    // refresh or back/forward cannot fire it twice. It carries no PII, only a
    // source slug and a random id.
    if (response.ok) {
      res.cookies.set(LEAD_COOKIE, `${sanitizeSource(body.source)}.${crypto.randomUUID()}`, {
        maxAge: LEAD_COOKIE_MAX_AGE,
        path: "/",
        sameSite: "lax",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
      });
    }

    return res;
  } catch {
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}
