import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

// Reusable dark CTA band used across v2 (Footer, Home's Permit section,
// service pages' closing band) — solid near-black background, gold-gradient
// headline text, gold pill CTA, and a gold panel with the truck photo on the
// right (same image everywhere, a recurring "brand hero" shot rather than a
// per-section photo).
export default function CtaBandV2({
  eyebrow,
  title = "Quick & Reliable",
  body = "We deliver fast, secure, and dependable logistics solutions that help businesses move goods efficiently while maintaining complete visibility and confidence throughout the shipping process.",
  cta = "Call Us Today",
  ctaHref = "tel:+6567772724",
  ctaSlot,
  image = "/images/group-1000005860.png",
  imageAlt = "TSL Logistics truck with container",
  imageFullBleed = false,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  cta?: string;
  ctaHref?: string;
  /** Overrides the default Link CTA — use for a non-link trigger like a dialog. */
  ctaSlot?: ReactNode;
  image?: string;
  imageAlt?: string;
  /** Fills the whole image side edge-to-edge instead of a contained rounded card. */
  imageFullBleed?: boolean;
  className?: string;
}) {
  return (
    <section className={`relative overflow-hidden bg-[#111111] px-5 py-14 md:px-10 md:py-20 ${className}`}>
      <div className="mx-auto grid max-w-[1220px] items-center gap-10 md:grid-cols-2">
        <div className="relative z-10 max-w-[560px]">
          {eyebrow && (
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#E5C96A]">{eyebrow}</p>
          )}
          <h2
            className="text-4xl font-bold leading-tight tracking-[-0.02em] md:text-5xl"
            style={{
              background: "var(--gold-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </h2>
          <p className="mt-5 max-w-[500px] text-sm leading-relaxed text-white/80 md:text-base">{body}</p>
          <div className="mt-8">
            {ctaSlot ?? (
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-4 text-sm font-bold text-[#121212] transition hover:opacity-90 active:scale-[0.98]"
              >
                {cta} <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>

        {imageFullBleed ? (
          <div className="relative -mx-5 h-64 sm:h-80 md:absolute md:inset-y-0 md:right-0 md:mx-0 md:h-auto md:w-1/2">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] md:aspect-[16/11]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
}
