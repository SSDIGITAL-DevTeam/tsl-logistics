import Image from "next/image";
import {
  BriefcaseBusiness,
  Globe2,
  MailCheck,
  MapPinned,
  PhoneCall,
} from "lucide-react";
import TeamBusinessCardActions from "@/components/TeamBusinessCardActions";
import { getInitials, type TeamMember } from "@/lib/team";

function ContactRowV2({
  icon,
  children,
  href,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  href?: string;
}) {
  const content = (
    <div className="flex min-h-[48px] items-center gap-3 rounded-2xl bg-[#f7f8fa] px-4 py-2.5 text-[13px] leading-relaxed text-[#1a1a1a] md:text-sm">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-[#9A7D2D]">
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

export default function TeamBusinessCardV2({ member }: { member: TeamMember }) {
  const role = member.role.replace(" - Logistics", "").replace(" - Express", "").replace(" - Movers", "");
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    member.card.mapQuery,
  )}&output=embed`;

  return (
    <section className="bg-[#f4f4f4] px-4 py-10 md:py-16">
      <div className="mx-auto w-full max-w-[440px]">
        <div className="v2-surface overflow-hidden bg-white shadow-[0_24px_60px_rgba(16,24,32,0.14)]">
          <div className="relative h-[110px]" style={{ background: "var(--gold-gradient)" }} />

          <div className="-mt-[56px] flex flex-col items-center px-6 pb-8">
            <div className="relative h-[112px] w-[112px] overflow-hidden rounded-full border-[5px] border-white bg-[#152642] text-2xl font-bold text-white shadow-lg">
              {(member.avatar ?? member.photo) ? (
                <Image
                  src={(member.avatar ?? member.photo) as string}
                  alt={member.name}
                  fill
                  sizes="112px"
                  className={
                    member.avatar ? "object-cover object-center" : "object-cover object-top"
                  }
                />
              ) : (
                <div className="grid h-full w-full place-items-center">
                  {getInitials(member.name)}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center overflow-hidden rounded-full border-[3px] border-white bg-white">
                <Image
                  src="/images/logo-tsl-kotak.png"
                  alt="TSL Logistics"
                  width={32}
                  height={32}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <h1 className="mt-4 text-center text-xl font-bold leading-tight text-[#151515]">
              {member.name}
            </h1>
            <p className="mt-1 text-center text-sm font-bold text-[#9A7D2D]">{role}</p>

            <div className="mt-6 w-full">
              <TeamBusinessCardActions
                name={member.name}
                role={member.role}
                phone={member.card.phone}
                email={member.card.email}
              />

              <a
                href={`/api/team/${member.slug}/vcard`}
                download={`${member.slug}.vcf`}
                className="mb-3 flex h-11 items-center justify-center rounded-full bg-gold-gradient px-5 text-sm font-bold leading-none text-[#121212] transition hover:opacity-90"
              >
                Save Contact
              </a>

              <div className="space-y-2.5 text-left">
                <ContactRowV2 icon={<BriefcaseBusiness size={16} />}>
                  {member.card.company}
                </ContactRowV2>
                <ContactRowV2
                  icon={<MailCheck size={16} />}
                  href={`mailto:${member.card.email}`}
                >
                  {member.card.email}
                </ContactRowV2>
                <ContactRowV2
                  icon={<PhoneCall size={16} />}
                  href={`tel:${member.card.phone.replace(/\s/g, "")}`}
                >
                  {member.card.phone}
                </ContactRowV2>
                <ContactRowV2
                  icon={<Globe2 size={16} />}
                  href={`https://${member.card.website}`}
                >
                  {member.card.website}
                </ContactRowV2>

                <div className="overflow-hidden rounded-2xl bg-[#f7f8fa]">
                  <ContactRowV2 icon={<MapPinned size={16} />}>
                    {member.card.address}
                  </ContactRowV2>
                  <div className="mx-3 mb-3 overflow-hidden rounded-xl">
                    <iframe
                      src={mapSrc}
                      width="100%"
                      height="200"
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
        </div>
      </div>
    </section>
  );
}
