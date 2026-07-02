import Image from "next/image";
import ServicePageLayoutV2 from "@/components/ServicePageLayoutV2";
import {
  ServiceClosingBandV2,
  ServiceContactButtonV2,
  ServiceFeatureGridV2,
  ServiceImageCardsV2,
  ServiceIntroV2,
  ServiceSectionHeaderV2,
  ServiceSplitV2,
  serviceIcons,
} from "@/components/ServiceBlocksV2";

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

const dedicatedTrucking = [
  {
    image: "/images/wfn05884-1.jpg",
    alt: "Dedicated trucking service",
    body: "We deliver dedicated trucking solutions designed for long-term, contract-based operations, giving your business full control over capacity, schedules, and service quality. Our trucks and professional drivers are assigned exclusively to your operations - functioning as an extension of your internal logistics team.",
    reverse: false,
  },
  {
    image: "/images/wfn05862.jpg",
    alt: "TSL dedicated fleet",
    body: "With a dedicated fleet, you gain guaranteed availability, predictable performance, and optimized routing that adapts to your supply chain needs. This model eliminates capacity uncertainty, reduces operational friction, and ensures every shipment moves on schedule - every time.",
    reverse: true,
  },
  {
    image: "/images/edited-wfn05994.jpg",
    alt: "TSL operation",
    body: "Ideal for businesses that prioritize stability, cost efficiency, and operational consistency, our dedicated trucking services empower you to scale with confidence while maintaining complete visibility and control over your transportation network.",
    reverse: false,
  },
];

export default function TSLLogisticsV2() {
  return (
    <ServicePageLayoutV2
      title="TSL Logistics"
      image="/images/edite-wfn05998.jpg"
      enquiryOptions={enquiryOptions}
      source="tsl-logistics"
    >
      <ServiceIntroV2
        title="TSL Logistics"
        image="/images/edite-wfn05998.jpg"
        imageAlt="TSL Logistics truck"
        body={[
          "TSL Logistics is a full-service moving and storage company providing end-to-end solutions - from packing and dismantling to moving, disposal, and secure storage.",
          "We handle relocations for homes, offices, warehouses, and commercial spaces with care and professionalism, ensuring a smooth, reliable, and worry-free moving experience from start to finish.",
        ]}
      />

      <ServiceSplitV2
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
        <ServiceSectionHeaderV2
          title="Flatbed and Lowbed Trailer Trucking"
          subtitle="Whether it's heavy machinery or oversized goods, our flatbed and lowbed trucks are equipped to handle diverse cargo types. We can help you maximise space and ensure load stability throughout transport."
        />
        <ServiceImageCardsV2
          imageFit="contain"
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

      <ServiceSplitV2
        eyebrow="DG Cargo / Trucking"
        title="TSL DG Trucking - Dangerous Goods Handling"
        image="/images/figma-services/logistics-dg.png"
        imageAlt="Dangerous goods trucking"
        body={[
          "TSL Logistics provides reliable Dangerous Goods (DG) trucking services in Singapore, specialising in the safe and compliant transport of hazardous materials. With over 20 years of industry experience, a highly trained team, and strict adherence to local and international regulations, we deliver secure, responsible, and tailored DG transport solutions with safety and reliability at the core.",
        ]}
        cta="Contact Us"
      />

      <ServiceFeatureGridV2
        tone="alternate"
        columns={2}
        features={[
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
        ]}
      />

      <section className="space-y-10">
        <h2 className="text-center text-2xl font-bold leading-tight text-[#151515] md:text-4xl">
          Dedicated Trucking Services (Contract Based)
        </h2>
        {dedicatedTrucking.map((item) => (
          <div
            key={item.alt}
            className={`grid items-center gap-6 md:gap-10 ${item.reverse ? "md:grid-cols-2" : "md:grid-cols-2"}`}
          >
            <div className={`v2-surface relative aspect-[16/10] w-full overflow-hidden ${item.reverse ? "md:order-2" : ""}`}>
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className={item.reverse ? "md:order-1" : ""}>
              <p className="text-sm leading-relaxed text-[#555] md:text-base">{item.body}</p>
              <div className="mt-5">
                <ServiceContactButtonV2 className="!h-9 !px-5 !text-xs">
                  Contact Us
                </ServiceContactButtonV2>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-9">
        <ServiceSectionHeaderV2 title="Why Choose Dedicated Trucking?" />
        <ServiceFeatureGridV2
          tone="circle"
          columns={4}
          features={[
            { title: "Consistent Capacity", text: "Always-ready fleet with no last-minute shortages.", icon: serviceIcons.check },
            { title: "Optimized Routes", text: "Custom routes for faster, more efficient deliveries.", icon: serviceIcons.check },
            { title: "Dedicated Drivers", text: "Experienced drivers aligned with your standards.", icon: serviceIcons.check },
            { title: "Cost Efficiency", text: "Stable pricing with reduced market risk.", icon: serviceIcons.check },
          ]}
        />
      </section>

      <ServiceSplitV2
        eyebrow="Freight Services"
        title="Total Control Across Air, Sea, and Land."
        image="/images/figma-services/logistics-freight.png"
        imageAlt="Freight services"
        body={[
          "Our multi-modal freight services cover air, sea, and land transportation, supported with seamless coordination and reliable transit links. We ensure efficient handling, timely movement, delivery across destinations, and simplified total transit times.",
        ]}
        cta="Contact Us"
      />

      <section className="space-y-12">
        <ServiceSplitV2
          title="Permit Declaration"
          image="/images/permit-processing-homepage.jpg"
          imageAlt="Permit declaration documentation"
          body={[
            "Managing transportation permits doesn't have to be complicated. Our permit declaration service handles all licenses and regulatory requirements for you, ensuring full compliance across routes and regions.",
            "We minimize delays, penalties, and disruptions by working directly with authorities - so your shipments move smoothly, legally, and on time.",
          ]}
        />

        <div className="space-y-6">
          <ServiceSectionHeaderV2 title="What We Handle" />
          <ServiceFeatureGridV2
            tone="alternate"
            columns={2}
            features={[
              {
                title: "Route & Transit Permits",
                text: "End-to-end processing of permits required for intercity, interprovincial, or restricted routes.",
                icon: serviceIcons.check,
              },
              {
                title: "Special Cargo Approvals",
                text: "Permits for oversized, overweight, hazardous, or sensitive cargo - handled in full compliance with regulations.",
                icon: serviceIcons.check,
              },
              {
                title: "Regulatory Documentation",
                text: "Preparation, submission, and verification of all mandatory paperwork to avoid errors or rejections.",
                icon: serviceIcons.check,
              },
              {
                title: "Authority Coordination",
                text: "Direct liaison with local and regulatory bodies to ensure fast approvals and clear communication.",
                icon: serviceIcons.check,
              },
            ]}
          />
        </div>
      </section>

      <ServiceClosingBandV2
        title="TSL Logistics: Complete Moving Solutions You Can Trust"
        body="TSL Logistics provides end-to-end moving and storage services, covering packing, dismantling, relocation, disposal, and secure storage for homes, offices, warehouses, and commercial spaces. With professional movers and proven processes, we ensure every move is handled securely, safely, and stress-free from start to finish."
        cta="Contact Us"
        ctaHref="/contact"
      />
    </ServicePageLayoutV2>
  );
}
