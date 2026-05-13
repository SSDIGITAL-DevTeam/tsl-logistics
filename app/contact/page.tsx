import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | TSL Logistics",
  description:
    "Get in touch with TSL Logistics. Contact us for trucking, warehousing, moving, and express delivery enquiries.",
};

export default function ContactPage() {
  return (
    <>
      {/* ── Page Title ── */}
      <div className="bg-[#1E1E1E] py-12 border-b border-[#C8A84B]/30">
        <div className="hero-in max-w-[1200px] mx-auto px-4 text-center">
          <p className="eyebrow mb-2">Get In Touch</p>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Contact Us</h1>
          <p className="text-gray-300 mt-2 text-sm">You&rsquo;ve got logistic needs, and we have solutions.</p>
          <div className="gold-divider" />
        </div>
      </div>

      {/* ── Form + Contact Info ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10">
            {/* Form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 anim-fade-left">
              <h2 className="text-xl font-bold text-[#252525] mb-1">Send Us a Message</h2>
              <div className="gold-divider-left mb-6" />
              <ContactForm />
            </div>

            {/* Contact cards */}
            <div className="flex flex-col gap-4 anim-fade-right">
              <div className="flex items-start gap-4 bg-gray-50 border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-[#C8A84B]/30 transition-all duration-200">
                <div className="w-11 h-11 bg-[#C8A84B] rounded-full flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#252525] mb-1">Call Us</h4>
                  <a href="tel:+6567772724" className="text-[#C8A84B] font-bold hover:underline text-lg">+65 6777-2724</a>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gray-50 border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-[#C8A84B]/30 transition-all duration-200">
                <div className="w-11 h-11 bg-[#C8A84B] rounded-full flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#252525] mb-2">Email Us</h4>
                  <p className="text-sm mb-1">
                    <span className="font-bold text-[#252525]">Trucking Enquiry: </span>
                    <a href="mailto:sales@tsllogistics.sg" className="text-[#C8A84B] font-semibold hover:underline">sales@tsllogistics.sg</a>
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-bold text-[#252525]">Movers Enquiry: </span>
                    <a href="mailto:ops@tslmovers.sg" className="text-[#C8A84B] font-semibold hover:underline">ops@tslmovers.sg</a>
                  </p>
                  <p className="text-sm">
                    <span className="font-bold text-[#252525]">Express Team: </span>
                    <a href="mailto:ops@tslexpress.sg" className="text-[#C8A84B] font-semibold hover:underline">ops@tslexpress.sg</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-gray-50 border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-[#C8A84B]/30 transition-all duration-200">
                <div className="w-11 h-11 bg-[#C8A84B] rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#252525] mb-1">Our Locations</h4>
                  <p className="text-[#555] text-sm leading-relaxed">
                    Our doors, ears and break room are always open.<br />(Monday–Friday, from 9am-5pm)
                  </p>
                  <p className="text-[#C8A84B] font-semibold text-sm mt-2">3 Kaki Bukit Road 1 #02-01</p>
                  <p className="text-[#C8A84B] font-semibold text-sm">Eunos Technolink</p>
                  <p className="text-[#C8A84B] font-semibold text-sm">Singapore 415935</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="pb-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15954.944552496003!2d103.9013238!3d1.3345077!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x913cceed8c5de5dc!2sTSL%20Logistics%20Pte%20Ltd!5e0!3m2!1sen!2ssg!4v1655364251092!5m2!1sen!2ssg"
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
