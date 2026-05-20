import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot: bots fill this field, humans don't
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const apiUrl = process.env.TSL_API_URL;
    if (!apiUrl) {
      return NextResponse.json({ error: "API not configured" }, { status: 503 });
    }

    const response = await fetch(`${apiUrl}/api/v1/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        phone: body.phone,
        enquiry: body.enquiry,
        message: body.message,
        source: body.source || "contact",
        pagePath: body.pagePath || "/contact",
        website: body.website,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}
