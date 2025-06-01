"use client";

import { X, Plus, Shirt, Bell } from "lucide-react";

export default function OutfitPopup({
  isOpen,
  onClose,
  date,
  outfit,
  view,
  partnerName,
  onAddOutfit,
  onEditOutfit
}) {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-cream rounded-lg transition-colors"
        >
          <X size={20} />
        </button>

        <h3 className="text-2xl font-medium text-charcoal mb-6">
          {formatDate(date)}
        </h3>

        {outfit ? (
          // Show outfit details if they exist
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-charcoal/70 mb-1">Top</h4>
              <p className="text-lg text-charcoal">{outfit.top}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-charcoal/70 mb-1">Bottom</h4>
              <p className="text-lg text-charcoal">{outfit.bottom}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-charcoal/70 mb-1">Shoes</h4>
              <p className="text-lg text-charcoal">{outfit.shoes}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-charcoal/70 mb-1">Accessories</h4>
              <p className="text-lg text-charcoal">{outfit.accessories}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-charcoal/70 mb-1">Notes</h4>
              <p className="text-lg text-charcoal">{outfit.notes}</p>
            </div>
            {view === "your-outfits" ? (
              // Show who chose the outfit for your view
              <div className="pt-4 border-t border-charcoal/10">
                <p className="text-sm text-charcoal/70">
                  {partnerName} chose this outfit for you
                </p>
              </div>
            ) : (
              // Show who chose the outfit for partner's view
              <div className="pt-4 border-t border-charcoal/10">
                <p className="text-sm text-charcoal/70">
                  You chose this outfit for {partnerName}
                </p>
              </div>
            )}
          </div>
        ) : (
          // Show add outfit prompt if no outfit exists
          <div className="text-center py-8">
            <div className="mb-6">
              {view === "your-outfits" ? (
                // Reminder message for your calendar
                <>
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell size={28} className="text-secondary" />
                  </div>
                  <h4 className="text-lg font-medium text-charcoal mb-2">
                    No Outfit Chosen
                  </h4>
                  <p className="text-charcoal/70">
                    Remind {partnerName} to choose an outfit for you!
                  </p>
                </>
              ) : (
                // Choose outfit prompt for partner's calendar
                <>
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shirt size={28} className="text-secondary" />
                  </div>
                  <h4 className="text-lg font-medium text-charcoal mb-2">
                    No Outfit Planned for {partnerName}
                  </h4>
                  <p className="text-charcoal/70">
                    Choose an outfit for {partnerName} for this day
                  </p>
                </>
              )}
            </div>
            {view === "partner-outfits" && (
              // Choose outfit button for partner's calendar
              <button
                onClick={onAddOutfit}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus size={16} className="text-white" />
                <span>Choose Outfit for {partnerName}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
