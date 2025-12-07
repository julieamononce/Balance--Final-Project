import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import RedirectIfAuthenticated from "./auth/RedirectIfAuthenticated";
import { AuthProvider } from "./auth/AuthProvider";

import WelcomePage from "./pages/WelcomePage";
import FocusChat from "./pages/FocusChat";
import ChatInterface from "./components/ChatInterface";
import Sandbox from "./pages/Sandbox";
import HistoryList from "./components/HistoryList";
import ReflectChat from "./pages/ReflectChat";

import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      
        <Routes>

          {/*PUBLIC ROUTES  */}
          <Route
            path="/login"
            element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            }
          />

          <Route
            path="/signup"
            element={
              <RedirectIfAuthenticated>
                <SignUp />
              </RedirectIfAuthenticated>
            }
          />

          {/* DEFAULT ROOT → show welcome page */}
          <Route
            path="/"
            element={
              <RedirectIfAuthenticated>
                <WelcomePage />
              </RedirectIfAuthenticated>
            }
          />

          {/* 🔹 PROTECTED USER ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/focus"
            element={
              <ProtectedRoute>
                <FocusChat />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reflect"
            element={
              <ProtectedRoute>
                <ReflectChat />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sandbox"
            element={
              <ProtectedRoute>
                <Sandbox />
              </ProtectedRoute>
            }
          />

          <Route
            path="/history/focus"
            element={
              <ProtectedRoute>
                <HistoryList mode="focus" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/history/reflect"
            element={
              <ProtectedRoute>
                <HistoryList mode="reflect" />
              </ProtectedRoute>
            }
          />

          {/* Testing route for chat interface */}
          <Route
            path="/interface"
            element={
              <ProtectedRoute>
                <ChatInterface
                  mode="focus"
                  title="Preview Chat Interface"
                  description="This is just for testing."
                />
              </ProtectedRoute>
            }
          />

          {/* ADMIN-ONLY ROUTE */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

        </Routes>
      
    </AuthProvider>
  );
}

export default App;
