import TaskList from '../components/TaskList';

export default function Dashboard() {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;

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
