"use client";

import { useState, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, Plus, Shirt } from "lucide-react";
import clsx from "clsx";
import OutfitPopup from "./OutfitPopup";
import DateSelectorPopup from "./DateSelectorPopup";
import MonthYearSelectorPopup from "./MonthYearSelectorPopup";

export default function OutfitCalendar({
  partnerName = "Partner",
  user
}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState("your-outfits");
  const [viewMode, setViewMode] = useState("month"); // 'month' or 'day'
  const [currentDay, setCurrentDay] = useState(new Date());
  const [isDateSelectorOpen, setIsDateSelectorOpen] = useState(false);
  const [isMonthSelectorOpen, setIsMonthSelectorOpen] = useState(false);

  // Handle responsive view changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // sm breakpoint
        setViewMode("day");
      } else {
        setViewMode("month");
      }
    };

    // Set initial view
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add console logs for debugging
  useEffect(() => {
    console.log('OutfitCalendar - Current view:', view);
    console.log('OutfitCalendar - User data:', user);
    console.log('OutfitCalendar - Partner data:', user?.partner);
  }, [view, user]);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    // Optionally select today's date
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    if (user?.outfits[dateString]) {
      setSelectedDate(dateString);
    }
  };

  const handleDateClick = (date) => {
    // Create date in local timezone
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const selectedDateObj = new Date(year, month, date);

    // Format date string in YYYY-MM-DD format
    const dateString = selectedDateObj.toISOString().split('T')[0];
    setSelectedDate(dateString);
  };

  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString + 'T00:00:00'); // Ensure local timezone
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleAddOutfit = () => {
    // TODO: Implement add outfit functionality
    console.log("Add outfit for", selectedDate);
  };

  const handleEditOutfit = () => {
    // TODO: Implement edit outfit functionality
    console.log("Edit outfit for", selectedDate);
  };

  const closePopup = () => {
    setSelectedDate(null);
  };

  const getOutfitsForView = () => {
    if (view === "your-outfits") {
      return user?.outfits;
    }
    return user?.partner?.outfits;
  };

  const renderCalendarDays = () => {
    const days = [];
    const today = new Date();
    const currentYear = currentMonth.getFullYear();
    const currentMonthNum = currentMonth.getMonth();
    const outfits = getOutfitsForView() || {}; // Provide empty object as fallback

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      // Create date in local timezone
      const dateObj = new Date(currentYear, currentMonthNum, day);
      const dateString = dateObj.toISOString().split('T')[0];

      const isToday = today.getDate() === day &&
                     today.getMonth() === currentMonthNum &&
                     today.getFullYear() === currentYear;
      const hasOutfit = outfits && outfits[dateString];

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={clsx(
            "h-24 p-2 text-left border rounded-lg transition-all duration-200 relative",
            "hover:border-primary/50 hover:bg-white/50",
            isToday ? "border-primary bg-primary/10" : "border-charcoal/10",
            hasOutfit && !isToday && "border-secondary bg-secondary/5"
          )}
        >
          <div className="flex items-center justify-between">
            <span className={clsx(
              "text-sm font-medium",
              isToday && "text-primary font-semibold",
              hasOutfit && !isToday && "text-secondary"
            )}>
              {day}
            </span>
            {hasOutfit && (
              <Shirt size={16} className={clsx(
                isToday ? "text-primary" : "text-secondary"
              )} />
            )}
          </div>
        </button>
      );
    }

    return days;
  };

  const handleTodayDayView = () => {
    const today = new Date();
    setCurrentDay(today);
  };

  const isCurrentMonth = () => {
    const today = new Date();
    return currentMonth.getMonth() === today.getMonth() &&
           currentMonth.getFullYear() === today.getFullYear();
  };

  const isCurrentDay = () => {
    const today = new Date();
    return currentDay.toDateString() === today.toDateString();
  };

  const renderDayView = () => {
    const outfits = getOutfitsForView() || {}; // Provide empty object as fallback
    const dateString = currentDay.toISOString().split('T')[0];
    const hasOutfit = outfits && outfits[dateString];
    const isToday = isCurrentDay();

    return (
      <div className="space-y-8">
        {/* Date selector and Today button */}
        <div className="min-h-[88px] flex flex-col justify-center">
          <div className="relative flex items-center justify-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const prevDay = new Date(currentDay);
                  prevDay.setDate(currentDay.getDate() - 1);
                  setCurrentDay(prevDay);
                }}
                className="p-2 hover:bg-cream rounded-lg transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setIsDateSelectorOpen(true)}
                className="text-lg font-medium text-charcoal whitespace-normal hover:text-primary transition-colors"
              >
                {currentDay.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </button>
              <button
                onClick={() => {
                  const nextDay = new Date(currentDay);
                  nextDay.setDate(currentDay.getDate() + 1);
                  setCurrentDay(nextDay);
                }}
                className="p-2 hover:bg-cream rounded-lg transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          {!isToday && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleTodayDayView}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
              >
                <Calendar size={16} />
                <span className="text-sm font-medium">Today</span>
              </button>
            </div>
          )}
        </div>

        {/* Outfit content */}
        {hasOutfit ? (
          <div className="bg-cream/50 rounded-lg p-6 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-charcoal/70">Top</h4>
              <p className="text-lg text-charcoal">{outfits[dateString].top.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-charcoal/70">Bottom</h4>
              <p className="text-lg text-charcoal">{outfits[dateString].bottom.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-charcoal/70">Watches</h4>
              <p className="text-lg text-charcoal">{outfits[dateString].watches.name}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-cream/30 rounded-lg">
            {view === "your-outfits" ? (
              <p className="text-charcoal/70">No outfit chosen for this day</p>
            ) : (
              <div className="space-y-4">
                <p className="text-charcoal/70">No outfit chosen for {partnerName} on this day</p>
                <button
                  onClick={() => setSelectedDate(dateString)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Plus size={16} />
                  <span className="text-sm font-medium">Choose Outfit</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Date Selector Popup */}
        <DateSelectorPopup
          isOpen={isDateSelectorOpen}
          onClose={() => setIsDateSelectorOpen(false)}
          onDateSelect={setCurrentDay}
          currentDate={currentDay}
        />
      </div>
    );
  };

  const renderHeader = () => {
    if (viewMode === "day") {
      return (
        <div className="flex flex-col items-center gap-6 mb-8">
          <h2 className="text-xl sm:text-2xl font-medium text-charcoal text-center">
            Outfit Calendar
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView("your-outfits")}
              className={clsx(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                view === "your-outfits"
                  ? "bg-primary text-white"
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              )}
            >
              Your Outfits
            </button>
            <button
              onClick={() => setView("partner-outfits")}
              className={clsx(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                view === "partner-outfits"
                  ? "bg-secondary text-charcoal"
                  : "bg-secondary/10 text-secondary hover:bg-secondary/20"
              )}
            >
              {partnerName}'s Outfits
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h2 className="text-xl sm:text-2xl font-medium text-charcoal">
          Outfit Calendar
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView("your-outfits")}
            className={clsx(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
              view === "your-outfits"
                ? "bg-primary text-white"
                : "bg-primary/10 text-primary hover:bg-primary/20"
            )}
          >
            Your Outfits
          </button>
          <button
            onClick={() => setView("partner-outfits")}
            className={clsx(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
              view === "partner-outfits"
                ? "bg-secondary text-charcoal"
                : "bg-secondary/10 text-secondary hover:bg-secondary/20"
            )}
          >
            {partnerName}'s Outfits
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8">
      {renderHeader()}

      {/* Month selector row */}
      {viewMode === "month" && (
        <div className="relative flex items-center gap-4 mb-6">
          <div className="absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-cream rounded-lg transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => setIsMonthSelectorOpen(true)}
                className="text-lg font-medium text-charcoal whitespace-nowrap hover:text-primary transition-colors"
              >
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-cream rounded-lg transition-colors"
              >
                →
              </button>
            </div>
          </div>
          {!isCurrentMonth() && (
            <div className="ml-auto">
              <button
                onClick={handleToday}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors whitespace-nowrap"
              >
                <Calendar size={16} />
                <span className="text-sm font-medium">Today</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Calendar grid */}
      {viewMode === "month" && (
        <>
          <div className="grid grid-cols-7 gap-2 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-charcoal/70">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {renderCalendarDays()}
          </div>
        </>
      )}

      {viewMode === "day" && renderDayView()}

      {/* Outfit Popup - show in both month and day views */}
      <OutfitPopup
        isOpen={!!selectedDate}
        onClose={closePopup}
        date={selectedDate}
        outfit={selectedDate ? (getOutfitsForView() || {})[selectedDate] : null}
        view={view}
        partnerName={partnerName}
        onAddOutfit={handleAddOutfit}
        onEditOutfit={handleEditOutfit}
        user={user}
        partner={user.partner}
        isPreviewOnly={view === "your-outfits"}
      />

      {/* Date Selector Popup */}
      <DateSelectorPopup
        isOpen={isDateSelectorOpen}
        onClose={() => setIsDateSelectorOpen(false)}
        onDateSelect={setCurrentDay}
        currentDate={currentDay}
      />

      {/* Month Year Selector Popup */}
      <MonthYearSelectorPopup
        isOpen={isMonthSelectorOpen}
        onClose={() => setIsMonthSelectorOpen(false)}
        onSelect={setCurrentMonth}
        currentDate={currentMonth}
      />
    </div>
  );
}
