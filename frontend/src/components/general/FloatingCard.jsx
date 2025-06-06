"use client";

import { clsx } from "clsx";

export default function FloatingCard({ float = "left", image, children }) {
  return (
    <div className="relative min-h-screen">
      {/* Mobile background image with overlay */}
      <div className="lg:hidden absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-cream/95 to-cream/80 z-10" />
        <img
          src={image}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Desktop floating card */}
      <div className="hidden lg:block absolute inset-0">
        <div className={`absolute top-1/2 -translate-y-1/2 ${float === "right" ? "right-0" : "left-0"} w-1/2 h-[80vh]`}>
          <div className="relative w-full h-full">
            <div className={`absolute inset-0 bg-cream shadow-xl overflow-hidden ${
              float === "right" ? "rounded-l-3xl" : "rounded-r-3xl"
            }`}>
              <img
                src={image}
                alt="Card"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content container */}
      <div className="relative z-20 min-h-screen flex items-center">
        <div className={`w-full px-4 py-16 lg:py-0 lg:w-1/2 ${float === "right" ? "lg:pr-8" : "lg:pl-8"}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
