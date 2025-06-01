"use client";

import { useState } from "react";
import { Calendar, X } from "lucide-react";
import clsx from "clsx";

export default function DateSelectorPopup({ isOpen, onClose, onDateSelect, currentDate }) {
  const [selectedMonth, setSelectedMonth] = useState(currentDate);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    selectedMonth.getFullYear(),
    selectedMonth.getMonth(),
    1
  ).getDay();

  const handlePrevMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1));
  };

  const handleDateClick = (day) => {
    const newDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
    onDateSelect(newDate);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-charcoal">Select Date</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cream rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Month selector */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-cream rounded-lg transition-colors"
          >
            ←
          </button>
          <span className="text-lg font-medium text-charcoal">
            {monthNames[selectedMonth.getMonth()]} {selectedMonth.getFullYear()}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-cream rounded-lg transition-colors"
          >
            →
          </button>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-charcoal/70">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
            const isToday = date.toDateString() === new Date().toDateString();
            const isSelected = date.toDateString() === currentDate.toDateString();

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={clsx(
                  "aspect-square flex items-center justify-center rounded-lg text-sm transition-colors",
                  "hover:bg-cream",
                  isToday && "bg-primary/10 text-primary font-medium",
                  isSelected && "bg-primary text-white hover:bg-primary/90"
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
