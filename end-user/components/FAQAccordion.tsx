"use client";

import { useRef, useState } from "react";
import { ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What services do you offer?",
    answer: `As a leading logistics company in Singapore, we offer a comprehensive range of logistics services, including:
    <ul class="list-disc pl-5 mt-2 space-y-1">
      <li>Transportation</li>
      <li>Warehousing</li>
      <li>Distribution</li>
      <li>Freight forwarding</li>
      <li>Supply chain management</li>
    </ul>`,
  },
  {
    question: "What regions do you operate in?",
    answer: "We have a global reach, operating across various regions and continents to meet the diverse needs of our clients. If you are looking for a reliable logistics solution provider with extensive international reach and a proven track record, TSL Logistics can help.",
  },
  {
    question: "What industries do you specialise in serving?",
    answer: "We specialise in serving a wide range of industries, including retail, manufacturing, healthcare, automotive, technology, and more. Whether you are looking to send your goods across borders or within Singapore, we can help. We also have the expertise to handle dangerous goods (DG) and perishable goods.",
  },
  {
    question: "Should I use air or sea freight to transport my cargo?",
    answer: `It depends on the goods you wish to transport. Consider the following:
    <ul class="list-disc pl-5 mt-2 space-y-1">
      <li>Urgency (air freight is faster)</li>
      <li>Cost (sea freight is generally cheaper)</li>
      <li>Cargo type (perishables vs. dry goods)</li>
      <li>Destination</li>
    </ul>
    <p class="mt-2">If in doubt, speak to our logistics experts at TSL Logistics; we are here to help.</p>`,
  },
  {
    question: "How do you ensure the timely delivery of goods?",
    answer: "We utilise advanced tracking systems, efficient route planning, and strategic partnerships to ensure the timely delivery of goods to their destinations. As a top logistics service provider in Singapore, we understand the importance of timely delivery of goods for your business.",
  },
  {
    question: "What type of transportation do you offer?",
    answer: "We offer a variety of transportation options, including road, rail, air, and sea freight, to accommodate different shipping requirements. We also have our own fleet of containers and tankers for operations that require long- or short-haul services, and we specialise in local delivery services.",
  },
  {
    question: "Are there any free trade agreements (FTAs) Singapore has that can benefit my business?",
    answer: "Singapore has numerous FTAs. Visit the Ministry of Trade and Industry website to find agreements relevant to your specific trade.",
  },
  {
    question: "What are the import and export regulations in Singapore?",
    answer: "The import-export regulations vary by product category, and all goods imported into Singapore are regulated under the Customs Act, the Goods and Services Tax (GST) Act, and the Regulation of Imports and Exports Act. Give us a call to learn more about the regulations applicable to your cargo.",
  },
  {
    question: "What are the documents required for customs clearance in Singapore?",
    answer: `The standard documents include:
    <ul class="list-disc pl-5 mt-2 space-y-1">
      <li>Commercial invoice</li>
      <li>Packing list</li>
      <li>Bill of lading</li>
      <li>Certificate of origin</li>
    </ul>
    <p class="mt-2">Additional documents may be needed depending on specific goods.</p>`,
  },
  {
    question: "Do you offer customs clearance services?",
    answer: "Yes, we provide comprehensive customs clearance services to facilitate smooth import and export processes across international borders. Partner with TSL Logistics, your trusted logistics company in Singapore, and we will ensure a hassle-free operation from start to finish.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="space-y-2">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex items-center justify-between w-full px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors duration-150"
            >
              <h3 className="font-semibold text-[#1a1a1a] text-sm md:text-base pr-4">
                {faq.question}
              </h3>
              {/* Gold circle chevron button */}
              <span
                className="w-8 h-8 flex items-center justify-center shrink-0 rounded-full transition-all duration-200"
                style={{ background: "var(--gold-gradient)" }}
              >
                <ChevronUp
                  size={16}
                  className={`text-[#1a1a1a] transition-transform duration-200 ${isOpen ? "rotate-0" : "rotate-180"}`}
                />
              </span>
            </button>

            <div
              ref={(el) => { contentRefs.current[i] = el; }}
              className="accordion-content"
              style={{ maxHeight: isOpen ? `${contentRefs.current[i]?.scrollHeight ?? 1000}px` : "0px" }}
            >
              <div
                className="px-6 py-5 bg-gray-50 text-sm text-[#555] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
