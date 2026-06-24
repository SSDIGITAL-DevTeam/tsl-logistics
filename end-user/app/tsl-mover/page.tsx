import type { Metadata } from "next";
import Image from "next/image";
import ServicePageLayout from "@/components/ServicePageLayout";

export const metadata: Metadata = {
  title: "TSL Mover | Professional Moving Services Singapore | TSL Logistics",
  description:
    "TSL Mover is a full-service moving and storage company offering packing, dismantling, moving, and storage services for residential and commercial needs.",
};

const movers = [
  {
    img: "/images/TSL Moving Furniture-1920w.jpeg",
    alt: "Office relocation services",
    title: "RESIDENTIAL (HDB, CONDO, LANDED PROPERTY) / OFFICE / COMMERCIAL / FACTORY MOVING",
    text: "Right beside you from wherever you are, then alongside every step of the way to wherever you're going. We've got your journey and you covered.",
  },
  {
    img: "/images/TSL-Heavy-Furniture-1920w.jpeg",
    alt: "Office relocation in singapore",
    title: "SERVER / MACHINE / PIANO / ORGAN / POOL TABLE / SAFE BOX MOVING",
    text: "Fragile? Priceless heirloom? Antiques? Your sentimental belongings are treated like our own --- with utmost care and placed exactly like they left.",
  },
];

const features = [
  "Professional, trained, and experienced movers",
  "Full packing and unpacking services",
  "Dismantling and reassembling of furniture",
  "Careful handling of fragile and valuable items",
  "Disposal of unwanted items",
  "Flexible scheduling to suit your timeline",
  "Transparent, all-inclusive pricing",
  "Insurance coverage for peace of mind",
];

const enquiryOptions = [
  "Residential moving (HDB, Condo, Landed)",
  "Office / Commercial moving",
  "Factory moving",
  "Piano / Safe box moving",
  "Others",
];

export default function TSLMoverPage() {
  return (
    <ServicePageLayout title="TSL Mover" image="/images/service-warehousing.jpg" enquiryOptions={enquiryOptions} source="tsl-mover">
      {/* Description */}
      <div className="text-center mb-12">
        <p className="text-[#555] leading-relaxed max-w-3xl mx-auto mb-4">
          TSL Mover is a full-service moving and storage company offering from packing, dismantling to moving,
          disposal of your unwanted items, and storage for the contents of your home, your office, your warehouse,
          your manufacturing facility, and your tradeshows.
        </p>
        <p className="text-[#555] leading-relaxed max-w-3xl mx-auto">
          If you&rsquo;re searching for a moving company to make your next move a worry-free experience, choose TSL
          Mover. Our moving experts will take good care of you and your belongings from the moment you first call us
          right until your final box is unloaded.
        </p>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 stagger-grid">
        {movers.map((item, i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="aspect-[16/9] relative overflow-hidden">
              <Image
                src={item.img}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 border-t-2 border-[#C8A84B]">
              <h3 className="font-bold text-[#C8A84B] text-sm mb-3 leading-snug">{item.title}</h3>
              <p className="text-[#555] text-sm leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#252525]">
            Why Thousands Of Customers Have Chosen TSL Mover
          </h2>
          <div className="gold-divider" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-[#C8A84B]/30 transition-colors">
              <span className="w-6 h-6 rounded-full bg-[#C8A84B] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
              <span className="text-[#252525] text-sm leading-relaxed">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured logos */}
      <div className="mb-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#252525]">We Are Featured On</h2>
          <div className="gold-divider" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { src: "/images/Exped2BMoving2BFive2BStar2BCustomer2BReviews-1920w.png", alt: "5 Star Reviews" },
            { src: "/images/sgcm_logo-1920w.jpg", alt: "SGCM Logo" },
            { src: "/images/SPCA2020202128Transparent29-1280w.png", alt: "SPCA" },
            { src: "/images/bizSAFE-Enterprise-Level-STAR-e1633345808369-1920w.jpeg", alt: "BizSAFE" },
          ].map((logo, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-4 flex items-center justify-center bg-white h-28 shadow-sm hover:shadow-md hover:border-[#C8A84B]/30 transition-all duration-200">
              <Image src={logo.src} alt={logo.alt} width={160} height={80} className="object-contain max-h-16 w-auto" />
            </div>
          ))}
        </div>
      </div>
    </ServicePageLayout>
  );
}

