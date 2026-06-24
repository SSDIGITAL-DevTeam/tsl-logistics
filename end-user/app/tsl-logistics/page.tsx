import type { Metadata } from "next";
import Image from "next/image";
import ServicePageLayout from "@/components/ServicePageLayout";
import {
  FigmaBand,
  FigmaFeatureGrid,
  FigmaImageCards,
  FigmaIntro,
  FigmaSectionHeader,
  FigmaServiceShell,
  FigmaSplitSection,
  serviceIcons,
} from "@/components/FigmaServiceContent";

export const metadata: Metadata = {
  title: "TSL Logistics | Container Trucking, Freight & Project Logistics",
  description:
    "TSL Logistics provides container trucking, flatbed and lowbed transport, DG cargo handling, freight services, permit declaration, and project logistics.",
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
    <ServicePageLayout title="TSL Logistics" image="/images/service-mover.jpg" enquiryOptions={enquiryOptions} source="tsl-logistics">
      <FigmaServiceShell>
        <FigmaIntro
          title="TSL Logistics"
          image="/images/figma-services/logistics-intro.png"
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
          cta="Contact Us"
        />

        <section className="space-y-8">
          <FigmaSectionHeader
            title="Flatbed and Lowbed Trailer Trucking"
            subtitle="Whether it's heavy machinery or oversized goods, our flatbed and lowbed trucks are equipped to handle diverse cargo types. We can help you maximise space and ensure load stability throughout transport."
          />
          <FigmaImageCards
            cards={[
              {
                title: "Flatbed Truck",
                text: "Comes with a single / two deck with heavy loading and unloading capabilities. It is suitable for cargo to support container / construction / oil & gas industries.",
                image: "/images/figma-services/logistics-flatbed.png",
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

        <FigmaSplitSection
          eyebrow="DG Cargo / Trucking"
          title="TSL DG Trucking - Dangerous Goods Handling"
          image="/images/figma-services/logistics-dg.png"
          imageAlt="Dangerous goods trucking"
          reverse
          body={[
            "TSL Logistics provides reliable Dangerous Goods (DG) trucking services in Singapore, specializing in the safe and compliant transport of hazardous materials. With over 20 years of industry experience, a highly trained team, and strict adherence to local and international regulations, we deliver secure, responsible, and tailored DG transport solutions with safety and reliability at the core.",
          ]}
          cta="Contact Us"
        />

        <section className="space-y-8">
          <p className="mx-auto max-w-4xl text-center text-sm leading-[1.5] text-[#121212] md:text-[16px]">
            As a leading provider of industrial transportation in Singapore, we offer a range of specialised services tailored to the transportation of dangerous goods, including the following:
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Chemicals and liquids", icon: serviceIcons.shield },
              { title: "Gases", icon: serviceIcons.truck },
              { title: "Flammable Substances", icon: serviceIcons.zap },
              { title: "Toxic and Infectious Substances", icon: serviceIcons.file },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className={`${index % 2 === 0 ? "bg-[#1a3263] text-white" : "bg-gold-gradient text-[#121212]"} rounded-[10px] p-5`}>
                  <Icon className="mb-4" size={30} />
                  <h3 className="text-lg font-bold leading-[1.3]">{item.title}</h3>
                </article>
              );
            })}
          </div>
        </section>

        <section className="space-y-12">
          <FigmaSectionHeader title="Dedicated Trucking Services (Contract Based)" />
          <FigmaSplitSection
            title="Dedicated Trucking Services"
            image="/images/figma-services/logistics-dedicated.png"
            imageAlt="Dedicated trucking service"
            body={[
              "We deliver dedicated trucking solutions designed for long-term, contract-based operations, giving your business full control over capacity, schedules, and service quality. Our trucks and professional drivers are assigned exclusively to your operations - functioning as an extension of your internal logistics team.",
            ]}
            cta="Contact Us"
          />
          <FigmaSplitSection
            title="Guaranteed Availability"
            image="/images/figma-services/logistics-freight.png"
            imageAlt="TSL dedicated fleet"
            reverse
            body={[
              "With a dedicated fleet, you gain guaranteed availability, predictable performance, and optimized routing that adapts to your supply chain needs. This model eliminates capacity uncertainty, reduces operational friction, and ensures every shipment moves on schedule - every time.",
            ]}
            cta="Contact Us"
          />
          <FigmaSplitSection
            title="Stable and Cost-Efficient Operations"
            image="/images/figma-services/logistics-project.png"
            imageAlt="TSL operation"
            body={[
              "Ideal for businesses that prioritize stability, cost efficiency, and operational consistency, our dedicated trucking services empower you to scale with confidence while maintaining complete visibility and control over your transportation network.",
            ]}
            cta="Contact Us"
          />
        </section>

        <FigmaBand>
          <div className="space-y-8">
            <FigmaSectionHeader
              title="Why Choose Dedicated Trucking?"
            />
            <FigmaFeatureGrid
              features={[
                { title: "Consistent Capacity", text: "Always-ready fleet for your recurring logistics needs.", icon: serviceIcons.truck },
                { title: "Optimised Routes", text: "Custom transport routes aligned to your operation.", icon: serviceIcons.route },
                { title: "Dedicated Drivers", text: "Professional drivers assigned only to your schedule.", icon: serviceIcons.shield },
                { title: "Cost Efficiency", text: "Stable operational costs with better cost control.", icon: serviceIcons.check },
              ]}
            />
          </div>
        </FigmaBand>

        <FigmaSplitSection
          eyebrow="Freight Services"
          title="Total Control Across Air, Sea, and Land."
          image="/images/figma-services/logistics-freight.png"
          imageAlt="Freight services"
          reverse
          body={[
            "Our multi-modal freight services cover air, sea, and land transportation, supported with seamless coordination and reliable transit links. We ensure efficient handling, timely movement, delivery across destinations, and simplified total transit times.",
          ]}
          cta="Contact Us"
        />

        <FigmaBand>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <FigmaSectionHeader
                eyebrow="Permit Declaration"
                title="Permit Declaration"
                subtitle="Managing transportation permits doesn't have to be complicated. Our permit declaration services handle all licensing and regulatory requirements for you, ensuring full compliance across routes and logistics."
                align="left"
              />
              <p className="mt-5 text-sm leading-[1.5] text-[#121212] md:text-[20px]">
                We minimise delays, penalties, and disruptions to your delivery with authorisation, so your shipments move smoothly, legally, and on time.
              </p>
              <div className="mt-6">
                <a href="/contact" className="inline-flex h-[38px] min-w-[150px] items-center justify-center rounded-full bg-gold-gradient px-6 text-[12px] font-bold text-[#121212] shadow-[0_1px_2px_rgba(25,33,61,0.08)]">
                  Contact Us
                </a>
              </div>
            </div>
            <FigmaFeatureGrid
              compact
              features={[
                { title: "Route & Transit Permits", icon: serviceIcons.route },
                { title: "Special Cargo Approvals", icon: serviceIcons.shield },
                { title: "Regulatory Documentation", icon: serviceIcons.file },
                { title: "Authority Coordination", icon: serviceIcons.map },
              ]}
            />
          </div>
        </FigmaBand>

        <FigmaSplitSection
          eyebrow="Project Management"
          title="End-to-End Project Management for Critical Logistics"
          image="/images/figma-services/logistics-project.png"
          imageAlt="Project logistics management"
          body={[
            "We offer comprehensive project management for specialized and time-sensitive logistics operations. From planning and documentation to on-site coordination and transport execution, we manage every detail - ensuring timely completion, and one-stop coverage for large-scale, specialized, or high-risk transport projects.",
          ]}
          cta="Contact Us"
        />

        <FigmaBand dark>
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <h2 className="text-3xl font-extrabold leading-[1.3] md:text-[40px]">TSL Logistics: Complete Moving Solutions You Can Trust</h2>
              <p className="mt-4 max-w-3xl text-sm leading-[1.5] text-white/90 md:text-[20px]">
                TSL Logistics provides end-to-end moving and storage services, covering packing, dismantling, relocation, disposal, and secure storage for homes, offices, warehouses, and commercial spaces. With professional movers and proven processes, we ensure every move is handled securely, safely, and stress-free from start to finish.
              </p>
              <div className="mt-6">
                <a href="/contact" className="inline-flex h-[52px] min-w-[180px] items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-[#121212]">
                  Contact Us
                </a>
              </div>
            </div>
            <div className="relative aspect-[360/230] overflow-hidden">
              <Image src="/images/figma-services/logistics-container.png" alt="" fill sizes="360px" className="object-cover" />
            </div>
          </div>
        </FigmaBand>
      </FigmaServiceShell>
    </ServicePageLayout>
  );
}
