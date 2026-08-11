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
        // Decorative: the <h1> below renders this exact string, so a non-empty
        // alt would make screen readers announce the title twice.
        alt=""
        fill
        priority
        sizes="100vw"
        className={`object-cover ${imagePosition}`}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0f1923]/65" />
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Sized for keyword phrases, not single words. The old
            text-3xl/md:text-5xl with tracking-widest was built for titles like
            "LOGISTICS"; headings such as "Container Haulage & Trucking
            Singapore" overflowed the 280px hero at that scale. */}
        <h1
          className="mx-auto max-w-[18ch] text-2xl md:text-4xl font-bold text-white uppercase tracking-wide text-center px-4 drop-shadow-lg leading-[1.15]"
          style={{ textWrap: "balance" }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
