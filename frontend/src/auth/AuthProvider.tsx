import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { supabase } from "./supabaseClient";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider mounted!");

    const loadSession = async () => {
      console.log("Calling supabase.auth.getSession()...");
      const { data, error } = await supabase.auth.getSession();
      console.log("SESSION RESULT:", data, error);

      if (data?.session?.user) {
        console.log("User found:", data.session.user);
        setUser(data.session.user);
      } else {
        console.log("No user found.");
      }

      setLoading(false);
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("AuthStateChange:", _event, session);
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  console.log("AuthProvider render → loading:", loading, "user:", user);

  // IMPORTANT: TEMP FIX — WE RENDER EVEN WHEN LOADING = TRUE
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
