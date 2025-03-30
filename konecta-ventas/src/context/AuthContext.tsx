import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthContextType, LoginCredentials, User, AuthState } from '../types';
import authService from '../api/authService';
import { setToken, getToken, removeToken } from '../utils/localStorage';
import axios from 'axios';

// Acciones del reducer
type AuthAction =
  | { type: 'LOGIN_REQUEST' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'LOAD_USER'; payload: User };

// Estado inicial
const initialState: AuthState = {
  user: null,
  token: getToken(),
  isAuthenticated: Boolean(getToken()),
  isLoading: false,
  error: null,
};

// Reducer para manejar estado de autenticación
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      };
    case 'LOAD_USER':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    default:
      return state;
  }
};

// Crear contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Cargar usuario si hay token
    const loadUser = async () => {
      if (state.token && !state.user) {
        try {
          const user = await authService.getProfile();
          dispatch({ type: 'LOAD_USER', payload: user });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          removeToken();
          dispatch({ type: 'LOGOUT' });
        }
      }
    };

    loadUser();
  }, [state.token, state.user]);

  // Función para iniciar sesión
  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const response = await authService.login(credentials);
      setToken(response.token);
      const user = await authService.getProfile();
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token: response.token },
      });
    } catch (error) {
      let errorMessage = 'Error al iniciar sesión';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    removeToken();
    dispatch({ type: 'LOGOUT' });
  };

  const value = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};