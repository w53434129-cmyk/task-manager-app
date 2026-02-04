// TaskList.js
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTasks, createTask } from "../utils/api"; // your api.js

export default function TaskList({ token }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);

  // Fetch tasks on mount or when token changes
  useEffect(() => {
    if (!token) return;
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const tasksFromBackend = await getTasks(token);
        setTasks(tasksFromBackend);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [token]);

  // Add task
  const handleAddTask = async () => {
    if (!newTask.title.trim()) return;

    try {
      // Save to backend
      const createdTask = await createTask(newTask, token);
      // Update local state
      setTasks([...tasks, createdTask]);
      setNewTask({ title: "", description: "" });
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  // Delete and update tasks locally (optional: implement backend API later)
  const deleteTask = (id) => setTasks(tasks.filter((task) => task._id !== id));
  const updateTask = (id, updatedTask) =>
    setTasks(tasks.map((task) => (task._id === id ? { ...task, ...updatedTask } : task)));

  if (!token) {
    return <p>Please log in to see your tasks.</p>;
  }

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Add Task Form */}
      <div className="mb-8 p-6 bg-white rounded-xl shadow-md flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task Name"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gradientBlue focus:outline-none transition"
        />
        <input
          type="text"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Description"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gradientBlue focus:outline-none transition"
        />
        <button
          onClick={handleAddTask}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md transform hover:scale-105 transition"
        >
          Add Task
        </button>
      </div>

      {/* Empty State */}
      {tasks.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-96 space-y-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h4l2-2 2 2h4a2 2 0 012 2v12a2 2 0 01-2 2z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-700">No tasks yet</h2>
          <p className="text-gray-400 max-w-xs">
            Your task list is empty. Start by adding your first task using the form above.
          </p>
          <p className="text-gradientBlue font-medium">Add your first task now!</p>
        </div>
      ) : (
        // Tasks Grid with animation
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TaskCard task={task} deleteTask={deleteTask} updateTask={updateTask} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

// Individual Task Card
function TaskCard({ task, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ title: task.title, description: task.description });

  const save = () => {
    if (!editedTask.title.trim()) return;
    updateTask(task._id, editedTask);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between hover:shadow-2xl transition transform hover:-translate-y-1">
      {isEditing ? (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gradientBlue focus:outline-none transition"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gradientBlue focus:outline-none transition"
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={save}
              className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white px-3 py-1 rounded-lg shadow-md transform hover:scale-105 transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h3>
            <p className="text-gray-600 mb-4">{task.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
