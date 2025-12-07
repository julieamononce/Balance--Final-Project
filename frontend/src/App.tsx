import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import RedirectIfAuthenticated from "./auth/RedirectIfAuthenticated";
import { AuthProvider } from "./auth/AuthProvider";
import Dashboard from "./pages/Dashboard"; // <-- ADD THIS

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* PUBLIC BUT REDIRECT IF LOGGED IN */}
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

          {/* DEFAULT ROUTE */}
          <Route
            path="/"
            element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            }
          />

          {/* USER DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />


        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
