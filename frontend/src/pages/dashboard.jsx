import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTasks, createTask, updateTask, deleteTask } from "../utils/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "Todo" });
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) return;
      try {
        const data = await getTasks(token);
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, [token]);

  // Add task
  const addTask = async () => {
    if (!newTask.title.trim()) return;
    try {
      const created = await createTask(newTask, token);
      // Update tasks state so new task shows immediately
      setTasks([...tasks, created]);
      setNewTask({ title: "", description: "", status: "Todo" });
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  // Delete task
  const deleteTaskById = async (id) => {
    try {
      await deleteTask(id, token);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Update task
  const updateTaskById = async (id, updatedTask) => {
    try {
      const updated = await updateTask(id, updatedTask, token);
      setTasks(tasks.map((task) => (task.id === id ? updated : task)));
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Dashboard title */}
      <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
        Dashboard
      </h1>

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
        <select
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gradientBlue focus:outline-none transition"
        >
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <button
          onClick={addTask}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md transform hover:scale-105 transition"
        >
          Add Task
        </button>
      </div>

      {/* Task List / Empty State */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TaskCard
                  task={task}
                  deleteTask={deleteTaskById}
                  updateTask={updateTaskById}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

// TaskCard: title, description, status text
function TaskCard({ task, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title || "",
    description: task.description || "",
    status: task.status || "Todo",
  });

  const save = () => {
    if (!editedTask.title.trim()) return;
    updateTask(task.id, editedTask);
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
            placeholder="Title"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gradientBlue focus:outline-none transition"
            rows={3}
            placeholder="Description"
          />
          <select
            value={editedTask.status}
            onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gradientBlue focus:outline-none transition"
          >
            <option>Todo</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
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
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title || "No Title"}</h3>
            <p className="text-gray-600 mb-2">{task.description || "No Description"}</p>

            {/* Status text aligned under description */}
            <p className="text-gray-700 font-medium text-sm mt-1">
              Status: {task.status || "Todo"}
            </p>
          </div>

          <div className="flex justify-end gap-2 mt-3">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-sm transition transform hover:scale-105"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-sm transition transform hover:scale-105"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
