export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://backend-service:8080';

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const getTasks = async (token) => {
  const res = await fetch(`${API_URL}/api/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const createTask = async (task, token) => {
  const res = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  return res.json();
};
