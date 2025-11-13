import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage'; // adjust path if needed

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </div>
  );
}

export default App;
