import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import {
  departmentLabels,
  getInitials,
  teamMembers,
  type TeamDepartment,
  type TeamMember,
} from "@/lib/team";

type Props = {
  searchParams?: Promise<{ department?: string }>;
};

const departments: TeamDepartment[] = ["logistics", "express", "movers"];

export const metadata: Metadata = {
  title: "Our Team | TSL Logistics",
  description:
    "Meet the TSL Logistics, TSL Express, and TSL Movers team members who support customers across transport, warehousing, express delivery, and moving services.",
};

function TeamPhoto({ member, flip }: { member: TeamMember; flip?: boolean }) {
  return (
    <div className="bg-gold-gradient relative h-[200px] overflow-hidden rounded-lg md:h-[230px]">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          className="object-contain object-bottom"
        />
      ) : (
        <div
          className={`bg-gold-gradient absolute inset-0 flex items-end justify-center ${
            flip ? "md:justify-end" : "md:justify-start"
          }`}
        >
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full border-[6px] border-white/45 bg-white/30 text-3xl font-bold text-[#1a1a1a] shadow-inner">
            {getInitials(member.name)}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg bg-[#f4f4f4] p-5">
      <h3 className="mb-2 text-sm font-bold text-[#1a1a1a]">{title}</h3>
      <ul className="list-disc space-y-1 pl-4 text-xs leading-relaxed text-[#222]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function TapeDivider() {
  const tapeText = Array.from({ length: 28 }).map((_, index) => (
    <span key={index} className="shrink-0">
      Delivery&nbsp;&nbsp;&nbsp; Shipping&nbsp;&nbsp;&nbsp; TSL Logistic
    </span>
  ));

  return (
    <div className="relative my-12 h-[124px] bg-white">
      <div className="bg-gold-gradient absolute left-[-36vw] top-[60px] z-20 flex h-[40px] w-[180vw] rotate-[1.35deg] items-center gap-7 px-10 text-[11px] font-black uppercase leading-none tracking-tight text-[#111] shadow-sm">
        {tapeText}
      </div>
      <div className="bg-gold-gradient absolute left-[-36vw] top-[58px] z-10 flex h-[40px] w-[180vw] rotate-[0.08deg] items-center gap-7 px-10 text-[11px] font-black uppercase leading-none tracking-tight text-[#111] shadow-sm">
        {tapeText}
      </div>
    </div>
  );
}

function TeamMemberBlock({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const imageFirst = index % 2 === 0;

  return (
    <article className="mx-auto max-w-[1080px] px-6">
      <div className="grid items-center gap-6 md:grid-cols-2 md:gap-8">
        <div className={imageFirst ? "" : "md:order-2"}>
          <TeamPhoto member={member} flip={!imageFirst} />
        </div>

        <div className={imageFirst ? "" : "md:order-1"}>
          <h2 className="text-2xl font-bold text-[#171717]">{member.name}</h2>
          <p className="mb-3 text-xs font-bold text-[var(--primary-dark)]">
            {member.role}
          </p>
          <p className="max-w-[58ch] text-xs leading-relaxed text-[#333]">
            {member.intro}
          </p>
          <Link
            href={`/our-team/${member.slug}`}
            className="bg-gold-gradient mt-5 inline-flex items-center gap-2 rounded-md px-4 py-2 text-[11px] font-bold text-[#181818] transition hover:-translate-y-0.5 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary-dark)]"
          >
            <span className="grid h-4 w-4 place-items-center rounded-full bg-[#1a1a1a] text-[9px] text-white">
              i
            </span>
            View Digital Business Card
          </Link>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <InfoPanel
          title="Key Experience / Expertise:"
          items={member.experience}
        />
        <InfoPanel
          title="Key Contributions / Value:"
          items={member.contributions}
        />
      </div>
    </article>
  );
}

export default async function OurTeamPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const selected = departments.includes(
    resolvedSearchParams?.department as TeamDepartment,
  )
    ? (resolvedSearchParams?.department as TeamDepartment)
    : "logistics";
  const members = teamMembers.filter(
    (member) => member.department === selected,
  );

  return (
    <>
      <PageHero title="Our Team" image="/images/about-team.jpg" />
      <TapeDivider />

      <section className="bg-white pb-10 pt-2 md:pb-14">
        <div className="mx-auto max-w-[1080px] px-6">
          <h1 className="mb-2 text-2xl font-bold text-[#181818]">
            Meet Our Team
          </h1>
          <p className="max-w-[820px] text-xs leading-relaxed text-[#333] md:text-sm">
            Meet the people who keep TSL&apos;s transport, express, and moving
            services running with practical planning, responsive support, and
            dependable day-to-day execution.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {departments.map((department) => {
              const active = selected === department;
              return (
                <Link
                  key={department}
                  href={`/our-team?department=${department}`}
                  className={`rounded-full px-4 py-1.5 text-[11px] font-semibold transition ${
                    active
                      ? "bg-gold-gradient text-[#161616]"
                      : "bg-[#eeeeee] text-[#333] hover:bg-[#dedede]"
                  }`}
                >
                  {departmentLabels[department]}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white pb-16">
        {members.map((member, index) => (
          <div key={member.slug}>
            {index > 0 && <TapeDivider />}
            <TeamMemberBlock member={member} index={index} />
          </div>
        ))}
      </section>

      <section className="bg-[#f6f6f6] py-14">
        <div className="mx-auto flex max-w-[1080px] flex-col items-start justify-between gap-5 px-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary-dark)]">
              TSL Group
            </p>
            <h2 className="mt-1 text-2xl font-bold text-[#171717]">
              Need the right contact for your job?
            </h2>
          </div>
          <Link href="/contact" className="btn-pill-gold">
            Contact Us <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
