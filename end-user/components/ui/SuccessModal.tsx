"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface SuccessModalProps {
  title: string;
  message: string;
  reloadDelayMs?: number;
}

const EXIT_DURATION_MS = 250;

export default function SuccessModal({ title, message, reloadDelayMs = 2500 }: SuccessModalProps) {
  const [phase, setPhase] = useState<"enter" | "visible" | "exit">("enter");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const raf = requestAnimationFrame(() => setPhase("visible"));
    const exitTimer = window.setTimeout(
      () => setPhase("exit"),
      Math.max(reloadDelayMs - EXIT_DURATION_MS, 0),
    );
    const reloadTimer = window.setTimeout(() => {
      window.location.reload();
    }, reloadDelayMs);

    return () => {
      document.body.style.overflow = "";
      cancelAnimationFrame(raf);
      window.clearTimeout(exitTimer);
      window.clearTimeout(reloadTimer);
    };
  }, [reloadDelayMs]);

  if (typeof document === "undefined") return null;

  const visible = phase === "visible";

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-5">
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`relative z-10 w-full max-w-[400px] bg-white p-8 text-center shadow-2xl transition-all duration-300 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#C8A84B]/10 text-3xl text-[#C8A84B]">
          &#10003;
        </div>
        <p className="text-lg font-bold text-[#1a1a1a]">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-[#555]">{message}</p>
      </div>
    </div>,
    document.body,
  );
}
