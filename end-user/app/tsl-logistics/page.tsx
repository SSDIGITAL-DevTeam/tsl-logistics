import type { Metadata } from "next";
import Image from "next/image";
import ServicePageLayout from "@/components/ServicePageLayout";
import JsonLd from "@/components/JsonLd";
import { segmentSeo, serviceLd } from "@/lib/segmentSeo";
import {
  FigmaImageCards,
  FigmaIntro,
  FigmaSectionHeader,
  FigmaServiceShell,
  FigmaSplitSection,
  serviceIcons,
} from "@/components/FigmaServiceContent";

export const metadata: Metadata = {
  title: "Container Haulage & Trucking Singapore",
  description:
    "Licensed container haulier in Singapore. 20ft & 40ft container trucking, prime mover haulage, flatbed and lowbed transport, out-of-gauge cargo and DG trucking.",
  keywords: segmentSeo.logistics.keywords,
  alternates: { canonical: "/tsl-logistics" },
};

const enquiryOptions = [
  "Container trucking",
  "Flatbed / lowbed trailer services",
  "Dangerous goods trucking",
  "Dedicated trucking services",
  "Freight services",
  "Permit declaration",
  "Project management",
  "Others",
];

export default function TSLLogisticsPage() {
  return (
    <ServicePageLayout
      title="Logistics"
      subtitle="Container Haulage & Trucking Singapore"
      image="/images/edite-wfn05998.jpg"
      enquiryOptions={enquiryOptions}
      ctaVariant="quote"
      source="tsl-logistics"
    >
      <JsonLd data={serviceLd(segmentSeo.logistics)} />
      <FigmaServiceShell>
        <FigmaIntro
          title="TSL Logistics"
          image="/images/edite-wfn05998.jpg"
          imageAlt="TSL Logistics truck"
          body={[
            "TSL Logistics is a full-service moving and storage company providing end-to-end solutions - from packing and dismantling to moving, disposal, and secure storage.",
            "We handle relocations for homes, offices, warehouses, and commercial spaces with care and professionalism, ensuring a smooth, reliable, and worry-free moving experience from start to finish.",
          ]}
        />

        <FigmaSplitSection
          eyebrow="Container Trucking"
          title="Container Transportation"
          image="/images/figma-services/logistics-container.png"
          imageAlt="Container transportation"
          body={[
            "We specialise in transporting containers of various sizes, ensuring your cargo reaches its destination safely and on time. We are constantly ranked amongst the best for container transport in Singapore.",
          ]}
        />

        <section className="space-y-8">
          <FigmaSectionHeader
            title="Flatbed and Lowbed Trailer Trucking"
            subtitle="Whether it's heavy machinery or oversized goods, our flatbed and lowbed trucks are equipped to handle diverse cargo types. We can help you maximise space and ensure load stability throughout transport."
          />
          <FigmaImageCards
            imageFit="contain"
            cards={[
              {
                title: "Flatbed Truck",
                text: "Comes with a single / two deck with heavy loading and unloading capabilities. It is suitable for cargo to support container / construction / oil & gas industries.",
                image: "/images/flatbed-truck.png",
                alt: "Flatbed truck",
              },
              {
                title: "Lowbed Trailer",
                text: "Comes with two deck height and detachable gooseneck, making it more suitable for oversized cargo and heavy machinery movement.",
                image: "/images/figma-services/logistics-lowbed.png",
                alt: "Lowbed trailer",
              },
            ]}
          />
        </section>

        <section>
          <FigmaSectionHeader title="DG Cargo / Trucking" />
          <div className="mt-8 grid items-center gap-8 md:grid-cols-[320px_minmax(0,1fr)] md:gap-12">
            <div className="relative aspect-[320/300] overflow-hidden">
              <Image
                src="/images/tsl-sg-trucking.jpg"
                alt="Dangerous goods trucking"
                fill
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="max-w-[650px]">
              <h3 className="text-xl font-bold leading-tight text-[#1a1a1a] md:text-2xl">
                TSL DG Trucking - Dangerous Goods Handling
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-[#333] md:text-base">
                TSL Logistics provides reliable Dangerous Goods (DG) trucking
                services in Singapore, specialising in the safe and compliant
                transport of hazardous materials. With over 20 years of industry
                experience, a highly trained team, and strict adherence to local
                and international regulations, we deliver secure, responsible,
                and tailored DG transport solutions with safety and reliability
                at the core.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Chemicals and liquids",
                text: "We have the expertise to transport a variety of chemicals and liquids, ensuring proper packaging, labelling, and documentation to meet regulatory compliance.",
                icon: serviceIcons.route,
              },
              {
                title: "Gases",
                text: "Our team is skilled in handling compressed and liquefied gases, taking into account all applicable safety requirements for both LPG and LNG cargo handling.",
                icon: serviceIcons.truck,
              },
              {
                title: "Flammable Substances",
                text: "We understand the intricacies of transporting flammable materials and take all necessary precautions to prevent accidents.",
                icon: serviceIcons.zap,
              },
              {
                title: "Toxic and infectious substances",
                text: "When transporting toxic or infectious substances, we follow stringent guidelines to protect our team, the public, and the environment.",
                icon: serviceIcons.file,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className={`${index === 0 || index === 3 ? "bg-[#1a3263] text-white" : "bg-gold-gradient text-[#121212]"} p-5`}
                >
                  <Icon className="mb-4" size={22} />
                  <h3 className="text-sm font-bold leading-[1.3]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed opacity-90">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-center text-xl font-bold leading-tight text-[#1a1a1a] md:text-2xl">
            Dedicated Trucking Services (Contract Based)
          </h2>
          <div className="grid items-center gap-y-5 md:grid-cols-[minmax(300px,440px)_minmax(0,1fr)] md:gap-x-10 lg:gap-x-14">
            <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-auto md:h-full md:min-h-[380px]">
              <Image
                src="/images/edited-wfn05994.jpg"
                alt="TSL operation"
                fill
                sizes="(min-width: 1024px) 440px, (min-width: 768px) 38vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="max-w-[620px] space-y-5">
              <p className="text-sm leading-relaxed text-[#1a1a1a] md:text-base">
                We deliver <strong>dedicated trucking solutions designed for long-term, contract-based operations</strong>, giving your business full control over capacity, schedules, and service quality. Our trucks and professional drivers are assigned exclusively to your operations - functioning as an extension of your internal logistics team.
              </p>
              <p className="text-sm leading-relaxed text-[#1a1a1a] md:text-base">
                With a dedicated fleet, you gain <strong>guaranteed availability</strong>, predictable performance, and optimized routing that adapts to your supply chain needs. This model eliminates capacity uncertainty, reduces operational friction, and ensures every shipment moves on schedule - every time.
              </p>
              <p className="text-sm leading-relaxed text-[#1a1a1a] md:text-base">
                Ideal for businesses that prioritize <strong>stability, cost efficiency, and operational consistency</strong>, our dedicated trucking services empower you to scale with confidence while maintaining complete visibility and control over your transportation network.
              </p>
            </div>
          </div>
        </section>

        <FigmaSplitSection
          eyebrow="Freight Services"
          title="Total Control Across Air, Sea, and Land."
          image="/images/freight-services.png"
          imageAlt="Freight services"
          body={[
            "Our multi-modal freight services cover air, sea, and land transportation, supported with seamless coordination and reliable transit links. We ensure efficient handling, timely movement, delivery across destinations, and simplified total transit times.",
          ]}
        />

        <section className="space-y-12">
          <h2 className="text-center text-[26px] font-bold leading-tight text-[#1a1a1a] md:text-[32px]">
            Permit Declaration
          </h2>

          <div className="grid items-center gap-8 md:grid-cols-[minmax(360px,520px)_minmax(0,1fr)] md:gap-12 lg:gap-16">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src="/images/permit.png"
                alt="Permit declaration documentation"
                fill
                sizes="(min-width: 1024px) 520px, (min-width: 768px) 44vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="max-w-[600px]">
              <p className="text-sm leading-relaxed text-[#1a1a1a] md:text-base">
                Managing transportation permits doesn&rsquo;t have to be
                complicated. Our permit declaration service handles all
                licenses and regulatory requirements for you, ensuring full
                compliance across routes and regions.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-[#1a1a1a] md:text-base">
                We minimize delays, penalties, and disruptions by working
                directly with authorities - so your shipments move smoothly,
                legally, and on time.
              </p>
            </div>
          </div>
        </section>

        <FigmaSplitSection
          eyebrow="Project Management"
          title="End-to-End Project Management for Critical Logistics"
          image="/images/project-management.jpeg"
          imageAlt="Project logistics management"
          body={[
            "We offer comprehensive project management for specialized and time-sensitive logistics operations. From planning and documentation to on-site coordination and transport execution, we manage every detail - ensuring timely completion, and one-stop coverage for large-scale, specialized, or high-risk transport projects.",
          ]}
        />

        <FigmaSplitSection
          eyebrow="Specialised Cargo"
          title="OOG (Out of Gauge)"
          image="/images/oog.jpeg"
          imageAlt="TSL OOG cargo transport"
          reverse
          body={[
            "Some cargo doesn't fit standard dimensions. Our OOG (Out of Gauge) service handles oversized, overweight, and irregularly shaped loads - from industrial machinery to tanks and structural components - with specialised trailers and careful route planning for safe, compliant delivery.",
          ]}
        />
      </FigmaServiceShell>
    </ServicePageLayout>
  );
}
