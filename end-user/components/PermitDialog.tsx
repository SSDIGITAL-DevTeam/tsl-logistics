"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const permitContent = [
  {
    heading: "Import Permit Applications",
    items: [
      "Import permit for dutiable goods (intoxicating liquors, tobacco products, motor vehicles, petroleum products).",
      "Import permit for non-dutiable goods.",
    ],
  },
  {
    heading: "Export & Transshipment Permit Applications (with or without Certificate of Origin)",
    items: [
      "Export of locally manufactured goods",
      "Re-export (transshipment) permit",
      "Temporary export of goods for re-import",
    ],
  },
  {
    heading: "Temporary Consignment Import (Temporary Import Scheme)",
    items: [
      "Import of controlled or non-controlled trade samples for exhibition/trade",
      "Temporary import for repair",
      "Re-imported goods after temporary export",
    ],
  },
  {
    heading: "Application for Preferential Certificate of Origin\n(Customs Form D, E, AK, CECA, etc.)\nProcessed through:",
    items: [
      "Singapore Customs",
      "Singapore Chinese Chamber of Commerce and Industry",
      "Singapore Indian Chamber of Commerce and Industry",
      "Singapore International Chamber of Commerce",
      "Singapore Malay Chamber of Commerce and Industry",
      "Singapore Manufacturing Federation",
    ],
  },
  {
    heading: "Shut Out Permit",
    items: ["Calling back a shipment to the exporter"],
  },
  {
    heading: "Hand Carry Export Permit Application",
    items: ["For goods exiting Singapore within 12 hours after the permit is granted"],
  },
  {
    heading: "Storage Permit for Licensed Warehouse",
    items: ["Storing imported dutiable goods for an indefinite period in a designated area licensed by Singapore Customs"],
  },
  {
    heading: "Major Exporter Scheme (MES) Permit Application",
    items: ["Importing non-dutiable goods with GST suspended"],
  },
  {
    heading: "Goods Handling Declarations",
    items: ["For all modes of transport"],
  },
];

function Dialog({ onClose }: { onClose: () => void }) {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel — bottom sheet on mobile, centered modal on md+ */}
      <div className="relative bg-white w-full md:max-w-[580px]-2xl shadow-2xl flex flex-col max-h-[88svh] md:max-h-[80vh] z-10 animate-sheet-up md:animate-none">

        {/* Drag handle (mobile only) */}
        <div className="md:hidden flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-4 pb-4 border-b border-gray-100 shrink-0">
          <h3 className="font-bold text-[#1a1a1a] text-lg">Document &amp; Permit Processing</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors text-[#555]"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-6 py-5 flex-1 text-sm text-[#333] leading-relaxed space-y-4">
          {permitContent.map((section, i) => (
            <div key={i}>
              <p className="font-semibold text-[#1a1a1a] whitespace-pre-line mb-1.5">{section.heading}</p>
              <ul className="space-y-1.5 pl-1">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-[#C8A84B] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 shrink-0 flex justify-end">
          <button onClick={onClose} className="btn-pill-gold !py-2.5 !px-7 !text-sm">
            Understand
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PermitDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center bg-white hover:bg-gray-50 text-[#1a1a1a] font-semibold py-3 px-7 text-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]"
      >
        Show permit process
      </button>

      {open && typeof document !== "undefined" && createPortal(
        <Dialog onClose={() => setOpen(false)} />,
        document.body
      )}
    </>
  );
}
