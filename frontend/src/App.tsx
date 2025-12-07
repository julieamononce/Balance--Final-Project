import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage'; // adjust path if needed
import FocusChat from './pages/FocusChat';


import HistoryList from './components/HistoryList';
import ReflectChat from './pages/ReflectChat';
import Dashboard from './pages/Dashboard';
import Calendar from "./pages/Calendar";
// import CalendarGrid from './components/CalendarGrid';
// import Description from "./components/Description";

function App() {
  
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/focus" element={<FocusChat />} />
        <Route path="/reflect" element={<ReflectChat />} />
        <Route path = "/dashboard" element={<Dashboard />} />
        <Route path = "/calendar" element ={<Calendar />} />
        {/* <Route path = "/calendar" element ={<Calendar />} /> */}



        <Route path="/history/focus" element={<HistoryList mode="focus" />} />
        <Route path="/history/reflect" element={<HistoryList mode="reflect" />} />
        {/* <Route path="/calendargrid" element ={<CalendarGrid />} />
        <Route path = "/description" element ={<Description />} /> */}
      </Routes>
    </div>
  );
}

export default App;
