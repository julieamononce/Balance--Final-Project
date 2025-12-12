import React from "react";

interface DescriptionProps {
  selectedDate: number | null;
  year: number;
  month: number;
  monthData: any;
}

export default function Description({ selectedDate, year, month, monthData }: DescriptionProps) {
  
  if (!selectedDate) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 w-full mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Select a date to see details
        </h2>
        <p className="text-gray-500">Choose a date on the calendar.</p>
      </div>
    );
  }

  const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`;
  const data = monthData[dateKey] || {};

  return (
    <div className="bg-white rounded-2xl shadow p-6 w-full mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {new Date(year, month, selectedDate).toLocaleDateString("default", {
          month: "long",
          day: "numeric",
          year: "numeric"
        })}
      </h2>

      <div className="mb-6">
        <h3 className="font-semibold text-pink-500">Reflect Summary</h3>
        {data.reflect ? (
          <>
            <p className="text-gray-700 mt-2">{data.reflect.summary_text}</p>
            <p className="text-gray-500 text-sm mt-1">
              Mood: {data.reflect.mood_label}
            </p>
          </>
        ) : (
          <p className="text-gray-400 text-sm">No reflection entry.</p>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-yellow-600">Focus Summary</h3>
        {data.focus ? (
          <p className="text-gray-700 mt-2">{data.focus.summary_text}</p>
        ) : (
          <p className="text-gray-400 text-sm">No focus entry.</p>
        )}
      </div>
    </div>
  );
}
