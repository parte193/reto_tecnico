import axios from 'axios';
import { User } from '../types';

const API_URL = 'http://localhost:3000/api/users';

export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createUser = async (userData: User) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

export const updateUser = async (id: number, userData: User) => {
  const response = await axios.put(`${API_URL}/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
