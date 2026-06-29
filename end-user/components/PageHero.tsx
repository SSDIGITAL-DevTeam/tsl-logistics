import Image from "next/image";

interface PageHeroProps {
  title: string;
  image?: string;
  imagePosition?: string;
}

export default function PageHero({
  title,
  image = "/images/hero-bg-new.jpg",
  imagePosition = "object-center",
}: PageHeroProps) {
  return (
    <div className="relative h-[220px] md:h-[280px] overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className={`object-cover ${imagePosition}`}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0f1923]/65" />
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest text-center px-4 drop-shadow-lg">
          {title}
        </h1>
      </div>
    </div>
  );
}
