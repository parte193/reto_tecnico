📌 Sistema de Ventas


📋 Descripción
El Sistema de Ventas es una aplicación web diseñada para gestionar ventas y usuarios de manera eficiente. Incluye un sistema de autenticación, gestión de productos y generación de reportes en dashboard principal.

🚀 Tecnologías utilizadas
Frontend: React, Material-UI. typescript

Backend: Node.js, Express

Base de datos: MySQL

🖥 Pantallas principales

1️⃣ Pantalla de Inicio de Sesión
📍 URL: /login
📌 Permite a los usuarios autenticarse en el sistema ingresando su correo y contraseña.
✅ Componentes principales:

Campo de entrada para Correo Electrónico

Campo de entrada para Contraseña

Botón Iniciar Sesión

![image](https://github.com/user-attachments/assets/9a60926a-9060-427c-84b7-075d6521b67c)


2️⃣ Panel Principal
📍 URL: /dashboard
📌 Muestra estadísticas y acceso rápido a las funcionalidades del sistema.

![image](https://github.com/user-attachments/assets/1e2a8784-daf2-4ed7-b234-9e406542312b)


3️⃣ Gestión de Ventas
📍 URL: /sales
📌 Permite agregar, editar y eliminar productos del inventario.

![image](https://github.com/user-attachments/assets/d1582705-b1e6-45bf-9ac7-f9baa8eca5ed)


4️⃣ Administración de usuarios
📍 URL: /users
📌 Creación,edición y eliminación de usuarios.

![image](https://github.com/user-attachments/assets/080c9ea5-dc95-4c38-a82e-ddc397af0b95)


⚙ Instalación y Ejecución

1️⃣se debe crear tabla en MySQL Para los usuarios

-- Crear la base de datos
CREATE DATABASE sistema_login;

-- Usar la base de datos
USE sistema_login;

-- Crear tabla de roles
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL UNIQUE,
    descripcion VARCHAR(100)
);

-- Insertar roles predefinidos
INSERT INTO roles (nombre, descripcion) 
VALUES 
('Administrador', 'Usuario con acceso total al sistema'),
('Asesor', 'Usuario con acceso limitado al sistema');

-- Crear tabla de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    correo_electronico VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL, -- Mayor longitud para almacenar hash
    id_rol INT NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_rol) REFERENCES roles(id)
);

-- Agregar índices para búsquedas eficientes
CREATE INDEX idx_usuarios_correo ON usuarios(correo_electronico);
CREATE INDEX idx_usuarios_rol ON usuarios(id_rol);


2️⃣ crear una segunda tabla para gestionar el CRUD de ventas de productos con todas las condiciones especificadas.


-- Usar la base de datos ya creada
USE sistema_login;

-- Crear tabla de tipos de productos
CREATE TABLE productos_tipo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Insertar tipos de productos predefinidos
INSERT INTO productos_tipo (nombre) 
VALUES 
('Credito de Consumo'),
('Libranza Libre Inversión'),
('Tarjeta de Credito');

-- Crear tabla de franquicias para tarjetas
CREATE TABLE franquicias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL UNIQUE
);

-- Insertar franquicias predefinidas
INSERT INTO franquicias (nombre) 
VALUES 
('AMEX'),
('VISA'),
('MASTERCARD');

-- Crear tabla de ventas
CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_producto_tipo INT NOT NULL,
    cupo_solicitado DECIMAL(12,2) NOT NULL,
    id_franquicia INT NULL, -- NULL si no es tarjeta de crédito
    tasa DECIMAL(4,2) NULL, -- NULL si es tarjeta de crédito
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_usuario_creacion INT NOT NULL,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id_usuario_actualizacion INT NOT NULL,
    FOREIGN KEY (id_producto_tipo) REFERENCES productos_tipo(id),
    FOREIGN KEY (id_franquicia) REFERENCES franquicias(id),
    FOREIGN KEY (id_usuario_creacion) REFERENCES usuarios(id),
    FOREIGN KEY (id_usuario_actualizacion) REFERENCES usuarios(id)
);

-- Agregar índices para búsquedas eficientes
CREATE INDEX idx_ventas_producto ON ventas(id_producto_tipo);
CREATE INDEX idx_ventas_usuario_creacion ON ventas(id_usuario_creacion);
CREATE INDEX idx_ventas_usuario_actualizacion ON ventas(id_usuario_actualizacion);


1️⃣ Clonar el repositorio
sh
Copiar
Editar
git clone [https://github.com/tu-usuario/sistema-de-ventas.git](https://github.com/parte193/reto_tecnico.git)
cd reto_tecnico

2️⃣ Instalar dependencias
sh
Copiar
Editar
pnpm install

3️⃣ Ejecutar la aplicación
sh
Copiar
Editar
pnpm dev
La aplicación estará disponible en http://localhost:5173/.


🔐 Autenticación y Seguridad
Se utiliza JWT para la autenticación de usuarios.

Se implementa validación de formularios con Zod.

Protección de rutas con React Router.
