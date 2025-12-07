import React from "react";

interface DescriptionProps{
    selectedDate: number | null;
}

export default function Description({selectedDate }: DescriptionProps){
    return(
        <div className="bg-white rounded-2xl shadow p-6 w-full mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {selectedDate 
                ? `December ${selectedDate}, 2025`
                : "Select a date to see details"}
            </h2>

            <p>
                {selectedDate
                ?`On December ${selectedDate} `
                : "Select a date to see details"}
            </p>
        </div>
    )
}