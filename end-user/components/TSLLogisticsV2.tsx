import Image from "next/image";
import ServicePageLayoutV2 from "@/components/ServicePageLayoutV2";
import {
  ServiceClosingBandV2,
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

const dedicatedTruckingBody = [
  "We deliver dedicated trucking solutions designed for long-term, contract-based operations, giving your business full control over capacity, schedules, and service quality. Our trucks and professional drivers are assigned exclusively to your operations - functioning as an extension of your internal logistics team.",
  "With a dedicated fleet, you gain guaranteed availability, predictable performance, and optimized routing that adapts to your supply chain needs. This model eliminates capacity uncertainty, reduces operational friction, and ensures every shipment moves on schedule - every time.",
  "Ideal for businesses that prioritize stability, cost efficiency, and operational consistency, our dedicated trucking services empower you to scale with confidence while maintaining complete visibility and control over your transportation network.",
];

export default function TSLLogisticsV2() {
  return (
    <ServicePageLayoutV2
      title="Logistics"
      image="/images/edite-wfn05998.jpg"
      enquiryOptions={enquiryOptions}
      source="tsl-logistics"
    >
      <ServiceIntroV2
        title="Logistics"
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

      <ServiceSplitV2
        eyebrow="DG Cargo / Trucking"
        title="TSL DG Trucking - Dangerous Goods Handling"
        image="/images/tsl-sg-trucking.jpg"
        imageAlt="Dangerous goods trucking"
        body={[
          "TSL Logistics provides reliable Dangerous Goods (DG) trucking services in Singapore, specialising in the safe and compliant transport of hazardous materials. With over 20 years of industry experience, a highly trained team, and strict adherence to local and international regulations, we deliver secure, responsible, and tailored DG transport solutions with safety and reliability at the core.",
        ]}
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

      <section className="space-y-8">
        <h2 className="text-center text-2xl font-bold leading-tight text-[#151515] md:text-4xl">
          Dedicated Trucking Services (Contract Based)
        </h2>
        <div className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
          <div className="v2-surface relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src="/images/edited-wfn05994.jpg"
              alt="TSL operation"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            {dedicatedTruckingBody.map((body) => (
              <p key={body} className="text-sm leading-relaxed text-[#555] md:text-base">
                {body}
              </p>
            ))}
          </div>
        </div>
      </section>

      <ServiceSplitV2
        eyebrow="Freight Services"
        title="Total Control Across Air, Sea, and Land."
        image="/images/freight-services.png"
        imageAlt="Freight services"
        body={[
          "Our multi-modal freight services cover air, sea, and land transportation, supported with seamless coordination and reliable transit links. We ensure efficient handling, timely movement, delivery across destinations, and simplified total transit times.",
        ]}
      />

      <section className="space-y-12">
        <ServiceSplitV2
          title="Permit Declaration"
          image="/images/permit.png"
          imageAlt="Permit declaration documentation"
          reverse
          body={[
            "Managing transportation permits doesn't have to be complicated. Our permit declaration service handles all licenses and regulatory requirements for you, ensuring full compliance across routes and regions.",
            "We minimize delays, penalties, and disruptions by working directly with authorities - so your shipments move smoothly, legally, and on time.",
          ]}
        />
      </section>

      <ServiceSplitV2
        eyebrow="Project Management"
        title="End-to-End Project Management for Critical Logistics"
        image="/images/project-management.jpeg"
        imageAlt="Project logistics management"
        body={[
          "We offer comprehensive project management for specialized and time-sensitive logistics operations. From planning and documentation to on-site coordination and transport execution, we manage every detail - ensuring timely completion, and one-stop coverage for large-scale, specialized, or high-risk transport projects.",
        ]}
      />

      <ServiceSplitV2
        eyebrow="Specialised Cargo"
        title="OOG (Out of Gauge)"
        image="/images/oog.jpeg"
        imageAlt="TSL OOG cargo transport"
        reverse
        body={[
          "Some cargo doesn't fit standard dimensions. Our OOG (Out of Gauge) service handles oversized, overweight, and irregularly shaped loads - from industrial machinery to tanks and structural components - with specialised trailers and careful route planning for safe, compliant delivery.",
        ]}
      />
    </ServicePageLayoutV2>
  );
}
