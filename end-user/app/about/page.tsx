import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CompaniesThatMoveWithUs from "@/components/CompaniesThatMoveWithUs";
import AboutV2 from "@/components/AboutV2";

export const metadata: Metadata = {
  title: "About Us | TSL Logistics",
  description:
    "We are a team of experienced movers in this industry, born to handle all of your valuable items with great care. Know more about us and our services today!",
};

const aboutGalleryImages = [
  {
    src: "/images/inside1.jpeg",
    alt: "TSL Logistics operation area",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/inside2.jpeg",
    alt: "TSL Logistics team",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/inside3.jpeg",
    alt: "TSL Logistics staff discussion",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/inside4.jpeg",
    alt: "TSL Logistics moving team",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    src: "/images/inside5.jpeg",
    alt: "TSL warehouse facility",
    className: "md:col-span-1 md:row-span-1",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="theme-v1-only">
      <PageHero
        title="About Us"
        image="/images/wfn05957.jpg"
        imagePosition="object-[center_70%]"
      />

      {/* ── Trusted Logistics — Image #15 style ── */}
      <section className="bg-white pt-14 pb-14 md:pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-center">
            {/* Left: headline + text */}
            <div className="anim-fade-left">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-5 leading-tight">
                Trusted Logistics,
                <br />
                Guaranteed Results
              </h2>
              <p className="text-[#555] leading-relaxed text-sm">
                Founded in 2003, TSL Logistics Pte Ltd is a client-focused,
                integrated logistics provider trusted by global, regional, and
                local businesses. Backed by experienced professionals, proven
                systems, and a strong network of reliable partners, we ensure
                every asset is carefully managed, accurately tracked, and
                delivered safely and on time — every time.
              </p>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden shadow-md anim-fade-right">
              <Image
                src="/images/_DSC0024-2.jpg"
                alt="TSL Logistics operations"
                fill
                sizes="(max-width: 1024px) 100vw, 660px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner — pegang-kotak ── */}
      <section
        className="bg-[#f5f6f8] pt-14 pb-0 overflow-hidden"
        style={{ clipPath: "inset(0)" }}
      >
        {/* Text */}
        <div className="text-center px-6 mb-10">
          <p className="text-lg md:text-xl text-[#555] mb-2">
            If You Need Something Shipped, Delivered Or Transported&hellip;
          </p>
          <p className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">
            Then You&rsquo;ve Come To The Right Place!
          </p>
        </div>

        {/* Gold half-circle + image */}
        <div className="relative flex justify-center items-end">
          {/* Half-circle — large, behind image */}
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: "1000px",
              height: "1000px",
              bottom: "-750px",
              background: "var(--gold-gradient)",
            }}
          />
          {/* Pegang-kotak image */}
          <div className="relative z-10 w-[380px] md:w-[500px]">
            <Image
              src="/images/tangan-kotak.png"
              alt="Hands holding a package"
              width={700}
              height={560}
              className="w-full object-contain"
            />
          </div>
        </div>
      </section>

      <CompaniesThatMoveWithUs />

      {/* ── Vision & Mission 2×2 Grid ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Vision — gold gradient card */}
            <div
              className="v2-surface p-8 anim-fade-left"
              style={{ background: "var(--gold-gradient)" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1a1a1a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-[#1a1a1a]">Vision</h2>
              </div>
              <p className="text-sm text-[#2a2000] leading-relaxed mb-5">
                It&rsquo;s often very trendy these days to start a Vision
                statement with words like &ldquo;To be the best logistics
                company&hellip;&rdquo; etc. And that&rsquo;s why we won&rsquo;t!
              </p>
              <p className="text-base md:text-lg font-bold text-[#1a1a1a] leading-snug mb-5">
                &ldquo;To continue to remain the go to name for logistics
                services throughout the region&rdquo;
              </p>
              <p className="text-sm text-[#2a2000] leading-relaxed">
                We have earned the trust of our clients over 12 years. Our
                vision is to maintain and grow it for many more years to come.
              </p>
            </div>

            {/* Top-right photo */}
            <div className="relative overflow-hidden min-h-[280px] anim-fade-right">
              <Image
                src="/images/blur-car.png"
                alt="TSL Logistics team"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>

            {/* Bottom-left photo */}
            <div className="relative overflow-hidden min-h-[280px] anim-fade-left">
              <Image
                src="/images/about-vision-team.png"
                alt="TSL Logistics truck"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover object-center"
              />
            </div>

            {/* Mission — dark navy card */}
            <div className="v2-surface p-8 bg-[#152642] anim-fade-right">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">Mission</h2>
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-5">
                As a solution-oriented company, we&rsquo;ve set ourselves the
                mission to:
              </p>
              <p className="text-base md:text-lg font-bold text-white leading-snug mb-5">
                &ldquo;Evolve, innovate and invent ways to deliver better and
                more diverse air, sea and freight services for our
                clients&rdquo;
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                And to fulfil our mission, TSL constantly stays abreast of the
                latest trends and technologies in modern logistics.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <Link href="/tsl-logistics" className="btn-pill-gold">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      {/* ── Our Fleet ── */}
      <section className="py-16 bg-[#f5f6f8]">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1a1a1a] mb-10">
            Our Fleet
          </h2>

          {/* Intro row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-start">
            <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] leading-tight">
              Wide Range of Vehicles for Every Need
            </h3>
            <p className="text-[#555] leading-relaxed text-sm">
              TSL Logistics is your trusted transportation partner in Singapore,
              offering safe, flexible, and reliable logistics solutions. From
              vans and trucks to specialised DG tankers and 20/40-footer
              rentals, we provide the right vehicle to meet your needs — on your
              terms.
            </p>
          </div>

          {/* Vehicle cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-grid">
            {[
              {
                img: "/images/about-fleet-02.png",
                alt: "TSL Logistics cargo van",
                label: "Cargo Vans",
                desc: "Perfect for small to medium-sized deliveries, our cargo vans provide versatility and efficiency.",
              },
              {
                img: "/images/box-truck-2.jpg",
                alt: "TSL box truck",
                label: "Box Trucks",
                desc: "Our box trucks offer ample space and security for transporting large loads and valuable goods.",
              },
              {
                img: "/images/container-trucks.png",
                alt: "TSL container truck",
                label: "Container Trucks",
                desc: "Built for heavier freight and container movements, our container trucks support reliable transport for larger commercial and industrial cargo.",
              },
            ].map((v) => (
              <div key={v.label}>
                <div className="relative aspect-[4/3] overflow-hidden mb-4">
                  <Image
                    src={v.img}
                    alt={v.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-[#1a1a1a] mb-2">{v.label}</h4>
                <p className="text-[#555] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Company Milestones ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1a1a1a] mb-10">
            Company Milestones
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger-grid">
            {[
              {
                year: "2013",
                title: "TSL Logistics Pte Ltd Established",
                desc: (
                  <>
                    Started operations with a dedicated team of{" "}
                    <strong className="font-bold text-[#1a1a00]">10 employees</strong>,
                    laying the foundation for reliable logistics solutions.
                  </>
                ),
              },
              {
                year: "2015",
                title: "Expansion into Container Trucking Services",
                desc: (
                  <>
                    Broadened service capabilities with the introduction of
                    container trucking, growing the team to{" "}
                    <strong className="font-bold text-[#1a1a00]">30 employees</strong>.
                  </>
                ),
              },
              {
                year: "2018",
                title: "Introduction of DG Cargo Trucking Services",
                desc: (
                  <>
                    Expanded expertise to include{" "}
                    <strong className="font-bold text-[#1a1a00]">
                      Dangerous Goods (DG) cargo transportation
                    </strong>{" "}
                    while achieving{" "}
                    <strong className="font-bold text-[#1a1a00]">bizSAFE Level 3</strong>{" "}
                    certification. Team size grew to{" "}
                    <strong className="font-bold text-[#1a1a00]">70 employees</strong>.
                  </>
                ),
              },
              {
                year: "2021",
                title: "Fleet Expansion & Operational Growth",
                desc: (
                  <>
                    Expanded the fleet to support increasing customer demand
                    and higher-volume operations. Achieved the prestigious{" "}
                    <strong className="font-bold text-[#1a1a00]">bizSAFE STAR</strong>{" "}
                    certification and grew to{" "}
                    <strong className="font-bold text-[#1a1a00]">90 employees</strong>.
                  </>
                ),
              },
              {
                year: "2022",
                title: "Launch of TSL Movers & Warehousing",
                desc: (
                  <>
                    Diversified into professional moving and warehousing
                    solutions with the establishment of{" "}
                    <strong className="font-bold text-[#1a1a00]">TSL Movers & Warehousing</strong>.
                    Team expanded to{" "}
                    <strong className="font-bold text-[#1a1a00]">100 employees</strong>.
                  </>
                ),
              },
              {
                year: "2023",
                title: "Launch of TSL Express Pte Ltd",
                desc: (
                  <>
                    Established{" "}
                    <strong className="font-bold text-[#1a1a00]">TSL Express Pte Ltd</strong>{" "}
                    to provide fast and reliable express delivery services,
                    marking another milestone in the Group&rsquo;s growth with
                    a workforce of{" "}
                    <strong className="font-bold text-[#1a1a00]">120 employees</strong>.
                  </>
                ),
              },
            ].map((m) => (
              <div
                key={m.year}
                className="flex flex-col gap-3 p-8"
                style={{ background: "var(--gold-gradient)" }}
              >
                <span className="text-5xl font-bold text-[#1a1a1a]">
                  {m.year}
                </span>
                <h3 className="text-base font-bold leading-snug text-[#1a1a1a]">
                  {m.title}
                </h3>
                <p className="text-sm text-[#2a1a00] leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Company Gallery ── */}
      <section className="bg-gray-50 pb-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-2xl font-bold leading-tight text-[#1a1a1a] md:text-3xl">
              Inside TSL Logistics
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#555] md:text-base">
              A closer look at our teams, facilities, and logistics operations across every service.
            </p>
          </div>
          <div className="grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {aboutGalleryImages.map((image) => (
              <div
                key={image.src}
                className={`relative overflow-hidden rounded-lg bg-gray-100 ${image.className}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats + Service Types ── */}
      <section className="bg-white pt-16">
        <div className="v2-no-radius relative overflow-hidden bg-[#1f3a70] px-6 py-16 md:min-h-[330px] md:px-10 lg:px-16">
          <div className="pointer-events-none absolute bottom-[-52px] left-[-48px] hidden w-[42vw] max-w-[590px] md:block">
            <Image
              src="/images/box.png"
              alt=""
              width={1194}
              height={810}
              className="w-full object-contain"
            />
          </div>
          <div className="pointer-events-none absolute bottom-[-58px] left-[-90px] w-[300px] opacity-55 md:hidden">
            <Image
              src="/images/box.png"
              alt=""
              width={1194}
              height={810}
              className="w-full object-contain"
            />
          </div>

          <div className="relative z-10 mx-auto grid max-w-[1220px] items-center gap-10 md:min-h-[230px] md:grid-cols-[minmax(280px,0.9fr)_minmax(360px,1fr)]">
            <div className="hidden md:block" />

            <div className="text-center md:text-left">
              <div className="flex flex-wrap items-baseline justify-center gap-2 md:justify-start">
                <span className="text-5xl font-bold leading-none text-white md:text-[72px]">
                  Over
                </span>
                <span
                  className="text-5xl font-bold leading-none md:text-[72px]"
                  style={{
                    background: "var(--gold-gradient)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  8,000
                </span>
              </div>
              <p className="mt-4 text-2xl font-medium leading-tight text-white md:text-[34px]">
                Finished Bookings
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>

      <div className="theme-v2-only">
        <AboutV2 />
      </div>
    </>
  );
}
