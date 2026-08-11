/**
 * SEO data for the four business segments.
 *
 * `keywords` holds the full target list from the client's SEO plan (Section D).
 * It is rendered as <meta name="keywords">, which **Google has ignored since
 * 2009** — it is kept because the plan calls for the full list to be present,
 * not because it influences ranking. The terms that actually do work are the
 * ones promoted into each page's title, H1 and description.
 *
 * `serviceTypes` feeds Service JSON-LD and is deliberately narrower: structured
 * data must describe what the page actually says. Listing services the page
 * never mentions would breach Google's structured-data guidelines, so anything
 * the copy doesn't cover is left out here even when it appears in `keywords`.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tsllogistics.sg";

export interface SegmentSeo {
  /** Path the segment lives at, used to build the Service @id and url. */
  path: string;
  /** Service name as it should read in structured data. */
  serviceName: string;
  /** Short description reused by the Service schema. */
  serviceDescription: string;
  /** Full target keyword list for this segment. */
  keywords: string[];
  /** Service variants the page genuinely describes. */
  serviceTypes: string[];
}

export const segmentSeo = {
  logistics: {
    path: "/tsl-logistics",
    serviceName: "Container Haulage & Trucking",
    serviceDescription:
      "Licensed container haulage and trucking in Singapore, covering 20ft and 40ft containers, prime mover haulage, flatbed and lowbed transport, out-of-gauge cargo and dangerous goods trucking.",
    keywords: [
      "logistics company Singapore",
      "container haulage Singapore",
      "prime mover Singapore",
      "container transport Singapore",
      "haulage services Singapore",
      "container trucking Singapore",
      "container haulier Singapore",
      "project cargo haulage Singapore",
      "heavy lift haulage Singapore",
      "40 foot container haulage Singapore",
      "20 foot container trucking Singapore",
      "oversized cargo trucking Singapore",
      "out of gauge cargo Singapore",
      "flat rack container transport Singapore",
      "OOG container haulage Singapore",
    ],
    serviceTypes: [
      "Container Haulage",
      "Container Trucking",
      "Container Transport",
      "Prime Mover Haulage",
      "Flatbed Trailer Trucking",
      "Lowbed Trailer Trucking",
      "Out of Gauge (OOG) Cargo Transport",
      "Flat Rack Container Transport",
      "Oversized Cargo Trucking",
      "Heavy Lift Haulage",
      "Project Cargo Haulage",
      "Dangerous Goods (DG) Trucking",
    ],
  },

  express: {
    path: "/tsl-express",
    serviceName: "Dedicated Courier & Biker Service",
    serviceDescription:
      "Contract-based dedicated courier and motorbike rider services in Singapore, including optical supplies delivery and express ad hoc delivery.",
    keywords: [
      "motorbike courier Singapore",
      "medical courier Singapore",
      "medical delivery Singapore",
      "pharmaceutical delivery Singapore",
      "dedicated courier Singapore",
      "contract courier Singapore",
      "medical device delivery Singapore",
      "same day medical delivery Singapore",
      "hospital courier service Singapore",
      "clinic supplies delivery Singapore",
      "dedicated dispatch rider Singapore",
      "optical delivery service Singapore",
      "urgent pharmaceutical delivery Singapore",
      "contract biker service Singapore",
    ],
    // Medical, pharmaceutical, hospital and clinic delivery are omitted on
    // purpose: the page copy does not describe them today. Add them here once
    // the page covers those services.
    serviceTypes: [
      "Dedicated Courier Service",
      "Contract Courier Service",
      "Motorbike Courier Service",
      "Dedicated Dispatch Rider",
      "Contract Biker Service",
      "Dedicated Van Service",
      "Optical Supplies Delivery",
      "Express Ad Hoc Delivery",
    ],
  },

  warehousing: {
    path: "/warehousing-services",
    serviceName: "Warehousing Services",
    serviceDescription:
      "Secure general cargo warehousing in Singapore with flexible storage terms, inventory management, and value-added packing, sorting, labelling and handling.",
    keywords: [
      "warehousing Singapore",
      "warehousing services Singapore",
      "warehouse space Singapore",
      "warehouse storage rental Singapore",
      "lorry transport Singapore",
      "LCL shipping Singapore",
      "warehouse rental Singapore",
      "bonded warehouse Singapore",
      "3PL warehousing Singapore",
      "less than container load Singapore",
      "transport and warehousing Singapore",
      "lorry transport service Singapore",
      "LCL freight forwarding Singapore",
      "contract warehousing Singapore",
      "loose cargo consolidation Singapore",
    ],
    serviceTypes: [
      "Warehousing Services",
      "Warehouse Space Rental",
      "Warehouse Storage Rental",
      "Contract Warehousing",
      "General Cargo Storage",
      "Inventory Management",
      "Packing, Sorting and Labelling",
      "Loading and Unloading",
    ],
  },

  movers: {
    path: "/tsl-mover",
    serviceName: "House & Office Movers",
    serviceDescription:
      "Residential, office, commercial and factory moving services across Singapore, including international relocation and specialty items such as pianos, safes and machinery.",
    keywords: [
      "movers Singapore",
      "house movers Singapore",
      "office movers Singapore",
      "door to door moving company Singapore",
      "HDB movers Singapore",
      "cheap movers Singapore",
      "condo movers Singapore",
      "piano movers Singapore",
      "international movers Singapore",
      "factory movers Singapore",
      "commercial movers Singapore",
      "expat movers Singapore",
      "safe box movers Singapore",
      "specialty movers Singapore",
      "landed movers Singapore",
    ],
    serviceTypes: [
      "House Movers",
      "HDB Movers",
      "Condo Movers",
      "Landed Property Movers",
      "Office Movers",
      "Commercial Movers",
      "Factory Movers",
      "International Movers",
      "Piano Movers",
      "Safe Box Movers",
      "Specialty Movers",
      "Server and Machine Relocation",
    ],
  },
} satisfies Record<string, SegmentSeo>;

/** Build Service JSON-LD for a segment, tied to the site's Organization node. */
export function serviceLd(segment: SegmentSeo) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${segment.path}#service`,
    name: segment.serviceName,
    description: segment.serviceDescription,
    serviceType: segment.serviceTypes,
    url: `${SITE_URL}${segment.path}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Singapore" },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}/contact`,
      servicePhone: "+6567772724",
    },
  };
}
