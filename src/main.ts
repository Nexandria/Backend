import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth/auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Montar Better Auth ANTES de las rutas de NestJS
  // Maneja: /api/auth/sign-up/email, /api/auth/sign-in/email,
  //         /api/auth/sign-out, /api/auth/get-session, etc.
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.all(/\/api\/auth\/.*/, toNodeHandler(auth));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
