"use client";

import { useEffect, useState } from "react";
import OutfitCalendar from "@/components/OutfitCalendar";
import PartnerCodeManager from "@/components/PartnerCodeManager";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // TODO: Replace with actual user data fetching
    setUser({
      firstName: "Alex",
      lastName: "Smith",
      email: "alex@example.com",
      partnerCode: "ABC123XY", // This would come from the backend
      partner: null // This would be set when a partner connects
    });
    setMounted(true);
  }, []);

  const handlePartnerConnect = async (partnerCode) => {
    // TODO: Implement partner connection logic
    console.log("Connecting with partner code:", partnerCode);

    // Mock successful connection
    setUser(prev => ({
      ...prev,
      partner: {
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah@example.com"
      }
    }));
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
