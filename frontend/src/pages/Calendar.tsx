import React, {useState} from'react';
import CalendarGrid from '../components/CalendarGrid';
import Description from '../components/Description';
import { useNavigate } from 'react-router-dom';


export default function Calendar(){
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState<number | null>(8);

    return(
        <div className ="min-h-screen bg-gradient-to-b from-white-200 via-yellow-100 to-pink-100 p-10">

            <button
            className="border rounded-md px-3 py-2 text-sm hover:shadow-glow transition-all duration-300"
            onClick={() => navigate("/dashboard")}>
            Back to Dashboard
            </button>

            <div className= "w-30 h-30 mx-auto mb-4 rounded-full bg-white flex items-center justify-center shadow-lg">
            <img src="/calendaricon.png" alt="Calendar Icon" className="mx-auto w-20 h-20  ml-5.5"/>
            </div>
            <h1 className="text-5xl font-bold mb-8 text-center">Calendar</h1>
            <p className="text-gray-600 mb-8">
                Track your emotions, journal entries, assignments, and upcoming exams all in one place.
            </p>

            {/* Components */}
            <div className="flex gap-8">
                <div className="w-1/2">
                    <CalendarGrid
                    selectedDate={selectedDate}
                    onSelectedDate={setSelectedDate}
                    />
                </div>
                <div className="w-1/2">
                    <Description selectedDate={selectedDate}/>
                </div>
            </div>

            <div className="mt-10 bg-white/50 border border-gray-200 text-gray-600 p-4 rounded-xl text-sm">
                <strong>Privacy Note:</strong> Your calendar entries are stored securely 
                and used only to help Balance understand your patterns 
            </div>

        </div>
    )
}