import ServicePageLayoutV2 from "@/components/ServicePageLayoutV2";
import {
  ServiceClosingBandV2,
  ServiceFeatureGridV2,
  ServiceIntroV2,
  ServiceSectionHeaderV2,
  ServiceSplitV2,
  serviceIcons,
} from "@/components/ServiceBlocksV2";

const enquiryOptions = [
  "Optical supply delivery",
  "Express ad hoc delivery",
  "Dedicated van service",
  "Dedicated biker service",
  "Others",
];

const idealFor = [
  { title: "Urgent or last-minute shipments", icon: serviceIcons.clock },
  { title: "One-off deliveries outside regular schedules", icon: serviceIcons.route },
  { title: "Documents, parcels, and time-critical cargo", icon: serviceIcons.file },
  { title: "Businesses needing speed without long-term obligations", icon: serviceIcons.zap },
];

export default function TSLExpressV2() {
  return (
    <ServicePageLayoutV2
      title="TSL Express"
      image="/images/service-express.jpg"
      enquiryOptions={enquiryOptions}
      source="tsl-express"
    >
      <ServiceIntroV2
        title="TSL Express"
        image="/images/figma-services/express-intro-new.jpg"
        imageAlt="TSL Express delivery"
        body={[
          "We provide dedicated delivery services for optical supplies, ensuring secure and accurate transport from laboratories to optical shops and clinics.",
          "With trained, dedicated riders and consistent delivery schedules, we help your operations run smoothly without delays or errors. Backed by our industry familiarity and dependable service standards, TSL Express is a logistics partner you can rely on every day.",
        ]}
      />

      <ServiceSplitV2
        eyebrow="Optical Supply Delivery"
        title="Optical Supplies Delivery You Can Trust"
        image="/images/figma-services/express-optical.png"
        imageAlt="Optical supply delivery"
        body={[
          "Optical supplies demand precision, care, and expert handling. At TSL Logistics, our specially trained carriers ensure glass lenses, frames, and contact lenses are transported safely and securely. With proven expertise and meticulous handling, we protect your optical goods from damage - delivering them intact, reliable, and worry-free every time.",
        ]}
        cta="Contact Us"
      />

      <ServiceSplitV2
        title="Express Ad Hoc Delivery"
        image="/images/figma-services/express-adhoc-new.jpg"
        imageAlt="Express ad hoc delivery"
        body={[
          "Our express ad hoc delivery service is designed for urgent, one-off shipments that require speed and flexibility. With fast dispatch and adaptable scheduling, we handle last-minute or unexpected deliveries - no long-term contracts required.",
          "From critical documents to time-sensitive cargo, our agile team ensures safe, accurate, and on-time delivery without compromise.",
        ]}
        cta="Contact Us"
      />

      <section className="space-y-9">
        <ServiceSectionHeaderV2 title="Ideal For" />
        <ServiceFeatureGridV2 tone="circle" columns={4} features={idealFor} />
      </section>

      <ServiceSplitV2
        title="Dedicated Van / Bikers Service (Contract Based)"
        image="/images/figma-services/express-dedicated-new.jpg"
        imageAlt="Dedicated van and bikers service"
        body={[
          "We provide contract-based dedicated van and biker services designed for businesses that require reliable, high-frequency daily deliveries. With assigned vehicles and professional riders operating exclusively for your operations, we help you maintain consistent service quality, optimized delivery routes, and faster last-mile performance.",
          "This solution gives you greater control, predictable costs, and the confidence that your deliveries are handled by a team fully aligned with your operational standards.",
        ]}
        cta="Contact Us"
      />

      <ServiceClosingBandV2
        title="TSL Express: Fast, Reliable Logistics You Can Trust"
        body="Ready to experience seamless shipping and delivery with TSL Express? Whether you need urgent courier services, freight forwarding, or comprehensive logistics solutions, our dedicated team ensures your goods arrive safely and on time, every time. Let us handle the logistics - so you can focus on growing your business."
        cta="Contact Us"
        ctaHref="/contact"
      />
    </ServicePageLayoutV2>
  );
}
