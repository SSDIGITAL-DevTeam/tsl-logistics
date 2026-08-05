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
  {
    text: "We've been using TSL Logistics for our container trucking needs for over a year now. Always on time, drivers are professional, and communication is clear from booking to delivery. Great partner for our supply chain.",
    name: "DAVID TAN",
  },
  {
    text: "Needed an urgent same-day delivery and TSL Express came through without any issues. Rider called ahead, item arrived intact, and the whole process was smooth from start to finish. Will definitely use again for rush jobs.",
    name: "MICHELLE LIM",
  },
  {
    text: "Our company has been storing inventory with TSL Warehousing for a few months. Facility is clean, well organised, and the team is responsive whenever we need to check stock or arrange collection. Reliable partner overall.",
    name: "RAYMOND KOH",
  },
  {
    text: "From the sales enquiry to the actual job, everyone at TSL was professional and easy to work with. Pricing was transparent with no hidden surprises. Highly recommend them for anyone needing dependable logistics support.",
    name: "AMANDA WEE",
  },
];

export default function TestimonialsSlider({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const [current, setCurrent] = useState(0);
  const isLight = variant === "light";
  const quoteTextClass =
    isLight ? "text-[#151515]" : "text-white/85";
  const inactiveDotClass =
    isLight ? "bg-[#151515]/20" : "bg-gray-300";

  useEffect(() => {
    // The light variant is a pure CSS marquee and never reads `current`, so
    // rotating state there is wasted work.
    if (isLight) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setInterval> | null = null;

    const stop = () => {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    };
    const start = () => {
      if (timer !== null) return;
      timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 7000);
    };
    // Don't re-render on a background tab — this used to run forever.
    const onVisibilityChange = () => (document.hidden ? stop() : start());

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isLight]);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  if (isLight) {
    const loopedCards = [...testimonials, ...testimonials];

    return (
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="marquee-track flex w-max gap-5">
          {loopedCards.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${index}`}
              className="flex w-[320px] shrink-0 flex-col justify-between border border-[#e7e8ec] bg-white p-7 shadow-[0_18px_50px_rgba(20,38,66,0.07)] transition-shadow duration-300 hover:shadow-[0_24px_70px_rgba(20,38,66,0.11)] md:w-[360px]"
            >
              <div>
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#C8A84B">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#C8A84B]">
                    {String((index % testimonials.length) + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="text-[15px] leading-relaxed text-[#2f2f2f]">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>

              <div className="mt-8 border-t border-[#eceef2] pt-5">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#151515]">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#9A7D2D]">
                  Verified Customer
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Quote mark */}
      <div className="text-[120px] text-[#C8A84B] opacity-20 leading-none font-serif absolute -top-6 -left-4 select-none">&ldquo;</div>

      <div className="relative overflow-hidden min-h-[200px]">
        <div
          key={current}
          className="testimonial-slide text-center px-4 md:px-12"
        >
          {/* 5 stars */}
          <div className="flex justify-center gap-1 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#C8A84B">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <p className={`${quoteTextClass} text-base md:text-lg leading-relaxed italic mb-6`}>
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
          className="w-9 h-9 border border-[#C8A84B] flex items-center justify-center rounded-full text-[#C8A84B] hover:bg-[#C8A84B] hover:text-white transition-colors"
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
                i === current ? "bg-[#C8A84B]" : inactiveDotClass
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-9 h-9 border border-[#C8A84B] flex items-center justify-center rounded-full text-[#C8A84B] hover:bg-[#C8A84B] hover:text-white transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
