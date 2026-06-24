import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IdCard } from "lucide-react";
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

function TapeDivider({ tight = false }: { tight?: boolean }) {
  const tapeText = Array.from({ length: 34 }).map((_, index) => (
    <span key={index} className="shrink-0">
      TSL Logistic&nbsp;&nbsp;&nbsp; Delivery&nbsp;&nbsp;&nbsp; Shipping
    </span>
  ));

  return (
    <div
      className={`relative h-[150px] overflow-visible bg-white ${tight ? "my-0" : "my-10"}`}
    >
      <div className="absolute left-1/2 top-[28px] h-[110px] w-[150vw] -translate-x-1/2 overflow-visible">
        <div className="absolute left-1/2 top-[6px] z-10 flex h-[52px] w-[150vw] -translate-x-1/2 rotate-[3deg] items-center gap-8 bg-[#c6a44f] px-0 text-[14px] font-black leading-none text-[#121212] md:text-[18px]">
          {tapeText}
        </div>
        <div className="absolute left-1/2 top-[6px] z-20 flex h-[52px] w-[150vw] -translate-x-1/2 -rotate-[0.12deg] items-center gap-8 bg-gold-gradient px-0 text-[14px] font-black leading-none text-[#121212] md:text-[18px]">
          {tapeText}
        </div>
      </div>
    </div>
  );
}

function PillTabs({ selected }: { selected: string }) {
  return (
    <div className="inline-flex rounded-[58px] bg-[#f5f5f5] p-[10px]">
      <div className="flex flex-wrap items-center gap-[14px]">
        {departments.map((department) => (
          <Link
            key={department}
            href={`/our-team?department=${department}`}
            className={`rounded-full px-6 py-2 text-sm leading-[1.5] text-black md:text-[20px] ${
              selected === department ? "bg-gold-gradient" : ""
            }`}
          >
            {departmentLabels[department]}
          </Link>
        ))}
      </div>
    </div>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[250px] rounded-[25px] bg-[#f5f5f5] p-8 text-[#121212] md:min-h-[310px]">
      <h3 className="text-xl font-bold leading-[1.5] md:text-[26px]">
        {title}
      </h3>
      <div className="mt-1 text-base leading-[1.5] md:text-[22px]">
        {children}
      </div>
    </div>
  );
}

function MemberPhoto({ member }: { member: TeamMember }) {
  return (
    <div className="relative h-[300px] overflow-hidden rounded-[25px] bg-[#d3ab47] md:h-[391px]">
      {member.photo && (
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, 608px"
          className="object-contain object-bottom"
        />
      )}
    </div>
  );
}

function MemberSection({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const imageFirst = index !== 1;

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="mx-auto max-w-[1240px] px-4">
        <div className="grid items-center gap-6 md:grid-cols-2 md:gap-6">
          <div className={imageFirst ? "" : "md:order-2"}>
            <MemberPhoto member={member} />
          </div>
          <div className={imageFirst ? "" : "md:order-1"}>
            <h2 className="text-4xl font-bold leading-[54px] text-[#121212] md:text-[42px]">
              {member.name}
            </h2>
            <p className="mt-3 text-lg font-bold leading-[1.5] text-[#b0873a] md:text-[22px]">
              {member.role}
            </p>
            <p className="mt-6 text-base leading-[1.5] text-[#121212] md:text-[18px]">
              {member.intro}
            </p>
            <Link
              href={`/our-team/${member.slug}`}
              className="mt-6 inline-flex h-[60px] w-full max-w-[332px] items-center justify-center gap-2 rounded-full bg-gold-gradient px-[18px] py-[14px] text-[18px] font-bold leading-[24px] text-[#121212] shadow-[0_1px_2px_rgba(25,33,61,0.08)]"
            >
              <IdCard size={24} fill="currentColor" strokeWidth={1.5} />
              View Digital Business Card
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <InfoCard title="Key Experience / Expertise:">
            <ul className="list-disc pl-6">
              {member.experience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mt-8">
              <p className="font-bold">Role In The Company:</p>
              <p>
                {member.slug === "alan-tay"
                  ? "Managing Director of TSL Group"
                  : member.slug === "shirley-goh"
                    ? "Sales Support & Business Development"
                    : "Operations Leadership & Strategy"}
              </p>
            </div>
          </InfoCard>
          <InfoCard title="Key Contributions / Value:">
            <p>{member.contributions.join(" ")}</p>
          </InfoCard>
        </div>
      </div>
    </section>
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
      <PageHero title="Our Team" image="/images/about-team.jpg" />
      <TapeDivider tight />

      <section className="bg-white pb-8 pt-2">
        <div className="mx-auto max-w-[1280px] px-4">
          <h1 className="text-[40px] font-semibold capitalize leading-[1.5] text-[#121212]">
            Meet Our team
          </h1>
          <p className="mt-1 max-w-[930px] text-base leading-[1.5] text-[#121212]">
            Meet the dedicated team behind our operations who ensure every
            process runs smoothly, efficiently, and on time. With strong
            coordination and attention to detail, they keep everything moving
            forward.
          </p>
          <div className="mt-9">
            <PillTabs selected={selected} />
          </div>
        </div>
      </section>

      <section className="bg-white pb-16">
        {members.map((member, index) => (
          <div key={member.slug}>
            <MemberSection member={member} index={index} />
            {index < members.length - 1 && <TapeDivider tight />}
          </div>
        ))}
      </section>
    </>
  );
}
