import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTasks, createTask, updateTask, deleteTask } from "../utils/api";

export default function TaskList({ token }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  // Load tasks from backend
  useEffect(() => {
    if (token) loadTasks();
  }, [token]);

  const loadTasks = async () => {
    try {
      const data = await getTasks(token);
      setTasks(data);
    } catch (err) {
      console.error("Load failed", err);
    }
  };

  // Add task → MongoDB
  const addTask = async () => {
    if (!newTask.title.trim()) return;
    await createTask(newTask, token);
    setNewTask({ title: "", description: "" });
    loadTasks();
  };

  // Delete → MongoDB
  const removeTask = async (id) => {
    await deleteTask(id, token);
    loadTasks();
  };

  // Update → MongoDB
  const editTask = async (id, updated) => {
    await updateTask(id, updated, token);
    loadTasks();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Add Task Form */}
      <div className="mb-8 p-6 bg-white rounded-xl shadow-md flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task Name"
          className="flex-1 p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Description"
          className="flex-1 p-3 border border-gray-300 rounded-lg"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center text-gray-500">No tasks yet</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <TaskCard
                  task={task}
                  deleteTask={removeTask}
                  updateTask={editTask}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function TaskCard({ task, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
  });

  const save = () => {
    updateTask(task._id, editedTask);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-5">
      {isEditing ? (
        <>
          <input
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
          />
          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
          />
          <button onClick={save}>Save</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </>
      )}
    </div>
  );
}
