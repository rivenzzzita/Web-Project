import axios from 'axios';

const API_BASE_URL = 'http://localhost:6060/api/users';

// Listar todos los usuarios
export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la lista de usuarios:', error);
    throw error;
  }
};

// Listar usuario por ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el usuario por ID:', error);
    throw error;
  }
};

// Crear usuario
export const createUser = async (user) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, user);
    return response.data;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
};

// Actualizar usuario por ID
export const updateUser = async (userId, updatedUser) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${userId}`, updatedUser);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

// Eliminar usuario por ID
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};
