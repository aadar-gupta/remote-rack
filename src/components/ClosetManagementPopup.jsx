"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
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

export default function ClosetManagementPopup({
  isOpen,
  onClose,
  user,
  onUpdateCloset,
  initialCategory
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [newItem, setNewItem] = useState({ name: '', brand: '', img: '' });
  const [isAdding, setIsAdding] = useState(false);

  // Update selectedCategory when initialCategory changes
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Early return if no user data
  if (!user || !user.outfits) {
    return null;
  }

  const handleAddItem = async () => {
    try {
      setIsAdding(true);

      // Create updated closet data
      const updatedCloset = {
        ...user.outfits,
        [selectedCategory]: [
          ...(user.outfits[selectedCategory] || []),
          {
            ...newItem,
            id: `${selectedCategory}-${Date.now()}` // Add unique ID
          }
        ]
      };

      // TODO: Replace with actual API call
      console.log("Adding item:", newItem);
      console.log("Updated closet:", updatedCloset);

      // Update local state
      await onUpdateCloset(updatedCloset);

      // Reset form
      setNewItem({ name: '', brand: '', img: '' });
    } catch (error) {
      console.error("Error adding item:", error);
      // TODO: Show error message to user
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteItem = async (category, index) => {
    try {
      if (!user.outfits[category] || !Array.isArray(user.outfits[category])) {
        console.error("Invalid category or items array");
        return;
      }

      // Create updated closet data
      const updatedCloset = {
        ...user.outfits,
        [category]: user.outfits[category].filter((_, i) => i !== index)
      };

      // TODO: Replace with actual API call
      console.log("Deleting item at index:", index);
      console.log("Updated closet:", updatedCloset);

      // Update local state
      await onUpdateCloset(updatedCloset);
    } catch (error) {
      console.error("Error deleting item:", error);
      // TODO: Show error message to user
    }
  };

  const categoryLabel = OUTFIT_CATEGORIES.find(c => c.key === selectedCategory)?.label || '';
  const categoryItems = user.outfits[selectedCategory] || [];
  const hasItems = Array.isArray(categoryItems) && categoryItems.length > 0;

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
              Manage {categoryLabel}
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
              {/* Add new item form */}
              <div className="bg-cream/50 rounded-lg p-3 space-y-3">
                <h3 className="text-sm font-medium text-charcoal">
                  Add New {categoryLabel}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Item name"
                    value={newItem.name}
                    onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value.trim() }))}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-charcoal/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <input
                    type="text"
                    placeholder="Brand"
                    value={newItem.brand}
                    onChange={(e) => setNewItem(prev => ({ ...prev, brand: e.target.value.trim() }))}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-charcoal/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newItem.img}
                    onChange={(e) => setNewItem(prev => ({ ...prev, img: e.target.value.trim() }))}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-charcoal/10 focus:outline-none focus:ring-2 focus:ring-primary/50 sm:col-span-2"
                  />
                </div>
                <button
                  onClick={handleAddItem}
                  disabled={!newItem.name || !newItem.brand || !newItem.img || isAdding}
                  className={clsx(
                    "w-full px-4 py-2 bg-primary text-white rounded-lg font-medium",
                    "hover:bg-primary/90 transition-colors",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "flex items-center justify-center gap-2"
                  )}
                >
                  <Plus size={16} />
                  <span>{isAdding ? "Adding..." : "Add Item"}</span>
                </button>
              </div>

              {/* Existing items */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-charcoal">
                  Your {categoryLabel}
                </h3>
                <div className="max-h-[300px] overflow-y-auto pr-1 space-y-2">
                  {hasItems ? (
                    categoryItems.map((item, index) => (
                      <div
                        key={item.id || `${selectedCategory}-${index}`}
                        className="flex items-center gap-2 p-2 bg-cream/50 rounded-lg"
                      >
                        <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                          {item.img ? (
                            <img
                              src={item.img}
                              alt={item.name || 'Clothing item'}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.target.src = '/placeholder.png'; // Add a placeholder image
                                e.target.onerror = null; // Prevent infinite loop
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-charcoal/30">
                              No Image
                            </div>
                          )}
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-charcoal truncate">
                              {item.name || 'Unnamed Item'}
                            </p>
                          </div>
                          <p className="text-xs text-charcoal/70 truncate">
                            {item.brand || 'No Brand'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteItem(selectedCategory, index)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-sm text-charcoal/70">
                      No items in this category yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
