"use client";

import { useState, useEffect } from "react";
import { X, Shirt } from "lucide-react";
import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import OutfitCarousel from "./OutfitCarousel";

const OUTFIT_CATEGORIES = [
  { key: 'tops', label: 'Tops' },
  { key: 'bottoms', label: 'Bottoms' },
  { key: 'shoes', label: 'Shoes' },
  { key: 'watches', label: 'Watches' },
  { key: 'necklaces', label: 'Necklaces' },
  { key: 'earrings', label: 'Earrings' }
];

export default function OutfitSelectionPopup({
  isOpen,
  onClose,
  date,
  partner,
  partnerName,
  onAddOutfit,
  user
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Load existing outfit data if available
  useEffect(() => {
    if (isOpen && date) {
      const existingOutfit = user?.outfits?.[date];
      if (existingOutfit) {
        // Filter out the date field and set selected items
        const { date: _, ...items } = existingOutfit;
        setSelectedItems(items);
      }
    }
  }, [isOpen, date, user?.outfits]);

  if (!isOpen) return null;
  if (!partner) {
    console.error("Partner data is required for outfit selection");
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

  const handleItemSelect = async (item) => {
    try {
      setIsSaving(true);

      // Update local state
      const updatedItems = {
        ...selectedItems,
        [selectedCategory]: item
      };
      setSelectedItems(updatedItems);

      // Save the updated outfit
      await onAddOutfit(updatedItems);

      // Reset category selection but don't close the popup
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error saving item:", error);
      // TODO: Show error message to user
    } finally {
      setIsSaving(false);
    }
  };

  // Get available categories (those that have items and haven't been selected)
  const getAvailableCategories = () => {
    if (!partner?.outfits) return [];
    return OUTFIT_CATEGORIES.filter(category => {
      const items = partner.outfits[category.key];
      // Only show categories that have items and haven't been selected
      return items && items.length > 0 && !selectedItems[category.key];
    });
  };

  const renderSelectedItem = (category, item) => {
    if (!item) return null;
    return (
      <div className="flex items-start gap-4 p-4 bg-cream/50 rounded-lg">
        <div className="relative w-24 h-24 bg-white rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-grow">
          <h4 className="text-sm font-medium text-charcoal/70">{category.label}</h4>
          <p className="text-lg text-charcoal">{item.name}</p>
          <p className="text-sm text-charcoal/70">{item.brand}</p>
        </div>
        <button
          onClick={() => setSelectedCategory(category.key)}
          className="px-4 py-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Change
        </button>
      </div>
    );
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
              Choose Outfit for {partnerName}
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
                <p className="text-xs text-charcoal/70 mt-0.5">
                  Select items for each category
                </p>
              </div>

              {/* Selected items - only show when not selecting a category */}
              {!selectedCategory && Object.keys(selectedItems).length > 0 && (
                <div className="space-y-2">
                  {OUTFIT_CATEGORIES
                    .filter(category => selectedItems[category.key])
                    .map(category => (
                      <div key={category.key} className="flex items-center gap-2 p-2 bg-cream/50 rounded-lg">
                        <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={selectedItems[category.key].img}
                            alt={selectedItems[category.key].name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-medium text-charcoal/70">{category.label}</h4>
                            <p className="text-sm text-charcoal truncate">{selectedItems[category.key].name}</p>
                          </div>
                          <p className="text-xs text-charcoal/70 truncate">{selectedItems[category.key].brand}</p>
                        </div>
                        <button
                          onClick={() => setSelectedCategory(category.key)}
                          className="px-2 py-1 text-xs text-primary hover:text-primary/80 transition-colors"
                        >
                          Change
                        </button>
                      </div>
                    ))}
                </div>
              )}

              {/* Category selection or carousel */}
              {selectedCategory ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-charcoal">
                      Select {OUTFIT_CATEGORIES.find(c => c.key === selectedCategory)?.label}
                    </h3>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="text-xs text-charcoal/70 hover:text-charcoal"
                      disabled={isSaving}
                    >
                      Back to categories
                    </button>
                  </div>
                  <OutfitCarousel
                    category={selectedCategory}
                    onSelect={handleItemSelect}
                    user={partner}
                    isSaving={isSaving}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {getAvailableCategories().map(category => (
                    <button
                      key={category.key}
                      onClick={() => setSelectedCategory(category.key)}
                      className={clsx(
                        "p-2 bg-cream rounded-lg transition-colors text-charcoal h-16",
                        "flex items-center justify-center text-sm hover:bg-cream/80",
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                      disabled={isSaving}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
