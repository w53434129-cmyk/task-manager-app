export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://backend-service:8080';

// Login
export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

// Fetch tasks
export const getTasks = async (token) => {
  const res = await fetch(`${API_URL}/api/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  // map _id to id for frontend
  return data.map(task => ({ ...task, id: task._id }));
};

// Create task
export const createTask = async (task, token) => {
  const res = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  const created = await res.json();
  return { ...created, id: created._id }; // map _id to id
};

// Update task
export const updateTask = async (id, task, token) => {
  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  const updated = await res.json();
  return { ...updated, id: updated._id }; // map _id to id
};

// Delete task
export const deleteTask = async (id, token) => {
  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};
