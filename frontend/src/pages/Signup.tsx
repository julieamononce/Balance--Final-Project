import { useState } from "react";
import { supabase } from "../auth/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  
   const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  // 1️⃣ Create auth user
  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    setError(signUpError.message);
    return;
  }

  const user = data.user;
  if (!user) {
    setError("Signup failed.");
    return;
  }

  // 2️⃣ Wait briefly for session to activate (important for RLS policies)
  await new Promise((res) => setTimeout(res, 500));

  // 3️⃣ Insert profile row
  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      name,
      role: "user",
    });

  if (profileError) {
    setError(profileError.message);
    return;
  }

  navigate("/login");
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-400 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-10">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Start your journey with Balance
        </p>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="text-gray-600 font-medium">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium">Email</label>
            <input
              type="email"
              placeholder="your.email@college.edu"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="text-gray-600 font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <span
            className="text-purple-600 font-medium cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
