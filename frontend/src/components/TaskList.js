import { useState } from "react";

export default function TaskList() {
  // State for tasks
  const [tasks, setTasks] = useState([
    // Initial tasks (optional)
    { id: 1, title: "Task 1", description: "Description 1" },
    { id: 2, title: "Task 2", description: "Description 2" },
    { id: 3, title: "Task 3", description: "Description 3" },
  ]);

  // State for new task input
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  // Add new task
  const addTask = () => {
    if (!newTask.title.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), title: newTask.title.trim(), description: newTask.description.trim() },
    ]);
    setNewTask({ title: "", description: "" }); // clear inputs
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Update task
  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
  };

  return (
    <div>
      {/* Add new task form */}
      <div className="mb-6 flex flex-col md:flex-row gap-2">
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Task Name"
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Description"
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>

      {/* Task cards grid (3 per row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </div>
    </div>
  );
}

// Individual task card component
function TaskCard({ task, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ title: task.title, description: task.description });

  const save = () => {
    if (!editedTask.title.trim()) return;
    updateTask(task.id, editedTask);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="p-2 border border-gray-300 rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={save}
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="font-bold text-lg mb-2">{task.title}</h2>
          <p className="text-gray-700 mb-4">{task.description}</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500 text-white"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
