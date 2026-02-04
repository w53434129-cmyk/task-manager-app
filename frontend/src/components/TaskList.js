import { useState } from "react";

export default function TaskList() {
  // State for tasks
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1" },
    { id: 2, title: "Task 2" },
    { id: 3, title: "Task 3" },
  ]);

  // State for new task input
  const [newTask, setNewTask] = useState("");

  // Add new task
  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), title: newTask.trim() }, // unique id
    ]);
    setNewTask(""); // clear input
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Edit task
  const editTask = (id, updatedTitle) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, title: updatedTitle } : task))
    );
  };

  return (
    <div>
      {/* Input for new task */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Task list */}
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-4 bg-white rounded shadow hover:bg-gray-50 transition"
          >
            <EditableTask task={task} editTask={editTask} />
            <button
              onClick={() => deleteTask(task.id)}
              className="ml-4 text-red-500 hover:text-red-700 font-bold"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component to edit task inline
function EditableTask({ task, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const save = () => {
    editTask(task.id, title);
    setIsEditing(false);
  };

  return isEditing ? (
    <div className="flex gap-2 flex-1">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 p-1 border border-gray-300 rounded"
      />
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
  ) : (
    <span onDoubleClick={() => setIsEditing(true)} className="flex-1 cursor-pointer">
      {task.title}
    </span>
  );
}
