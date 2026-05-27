# Nexandria — Backend

API REST construida con [NestJS](https://nestjs.com/) y [Prisma ORM](https://www.prisma.io/), con PostgreSQL como base de datos.

---

## Requisitos previos

- [Docker](https://www.docker.com/) y Docker Compose
- [Node.js 20+](https://nodejs.org/) (solo para desarrollo local sin Docker)

---

## Levantar el entorno completo con Docker

Esta es la forma recomendada. Levanta la base de datos PostgreSQL y el backend NestJS con las migraciones de Prisma aplicadas automáticamente.

```bash
# Desde la carpeta backend/
docker compose up --build
```

Esto:
1. Construye la imagen del backend.
2. Levanta PostgreSQL (espera a que esté listo gracias al healthcheck).
3. Ejecuta `prisma migrate deploy` para aplicar las migraciones.
4. Inicia el servidor en modo `start:dev` con hot-reload.

El backend queda disponible en `http://localhost:3000`.

Para detenerlo:

```bash
docker compose down
```

Para detenerlo y borrar los volúmenes (base de datos incluida):

```bash
docker compose down -v
```

---

## Desarrollo local (sin Docker)

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copiá el archivo `.env.example` (si existe) o creá un `.env` en la raíz de `backend/`:

```env
DATABASE_URL="postgresql://prisma:prisma123@localhost:5432/appdb?schema=public"
```

> Podés levantar solo la base de datos con Docker para desarrollo local:
> ```bash
> docker compose up postgres
> ```

### 3. Aplicar migraciones de Prisma

```bash
npx prisma migrate deploy
```

Para crear una nueva migración durante el desarrollo:

```bash
npx prisma migrate dev --name nombre-de-la-migracion
```

### 4. Generar el cliente de Prisma

```bash
npx prisma generate
```

### 5. Iniciar el servidor

```bash
# watch mode (desarrollo)
npm run start:dev

# producción
npm run start:prod
```

---

## Prisma Studio (explorador de base de datos)

```bash
npx prisma studio
```

Abre una interfaz web en `http://localhost:5555` para explorar y editar los datos.

---

## Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# cobertura
npm run test:cov
```

---

## Variables de entorno

| Variable       | Descripción                         | Ejemplo                                                       |
|----------------|-------------------------------------|---------------------------------------------------------------|
| `DATABASE_URL` | URL de conexión a PostgreSQL        | `postgresql://prisma:prisma123@localhost:5432/appdb?schema=public` |

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
