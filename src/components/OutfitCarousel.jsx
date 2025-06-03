"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

export default function OutfitCarousel({ category, onSelect, user }) {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadItems = () => {
      setIsLoading(true);
      setError(null);
      try {
        // Get items from the user's outfits data
        const categoryItems = user.outfits[category] || [];
        console.log('Loading items for category:', category);
        console.log('Items:', categoryItems);
        setItems(categoryItems);
      } catch (error) {
        console.error("Error loading items:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, [category, user]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleSelect = () => {
    if (items[currentIndex]) {
      onSelect(items[currentIndex]);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-64 bg-cream/50 rounded-lg flex items-center justify-center">
        <div className="text-charcoal/70">Loading items...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-64 bg-cream/50 rounded-lg flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="w-full h-64 bg-cream/50 rounded-lg flex items-center justify-center">
        <div className="text-charcoal/70">No items found in this category</div>
      </div>
    );
  }

  const currentItem = items[currentIndex];

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="relative aspect-[4/3] bg-cream/50 rounded-lg overflow-hidden">
        {/* Image */}
        <div className="relative w-full h-full">
          <Image
            src={currentItem.img}
            alt={currentItem.name}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-charcoal shadow-lg transition-colors"
          aria-label="Previous item"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-charcoal shadow-lg transition-colors"
          aria-label="Next item"
        >
          <ChevronRight size={24} />
        </button>

        {/* Item Counter */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/80 text-sm text-charcoal">
          {currentIndex + 1} / {items.length}
        </div>
      </div>

      {/* Item Details */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-medium text-charcoal">{currentItem.name}</h3>
        <p className="mt-1 text-sm text-charcoal/70">{currentItem.brand}</p>
      </div>

      {/* Select Button */}
      <button
        onClick={handleSelect}
        className="mt-4 w-full bg-primary text-white rounded-lg px-4 py-2.5 font-medium hover:bg-primary/90 transition-colors"
      >
        Select This Item
      </button>
    </div>
  );
}
