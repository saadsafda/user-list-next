import axios from 'axios';

const api = axios.create({
  baseURL: '/api/users',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all users
export const getUsers = async () => {
  const response = await api.get('/');
  return response.data;
};

// Create a new user
export const createUser = async (user: { name: string; age: number }) => {
  const response = await api.post('/', user);
  return response.data;
};

// Delete a user by ID
export const deleteUser = async (id: number) => {
  const response = await api.delete(`/?id=${id}`);
  return response.data;
};
