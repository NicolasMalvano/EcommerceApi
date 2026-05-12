<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

---

# 🛒 Ecommerce REST API

API REST robusta y escalable para una plataforma de ecommerce, construida con **NestJS** y **TypeScript**. Incluye autenticación de usuarios con JWT, gestión de productos, categorías y órdenes, carga de imágenes con Cloudinary y documentación completa con Swagger.

---

## 🚀 Funcionalidades Principales

### 👤 Usuarios
- Consulta, actualización y eliminación de usuarios
- Encriptación segura de contraseñas con **Bcrypt**

### 🔐 Autenticación
- Registro e inicio de sesión
- Generación de **JSON Web Tokens (JWT)**
- Protección de rutas mediante **Guards**

### 📦 Productos
- CRUD completo de productos con paginación
- Seeding automático de categorías y productos al iniciar la app

### 🧾 Órdenes
- Creación de órdenes de compra
- Asociación de productos y usuarios a una orden
- Gestión de detalles de órdenes

### 🖼️ Imágenes
- Carga de imágenes de productos
- Almacenamiento en la nube con **Cloudinary**

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Framework | NestJS |
| Lenguaje | TypeScript |
| Base de datos | PostgreSQL |
| ORM | TypeORM |
| Autenticación | JWT + Guards |
| Encriptación | Bcrypt |
| Almacenamiento de imágenes | Cloudinary |
| Documentación | Swagger / OpenAPI |

---

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/NicolasMalvano/EcommerceApi.git
cd EcommerceApi/back/ecommerce/ecommerce-nicolas-malvano

# Instalar dependencias
npm install
```

---

## ⚙️ Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=tu_base_de_datos

# JWT
JWT_SECRET=tu_jwt_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

---

## ▶️ Iniciar la Aplicación

```bash
# Modo desarrollo
$ npm run start:dev

# Modo normal
$ npm run start

# Modo producción
$ npm run start:prod
```

Al iniciar, la aplicación puebla automáticamente la base de datos con categorías y productos por defecto si aún no existen.

---

## 🧪 Tests

```bash
# Unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# Cobertura
$ npm run test:cov
```

---

## 📚 Documentación de la API

Con el servidor corriendo, accedé a Swagger UI en:

```
http://localhost:3000/api
```

Todos los endpoints están documentados con esquemas de request/response y pueden probarse directamente desde el navegador.

---

## 🔐 Autenticación

La API utiliza **JWT Bearer tokens**. Para acceder a las rutas protegidas:

1. Registrarse con `POST /auth/signup`
2. Iniciar sesión con `POST /auth/signin` para obtener el token
3. Incluir el token en el header `Authorization`:

```http
Authorization: Bearer <tu_token>
```

---

## 📁 Estructura del Proyecto

```
src/
├── auth/           # Lógica de autenticación (JWT, Guards)
├── users/          # Entidad, controlador y servicio de usuarios
├── products/       # Entidad, controlador, servicio y repositorio de productos
├── categories/     # Entidad, controlador, servicio y repositorio de categorías
├── orders/         # Entidad, controlador y servicio de órdenes
├── files/          # Manejo de carga de imágenes con Cloudinary
├── utils/          # Datos de seeding y helpers
└── app.module.ts   # Módulo raíz
```

---

## 🧩 Endpoints Principales

### Auth
| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| POST | `/auth/signup` | Registrar un nuevo usuario | ❌ |
| POST | `/auth/signin` | Iniciar sesión y obtener token JWT | ❌ |

### Usuarios
| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| GET | `/users` | Obtener todos los usuarios | ✅ |
| GET | `/users/:id` | Obtener usuario por ID | ✅ |
| PUT | `/users/:id` | Actualizar usuario | ✅ |
| DELETE | `/users/:id` | Eliminar usuario | ✅ |

### Productos
| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| GET | `/products` | Obtener todos los productos (paginado) | ❌ |
| GET | `/products/:id` | Obtener producto por ID | ❌ |
| POST | `/products` | Crear producto | ✅ |
| PUT | `/products/:id` | Actualizar producto | ✅ |
| DELETE | `/products/:id` | Eliminar producto | ✅ |

### Categorías
| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| GET | `/categories` | Obtener todas las categorías | ❌ |
| POST | `/categories` | Crear categoría | ✅ |

### Órdenes
| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| GET | `/orders/:id` | Obtener orden por ID | ✅ |
| POST | `/orders` | Crear una nueva orden | ✅ |

### Archivos
| Método | Endpoint | Descripción | Auth |
|---|---|---|---|
| POST | `/files/uploadImage/:id` | Subir imagen de producto | ✅ |

---

## 🎯 Objetivo del Proyecto

Este proyecto fue desarrollado como práctica para implementar un **backend completo de ecommerce**, aplicando conceptos como:

- Arquitectura modular con NestJS
- Autenticación y autorización con JWT y Guards
- Persistencia de datos con TypeORM y PostgreSQL
- Integración con servicios externos (Cloudinary)
- Documentación de APIs con Swagger

---

## 👨‍💻 Autor

Desarrollado por **Nicolás Malvano**

[LinkedIn](https://www.linkedin.com/in/nicol%C3%A1s-malvano/) · [GitHub](https://github.com/NicolasMalvano)

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](https://github.com/nestjs/nest/blob/master/LICENSE).
