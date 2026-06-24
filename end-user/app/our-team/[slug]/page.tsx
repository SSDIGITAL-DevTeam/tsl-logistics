import type { Metadata } from "next";
import Image from "next/image";
import { Building2, Globe, Mail, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import { getInitials, getTeamMember, teamMembers } from "@/lib/team";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return teamMembers.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return {};

  return {
    title: `${member.name} | Digital Business Card`,
    description: `${member.name}, ${member.role} at TSL Logistics.`,
  };
}

function Avatar({
  name,
  photo,
  size = "large",
}: {
  name: string;
  photo?: string;
  size?: "large" | "small";
}) {
  const className =
    size === "large"
      ? "h-24 w-24 border-[5px] text-2xl"
      : "h-12 w-12 border-[3px] text-sm";

  return (
    <div
      className={`${className} bg-gold-gradient relative grid place-items-center overflow-hidden rounded-full border-white font-bold text-[#1a1a1a] shadow-lg`}
    >
      {photo ? (
        <Image src={photo} alt={name} fill sizes="96px" className="object-cover" />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}

function ContactRow({
  icon,
  children,
  href,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  href?: string;
}) {
  const content = (
    <div className="flex min-h-10 items-center gap-3 rounded-md bg-[#eeeeee] px-3 py-2 text-xs font-semibold text-[#333]">
      <span className="grid h-5 w-5 shrink-0 place-items-center text-[#222]">
        {icon}
      </span>
      <span className="leading-snug">{children}</span>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} className="block transition hover:-translate-y-0.5">
      {content}
    </a>
  );
}

export default async function DigitalBusinessCardPage({ params }: Props) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    member.card.mapQuery
  )}&output=embed`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f3f0e9] bg-[url('/images/permit-section.jpg')] bg-cover bg-center px-4 py-14">
      <div className="pointer-events-none absolute inset-0 z-0 bg-white/[0.9]" />

      <section className="relative z-10 mx-auto max-w-[370px]">
        <div className="relative mt-9 rounded-xl border border-[#d9d9d9] bg-white p-4 pt-16 text-center shadow-2xl">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
            <Avatar name={member.name} photo={member.photo} />
          </div>

          <h1 className="text-xl font-bold text-[#151515]">{member.name}</h1>
          <p className="mt-1 text-[11px] font-semibold text-[var(--primary-dark)]">
            {member.role}
          </p>

          <div className="mt-3 flex justify-center gap-2">
            <a
              href={member.card.socials.facebook}
              aria-label="Facebook"
              className="bg-gold-gradient grid h-8 w-8 place-items-center rounded-full text-xs font-black text-[#181818] transition hover:-translate-y-0.5 hover:opacity-90"
            >
              f
            </a>
            <a
              href={member.card.socials.instagram}
              aria-label="Instagram"
              className="bg-gold-gradient grid h-8 w-8 place-items-center rounded-full text-[10px] font-black text-[#181818] transition hover:-translate-y-0.5 hover:opacity-90"
            >
              ig
            </a>
            <a
              href={member.card.socials.linkedin}
              aria-label="LinkedIn"
              className="bg-gold-gradient grid h-8 w-8 place-items-center rounded-full text-xs font-black text-[#181818] transition hover:-translate-y-0.5 hover:opacity-90"
            >
              in
            </a>
          </div>

          <a
            href={`mailto:${member.card.email}`}
            className="bg-gold-gradient mt-4 block rounded-md px-4 py-2 text-xs font-bold text-[#161616] transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-dark)]"
          >
            Share Contact
          </a>

          <div className="mt-4 space-y-2 text-left">
            <ContactRow icon={<Building2 size={14} />}>
              {member.card.company}
            </ContactRow>
            <ContactRow icon={<Mail size={14} />} href={`mailto:${member.card.email}`}>
              {member.card.email}
            </ContactRow>
            <ContactRow icon={<Phone size={14} />} href={`tel:${member.card.phone.replace(/\s/g, "")}`}>
              {member.card.phone}
            </ContactRow>
            <ContactRow icon={<Globe size={14} />} href={`https://${member.card.website}`}>
              {member.card.website}
            </ContactRow>
            <ContactRow icon={<MapPin size={14} />}>{member.card.address}</ContactRow>
          </div>

          <div className="mt-3 overflow-hidden rounded-md border border-[#d7d7d7]">
            <iframe
              src={mapSrc}
              width="100%"
              height="165"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${member.name} location map`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
