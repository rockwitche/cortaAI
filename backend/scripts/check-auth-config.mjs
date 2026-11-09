// Diagnóstico sem escrita no banco, sem envio de e-mail e sem exibir segredos.
import pg from 'pg';

let failed = false;
function report(name, ok, detail) {
  console.log(`${ok ? 'OK' : 'FALHA'} ${name}${detail ? ': ' + detail : ''}`);
  if (!ok) failed = true;
}

const required = [
  'DATABASE_URL',
  'JWT_SECRET',
  'FRONTEND_URL',
  'GMAIL_CLIENT_ID',
  'GMAIL_CLIENT_SECRET',
  'GMAIL_REFRESH_TOKEN',
  'GMAIL_USER',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_CALLBACK_URL',
];
const missing = required.filter(
  (key) => !process.env[key] || /^(SEU_|SUBSTITUA_)/.test(process.env[key]),
);
report('Variáveis obrigatórias', missing.length === 0, missing.join(', '));
report('Tamanho do JWT_SECRET', (process.env.JWT_SECRET?.length ?? 0) >= 32);
for (const key of ['FRONTEND_URL', 'GOOGLE_CALLBACK_URL']) {
  try {
    const url = new URL(process.env[key]);
    report(
      key,
      ['http:', 'https:'].includes(url.protocol),
      url.origin + url.pathname,
    );
  } catch {
    report(key, false, 'URL inválida');
  }
}

await Promise.all([
  (async () => {
    if (!process.env.DATABASE_URL) return;
    const client = new pg.Client({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 10_000,
      query_timeout: 10_000,
    });
    try {
      await client.connect();
      // Consulta vazia valida tabela, permissões e colunas sem ler dados pessoais.
      await client.query(
        'SELECT id, email, senha, tipo, plano, "googleId", "emailVerified", "authVersion", "verificationCode", "verificationExpires", "verificationAttempts" FROM users LIMIT 0',
      );
      report('Banco e colunas de autenticação', true);
    } catch (error) {
      const knownMessages = [
        'Tenant or user not found',
        'password authentication failed',
        'Circuit breaker open',
        'Connection terminated',
        'Connection terminated due to connection timeout',
      ];
      const detail = /tenant\/user .* not found/i.test(String(error.message))
        ? 'Projeto/usuário não encontrado no pooler'
        : knownMessages.find((message) =>
            String(error.message).toLowerCase().includes(message.toLowerCase()),
          );
      report(
        'Banco e colunas de autenticação',
        false,
        [error.code ?? 'conexão/consulta indisponível', detail]
          .filter(Boolean)
          .join(' — '),
      );
    } finally {
      await client.end().catch(() => {});
    }
  })(),
  (async () => {
    if (missing.some((key) => key.startsWith('GMAIL_'))) return;
    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        signal: AbortSignal.timeout(15_000),
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: process.env.GMAIL_CLIENT_ID,
          client_secret: process.env.GMAIL_CLIENT_SECRET,
          refresh_token: process.env.GMAIL_REFRESH_TOKEN,
        }),
      });
      const data = await response.json();
      const ok = response.ok && typeof data.access_token === 'string';
      const knownError = [
        'invalid_grant',
        'invalid_client',
        'unauthorized_client',
      ].includes(data.error)
        ? data.error
        : `HTTP ${response.status}`;
      report(
        'Renovação OAuth do Gmail',
        ok,
        ok ? 'nenhum e-mail enviado' : knownError,
      );
    } catch {
      report('Renovação OAuth do Gmail', false, 'falha de rede ou timeout');
    }
  })(),
]);

console.log(
  'O consentimento do login Google e a entrega real de e-mail ainda precisam ser validados no navegador.',
);
process.exitCode = failed ? 1 : 0;
