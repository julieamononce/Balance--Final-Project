import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[];
}

export default function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();

  // Still loading auth → wait
  if (loading) return <div>Loading...</div>;

  // Not logged in → redirect
  if (!user) return <Navigate to="/login" replace />;

  // Role-based access check (only run when profile actually exists)
  if (roles && profile && !roles.includes(profile.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
