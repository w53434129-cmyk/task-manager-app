// src/pages/dashboard.jsx
import { useState } from "react";
import { login } from "../utils/api"; // your api.js
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("Please enter email and password");
    try {
      setLoading(true);
      const res = await login(email, password);
      if (res.token) {
        setToken(res.token); // store JWT for TaskList
      } else {
        alert(res.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed, check console");
    } finally {
      setLoading(false);
    }
  };

  // If user is not logged in, show login form
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          Login
        </h1>

        <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
          <button
            onClick={handleLogin}
            className={`w-full py-3 rounded-lg text-white font-semibold transition transform ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    );
  }

  // Logged in → show TaskList
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
        Dashboard
      </h1>

      <div className="w-full max-w-6xl">
        <TaskList token={token} />
      </div>
    </div>
  );
}
