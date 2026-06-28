"use client";

import { useState } from "react";
import { Headphones, Mail, MessageCircle, X } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/6567772724?text=Hi%20TSL%20Logistics%2C%20I%20would%20like%20to%20make%20an%20enquiry.";

function ChatBubbleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M59.9 24.5c-25.8 0-44.5 17.5-44.5 39.3 0 9 3 17.1 8.5 23.5v18.1c0 4.6 5.1 7.3 8.9 4.7l14.5-9.5c4 1.2 8.2 1.9 12.6 1.9 25.8 0 44.7-17.3 44.7-38.7 0-21.8-18.9-39.3-44.7-39.3Z"
        fill="currentColor"
      />
      <circle cx="43" cy="63" r="6.5" fill="#1f3a70" />
      <circle cx="60" cy="63" r="6.5" fill="#1f3a70" />
      <circle cx="77" cy="63" r="6.5" fill="#1f3a70" />
    </svg>
  );
}

export default function FloatingHelpWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-[90] flex flex-col items-end gap-2.5 md:bottom-6 md:right-6">
      {open && (
        <div className="w-[calc(100vw-2rem)] max-w-[280px] overflow-hidden rounded-xl border border-[#1f3a70]/20 bg-[#f7f8fa] shadow-lg">
          <div className="flex items-center justify-between bg-[#1f3a70] px-4 py-3.5 text-white">
            <div className="flex items-center gap-2.5">
              <Headphones size={20} strokeWidth={2.2} />
              <h2 className="text-base font-bold leading-tight">
                We Are Ready To Help You
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close help options"
              className="ml-2 grid h-7 w-7 shrink-0 place-items-center rounded-full text-white/85 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-3 px-4 py-4">
            <a
              href="mailto:sales@tsllogistics.sg"
              className="group flex min-h-11 items-center gap-3 rounded-r-md border-l-4 border-[#1f3a70] bg-white px-3 text-[#1f3a70] transition hover:bg-[#f9fbff] focus:outline-none focus:ring-2 focus:ring-[#1f3a70]"
            >
              <Mail size={20} strokeWidth={2.1} />
              <span className="text-sm font-semibold">Email Us</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-11 items-center gap-3 rounded-r-md border-l-4 border-[#1f3a70] bg-white px-3 text-[#1f3a70] transition hover:bg-[#f9fbff] focus:outline-none focus:ring-2 focus:ring-[#1f3a70]"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#25D366] text-white">
                <MessageCircle size={15} strokeWidth={2.4} />
              </span>
              <span className="text-sm font-semibold">
                Chat on WhatsApp
              </span>
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={open ? "Close help options" : "Open help options"}
        className="grid h-12 w-12 place-items-center rounded-full bg-[#1f3a70] text-white shadow-lg transition hover:bg-[#18315f] focus:outline-none focus:ring-4 focus:ring-[#1f3a70]/30 active:scale-95 md:h-[52px] md:w-[52px]"
      >
        {open ? <X size={20} /> : <ChatBubbleIcon className="h-8 w-8" />}
      </button>
    </div>
  );
}
