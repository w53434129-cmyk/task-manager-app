import { useState } from "react";

export default function TaskList() {
  const [tasks, setTasks] = useState([]); // start empty
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  // Add task
  const addTask = () => {
    if (!newTask.title.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), title: newTask.title.trim(), description: newTask.description.trim() },
    ]);
    setNewTask({ title: "", description: "" });
  };

  // Delete task
  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  // Update task
  const updateTask = (id, updatedTask) =>
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));

  return (
    <div className="max-w-7xl mx-auto">
      {/* Add Task Form */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task Name"
          className="flex-1 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          type="text"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Description"
          className="flex-1 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded transition"
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
          <p className="text-blue-600 font-medium">Add your first task now!</p>
        </div>
      ) : (
        // Tasks Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Task Card Component
function TaskCard({ task, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ title: task.title, description: task.description });

  const save = () => {
    if (!editedTask.title.trim()) return;
    updateTask(task.id, editedTask);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition p-5 flex flex-col justify-between">
      {isEditing ? (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={3}
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={save}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded transition"
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
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
