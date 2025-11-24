import React, { useState, useEffect } from "react";
import { StarIcon } from "./Icons";

const testimonials = [
  {
    name: "Aarav Mehta",
    image: "https://picsum.photos/200/200?random=20",
    review:
      "Amazing experience! The doctor explained everything clearly. The treatment was smooth, painless, and super professional.",
  },
  {
    name: "Sara Nair",
    image: "https://picsum.photos/200/200?random=21",
    review:
      "The clinic is extremely clean and modern. Loved the hospitality — I finally found a reliable dental clinic.",
  },
  {
    name: "Rishabh Singh",
    image: "https://picsum.photos/200/200?random=22",
    review:
      "Very friendly staff and excellent service. They made me feel comfortable and the results were incredible!",
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  // Auto-change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-10">
      <div className="relative w-full max-w-3xl h-[400px] sm:h-80 flex items-center justify-center">
        {testimonials.map((item, i) => (
          <div
            key={i}
            className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out transform px-4
              ${
                current === i
                  ? "opacity-100 translate-y-0 scale-100 z-10"
                  : "opacity-0 translate-y-8 scale-95 z-0 pointer-events-none"
              }
            `}
          >
            <div className="bg-white/80 backdrop-blur-lg border border-white/60 shadow-xl rounded-3xl p-8 text-center max-w-lg w-full">
              {/* Image */}
              <div className="w-20 h-20 rounded-full overflow-hidden shadow-md mx-auto mb-4 border-4 border-white">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="text-xl font-serif font-bold text-brand-text mb-1">
                {item.name}
              </h3>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} className="w-4 h-4 text-brand-accent" />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-600 text-sm leading-relaxed italic">
                "{item.review}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Dots */}
      <div className="flex gap-2 mt-6 z-20">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent ${
              current === i ? "bg-brand-accent w-8" : "bg-gray-300 w-2"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}