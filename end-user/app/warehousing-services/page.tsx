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
  title: "TSL Warehousing | Storage Solutions Singapore | TSL Logistics",
  description:
    "TSL Warehousing provides secure general cargo storage, flexible storage options, inventory management, packing, sorting, labelling, loading, and unloading services.",
};

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

export default function WarehousingServicesPage() {
  return (
    <ServicePageLayout title="Warehousing Services" image="/images/TSL Logistics Warehouse-1920w.jpeg" enquiryOptions={enquiryOptions} source="warehousing-services">
      <FigmaServiceShell>
        <FigmaIntro
          title="TSL Warehousing"
          image="/images/figma-services/warehouse-intro.png"
          imageAlt="TSL Warehousing facility"
          body={[
            "Reliable, secure, and flexible warehousing solutions to support your supply chain needs.",
            "Our Singapore West Zone facility is designed for efficient handling of general cargo, offering scalable storage options and integrated logistics support to help your business operate smoothly and grow with confidence.",
          ]}
        />

        <FigmaSplitSection
          eyebrow="Strategic Warehouse Location"
          title="Strategic Warehouse Location"
          image="/images/figma-services/warehouse-location.png"
          imageAlt="Warehouse location"
          reverse
          body={[
            "Our warehouse is strategically located in Singapore's West Zone, providing easy access to major industrial areas, ports, and transport networks.",
            "This ensures faster handling, smoother distribution, and cost-efficient logistics for your operations.",
          ]}
          cta="Contact Us"
        />

        <FigmaBand>
          <div className="space-y-8">
            <FigmaSectionHeader title="Cargo We Handle" subtitle="We accommodate a wide range of general cargo, including:" />
            <FigmaFeatureGrid
              features={[
                { title: "General cargo", text: "Non-specialised goods handled with secure and systematic storage.", icon: serviceIcons.boxes },
                { title: "Palletised goods", text: "Pallet-based cargo for efficient stacking, handling, and movement.", icon: serviceIcons.forklift },
                { title: "Cartons and boxed items", text: "Individual cartons and boxes stored neatly for easy access and tracking.", icon: serviceIcons.package },
              ]}
            />
            <p className="mx-auto max-w-4xl text-center text-sm leading-[1.5] text-[#121212] md:text-base">
              Whether you manage bulk shipments or smaller consignments, our facility is equipped to handle your inventory with care and accuracy.
            </p>
          </div>
        </FigmaBand>

        <section className="space-y-8">
          <FigmaSectionHeader
            title="Flexible Storage Options"
            subtitle="Our flexible space allocation allows you to scale up or down without long-term constraints."
          />
          <FigmaImageCards
            cards={[
              {
                title: "Long-term storage",
                text: "For stable inventory management.",
                image: "/images/figma-services/warehouse-long.png",
                alt: "Long-term warehouse storage",
              },
              {
                title: "Short-term storage",
                text: "For temporary holding or peak periods.",
                image: "/images/figma-services/warehouse-short.png",
                alt: "Short-term warehouse storage",
              },
            ]}
          />
        </section>

        <section className="grid items-center gap-8 md:grid-cols-[1.03fr_1fr] md:gap-12">
          <div className="relative aspect-[616/606] overflow-hidden bg-[#e1e1e1]">
            <Image src="/images/figma-services/warehouse-value.png" alt="Value-added warehouse services" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <FigmaSectionHeader title="Value-Added Warehouse Services" align="left" />
            <div className="mt-7 text-sm leading-[1.5] text-[#121212] md:text-base">
              <p>Beyond storage, we offer value-added services to streamline your logistics workflow:</p>
              <ul className="mt-6 space-y-2 font-bold">
                <li>Packing & repacking</li>
                <li>Sorting and labelling</li>
                <li>Inventory management</li>
                <li>Loading and unloading</li>
              </ul>
              <p className="mt-6">
                By integrating these services under one roof, we help reduce handling time, minimize errors, and improve overall efficiency.
              </p>
              <div className="mt-8">
                <a href="/contact" className="inline-flex h-[38px] min-w-[150px] items-center justify-center bg-gold-gradient px-6 text-[12px] font-bold text-[#121212] shadow-[0_1px_2px_rgba(25,33,61,0.08)]">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>

        <FigmaBand dark>
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_340px]">
            <div>
              <h2 className="text-2xl font-bold leading-[1.3] md:text-3xl">Let&apos;s Optimize Your Storage & Distribution</h2>
              <p className="mt-4 max-w-3xl text-sm leading-[1.5] text-white/90 md:text-base">
                Looking for secure and flexible warehousing solutions in Singapore? Contact us today to discuss your storage requirements, space needs, and operational goals. Our team is ready to provide tailored warehousing solutions that help streamline your inventory management, improve efficiency, and support your business operations seamlessly as you grow.
              </p>
              <div className="mt-6">
                <a href="/contact" className="inline-flex h-[52px] min-w-[180px] items-center justify-center bg-white px-6 text-sm font-bold text-[#121212]">
                  Contact Us
                </a>
              </div>
            </div>
            <div className="relative aspect-[340/220] overflow-hidden">
              <Image src="/images/figma-services/warehouse-cta.png" alt="" fill sizes="340px" className="object-cover" />
            </div>
          </div>
        </FigmaBand>
      </FigmaServiceShell>
    </ServicePageLayout>
  );
}
