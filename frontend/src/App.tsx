import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage'; // adjust path if needed
import FocusChat from './pages/FocusChat';
import ChatInterface from './components/ChatInterface';
import Sandbox from './pages/Sandbox';
import HistoryList from './components/HistoryList';
import ReflectChat from './pages/ReflectChat';

function App() {
  
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/sandbox" element={<Sandbox />} />
        <Route path="/focus" element={<FocusChat />} />
        <Route path="/reflect" element={<ReflectChat />} />

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

        <Route path ="/history" element ={<HistoryList />} />
  
      </Routes>
    </div>
  );
}

export default App;
