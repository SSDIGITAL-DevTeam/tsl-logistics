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
      <section className="bg-white px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-[1220px]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <h1 className="max-w-[760px] text-4xl font-bold leading-[1.12] tracking-[-0.02em] text-[#151515] md:text-6xl lg:text-[64px]">
              Delivering value to our clients - On time, Every time!
            </h1>

            <div className="max-w-[340px] lg:justify-self-end">
              <p className="text-sm leading-relaxed text-[#151515]">
                TSL Logistics Pte Ltd was founded in 2003 by veteran logistics expert Mr. Alan Tay Soon Lai with the objective of establishing a client-focused logistics company in Singapore.
              </p>
              <ContactCta className="mt-6 bg-[#1f4fa8] text-white" />
            </div>
          </div>

          <div className="relative mt-10 aspect-[16/6] min-h-[280px] overflow-hidden rounded-[22px] bg-[#e7ebef] md:mt-12 md:min-h-[360px]">
            <Image
              src="/images/hero-section-v2.png"
              alt="TSL Logistics warehouse and cargo operations"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1220px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="services" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1220px] px-5 md:px-8">
          <div className="mx-auto max-w-[720px] text-center">
            <h2 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-[#151515] md:text-5xl">
              Our Services
            </h2>
            <p className="mx-auto mt-5 max-w-[650px] text-base leading-relaxed text-[#555]">
              Use a single partner for cargo movement, express delivery, moving, storage, and value-added handling.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group block overflow-hidden rounded-[1.25rem] bg-white shadow-[0_18px_50px_rgba(16,24,32,0.10)] outline-none transition focus-visible:ring-2 focus-visible:ring-[#C8A84B] focus-visible:ring-offset-4"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between px-5 py-4">
                  <span className="font-semibold text-[#1a1a1a] text-base">{service.title}</span>
                  <ArrowRight
                    size={18}
                    className="text-[#C8A84B] group-hover:translate-x-1 transition-transform duration-200"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CompaniesThatMoveWithUs />

      <section className="section-soft overflow-hidden py-16 md:py-24">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-10 px-6 lg:flex-row lg:gap-16">
          <div className="flex-1">
            <h2 className="mb-5 text-4xl font-bold leading-tight text-[#1a1a1a] md:text-5xl">
              About Us
            </h2>
            <p className="mb-3 leading-relaxed text-[#555]">
              At TSL Logistics, we are dedicated to moving businesses forward. As a trusted logistics
              partner, we provide end-to-end solutions that simplify complexity, enhance efficiency,
              and deliver reliability across every mile.
            </p>
            <p className="mb-8 leading-relaxed text-[#555]">
              From domestic deliveries to global distribution, our team ensures your cargo reaches its
              destination safely, on time, and with complete transparency.
            </p>
            <Link href="/about" className="btn-pill-gold">
              Learn More
            </Link>
          </div>

          <div className="flex shrink-0 items-center justify-center lg:w-[52%]">
            <div className="v2-surface relative min-h-[300px] w-full overflow-hidden md:min-h-[420px]">
              <Image
                src="/images/group-1000005860.png"
                alt="TSL Logistics truck with container"
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-contain object-right"
              />
            </div>
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

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="min-h-[220px] border border-white/10 bg-white p-6 text-[#151515] shadow-[0_18px_50px_rgba(0,0,0,0.18)] md:p-7"
                >
                  <span className="grid h-12 w-12 place-items-center bg-[#D8B84F] text-[#151515]">
                    <Icon
                      size={24}
                      strokeWidth={1.9}
                    />
                  </span>
                  <h3 className="mt-8 text-lg font-bold leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#555]">
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
              <PermitDialog triggerClassName="!bg-gold-gradient !px-8 !font-bold !text-[#151515] hover:!bg-gold-gradient hover:!brightness-95" />
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
