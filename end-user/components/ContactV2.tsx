import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function ContactV2() {
  return (
    <>
      {/* ── Hero + map ── */}
      <section className="bg-white px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-[1220px]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <h1 className="max-w-[760px] text-4xl font-bold leading-[1.12] tracking-[-0.02em] text-[#151515] md:text-6xl lg:text-[56px]">
              Contact Us
            </h1>
          </div>

          <div className="relative mt-10 h-[280px] overflow-hidden rounded-[22px] sm:h-[360px] md:mt-12 md:h-[440px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15954.944552496003!2d103.9013238!3d1.3345077!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x913cceed8c5de5dc!2sTSL%20Logistics%20Pte%20Ltd!5e0!3m2!1sen!2ssg!4v1655364251092!5m2!1sen!2ssg"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TSL Logistics Location"
            />
          </div>
        </div>
      </section>

      {/* ── Form + contact info ── */}
      <section className="bg-[#f5f6f8] py-16 md:py-24">
        <div className="mx-auto max-w-[1220px] px-5 md:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="v2-surface v2-contact-form bg-white p-6 shadow-[0_18px_50px_rgba(16,24,32,0.08)] md:p-8">
              <h2 className="text-xl font-bold text-[#151515]">Send Us a Message</h2>
              <div className="mt-6">
                <ContactForm source="contact" />
              </div>
            </div>

            <div className="grid gap-4">
              <div className="v2-surface bg-[#152642] p-6 text-white">
                <Phone size={20} className="text-[#D8B84F]" />
                <h4 className="mt-5 font-bold">Call Us</h4>
                <a
                  href="tel:+6567772724"
                  className="mt-2 block text-lg font-bold text-[#D8B84F] hover:underline"
                >
                  +65 6777-2724
                </a>
              </div>

              <div className="v2-surface bg-white p-6 shadow-sm">
                <Mail size={20} className="text-[#C8A84B]" />
                <h4 className="mt-5 font-bold text-[#151515]">Email Us</h4>
                <div className="mt-3 space-y-2 text-sm">
                  <p>
                    <span className="font-semibold text-[#151515]">Logistics Enquiry: </span>
                    <a href="mailto:sales@tsllogistics.sg" className="font-semibold text-[#9A7D2D] hover:underline">
                      sales@tsllogistics.sg
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold text-[#151515]">Movers & Warehousing Enquiry: </span>
                    <a href="mailto:ops@tslmovers.sg" className="font-semibold text-[#9A7D2D] hover:underline">
                      ops@tslmovers.sg
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold text-[#151515]">Express Enquiry: </span>
                    <a href="mailto:ops@tslexpress.sg" className="font-semibold text-[#9A7D2D] hover:underline">
                      ops@tslexpress.sg
                    </a>
                  </p>
                </div>
              </div>

              <div className="v2-surface bg-white p-6 shadow-sm">
                <MapPin size={20} className="text-[#C8A84B]" />
                <h4 className="mt-5 font-bold text-[#151515]">Our Locations</h4>
                <p className="mt-2 text-sm leading-relaxed text-[#555]">
                  Our doors, ears and break room are always open.
                  <br />
                  (Monday–Friday, from 9am-5pm)
                </p>
                <p className="mt-3 text-sm font-semibold text-[#9A7D2D]">
                  3 Kaki Bukit Road 1 #02-01
                </p>
                <p className="text-sm font-semibold text-[#9A7D2D]">Eunos Technolink</p>
                <p className="text-sm font-semibold text-[#9A7D2D]">Singapore 415935</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
