"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import PhoneInput, { isPhoneValueValid } from "./ui/PhoneInput";
import SuccessModal from "./ui/SuccessModal";

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

const NAME_PATTERN = /^[\p{L}][\p{L}\s'.-]{1,99}$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function today() {
  return new Date().toISOString().split("T")[0];
}

export default function TSLMoverQuoteForm() {
  const pathname = usePathname();
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

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
    if (!form.movingDate || form.movingDate < today()) {
      errors.movingDate = "Please select today's date or a future date.";
    }
    if (!form.propertyFrom) {
      errors.propertyFrom = "Please select a property type.";
    }
    if (!form.propertyTo) {
      errors.propertyTo = "Please select a property type.";
    }
    if (form.addressFrom.trim().length < 5) {
      errors.addressFrom = "Enter a more complete address (min. 5 characters).";
    }
    if (form.addressTo.trim().length < 5) {
      errors.addressTo = "Enter a more complete address (min. 5 characters).";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!validate()) return;

    setLoading(true);
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

      if (!response.ok) {
        const data = await response.json().catch(() => null);
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
      setForm(initialForm);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <SuccessModal
        title="Thank you for your quotation request."
        message="Our team will get back to you with the right moving support."
      />
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
          placeholder="Your Name"
          className="h-11 w-full border border-black/30 bg-white px-3 text-sm outline-none transition focus:border-[#C8A84B]"
        />
        {fieldErrors.name && <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Email</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="you@example.com"
          className="h-11 w-full border border-black/30 bg-white px-3 text-sm outline-none transition focus:border-[#C8A84B]"
        />
        {fieldErrors.email && <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Phone Number</label>
        <PhoneInput
          onChange={(value) => updateField("phone", value)}
          error={fieldErrors.phone}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold">Estimated Moving Date</label>
        <input
          required
          type="date"
          min={today()}
          value={form.movingDate}
          onChange={(event) => updateField("movingDate", event.target.value)}
          className="h-11 w-full border border-black/30 bg-white px-3 text-sm outline-none transition focus:border-[#C8A84B]"
        />
        {fieldErrors.movingDate && <p className="mt-1 text-xs text-red-500">{fieldErrors.movingDate}</p>}
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
        {fieldErrors.propertyFrom && <p className="mt-1 text-xs text-red-500">{fieldErrors.propertyFrom}</p>}
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
        {fieldErrors.propertyTo && <p className="mt-1 text-xs text-red-500">{fieldErrors.propertyTo}</p>}
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
        {fieldErrors.addressFrom && <p className="mt-1 text-xs text-red-500">{fieldErrors.addressFrom}</p>}
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
        {fieldErrors.addressTo && <p className="mt-1 text-xs text-red-500">{fieldErrors.addressTo}</p>}
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
