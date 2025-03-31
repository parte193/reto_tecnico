import axios from 'axios';
import { LoginCredentials, AuthResponse, User } from '../types';
import { getToken } from '../utils/localStorage';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
if (!API_URL) {
  throw new Error('API_URL environment variable is not set.');
}

// Configurar axios con URL base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Servicio de autenticación
export const authService = {
  // Iniciar sesión
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      console.log("Payload enviado:", credentials);
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      console.log("Respuesta recibida:", response.data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        } else {
          console.error('Error without response:', error.message);
        }
      } else {
        console.error('Unknown error:', error);
      }
      throw new Error('Unable to login. Please check your credentials.');
    }
  },

  // Obtener perfil del usuario
  getProfile: async (): Promise<User> => {
    try {
      const response = await api.get<User>('/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      throw new Error('Unable to fetch user profile. Please try again later.');
    }
  },
};

export default authService;
