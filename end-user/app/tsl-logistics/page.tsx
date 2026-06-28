import type { Metadata } from "next";
import Image from "next/image";
import ServicePageLayout from "@/components/ServicePageLayout";
import {
  FigmaContactButton,
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
    <ServicePageLayout
      title="TSL Logistics"
      image="/images/edite-wfn05998.jpg"
      enquiryOptions={enquiryOptions}
      showContactForm={false}
      ctaVariant="quote"
      source="tsl-logistics"
    >
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
          cta="Contact Us"
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

        <section>
          <FigmaSectionHeader title="DG Cargo / Trucking" />
          <div className="mt-8 grid items-center gap-8 md:grid-cols-[320px_minmax(0,1fr)] md:gap-12">
            <div className="relative aspect-[320/300] overflow-hidden">
              <Image
                src="/images/figma-services/logistics-dg.png"
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
              <div className="mt-6">
                <FigmaContactButton>Contact Us</FigmaContactButton>
              </div>
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

        <section className="space-y-10 md:space-y-12">
          <h2 className="text-center text-xl font-bold leading-tight text-[#1a1a1a] md:text-2xl">
            Dedicated Trucking Services (Contract Based)
          </h2>
          {[
            {
              image: "/images/wfn05884-1.jpg",
              alt: "Dedicated trucking service",
              body: (
                <>
                  We deliver <strong>dedicated trucking solutions designed for long-term, contract-based operations</strong>, giving your business full control over capacity, schedules, and service quality. Our trucks and professional drivers are assigned exclusively to your operations - functioning as an extension of your internal logistics team.
                </>
              ),
              imageSide: "left",
            },
            {
              image: "/images/wfn05862.jpg",
              alt: "TSL dedicated fleet",
              body: (
                <>
                  With a dedicated fleet, you gain <strong>guaranteed availability</strong>, predictable performance, and optimized routing that adapts to your supply chain needs. This model eliminates capacity uncertainty, reduces operational friction, and ensures every shipment moves on schedule - every time.
                </>
              ),
              imageSide: "right",
            },
            {
              image: "/images/edited-wfn05994.jpg",
              alt: "TSL operation",
              body: (
                <>
                  Ideal for businesses that prioritize <strong>stability, cost efficiency, and operational consistency</strong>, our dedicated trucking services empower you to scale with confidence while maintaining complete visibility and control over your transportation network.
                </>
              ),
              imageSide: "left",
            },
          ].map((item) => (
            <div
              key={item.alt}
              className={`grid items-center gap-y-5 md:gap-x-10 lg:gap-x-14 ${
                item.imageSide === "right"
                  ? "md:grid-cols-[minmax(0,1fr)_minmax(300px,440px)]"
                  : "md:grid-cols-[minmax(300px,440px)_minmax(0,1fr)]"
              }`}
            >
              <div
                className={`relative aspect-[16/10] w-full overflow-hidden ${
                  item.imageSide === "right" ? "md:order-2 md:justify-self-end" : ""
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 440px, (min-width: 768px) 38vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className={`${item.imageSide === "right" ? "md:order-1 md:justify-self-end" : ""} max-w-[620px]`}>
                <p className="text-sm leading-relaxed text-[#1a1a1a] md:text-base">
                  {item.body}
                </p>
                <div className="mt-5">
                  <a
                    href="/contact"
                    className="inline-flex h-8 min-w-[150px] items-center justify-center bg-gold-gradient px-5 text-[11px] font-bold text-[#121212] transition hover:opacity-90"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-9">
          <FigmaSectionHeader title="Why Choose Dedicated Trucking?" />
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Consistent Capacity", text: "Always-ready fleet with no last-minute shortages.", icon: serviceIcons.check },
              { title: "Optimized Routes", text: "Custom routes for faster, more efficient deliveries.", icon: serviceIcons.check },
              { title: "Dedicated Drivers", text: "Experienced drivers aligned with your standards.", icon: serviceIcons.check },
              { title: "Cost Efficiency", text: "Stable pricing with reduced market risk.", icon: serviceIcons.check },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="mx-auto max-w-[180px]">
                  <div className="mx-auto mb-4 grid h-12 w-12 place-items-center bg-gold-gradient text-[#121212]">
                    <Icon size={20} strokeWidth={4} />
                  </div>
                  <h3 className="text-sm font-bold leading-tight text-[#1a1a1a]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#555]">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <FigmaSplitSection
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
          <h2 className="text-center text-[26px] font-bold leading-tight text-[#1a1a1a] md:text-[32px]">
            Permit Declaration
          </h2>

          <div className="grid items-center gap-8 md:grid-cols-[minmax(360px,520px)_minmax(0,1fr)] md:gap-12 lg:gap-16">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src="/images/permit-processing-homepage.jpg"
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
              <div className="mt-6">
                <a
                  href="/contact"
                  className="inline-flex h-10 min-w-[190px] items-center justify-center bg-gold-gradient px-6 text-[12px] font-bold text-[#121212] transition hover:opacity-90"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-center text-xl font-bold leading-tight text-[#1a1a1a] md:text-[22px]">
              What We Handle
            </h3>
            <div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
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
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <article
                      key={item.title}
                      className={`${index === 0 || index === 3 ? "bg-[#1a3263] text-white" : "bg-gold-gradient text-[#121212]"} min-h-[170px] p-5`}
                    >
                      <div
                        className={`${index === 0 || index === 3 ? "bg-white text-[#1a3263]" : "bg-[#121212] text-[#f1d35f]"} mb-4 grid h-6 w-6 place-items-center`}
                      >
                        <Icon size={15} strokeWidth={4} />
                      </div>
                      <h4 className="text-sm font-bold leading-tight">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed opacity-90">
                        {item.text}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <FigmaSplitSection
          eyebrow="Project Management"
          title="End-to-End Project Management for Critical Logistics"
          image="/images/wfn06078.jpg"
          imageAlt="Project logistics management"
          body={[
            "We offer comprehensive project management for specialized and time-sensitive logistics operations. From planning and documentation to on-site coordination and transport execution, we manage every detail - ensuring timely completion, and one-stop coverage for large-scale, specialized, or high-risk transport projects.",
          ]}
          cta="Contact Us"
        />

        <section className="relative left-1/2 w-screen -translate-x-1/2 bg-[#1a3263] px-5 pt-10 text-white md:px-10 md:pt-14">
          <div className="mx-auto grid max-w-[1200px] items-end gap-8 lg:grid-cols-[minmax(0,1fr)_460px]">
            <div className="pb-10 md:pb-14">
              <h2 className="text-2xl font-bold leading-[1.3] md:text-3xl">TSL Logistics: Complete Moving Solutions You Can Trust</h2>
              <p className="mt-4 max-w-3xl text-sm leading-[1.5] text-white/90 md:text-base">
                TSL Logistics provides end-to-end moving and storage services, covering packing, dismantling, relocation, disposal, and secure storage for homes, offices, warehouses, and commercial spaces. With professional movers and proven processes, we ensure every move is handled securely, safely, and stress-free from start to finish.
              </p>
              <div className="mt-6">
                <a href="/contact" className="inline-flex h-[52px] min-w-[180px] items-center justify-center bg-white px-6 text-sm font-bold text-[#121212]">
                  Contact Us
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:-mr-40 lg:justify-end">
              <Image
                src="/images/kontainer-full.png"
                alt=""
                width={1524}
                height={1776}
                sizes="(min-width: 1024px) 520px, 82vw"
                quality={100}
                unoptimized
                className="h-auto w-full max-w-[340px] object-contain md:max-w-[400px] lg:max-w-[520px]"
              />
            </div>
          </div>
        </section>
      </FigmaServiceShell>
    </ServicePageLayout>
  );
}
