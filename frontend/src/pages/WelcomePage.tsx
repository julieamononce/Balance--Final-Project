
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";



export default function WelcomePage() {
  const navigate = useNavigate();

  return (

    <div>
        <div className="min-h-screen flex flex-col justify-center bg-gradient-to-b from-blue-200 to-purple-300">
        
        <div className="mb-6 px-5">
                <header className="mb-4 text-center -mt-10">
                <div>
                    <h1 className="text-7xl font-bold text-white -mt-20">Balance</h1>
                    <p className="text-3xl text-white mt-3">Your companion for academic success and mental well-being</p>
                </div>

                </header>
                <div className="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 ml-20 mt-20">
                    <Card title = "Focus Mode" description="Study assistance with note summaries and organized to-dos." image = "/focusicon.png" shadow="shadow-lg shadow-purple-900/50" className="bg-transparent" width="w-90"/>
                    <Card title = "Reflect Mode" description="Check in with your emotions, reflect on your well-being." image = "/reflecticon.png" shadow="shadow-lg shadow-blue-900/50" className="bg-transparent" width="w-95"/>
                    <Card title = "Calendar" description="Track your emotions, journals, assignments & upcoming exams." image = "/calendaricon.png" shadow="shadow-lg shadow-pink-500/50" className="bg-transparent" width="w-90"/> 
                </div>

                <div className="flex justify-center">
                    <button
                      onClick={() => navigate("/dashboard")}   // <-- change route here
                      className="mt-8 px-6 py-3 rounded-lg text-black font-medium transition-all duration-300 hover:shadow-lg bg-white hover:bg-gray-100"
                    >
                      Get Started
                    </button>

                </div>

                <div className="flex justify-center mt-8">
                    <p className="text-1xs text-gray-600">
                        Balance is a supportive AI tool for your academic journey, not a replacement for 
                        professional mental health care. We encourage you to see appropriate 
                        resources when needed. 
                    </p>
                </div>

                
        </div>

        </div>

        
    </div>

    
    );
}