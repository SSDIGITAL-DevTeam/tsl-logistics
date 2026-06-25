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

        <section className="space-y-8">
          <FigmaSectionHeader title="We Are Featured On" />
          <div className="grid grid-cols-2 items-center gap-x-8 gap-y-7 md:grid-cols-4">
            {featuredLogos.map((logo) => (
              <div key={logo.alt} className="flex h-20 items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={170}
                  height={86}
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-14">
          <div className="-mx-5 bg-gold-gradient px-5 py-10 text-center md:-mx-10 md:px-10">
            <h2 className="text-2xl font-bold leading-tight text-[#121212] md:text-[30px]">
              Local Transportation & Dedicated Lorry Solutions
            </h2>
            <p className="mx-auto mt-3 max-w-[560px] text-sm leading-relaxed text-[#121212]">
              Reliable transport services designed to support individuals and
              businesses with safe handling, dependable scheduling, and
              consistent service across Singapore.
            </p>
          </div>

          <div className="mx-auto grid max-w-[980px] items-center gap-9 md:grid-cols-[1fr_430px] md:gap-12">
            <div className="max-w-[390px]">
              <h3 className="text-2xl font-bold leading-tight text-[#121212] md:text-[28px]">
                Local Transportation Services
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-[#1f1f1f]">
                We provide local transportation for furniture, cartons, office
                items, and equipment, serving both individuals and SMEs. With
                careful handling and reliable scheduling, we ensure your items
                are moved safely and on time for every job.
              </p>
              <a
                href="/contact"
                className="mt-6 inline-flex h-10 min-w-[190px] items-center justify-center rounded-full bg-gold-gradient px-6 text-[12px] font-bold text-[#121212] transition hover:opacity-90"
              >
                Contact Us
              </a>
            </div>
            <div className="relative mx-auto aspect-[430/230] w-full max-w-[430px]">
              <Image
                src="/images/figma-services/mover-local.png"
                alt="Local transportation moving service"
                fill
                sizes="(min-width: 768px) 430px, 100vw"
                className="object-contain"
              />
            </div>
          </div>

          <div className="mx-auto grid max-w-[980px] items-center gap-9 md:grid-cols-[430px_1fr] md:gap-12">
            <div className="relative mx-auto aspect-[430/260] w-full max-w-[430px]">
              <Image
                src="/images/figma-services/mover-lorry.png"
                alt="Dedicated lorry service"
                fill
                sizes="(min-width: 768px) 430px, 100vw"
                className="object-contain"
              />
            </div>
            <div className="max-w-[430px] md:justify-self-end">
              <h3 className="text-2xl font-bold leading-tight text-[#121212] md:text-[28px]">
                Dedicated Lorry Service
              </h3>
              <p className="mt-5 text-sm leading-relaxed text-[#1f1f1f]">
                Our dedicated lorry service offers exclusive vehicle usage
                under monthly or long-term contracts. Ideal for retail,
                logistics, and commercial businesses, this solution delivers
                stable capacity, predictable costs, and operational efficiency.
              </p>
              <a
                href="/contact"
                className="mt-6 inline-flex h-10 min-w-[190px] items-center justify-center rounded-full bg-gold-gradient px-6 text-[12px] font-bold text-[#121212] transition hover:opacity-90"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[920px] space-y-12">
          <h2 className="mx-auto max-w-[560px] text-center text-[26px] font-bold leading-tight text-[#121212] md:text-[32px]">
            Why Thousands Of Customers Have Chosen TSL Mover
          </h2>

          <div className="grid items-stretch gap-5 md:grid-cols-[280px_1fr]">
            <div className="relative min-h-[390px] overflow-hidden rounded-xl bg-[#e1e1e1]">
              <Image
                src="/images/figma-services/mover-trust.png"
                alt="TSL Mover customers"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 280px, 100vw"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "More than 30 years of collective experience",
                  text: "The rich experience of our team is evident in the way we handle valuable or fragile objects, and our prompt service.",
                  icon: serviceIcons.shield,
                  tone: "navy",
                },
                {
                  title: "5 star reviews",
                  text: "Our consistent 5-star reviews on Facebook and Google are a testament to our service quality and premium customer service.",
                  icon: serviceIcons.zap,
                  tone: "gold",
                },
                {
                  title: "No hidden cost",
                  text: "TSL Mover provides accurate and transparent project-based quotes tailored specifically for your moving project.",
                  icon: serviceIcons.package,
                  tone: "gold",
                },
                {
                  title: "Prompt, 24/7 service",
                  text: "Our team is highly reliable and prompt - we show up on time and keep to the agreed schedule.",
                  icon: serviceIcons.clock,
                  tone: "navy",
                },
              ].map((item) => {
                const Icon = item.icon;
                const isNavy = item.tone === "navy";
                return (
                  <article
                    key={item.title}
                    className={`${isNavy ? "bg-[#1f2d69] text-white" : "bg-gold-gradient text-[#121212]"} min-h-[185px] rounded-xl p-5`}
                  >
                    <Icon size={23} strokeWidth={2.4} />
                    <h3 className="mt-4 text-sm font-bold leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed opacity-90">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[920px] space-y-8">
          <h2 className="text-center text-xl font-bold leading-tight text-[#121212] md:text-2xl">
            We go the extra mile to give you top-notch services:
          </h2>
          <div className="overflow-hidden border border-[#d7dce5] text-[12px] leading-relaxed text-[#121212]">
            <div className="grid grid-cols-[90px_1fr_1.25fr] bg-gold-gradient font-semibold">
              <div className="px-3 py-3" />
              <div className="border-l border-white/60 px-3 py-3">Other Movers</div>
              <div className="border-l border-white/60 px-3 py-3">TSL</div>
            </div>
            {[
              [
                "Fees",
                "Quote low prices and charge hidden fees",
                "Transparent, all-in-one pricing as shown on our FREE quotation",
              ],
              [
                "Reliability",
                "Often late, unresponsive and off-schedule",
                "Reliable and punctual with 24/7 response time",
              ],
              [
                "Expertise",
                "Risk of damaging valuables & fragile goods",
                "Over 30 years experience for safe & secure handling",
              ],
            ].map((row) => (
              <div
                key={row[0]}
                className="grid grid-cols-[90px_1fr_1.25fr] border-t border-[#d7dce5] bg-white"
              >
                <div className="bg-[#f1db67] px-3 py-3 font-semibold">
                  {row[0]}
                </div>
                <div className="border-l border-[#d7dce5] px-3 py-3">
                  <span className="mr-1 text-base font-bold leading-none text-red-600">
                    x
                  </span>
                  {row[1]}
                </div>
                <div className="border-l border-[#d7dce5] px-3 py-3">
                  <span className="mr-1 text-base font-bold leading-none text-green-600">
                    ✓
                  </span>
                  {row[2]}
                </div>
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
              <h2 className="text-2xl font-bold leading-[1.3] md:text-3xl">Get Your Quotation Now With TSL Mover Service</h2>
              <p className="max-w-lg text-sm leading-[1.5] text-white/90 md:text-base">
                Submit your details and our team will get back to you with the right moving support.
              </p>
              <FigmaContactButton>Contact Us</FigmaContactButton>
            </div>
            <div className="bg-white p-6 text-[#121212]">
              <div className="grid gap-4">
                {["Name", "Email", "Phone Number", "Estimated Moving Date", "Property Type (FROM)", "Property Type (TO)", "Address (Moving From)", "Address (Moving To)"].map((field) => (
                  <div key={field}>
                    <label className="mb-1 block text-sm font-semibold">{field}</label>
                    <div className="h-11 border border-black/30 bg-white px-3 text-sm leading-[2.75rem] text-black/45">
                      {field.includes("Address") ? "Your Address" : field.includes("Date") ? "dd/mm/yy" : ""}
                    </div>
                  </div>
                ))}
                <button className="h-12 bg-gold-gradient text-sm font-bold text-[#121212]">Submit</button>
              </div>
            </div>
          </div>
        </FigmaBand>
      </FigmaServiceShell>
    </ServicePageLayout>
  );
}
