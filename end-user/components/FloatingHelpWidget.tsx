"use client";

import { useState } from "react";
import { Headphones, Mail, X } from "lucide-react";

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

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="h-7 w-7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.4 27.1 7 21.3a11.3 11.3 0 1 1 4.2 4.1l-5.8 1.7Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 10.8c-.3-.8-.6-.8-.9-.8h-.8c-.3 0-.8.1-1.2.6-.4.5-1.5 1.5-1.5 3.6s1.6 4.2 1.8 4.5c.2.3 3.1 4.9 7.6 6.6 3.7 1.5 4.5 1.2 5.3 1.1.8-.1 2.6-1.1 3-2.1.4-1 .4-1.9.3-2.1-.1-.2-.4-.3-.9-.6l-2.7-1.3c-.4-.2-.8-.3-1.1.3-.3.5-1.2 1.5-1.5 1.8-.3.3-.5.4-1 .1-.4-.2-1.9-.7-3.6-2.2-1.3-1.2-2.2-2.6-2.5-3.1-.3-.5 0-.7.2-1 .2-.2.5-.5.7-.8.2-.3.3-.5.5-.8.2-.3.1-.6 0-.8l-1.2-2.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function FloatingHelpWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-3 md:bottom-7 md:right-7">
      {open && (
        <div className="w-[calc(100vw-2rem)] max-w-[330px] overflow-hidden rounded-[18px] border-2 border-[#222] bg-[#f4f4f4] shadow-2xl">
          <div className="flex items-center justify-between bg-[#1f3a70] px-5 py-5 text-white">
            <div className="flex items-center gap-3">
              <Headphones size={28} strokeWidth={2.4} />
              <h2 className="text-xl font-bold leading-tight">
                We Are Ready To Help You
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close help options"
              className="ml-2 grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/85 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4 px-5 py-6">
            <a
              href="mailto:sales@tsllogistics.sg"
              className="group flex min-h-[56px] items-center gap-4 rounded-r-lg border-l-[6px] border-[#1f3a70] bg-white px-4 text-[#1f3a70] transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1f3a70]"
            >
              <Mail size={28} strokeWidth={2.1} />
              <span className="text-xl font-medium">Email Us</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[56px] items-center gap-4 rounded-r-lg border-l-[6px] border-[#1f3a70] bg-white px-4 text-[#1f3a70] transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1f3a70]"
            >
              <WhatsAppIcon />
              <span className="text-xl font-medium">
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
        className="grid h-14 w-14 place-items-center rounded-full bg-[#1f3a70] text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-[#18315f] focus:outline-none focus:ring-4 focus:ring-[#1f3a70]/30 active:scale-95 md:h-16 md:w-16"
      >
        {open ? <X size={26} /> : <ChatBubbleIcon className="h-10 w-10 md:h-11 md:w-11" />}
      </button>
    </div>
  );
}
