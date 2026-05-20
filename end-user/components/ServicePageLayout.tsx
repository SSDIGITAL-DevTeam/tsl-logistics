import Link from "next/link";
import ContactForm from "./ContactForm";

interface ServicePageLayoutProps {
  title: string;
  children: React.ReactNode;
  enquiryOptions?: string[];
  showContactForm?: boolean;
}

export default function ServicePageLayout({
  title,
  children,
  enquiryOptions,
  showContactForm = true,
}: ServicePageLayoutProps) {
  return (
    <>
      {/* ── Page Title ── */}
      <div className="bg-[#1E1E1E] py-12 border-b border-[#C8A84B]/30">
        <div className="hero-in max-w-[1200px] mx-auto px-4 text-center">
          <p className="eyebrow mb-2">TSL Logistics Service</p>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h1>
          <div className="gold-divider" />
        </div>
      </div>

      {/* ── Page Content ── */}
      <div className="py-14 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 anim-fade-up">
          {children}
        </div>
      </div>

      {/* ── Request Form ── */}
      {showContactForm && (
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-[720px] mx-auto px-4 anim-fade-up">
            <div className="text-center mb-8">
              <p className="eyebrow mb-2">Get a Quote</p>
              <h2 className="text-xl md:text-2xl font-bold text-[#252525]">
                Request for TSL Logistics Service
              </h2>
              <div className="gold-divider" />
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
              <ContactForm enquiryOptions={enquiryOptions} />
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ── */}
      <section className="py-14 bg-[#1E1E1E] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #C8A84B 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative z-10 max-w-[720px] mx-auto px-4 anim-fade-up">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Get Started?</h2>
          <div className="gold-divider mb-5" />
          <p className="mb-7 text-gray-300 text-sm leading-relaxed">
            Contact TSL Logistics today for a personalised solution to your logistics needs.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#C8A84B] hover:bg-[#9A7D2D] text-[#1E1E1E] font-bold py-3.5 px-10 rounded-full uppercase text-sm tracking-widest transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
