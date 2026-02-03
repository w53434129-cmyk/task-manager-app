export default function TaskList() {
  const tasks = ["Task 1", "Task 2", "Task 3"]; // sample tasks

  return (
    <ul className="space-y-3">
      {tasks.map((task, i) => (
        <li
          key={i}
          className="p-4 bg-white rounded shadow hover:bg-gray-50 transition"
        >
          {task}
        </li>
      ))}
    </ul>
  );
}
