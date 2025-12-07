import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

export default function RedirectIfAuthenticated({
  children,
}: {
  children: ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) return null;

  // If logged in → go to dashboard
  if (user) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
}
