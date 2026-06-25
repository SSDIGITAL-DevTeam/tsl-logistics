import { NextResponse } from "next/server";
import { getTeamMember } from "@/lib/team";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

function escapeVCardValue(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function getStructuredName(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length <= 1) {
    return `${escapeVCardValue(name)};;;;`;
  }

  const familyName = parts.at(-1) ?? "";
  const givenName = parts.slice(0, -1).join(" ");
  return `${escapeVCardValue(familyName)};${escapeVCardValue(givenName)};;;`;
}

function getWebsiteUrl(website: string) {
  return website.startsWith("http") ? website : `https://${website}`;
}

function getFileName(name: string) {
  return `${name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}.vcf`;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const member = getTeamMember(slug);

  if (!member) {
    return NextResponse.json({ error: "Team member not found" }, { status: 404 });
  }

  const websiteUrl = getWebsiteUrl(member.card.website);
  const vCard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVCardValue(member.name)}`,
    `N:${getStructuredName(member.name)}`,
    `ORG:${escapeVCardValue(member.card.company)}`,
    `TITLE:${escapeVCardValue(member.role)}`,
    `TEL;TYPE=CELL,VOICE:${escapeVCardValue(member.card.phone)}`,
    `EMAIL;TYPE=INTERNET:${escapeVCardValue(member.card.email)}`,
    `URL:${escapeVCardValue(websiteUrl)}`,
    `ADR;TYPE=WORK:;;${escapeVCardValue(member.card.address)};;;;`,
    `LABEL;TYPE=WORK:${escapeVCardValue(member.card.address)}`,
    `NOTE:${escapeVCardValue(member.intro)}`,
    "END:VCARD",
  ].join("\r\n");

  return new NextResponse(vCard, {
    headers: {
      "Content-Disposition": `attachment; filename="${getFileName(member.name)}"`,
      "Content-Type": "text/vcard; charset=utf-8",
    },
  });
}
