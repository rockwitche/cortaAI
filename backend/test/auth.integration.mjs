// Testa a API compilada, com banco e entrega de e-mail em memória.
// Nenhuma conta externa é criada e nenhum e-mail é enviado.
import 'reflect-metadata';
import { describe, it, before, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { Test } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import request from 'supertest';
import cookieParser from 'cookie-parser';
import { AuthController } from '../dist/auth/auth.controller.js';
import { AuthService } from '../dist/auth/auth.service.js';
import { JwtStrategy } from '../dist/auth/strategies/jwt.strategy.js';
import { GoogleStrategy } from '../dist/auth/strategies/google.strategy.js';
import { GoogleAuthGuard } from '../dist/auth/guards/google-auth.guard.js';
import { PrismaService } from '../dist/prisma/prisma.service.js';
import { EmailService } from '../dist/auth/email.service.js';
import { AgendamentoController } from '../dist/agendamento/agendamento.controller.js';
import { AgendamentoService } from '../dist/agendamento/agendamento.service.js';
import { BarbeariaController } from '../dist/barbearia/barbearia.controller.js';
import { BarbeariaService } from '../dist/barbearia/barbearia.service.js';
import { UserController } from '../dist/user/user.controller.js';
import { UserService } from '../dist/user/user.service.js';

const secret = 'integration-test-secret-not-for-production-123456';
const records = new Map();
const delivered = new Map();
let mailAvailable = true;
const clone = (value) => structuredClone(value);
function matches(row, where) {
  return Object.entries(where).every(([key, value]) => {
    if (value instanceof Date) return row[key]?.getTime() === value.getTime();
    if (value && typeof value === 'object' && !(value instanceof Date)) {
      if ('lt' in value) return row[key] < value.lt;
      if ('gt' in value) return row[key] > value.gt;
    }
    return row[key] === value;
  });
}
function update(row, data) {
  for (const [key, value] of Object.entries(data)) {
    row[key] =
      value && typeof value === 'object' && 'increment' in value
        ? row[key] + value.increment
        : value;
  }
  return clone(row);
}
const prisma = {
  user: {
    async findUnique({ where, select }) {
      const row = [...records.values()].find((row) => matches(row, where));
      if (!row) return null;
      return select
        ? Object.fromEntries(
            Object.keys(select).map((key) => [key, clone(row[key])]),
          )
        : clone(row);
    },
    async create({ data }) {
      const row = {
        id: randomUUID(),
        authVersion: 0,
        verificationAttempts: 0,
        emailVerified: false,
        verificationCode: null,
        verificationExpires: null,
        plano: 'BASICO',
        tipo: 'CLIENTE',
        googleId: null,
        senha: null,
        ...data,
      };
      records.set(row.id, row);
      return clone(row);
    },
    async update({ where, data }) {
      const row = [...records.values()].find((row) => matches(row, where));
      assert.ok(row);
      return update(row, data);
    },
    async updateMany({ where, data }) {
      const rows = [...records.values()].filter((row) => matches(row, where));
      rows.forEach((row) => update(row, data));
      return { count: rows.length };
    },
    async delete({ where }) {
      const row = records.get(where.id);
      records.delete(where.id);
      return clone(row);
    },
  },
};
const email = {
  async sendVerificationCode(to, code) {
    if (mailAvailable) delivered.set(to, code);
    return mailAvailable;
  },
};

describe('Integração de autenticação — card #17', () => {
  let app, api, auth, jwt, google;
  before(async () => {
    const config = new ConfigService({
      JWT_SECRET: secret,
      GOOGLE_CLIENT_ID: 'test.apps.googleusercontent.com',
      GOOGLE_CLIENT_SECRET: 'test-secret',
      GOOGLE_CALLBACK_URL: 'http://localhost:3000/api/auth/google/callback',
    });
    const module = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({ secret }),
      ],
      controllers: [AuthController, AgendamentoController, BarbeariaController, UserController],
      providers: [
        AuthService,
        JwtStrategy,
        GoogleStrategy,
        GoogleAuthGuard,
        UserService,
        { provide: AgendamentoService, useValue: {
          create: async (data) => ({ agendamento: data, guestAccessToken: data.userId ? null : 'guest-receipt' }),
          findByOwner: async () => [],
        } },
        { provide: BarbeariaService, useValue: { findAllByOwner: async () => [] } },
        { provide: ConfigService, useValue: config },
        { provide: PrismaService, useValue: prisma },
        { provide: EmailService, useValue: email },
      ],
    }).compile();
    app = module.createNestApplication();
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
    api = app.getHttpServer();
    auth = module.get(AuthService);
    jwt = module.get(JwtService);
    google = module.get(GoogleStrategy);
  });
  beforeEach(() => {
    records.clear();
    delivered.clear();
    mailAvailable = true;
  });
  after(async () => {
    await app?.close();
  });

  async function register(tipo = 'CLIENTE') {
    return request(api)
      .post('/api/auth/register')
      .send({
        nome: 'Pessoa de Teste',
        email: 'pessoa@example.com',
        senha: 'senha12345',
        tipo,
      })
      .expect(201);
  }
  async function confirm(registration) {
    return request(api)
      .post('/api/auth/verify-email')
      .send({
        email: registration.email,
        verificationToken: registration.verificationToken,
        code: delivered.get(registration.email),
      })
      .expect(201);
  }

  const booking = {
    data: '2030-01-07', horario: '10:00', nomeCliente: 'Pessoa', telefoneCliente: '11999999999',
    barbeariaId: '11111111-1111-4111-8111-111111111111',
    barbeiroId: '22222222-2222-4222-8222-222222222222',
    servicoId: '33333333-3333-4333-8333-333333333333',
  };

  it('agendamento reconhece o cookie do login e continua aceitando visitantes', async () => {
    const visitor = await request(api).post('/api/agendamentos').send(booking).expect(201);
    assert.equal(visitor.body.agendamento.userId, undefined);
    assert.equal(visitor.body.guestAccessToken, 'guest-receipt');
    const { body: pending } = await register();
    const verified = await confirm(pending);
    const cookie = verified.headers['set-cookie'][0].split(';')[0];
    const scheduled = await request(api).post('/api/agendamentos').set('Cookie', cookie).send(booking).expect(201);
    assert.equal(scheduled.body.agendamento.userId, verified.body.user.id);
    assert.equal(scheduled.body.guestAccessToken, null);
    const token = decodeURIComponent(cookie.slice('access_token='.length));
    await request(api).post('/api/agendamentos').set('Authorization', `Bearer ${token}`).send(booking).expect(201);
    await request(api).post('/api/auth/logout').set('Cookie', cookie).expect(200);
    await request(api).post('/api/agendamentos').set('Cookie', cookie).send(booking).expect(401);
  });

  it('agendamento recusa token temporário, adulterado ou userId fornecido pelo cliente', async () => {
    const { body: pending } = await register();
    for (const token of [pending.verificationToken, 'invalid-token']) {
      await request(api).post('/api/agendamentos').set('Authorization', `Bearer ${token}`).send(booking).expect(401);
      await request(api).post('/api/agendamentos').set('Cookie', `access_token=${token}`).send(booking).expect(401);
    }
    await request(api).post('/api/agendamentos').send({ ...booking, userId: 'other-user' }).expect(400);
  });

  for (const tipo of ['CLIENTE', 'BARBEIRO']) {
    it(`gestão de barbearias e agenda valida o perfil ${tipo} na API`, async () => {
      const { body: pending } = await register(tipo);
      const verified = await confirm(pending);
      const cookie = verified.headers['set-cookie'][0].split(';')[0];
      for (const path of ['/api/barbearias/owner/me', '/api/agendamentos/agenda']) {
        await request(api).get(path).expect(401);
        await request(api).get(path).set('Cookie', cookie).expect(tipo === 'BARBEIRO' ? 200 : 403);
      }
    });
  }

  it('perfil usa os contratos de foto e conta com a sessão atual', async () => {
    const { body: pending } = await register();
    const verified = await confirm(pending);
    const cookie = verified.headers['set-cookie'][0].split(';')[0];
    await request(api).get('/api/user/profile').set('Cookie', cookie).expect(200);
    const photo = await request(api).post('/api/user/avatar').set('Cookie', cookie)
      .attach('file', Buffer.from('image-test'), { filename: 'avatar.png', contentType: 'image/png' }).expect(201);
    assert.match(photo.body.avatar, /^data:image\/png;base64,/);
    const removed = await request(api).delete('/api/user/avatar').set('Cookie', cookie).expect(200);
    assert.equal(removed.body.user.avatar, null);
    await request(api).delete('/api/user/account').set('Cookie', cookie).expect(200);
    await request(api).get('/api/auth/me').set('Cookie', cookie).expect(401);
  });

  for (const tipo of ['CLIENTE', 'BARBEIRO']) {
    it(`cadastra, confirma, autentica e encerra sessão de ${tipo}`, async () => {
      const { body: pending } = await register(tipo);
      assert.equal(pending.requiresVerification, true);
      assert.equal(
        jwt.verify(pending.verificationToken).purpose,
        'email-verification',
      );
      await request(api)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${pending.verificationToken}`)
        .expect(401);
      const verified = await confirm(pending);
      assert.equal(verified.body.user.tipo, tipo);
      assert.equal(verified.body.access_token, undefined);
      assert.equal(verified.body.user.senha, undefined);
      const cookie = verified.headers['set-cookie'][0].split(';')[0];
      assert.match(verified.headers['set-cookie'][0], /HttpOnly/i);
      await request(api).get('/api/auth/me').set('Cookie', cookie).expect(200);
      const login = await request(api)
        .post('/api/auth/login')
        .send({
          email: 'pessoa@example.com',
          senha: 'senha12345',
          rememberMe: true,
        })
        .expect(200);
      assert.equal(login.body.user.tipo, tipo);
      const remembered = login.headers['set-cookie'][0];
      assert.match(remembered, /Max-Age=2592000/);
      const token = jwt.verify(
        decodeURIComponent(
          remembered.split(';')[0].slice('access_token='.length),
        ),
      );
      assert.equal(token.exp - token.iat, 30 * 24 * 60 * 60);
      await request(api)
        .post('/api/auth/logout')
        .set('Cookie', cookie)
        .expect(200);
      await request(api).get('/api/auth/me').set('Cookie', cookie).expect(401);
    });
  }

  it('retorna validações e conflito de e-mail sem criar ADMIN', async () => {
    const invalid = await request(api)
      .post('/api/auth/register')
      .send({
        nome: 'Teste',
        email: 'invalido',
        senha: 'curta',
        tipo: 'ADMIN',
      })
      .expect(400);
    assert.ok(Array.isArray(invalid.body.message));
    assert.equal(records.size, 0);
    const registration = await register();
    await confirm(registration.body);
    await request(api)
      .post('/api/auth/register')
      .send({
        nome: 'Outro',
        email: 'pessoa@example.com',
        senha: 'senha12345',
      })
      .expect(409);
  });

  it('retoma cadastro pendente sem duplicar conta nem alterar seus dados', async () => {
    await register('BARBEIRO');
    const check = await request(api).get('/api/auth/check-email').query({ email: 'pessoa@example.com' }).expect(200);
    assert.equal(check.body.exists, false);
    assert.equal(check.body.pendingVerification, true);
    await request(api).post('/api/auth/register').send({
      nome: 'Outro', email: 'pessoa@example.com', senha: 'incorreta123', tipo: 'CLIENTE',
    }).expect(401);
    const resumed = await request(api).post('/api/auth/register').send({
      nome: 'Outro', email: 'pessoa@example.com', senha: 'senha12345', tipo: 'CLIENTE',
    }).expect(201);
    assert.equal(resumed.body.requiresVerification, true);
    assert.equal(resumed.body.access_token, undefined);
    assert.equal(records.size, 1);
    assert.equal([...records.values()][0].tipo, 'BARBEIRO');
    assert.equal([...records.values()][0].nome, 'Pessoa de Teste');
    await confirm(resumed.body);
    const verified = await request(api).get('/api/auth/check-email').query({ email: 'pessoa@example.com' }).expect(200);
    assert.equal(verified.body.exists, true);
    assert.equal(verified.body.pendingVerification, false);
  });

  it('recusa senha errada e login de conta inexistente', async () => {
    await register();
    for (const email of ['pessoa@example.com', 'ausente@example.com']) {
      const result = await request(api)
        .post('/api/auth/login')
        .send({ email, senha: 'incorreta' })
        .expect(401);
      assert.equal(result.body.message, 'E-mail ou senha incorretos.');
    }
  });

  it('limita tentativas de código e não aceita código expirado', async () => {
    const { body: pending } = await register();
    for (let i = 0; i < 5; i++) {
      await request(api)
        .post('/api/auth/verify-email')
        .send({
          ...pickConfirmation(pending),
          code: '000000',
        })
        .expect(400);
    }
    const limited = await request(api)
      .post('/api/auth/verify-email')
      .send({
        ...pickConfirmation(pending),
        code: delivered.get(pending.email),
      })
      .expect(400);
    assert.match(limited.body.message, /Muitas tentativas/);
    const row = [...records.values()][0];
    row.verificationExpires = new Date(Date.now() - 1);
    await request(api)
      .post('/api/auth/verify-email')
      .send({
        ...pickConfirmation(pending),
        code: delivered.get(pending.email),
      })
      .expect(400);
  });

  it('mantém o cadastro recuperável quando o envio falha', async () => {
    mailAvailable = false;
    const { body: pending } = await register('BARBEIRO');
    assert.equal(pending.verificationEmailSent, false);
    assert.equal(records.size, 1);
    mailAvailable = true;
    await request(api)
      .post('/api/auth/resend-code')
      .send(pickConfirmation(pending))
      .expect(201);
    assert.equal((await confirm(pending)).body.user.tipo, 'BARBEIRO');
  });

  it('pedidos simultâneos não ultrapassam cinco tentativas nem reutilizam o código', async () => {
    const { body: pending } = await register();
    const requests = Array.from({ length: 8 }, () =>
      request(api)
        .post('/api/auth/verify-email')
        .send({ ...pickConfirmation(pending), code: '000000' }),
    );
    const results = await Promise.all(requests);
    assert.ok(results.every((result) => result.status === 400));
    const row = [...records.values()][0];
    assert.equal(row.verificationAttempts, 5);
    row.verificationAttempts = 0;
    const correct = () =>
      request(api)
        .post('/api/auth/verify-email')
        .send({
          ...pickConfirmation(pending),
          code: delivered.get(pending.email),
        });
    const verified = await Promise.all([correct(), correct()]);
    assert.equal(verified.filter((result) => result.status === 201).length, 1);
  });

  it('reenvio exige token específico e respeita o intervalo de um minuto', async () => {
    const { body: pending } = await register();
    await request(api)
      .post('/api/auth/resend-code')
      .send({ email: pending.email })
      .expect(400);
    await request(api)
      .post('/api/auth/resend-code')
      .send({
        ...pickConfirmation(pending),
        email: 'outra@example.com',
      })
      .expect(401);
    const original = delivered.get(pending.email);
    const resend = await request(api)
      .post('/api/auth/resend-code')
      .send(pickConfirmation(pending))
      .expect(201);
    assert.match(resend.body.message, /Aguarde um minuto/);
    assert.equal(delivered.get(pending.email), original);
  });

  it('token de acesso não confirma e token de confirmação não dá acesso mesmo após ativação', async () => {
    const { body: pending } = await register();
    const verified = await confirm(pending);
    const access = decodeURIComponent(
      verified.headers['set-cookie'][0]
        .split(';')[0]
        .slice('access_token='.length),
    );
    await request(api)
      .post('/api/auth/verify-email')
      .send({
        ...pickConfirmation(pending),
        verificationToken: access,
        code: delivered.get(pending.email),
      })
      .expect(401);
    await request(api)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${pending.verificationToken}`)
      .expect(401);
  });

  it('login pendente preserva lembrar conta até a confirmação', async () => {
    await register();
    const login = await request(api)
      .post('/api/auth/login')
      .send({
        email: 'pessoa@example.com',
        senha: 'senha12345',
        rememberMe: true,
      })
      .expect(200);
    const verified = await confirm(login.body);
    assert.equal(verified.body.rememberMe, true);
    assert.match(verified.headers['set-cookie'][0], /Max-Age=2592000/);
  });

  it('Google inicia com state assinado, perfil escolhido e estados independentes', async () => {
    const first = await request(api)
      .get('/api/auth/google?tipo=BARBEIRO')
      .expect(302);
    const second = await request(api)
      .get('/api/auth/google?tipo=CLIENTE')
      .expect(302);
    const state = new URL(first.headers.location).searchParams.get('state');
    const other = new URL(second.headers.location).searchParams.get('state');
    assert.equal(
      new URL(first.headers.location).hostname,
      'accounts.google.com',
    );
    assert.equal(jwt.verify(state).tipo, 'BARBEIRO');
    assert.equal(jwt.verify(other).tipo, 'CLIENTE');
    assert.notEqual(state, other);
    assert.ok(
      first.headers['set-cookie'][0].includes(encodeURIComponent(state)),
    );
  });

  it('Google recusa callback sem state ou adulterado e trata cancelamento', async () => {
    const start = await request(api).get('/api/auth/google').expect(302);
    const state = new URL(start.headers.location).searchParams.get('state');
    const cookie = start.headers['set-cookie'][0].split(';')[0];
    const missing = await request(api)
      .get('/api/auth/google/callback?code=fake')
      .expect(302);
    assert.match(missing.headers.location, /oauthError=failed$/);
    const changed = await request(api)
      .get('/api/auth/google/callback?state=wrong&code=fake')
      .set('Cookie', cookie)
      .expect(302);
    assert.match(changed.headers.location, /oauthError=failed$/);
    const cancelled = await request(api)
      .get('/api/auth/google/callback')
      .query({ state, error: 'access_denied' })
      .set('Cookie', cookie)
      .expect(302);
    assert.match(cancelled.headers.location, /oauthError=cancelled$/);
  });

  it('Google cria ambos os perfis e preserva o perfil de contas existentes', async () => {
    for (const tipo of ['CLIENTE', 'BARBEIRO']) {
      const googleUser = {
        googleId: tipo,
        email: `${tipo.toLowerCase()}@example.com`,
        nome: tipo,
      };
      const result = await auth.handleGoogleLogin(googleUser, tipo);
      const me = await request(api)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${result.access_token}`)
        .expect(200);
      assert.equal(me.body.tipo, tipo);
      await auth.handleGoogleLogin(
        googleUser,
        tipo === 'BARBEIRO' ? 'CLIENTE' : 'BARBEIRO',
      );
      assert.equal(
        [...records.values()].find((user) => user.googleId === tipo).tipo,
        tipo,
      );
    }
  });

  it('callback Google usa o perfil assinado, grava cookie e recusa e-mail não verificado', async () => {
    const exchange = google._oauth2.getOAuthAccessToken;
    const profile = google.userProfile;
    let emailVerified = true;
    google._oauth2.getOAuthAccessToken = (_code, _params, done) =>
      done(null, 'test-access', undefined, {});
    google.userProfile = (_token, done) =>
      done(null, {
        id: 'google-person',
        displayName: 'Pessoa',
        emails: [{ value: 'google@example.com' }],
        _json: { email_verified: emailVerified },
      });
    try {
      const start = await request(api)
        .get('/api/auth/google?tipo=BARBEIRO&rememberMe=true')
        .expect(302);
      const callback = await request(api)
        .get('/api/auth/google/callback')
        .set('Cookie', start.headers['set-cookie'][0].split(';')[0])
        .query({
          code: 'test-code',
          state: new URL(start.headers.location).searchParams.get('state'),
        })
        .expect(302);
      assert.match(callback.headers.location, /\/auth\/google\/callback$/);
      const session = callback.headers['set-cookie'].find((cookie) =>
        cookie.startsWith('access_token='),
      );
      assert.match(session, /Max-Age=2592000/);
      const me = await request(api)
        .get('/api/auth/me')
        .set('Cookie', session.split(';')[0])
        .expect(200);
      assert.equal(me.body.tipo, 'BARBEIRO');

      emailVerified = false;
      const second = await request(api).get('/api/auth/google').expect(302);
      const refused = await request(api)
        .get('/api/auth/google/callback')
        .set('Cookie', second.headers['set-cookie'][0].split(';')[0])
        .query({
          code: 'test-code',
          state: new URL(second.headers.location).searchParams.get('state'),
        })
        .expect(302);
      assert.match(refused.headers.location, /oauthError=failed$/);
      assert.ok(
        !refused.headers['set-cookie'].some((cookie) =>
          cookie.startsWith('access_token='),
        ),
      );
    } finally {
      google._oauth2.getOAuthAccessToken = exchange;
      google.userProfile = profile;
    }
  });

  it('vincular Google a cadastro não confirmado remove a senha anterior', async () => {
    await register('BARBEIRO');
    await auth.handleGoogleLogin({
      googleId: 'google-person',
      email: 'pessoa@example.com',
      nome: 'Pessoa',
    });
    const row = [...records.values()][0];
    assert.equal(row.senha, null);
    assert.equal(row.emailVerified, true);
    assert.equal(row.tipo, 'BARBEIRO');
    await request(api)
      .post('/api/auth/login')
      .send({ email: row.email, senha: 'senha12345' })
      .expect(401);
  });
});

function pickConfirmation(pending) {
  return { email: pending.email, verificationToken: pending.verificationToken };
}
