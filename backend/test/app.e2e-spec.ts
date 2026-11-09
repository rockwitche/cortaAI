import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';
import { PrismaService } from '../src/prisma/prisma.service.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        barbearia: { findMany: async () => [] },
        horarioDisponivel: { findMany: async () => [] },
        agendamento: { findMany: async () => [] },
      })
      .overrideProvider(ConfigService)
      .useValue(new ConfigService({
        JWT_SECRET: 'integration-test-secret-not-for-production-123456',
        GOOGLE_CLIENT_ID: 'test.apps.googleusercontent.com',
        GOOGLE_CLIENT_SECRET: 'test-secret',
        GOOGLE_CALLBACK_URL: 'http://localhost:3000/api/auth/google/callback',
      }))
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.init();
  });

  it('/api (GET)', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(200)
      .expect('Hello World!');
  });

  it('registra as rotas públicas de barbearias, horários e agendamentos', async () => {
    const id = '00000000-0000-4000-8000-000000000000';
    for (const path of ['/api/barbearias', `/api/barbeiros/${id}/horarios`,
      `/api/agendamentos/ocupados/${id}?data=2030-01-07`]) {
      await request(app.getHttpServer()).get(path).expect(200).expect([]);
    }
  });

  it('registra e protege as rotas de sessão, perfil, gestão e agenda', async () => {
    for (const path of ['/api/auth/me', '/api/user/profile',
      '/api/barbearias/owner/me', '/api/agendamentos/agenda']) {
      await request(app.getHttpServer()).get(path).expect(401);
    }
  });

  afterEach(async () => {
    await app.close();
  });
});
