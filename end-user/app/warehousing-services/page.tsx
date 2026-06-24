import type { Metadata } from "next";
import Image from "next/image";
import ServicePageLayout from "@/components/ServicePageLayout";

export const metadata: Metadata = {
  title: "Warehousing Services Singapore | Storage Solutions | TSL Logistics",
  description:
    "TSL Logistics offers state-of-the-art warehousing services in Singapore with advanced security, inventory management, and flexible storage solutions.",
};

const enquiryOptions = [
  "General warehousing / storage",
  "Inventory management",
  "Order fulfilment",
  "Customised warehousing solutions",
  "Others",
];

const facilities = [
  {
    title: "High-Capacity",
    text: "Our warehouse services in Singapore can handle large volumes of inventory, making them ideal for businesses with fluctuating storage requirements.",
  },
  {
    title: "Secure and Monitored",
    text: "Our facilities are equipped with advanced security systems, including surveillance cameras and access controls, to ensure the safety of your goods.",
  },
];

const warehouseServices = [
  {
    title: "Inventory Management",
    text: "Our advanced inventory management systems help you keep track of stock levels, anticipate demand, and optimise your supply chain.",
  },
  {
    title: "Order Fulfilment",
    text: "From order processing to packing and shipping, we offer seamless order fulfilment services that ensure timely delivery to your customers.",
  },
  {
    title: "Customised Solutions",
    text: "We work closely with you to understand your unique needs and tailor our warehousing services in Singapore to meet your specific requirements.",
  },
];

const expertiseReasons = [
  { label: "Industry Experience", text: "With a proven track record in safe and reliable warehousing and logistics, we have the knowledge and experience to handle a broad range of goods." },
  { label: "Advanced Technology", text: "We leverage the latest technology to streamline processes, enhance visibility, and improve accuracy in inventory management." },
  { label: "Skilled Team", text: "Our team of warehousing experts is dedicated to providing personalised service and finding solutions that drive your business forward." },
];

const customerReasons = [
  { label: "Collaboration", text: "We believe in collaboration, and therefore we work closely with our clients to develop strategies that align with their goals." },
  { label: "Flexible Solutions", text: "Our flexible warehousing options allow you to scale your storage needs up or down based on seasonal demand, without the burden of long-term commitments." },
  { label: "Transparency", text: "We provide you with real-time access to inventory data and updates, allowing you to make informed decisions about your stocks." },
];

export default function WarehousingServicesPage() {
  return (
    <ServicePageLayout title="Warehousing Services" image="/images/TSL Logistics Warehouse-1920w.jpeg" enquiryOptions={enquiryOptions} source="warehousing-services">
      {/* Hero image */}
      <div className="aspect-[16/6] relative overflow-hidden rounded-lg mb-10 shadow">
        <Image
          src="/images/TSL Logistics Warehouse-1920w.jpeg"
          alt="Warehousing services Singapore"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Intro */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-[#555] leading-relaxed mb-4">
          Want to store your products and goods, but don&rsquo;t know where? Have you run out of storage space and now
          need urgent warehousing space? Well, we can definitely help!
        </p>
        <p className="text-[#555] leading-relaxed">
          We understand that effective warehousing is a cornerstone of any successful business operation. With over 20
          years of industry experience in logistics and warehousing in Singapore, we have developed a deep understanding
          of the challenges businesses face when it comes to storage, inventory management, and distribution. Partner
          with TSL Logistics for tailored warehousing solutions for operational efficiency to drive your business growth.
        </p>
      </div>

      {/* Facilities */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center text-[#252525] mb-8">
          Our Facilities – State-of-the-Art Warehousing in Singapore
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facilities.map((f, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="w-10 h-10 bg-[#C8A84B] rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-bold text-sm">{i + 1}</span>
              </div>
              <h3 className="font-bold text-[#C8A84B] mb-3">{f.title}</h3>
              <p className="text-[#555] text-sm leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center text-[#252525] mb-8">
          Our Services – Warehousing Services in Singapore
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {warehouseServices.map((s, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-[#C8A84B] mb-3">{s.title}</h3>
              <p className="text-[#555] text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose TSL */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center text-[#252525] mb-8">Why Choose TSL Logistics?</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Expertise block */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="font-bold text-[#C8A84B] text-lg mb-4">Expertise and Reliability</h3>
            <div className="space-y-4">
              {expertiseReasons.map((r, i) => (
                <div key={i}>
                  <p className="font-bold text-[#252525] text-sm">{r.label}</p>
                  <p className="text-[#555] text-sm leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Customer-centric block */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="font-bold text-[#C8A84B] text-lg mb-4">Customer-Centric Approach</h3>
            <div className="space-y-4">
              {customerReasons.map((r, i) => (
                <div key={i}>
                  <p className="font-bold text-[#252525] text-sm">{r.label}</p>
                  <p className="text-[#555] text-sm leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ServicePageLayout>
  );
}

