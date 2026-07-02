import Image from "next/image";
import Link from "next/link";
import { Building2, Home as HomeIcon, Warehouse as WarehouseIcon } from "lucide-react";
import CompaniesThatMoveWithUs from "@/components/CompaniesThatMoveWithUs";

const fleet = [
  {
    img: "/images/about-fleet-02.png",
    alt: "TSL Logistics cargo van",
    label: "Cargo Vans",
    desc: "Perfect for small to medium-sized deliveries, our cargo vans provide versatility and efficiency.",
  },
  {
    img: "/images/about-fleet-03.png",
    alt: "TSL box truck",
    label: "Box Trucks",
    desc: "Our box trucks offer ample space and security for transporting large loads and valuable goods.",
  },
  {
    img: "/images/about-fleet-01.png",
    alt: "TSL container truck",
    label: "Container Trucks",
    desc: "Built for heavier freight and container movements, supporting reliable transport for larger commercial and industrial cargo.",
  },
];

const milestones = [
  { year: "2013", desc: "TSL Logistics Pte Ltd established" },
  { year: "2015", desc: "Expansion into container trucking services" },
  { year: "2018", desc: "Introduction of DG cargo trucking services" },
  { year: "2021", desc: "Fleet expansion to support higher volume operations" },
  { year: "2022", desc: "Launch of TSL Movers & Warehousing" },
  { year: "2023", desc: "Launch of TSL Express Pte Ltd" },
];

const serviceTypes = [
  { label: "Residential", icon: HomeIcon },
  { label: "Commercial", icon: Building2 },
  { label: "Offices", icon: WarehouseIcon },
];

export default function AboutV2() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-white px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-[1220px]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <h1 className="max-w-[760px] text-4xl font-bold leading-[1.12] tracking-[-0.02em] text-[#151515] md:text-6xl lg:text-[60px]">
              Trusted Logistics, Guaranteed Results
            </h1>
            <div className="max-w-[340px] lg:justify-self-end">
              <p className="text-sm leading-relaxed text-[#151515]">
                Founded in 2003, TSL Logistics Pte Ltd is a client-focused, integrated
                logistics provider trusted by global, regional, and local businesses. Backed
                by experienced professionals, proven systems, and a strong network of
                reliable partners, we ensure every asset is carefully managed, accurately
                tracked, and delivered safely and on time — every time.
              </p>
              <Link
                href="/tsl-logistics"
                className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-gold-gradient px-7 text-sm font-bold text-[#121212] transition hover:opacity-90 active:scale-[0.98]"
              >
                Get Started Today
              </Link>
            </div>
          </div>

          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[22px] bg-[#e7ebef] md:mt-12">
            <Image
              src="/images/about-trusted-logistics.png"
              alt="TSL Logistics operations"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1220px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <CompaniesThatMoveWithUs />

      {/* ── Vision & Mission ── */}
      <section className="bg-[#f4f4f4] py-16 md:py-24">
        <div className="mx-auto max-w-[1220px] px-5 md:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            <div
              className="v2-surface p-7 md:p-8"
              style={{ background: "var(--gold-gradient)" }}
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#5c4813]">Vision</p>
              <p className="text-sm leading-relaxed text-[#2a2000]">
                It&rsquo;s often very trendy these days to start a Vision statement with words
                like &ldquo;To be the best logistics company&hellip;&rdquo; etc. And
                that&rsquo;s why we won&rsquo;t! Mr Lai&rsquo;s vision for TSL is simple:
              </p>
              <p className="mt-4 text-lg font-bold leading-snug text-[#1a1a1a] md:text-xl">
                &ldquo;To continue to remain the go to name for logistics services throughout
                the region.&rdquo;
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#2a2000]">
                We have earned the trust of our clients over 12 years. Our vision is to
                maintain and grow it for many more years to come.
              </p>
            </div>

            <div className="v2-surface bg-[#152642] p-7 md:p-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#E5C96A]">Mission</p>
              <p className="text-sm leading-relaxed text-white/70">
                As a solution-oriented company, we&rsquo;ve set ourselves the mission to:
              </p>
              <p className="mt-4 text-lg font-bold leading-snug text-white md:text-xl">
                &ldquo;Evolve, innovate and invent ways to deliver better and more diverse air,
                sea and freight services for our clients.&rdquo;
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                And to fulfil our mission, TSL constantly stays abreast of the latest trends
                and technologies in modern logistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Fleet ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1220px] px-5 md:px-8">
          <div className="mx-auto max-w-[650px] text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-[#151515] md:text-5xl">
              Our Fleet
            </h2>
            <p className="mx-auto mt-5 max-w-[650px] text-base leading-relaxed text-[#555]">
              TSL Logistics is your trusted transportation partner in Singapore, offering
              safe, flexible, and reliable logistics solutions. From vans and trucks to
              specialised DG tankers and 20/40-footer rentals, we provide the right vehicle
              to meet your needs — on your terms.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {fleet.map((v) => (
              <article key={v.label} className="v2-surface overflow-hidden bg-white shadow-[0_18px_50px_rgba(16,24,32,0.10)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={v.img}
                    alt={v.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#1a1a1a]">{v.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#555]">{v.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Company Milestones ── */}
      <section className="bg-[#f4f4f4] py-16 md:py-24">
        <div className="mx-auto max-w-[820px] px-5 md:px-8">
          <h2 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-[#151515] md:text-5xl">
            Company Milestones
          </h2>

          <div className="relative mt-12 pl-9 md:pl-11">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#D2AC47]/35 md:left-[9px]" />
            <div className="space-y-9 md:space-y-10">
              {milestones.map((m) => (
                <div key={m.year} className="relative">
                  <span
                    className="absolute -left-9 top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-[#f4f4f4] md:-left-11"
                    style={{ background: "var(--gold-gradient)" }}
                  />
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                    <span className="text-2xl font-bold leading-none text-[#151515] sm:w-[100px] sm:shrink-0 md:text-3xl">
                      {m.year}
                    </span>
                    <p className="text-sm leading-relaxed text-[#555] md:text-base">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats + Service Types ── */}
      <section className="v2-no-radius bg-[#152642] px-5 py-20 text-center text-white md:py-28">
        <div className="flex flex-wrap items-baseline justify-center gap-3">
          <span className="text-6xl font-bold leading-none md:text-[88px]">Over</span>
          <span
            className="text-6xl font-bold leading-none md:text-[88px]"
            style={{
              background: "var(--gold-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            8,000
          </span>
        </div>
        <p className="mt-4 text-xl font-medium text-white/80 md:text-2xl">
          Finished Bookings
        </p>

        <div className="mx-auto mt-12 flex max-w-[640px] flex-wrap items-center justify-center gap-3">
          {serviceTypes.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-3"
            >
              <Icon size={18} strokeWidth={1.8} className="text-[#E5C96A]" />
              <span className="text-sm font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
