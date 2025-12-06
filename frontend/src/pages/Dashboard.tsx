import React, { useState } from 'react';
import Card from '../components/Card';
export default function Dashboard() {
    return (
    <div>

        <div className="min-h-screen flex flex-col justify-start bg-gradient-to-b from-blue-300 to-purple-200 pt-16">


            <div className="mb-6 px-5">
                <header className="mb-4 flex justify-between items-start">
                <div>
                    <h1 className="text-6xl font-bold">Welcome!</h1>
                    <p className="text-xl text-gray-500">How can Balance support you today?</p>
                </div>

                <div className="flex gap-2">
                    <button className= "px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg bg-pink-300 hover:bg-pink-600" >Sign out</button>
                </div>
                </header>
            </div>
        

            <div className="grid justify-center grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-5">
                <Card title = "Focus Mode" description="Study smarter. Summarize notes, organize tasks, and get personalized study support." link = "/focus" image = "/focusicon.png" shadow="shadow-lg shadow-purple-900/50"/>
                <Card title = "Reflect Mode" description="Check in with yourself. Mindful prompts for emotional awareness and self-reflection." link = "/reflect" image = "/reflecticon.png" shadow="shadow-lg shadow-blue-900/50"/>
                <Card title = "Calendar" description="View patterns in emotions, journals, and your upcoming exams/assignments." link = "/calendar" image = "/calendaricon.png" shadow="shadow-lg shadow-pink-500/50"/> 
            </div>

            <div className="flex justify-center mt-8">
                <div className="bg-white rounded-md shadow-md p-5 w-325 transition-shadow cursor-pointer">
                                <strong>Important:</strong> Balance is designed to support your well-being, not replace professional care. 
            If you're experiencing distress, please reach out to your campus counseling center or a mental health professional.
                </div>
            </div>

            <div>

            </div>

        </div>
    
    </div>
    );
}