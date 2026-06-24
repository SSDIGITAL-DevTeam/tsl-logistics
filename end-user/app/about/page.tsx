import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About Us | TSL Logistics",
  description:
    "We are a team of experienced movers in this industry, born to handle all of your valuable items with great care. Know more about us and our services today!",
};

const certifications = [
  {
    src: "/images/bizSAFE-Enterprise-Level-STAR-e1633345808369-1920w.jpeg",
    alt: "BizSAFE Enterprise Level Star",
  },
  { src: "/images/ISO-45001-VERTICAL-SAC-1920w.jpeg", alt: "ISO 45001 SAC" },
  { src: "/images/STA-Logo-1920w.png", alt: "STA Logo" },
  {
    src: "/images/ISO-45001-VERTICAL-SAC copy-1920w.jpeg",
    alt: "ISO 45001 Certified",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" image="/images/about-team.jpg" />

      {/* ── Trusted Logistics — Image #15 style ── */}
      <section className="py-14 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
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

            {/* Center: tall portrait image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md anim-fade-up">
              <Image
                src="/images/service-warehousing.jpg"
                alt="TSL Logistics team member"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover object-center"
              />
            </div>

            {/* Right: two stacked images */}
            <div className="flex flex-col gap-4 anim-fade-right">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/containers2.jpeg"
                  alt="Container logistics"
                  fill
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/service-logistics.jpg"
                  alt="TSL Logistics warehouse"
                  fill
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-cover"
                />
              </div>
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
              src="/images/pegang-kotak.png"
              alt="Hands holding a package"
              width={700}
              height={560}
              className="w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="py-14 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1a1a1a] mb-12">
            Companies That Move With Us
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {certifications.map((cert, i) => (
              <div key={i} className="group flex items-center justify-center">
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  width={160}
                  height={80}
                  className="h-24 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision & Mission 2×2 Grid ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Vision — gold gradient card */}
            <div
              className="rounded-2xl p-8 anim-fade-left"
              style={{ background: "var(--gold-gradient)" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[#1a1a1a]/20 flex items-center justify-center shrink-0">
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
                Mr Lai&rsquo;s vision for TSL is simple:
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
            <div className="relative rounded-2xl overflow-hidden min-h-[280px] anim-fade-right">
              <Image
                src="/images/94177729_m-1920w.jpg"
                alt="TSL Logistics team"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>

            {/* Bottom-left photo */}
            <div className="relative rounded-2xl overflow-hidden min-h-[280px] anim-fade-left">
              <Image
                src="/images/service-mover.jpg"
                alt="TSL Logistics truck"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover object-center"
              />
            </div>

            {/* Mission — dark navy card */}
            <div className="rounded-2xl p-8 bg-[#152642] anim-fade-right">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
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
                img: "/images/TSL-Logistics-van-1920w.jpeg",
                alt: "TSL Logistics cargo van",
                label: "Cargo Vans",
                desc: "Perfect for small to medium-sized deliveries, our cargo vans provide versatility and efficiency.",
              },
              {
                img: "/images/service-warehousing.jpg",
                alt: "TSL box truck",
                label: "Box Trucks",
                desc: "Our box trucks offer ample space and security for transporting large loads and valuable goods.",
              },
              {
                img: "/images/TSL Logistics Trucker Container-1920w.png",
                alt: "TSL tanker truck",
                label: "Tanker Trucks",
                desc: "Secure the safety and purity of your liquid and bulk cargo with our specialised tanker trucks, equipped to maintain optimal conditions throughout transportation.",
              },
            ].map((v) => (
              <div key={v.label}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
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
              { year: "2013", desc: "TSL Logistics Pte Ltd established" },
              {
                year: "2015",
                desc: "Expansion into container trucking services",
              },
              {
                year: "2018",
                desc: "Introduction of DG cargo trucking services",
              },
              {
                year: "2021",
                desc: "Fleet expansion to support higher volume operations",
              },
              { year: "2022", desc: "Launch of TSL Movers & Warehousing" },
              { year: "2023", desc: "Launch of TSL Express Pte Ltd" },
            ].map((m) => (
              <div
                key={m.year}
                className="rounded-2xl p-8 flex flex-col justify-between h-[180px]"
                style={{ background: "var(--gold-gradient)" }}
              >
                <span className="text-5xl font-bold text-[#1a1a1a]">
                  {m.year}
                </span>
                <p className="text-sm text-[#2a1a00] leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats + Service Types ── */}
      <section className="bg-[#152642] pt-14 pb-[120px] relative overflow-hidden">
        {/* Hand images — full screen width, absolute */}
        <div className="hidden md:block absolute left-0 top-0 w-[180px] lg:w-[220px] pointer-events-none">
          <Image
            src="/images/tangan-di-kiri.png"
            alt=""
            width={220}
            height={220}
            className="w-full object-contain object-top"
          />
        </div>
        <div className="hidden md:block absolute right-0 top-0 w-[180px] lg:w-[220px] pointer-events-none">
          <Image
            src="/images/tangan-di-kanan.png"
            alt=""
            width={220}
            height={220}
            className="w-full object-contain object-top"
          />
        </div>

        {/* Center content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Stat */}
          <div className="baba mr-20">
            <div className="flex items-baseline gap-2 flex-wrap justify-center">
              <span className="text-5xl md:text-6xl font-bold text-white">
                Over{" "}
              </span>
              <span
                className="text-5xl md:text-6xl font-bold"
                style={{
                  background: "var(--gold-gradient)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                8,000
              </span>
            </div>
            <p className="text-white text-xl font-semibold mt-1">
              Finished Bookings
            </p>
          </div>

          {/* Service categories */}
          <div className="flex flex-col gap-4">
            {[
              {
                label: "Residential",
                icon: (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                ),
              },
              {
                label: "Commercial",
                icon: (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                    <line x1="12" y1="12" x2="12" y2="16" />
                    <line x1="10" y1="14" x2="14" y2="14" />
                  </svg>
                ),
              },
              {
                label: "Offices",
                icon: (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                ),
              },
            ].map(({ label, icon }) => (
              <div key={label} className="flex items-center gap-3 text-white">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  {icon}
                </div>
                <span className="font-semibold text-base">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
