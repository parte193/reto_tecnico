import { z } from 'zod';

// Esquema de validación para login
export const loginSchema = z.object({
  correo_electronico: z
    .string()
    .email('Ingrese un correo electrónico válido')
    .nonempty('El correo electrónico es requerido'),
  contrasena: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(20, 'La contraseña no debe exceder 20 caracteres')
    .nonempty('La contraseña es requerida'),
});

// Tipo derivado del esquema
export type LoginFormData = z.infer<typeof loginSchema>;