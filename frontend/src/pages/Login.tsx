import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../auth/supabaseClient";
import type { FormEvent } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-center">

        <h2 className="text-3xl font-bold mb-2">Login</h2>
        <p className="text-gray-500 mb-6">Continue your journey with Balance</p>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
              placeholder="your.email@college.edu"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-purple-500 text-white font-semibold hover:bg-purple-600 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-gray-600 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-600 font-medium">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
