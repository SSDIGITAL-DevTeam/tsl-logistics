import Image from "next/image";
import type { ReactNode } from "react";
import {
  Boxes,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  Forklift,
  LucideIcon,
  MapPinned,
  PackageCheck,
  Route,
  ShieldCheck,
  Truck,
  Warehouse,
  Zap,
} from "lucide-react";

type IntroProps = {
  title: string;
  body: string[];
  image: string;
  imageAlt: string;
};

type ImageCard = {
  title: string;
  text?: string;
  image: string;
  alt: string;
};

type Feature = {
  title: string;
  text?: string;
  icon?: LucideIcon;
};

type SplitSectionProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  body?: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
  features?: Feature[];
  cta?: string;
};

export const serviceIcons = {
  boxes: Boxes,
  calendar: CalendarClock,
  check: CheckCircle2,
  clipboard: ClipboardCheck,
  clock: Clock3,
  file: FileCheck2,
  forklift: Forklift,
  map: MapPinned,
  package: PackageCheck,
  route: Route,
  shield: ShieldCheck,
  truck: Truck,
  warehouse: Warehouse,
  zap: Zap,
};

export function FigmaContactButton({ children = "Contact Us" }: { children?: string }) {
  return (
    <a
      href="/contact"
      className="inline-flex h-[38px] min-w-[150px] items-center justify-center rounded-full bg-gold-gradient px-6 text-[12px] font-bold text-[#121212] shadow-[0_1px_2px_rgba(25,33,61,0.08)] transition hover:opacity-90"
    >
      {children}
    </a>
  );
}

export function FigmaIntro({ title, body, image, imageAlt }: IntroProps) {
  return (
    <section className="grid items-center gap-8 md:grid-cols-[411px_1fr] md:gap-[68px]">
      <div className="relative aspect-[411/410] overflow-hidden rounded-[27px] bg-[#e1e1e1]">
        <Image src={image} alt={imageAlt} fill sizes="(min-width: 768px) 48vw, 100vw" className="object-cover" priority />
      </div>
      <div>
        <h2 className="mb-7 text-3xl font-extrabold leading-[1.3] text-[#121212] md:text-[53px]">{title}</h2>
        <div className="space-y-4 text-sm leading-[1.5] text-[#121212] md:text-[20px]">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FigmaSectionHeader({
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
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h2 className="text-2xl font-extrabold leading-[1.3] text-[#121212] md:text-[40px]">{title}</h2>
      {subtitle && <p className="mt-3 text-sm leading-[1.5] text-[#121212] md:text-[16px]">{subtitle}</p>}
    </div>
  );
}

export function FigmaSplitSection({ eyebrow, title, subtitle, body = [], image, imageAlt, reverse, features, cta }: SplitSectionProps) {
  return (
    <section className="grid items-center gap-8 md:grid-cols-[1fr_1.03fr] md:gap-[68px]">
      <div className={reverse ? "md:order-2" : ""}>
        <FigmaSectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} align="left" />
        {body.length > 0 && (  
          <div className="mt-7 space-y-4 text-sm leading-[1.5] text-[#121212] md:text-[20px]">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}
        {cta && <div className="mt-8"><FigmaContactButton>{cta}</FigmaContactButton></div>}
        {features && <FigmaFeatureGrid features={features} compact className="mt-6" />}
      </div>
      <div className={`relative aspect-[616/418] overflow-hidden rounded-[27px] bg-[#e1e1e1] ${reverse ? "md:order-1" : ""}`}>
        <Image src={image} alt={imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
    </section>
  );
}

export function FigmaImageCards({ cards, columns = 2 }: { cards: ImageCard[]; columns?: 2 | 3 }) {
  return (
    <div className={`grid gap-6 ${columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
      {cards.map((card) => (
        <article key={card.title} className="bg-white">
          <div className="relative aspect-[619/440] overflow-hidden rounded-[28px] bg-[#e1e1e1]">
            <Image src={card.image} alt={card.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 hover:scale-105" />
          </div>
          <div className="pt-5">
            <h3 className="text-lg font-bold leading-[1.5] text-[#121212] md:text-[24px]">{card.title}</h3>
            {card.text && <p className="mt-2 text-sm leading-[1.5] text-[#121212]">{card.text}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}

export function FigmaFeatureGrid({
  features,
  compact = false,
  className = "",
}: {
  features: Feature[];
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={`grid gap-4 ${compact ? "sm:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-4"} ${className}`}>
      {features.map((feature) => {
        const Icon = feature.icon ?? CheckCircle2;
        return (
          <article key={feature.title} className="rounded-[25px] bg-[#f5f5f5] p-6 text-[#121212]">
            <div className="mb-4 flex h-[54px] w-[54px] items-center justify-center rounded-full bg-gold-gradient text-[#1a1a1a]">
              <Icon size={28} strokeWidth={2.2} />
            </div>
            <h3 className="text-base font-semibold leading-[1.3] text-[#121212] md:text-[20px]">{feature.title}</h3>
            {feature.text && <p className="mt-2 text-sm leading-[1.4] text-[#121212] md:text-[16px]">{feature.text}</p>}
          </article>
        );
      })}
    </div>
  );
}

export function FigmaBand({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <section className={`px-5 py-10 md:-mx-4 md:px-10 md:py-14 ${dark ? "rounded-[30px] bg-[#1a3263] text-white" : "bg-[#f5f5f5]"}`}>
      {children}
    </section>
  );
}

export function FigmaServiceShell({ children }: { children: ReactNode }) {
  return <div className="space-y-20 md:space-y-28">{children}</div>;
}
