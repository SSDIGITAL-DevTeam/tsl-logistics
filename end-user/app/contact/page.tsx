import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with TSL Logistics. Contact us for trucking, warehousing, moving, and express delivery enquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" image="/images/permit-section.jpg" />

      {/* ── Form + Contact Info ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10">
            {/* Form */}
            <div className="bg-white border border-gray-100 shadow-sm p-6 md:p-8 anim-fade-left">
              <h2 className="text-xl font-bold text-[#252525] mb-1">Send Us a Message</h2>
              <div className="gold-divider-left mb-6" />
              <ContactForm source="contact" />
            </div>

            {/* Contact cards */}
            <div className="flex flex-col gap-4 anim-fade-right">
              <div className="flex items-start gap-4 bg-gray-50 border border-gray-100 p-5 hover:shadow-md hover:border-[#C8A84B]/30 transition-all duration-200">
                <div className="w-11 h-11 bg-[#C8A84B] flex items-center justify-center shrink-0 rounded-full">
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#252525] mb-1">Call Us</h4>
                  <a href="tel:+6567772724" className="text-[#C8A84B] font-bold hover:underline text-lg">+65 6777-2724</a>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gray-50 border border-gray-100 p-5 hover:shadow-md hover:border-[#C8A84B]/30 transition-all duration-200">
                <div className="w-11 h-11 bg-[#C8A84B] flex items-center justify-center shrink-0 rounded-full">
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#252525] mb-2">Email Us</h4>
                  <p className="text-sm mb-1">
                    <span className="font-bold text-[#252525]">Logistics: </span>
                    <a href="mailto:sales@tsllogistics.sg" className="text-[#C8A84B] font-semibold hover:underline">sales@tsllogistics.sg</a>
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-bold text-[#252525]">Movers & Warehousing: </span>
                    <a href="mailto:ops@tslmovers.sg" className="text-[#C8A84B] font-semibold hover:underline">ops@tslmovers.sg</a>
                  </p>
                  <p className="text-sm">
                    <span className="font-bold text-[#252525]">Express: </span>
                    <a href="mailto:ops@tslexpress.sg" className="text-[#C8A84B] font-semibold hover:underline">ops@tslexpress.sg</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gray-50 border border-gray-100 p-5 hover:shadow-md hover:border-[#C8A84B]/30 transition-all duration-200">
                <div className="w-11 h-11 bg-[#C8A84B] flex items-center justify-center shrink-0 rounded-full">
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#252525] mb-1">Our Locations</h4>
                  <p className="text-[#555] text-sm leading-relaxed">
                    Our doors, ears and break room are always open.<br />(Monday–Friday, from 9am-5pm)
                  </p>
                  <p className="text-[#C8A84B] font-semibold text-sm mt-2">8 Boon Lay Way, #09-13</p>
                  <p className="text-[#C8A84B] font-semibold text-sm">8@Tradehub 21</p>
                  <p className="text-[#C8A84B] font-semibold text-sm">Singapore 609964</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="pb-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="overflow-hidden shadow-md border border-gray-100">
            <iframe
              src="https://www.google.com/maps?q=8%40Tradehub%2021%2C%208%20Boon%20Lay%20Way%2C%20Singapore%20609964&output=embed"
              width="100%"
              height="420"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TSL Logistics Location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
