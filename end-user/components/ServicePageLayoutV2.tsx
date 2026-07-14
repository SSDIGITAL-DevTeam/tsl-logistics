import Image from "next/image";
import type { ReactNode } from "react";
import ContactForm from "@/components/ContactForm";

interface ServicePageLayoutV2Props {
  title: string;
  image: string;
  children: ReactNode;
  enquiryOptions?: string[];
  showContactForm?: boolean;
  source?: string;
  /** Set to false to drop the trailing "Service" word in the request form heading. */
  requestFormServiceSuffix?: boolean;
}

export default function ServicePageLayoutV2({
  title,
  image,
  children,
  enquiryOptions,
  showContactForm = true,
  source = "service",
  requestFormServiceSuffix = true,
}: ServicePageLayoutV2Props) {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-white px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-[1220px]">
          <h1 className="max-w-[760px] text-4xl font-bold leading-[1.12] tracking-[-0.02em] text-[#151515] md:text-6xl lg:text-[56px]">
            {title}
          </h1>

          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[22px] bg-[#e7ebef] md:mt-12">
            <Image
              src={image}
              alt={title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1220px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Page Content ── */}
      <div className="bg-white px-5 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-[1220px] space-y-14 md:space-y-20">{children}</div>
      </div>

      {/* ── Request Form ── */}
      {showContactForm && (
        <section className="bg-[#f5f6f8] py-16 md:py-24">
          <div className="mx-auto max-w-[720px] px-5 md:px-8">
            <div className="mb-8 text-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#9A7D2D]">Get a Quote</p>
              <h2 className="text-2xl font-bold text-[#151515] md:text-3xl">
                Request for TSL {title}{requestFormServiceSuffix ? " Service" : ""}
              </h2>
            </div>
            <div className="v2-surface v2-contact-form bg-white p-6 shadow-[0_18px_50px_rgba(16,24,32,0.08)] md:p-8">
              <ContactForm enquiryOptions={enquiryOptions} source={source} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
