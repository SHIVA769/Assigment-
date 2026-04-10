const BASE_URL = 'http://localhost:5000/api';

const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Something went wrong');
  }
  return response.json();
};

const api = {
  // Auth
  login: async (username, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ username, password }),
    });
    return handleResponse(res);
  },
  register: async (username, password) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ username, password }),
    });
    return handleResponse(res);
  },

  // Students
  getStudents: async () => {
    const res = await fetch(`${BASE_URL}/students`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },
  addStudent: async (data) => {
    const res = await fetch(`${BASE_URL}/students`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
  updateStudent: async (id, data) => {
    const res = await fetch(`${BASE_URL}/students/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
  deleteStudent: async (id) => {
    const res = await fetch(`${BASE_URL}/students/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(res);
  },

  // Tasks
  getTasks: async () => {
    const res = await fetch(`${BASE_URL}/tasks`, {
      headers: getHeaders(),
    });
    return handleResponse(res);
  },
  addTask: async (data) => {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
  updateTask: async (id, data) => {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
  deleteTask: async (id) => {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(res);
  }
};

export default api;
