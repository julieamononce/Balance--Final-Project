import React, { useState, useEffect } from "react";
import CalendarGrid from "../components/CalendarGrid";
import Description from "../components/Description";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Calendar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0–11
  const [monthData, setMonthData] = useState({});
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // Fetch month data when month or year changes
  useEffect(() => {
    if (!user) return;

    fetch(`/api/calendar/month/${user.id}/${year}/${month}`)
      .then((res) => res.json())
      .then((json) => setMonthData(json));
  }, [year, month, user]);


  const handlePrevMonth = () => {
    setMonth((m) => {
      if (m === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  };

  const handleNextMonth = () => {
    setMonth((m) => {
      if (m === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white-200 via-yellow-100 to-pink-100 p-10">

      <button
        className="border rounded-md px-3 py-2 text-sm hover:shadow-glow transition-all duration-300"
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </button>

      <h1 className="text-5xl font-bold mt-8 mb-2 text-center">
        Calendar
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        <button onClick={handlePrevMonth}>← Prev</button>
        <h2 className="text-xl font-semibold">
          {new Date(year, month).toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button onClick={handleNextMonth}>Next →</button>
      </div>


      <div className="flex gap-8 mt-8">
        <div className="w-1/2">
          <CalendarGrid
            year={year}
            month={month}
            monthData={monthData}
            selectedDate={selectedDate}
            onSelectedDate={setSelectedDate}
          />
        </div>
        <div className="w-1/2">
          <Description
            selectedDate={selectedDate}
            year={year}
            month={month}
            monthData={monthData}
          />
        </div>
      </div>
    </div>
  );
}
