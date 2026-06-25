import Image from "next/image";

const certifications = [
  {
    src: "/images/bizSAFE-Enterprise-Level-STAR-e1633345808369-1920w.jpeg",
    alt: "BizSAFE Enterprise Level Star",
  },
  { src: "/images/STA-Logo-1920w.png", alt: "STA Member" },
  {
    src: "/images/ISO-45001-VERTICAL-SAC-1920w.jpeg",
    alt: "ISO 45001 SAC Certified",
  },
  {
    src: "/images/ISO-45001-VERTICAL-SAC copy-1920w.jpeg",
    alt: "ISO 45001 Certified",
  },
];

export default function CompaniesThatMoveWithUs() {
  return (
    <section className="border-t border-gray-100 bg-white py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-10 text-center anim-fade-up">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C8A84B]">
            Our credentials
          </p>
          <h2 className="text-2xl font-bold text-[#1a1a1a] md:text-3xl">
            Companies That Move With Us
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-6 anim-fade-up md:grid-cols-4">
          {certifications.map((cert) => (
            <div
              key={cert.src}
              className="group flex items-center justify-center p-4"
            >
              <Image
                src={cert.src}
                alt={cert.alt}
                width={200}
                height={200}
                className="h-[100px] w-full object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
