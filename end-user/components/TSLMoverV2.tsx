import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Fragment } from "react";
import ServicePageLayoutV2 from "@/components/ServicePageLayoutV2";
import TSLMoverQuoteForm from "@/components/TSLMoverQuoteForm";
import {
  ServiceContactButtonV2,
  ServiceFeatureGridV2,
  ServiceImageCardsV2,
  ServiceIntroV2,
  ServiceSectionHeaderV2,
  serviceIcons,
} from "@/components/ServiceBlocksV2";

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

const trustFeatures = [
  {
    title: "More than 30 years of collective experience",
    text: "The rich experience of our team is evident in the way we handle valuable or fragile objects, and our prompt service.",
    icon: serviceIcons.shield,
  },
  {
    title: "5 star reviews",
    text: "Our consistent 5-star reviews on Facebook and Google are a testament to our service quality and premium customer service.",
    icon: serviceIcons.zap,
  },
  {
    title: "No hidden cost",
    text: "TSL Mover provides accurate and transparent project-based quotes tailored specifically for your moving project.",
    icon: serviceIcons.package,
  },
  {
    title: "Prompt, 24/7 service",
    text: "Our team is highly reliable and prompt - we show up on time and keep to the agreed schedule.",
    icon: serviceIcons.clock,
  },
];

const comparisonRows = [
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
];

const trustStats = [
  { text: "80% retention & repeat customers", icon: "/images/mover-stat-like.svg" },
  { text: "Over 1,200 satisfied customers & counting", icon: "/images/mover-stat-satisfied.svg" },
  { text: "Featured on SG Car Mart & SME500 Award winner", icon: "/images/mover-stat-award.svg" },
];

const bookingSteps = [
  { title: "Step 1", text: "Get a FREE quote from our expert movers", icon: serviceIcons.file },
  { title: "Step 2", text: "We help pack your goods efficiently", icon: serviceIcons.boxes },
  { title: "Step 3", text: "We move your goods safely to your destination", icon: serviceIcons.truck },
  { title: "Step 4", text: "We carefully unload and deliver to your new place", icon: serviceIcons.package },
];

export default function TSLMoverV2() {
  return (
    <ServicePageLayoutV2
      title="TSL Mover"
      image="/images/service-warehousing.jpg"
      enquiryOptions={enquiryOptions}
      showContactForm={false}
      source="tsl-mover"
    >
      <ServiceIntroV2
        title="TSL Mover"
        image="/images/figma-services/mover-intro-new.jpg"
        imageAlt="TSL Mover team moving furniture"
        body={[
          "TSL Mover is a full-service moving and storage company offering from packing, dismantling to moving, disposal of your unwanted items, and storage for the contents of your home, your office, your warehouse, your manufacturing facility, and your tradeshows.",
          "If you are searching for a moving company to make your next move a worry-free experience, choose TSL Mover. Our moving experts will take good care of you and your belongings from the moment you first call us right until your final box is unloaded.",
        ]}
      />

      <ServiceImageCardsV2
        cards={[
          {
            title: "RESIDENTIAL / OFFICE / COMMERCIAL / INTERNATIONAL / FACTORY MOVING",
            image: "/images/figma-services/mover-card-primary.jpg",
            alt: "Residential and office moving",
          },
          {
            title: "SERVER / MACHINE / PIANO / ORGAN / POOL TABLE / SAFE BOX MOVING",
            image: "/images/figma-services/mover-card-heavy.jpg",
            alt: "Heavy item moving",
          },
        ]}
      />

      <section className="space-y-8">
        <ServiceSectionHeaderV2 title="We Are Featured On" />
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
        <div className="v2-surface bg-gold-gradient px-5 py-10 text-center md:px-10">
          <h2 className="text-2xl font-bold leading-tight text-[#121212] md:text-[30px]">
            Local Transportation &amp; Dedicated Lorry Solutions
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-sm leading-relaxed text-[#121212]">
            Reliable transport services designed to support individuals and
            businesses with safe handling, dependable scheduling, and
            consistent service across Singapore.
          </p>
        </div>

        <div className="grid items-center gap-9 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="max-w-[520px]">
            <h3 className="text-2xl font-bold leading-tight text-[#121212] md:text-[28px]">
              Local Transportation Services
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-[#1f1f1f]">
              We provide local transportation for furniture, cartons, office
              items, and equipment, serving both individuals and SMEs. With
              careful handling and reliable scheduling, we ensure your items
              are moved safely and on time for every job.
            </p>
            <div className="mt-6">
              <ServiceContactButtonV2 className="!h-10 !px-6 !text-xs">Contact Us</ServiceContactButtonV2>
            </div>
          </div>
          <div className="v2-surface relative mx-auto aspect-[520/278] w-full overflow-hidden">
            <Image
              src="/images/figma-services/mover-local-transportation.jpg"
              alt="Local transportation moving service"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
        </div>

        <div className="grid items-center gap-9 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="v2-surface relative mx-auto aspect-[520/315] w-full overflow-hidden md:order-1">
            <Image
              src="/images/figma-services/mover-dedicated-lorry.jpg"
              alt="Dedicated lorry service"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="max-w-[520px] md:order-2">
            <h3 className="text-2xl font-bold leading-tight text-[#121212] md:text-[28px]">
              Dedicated Lorry Service
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-[#1f1f1f]">
              Our dedicated lorry service offers exclusive vehicle usage
              under monthly or long-term contracts. Ideal for retail,
              logistics, and commercial businesses, this solution delivers
              stable capacity, predictable costs, and operational efficiency.
            </p>
            <div className="mt-6">
              <ServiceContactButtonV2 className="!h-10 !px-6 !text-xs">Contact Us</ServiceContactButtonV2>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="mx-auto max-w-[560px] text-center text-2xl font-bold leading-tight text-[#151515] md:text-4xl">
          Why Thousands Of Customers Have Chosen TSL Mover
        </h2>
        <div className="grid items-stretch gap-5 md:grid-cols-[340px_1fr]">
          <div className="v2-surface relative min-h-[390px] overflow-hidden">
            <Image
              src="/images/figma-services/mover-customer-trust.jpg"
              alt="TSL Mover customers"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 340px, 100vw"
            />
          </div>
          <ServiceFeatureGridV2 tone="alternate" columns={2} features={trustFeatures} />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-center text-xl font-bold leading-tight text-[#151515] md:text-2xl">
          We go the extra mile to give you top-notch services:
        </h2>
        <div className="v2-surface overflow-hidden border border-[#d7dce5] text-[12px] leading-relaxed text-[#121212]">
          <div className="grid grid-cols-[90px_1fr_1.25fr] bg-gold-gradient font-semibold">
            <div className="px-3 py-3" />
            <div className="border-l border-white/60 px-3 py-3">Other Movers</div>
            <div className="border-l border-white/60 px-3 py-3">TSL</div>
          </div>
          {comparisonRows.map((row) => (
            <div
              key={row[0]}
              className="grid grid-cols-[90px_1fr_1.25fr] border-t border-[#d7dce5] bg-white"
            >
              <div className="bg-[#f1db67] px-3 py-3 font-semibold">{row[0]}</div>
              <div className="border-l border-[#d7dce5] px-3 py-3">
                <span className="mr-1 text-base font-bold leading-none text-red-600">x</span>
                {row[1]}
              </div>
              <div className="border-l border-[#d7dce5] px-3 py-3">
                <span className="mr-1 text-base font-bold leading-none text-green-600">✓</span>
                {row[2]}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {trustStats.map((item) => (
          <article
            key={item.text}
            className="v2-surface flex min-h-[170px] flex-col items-center justify-center bg-white px-8 py-7 text-center shadow-[0_18px_50px_rgba(16,24,32,0.08)]"
          >
            <Image src={item.icon} alt="" width={44} height={44} className="mb-5 h-11 w-11 object-contain" />
            <p className="max-w-[230px] text-base font-semibold leading-[1.25] text-[#151515]">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="space-y-10">
        <h2 className="text-center text-2xl font-bold leading-tight text-[#151515] md:text-[28px]">
          From Booking To Moving In 4 Easy Steps!
        </h2>
        <div className="grid gap-x-6 gap-y-10 text-center sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-start">
          {bookingSteps.map((item, index) => {
            const Icon = item.icon;
            return (
              <Fragment key={item.title}>
                <article className="mx-auto flex max-w-[170px] flex-col items-center">
                  <div className="grid h-[76px] w-[76px] place-items-center rounded-full bg-gold-gradient text-[#121212] shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
                    <Icon size={30} strokeWidth={2.2} />
                  </div>
                  <h3 className="mt-5 text-sm font-bold leading-none text-[#151515]">{item.title}</h3>
                  <p className="mt-4 text-[11px] leading-[1.35] text-[#555]">{item.text}</p>
                </article>
                {index < bookingSteps.length - 1 && (
                  <div className="hidden pt-[28px] text-[#C8A84B] lg:block">
                    <ChevronRight size={28} strokeWidth={2.2} />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </section>

      <section className="v2-no-radius relative overflow-hidden bg-[#111111] px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1220px] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-[560px] space-y-5 text-white">
            <h2
              className="text-3xl font-bold leading-tight tracking-[-0.02em] md:text-5xl"
              style={{
                background: "var(--gold-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Get Your Quotation Now With TSL Mover Service
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-white/80 md:text-base">
              Submit your details and our team will get back to you with the right moving support.
            </p>
            <ServiceContactButtonV2>Contact Us</ServiceContactButtonV2>
          </div>
          <div className="v2-surface overflow-hidden">
            <TSLMoverQuoteForm />
          </div>
        </div>
      </section>
    </ServicePageLayoutV2>
  );
}
