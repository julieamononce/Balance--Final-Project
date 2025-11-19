import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage'; // adjust path if needed
import FocusChat from './pages/FocusChat';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/focus" element={<FocusChat />} />
      </Routes>
    </div>
  );
}

export default App;
