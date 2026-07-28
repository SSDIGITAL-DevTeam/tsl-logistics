import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactRound } from "lucide-react";
import { notFound } from "next/navigation";
import { departmentLabels, getInitials, getTeamMember, teamMembers } from "@/lib/team";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return teamMembers.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return {};

  return {
    title: `${member.name} | Our Team`,
    description: `${member.name}, ${member.role} at TSL Logistics.`,
  };
}

function DetailAvatar({
  name,
  photo,
  avatar,
  slug,
}: {
  name: string;
  photo?: string;
  avatar?: string;
  slug?: string;
}) {
  const src = avatar ?? photo;
  return (
    <div className="relative h-[174px] w-[174px] overflow-hidden rounded-full border-[6px] border-[#1a1a1a] bg-gold-gradient text-3xl font-bold text-[#121212]">
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes="164px"
          className={
            avatar
              ? "object-cover object-center"
              : src.endsWith(".jpg") || slug === "alan-tay"
                ? "object-cover object-top"
                : "object-contain object-bottom"
          }
          priority
        />
      ) : (
        <div className="grid h-full w-full place-items-center">
          {getInitials(name)}
        </div>
      )}
    </div>
  );
}

export default async function TeamDetailPage({ params }: Props) {
  const { slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  const role = member.role.replace(
    ` - ${departmentLabels[member.department]}`,
    "",
  );

  return (
    <main className="bg-[#f3f3f3] pb-14">
      <section className="relative h-[138px] overflow-hidden bg-[#1a1a1a] md:h-[170px]">
        <Image
          src="/images/homepage-image-break.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-45"
          priority
        />
        <div className="absolute inset-0 bg-black/45" />
      </section>

      <section className="mx-auto max-w-[1160px] px-5 md:px-6">
        <div className="-mt-[86px] grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          <div>
            <DetailAvatar
              name={member.name}
              photo={member.photo}
              avatar={member.avatar}
              slug={member.slug}
            />
            <div className="mt-6">
              <h1 className="text-3xl font-bold leading-tight text-[#1a1a1a]">
                {member.name}
              </h1>
              <p className="mt-3 text-sm font-bold leading-snug text-[#b58b34] md:text-[15px]">
                {role} - {departmentLabels[member.department]}
              </p>
            </div>
          </div>

          <Link
            href={`/our-team/${member.slug}/business-card`}
            className="mt-[114px] inline-flex items-center justify-center gap-2 bg-gold-gradient px-7 py-3 text-sm font-bold leading-none text-[#121212] shadow-[0_2px_5px_rgba(0,0,0,0.12)] transition hover:brightness-105 md:min-w-[280px]"
          >
            <ContactRound size={18} strokeWidth={2.1} />
            View Digital Business Card
          </Link>
        </div>

        <p className="mt-5 max-w-[820px] text-sm leading-relaxed text-[#1a1a1a] md:text-[15px]">
          {member.intro}
        </p>

        <div className="mt-9 grid gap-6 md:grid-cols-2">
          <section className="bg-white p-6 md:p-8">
            <h2 className="text-lg font-bold leading-tight text-[#1a1a1a]">
              Key Experience / Expertise:
            </h2>
            <ul className="mt-2 list-disc pl-6 text-sm leading-relaxed text-[#1a1a1a] md:text-[15px]">
              {member.experience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="mt-6">
              <h2 className="text-lg font-bold leading-tight text-[#1a1a1a]">
                Role In The Company:
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-[#1a1a1a] md:text-[15px]">
                {role}
              </p>
            </div>
          </section>

          <section className="bg-white p-6 md:p-8">
            <h2 className="text-lg font-bold leading-tight text-[#1a1a1a]">
              Key Contributions / Value:
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#1a1a1a] md:text-[15px]">
              {member.contributions.join(" ")}
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
