"use client";

import { X } from "lucide-react";
import { Dialog } from "@headlessui/react";
import clsx from "clsx";

const OUTFIT_CATEGORIES = [
  { key: 'tops', label: 'Tops' },
  { key: 'bottoms', label: 'Bottoms' },
  { key: 'shoes', label: 'Shoes' },
  { key: 'watches', label: 'Watches' },
  { key: 'necklaces', label: 'Necklaces' },
  { key: 'earrings', label: 'Earrings' }
];

export default function OutfitPreviewPopup({
  isOpen,
  onClose,
  date,
  outfit,
  partner,
  partnerName
}) {
  if (!isOpen) return null;
  if (!outfit) {
    console.error("Outfit data is required for preview");
    return null;
  }

  // Format date consistently for both server and client
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return `${weekdays[date.getUTCDay()]}, ${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container */}
      <div className="fixed inset-0 flex items-center justify-center p-2">
        <Dialog.Panel className="w-full max-w-lg bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-charcoal/10">
            <Dialog.Title className="text-base font-medium text-charcoal">
              Outfit chosen by {partnerName}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="p-1 hover:bg-cream rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="p-3">
            <div className="space-y-4">
              {/* Date info */}
              <div>
                <h3 className="text-sm font-medium text-charcoal">
                  {formatDateForDisplay(date)}
                </h3>
              </div>

              {/* Outfit items */}
              <div className="space-y-3">
                {Object.entries(outfit)
                  .filter(([category]) => category !== 'date') // Skip the date field
                  .map(([category, item]) => (
                    <div
                      key={`${date}-${category}`}
                      className="flex items-center gap-2 p-2 bg-cream/50 rounded-lg"
                    >
                      <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-medium text-charcoal/70 capitalize">{category}</h4>
                          <p className="text-sm text-charcoal truncate">{item.name}</p>
                        </div>
                        <p className="text-xs text-charcoal/70 truncate">{item.brand}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
