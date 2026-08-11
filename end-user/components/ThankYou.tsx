import Link from "next/link";
import LeadConversion from "@/components/LeadConversion";
import { copyForSource } from "@/lib/leadConversion";

interface ThankYouProps {
  /** Precise lead source, e.g. "warehousing-services". Drives the copy. */
  source: string;
  /** Ads account group, e.g. "tsl-mover", or "general" for non-service leads. */
  group: string;
  leadId: string;
}

export default function ThankYou({ source, group, leadId }: ThankYouProps) {
  const copy = copyForSource(source);

  return (
    <>
      {/* Renders nothing — pushes the conversion event once, then burns the
          cookie that got the visitor onto this page. */}
      <LeadConversion source={source} group={group} leadId={leadId} />

      {/* No PageHero here on purpose: this page is a dead end in the funnel, so
          it gets no banner competing with the confirmation. The generous
          vertical padding is what keeps it off the header instead. */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[640px] px-6 text-center">
          {/* Same gold check disc as the SuccessModal this page replaced, so the
              confirmation reads as the same moment in the flow. */}
          <div
            aria-hidden="true"
            className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-[#C8A84B]/10 text-3xl text-[#C8A84B]"
          >
            &#10003;
          </div>

          <p className="text-[#C8A84B] text-xs font-bold uppercase tracking-[0.22em] mb-2">
            Enquiry Received
          </p>
          {/* h1, not h2: with PageHero gone this is the page's only top-level
              heading, and every page needs one for screen readers. */}
          <h1 className="text-[#1a1a1a] text-3xl md:text-4xl font-bold mb-4">{copy.heading}</h1>
          <p className="text-[#555] leading-relaxed">{copy.message}</p>

          <p className="mt-6 text-sm text-[#555] leading-relaxed">
            Need to speak to someone now? Call us at{" "}
            <a href="tel:+6567772724" className="font-bold text-[#C8A84B] hover:underline">
              +65 6777 2724
            </a>{" "}
            (Monday&ndash;Friday, 9am&ndash;5pm).
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center bg-[#C8A84B] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-[#1a1a1a] transition-colors hover:bg-[#9A7D2D]"
            >
              Back to Home
            </Link>
            {copy.ctaHref !== "/" && (
              <Link
                href={copy.ctaHref}
                className="inline-flex items-center border border-[#C8A84B] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-[#9A7D2D] transition-colors hover:bg-[#C8A84B]/10"
              >
                {copy.ctaLabel}
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
