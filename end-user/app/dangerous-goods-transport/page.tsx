import type { Metadata } from "next";
import Image from "next/image";
import ServicePageLayout from "@/components/ServicePageLayout";

export const metadata: Metadata = {
  title: "TSL DG Trucking – Dangerous Goods Handling Singapore | TSL Logistics",
  description:
    "TSL Logistics specialises in dangerous goods (DG) trucking in Singapore. SCDF-certified vehicles, 24/7 monitoring, and full regulatory compliance.",
};

const enquiryOptions = [
  "Chemicals and liquids transport",
  "Gases (LPG/LNG) transport",
  "Flammable substances transport",
  "Toxic / infectious substances transport",
  "Others",
];

const dgServices = [
  {
    title: "Chemicals and Liquids",
    text: "We have the expertise to transport a variety of chemicals and liquids, ensuring proper packaging, labelling, and documentation to meet regulatory compliance.",
  },
  {
    title: "Gases",
    text: "Our team is skilled in handling compressed and liquefied gases, taking into account all applicable safety requirements for both LPG and LNG cargo handling.",
  },
  {
    title: "Flammable Substances",
    text: "We understand the intricacies of transporting flammable materials and take all necessary precautions to prevent accidents.",
  },
  {
    title: "Toxic and Infectious Substances",
    text: "When transporting toxic or infectious substances, we follow stringent guidelines to protect our team, the public, and the environment.",
  },
];

const whyChoose = [
  {
    title: "Regulatory Compliance",
    text: "We stay up-to-date with the latest regulations and guidelines governing the transportation of dangerous goods. Our team ensures full compliance throughout the process.",
  },
  {
    title: "Specialised Training",
    text: "Our drivers and staff undergo specialised training to handle dangerous goods safely and effectively, reducing the risk of accidents.",
  },
  {
    title: "Best Safety Practices",
    text: "All our trailers and prime movers carry the orange plate (DG Plate) ensuring regulatory compliance and the safety of our drivers and the public when transporting hazardous materials.",
  },
  {
    title: "SCDF-Certified Vehicles",
    text: "Our prime movers and trucks are Singapore Civil Defence certified. SCDF approval ensures that our vehicles meet the safety and regulatory standards necessary for the transportation of hazardous materials.",
  },
  {
    title: "24/7 Monitoring",
    text: "Our tracking and monitoring systems allow us to keep a constant eye on your cargo's progress, ensuring its safe arrival at its destination.",
  },
  {
    title: "Custom Solutions",
    text: "We understand that each shipment is unique. Our team works closely with you to develop tailored transportation solutions that meet your specific requirements.",
  },
  {
    title: "Peace of Mind",
    text: "With our comprehensive insurance coverage, you can have peace of mind knowing that your hazardous materials are protected in the event of unforeseen circumstances.",
  },
];

export default function DangerousGoodsTransportPage() {
  return (
    <ServicePageLayout
      title="TSL DG Trucking – Dangerous Goods Handling"
      enquiryOptions={enquiryOptions}
      source="dangerous-goods-transport"
    >
      {/* Hero image */}
      <div className="aspect-[16/6] relative overflow-hidden rounded-lg mb-10 shadow">
        <Image
          src="/images/TSL Logistics DG TRUCK-1920w.png"
          alt="Dangerous goods DG trucking Singapore"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Intro */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-[#555] leading-relaxed mb-4">
          &ldquo;Dangerous Goods Trucking&rdquo; is a specialised service that involves the transportation of hazardous
          materials such as explosives, flammables, and other toxic, corrosive, and radioactive materials. TSL
          Logistics, as a trusted logistics solution provider, understands the intricacy and complexity of this
          specialised field of cargo handling.
        </p>
        <p className="text-[#555] leading-relaxed">
          With over 20 years of industry experience under our belt, you can trust us for all your industrial
          requirements for DG Trucking in Singapore. At TSL Logistics, we adapt to both your own needs and the load
          requirements.
        </p>
      </div>

      {/* Trusted Partner */}
      <div className="bg-gray-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-[#C8A84B] mb-4">
          TSL Logistics: Your Trusted Partner in DG Trucking in Singapore
        </h2>
        <p className="text-[#555] leading-relaxed mb-4">
          Safety, compliance, and reliability are at the core of everything we do. Our dedicated team of experts has
          mastered the art of transporting dangerous goods in accordance with strict local and international
          regulations.
        </p>
        <p className="text-[#555] leading-relaxed">
          Trust us to transport your dangerous goods securely and responsibly, minimising risks to both the environment
          and public safety. We aim to set the industry standard for excellence in dangerous goods transportation and
          warehousing services in Singapore.
        </p>
      </div>

      {/* DG Services */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center text-[#252525] mb-8">Our Services</h2>
        <p className="text-[#555] text-center mb-6 max-w-2xl mx-auto">
          As a leading provider of industrial transportation in Singapore, we offer a range of specialised services
          tailored to the transportation of dangerous goods, including the following:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dgServices.map((s, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-[#F05921] rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-xs">{i + 1}</span>
                </div>
                <h3 className="font-bold text-[#C8A84B]">{s.title}</h3>
              </div>
              <p className="text-[#555] text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center text-[#252525] mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whyChoose.map((item, i) => (
            <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-lg">
              <span className="text-[#C8A84B] font-bold text-xl leading-none mt-0.5 shrink-0">✓</span>
              <div>
                <h3 className="font-bold text-[#252525] mb-1">{item.title}</h3>
                <p className="text-[#555] text-sm leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ServicePageLayout>
  );
}

