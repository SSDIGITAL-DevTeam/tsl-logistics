import type { Metadata } from "next";
import Image from "next/image";
import ServicePageLayout from "@/components/ServicePageLayout";
import {
  FigmaBand,
  FigmaContactButton,
  FigmaFeatureGrid,
  FigmaImageCards,
  FigmaIntro,
  FigmaSectionHeader,
  FigmaServiceShell,
  FigmaSplitSection,
  serviceIcons,
} from "@/components/FigmaServiceContent";

export const metadata: Metadata = {
  title: "TSL Mover | Professional Moving Services Singapore | TSL Logistics",
  description:
    "TSL Mover provides residential, office, commercial, factory, international, server, machine, piano, organ, pool table, and safe box moving services.",
};

const enquiryOptions = [
  "Residential moving",
  "Office / commercial moving",
  "International moving",
  "Factory moving",
  "Server / machine moving",
  "Piano / safe box moving",
  "Dedicated lorry service",
  "Others",
];

const featuredLogos = [
  { src: "/images/Exped2BMoving2BFive2BStar2BCustomer2BReviews-1920w.png", alt: "Five star customer reviews" },
  { src: "/images/sgcm_logo-1920w.jpg", alt: "SGCM" },
  { src: "/images/SPCA2020202128Transparent29-1280w.png", alt: "SPCA" },
  { src: "/images/bizSAFE-Enterprise-Level-STAR-e1633345808369-1920w.jpeg", alt: "bizSAFE Star" },
];

export default function TSLMoverPage() {
  return (
    <ServicePageLayout title="TSL Mover" image="/images/service-warehousing.jpg" enquiryOptions={enquiryOptions} source="tsl-mover">
      <FigmaServiceShell>
        <FigmaIntro
          title="TSL Mover"
          image="/images/figma-services/mover-intro.png"
          imageAlt="TSL Mover team moving furniture"
          body={[
            "TSL Mover is a full-service moving and storage company offering from packing, dismantling to moving, disposal of your unwanted items, and storage for the contents of your home, your office, your warehouse, your manufacturing facility, and your tradeshows.",
            "If you are searching for a moving company to make your next move a worry-free experience, choose TSL Mover. Our moving experts will take good care of you and your belongings from the moment you first call us right until your final box is unloaded.",
          ]}
        />

        <FigmaImageCards
          cards={[
            {
              title: "RESIDENTIAL / OFFICE / COMMERCIAL / INTERNATIONAL / FACTORY MOVING",
              image: "/images/figma-services/mover-residential.png",
              alt: "Residential and office moving",
            },
            {
              title: "SERVER / MACHINE / PIANO / ORGAN / POOL TABLE / SAFE BOX MOVING",
              image: "/images/figma-services/mover-heavy.png",
              alt: "Heavy item moving",
            },
          ]}
        />

        <FigmaBand>
          <div className="space-y-8">
            <FigmaSectionHeader title="We Are Featured On" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {featuredLogos.map((logo) => (
                <div key={logo.alt} className="flex h-28 items-center justify-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                  <Image src={logo.src} alt={logo.alt} width={170} height={86} className="max-h-16 w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
        </FigmaBand>

        <FigmaSplitSection
          eyebrow="Local Transportation & Dedicated Lorry Solutions"
          title="Local Transportation Services"
          image="/images/figma-services/mover-local.png"
          imageAlt="Local transportation moving service"
          body={[
            "We provide local transportation for furniture, cartons, office items, and equipment, serving both individuals and SMEs.",
            "With careful handling and reliable scheduling, we ensure your items are moved safely and on time for every job.",
          ]}
          cta="Contact Us"
        />

        <FigmaSplitSection
          title="Dedicated Lorry Service"
          image="/images/figma-services/mover-lorry.png"
          imageAlt="Dedicated lorry service"
          reverse
          body={[
            "Our dedicated lorry service offers exclusive vehicle usage under monthly or long-term contracts. Ideal for retail, logistics, and commercial businesses, this solution delivers stable capacity, predictable costs, and operational efficiency.",
          ]}
          cta="Contact Us"
        />

        <section className="grid items-center gap-8 lg:grid-cols-[520px_1fr]">
          <div className="relative aspect-[520/370] overflow-hidden rounded-[27px] bg-[#e1e1e1]">
            <Image src="/images/figma-services/mover-trust.png" alt="TSL Mover customers" fill className="object-cover" sizes="(min-width: 1024px) 520px, 100vw" />
          </div>
          <div className="space-y-6">
            <FigmaSectionHeader title="Why Thousands Of Customers Have Chosen TSL Mover" align="left" />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Recommended by thousands of Singaporeans",
                "Affordable and transparent prices",
                "Professional mover with punctual service",
                "Reliable support before, during, and after moving",
              ].map((item) => (
                <div key={item} className="rounded-[20px] bg-[#f5f5f5] p-5 text-sm font-semibold leading-[1.4] text-[#121212]">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <FigmaSectionHeader title="We go the extra mile to give you top-notch services:" />
          <div className="overflow-hidden rounded-[4px] border border-[#d6c27a] text-sm text-[#121212]">
            {[
              ["Service", "Included Support"],
              ["Packing", "Cartons, tapes, wrapping, and moving preparation"],
              ["Dismantle", "Furniture dismantling and reassembly support"],
              ["Manpower", "Trained movers for careful handling"],
              ["Transport", "Reliable lorry support and delivery coordination"],
            ].map((row, index) => (
              <div key={row[0]} className={`grid grid-cols-[160px_1fr] border-b border-[#e5d796] last:border-b-0 ${index === 0 ? "bg-gold-gradient font-bold" : "bg-white"}`}>
                <div className="px-4 py-3">{row[0]}</div>
                <div className="px-4 py-3">{row[1]}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <FigmaSectionHeader title="From Booking To Moving in 4 Easy Steps!" />
          <FigmaFeatureGrid
            features={[
              { title: "Step 1", text: "Fill up your moving details.", icon: serviceIcons.file },
              { title: "Step 2", text: "Receive quotation from our team.", icon: serviceIcons.clipboard },
              { title: "Step 3", text: "Confirm your moving schedule.", icon: serviceIcons.calendar },
              { title: "Step 4", text: "Move with TSL Mover.", icon: serviceIcons.truck },
            ]}
          />
        </section>

        <FigmaBand dark>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <h2 className="text-3xl font-extrabold leading-[1.3] md:text-[40px]">Get Your Quotation Now With TSL Mover Service</h2>
              <p className="max-w-lg text-sm leading-[1.5] text-white/90 md:text-[18px]">
                Submit your details and our team will get back to you with the right moving support.
              </p>
              <FigmaContactButton>Contact Us</FigmaContactButton>
            </div>
            <div className="rounded-[8px] bg-white p-6 text-[#121212]">
              <div className="grid gap-4">
                {["Name", "Email", "Phone Number", "Estimated Moving Date", "Property Type (FROM)", "Property Type (TO)", "Address (Moving From)", "Address (Moving To)"].map((field) => (
                  <div key={field}>
                    <label className="mb-1 block text-sm font-semibold">{field}</label>
                    <div className="h-11 border border-black/30 bg-white px-3 text-sm leading-[2.75rem] text-black/45">
                      {field.includes("Address") ? "Your Address" : field.includes("Date") ? "dd/mm/yy" : ""}
                    </div>
                  </div>
                ))}
                <button className="h-12 rounded-full bg-gold-gradient text-sm font-bold text-[#121212]">Submit</button>
              </div>
            </div>
          </div>
        </FigmaBand>
      </FigmaServiceShell>
    </ServicePageLayout>
  );
}
