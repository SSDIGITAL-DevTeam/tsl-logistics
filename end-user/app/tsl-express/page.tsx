import type { Metadata } from "next";
import Image from "next/image";
import ServicePageLayout from "@/components/ServicePageLayout";
import {
  FigmaBand,
  FigmaFeatureGrid,
  FigmaIntro,
  FigmaSectionHeader,
  FigmaServiceShell,
  FigmaSplitSection,
  serviceIcons,
} from "@/components/FigmaServiceContent";

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
    <ServicePageLayout title="TSL Express" image="/images/service-express.jpg" enquiryOptions={enquiryOptions} source="tsl-express">
      <FigmaServiceShell>
        <FigmaIntro
          title="TSL Express"
          image="/images/figma-services/express-intro.png"
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
          cta="Contact Us"
        />

        <FigmaSplitSection
          eyebrow="Express Ad Hoc Delivery"
          title="Urgent Delivery When Timing Matters"
          image="/images/figma-services/express-adhoc.png"
          imageAlt="Express ad hoc delivery"
          reverse
          body={[
            "Our express ad hoc delivery service is designed for urgent, one-off shipments that require speed and flexibility. With fast dispatch and adaptable scheduling, we handle last-minute or unexpected deliveries - no long-term contracts required.",
            "From critical documents to time-sensitive cargo, our agile team ensures safe, accurate, and on-time delivery without compromise.",
          ]}
          cta="Contact Us"
        />

        <FigmaBand>
          <div className="space-y-8">
            <FigmaSectionHeader title="Ideal For" subtitle="Fast delivery support for time-sensitive operational needs." />
            <FigmaFeatureGrid
              features={[
                { title: "Urgent or last-minute shipments", icon: serviceIcons.zap },
                { title: "One-off deliveries outside regular schedules", icon: serviceIcons.calendar },
                { title: "Documents, parcels, and time-critical cargo", icon: serviceIcons.package },
                { title: "Businesses needing speed without long-term obligations", icon: serviceIcons.clock },
              ]}
            />
          </div>
        </FigmaBand>

        <FigmaSplitSection
          eyebrow="Dedicated Van / Bikers Service"
          title="Dedicated Van / Bikers Service (Contract Based)"
          image="/images/figma-services/express-dedicated.png"
          imageAlt="Dedicated van and bikers service"
          body={[
            "We provide contract-based dedicated van and biker services designed for businesses that require reliable, high-frequency daily deliveries. With assigned vehicles and professional riders operating exclusively for your operations, we help you maintain consistent service quality, optimized delivery routes, and faster last-mile performance.",
            "This solution gives you greater control, predictable costs, and the confidence that your deliveries are handled by a team fully aligned with your operational standards.",
          ]}
          cta="Contact Us"
        />

        <FigmaBand dark>
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <h2 className="text-2xl font-bold leading-[1.3] md:text-3xl">TSL Express: Fast, Reliable Logistics You Can Trust</h2>
              <p className="mt-4 max-w-3xl text-sm leading-[1.5] text-white/90 md:text-base">
                Ready to experience seamless shipping and delivery with TSL Express? Whether you need urgent courier services, freight forwarding, or comprehensive logistics solutions, our dedicated team ensures your goods arrive safely and on time, every time. Let us handle the logistics - so you can focus on growing your business.
              </p>
              <div className="mt-6">
                <a href="/contact" className="inline-flex h-[52px] min-w-[180px] items-center justify-center bg-white px-6 text-sm font-bold text-[#121212]">
                  Contact Us
                </a>
              </div>
            </div>
            <div className="relative aspect-[360/230] overflow-hidden">
              <Image src="/images/figma-services/express-cta.png" alt="" fill sizes="360px" className="object-cover" />
            </div>
          </div>
        </FigmaBand>
      </FigmaServiceShell>
    </ServicePageLayout>
  );
}
