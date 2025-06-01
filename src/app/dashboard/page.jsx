"use client";

import { useEffect, useState } from "react";
import OutfitCalendar from "@/components/OutfitCalendar";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with welcome message */}
        <div className="pt-16 pb-8">
          <div>
            <h1 className="text-4xl font-bold text-charcoal">Welcome back, Alex!</h1>
            <p className="mt-2 text-lg text-charcoal/70">
              Coordinate your outfits with Sarah
            </p>
          </div>
        </div>

        {/* Calendar */}
        <OutfitCalendar partnerName="Sarah" />
      </div>
    </main>
  );
}
