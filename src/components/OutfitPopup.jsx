"use client";

import { useState } from "react";
import { X, Plus, Shirt, Bell } from "lucide-react";
import OutfitCarousel from "./OutfitCarousel";
import Image from "next/image";

export default function OutfitPopup({
  isOpen,
  onClose,
  date,
  outfit,
  view,
  partnerName,
  onAddOutfit,
  onEditOutfit,
  user,
  partner,
  isPreviewOnly = false
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});

  // Reset states when popup is closed
  const handleClose = () => {
    setSelectedCategory(null);
    setSelectedItems({});
    onClose();
  };

  if (!isOpen) return null;
  if (!partner && view !== "your-outfits") {
    console.error("Partner data is required for outfit selection");
    return null;
  }

  // Get the correct user's outfits based on the view
  const getOutfitItems = () => {
    console.log('Current view:', view);
    console.log('User data:', user);
    console.log('Partner data:', partner);

    if (view === "your-outfits") {
      console.log('Using user outfits:', user?.outfits);
      return user?.outfits;
    } else {
      console.log('Using partner outfits:', partner?.outfits);
      return partner?.outfits;
    }
  };

  // Get available categories (those that have items)
  const getAvailableCategories = () => {
    const outfits = getOutfitItems();
    console.log('Available outfits:', outfits);

    if (!outfits) {
      console.log('No outfits data available');
      return [];
    }

    const availableCategories = OUTFIT_CATEGORIES.filter(category => {
      const items = outfits[category.key];
      console.log(`Category ${category.key}:`, items);
      return items && items.length > 0;
    });

    console.log('Available categories:', availableCategories);
    return availableCategories;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleItemSelect = (item) => {
    setSelectedItems(prev => ({
      ...prev,
      [selectedCategory]: item
    }));
    setSelectedCategory(null);
  };

  const handleSaveOutfit = () => {
    onAddOutfit({
      ...selectedItems,
      date
    });
    onClose();
  };

  const OUTFIT_CATEGORIES = [
    { key: 'tops', label: 'Tops' },
    { key: 'bottoms', label: 'Bottoms' },
    { key: 'shoes', label: 'Shoes' },
    { key: 'watches', label: 'Watches' },
    { key: 'necklaces', label: 'Necklaces' },
    { key: 'earrings', label: 'Earrings' }
  ];

  const renderOutfitItem = (category, item) => {
    if (!item) return null;

    return (
      <div key={category.key} className="space-y-2">
        <h4 className="text-sm font-medium text-charcoal/70">{category.label}</h4>
        <div className="flex items-start gap-4">
          <div className="relative w-24 h-24 bg-cream/50 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={item.img}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex-grow">
            <p className="text-lg text-charcoal">{item.name}</p>
            <p className="text-sm text-charcoal/70">{item.brand}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderSelectedItem = (category, item) => {
    return (
      <div key={category.key} className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-grow">
          {item ? (
            <>
              <div className="relative w-24 h-24 bg-cream/50 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-lg text-charcoal">{item.name}</p>
                <p className="text-sm text-charcoal/70">{item.brand}</p>
              </div>
            </>
          ) : (
            <div>
              <h4 className="text-sm font-medium text-charcoal/70">{category.label}</h4>
              <p className="text-lg text-charcoal">Not selected</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setSelectedCategory(category.key)}
          className="px-4 py-2 text-sm text-primary hover:text-primary/80 transition-colors whitespace-nowrap"
        >
          {item ? 'Change' : 'Select'}
        </button>
      </div>
    );
  };

  const renderSelectedItems = () => {
    const availableCategories = getAvailableCategories();
    const availableCategoryKeys = new Set(availableCategories.map(cat => cat.key));

    return (
      <div className="space-y-6">
        {OUTFIT_CATEGORIES
          .filter(category => availableCategoryKeys.has(category.key))
          .map(category =>
            renderSelectedItem(category, selectedItems[category.key])
          )}
        <button
          onClick={handleSaveOutfit}
          className="w-full bg-primary text-white rounded-lg px-4 py-3 font-medium hover:bg-primary/90 transition-colors"
        >
          Save Outfit
        </button>
      </div>
    );
  };

  const renderOutfitPreview = () => {
    if (!outfit) return null;

    if (view === "your-outfits") {
      // Simple image grid for user's view
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {OUTFIT_CATEGORIES
            .filter(category => {
              const items = getOutfitItems()?.[category.key];
              return items && items.length > 0 && outfit[category.key];
            })
            .map(category => (
              <div key={category.key} className="space-y-2">
                <div className="relative aspect-square bg-cream/50 rounded-lg overflow-hidden">
                  <Image
                    src={outfit[category.key].img}
                    alt={outfit[category.key].name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-charcoal">{outfit[category.key].name}</p>
                  <p className="text-xs text-charcoal/70">{category.label}</p>
                </div>
              </div>
            ))}
        </div>
      );
    }

    // Detailed view for partner's selection process
    return (
      <div className="space-y-6">
        {OUTFIT_CATEGORIES
          .filter(category => {
            const items = getOutfitItems()?.[category.key];
            return items && items.length > 0;
          })
          .map(category => renderOutfitItem(category, outfit[category.key]))}
        <div className="pt-4 border-t border-charcoal/10">
          <p className="text-sm text-charcoal/70">
            You chose this outfit for {partnerName}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-medium text-charcoal">
            {outfit
              ? (view === "your-outfits"
                  ? "Your Outfit"
                  : `${partnerName}'s Outfit`)
              : (view === "your-outfits"
                  ? "Your Outfit"
                  : `Choose Outfit for ${partnerName}`)}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cream rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-8">
          <h4 className="text-sm font-medium text-charcoal/70 mb-1">Date</h4>
          <p className="text-lg text-charcoal">{formatDate(date)}</p>
        </div>

        {outfit ? (
          renderOutfitPreview()
        ) : selectedCategory ? (
          getOutfitItems() ? (
            <OutfitCarousel
              category={selectedCategory}
              onSelect={handleItemSelect}
              user={view === "your-outfits" ? user : partner}
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-charcoal/70">Unable to load outfit items. Please try again later.</p>
            </div>
          )
        ) : (
          <div className="py-8">
            {Object.keys(selectedItems).length > 0 ? (
              <div className="space-y-6">
                {OUTFIT_CATEGORIES
                  .filter(category => {
                    const items = getOutfitItems()?.[category.key];
                    return items && items.length > 0;
                  })
                  .map(category => renderSelectedItem(category, selectedItems[category.key]))}
                {!isPreviewOnly && (
                  <button
                    onClick={handleSaveOutfit}
                    className="w-full bg-primary text-white rounded-lg px-4 py-3 font-medium hover:bg-primary/90 transition-colors"
                  >
                    Save Outfit
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shirt size={28} className="text-secondary" />
                </div>
                <h4 className="text-lg font-medium text-charcoal mb-2">
                  {view === "your-outfits"
                    ? "Your Outfit"
                    : `Choose an Outfit for ${partnerName}`}
                </h4>
                <p className="text-charcoal/70 mb-6">
                  {view === "your-outfits"
                    ? "This is your outfit for this day"
                    : "Select items for each category to create an outfit"}
                </p>
                {!isPreviewOnly && getAvailableCategories().length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {getAvailableCategories().map(category => (
                      <button
                        key={category.key}
                        onClick={() => setSelectedCategory(category.key)}
                        className="p-4 bg-cream rounded-lg hover:bg-cream/80 transition-colors text-charcoal h-24 flex items-center justify-center"
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-charcoal/70">
                      {isPreviewOnly
                        ? "This is a preview of your outfit"
                        : "No items available in any category."}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
