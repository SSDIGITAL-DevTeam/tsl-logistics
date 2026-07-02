import Image from "next/image";
import Link from "next/link";
import { ContactRound } from "lucide-react";
import { departmentLabels, type TeamDepartment, type TeamMember } from "@/lib/team";

const departments: TeamDepartment[] = ["logistics", "express", "movers"];

function TeamCardV2({ member }: { member: TeamMember }) {
  const role = member.role.replace(` - ${departmentLabels[member.department]}`, "");

  return (
    <article className="v2-surface group flex h-full flex-col overflow-hidden bg-white shadow-[0_18px_50px_rgba(16,24,32,0.10)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#111]">
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
            className="object-contain object-bottom transition duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold leading-tight text-[#151515]">{member.name}</h3>
        <p className="mt-1 text-sm font-bold text-[#9A7D2D]">{role}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[#555]">{member.intro}</p>
        <div className="mt-5 flex gap-2.5">
          <Link
            href={`/our-team/${member.slug}`}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-gold-gradient px-4 py-2.5 text-xs font-bold text-[#121212] transition hover:opacity-90"
          >
            More Info
          </Link>
          <Link
            href={`/our-team/${member.slug}/business-card`}
            aria-label={`${member.name} digital business card`}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gray-200 text-[#151515] transition hover:border-[#C8A84B] hover:text-[#9A7D2D]"
          >
            <ContactRound size={17} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function OurTeamV2({
  selected,
  members,
}: {
  selected: TeamDepartment;
  members: TeamMember[];
}) {
  return (
    <>
      <section className="bg-white px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-[1220px]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <h1 className="max-w-[760px] text-4xl font-bold leading-[1.12] tracking-[-0.02em] text-[#151515] md:text-6xl lg:text-[56px]">
              Meet Our Team
            </h1>
            <div className="max-w-[340px] lg:justify-self-end">
              <p className="text-sm leading-relaxed text-[#151515]">
                Meet the dedicated team behind our operations who ensure every process runs
                smoothly, efficiently, and on time. With strong coordination and attention to
                detail, they keep everything moving forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f4f4] py-16 md:py-24">
        <div className="mx-auto max-w-[1220px] px-5 md:px-8">
          <div className="max-w-full overflow-x-auto">
            <div className="flex min-w-max items-center gap-2">
              {departments.map((department) => (
                <Link
                  key={department}
                  href={`/our-team?department=${department}`}
                  className={`rounded-full px-6 py-3 text-sm font-semibold leading-none transition ${
                    selected === department
                      ? "bg-gold-gradient text-[#121212]"
                      : "border border-[#d9d9d9] bg-white text-[#1a1a1a] hover:border-[#C8A84B] hover:text-[#9A7D2D]"
                  }`}
                >
                  {departmentLabels[department]}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {members.map((member) => (
              <TeamCardV2 key={member.slug} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
