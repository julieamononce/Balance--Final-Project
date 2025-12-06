import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage'; // adjust path if needed
import FocusChat from './pages/FocusChat';
import ChatInterface from './components/ChatInterface';
import Sandbox from './pages/Sandbox';
import HistoryList from './components/HistoryList';
import ReflectChat from './pages/ReflectChat';
import Dashboard from './pages/Dashboard';

function App() {
  
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/sandbox" element={<Sandbox />} />
        <Route path="/focus" element={<FocusChat />} />
        <Route path="/reflect" element={<ReflectChat />} />
        <Route path = "/dashboard" element={<Dashboard />} />

        <Route 
          path="/interface" 
          element={
            <ChatInterface
              mode="focus"
              title="Preview Chat Interface"
              description="This is just for testing."
            />
          } 
        />

        <Route path="/history/focus" element={<HistoryList mode="focus" />} />
        <Route path="/history/reflect" element={<HistoryList mode="reflect" />} />
  
      </Routes>
    </div>
  );
}

export default App;
