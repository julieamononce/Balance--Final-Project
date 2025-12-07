import React from "react";

interface CalendarGridProps{
    selectedDate: number | null;
    onSelectedDate: (date: number) => void;

}

export default function CalendarGrid({selectedDate, onSelectedDate }: CalendarGridProps){
    const daysInDecember = Array.from({ length: 31 }, (_, i) => i + 1);

    return(
        <div className="bg-white rounded-2xl shadow p-6 w-full">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">December 2025</h2>
            
            {/* Day headers */}
            <div className="grid grid-cols-7 text-center text-gray-500 font-medium mb-2">
                <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span>
                <span>Thu</span><span>Fri</span><span>Sat</span>
            </div>

            {/* The actual Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 text-center">
                {/* Adding empty spaces so December starts on Monday */}
                <div></div> {/* Sun */}
                <div></div> {/* Mon */}
                <div></div> {/* Tue */}

                {daysInDecember.map((day) => (
                    <button key={day} 
                    onClick={() => onSelectedDate(day)}
                    className={`py-2 rounded-xl transition ${
                        selectedDate === day
                        ? "bg-pink-300 text-white font-semibold"
                        : "text-gray-700 hover:bg-pink-100"
                    }
                    `}
                >
                    {day}
                    </button>
                ))}
            </div>  
        </div>
        );
}