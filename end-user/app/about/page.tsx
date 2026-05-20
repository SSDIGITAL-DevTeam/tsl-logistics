import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | TSL Logistics",
  description:
    "We are a team of experienced movers in this industry, born to handle all of your valuable items with great care. Know more about us and our services today!",
};

const certifications = [
  { src: "/images/bizSAFE-Enterprise-Level-STAR-e1633345808369-1920w.jpeg", alt: "BizSAFE Enterprise Level Star" },
  { src: "/images/ISO-45001-VERTICAL-SAC-1920w.jpeg", alt: "ISO 45001 SAC" },
  { src: "/images/STA-Logo-1920w.png", alt: "STA Logo" },
  { src: "/images/ISO-45001-VERTICAL-SAC copy-1920w.jpeg", alt: "ISO 45001 Certified" },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Page Title ── */}
      <div className="bg-[#1E1E1E] py-12 border-b border-[#C8A84B]/30">
        <div className="hero-in max-w-[1200px] mx-auto px-4 text-center">
          <p className="eyebrow mb-2">Who We Are</p>
          <h1 className="text-2xl md:text-3xl font-bold text-white">About TSL Logistics</h1>
          <div className="gold-divider mt-4" />
        </div>
      </div>

      {/* ── About Content ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 anim-fade-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C8A84B] mb-3">Our Story</p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#252525] mb-4 leading-tight">
                Singapore&rsquo;s Trusted Integrated Logistics Partner
              </h2>
              <div className="gold-divider-left mb-6" />
              <p className="text-[#555] leading-relaxed mb-4">
                <strong className="text-[#252525]">TSL Logistics Pte Ltd</strong>{" "}
                was founded in 2003, by veteran logistics expert Mr Alan Tay Soon Lai, with the objective of creating a
                client-focused logistics and distribution service provider. Since then, we have grown to become
                Singapore&rsquo;s renowned integrated logistics services provider for global, regional and local
                businesses, and a &ldquo;go to&rdquo; name when it comes to guaranteeing results!
              </p>
              <p className="text-[#555] leading-relaxed mb-4">
                No one knows the importance of timely and accurate logistics better than the TSL Team. That&rsquo;s why
                we have invested a great deal of time, energy and resources in putting in place systems and processes
                that help us ensure that our client assets are received, tracked, shipped and delivered safely and on
                time &ndash; every time!
              </p>
              <p className="text-[#555] leading-relaxed mb-6">
                Our knowledgeable staff are the most experienced in the business and, over the years, we have
                established strong partnerships with a network of reliable names to deliver high-quality end-to-end
                services to our clients.
              </p>
              <div className="bg-gray-50 rounded-xl border-l-4 border-[#C8A84B] p-5">
                <h3 className="text-base font-semibold text-[#252525] leading-relaxed">
                  If you need something shipped, delivered or transported&hellip;then you&rsquo;ve come to the right place!
                </h3>
              </div>
            </div>
            <div className="lg:w-[45%] shrink-0 anim-fade-right">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl overflow-hidden shadow-md aspect-square relative">
                  <Image src="/images/94177729_m-1920w.jpg" alt="TSL Logistics Operations" fill className="object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden shadow-md aspect-square relative mt-6">
                  <Image src="/images/107874990_l-1920w.jpg" alt="TSL Logistics Warehouse" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#555] mb-6">
            Certifications &amp; Accreditations
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 stagger-grid">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className="rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center p-4 hover:shadow-md hover:border-[#C8A84B]/30 transition-all duration-200"
              >
                <Image src={cert.src} alt={cert.alt} width={300} height={300} className="w-full h-[150px] object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-4 text-center anim-fade-up">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C8A84B] mb-3">Looking Ahead</p>
          <h2 className="text-3xl md:text-5xl font-semibold text-[#252525] mb-4">Our Vision</h2>
          <div className="gold-divider mb-6" />
          <p className="text-sm text-[#555] mb-6 max-w-xl mx-auto">
            It&rsquo;s often very trendy these days to start a Vision statement with words like &ldquo;To be the best
            logistics company&hellip;&rdquo; etc. And that&rsquo;s why we won&rsquo;t! Mr Lai&rsquo;s vision for
            TSL is simple:
          </p>
          <div className="bg-[#1E1E1E] rounded-2xl p-8 md:p-10 max-w-2xl mx-auto">
            <div className="text-6xl text-[#C8A84B] font-serif leading-none mb-4 opacity-60">&ldquo;</div>
            <p className="text-xl md:text-2xl font-bold text-[#C8A84B] leading-relaxed">
              To continue to remain the go to name for logistics services throughout the region
            </p>
          </div>
          <p className="text-sm text-[#555] mt-6 max-w-xl mx-auto">
            We have earned the trust of our clients over 12 years. Our vision is to maintain and grow it for many
            more years to come.
          </p>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[900px] mx-auto px-4 text-center anim-fade-up">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C8A84B] mb-3">Our Purpose</p>
          <h2 className="text-3xl md:text-5xl font-semibold text-[#252525] mb-4">Our Mission</h2>
          <div className="gold-divider mb-6" />
          <p className="text-sm text-[#555] mb-6 max-w-xl mx-auto">
            As a solution-oriented company, we&rsquo;ve set ourselves the mission to:
          </p>
          <div className="bg-[#1E1E1E] rounded-2xl p-8 md:p-10 max-w-2xl mx-auto">
            <div className="text-6xl text-[#C8A84B] font-serif leading-none mb-4 opacity-60">&ldquo;</div>
            <p className="text-xl md:text-2xl font-bold text-[#C8A84B] leading-relaxed">
              Evolve, innovate and invent ways to deliver better and more diverse air, sea and freight services
              for our clients
            </p>
          </div>
          <p className="text-sm text-[#555] mt-6 mb-8 max-w-xl mx-auto">
            And to fulfil our mission, TSL constantly stays abreast of the latest trends and technologies in modern
            logistics.
          </p>
          <Link
            href="/tsl-logistics"
            className="inline-flex items-center gap-2 bg-[#F05921] hover:bg-[#d44d1a] text-white font-semibold py-3.5 px-10 rounded-full uppercase text-sm tracking-widest transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Star size={14} />
            Get Started Today
          </Link>
        </div>
      </section>

      {/* ── Stats Banner ── */}
      <section
        className="py-20 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/Depositphotos_83831174_l-2015-1920w-1280w.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#C8A84B]/85" />
        <div className="relative z-10 max-w-[900px] mx-auto px-4 text-center">
          <div className="text-white">
            <div className="w-16 h-16 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="white" className="w-full h-full">
                <path d="M50.8,67.5c-0.5-0.4-1.2-0.4-1.6,0c-2.9,2.6-4.5,6.3-4.5,10.1c0,3.8,1.7,7.5,4.5,10.1c0.2,0.2,0.5,0.3,0.8,0.3c0.3,0,0.6-0.1,0.8-0.3c2.9-2.6,4.5-6.3,4.5-10.1C55.4,73.8,53.7,70.1,50.8,67.5z"/>
                <path d="M75.4,61.4L63.5,49.5v-24c0-7.4-6.1-13.5-13.5-13.5c-7.4,0-13.5,6.1-13.5,13.5v24L24.6,61.4c-0.3,0.4-0.5,0.9-0.3,1.3c0.2,0.5,0.6,0.8,1.1,0.8h49.1c0.5,0,0.9-0.3,1.1-0.8C75.9,62.3,75.8,61.8,75.4,61.4z"/>
                <path d="M50,24.2c-2.4,0-4.3,1.9-4.3,4.3c0,2.4,1.9,4.3,4.3,4.3c2.4,0,4.3-1.9,4.3-4.3C54.3,26.1,52.4,24.2,50,24.2z"/>
              </svg>
            </div>
            <h3 className="text-5xl md:text-6xl font-bold mb-2 stat-number">Over 8,000</h3>
            <h4 className="text-xl md:text-2xl font-bold tracking-wide">Finished Bookings</h4>
          </div>
        </div>
      </section>

      {/* ── Service Icons ── */}
      <section className="py-14 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center stagger-grid">
            {[
              { label: "Residential & Commercial Moving", img: "/images/93489203_s-removebg-preview-512w.png" },
              { label: "Warehousing & Storage", img: "/images/TSL Logistics Warehouse-1920w.jpeg" },
              { label: "Transport & Logistics", img: "/images/TSL Logistics Trucker Container-1920w.png" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-4 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#C8A84B]/30 transition-all duration-200">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#C8A84B]/30 shadow-sm">
                  <Image src={item.img} alt={item.label} width={96} height={96} className="object-cover w-full h-full" />
                </div>
                <div className="w-8 h-0.5 bg-[#C8A84B]" />
                <p className="font-semibold text-[#252525]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
