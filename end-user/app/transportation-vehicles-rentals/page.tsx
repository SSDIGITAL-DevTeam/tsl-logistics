import type { Metadata } from "next";
import Image from "next/image";
import ServicePageLayout from "@/components/ServicePageLayout";

export const metadata: Metadata = {
  title: "TSL Transportation Vehicle Rentals Singapore | Truck & Van Rental | TSL Logistics",
  description:
    "TSL Logistics offers a full range of vehicle rental services in Singapore including cargo vans, box trucks, and tanker trucks for industrial and commercial needs.",
};

const enquiryOptions = [
  "Cargo van rental",
  "Box truck rental",
  "Tanker truck rental",
  "20/40-footer rental",
  "Others",
];

const fleet = [
  {
    title: "Cargo Vans",
    text: "Perfect for small to medium-sized deliveries, our cargo vans provide versatility and efficiency.",
  },
  {
    title: "Box Trucks",
    text: "Our box trucks offer ample space and security for transporting large loads and valuable goods.",
  },
  {
    title: "Tanker Trucks",
    text: "Secure the safety and purity of your liquid and bulk cargo with our specialised tanker trucks, equipped to maintain optimal conditions throughout transportation.",
  },
];

const reasons = [
  {
    title: "Quality Fleet",
    text: "Our vehicles are regularly inspected and maintained to ensure they are in peak condition, minimising the risk of breakdowns and delays.",
  },
  {
    title: "Experienced Drivers",
    text: "Our skilled and professional drivers are trained to handle various types of cargo and navigate diverse routes with precision.",
  },
  {
    title: "Flexibility",
    text: "We understand that business needs can change rapidly. Our flexible rental options allow you to adjust your transportation requirements as needed.",
  },
  {
    title: "Customer-Centric Approach",
    text: "Your satisfaction is our priority. We work closely with you to understand your unique needs and provide tailored solutions.",
  },
  {
    title: "Cost-Effective",
    text: "With transparent pricing and no hidden fees, our services offer excellent value for your transportation budget.",
  },
];

export default function TransportationVehicleRentalsPage() {
  return (
    <ServicePageLayout title="Vehicle Rentals" image="/images/TSL Rental Vehicle-1920w.png" enquiryOptions={enquiryOptions} source="vehicle-rentals">
      {/* Hero image */}
      <div className="aspect-[16/6] relative overflow-hidden rounded-lg mb-10 shadow">
        <Image
          src="/images/TSL Rental Vehicle-1280w.png"
          alt="Transportation vehicle rentals Singapore"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Intro */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-[#555] leading-relaxed mb-4">
          Are you looking for reliable and efficient transportation solutions for your business? At TSL Logistics, we
          specialise in providing top-quality vehicle rental services for industrial and commercial transportation,
          tailored to meet your unique requirements.
        </p>
        <p className="text-[#555] leading-relaxed">
          With a fleet of modern and well-maintained vehicles and a team of well-trained drivers, we will ensure
          seamless and cost-effective transportation of your goods to their final destination. Partner with TSL
          Logistics, your trusted transport company in Singapore.
        </p>
      </div>

      {/* Role section */}
      <div className="bg-gray-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-[#C8A84B] mb-4">Role of Transportation and How We Can Help</h2>
        <p className="text-[#555] leading-relaxed">
          As a leading logistics moving company, we take pride in offering a comprehensive range of vehicles that cater
          to a wide spectrum of industries. With decades of experience in the field, we have gained a deep
          understanding of the logistical challenges businesses face and have developed solutions to address them
          effectively. Speak to our specialists today to discuss your unique vehicle rental needs.
        </p>
      </div>

      {/* Fleet */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center text-[#252525] mb-4">Our Fleet</h2>
        <h3 className="text-lg font-semibold text-center text-[#555] mb-8">Wide Range of Vehicles for Every Need</h3>
        <p className="text-[#555] text-center mb-4 max-w-2xl mx-auto">
          From compact vans for smaller loads and spacious trucks for bulk transportation to special tankers for DG
          trucking in Singapore, we have the right vehicle to match your requirements.
        </p>
        <p className="text-[#555] text-center mb-8 max-w-2xl mx-auto">
          And for those of you that want to &ldquo;drive it yourself&rdquo;, we even offer 20/40-footer rentals so you
          can manage your transportation challenge on your budget and your terms!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fleet.map((v, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-[#C8A84B] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">{i + 1}</span>
              </div>
              <h3 className="font-bold text-[#C8A84B] mb-3">{v.title}</h3>
              <p className="text-[#555] text-sm leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center text-[#252525] mb-2">
          TSL Logistics – Your Trusted Transport Company in Singapore
        </h2>
        <h3 className="text-lg font-semibold text-center text-[#555] mb-8">Why Choose Us?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reasons.map((r, i) => (
            <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-lg">
              <span className="text-[#C8A84B] font-bold text-xl leading-none mt-0.5 shrink-0">✓</span>
              <div>
                <h3 className="font-bold text-[#252525] mb-1">{r.title}</h3>
                <p className="text-[#555] text-sm leading-relaxed">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center bg-[#1E1E1E] text-white rounded-lg p-8">
        <h2 className="text-xl font-bold mb-3">Get in Touch with TSL Logistics Today!</h2>
        <p className="text-white/90 text-sm leading-relaxed max-w-2xl mx-auto">
          Ready to elevate your business&rsquo;s transportation solutions to the next level? Let our expert team help
          you. Contact us today to discuss your requirements and receive a personalised quote. Experience hassle-free
          industrial transportation in Singapore with TSL Logistics.
        </p>
      </div>
    </ServicePageLayout>
  );
}

