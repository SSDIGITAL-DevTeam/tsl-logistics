import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ContactRound } from "lucide-react";
import PageHero from "@/components/PageHero";
import { departmentLabels, teamMembers, type TeamMember } from "@/lib/team";

type Props = {
  searchParams?: Promise<{ department?: string }>;
};

const departments = ["logistics", "express", "movers"] as const;

export const metadata: Metadata = {
  title: "Our Team | TSL Logistics",
  description: "Meet the dedicated team behind TSL Logistics operations.",
};

function PillTabs({ selected }: { selected: string }) {
  return (
    <div className="max-w-full overflow-x-auto">
      <div className="flex min-w-max items-center gap-2">
        {departments.map((department) => (
          <Link
            key={department}
            href={`/our-team?department=${department}`}
            className={`min-w-[92px] border px-5 py-3 text-center text-sm font-medium leading-none transition ${
              selected === department
                ? "border-transparent bg-gold-gradient text-[#121212]"
                : "border-[#d9d9d9] bg-white text-[#1a1a1a] hover:border-[#c8a84b] hover:text-[#b28a2f]"
            }`}
          >
            {departmentLabels[department]}
          </Link>
        ))}
      </div>
    </div>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="group relative min-h-[526px] overflow-hidden bg-[#111]">
      <Image
        src="/images/team/latar-card.png"
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        className="object-cover object-center"
      />
      {member.photo && (
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          className={`transition duration-500 group-hover:scale-[1.03] ${
            member.photo.endsWith(".jpg") || member.slug === "alan-tay"
              ? "object-cover object-top"
              : "object-contain object-bottom"
          }`}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 z-10 p-7 text-white transition duration-300 group-hover:translate-y-3 group-hover:opacity-0">
        <h2 className="text-2xl font-bold leading-tight">{member.name}</h2>
        <p className="mt-2 text-base leading-snug text-white/90">
          {member.role.replace(` - ${departmentLabels[member.department]}`, "")}
        </p>
      </div>

      <div className="absolute inset-0 z-20 flex translate-y-6 flex-col justify-between bg-gold-gradient p-7 text-[#121212] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="max-w-[310px] text-sm leading-relaxed md:text-[15px]">{member.intro}</p>

        <div>
          <div className="space-y-3">
            <Link
              href={`/our-team/${member.slug}/business-card`}
              className="inline-flex w-full items-center justify-center gap-2 bg-black px-5 py-3.5 text-sm font-bold leading-none text-white transition hover:bg-[#222]"
            >
              <ContactRound size={20} strokeWidth={2.1} />
              View Digital Business Card
            </Link>
            <Link
              href={`/our-team/${member.slug}`}
              className="inline-flex w-full items-center justify-center gap-3 border border-black px-5 py-3.5 text-sm font-bold leading-none text-black transition hover:bg-black hover:text-white"
            >
              More Info
              <ArrowRight size={21} />
            </Link>
          </div>

          <div className="mt-9">
            <h2 className="text-xl font-bold leading-tight">{member.name}</h2>
            <p className="mt-1 text-sm leading-snug md:text-base">
              {member.role.replace(` - ${departmentLabels[member.department]}`, "")}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default async function OurTeamPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const selected = departments.includes(
    resolvedSearchParams?.department as (typeof departments)[number],
  )
    ? (resolvedSearchParams?.department as (typeof departments)[number])
    : "logistics";
  const members = teamMembers.filter(
    (member) => member.department === selected,
  );

  return (
    <>
      <PageHero title="Our Team" image="/images/ourteam-banner.png" imagePosition="object-[center_35%]" />

      <section className="bg-[#f4f4f4] py-12 md:py-16">
        <div className="mx-auto max-w-[1240px] px-5 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <div>
              <h1 className="text-3xl font-bold capitalize leading-tight text-[#1a1a1a] md:text-4xl">
                Meet Our Team
              </h1>
              <p className="mt-4 max-w-[760px] text-sm leading-relaxed text-[#1a1a1a] md:text-base">
                Meet the dedicated team behind our operations who ensure every
                process runs smoothly, efficiently, and on time. With strong
                coordination and attention to detail, they keep everything
                moving forward.
              </p>
            </div>
            <div className="lg:pt-3">
              <PillTabs selected={selected} />
            </div>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {members.map((member) => (
              <TeamCard key={member.slug} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
