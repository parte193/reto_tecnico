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
