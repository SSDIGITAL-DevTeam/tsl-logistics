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
  "General warehousing / storage",
  "Long-term storage",
  "Short-term storage",
  "Packing & repacking",
  "Sorting and labelling",
  "Inventory management",
  "Loading and unloading",
  "Others",
];

const cargoTypes = [
  { title: "General cargo", text: "Non-specialised goods handled with secure and systematic storage.", icon: serviceIcons.boxes },
  { title: "Palletised goods", text: "Pallet-based cargo for efficient stacking, handling, and movement.", icon: serviceIcons.forklift },
  { title: "Cartons and boxed items", text: "Individual cartons and boxes stored neatly for easy access and tracking.", icon: serviceIcons.package },
];

const valueAddedItems = [
  "Packing & repacking",
  "Sorting and labelling",
  "Inventory management",
  "Loading and unloading",
];

export default function WarehousingServicesV2() {
  return (
    <ServicePageLayoutV2
      title="Warehousing Services"
      image="/images/TSL Logistics Warehouse-1920w.jpeg"
      enquiryOptions={enquiryOptions}
      source="warehousing-services"
    >
      <ServiceIntroV2
        title="TSL Warehousing"
        image="/images/figma-services/warehouse-intro-new.jpg"
        imageAlt="TSL Warehousing facility"
        body={[
          "Reliable, secure, and flexible warehousing solutions to support your supply chain needs.",
          "Our Singapore West Zone facility is designed for efficient handling of general cargo, offering scalable storage options and integrated logistics support to help your business operate smoothly and grow with confidence.",
        ]}
      />

      <ServiceSplitV2
        eyebrow="Strategic Warehouse Location"
        title="Strategic Warehouse Location"
        image="/images/wfn05952.jpg"
        imageAlt="Warehouse location"
        body={[
          "Our warehouse is strategically located in Singapore's West Zone, providing easy access to major industrial areas, ports, and transport networks.",
          "This ensures faster handling, smoother distribution, and cost-efficient logistics for your operations.",
        ]}
        cta="Contact Us"
      />

      <section className="space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-[#151515] md:text-5xl">
            Cargo We Handle
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#555] md:text-base">
            We accommodate a wide range of general cargo, including:
          </p>
        </div>

        <ServiceFeatureGridV2 tone="plain" columns={3} features={cargoTypes} />

        <p className="mx-auto max-w-[780px] text-center text-sm leading-relaxed text-[#555] md:text-base">
          Whether you manage bulk shipments or smaller consignments, our facility is equipped to handle your inventory with care and accuracy.
        </p>
      </section>

      <section className="space-y-8">
        <ServiceSectionHeaderV2
          title="Flexible Storage Options"
          subtitle="Our flexible space allocation allows you to scale up or down without long-term constraints."
        />
        <ServiceImageCardsV2
          cards={[
            {
              title: "Long-term storage",
              text: "For stable inventory management.",
              image: "/images/figma-services/warehouse-long-term-new.jpg",
              alt: "Long-term warehouse storage",
            },
            {
              title: "Short-term storage",
              text: "For temporary holding or peak periods.",
              image: "/images/figma-services/warehouse-short-term-new.jpg",
              alt: "Short-term warehouse storage",
            },
          ]}
        />
      </section>

      <section className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="v2-surface relative aspect-square overflow-hidden">
          <Image
            src="/images/figma-services/warehouse-value-added-new.jpg"
            alt="Value-added warehouse services"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <ServiceSectionHeaderV2 title="Value-Added Warehouse Services" align="left" />
          <div className="mt-7 text-sm leading-relaxed text-[#555] md:text-base">
            <p>Beyond storage, we offer value-added services to streamline your logistics workflow:</p>
            <ul className="mt-6 space-y-2 font-bold text-[#151515]">
              {valueAddedItems.map((item) => {
                const Icon = serviceIcons.check;
                return (
                  <li key={item} className="flex items-center gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-gradient text-[#121212]">
                      <Icon size={14} strokeWidth={4} />
                    </span>
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6">
              By integrating these services under one roof, we help reduce handling time, minimize errors, and improve overall efficiency.
            </p>
            <div className="mt-8">
              <ServiceContactButtonV2 className="!h-9 !px-5 !text-xs">Contact Us</ServiceContactButtonV2>
            </div>
          </div>
        </div>
      </section>

      <ServiceClosingBandV2
        title="Let's Optimize Your Storage & Distribution"
        body="Looking for secure and flexible warehousing solutions in Singapore? Contact us today to discuss your storage requirements, space needs, and operational goals. Our team is ready to provide tailored warehousing solutions that help streamline your inventory management, improve efficiency, and support your business operations seamlessly as you grow."
        cta="Contact Us"
        ctaHref="/contact"
        image="/images/figma-services/warehouse-cta.png"
        imageAlt="Warehouse storage boxes"
      />
    </ServicePageLayoutV2>
  );
}
