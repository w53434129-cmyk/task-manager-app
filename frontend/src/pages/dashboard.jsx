import TaskList from '../components/TaskList';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Dashboard</h1>
      <TaskList />
    </div>
  );
}
