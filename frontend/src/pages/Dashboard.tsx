import { supabase } from "../auth/supabaseClient";

export default function Dashboard() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold">Dashboard</h1>

      <button
        onClick={() => supabase.auth.signOut()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}
