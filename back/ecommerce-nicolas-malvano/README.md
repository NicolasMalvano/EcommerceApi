<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# 🛒 E-Commerce Backend API

Este proyecto es una **API REST desarrollada con NestJS** enfocada en la gestión del backend de un sistema de **E-commerce**.
Proporciona endpoints para la administración de **usuarios, autenticación, productos y órdenes**, permitiendo manejar las solicitudes que recibe la aplicación desde el cliente.

La arquitectura está basada en un **scaffolding con enfoque funcional**, separando responsabilidades en funcionalidades como **users, products y auth**, lo que facilita la escalabilidad y el mantenimiento del proyecto.

---

# 🚀 Tecnologías Utilizadas

* **NestJS** – Framework backend basado en Node.js
* **TypeScript**
* **TypeORM** – ORM para la gestión de la base de datos
* **JWT** – Autenticación basada en tokens
* **Guards** – Control de autenticación y autorización
* **Cloudinary** – Almacenamiento de imágenes de productos
* **Swagger** – Documentación interactiva de la API
* **Bcrypt** – Encriptación de contraseñas

---

# 📦 Funcionalidades Principales

### 👤 Users

* Consulta de usuarios
* Gestión de información de usuarios
* Actualización de usuarios
* Eliminación de usuarios

### 🔐 Auth

* Registro de usuarios
* Inicio de sesión
* Generación de **JSON Web Tokens**
* Protección de rutas mediante **Guards**

### 📦 Products

* Creación de productos
* Listado de productos
* Actualización de productos
* Eliminación de productos

### 🧾 Orders

* Creación de órdenes de compra
* Asociación de productos a una orden
* Asociación de órdenes a un usuario
* Gestión de detalles de órdenes

### 🖨️ Upload

* Carga de imágenes para los productos 
* Comunicación con el servicio externo Cloudinary para el almacenamiento de las imágenes

---

# 🔐 Autenticación y Autorización

El sistema utiliza **JWT (JSON Web Tokens)** para la autenticación.

Una vez que el usuario inicia sesión, el servidor genera un **token** que debe enviarse en las siguientes solicitudes protegidas.

Ejemplo de header:

```http
Authorization: Bearer <token>
```

Las rutas protegidas utilizan **Guards de NestJS** para validar el token y verificar los permisos del usuario.



# 📚 Documentación de la API

La documentación de la API está disponible mediante **Swagger**.

Una vez levantado el servidor, podés acceder a:

```
http://localhost:3000/api
```

Desde allí es posible **probar todos los endpoints directamente**.

---

# 🖼 Gestión de imágenes

Las imágenes de los productos se almacenan en **Cloudinary**, lo que permite:

* almacenamiento en la nube
* optimización automática
* entrega rápida de imágenes

---

# 📌 Objetivo del proyecto

Este proyecto fue desarrollado como práctica para implementar un **backend completo de E-commerce**, aplicando conceptos como:

* Arquitectura modular
* Autenticación con JWT
* Protección de rutas con Guards
* Persistencia de datos con ORM
* Integración con servicios externos (Cloudinary)

---

# 👨‍💻 Autor

Desarrollado por **Nicolás Malvano**


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
