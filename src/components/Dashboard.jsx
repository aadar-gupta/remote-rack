import OutfitCalendar from "./OutfitCalendar";
import { useState } from "react";
import clsx from "clsx";

export default function Dashboard({ user }) {
  const [activeView, setActiveView] = useState("your-outfits"); // or "partner-outfits"

  return (
    <main className="min-h-screen bg-cream pt-32 pb-16 px-8 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl font-semibold text-charcoal">
            Welcome back, {user.firstName}!
          </h1>
          <p className="mt-4 text-xl text-charcoal/70">
            Manage your virtual closet and coordinate outfits with your partner.
          </p>
        </div>

        {/* Calendar Section */}
        <div>
          <OutfitCalendar view={activeView} partnerName={user.partner.firstName} />
        </div>
      </div>
    </main>
  );
}
