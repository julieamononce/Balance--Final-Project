import React from "react";

interface CalendarGridProps {
  year: number;
  month: number; // 0–11
  monthData: any;
  selectedDate: number | null;
  onSelectedDate: (date: number) => void;
}

export default function CalendarGrid({
  year,
  month,
  monthData,
  selectedDate,
  onSelectedDate
}: CalendarGridProps) {
  
  // Number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // What day of week the month starts on (0 = Sun)
  const startDay = new Date(year, month, 1).getDay();

  // Today (for auto-highlight)
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  // Create array of days
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-2xl shadow p-6 w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {new Date(year, month).toLocaleString("default", { month: "long" })} {year}
      </h2>

      {/* Day headers */}
      <div className="grid grid-cols-7 text-center text-gray-500 font-medium mb-2">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center">

        {/* Empty boxes for start day offset */}
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Days */}
        {days.map((day) => {
          const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

          const hasData = monthData[dateKey] !== undefined;
          const isSelected = selectedDate === day;
          const isToday = isCurrentMonth && today.getDate() === day;

          return (
            <button
              key={day}
              onClick={() => onSelectedDate(day)}
              className={`
                py-2 rounded-xl transition
                ${isSelected ? "bg-pink-300 text-white font-semibold" 
                : isToday ? "bg-yellow-200 font-semibold"
                : "text-gray-700 hover:bg-pink-100"}
                ${hasData ? "border-2 border-purple-300" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
