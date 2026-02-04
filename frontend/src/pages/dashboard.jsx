import { useState } from "react";
import { login } from "../api"; // adjust path if needed
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await login(email, password);
    if (res.token) {
      setToken(res.token); // store JWT for TaskList
    } else {
      alert("Login failed");
    }
  };

  // If not logged in → show login form
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
          Login
        </h1>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full max-w-md mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full max-w-md mb-3 p-2 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full max-w-md bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
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
        <TaskList token={token} /> {/* pass token here */}
      </div>
    </div>
  );
}
