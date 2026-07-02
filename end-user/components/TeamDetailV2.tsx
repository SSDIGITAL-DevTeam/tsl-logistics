import Image from "next/image";
import Link from "next/link";
import { ContactRound } from "lucide-react";
import { departmentLabels, getInitials, type TeamMember } from "@/lib/team";

export default function TeamDetailV2({ member }: { member: TeamMember }) {
  const role = member.role.replace(` - ${departmentLabels[member.department]}`, "");

  return (
    <section className="bg-white px-5 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-[1220px]">
        <div className="v2-surface flex flex-col items-center gap-6 bg-[#f4f4f4] p-8 text-center md:flex-row md:items-center md:gap-10 md:p-12 md:text-left">
          <div className="relative h-[150px] w-[150px] shrink-0 overflow-hidden rounded-full border-[6px] border-white bg-gold-gradient text-3xl font-bold text-[#121212] shadow-lg">
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.name}
                fill
                sizes="150px"
                className="object-contain object-bottom"
                priority
              />
            ) : (
              <div className="grid h-full w-full place-items-center">{getInitials(member.name)}</div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold leading-tight text-[#151515] md:text-4xl">
              {member.name}
            </h1>
            <p className="mt-2 text-sm font-bold text-[#9A7D2D] md:text-base">
              {role} — {departmentLabels[member.department]}
            </p>
            <p className="mt-4 max-w-[600px] text-sm leading-relaxed text-[#555] md:text-base">
              {member.intro}
            </p>
          </div>

          <Link
            href={`/our-team/${member.slug}/business-card`}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-3.5 text-sm font-bold text-[#121212] transition hover:opacity-90 md:self-start"
          >
            <ContactRound size={18} strokeWidth={2.1} />
            Digital Business Card
          </Link>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="v2-surface bg-white p-7 shadow-[0_18px_50px_rgba(16,24,32,0.08)] md:p-8">
            <h2 className="text-lg font-bold text-[#151515]">Key Experience / Expertise</h2>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#555] md:text-[15px]">
              {member.experience.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8A84B]" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-gray-100 pt-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#9A7D2D]">
                Role in the company
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#555] md:text-[15px]">{role}</p>
            </div>
          </div>

          <div className="v2-surface bg-[#152642] p-7 text-white md:p-8">
            <h2 className="text-lg font-bold">Key Contributions / Value</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75 md:text-[15px]">
              {member.contributions.join(" ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
