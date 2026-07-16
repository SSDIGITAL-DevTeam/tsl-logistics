import type { Metadata } from "next";
import Image from "next/image";
import ServicePageLayout from "@/components/ServicePageLayout";
import {
  FigmaIntro,
  FigmaServiceShell,
  FigmaSplitSection,
  serviceIcons,
} from "@/components/FigmaServiceContent";
import TSLExpressV2 from "@/components/TSLExpressV2";

export const metadata: Metadata = {
  title: "TSL Express | Optical Supply & Ad Hoc Delivery | TSL Logistics",
  description:
    "TSL Express provides optical supply delivery, express ad hoc delivery, and contract-based dedicated van or biker service.",
};

const enquiryOptions = [
  "Optical supply delivery",
  "Express ad hoc delivery",
  "Dedicated van service",
  "Dedicated biker service",
  "Others",
];

export default function TSLExpressPage() {
  return (
    <>
    <div className="theme-v1-only">
    <ServicePageLayout title="Express" image="/images/service-express.jpg" enquiryOptions={enquiryOptions} source="tsl-express">
      <FigmaServiceShell>
        <FigmaIntro
          title="TSL Express"
          image="/images/figma-services/express-intro-new.jpg"
          imageAlt="TSL Express delivery"
          body={[
            "We provide dedicated delivery services for optical supplies, ensuring secure and accurate transport from laboratories to optical shops and clinics.",
            "With trained, dedicated riders and consistent delivery schedules, we help your operations run smoothly without delays or errors. Backed by our industry familiarity and dependable service standards, TSL Express is a logistics partner you can rely on every day.",
          ]}
        />

        <FigmaSplitSection
          eyebrow="Optical Supply Delivery"
          title="Optical Supplies Delivery You Can Trust"
          image="/images/figma-services/express-optical.png"
          imageAlt="Optical supply delivery"
          body={[
            "Optical supplies demand precision, care, and expert handling. At TSL Logistics, our specially trained carriers ensure glass lenses, frames, and contact lenses are transported safely and securely. With proven expertise and meticulous handling, we protect your optical goods from damage - delivering them intact, reliable, and worry-free every time.",
          ]}
        />

        <section className="mx-auto max-w-[1100px] space-y-12 py-2">
          <h2 className="text-center text-3xl font-bold leading-tight text-[#1a1a1a] md:text-[40px]">
            Express Ad Hoc Delivery
          </h2>

          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] md:gap-14">
            <div className="relative aspect-[536/324] overflow-hidden rounded-xl bg-[#e1e1e1]">
              <Image
                src="/images/figma-services/express-adhoc-new.jpg"
                alt="Express ad hoc delivery"
                fill
                sizes="(min-width: 1024px) 536px, (min-width: 768px) 52vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="max-w-[520px]">
              <div className="space-y-6 text-sm leading-relaxed text-[#1a1a1a] md:text-base">
                <p>
                  Our express ad hoc delivery service is designed for urgent,
                  one-off shipments that require speed and flexibility. With
                  fast dispatch and adaptable scheduling, we handle last-minute
                  or unexpected deliveries - no long-term contracts required.
                </p>
                <p>
                  From critical documents to time-sensitive cargo, our agile
                  team ensures safe, accurate, and on-time delivery without
                  compromise.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-10 py-2">
          <h2 className="text-center text-2xl font-bold leading-tight text-[#1a1a1a] md:text-[28px]">
            Ideal For
          </h2>
          <div className="mx-auto grid max-w-[1060px] gap-x-8 gap-y-10 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Urgent or last-minute shipments", icon: serviceIcons.clock },
              { title: "One-off deliveries outside regular schedules", icon: serviceIcons.route },
              { title: "Documents, parcels, and time-critical cargo", icon: serviceIcons.file },
              { title: "Businesses needing ad hoc transportation services", icon: serviceIcons.zap },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="mx-auto flex max-w-[210px] flex-col items-center">
                  <div className="grid h-[76px] w-[76px] place-items-center rounded-full bg-gold-gradient text-[#121212] shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
                    <Icon size={30} strokeWidth={2.2} />
                  </div>
                  <h3 className="mt-7 text-base font-bold leading-[1.22] text-[#121212]">
                    {item.title}
                  </h3>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] space-y-14 py-2">
          <h2 className="text-center text-3xl font-bold leading-[1.15] text-[#1a1a1a] md:text-[40px]">
            Dedicated Van / Bikers Service
            <br />
            (Contract Based)
          </h2>

          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:gap-14">
            <div className="max-w-[500px]">
              <div className="space-y-6 text-sm leading-relaxed text-[#1a1a1a] md:text-base">
                <p>
                  We provide contract-based dedicated van and biker services
                  designed for businesses that require reliable, high-frequency
                  daily deliveries. With assigned vehicles and professional
                  riders operating exclusively for your operations, we help you
                  maintain consistent service quality, optimized delivery
                  routes, and faster last-mile performance.
                </p>
                <p>
                  This solution gives you greater control, predictable costs,
                  and the confidence that your deliveries are handled by a team
                  fully aligned with your operational standards.
                </p>
              </div>
            </div>

            <div className="relative aspect-[536/324] overflow-hidden rounded-xl bg-[#e1e1e1]">
              <Image
                src="/images/figma-services/express-dedicated-new.jpg"
                alt="Dedicated van and bikers service"
                fill
                sizes="(min-width: 1024px) 536px, (min-width: 768px) 52vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="relative left-1/2 w-screen -translate-x-1/2 bg-[#1a3263] px-5 py-10 text-white md:px-10 md:py-14">
          <div className="mx-auto grid max-w-[1200px] items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <h2 className="text-2xl font-bold leading-[1.3] md:text-3xl">TSL Express: Fast, Reliable Logistics You Can Trust</h2>
              <p className="mt-4 max-w-3xl text-sm leading-[1.5] text-white/90 md:text-base">
                Ready to experience seamless shipping and delivery with TSL Express? Whether you need urgent courier services, freight forwarding, or comprehensive logistics solutions, our dedicated team ensures your goods arrive safely and on time, every time. Let us handle the logistics - so you can focus on growing your business.
              </p>
            </div>
            <div className="relative -mb-10 -mr-5 -mt-10 min-h-[260px] overflow-hidden md:-mb-14 md:-mr-10 md:-mt-14 lg:min-h-full">
              <Image
                src="/images/box2.png"
                alt="TSL Express delivery boxes"
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover object-left"
              />
            </div>
          </div>
        </section>
      </FigmaServiceShell>
    </ServicePageLayout>
    </div>

    <div className="theme-v2-only">
      <TSLExpressV2 />
    </div>
    </>
  );
}
