"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

const propertyTypes = [
  "HDB",
  "Condominium",
  "Landed and Private Property",
  "Commercial Building (Offices, schools)",
  "Warehouse / Factory",
  "Others",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  movingDate: string;
  propertyFrom: string;
  propertyTo: string;
  addressFrom: string;
  addressTo: string;
  _h: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  movingDate: "",
  propertyFrom: "",
  propertyTo: "",
  addressFrom: "",
  addressTo: "",
  _h: "",
};

export default function TSLMoverQuoteForm() {
  const pathname = usePathname();
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const notes = [
    `Moving date: ${form.movingDate || "-"}`,
    `Property type (from): ${form.propertyFrom || "-"}`,
    `Property type (to): ${form.propertyTo || "-"}`,
    `Address (moving from): ${form.addressFrom || "-"}`,
    `Address (moving to): ${form.addressTo || "-"}`,
  ].join("\n");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          enquiry: `Moving: ${form.propertyFrom || "Unknown"} to ${form.propertyTo || "Unknown"}`,
          message: notes,
          notes,
          source: "tsl-mover",
          pagePath: pathname,
          _h: form._h,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit quotation request");

      setSubmitted(true);
      setForm(initialForm);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white p-8 text-center text-[#121212]">
        <div className="mb-4 text-5xl text-[#C8A84B]">&#10003;</div>
        <p className="text-lg font-semibold">Thank you for your quotation request.</p>
        <p className="mt-2 text-sm leading-relaxed text-[#555]">
          Our team will get back to you with the right moving support.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 bg-white p-6 text-[#121212]">
      <input
        type="text"
        name="_h"
        value={form._h}
        onChange={(event) => updateField("_h", event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label className="mb-1 block text-sm font-semibold">Name</label>
        <input
          required
          type="text"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="h-11 w-full border border-black/30 bg-white px-3 text-sm outline-none transition focus:border-[#C8A84B]"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Email</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          className="h-11 w-full border border-black/30 bg-white px-3 text-sm outline-none transition focus:border-[#C8A84B]"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Phone Number</label>
        <input
          required
          type="tel"
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          className="h-11 w-full border border-black/30 bg-white px-3 text-sm outline-none transition focus:border-[#C8A84B]"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Estimated Moving Date</label>
        <input
          required
          type="date"
          value={form.movingDate}
          onChange={(event) => updateField("movingDate", event.target.value)}
          className="h-11 w-full border border-black/30 bg-white px-3 text-sm outline-none transition focus:border-[#C8A84B]"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Property Type (FROM)</label>
        <select
          required
          value={form.propertyFrom}
          onChange={(event) => updateField("propertyFrom", event.target.value)}
          className="h-11 w-full border border-black/30 bg-white px-3 text-sm outline-none transition focus:border-[#C8A84B]"
        >
          <option value="">Select property type</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Property Type (TO)</label>
        <select
          required
          value={form.propertyTo}
          onChange={(event) => updateField("propertyTo", event.target.value)}
          className="h-11 w-full border border-black/30 bg-white px-3 text-sm outline-none transition focus:border-[#C8A84B]"
        >
          <option value="">Select property type</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Address (Moving From)</label>
        <input
          required
          type="text"
          value={form.addressFrom}
          onChange={(event) => updateField("addressFrom", event.target.value)}
          placeholder="Your Address"
          className="h-11 w-full border border-black/30 bg-white px-3 text-sm outline-none transition focus:border-[#C8A84B]"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Address (Moving To)</label>
        <input
          required
          type="text"
          value={form.addressTo}
          onChange={(event) => updateField("addressTo", event.target.value)}
          placeholder="Your Address"
          className="h-11 w-full border border-black/30 bg-white px-3 text-sm outline-none transition focus:border-[#C8A84B]"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="h-12 bg-gold-gradient text-sm font-bold text-[#121212] transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
