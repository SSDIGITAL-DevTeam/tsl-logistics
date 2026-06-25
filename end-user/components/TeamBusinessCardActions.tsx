"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Copy, Mail, PhoneCall, Share2 } from "lucide-react";

type Props = {
  name: string;
  role: string;
  phone: string;
  email: string;
};

function ActionLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-12 w-12 place-items-center rounded-full bg-gold-gradient text-[#121212] transition-opacity hover:opacity-90"
    >
      {children}
    </a>
  );
}

export default function TeamBusinessCardActions({
  name,
  role,
  phone,
  email,
}: Props) {
  const canShare = useSyncExternalStore(
    () => () => {},
    () => typeof navigator !== "undefined" && Boolean(navigator.share),
    () => false,
  );
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: `${name} | Digital Business Card`,
      text: `${name} - ${role}`,
      url,
    };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="relative mb-5">
      <div className="flex justify-center gap-3">
        <ActionLink href={`tel:${phone.replace(/\s/g, "")}`} label="Call">
          <PhoneCall size={20} strokeWidth={2.2} />
        </ActionLink>
        <ActionLink href={`mailto:${email}`} label="Email">
          <Mail size={20} strokeWidth={2.2} />
        </ActionLink>
        <button
          type="button"
          aria-label={canShare ? "Share" : "Copy link"}
          onClick={handleShare}
          className="grid h-12 w-12 place-items-center rounded-full bg-gold-gradient text-[#121212] transition-opacity hover:opacity-90"
        >
          {canShare ? (
            <Share2 size={20} strokeWidth={2.2} />
          ) : copied ? (
            <Check size={20} strokeWidth={2.2} />
          ) : (
            <Copy size={20} strokeWidth={2.2} />
          )}
        </button>
      </div>

      {copied && (
        <div className="absolute left-1/2 top-[calc(100%+10px)] z-10 -translate-x-1/2 rounded-full bg-[#1a1a1a] px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
          Link copied
        </div>
      )}
    </div>
  );
}
