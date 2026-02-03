import { useEffect, useState } from 'react';
import { getTasks } from '../utils/api';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    getTasks(token).then(setTasks);
  }, []);
  return (
    <div>
      <h2 className="text-xl mb-2">Tasks</h2>
      <ul>
        {tasks.map(t => (
          <li key={t._id}>{t.title} - {t.completed ? '✅' : '❌'}</li>
        ))}
      </ul>
    </div>
  );
}
