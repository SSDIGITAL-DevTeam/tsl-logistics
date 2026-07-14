import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CheckCircle2, type LucideIcon } from "lucide-react";
import CtaBandV2 from "@/components/CtaBandV2";

export { serviceIcons } from "@/components/FigmaServiceContent";

type Feature = {
  title: string;
  text?: string;
  icon?: LucideIcon;
};

type ImageCard = {
  title: string;
  text?: string;
  image: string;
  alt: string;
};

export function ServiceContactButtonV2({
  children = "Contact Us",
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href="/contact"
      className={`inline-flex h-11 items-center justify-center rounded-full bg-gold-gradient px-7 text-sm font-bold text-[#121212] transition hover:opacity-90 ${className}`}
    >
      {children}
    </Link>
  );
}

export function ServiceSectionHeaderV2({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-[720px] text-center" : "max-w-[650px]"}>
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#9A7D2D]">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-bold leading-tight tracking-[-0.02em] text-[#151515] md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-[#555]">{subtitle}</p>
      )}
    </div>
  );
}

export function ServiceIntroV2({
  title,
  body,
  image,
  imageAlt,
}: {
  title: string;
  body: string[];
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
      <div>
        <h2 className="text-2xl font-bold leading-tight text-[#151515] md:text-4xl">{title}</h2>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#555] md:text-base">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="v2-surface relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 48vw, 100vw"
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}

export function ServiceSplitV2({
  eyebrow,
  title,
  subtitle,
  body = [],
  image,
  imageAlt,
  reverse,
  cta,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  body?: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
  cta?: string;
}) {
  return (
    <section className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
      <div className={reverse ? "md:order-2" : ""}>
        <ServiceSectionHeaderV2 eyebrow={eyebrow} title={title} subtitle={subtitle} align="left" />
        {body.length > 0 && (
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#555] md:text-base">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}
        {cta && (
          <div className="mt-7">
            <ServiceContactButtonV2>{cta}</ServiceContactButtonV2>
          </div>
        )}
      </div>
      <div className={`v2-surface relative aspect-[4/3] overflow-hidden ${reverse ? "md:order-1" : ""}`}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 48vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}

export function ServiceImageCardsV2({
  cards,
  imageFit = "cover",
}: {
  cards: ImageCard[];
  imageFit?: "cover" | "contain";
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {cards.map((card) => (
        <article
          key={card.title}
          className="v2-surface overflow-hidden bg-white shadow-[0_18px_50px_rgba(16,24,32,0.08)]"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={card.image}
              alt={card.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className={imageFit === "contain" ? "object-contain" : "object-cover"}
            />
          </div>
          <div className="p-6">
            <h3 className="text-base font-bold leading-snug text-[#151515] md:text-lg">
              {card.title}
            </h3>
            {card.text && (
              <p className="mt-2 text-sm leading-relaxed text-[#555]">{card.text}</p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function ServiceFeatureGridV2({
  features,
  tone = "plain",
  columns = 4,
}: {
  features: Feature[];
  tone?: "alternate" | "plain" | "circle";
  columns?: 2 | 3 | 4;
}) {
  const colsClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : "sm:grid-cols-2 lg:grid-cols-4";

  if (tone === "circle") {
    return (
      <div className={`grid gap-8 text-center ${colsClass}`}>
        {features.map((feature) => {
          const Icon = feature.icon ?? CheckCircle2;
          return (
            <article key={feature.title} className="mx-auto flex max-w-[210px] flex-col items-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-gold-gradient text-[#121212]">
                <Icon size={26} strokeWidth={2.2} />
              </div>
              <h3 className="mt-5 text-sm font-bold leading-tight text-[#151515]">{feature.title}</h3>
              {feature.text && (
                <p className="mt-2 text-xs leading-relaxed text-[#555]">{feature.text}</p>
              )}
            </article>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`grid gap-5 ${colsClass}`}>
      {features.map((feature, i) => {
        const Icon = feature.icon ?? CheckCircle2;
        const dark = tone === "alternate" && i % 2 === 0;
        const gold = tone === "alternate" && i % 2 === 1;
        return (
          <article
            key={feature.title}
            className={`v2-surface p-6 md:p-7 ${
              dark ? "bg-[#152642] text-white" : gold ? "text-[#121212]" : "bg-[#f7f8fa] text-[#151515]"
            }`}
            style={gold ? { background: "var(--gold-gradient)" } : undefined}
          >
            <Icon
              size={26}
              strokeWidth={2.2}
              className={dark ? "text-[#E5C96A]" : gold ? "text-[#121212]" : "text-[#9A7D2D]"}
            />
            <h3 className="mt-4 text-sm font-bold leading-snug">{feature.title}</h3>
            {feature.text && (
              <p className={`mt-2 text-xs leading-relaxed ${dark ? "text-white/75" : gold ? "opacity-90" : "text-[#555]"}`}>
                {feature.text}
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
}

export function ServiceClosingBandV2({
  title,
  body,
  cta = "Contact Us",
  ctaHref = "/contact",
  showCta = true,
  image,
  imageAlt,
  imageFullBleed = false,
}: {
  title: string;
  body: string;
  cta?: string;
  ctaHref?: string;
  /** Set to false to hide the CTA button entirely. */
  showCta?: boolean;
  /** Overrides the default brand truck photo — use when it doesn't fit the page's context. */
  image?: string;
  imageAlt?: string;
  /** Fills the whole image side edge-to-edge instead of a contained rounded card. */
  imageFullBleed?: boolean;
}) {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <CtaBandV2
        title={title}
        body={body}
        cta={cta}
        ctaHref={ctaHref}
        imageFullBleed={imageFullBleed}
        {...(showCta ? {} : { ctaSlot: false })}
        {...(image ? { image } : {})}
        {...(imageAlt ? { imageAlt } : {})}
      />
    </div>
  );
}
