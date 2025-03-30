// Tipos para autenticación
export interface User {
    id: number;
    nombre: string;
    correo_electronico: string;
    rol: number;
    totalVentas?: number;
    creditosAprobados?: number;
    tarjetasCredito?: number;
  }
  
  export interface LoginCredentials {
    correo_electronico: string;
    contrasena: string;
  }
  
  export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
  }
  
  export interface AuthResponse {
    token: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
