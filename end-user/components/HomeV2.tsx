import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  BadgeDollarSign,
  Mail,
  MapPin,
  Phone,
  ScanEye,
  Settings,
  Shield,
  Truck,
  Users,
} from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import PermitDialog from "@/components/PermitDialog";
import CompaniesThatMoveWithUs from "@/components/CompaniesThatMoveWithUs";

const services = [
  {
    title: "TSL Logistics",
    body: "Container trucking, DG cargo, flatbed transport, and project logistics for operationally complex cargo.",
    image: "/images/edited-wfn05994.jpg",
    alt: "TSL Logistics container truck at loading area",
    href: "/tsl-logistics",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "TSL Mover",
    body: "Residential, office, factory, and specialised moving handled by trained crews.",
    image: "/images/wfn05862.jpg",
    alt: "TSL Mover team moving wrapped furniture",
    href: "/tsl-mover",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "TSL Express",
    body: "Fast ad hoc delivery and dedicated rider or van support for urgent movement.",
    image: "/images/service-express.jpg",
    alt: "TSL Express delivery vehicle",
    href: "/tsl-express",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "TSL Warehousing",
    body: "Flexible storage, handling, packing, labelling, and inventory support.",
    image: "/images/wfn06078.jpg",
    alt: "TSL warehouse with palletised cargo",
    href: "/warehousing-services",
    className: "md:col-span-2 md:row-span-1",
  },
];

const whyUs = [
  {
    icon: Shield,
    title: "Reliable Delivery",
    body: "We ensure your shipments arrive safely and on time, every time.",
  },
  {
    icon: Truck,
    title: "End-to-End Solutions",
    body: "From warehousing to transport, everything you need is under one roof.",
  },
  {
    icon: ScanEye,
    title: "Real-Time Tracking",
    body: "Monitor your cargo with complete visibility at every stage.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    body: "Handled by logistics professionals with years of industry expertise.",
  },
  {
    icon: Settings,
    title: "Flexible Services",
    body: "Customisable solutions that adapt to your business needs.",
  },
  {
    icon: BadgeDollarSign,
    title: "Competitive Pricing",
    body: "High-quality logistics services without the high cost.",
  },
];

const proofStats = [
  { value: "2003", label: "Founded in Singapore" },
  { value: "4", label: "Core service divisions" },
  { value: "24/7", label: "Responsive support for urgent jobs" },
];

function ContactCta({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/contact"
      className={`inline-flex h-12 items-center justify-center bg-gold-gradient px-7 text-sm font-bold text-[#121212] transition hover:opacity-90 active:scale-[0.98] ${className}`}
    >
      Contact Now
    </Link>
  );
}

export default function HomeV2() {
  return (
    <>
      <section className="bg-[#f5f6f8]">
        <div className="mx-auto grid min-h-[calc(100dvh-88px)] max-w-[1440px] items-stretch gap-0 px-5 py-8 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-10">
          <div className="flex flex-col justify-between bg-[#152642] px-6 py-8 text-white md:px-10 lg:px-12">
            <div className="max-w-[620px]">
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D8B84F]">
                TSL Logistics Singapore
              </p>
              <h1 className="text-4xl font-bold leading-[1.02] tracking-[-0.02em] md:text-6xl lg:text-[68px]">
                Moving cargo with control, care, and timing.
              </h1>
              <p className="mt-6 max-w-[520px] text-base leading-relaxed text-white/78">
                A client-focused logistics partner for transport, warehousing, distribution, moving, and dangerous goods handling.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <ContactCta />
                <Link
                  href="#services"
                  className="inline-flex h-12 items-center justify-center border border-white/22 px-7 text-sm font-bold text-white transition hover:border-white hover:bg-white/8 active:scale-[0.98]"
                >
                  View Services
                </Link>
              </div>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {proofStats.map((item) => (
                <div key={item.label} className="border-t border-white/18 pt-4">
                  <p className="text-3xl font-bold text-white">{item.value}</p>
                  <p className="mt-2 text-xs leading-relaxed text-white/62">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid min-h-[520px] gap-4 bg-white p-3 shadow-[0_24px_80px_rgba(20,38,66,0.12)] md:grid-cols-[1fr_0.58fr] md:grid-rows-[1fr_0.8fr] md:p-4 lg:min-h-0">
            <div className="relative min-h-[360px] overflow-hidden bg-[#e7ebef] md:row-span-2">
              <Image
                src="/images/edited-wfn05994.jpg"
                alt="TSL Logistics container trucking"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover transition duration-700 hover:scale-[1.02]"
              />
            </div>
            <div className="relative min-h-[220px] overflow-hidden bg-[#e7ebef]">
              <Image
                src="/images/wfn06078.jpg"
                alt="TSL warehouse operations"
                fill
                sizes="(max-width: 768px) 100vw, 28vw"
                className="object-cover transition duration-700 hover:scale-[1.02]"
              />
            </div>
            <div className="relative min-h-[220px] overflow-hidden bg-[#f4f1ea]">
              <Image
                src="/images/kontainer-full.png"
                alt="Container used for logistics storage and transport"
                fill
                sizes="(max-width: 768px) 100vw, 28vw"
                className="object-contain p-5"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1220px] px-5 md:px-8">
          <div className="max-w-[720px]">
            <h2 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-[#151515] md:text-5xl">
              Four connected logistics divisions, one accountable team.
            </h2>
            <p className="mt-5 max-w-[650px] text-base leading-relaxed text-[#555]">
              Use a single partner for cargo movement, express delivery, moving, storage, and value-added handling.
            </p>
          </div>

          <div className="mt-10 grid auto-rows-[300px] grid-cols-1 gap-5 md:auto-rows-[280px] md:grid-cols-4">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className={`group relative overflow-hidden bg-[#111827] shadow-[0_18px_50px_rgba(16,24,32,0.12)] outline-none transition focus-visible:ring-2 focus-visible:ring-[#C8A84B] focus-visible:ring-offset-4 ${service.className}`}
              >
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,17,31,0.10)_0%,rgba(6,17,31,0.42)_45%,rgba(6,17,31,0.90)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-white md:p-5">
                  <div className="flex items-end justify-between gap-4 border border-white/14 bg-[#07111f]/92 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-[3px] md:p-5">
                    <div className="min-w-0">
                      <h3 className="text-xl font-bold leading-tight">
                        {service.title}
                      </h3>
                      <p className="mt-3 max-w-[460px] text-sm leading-relaxed text-white/88">
                        {service.body}
                      </p>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center bg-white text-[#121212] transition group-hover:translate-x-1">
                      <ArrowRight size={18} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CompaniesThatMoveWithUs />

      <section className="bg-[#f5f6f8] py-16 md:py-24">
        <div className="mx-auto grid max-w-[1220px] gap-8 px-5 md:px-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-[#151515] md:text-5xl">
                Built around the jobs that cannot be late.
              </h2>
              <p className="mt-5 max-w-[520px] text-base leading-relaxed text-[#555]">
                We simplify planning, permits, route coordination, storage, and final delivery so teams can stay focused on operations.
              </p>
            </div>
            <div className="mt-10 border-l-4 border-[#C8A84B] pl-5">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#1a1a1a]">
                Operational coverage
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#555]">
                From local shipments to specialised cargo, our teams coordinate the handoff across road, warehouse, and site.
              </p>
            </div>
          </div>

          <div className="grid gap-4 bg-white p-3 shadow-[0_20px_70px_rgba(20,38,66,0.10)] sm:grid-cols-[0.85fr_1.15fr]">
            <div className="relative min-h-[360px] overflow-hidden bg-[#e7ebef]">
              <Image
                src="/images/wfn05862.jpg"
                alt="TSL moving team handling wrapped furniture"
                fill
                sizes="(max-width: 768px) 100vw, 38vw"
                className="object-cover"
              />
            </div>
            <div className="grid gap-4">
              <div className="relative min-h-[210px] overflow-hidden bg-[#e7ebef]">
                <Image
                  src="/images/wfn06078.jpg"
                  alt="Palletised cargo in TSL warehouse"
                  fill
                  sizes="(max-width: 768px) 100vw, 46vw"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-[#152642] p-6 text-white">
                  <p className="text-4xl font-bold">20+</p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    Years of logistics experience behind every shipment.
                  </p>
                </div>
                <div className="bg-gold-gradient p-6 text-[#121212]">
                  <p className="text-4xl font-bold">1</p>
                  <p className="mt-3 text-sm font-semibold leading-relaxed">
                    Point of accountability across transport, storage, and delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-[1220px] items-center gap-10 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[420px] overflow-hidden">
            <Image
              src="/images/about-team.jpg"
              alt="TSL Logistics team"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
          </div>
          <div className="lg:pl-8">
            <h2 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-[#151515] md:text-5xl">
              A logistics partner built on practical execution.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#555]">
              At TSL Logistics, we are dedicated to moving businesses forward. As a trusted logistics partner, we provide end-to-end solutions that simplify complexity, enhance efficiency, and deliver reliability across every mile.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#555]">
              From domestic deliveries to global distribution, our team ensures your cargo reaches its destination safely, on time, and with complete transparency.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex h-12 items-center justify-center border border-[#151515] px-7 text-sm font-bold text-[#151515] transition hover:bg-[#151515] hover:text-white active:scale-[0.98]"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#152642] py-16 text-white md:py-24">
        <div className="mx-auto max-w-[1220px] px-5 md:px-8">
          <div className="max-w-[680px]">
            <h2 className="text-3xl font-bold leading-tight tracking-[-0.02em] md:text-5xl">
              Why teams keep TSL close to the operation.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-6">
            {whyUs.map((item, index) => {
              const Icon = item.icon;
              const featured = index === 0 || index === 1;
              return (
                <article
                  key={item.title}
                  className={`${
                    featured
                      ? "bg-white text-[#151515] md:col-span-3"
                      : "border border-white/14 text-white md:col-span-2"
                  } min-h-[210px] p-6`}
                >
                  <Icon
                    size={30}
                    strokeWidth={1.8}
                    className={featured ? "text-[#C8A84B]" : "text-[#D8B84F]"}
                  />
                  <h3 className="mt-7 text-lg font-bold leading-tight">
                    {item.title}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      featured ? "text-[#555]" : "text-white/68"
                    }`}
                  >
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f6f8] py-16 md:py-24">
        <div className="mx-auto grid max-w-[1220px] items-center gap-10 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-[#151515] md:text-5xl">
              Permit and document processing without the drag.
            </h2>
            <p className="mt-5 max-w-[560px] text-base leading-relaxed text-[#555]">
              We simplify permit and documentation so you can focus on your business. Our team handles preparation, submission, and follow-up with government agencies.
            </p>
            <div className="mt-8">
              <PermitDialog />
            </div>
          </div>

          <div className="relative min-h-[430px] overflow-hidden">
            <Image
              src="/images/permit-processing-homepage.jpg"
              alt="TSL Logistics permit processing support"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1220px] px-5 md:px-8">
          <div className="mb-10 max-w-[640px]">
            <h2 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-[#151515] md:text-5xl">
              Client feedback from real moves and shipments.
            </h2>
          </div>
          <TestimonialsSlider variant="light" />
        </div>
      </section>

      <section className="bg-[#f5f6f8] py-16 md:py-24">
        <div className="mx-auto max-w-[900px] px-5 md:px-8">
          <div className="mb-10 max-w-[620px]">
            <h2 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-[#151515] md:text-5xl">
              FAQs
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#555]">
              Quick answers for teams planning transport, warehousing, customs, and delivery support.
            </p>
          </div>
          <FAQAccordion />
        </div>
      </section>

      <section className="bg-white pt-16 pb-56 md:pt-24">
        <div className="mx-auto max-w-[1220px] px-5 md:px-8">
          <div className="mb-10 max-w-[620px]">
            <h2 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-[#151515] md:text-5xl">
              Find Us
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#555]">
              Reach our Singapore office for transport, mover, express, and warehouse enquiries.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="overflow-hidden border border-gray-100 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15954.944552496003!2d103.9013238!3d1.3345077!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x913cceed8c5de5dc!2sTSL%20Logistics%20Pte%20Ltd!5e0!3m2!1sen!2ssg!4v1655692768220!5m2!1sen!2ssg"
                width="100%"
                height="500"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TSL Logistics Location"
              />
            </div>
            <div className="grid gap-4">
              <div className="bg-[#152642] p-6 text-white">
                <Phone size={20} className="text-[#D8B84F]" />
                <h4 className="mt-5 font-bold">Call Us</h4>
                <a href="tel:+6567772724" className="mt-2 block text-lg font-bold text-[#D8B84F] hover:underline">
                  +65 6777 2724
                </a>
              </div>
              <div className="border border-gray-100 bg-white p-6 shadow-sm">
                <Mail size={20} className="text-[#C8A84B]" />
                <h4 className="mt-5 font-bold text-[#151515]">Email Us</h4>
                <div className="mt-3 space-y-2 text-sm">
                  <p>
                    <span className="font-semibold text-[#151515]">Trucking: </span>
                    <a href="mailto:sales@tsllogistics.sg" className="font-semibold text-[#9A7D2D] hover:underline">sales@tsllogistics.sg</a>
                  </p>
                  <p>
                    <span className="font-semibold text-[#151515]">Movers: </span>
                    <a href="mailto:ops@tslmovers.sg" className="font-semibold text-[#9A7D2D] hover:underline">ops@tslmovers.sg</a>
                  </p>
                  <p>
                    <span className="font-semibold text-[#151515]">Express: </span>
                    <a href="mailto:ops@tslexpress.sg" className="font-semibold text-[#9A7D2D] hover:underline">ops@tslexpress.sg</a>
                  </p>
                </div>
              </div>
              <div className="border border-gray-100 bg-white p-6 shadow-sm">
                <MapPin size={20} className="text-[#C8A84B]" />
                <h4 className="mt-5 font-bold text-[#151515]">Our Location</h4>
                <p className="mt-2 text-sm leading-relaxed text-[#555]">Monday to Friday, 9am to 5pm</p>
                <p className="mt-3 text-sm font-semibold text-[#9A7D2D]">Blk 3 Kaki Bukit Road 1 #02-01</p>
                <p className="text-sm font-semibold text-[#9A7D2D]">Eunos Technolink, Singapore 415935</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
