// Tipos para autenticación
export interface User {
    id?: number;
    nombre: string;
    correo_electronico: string;
    rol: number;
    fecha_creacion?: string;
    totalVentas?: number;
    creditosAprobados?: number;
    tarjetasCredito?: number;
}

export interface UserFormData {
  nombre: string;
  correo_electronico: string;
  contrasena?: string;
  id_rol: string;
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

  export interface Sale {
    id?: number;
    id_producto_tipo?: number;
    producto: string;
    cupo_solicitado: number;
    id_franquicia?: number | null;
    franquicia?: string | null;
    tasa?: number | null;
    fecha_creacion?: string;
    id_usuario_creacion?: number;
    usuario_creacion?: string;
    fecha_actualizacion?: string;
    id_usuario_actualizacion?: number;
    usuario_actualizacion?: string;
  }
  
  export interface SaleFormData {
    id_producto_tipo: string;
    cupo_solicitado: string;
    id_franquicia?: string;
    tasa?: string;
  }
  
  export interface ProductType {
    id: number;
    nombre: string;
  }
  
  export interface Franchise {
    id: number;
    nombre: string;
  }