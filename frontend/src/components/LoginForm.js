import { login } from "../utils/api";
import { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const data = await login(email, password);
      console.log("Login response:", data); // 👈 see response in browser console

      if (data.token) {
        onLogin(data.token);
      } else if (data.error) {
        alert("Login failed: " + data.error);
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error("Login request failed:", err);
      alert("Login request failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
    >
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-4 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-6 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className={`w-full p-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-500"}`}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
