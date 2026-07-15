"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import CustomSelect from "./ui/CustomSelect";
import PhoneInput, { isPhoneValueValid } from "./ui/PhoneInput";
import SuccessModal from "./ui/SuccessModal";

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

const NAME_PATTERN = /^[\p{L}][\p{L}\s'.-]{1,99}$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({
  enquiryOptions = defaultOptions,
  source = "contact",
}: ContactFormProps) {
  const pathname = usePathname();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    enquiry: "",
    message: "",
    _h: "", // honeypot — must stay empty
  });

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!NAME_PATTERN.test(form.name.trim())) {
      errors.name = "Enter a valid name (letters only, 2-100 characters).";
    }
    if (!EMAIL_PATTERN.test(form.email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    if (!isPhoneValueValid(form.phone)) {
      errors.phone = "Enter a valid phone number for the selected country.";
    }
    if (form.message.length > 5000) {
      errors.message = "Message is too long (max 5000 characters).";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          notes: form.message,
          source,
          pagePath: pathname,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        if (data?.errors) {
          setFieldErrors(
            Object.fromEntries(
              Object.entries(data.errors as Record<string, string[]>).map(([key, msgs]) => [
                key,
                msgs[0],
              ]),
            ),
          );
        } else {
          setError("Something went wrong. Please try again.");
        }
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <SuccessModal
        title="Thank you for contacting us."
        message="We will get back to you as soon as possible."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — hidden from humans, bots fill it */}
      <input
        type="text"
        name="_h"
        value={form._h}
        onChange={(e) => setForm({ ...form, _h: e.target.value })}
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
            className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#C8A84B] focus:outline-none"
          />
          {fieldErrors.name && <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#252525] mb-1">Phone <span className="text-red-500">*</span></label>
          <PhoneInput
            onChange={(value) => setForm({ ...form, phone: value })}
            error={fieldErrors.phone}
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
          className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#C8A84B] focus:outline-none"
        />
        {fieldErrors.email && <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-[#252525] mb-1">Type of Enquiry</label>
        <CustomSelect
          value={form.enquiry}
          onChange={(v) => setForm({ ...form, enquiry: v })}
          options={enquiryOptions}
          placeholder="Select an enquiry type"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#252525] mb-1">Message</label>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us more about your enquiry..."
          className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-[#C8A84B] focus:outline-none resize-y"
        />
        {fieldErrors.message && <p className="mt-1 text-xs text-red-500">{fieldErrors.message}</p>}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-[#C8A84B] hover:bg-[#111111] disabled:opacity-60 text-white font-semibold py-3 px-8 uppercase text-sm tracking-wide transition-colors"
      >
        {loading ? "Sending..." : "SUBMIT"}
      </button>
    </form>
  );
}
