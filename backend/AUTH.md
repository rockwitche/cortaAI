# Autenticação e integração dos formulários — card #17

O cadastro por e-mail cria uma conta `CLIENTE` ou `BARBEIRO` pendente de confirmação.
O login e a confirmação retornam o usuário e gravam a sessão em cookie HttpOnly.
O frontend encaminha clientes para `/barbearias` e barbeiros para `/dashboard`.
O painel consulta a sessão na API antes de permitir o acesso e mostra os dados da conta conectada.

O Google pode criar ambos os perfis. A escolha fica no estado OAuth assinado e vinculado
ao cookie do navegador. Contas existentes mantêm seu tipo, mesmo quando outra opção é
enviada no início do fluxo. Somente e-mails verificados pelo Google são aceitos.
Ao vincular um cadastro que ainda não confirmou o e-mail, a senha anterior é removida.

## Executar localmente

1. Configure `backend/.env` com os nomes de variáveis do `.env.example` (o exemplo não contém credenciais reais).
2. Use `FRONTEND_URL=http://localhost:4200` e `GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback`.
3. Configure essa mesma URL de callback no cliente OAuth Web do Google.
4. Em `backend`, execute `npm run check:auth-config`. O comando só consulta o banco e tenta renovar o token Gmail; não envia e-mail nem mostra segredos.
5. Em `backend`, execute `npm run start:dev`; na raiz, `npm start`.
6. Abra `http://localhost:4200/registro`, selecione o perfil e use e-mail/senha ou Google.

O proxy do Angular encaminha `/api` para `http://localhost:3000`. Use o mesmo hostname
durante todo o teste (`localhost`); alternar para `127.0.0.1` muda a origem dos cookies.

## Contratos usados pelas telas

| Endpoint | Comportamento |
| --- | --- |
| `POST /api/auth/register` | Recebe nome, e-mail, senha, telefone e tipo. Retorna `requiresVerification`, `verificationToken`, `email`, `verificationEmailSent` e mensagem. |
| `POST /api/auth/login` | Recebe e-mail, senha e `rememberMe`. Retorna usuário e cookie, ou a etapa de confirmação se a conta estiver pendente. |
| `POST /api/auth/verify-email` | Recebe `verificationToken`, código numérico de seis dígitos e e-mail. Retorna usuário, `rememberMe` e cookie. |
| `POST /api/auth/resend-code` | Exige token de confirmação e e-mail correspondentes. Retorna mensagem e token renovado; respeita intervalo de um minuto entre envios. |
| `GET /api/auth/me` | Exige sessão válida de conta confirmada. Retorna dados públicos da conta. |
| `POST /api/auth/logout` | Revoga os tokens da conta e limpa o cookie. |
| `GET /api/auth/google?tipo=BARBEIRO` | Inicia OAuth; aceita somente `CLIENTE`/`BARBEIRO` e `rememberMe=true` opcional. |
| `GET /api/auth/google/callback` | Valida estado e identidade, cria cookie e redireciona para `/auth/google/callback` no frontend. |

Tokens de acesso não são retornados no corpo das respostas HTTP de login/confirmação.
O token temporário tem finalidade `email-verification`, dura 30 minutos e não autoriza
rotas protegidas. O código dura 15 minutos, permite cinco tentativas e só pode ser
consumido uma vez, inclusive com requisições simultâneas.

Sem “Lembrar desta conta”, o cookie é de sessão e o JWT dura um dia. Com a opção marcada,
ambos duram 30 dias. A confirmação preserva essa escolha. Tokens antigos sem finalidade
explícita deixam de ser aceitos nesta versão: faça login novamente após a atualização.

Se o envio de e-mail falhar, a conta fica pendente e a interface permite reenviar.
Se a página for recarregada durante a confirmação, faça login com a senha cadastrada
para recuperar a etapa. As telas tratam validações do backend, credenciais incorretas,
conflito de cadastro, falhas de rede, timeout e cancelamento do Google.

## Validação do card

Na raiz:

```sh
npm run build
npm test -- --watch=false --browsers=ChromeHeadless
```

Em `backend`:

```sh
npm run test:auth
npm test
npm run test:e2e
npm run lint
```

`test:auth` compila o backend e testa a API HTTP real, DTOs, cookies, JWT, cadastro,
confirmação e início/cancelamento do OAuth. Banco e entrega de e-mail são simulados
em memória. Os testes Angular exercitam os formulários com respostas HTTP controladas,
encaminhamento por perfil, callback Google e proteção do painel.
Esses testes não comprovam a entrega real do Gmail nem o consentimento no Google.

## Configuração verificada em 09/11/2026

- Após os ajustes do usuário, a conexão PostgreSQL e as colunas de autenticação passaram na verificação.
- A renovação OAuth do Gmail passou com as credenciais atualizadas.
- Frontend, backend e proxy local responderam HTTP 200; o início do login Google redirecionou para `accounts.google.com` com estado OAuth.
- Falta testar no navegador o cadastro e o Google com uma conta de cada perfil, incluindo o recebimento do código e o consentimento Google. Nenhum e-mail real foi enviado durante a validação automatizada.
- O antigo `.env.example` continha valores com aparência de credenciais reais. O arquivo foi substituído por placeholders. Se os valores antigos eram válidos ou foram compartilhados, revogar/substituir as credenciais no provedor; os segredos do `.env` não foram alterados automaticamente.

## Hospedagem

O frontend atual usa `https://barberbook-awgp.onrender.com/api` fora do localhost.
No backend publicado, `FRONTEND_URL` deve ser a origem exata do frontend, sem barra final,
`NODE_ENV=production` e `GOOGLE_CALLBACK_URL` deve apontar para
`https://barberbook-awgp.onrender.com/api/auth/google/callback` (se esse continuar sendo o host).
O callback registrado no Google deve corresponder ao ambiente utilizado.

A sessão usa cookies `Secure` e `SameSite=None` em produção. Como frontend e backend
estão em sites diferentes, bloqueio de cookies de terceiros pode impedir a sessão.
Nesse caso, servir a API na mesma origem por proxy, ou usar subdomínios do mesmo domínio,
é uma pendência da hospedagem. Não trocar o cookie HttpOnly por token no localStorage.

A atualização do GitHub até `6733b5b` foi integrada às alterações locais de autenticação.
O painel mantém suas rotas filhas (barbearias, agenda e planos), protegidas inclusive
na navegação entre elas. O perfil exige sessão de cliente ou barbeiro.

As APIs de gestão de barbearias, equipe, serviços, horários e agenda do proprietário
exigem conta de barbeiro confirmada, além das verificações de propriedade dos serviços.
O agendamento público usa a mesma estratégia JWT do login (`access_token`, finalidade
`access`, versão `ver`): visitantes continuam permitidos; credenciais inválidas ou
tokens de confirmação são recusados. O cliente não pode escolher um `userId` no corpo.

O perfil usa `POST /api/user/avatar` com o campo multipart `file`,
`DELETE /api/user/avatar` e `DELETE /api/user/account`.
Publicação e fechamento do card no GitHub não fazem parte dos comandos de validação local.

## Verificação da integração com o GitHub

Foram integrados os seis commits entre `a635bd3` e `6733b5b`, mantendo o CommonJS
adotado no backend remoto e as alterações locais de autenticação. As mudanças locais
anteriores à integração também ficaram preservadas no stash
`auth-local-before-upstream-integration-2026-11-09`.

O banco já continha as entidades de barbearias, equipe e serviços. Em 09/11/2026,
foi aplicada em transação a atualização aditiva
`prisma/updates/20261109_horarios_agendamentos.sql`: cria horários, agendamentos,
índices, relacionamentos e habilita RLS nas duas tabelas novas. Nenhum registro existente
foi removido. Não reaplicar esse arquivo em um banco que já possua essas tabelas.
Depois da atualização, `prisma migrate diff` não detectou diferenças de schema.

O módulo de agendamentos foi registrado no `AppModule`, garantindo que suas rotas
façam parte do servidor iniciado. A conferência com o banco real retornou HTTP 200
nas consultas públicas e HTTP 401 nas rotas protegidas sem sessão; o início do Google
retornou HTTP 302 para o provedor.

Validação local: build Angular e Nest concluídos; 20 testes HTTP de autenticação e
integração, 16 testes Angular, 7 testes unitários e 3 testes do aplicativo completo
aprovados (46 no total). O lint não
apresentou erros; permanecem avisos em código gerado do Prisma e variáveis não usadas
trazidas pelo módulo de agendamentos. O build Angular mantém o aviso existente do Leaflet.
# Atualização da tela de agendamento (a681a34)

Integrada a rota `/agendar/:slug`, preservando as alterações locais de autenticação.
A consulta pública da barbearia inclui os horários dos profissionais. A tela considera
duração, almoço, fechamento e ocupação; cancela consultas antigas ao trocar a data e
impede selecionar horários quando a consulta falha. A API aceita `duracao` opcional
na consulta de ocupação, preservando o contrato anterior quando omitido.
O retorno após agendar usa `/barbearias`, uma rota existente.

Validação: builds frontend/backend; 19 testes Angular, 20 de integração de autenticação,
10 testes unitários backend e 3 testes e2e aprovados. Os testes usam dependências externas
simuladas; não enviam e-mails reais nem criam agendamentos no banco conectado.

