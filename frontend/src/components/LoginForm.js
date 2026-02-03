export default function LoginForm({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin("dummy-token"); // replace with real auth later
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
    >
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
        Login
      </h1>

      <label className="block mb-2 font-semibold">Email</label>
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <label className="block mb-2 font-semibold">Password</label>
      <input
        type="password"
        placeholder="Enter your password"
        className="w-full p-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Login
      </button>
    </form>
  );
}
