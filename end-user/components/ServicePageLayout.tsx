import ContactForm from "./ContactForm";
import PageHero from "./PageHero";

interface ServicePageLayoutProps {
  title: string;
  /** Keyword phrase shown under the hero title, e.g. "Container Haulage & Trucking Singapore". */
  subtitle?: string;
  image?: string;
  children: React.ReactNode;
  enquiryOptions?: string[];
  showContactForm?: boolean;
  ctaVariant?: "dark" | "quote";
  source?: string;
  /** Set to false to drop the trailing "Service" word in the request form heading. */
  requestFormServiceSuffix?: boolean;
}

export default function ServicePageLayout({
  title,
  subtitle,
  image,
  children,
  enquiryOptions,
  showContactForm = true,
  source = "service",
  requestFormServiceSuffix = true,
}: ServicePageLayoutProps) {
  return (
    <>
      <PageHero title={title} subtitle={subtitle} image={image} />

      {/* ── Page Content ── */}
      <div className="pt-14 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          {children}
        </div>
      </div>

      {/* ── Request Form ── */}
      {showContactForm && (
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-[720px] mx-auto px-4">
            <div className="text-center mb-8">
              <p className="eyebrow mb-2">Get a Quote</p>
              <h2 className="text-xl md:text-2xl font-bold text-[#252525]">
                Request for TSL {title}{requestFormServiceSuffix ? " Service" : ""}
              </h2>
              <div className="gold-divider" />
            </div>
            <div className="bg-white border border-gray-100 shadow-sm p-6 md:p-8">
              <ContactForm enquiryOptions={enquiryOptions} source={source} />
            </div>
          </div>
        </section>
      )}

    </>
  );
}
