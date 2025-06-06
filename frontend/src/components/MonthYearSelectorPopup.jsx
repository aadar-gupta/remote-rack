"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import clsx from "clsx";

export default function MonthYearSelectorPopup({ isOpen, onClose, onSelect, currentDate }) {
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

  // Update selected month/year when currentDate changes
  useEffect(() => {
    setSelectedYear(currentDate.getFullYear());
    setSelectedMonth(currentDate.getMonth());
  }, [currentDate]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - 5 + i
  );

  const handlePrevYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear(selectedYear + 1);
  };

  const handleSelect = (month) => {
    setSelectedMonth(month);
    const newDate = new Date(selectedYear, month);
    onSelect(newDate);
    onClose();
  };

  if (!isOpen) return null;

  const today = new Date();
  const isCurrentYear = selectedYear === today.getFullYear();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-charcoal">Select Month</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cream rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Year selector */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevYear}
            className="p-2 hover:bg-cream rounded-lg transition-colors"
          >
            ←
          </button>
          <span className={clsx(
            "text-lg font-medium",
            isCurrentYear ? "text-primary" : "text-charcoal"
          )}>
            {selectedYear}
          </span>
          <button
            onClick={handleNextYear}
            className="p-2 hover:bg-cream rounded-lg transition-colors"
          >
            →
          </button>
        </div>

        {/* Month grid */}
        <div className="grid grid-cols-3 gap-2">
          {monthNames.map((month, index) => {
            const isSelected = selectedYear === currentDate.getFullYear() && index === currentDate.getMonth();

            return (
              <button
                key={month}
                onClick={() => handleSelect(index)}
                className={clsx(
                  "p-3 rounded-lg text-center transition-colors",
                  "hover:bg-cream",
                  isSelected && "bg-primary text-white hover:bg-primary/90"
                )}
              >
                {month}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
