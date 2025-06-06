"use client";

import { useEffect, useState } from "react";
import OutfitCalendar from "@/components/OutfitCalendar";
import PartnerCodeManager from "@/components/PartnerCodeManager";
import { mockUser } from "../constants"; // Import the user constant

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(mockUser); // Use the user from constants.js
    setMounted(true);
  }, []);

  const handlePartnerConnect = async (partnerCode) => {
    // TODO: Implement partner connection logic
    console.log("Connecting with partner code:", partnerCode);

    // Example: You could update the user here if needed
    // setUser(prev => ({
    //   ...prev,
    //   partner: { ... }
    // }));
  };

  // Prevent hydration mismatch
  if (!mounted || !user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with welcome message */}
        <div className="pt-16 pb-8">
          <div>
            <h1 className="text-4xl font-bold text-charcoal">
              Welcome back, {user.firstName}!
            </h1>
            {user.partner ? (
              <p className="mt-2 text-lg text-charcoal/70">
                Coordinate your outfits with {user.partner.firstName}
              </p>
            ) : (
              <p className="mt-2 text-lg text-charcoal/70">
                Connect with your partner to start coordinating outfits
              </p>
            )}
          </div>
        </div>

        {/* Show either the calendar or partner code manager */}
        {user.partner ? (
          <OutfitCalendar partnerName={user.partner.firstName} />
        ) : (
          <PartnerCodeManager
            user={user}
            onPartnerConnect={handlePartnerConnect}
          />
        )}
      </div>
    </main>
  );
}
