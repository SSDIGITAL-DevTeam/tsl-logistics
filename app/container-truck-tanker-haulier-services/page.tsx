import type { Metadata } from "next";
import Image from "next/image";
import ServicePageLayout from "@/components/ServicePageLayout";

export const metadata: Metadata = {
  title: "Container Trucking Services Singapore | Heavy Duty Tanker Trucks Rental | TSL Logistic",
  description:
    "TSL Logistics' reliable container trucking services in Singapore ensure efficient, haulier company & logistics solutions for your cargo. Contact us today!",
};

const enquiryOptions = [
  "Container trucking (FCL/LCL)",
  "Flatbed / lowbed trailer services",
  "Tanker haulage",
  "Heavy cargo transportation",
  "Others",
];

const services = [
  {
    title: "Container Transportation",
    text: "We specialise in transporting containers of various sizes, ensuring your cargo reaches its destination safely and on time. We are constantly ranked amongst the best for container transport in Singapore.",
  },
  {
    title: "Flatbed and Lowbed Trailers/Trucks",
    text: "Whether it's heavy machinery or oversized goods, our flatbed and lowbed trucks are equipped to handle diverse cargo types. Our fleet includes 20ft and 40ft flatbed trailers and extendable flatbed trailers for multi-usage.",
  },
  {
    title: "Tanker Haulage",
    text: "Safely transport liquids and hazardous materials with our dedicated tanker fleet, managed by experts adhering to strict safety regulations. Partner with TSL Logistics to work with the best tanker haulier services in Singapore.",
  },
];

const whyChoose = [
  {
    title: "Experienced Drivers",
    text: "Our skilled drivers undergo rigorous training and have hands-on experience transporting diverse cargo types. They are specifically trained to expertly manoeuvre different transportation vehicles to meet varied requirements.",
  },
  {
    title: "Safety First",
    text: "We prioritise the safety of your cargo and comply with strict safety regulations to ensure risk-free transportation, making us your preferred haulier company in Singapore.",
  },
  {
    title: "On-Time Delivery",
    text: "With a commitment to punctuality, we strive to meet delivery schedules, keeping your supply chain running smoothly and disruption-free.",
  },
  {
    title: "Custom Solutions",
    text: "Whether you require a tanker haulier service at short notice or are looking to build a long-term partnership, we always have the perfect solution for you.",
  },
  {
    title: "Customer Support",
    text: "Our dedicated customer support team is available to address your inquiries and concerns promptly. Inquisitive about what value additions we can bring to your business? Speak to our logistics and transport specialists today!",
  },
];

export default function ContainerTruckTankerPage() {
  return (
    <ServicePageLayout title="Container, Truck, and Tanker Haulier Services" enquiryOptions={enquiryOptions}>
      {/* Hero image */}
      <div className="aspect-[16/6] relative overflow-hidden rounded-lg mb-10 shadow">
        <Image
          src="/images/TSL Logistics Trucker Container-1920w.png"
          alt="Container trucking services Singapore"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Intro */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-[#555] leading-relaxed mb-4">
          Whether you need long or short haulier services or you are looking for a heavy-duty tanker truck rental to
          transport your precious cargo safely to its destination, TSL Logistics is the number one choice for all
          container trucking services in Singapore.
        </p>
        <p className="text-[#555] leading-relaxed">
          Our fleet is ideal for hauling heavy loads of goods and materials and for safely transporting industrial and
          commercial cargo across any distance. Regardless of what your needs are, our experts will advise you on the
          best and most cost-effective haulier solution for your unique needs.
        </p>
      </div>

      {/* Trusted haulier section */}
      <div className="bg-gray-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-[#C8A84B] mb-4">
          TSL Logistics – Your Trusted Haulier Company in Singapore
        </h2>
        <p className="text-[#555] leading-relaxed mb-4">
          We pride ourselves on our track record of safety, and take great pleasure in the fact that our fleet of
          trailers and tanker trucks are rated as one of the safest in the industry. With a highly experienced team of
          dedicated drivers, planners, and logistics experts, we are proud to say that our team is able to deliver
          personalised service for any type of haulier requirement that you may have.
        </p>
        <p className="text-[#555] leading-relaxed">
          At the end of the day, we don&rsquo;t just provide haulier solutions &ndash; we deliver total peace of mind!
        </p>
      </div>

      {/* Our Services */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center text-[#252525] mb-8">
          Our Services – Comprehensive Haulier Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="w-10 h-10 bg-[#C8A84B] rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-sm">{i + 1}</span>
              </div>
              <h3 className="font-bold text-[#C8A84B] mb-3">{s.title}</h3>
              <p className="text-[#555] text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose TSL */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center text-[#252525] mb-8">Why Choose TSL Logistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whyChoose.map((item, i) => (
            <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-lg">
              <span className="text-[#F05921] font-bold text-xl leading-none mt-0.5 shrink-0">✓</span>
              <div>
                <h3 className="font-bold text-[#252525] mb-1">{item.title}</h3>
                <p className="text-[#555] text-sm leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Closing CTA text */}
      <div className="text-center bg-[#1E1E1E] text-white rounded-lg p-8">
        <h2 className="text-xl font-bold mb-3">
          TSL Logistics for All Your Container Trucking Services in Singapore
        </h2>
        <p className="text-white/90 text-sm leading-relaxed max-w-2xl mx-auto">
          Ready to experience reliable container, truck, and tanker haulier services with TSL Logistics? From cargo
          preparation and load optimisation to route planning and beyond, our meticulous planning will ensure that you
          receive the best service for your logistics requirements. Contact us today for more information on how we can
          drive your growth forward.
        </p>
      </div>
    </ServicePageLayout>
  );
}

