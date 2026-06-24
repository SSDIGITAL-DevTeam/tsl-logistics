import type { Metadata } from "next";
import Image from "next/image";
import { Building2, Globe, Mail, MapPin, Phone, Share2 } from "lucide-react";
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

function TapeStrip() {
  const tapeText = Array.from({ length: 8 }).map((_, index) => (
    <span key={index} className="shrink-0">
      TSL Logistic&nbsp;&nbsp; Delivery&nbsp;&nbsp; Shipping
    </span>
  ));

  return (
    <div className="absolute left-1/2 top-[94px] h-[92px] w-[186%] -translate-x-2/3 overflow-visible">
      <div className="absolute left-1/2 top-0 flex h-[40px] w-full -translate-x-1/2 rotate-[3.7deg] items-center gap-[18px] bg-[#c6a44f] px-4 text-[14px] font-black leading-none text-[#121212]">
        {tapeText}
      </div>
      <div className="absolute left-1/2 top-[16px] flex h-[40px] w-full -translate-x-1/2 -rotate-[0.41deg] items-center gap-[18px] bg-gold-gradient px-4 text-[14px] font-black leading-none text-[#121212]">
        {tapeText}
      </div>
    </div>
  );
}

function Avatar({ name, photo }: { name: string; photo?: string }) {
  return (
    <div className="relative z-10 grid h-[122px] w-[122px] place-items-center overflow-hidden rounded-full bg-gold-gradient text-2xl font-bold text-[#121212] shadow-lg">
      {photo ? (
        <Image
          src={photo}
          alt={name}
          fill
          sizes="122px"
          className="object-cover object-top"
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}

function RoundAction({
  icon,
  href,
  label,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-[70px] w-[70px] place-items-center rounded-full bg-gold-gradient text-[#121212]"
    >
      {icon}
    </a>
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
    <div className="flex min-h-[71px] items-center gap-4 rounded-[14px] bg-[#eeeeee] px-[22px] py-4 text-[18px] leading-[1.45] text-[#121212] md:text-[22px]">
      <span className="grid h-[27px] w-[27px] shrink-0 place-items-center text-[#121212]">
        {icon}
      </span>
      <span>{children}</span>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} className="block">
      {content}
    </a>
  );
}

export default async function DigitalBusinessCardPage({ params }: Props) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    member.card.mapQuery,
  )}&output=embed`;

  return (
    <div className="relative overflow-hidden bg-[#f5f5f5] px-4 py-[60px] md:py-[60px]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/images/permit-section.jpg')" }}
      />
      <div className="absolute inset-0 bg-white/75" />

      <section className="relative z-10 mx-auto w-full max-w-[670px]">
        <div className="relative overflow-hidden rounded-[28px] bg-white pb-[22px] shadow-[0_5px_17px_rgba(0,0,0,0.5)]">
          <div className="relative h-[292px] overflow-visible">
            <TapeStrip />

            <div className="absolute left-1/2 top-[69px] flex -translate-x-1/2 flex-col items-center">
              <div className="relative">
                <Avatar name={member.name} photo={member.photo} />
                <div className="absolute z-20 -bottom-1 -right-2 grid h-[46px] w-[46px] place-items-center rounded-full border-[3px] border-white bg-gold-gradient text-xs font-bold text-white">
                  TSL
                </div>
              </div>
              <h1 className="mt-[30px] text-center text-[24px] font-bold leading-[1.5] text-[#121212] md:text-[28px]">
                {member.name}
              </h1>
              <p className="text-center text-[18px] leading-[1.5] text-[#121212] md:text-[22px]">
                {member.role.replace(" - Logistics", "")}
              </p>
            </div>
          </div>

          <div className="px-[21px]">
            <div className="mb-3 flex justify-center gap-4">
              <RoundAction
                href={`tel:${member.card.phone.replace(/\s/g, "")}`}
                label="Call"
                icon={<Phone size={27} fill="currentColor" />}
              />
              <RoundAction
                href={`mailto:${member.card.email}`}
                label="Email"
                icon={<Mail size={27} fill="currentColor" />}
              />
              <RoundAction
                href={`/our-team/${member.slug}`}
                label="Share"
                icon={<Share2 size={27} fill="currentColor" />}
              />
            </div>

            <a
              href={`mailto:${member.card.email}`}
              className="mb-[14px] flex h-[57px] items-center justify-center rounded-[14px] bg-gold-gradient text-[20px] leading-[1.5] text-[#121212] md:text-[22px]"
            >
              Save Contact
            </a>

            <div className="space-y-[11px] text-left">
              <ContactRow icon={<Building2 size={27} fill="currentColor" />}>
                {member.card.company}
              </ContactRow>
              <ContactRow
                icon={<Mail size={27} fill="currentColor" />}
                href={`mailto:${member.card.email}`}
              >
                {member.card.email}
              </ContactRow>
              <ContactRow
                icon={<Phone size={27} fill="currentColor" />}
                href={`tel:${member.card.phone.replace(/\s/g, "")}`}
              >
                {member.card.phone}
              </ContactRow>
              <ContactRow
                icon={<Globe size={27} />}
                href={`https://${member.card.website}`}
              >
                {member.card.website}
              </ContactRow>
              <div className="overflow-hidden rounded-[21px] bg-[#eeeeee]">
                <ContactRow icon={<MapPin size={27} fill="currentColor" />}>
                  {member.card.address}
                </ContactRow>
                <div className="mx-[10px] mb-[14px] overflow-hidden rounded-[14px]">
                  <iframe
                    src={mapSrc}
                    width="100%"
                    height="279"
                    style={{ border: 0, display: "block" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${member.name} location map`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
