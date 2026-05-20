"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

interface ContactFormProps {
  enquiryOptions?: string[];
  source?: string;
}

const defaultOptions = [
  "Trucking, warehousing (TSL Logistics)",
  "Moving enquiry (TSL Movers)",
  "Express moving (TSL Express)",
  "Others",
];

export default function ContactForm({
  enquiryOptions = defaultOptions,
  source = "contact",
}: ContactFormProps) {
  const pathname = usePathname();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    enquiry: "",
    message: "",
    website: "", // honeypot — must stay empty
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source,
          pagePath: pathname,
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-[#C8A84B] text-5xl mb-4">&#10003;</div>
        <p className="font-semibold text-[#252525] text-lg">Thank you for contacting us.</p>
        <p className="text-[#555] mt-2">We will get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — hidden from humans, bots fill it */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => setForm({ ...form, website: e.target.value })}
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#252525] mb-1">Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your full name"
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:border-[#C8A84B] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#252525] mb-1">Phone <span className="text-red-500">*</span></label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+65 9123 4567"
            className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:border-[#C8A84B] focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#252525] mb-1">Email <span className="text-red-500">*</span></label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com"
          className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:border-[#C8A84B] focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#252525] mb-1">Type of Enquiry</label>
        <select
          value={form.enquiry}
          onChange={(e) => setForm({ ...form, enquiry: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:border-[#C8A84B] focus:outline-none bg-white"
        >
          <option value="" disabled hidden>Select an enquiry type</option>
          {enquiryOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#252525] mb-1">Message</label>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us more about your enquiry..."
          className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:border-[#C8A84B] focus:outline-none resize-y"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-[#C8A84B] hover:bg-[#111111] disabled:opacity-60 text-white font-semibold py-3 px-8 rounded uppercase text-sm tracking-wide transition-colors"
      >
        {loading ? "Sending..." : "SUBMIT"}
      </button>
    </form>
  );
}
