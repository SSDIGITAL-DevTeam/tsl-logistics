import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Page Not Found",
  // A 404 must never be indexed, but keep follow so the links below still pass
  // authority to the pages they point at.
  robots: { index: false, follow: true },
};

const services = [
  {
    label: "Container Haulage & Trucking",
    href: "/tsl-logistics",
    blurb: "Container trucking, prime mover haulage, flatbed, lowbed and out-of-gauge cargo.",
  },
  {
    label: "Warehousing Services",
    href: "/warehousing-services",
    blurb: "Warehouse space, storage rental, 3PL and value-added handling.",
  },
  {
    label: "House & Office Movers",
    href: "/tsl-mover",
    blurb: "Residential, office, factory and specialty moving across Singapore.",
  },
  {
    label: "Dedicated Courier & Biker",
    href: "/tsl-express",
    blurb: "Contract couriers, dedicated riders and express ad hoc delivery.",
  },
];

export default function NotFound() {
  return (
    <>
      <PageHero title="Page Not Found" />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="text-[#C8A84B] text-xs font-bold uppercase tracking-[0.22em] mb-2">
            Error 404
          </p>
          <h2 className="text-[#1a1a1a] text-3xl md:text-4xl font-bold mb-4">
            We couldn&apos;t find that page
          </h2>
          <p className="max-w-[620px] text-[#555] leading-relaxed">
            The page you were looking for may have been moved or renamed. Everything
            we do is still here — pick a service below, or get in touch and we&apos;ll
            point you in the right direction.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group block border border-gray-200 p-6 transition-all duration-200 hover:border-[#C8A84B]/40 hover:shadow-md"
              >
                <h3 className="font-bold text-[#1a1a1a] text-base mb-2 group-hover:text-[#C8A84B] transition-colors">
                  {service.label}
                </h3>
                <p className="text-sm leading-relaxed text-[#555]">{service.blurb}</p>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center bg-[#C8A84B] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-[#1a1a1a] transition-colors hover:bg-[#9A7D2D]"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center border border-[#C8A84B] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-[#9A7D2D] transition-colors hover:bg-[#C8A84B]/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
