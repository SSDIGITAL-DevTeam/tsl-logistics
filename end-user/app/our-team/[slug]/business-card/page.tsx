import type { Metadata } from "next";
import Image from "next/image";
import {
  BriefcaseBusiness,
  Globe2,
  MailCheck,
  MapPinned,
  PhoneCall,
} from "lucide-react";
import { notFound } from "next/navigation";
import TeamBusinessCardActions from "@/components/TeamBusinessCardActions";
import TeamBusinessCardV2 from "@/components/TeamBusinessCardV2";
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
  avatar,
}: {
  name: string;
  photo?: string;
  avatar?: string;
}) {
  const src = avatar ?? photo;
  return (
    <div className="relative z-10 grid h-[124px] w-[124px] place-items-center overflow-hidden rounded-full border-[5px] border-[#1a1a1a] bg-gold-gradient text-2xl font-bold text-[#121212] shadow-md">
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes="124px"
          className={avatar ? "object-cover object-center" : "object-cover object-top"}
        />
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
    <div className="v2-surface flex min-h-[48px] items-center gap-3 bg-[#f7f8fa] px-4 py-2.5 text-[13px] leading-relaxed text-[#1a1a1a] md:text-sm">
      <span className="grid h-5 w-5 shrink-0 place-items-center text-[#121212]">
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
    <>
    <div className="theme-v1-only">
    <div className="relative overflow-hidden bg-[#f5f5f5] px-4 py-10 md:py-14">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/permit-section.jpg')" }}
      />
      <div className="absolute inset-0 bg-white/45" />

      <section className="relative z-10 mx-auto w-full max-w-[480px]">
        <div className="relative overflow-hidden rounded-lg bg-white pb-5 shadow-md">
          <div className="relative h-[250px] overflow-visible">
            <div className="absolute left-1/2 top-[34px] flex w-full -translate-x-1/2 flex-col items-center px-6">
              <div className="relative">
                <Avatar name={member.name} photo={member.photo} avatar={member.avatar} />
                <div className="absolute -bottom-1 -right-2 z-20 grid h-10 w-10 place-items-center overflow-hidden rounded-full border-[3px] border-white bg-white">
                  <Image
                    src="/images/logo-tsl-kotak.png"
                    alt="TSL Logistics"
                    width={40}
                    height={40}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
              <h1 className="mt-5 text-center text-lg font-bold leading-tight text-[#1a1a1a]">
                {member.name}
              </h1>
              <p className="mt-1 text-center text-[13px] leading-relaxed text-[#555]">
                {member.role.replace(" - Logistics", "")}
              </p>
            </div>
          </div>

          <div className="px-5">
            <TeamBusinessCardActions
              name={member.name}
              role={member.role}
              phone={member.card.phone}
              email={member.card.email}
            />

            <a
              href={`/api/team/${member.slug}/vcard`}
              download={`${member.slug}.vcf`}
              className="v2-control mb-3 flex h-10 items-center justify-center bg-gold-gradient px-5 text-[13px] font-bold leading-none text-[#121212] transition-opacity hover:opacity-90"
            >
              Save Contact
            </a>

            <div className="space-y-2.5 text-left">
              <ContactRow icon={<BriefcaseBusiness size={20} />}>
                {member.card.company}
              </ContactRow>
              <ContactRow
                icon={<MailCheck size={20} />}
                href={`mailto:${member.card.email}`}
              >
                {member.card.email}
              </ContactRow>
              <ContactRow
                icon={<PhoneCall size={20} />}
                href={`tel:${member.card.phone.replace(/\s/g, "")}`}
              >
                {member.card.phone}
              </ContactRow>
              <ContactRow
                icon={<Globe2 size={20} />}
                href={`https://${member.card.website}`}
              >
                {member.card.website}
              </ContactRow>
              <div className="v2-surface overflow-hidden bg-[#f7f8fa]">
                <ContactRow icon={<MapPinned size={20} />}>
                  {member.card.address}
                </ContactRow>
                <div className="v2-surface mx-3 mb-3 overflow-hidden">
                  <iframe
                    src={mapSrc}
                    width="100%"
                    height="220"
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
    </div>

    <div className="theme-v2-only">
      <TeamBusinessCardV2 member={member} />
    </div>
    </>
  );
}
