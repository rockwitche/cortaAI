import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ── Prefixo global da API ────────────────────────────────────────────────────
  app.setGlobalPrefix('api');

  // ── Cookie-parser (necessário para ler cookies HttpOnly do JWT) ──────────────
  app.use(cookieParser());

  // ── Validação automática dos DTOs ────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // Remove campos não declarados no DTO
      forbidNonWhitelisted: true,
      transform: true,        // Converte automaticamente os tipos
    }),
  );

  // ── CORS: permite o frontend Angular ────────────────────────────────────────
  const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:4200';
  app.enableCors({
    origin: frontendUrl,
    credentials: true, // Necessário para enviar/receber cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Backend CortaAí rodando em http://localhost:${port}/api`);
}
await bootstrap();
