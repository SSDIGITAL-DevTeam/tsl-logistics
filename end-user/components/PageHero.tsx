import Image from "next/image";

interface PageHeroProps {
  title: string;
  /** Optional keyword phrase shown under the title, e.g. the short brand word
   * "Logistics" as title with "Container Haulage & Trucking Singapore" here. */
  subtitle?: string;
  image?: string;
  imagePosition?: string;
}

export default function PageHero({
  title,
  subtitle,
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
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        {/* Sized for keyword phrases, not single words. The old
            text-3xl/md:text-5xl with tracking-widest was built for titles like
            "LOGISTICS"; headings such as "Container Haulage & Trucking
            Singapore" overflowed the 280px hero at that scale. Now that those
            phrases live in `subtitle` instead, `title` is short again — this
            size still comfortably fits either case. */}
        <h1
          className="mx-auto max-w-[18ch] text-2xl md:text-4xl font-bold text-white uppercase tracking-wide text-center drop-shadow-lg leading-[1.15]"
          style={{ textWrap: "balance" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mx-auto mt-2 max-w-[36ch] text-center text-sm md:text-base font-medium text-white/85 drop-shadow-lg"
            style={{ textWrap: "balance" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
