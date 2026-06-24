"use client";

import { useState } from "react";
import Image from "next/image";
import ServicePageLayout from "@/components/ServicePageLayout";

const services = [
  {
    label: "Container, Truck and Tanker Haulier Services",
    img: "/images/TSL Logistics Trucker Container-1920w.png",
    content: `Whether you need long or short haulier services, or whether you need to rent heavy duty tanker trucks to transport your precious cargo safely to its destination; TSL Services is your number one source for all your transportation needs.

Our fleet is ideal for hauling heavy loads of goods and materials, and for safely transporting industrial and commercial chemical across any distance. Regardless of what your needs are, our experts will advise you on the best and most cost-effective haulier solution for your unique needs.

We pride ourselves on the our track record of safety, and take great pleasure in the fact that our fleet of trailers and tanker trucks are rated as one of the safest in the industry. And that gives our clients the added peace of mind of doing business with us.

But by far, our greatest asset is our seasoned and highly trained staff. With a highly experienced team of dedicated drivers, planners and logistics experts, we are proud to say that our team is able to deliver personalised service for any type of haulier requirement that you may have.

At the end of the day, we don't just provide haulier solutions – we deliver total peace of mind!`,
  },
  {
    label: "Rentals of Transportation Vehicles",
    img: "/images/TSL Rental Vehicle-1280w.png",
    content: `The business of logistics is very complex and dynamic, and that explains the high competitiveness in the logistics industry. For over 12 years, TSL has been earning customer appreciation for the innovative and diverse logistics solutions we have been offering.

We are able to provide a diverse range of transportation services, whether it's by lorries or trucks of various sizes. Simply speak to one of our knowledgeable staff and discuss your transportation needs with them. Together, we'll come up with the perfect solution.

And for those of you that want to "drive it yourself", we even offer 20/40 footer rentals so you can manage your transportation challenge on your budget and your terms!`,
  },
  {
    label: "DG Trucking (Dangerous Goods) Trucking",
    img: "/images/TSL Logistics DG TRUCK-1920w.png",
    content: `While shipping dangerous goods, it is crucial to take into account the potential adverse effects of temperature, pressure and humidity variations, as well as the risk of damage due to vibrations and improper handling. TSL Logistics specializes in all aspects of the transport of dangerous goods from identification to packaging, marking, labeling and documentation.

We handle nearly every class of dangerous goods such as Chemicals, Petroleum products, Liquefied gases, Aerosols, Batteries, Infectious substances, etc. Goods can be collected and delivered by SGS in-house or third-party courier company.`,
  },
  {
    label: "Warehousing",
    img: "/images/TSL Logistics Warehouse-1920w.jpeg",
    content: `Want to store your products and goods, but don't know where? Run out of storage space and now need urgent warehousing space? Well, we can definitely help!

At TSL we have some of the most well equipped warehousing facilities in the region to store products and goods of various types. Your assets will remain safe and protected, no matter how long you need us to house them – that's our guarantee!

Time is of essence in the logistics business – and our team understands that. Our highly trained crew members are experts at ensuring that your material is stored in the best way possible, and that you are able to access them without delay.`,
  },
  {
    label: "Optical Supply and Delivery",
    img: "/images/Optical-TSL-Logistics-1920w.jpeg",
    content: `Optical supplies are extra sensitive. Whether it's glass lenses or eyeglass frames or contact lenses, they require tact, care and extra sensitivity to handle. To date, not many logistics companies are willing to offer this option as they lack the capability and resources to deliver these items due to the rigidness of this task.

Here at TSL, we have perfected the art of optical delivery and supply down to a science. Our carriers are highly trained in handling your optical supplies, and are extremely careful to protect your investment from damage or destruction.

If you want your optical supplies to be delivered in one piece, safe and sound, then TSL is your partner in whom you can place your unbreakable trust in!`,
  },
  {
    label: "Local Delivery",
    img: "/images/TSL-Logistics-van-1920w.jpeg",
    content: `With one of the largest teams of delivery agents that are intimately familiar with the local area, TSL offers its customers unparalleled local dispatch and delivery services across the region.

Our delivery crew has been trained to handle packages and materials of all kinds. Most of all, we take customer service very personally. You'll find our agent to be courteous, knowledgeable and extremely helpful. But most importantly, whether it's a local pickup or delivery, you'll find our agents are always punctual.

If your business relies on punctuality and dependability, then TSL's local delivery service is just what you need!`,
  },
  {
    label: "Project Distribution",
    img: "/images/TSL-Projects-1920w.jpeg",
    content: `Do you have an important project where time sensitive dispatches could mean success or failure? If your success depends on ensuring that the right products, documents or other materials get to the right place at the right time, then TSL can be your perfect partner. If your clients are expecting a delivery…we'll ensure they receive it on schedule.

We have a team of dedicated riders/delivery personnel that know the city inside-out. Whether it's bad weather, construction, road blockage or any other challenge, our crew will ensure that they distribute your packages citywide – on time, every time.`,
  },
];

const enquiryOptions = [
  "Container, truck and tanker haulier services",
  "Rentals of transportation vehicles",
  "Dangerous goods trucking",
  "Warehousing",
  "Optical supply delivery",
  "Local delivery",
  "Project distribution",
  "Documentation & permit processing",
  "Others",
];

function TSLLogisticsContent() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="text-center mb-8">
        <p className="text-[#555] leading-relaxed max-w-3xl mx-auto">
          TSL Logistics is a full-service moving and storage company offering from packing, dismantling to moving,
          disposal of your unwanted items, and storage for the contents of your home, your office, your warehouse,
          your manufacturing facility, and your tradeshows.
        </p>
        <p className="text-[#555] leading-relaxed max-w-3xl mx-auto mt-4">
          If you&rsquo;re searching for a moving company to make your next move a worry-free experience, choose TSL
          Logistics. Our moving experts will take good care of you and your belongings from the moment you first
          call us right until your final box is unloaded.
        </p>
      </div>

      {/* Tab navigation */}
      <div className="flex flex-col lg:flex-row gap-0 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {/* Sidebar tabs */}
        <div className="lg:w-72 shrink-0 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200">
          {services.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`w-full text-left px-5 py-4 text-sm font-medium border-b border-gray-200 last:border-0 transition-all flex items-center gap-2 ${
                activeTab === i
                  ? "bg-[#1E1E1E] text-white border-l-4 border-l-[#C8A84B]"
                  : "text-[#252525] hover:bg-gray-100 border-l-4 border-l-transparent"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1">
          <div className="aspect-[16/7] relative overflow-hidden">
            <Image
              src={services[activeTab].img}
              alt={services[activeTab].label}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          <div className="p-6 md:p-8">
            <h4 className="font-bold text-[#C8A84B] text-xl mb-1">{services[activeTab].label}</h4>
            <div className="gold-divider-left mb-4" />
            {services[activeTab].content.split("\n\n").map((para, i) => (
              <p key={i} className="text-[#555] text-sm leading-relaxed mb-3">{para}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TSLLogisticsPage() {
  return (
    <ServicePageLayout title="TSL Logistics" image="/images/service-mover.jpg" enquiryOptions={enquiryOptions} source="tsl-logistics">
      <TSLLogisticsContent />
    </ServicePageLayout>
  );
}

