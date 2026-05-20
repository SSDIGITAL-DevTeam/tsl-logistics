"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "Excellent service provider. They have a bunch of professional and well trained workers. Friendly and nice. I would highly recommend their service mainly because they put their client's needs in their top priority. The moving company that you will not have to be worried about. 🙏 Thank you, TSL Movers.",
    name: "SEAN NG",
  },
  {
    text: "Very professional and fast service! So far the best I've ever encountered. Even though they're very tired, they're still very patient and efficient. Did a great work assembling and carrying without damaging anything too. Highly recommended!",
    name: "HUI YIN",
  },
  {
    text: "Very impressed with Patrick and his team. They are hardworking, efficient, polite and accommodating. Helped us with disposal of items and sending items to external storage too. They treated our items with care and made the moving a lot smoother for us. Well done and we will definitely engage your services again.",
    name: "PEARL ONG",
  },
];

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <div className="relative">
      {/* Quote mark */}
      <div className="text-[120px] text-[#C8A84B] opacity-20 leading-none font-serif absolute -top-6 -left-4 select-none">&ldquo;</div>

      <div className="relative overflow-hidden min-h-[200px]">
        <div
          key={current}
          className="testimonial-slide text-center px-4 md:px-12"
        >
          <p className="text-[#252525] text-base md:text-lg leading-relaxed italic mb-6">
            &ldquo;{testimonials[current].text}&rdquo;
          </p>
          <p className="font-bold text-[#C8A84B] uppercase tracking-widest text-sm">
            — {testimonials[current].name}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          className="w-9 h-9 rounded-full border border-[#C8A84B] flex items-center justify-center text-[#C8A84B] hover:bg-[#C8A84B] hover:text-white transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === current ? "bg-[#C8A84B]" : "bg-gray-300"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-9 h-9 rounded-full border border-[#C8A84B] flex items-center justify-center text-[#C8A84B] hover:bg-[#C8A84B] hover:text-white transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

