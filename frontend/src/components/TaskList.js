import TaskList from '../components/TaskList';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
        Dashboard
      </h1>
      
      {/* Task list container */}
      <div className="w-full max-w-6xl">
        <TaskList />
      </div>
    </div>
  );
}
