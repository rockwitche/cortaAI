# CortaAí

Recorte do [BarberBook](https://github.com/GabrielRamosSA/BarberBook), commit `3fd3aa11bc5eb46b97e9d49c908aee4dd8bacdc6`, com apenas três páginas:

- `/barbearias`: busca por estado e cidade, com dados do IBGE e listagem de barbearias.
- `/login`: acesso por e-mail e senha.
- `/registro`: cadastro com validações e confirmação de e-mail dentro do formulário.

A raiz `/` abre a página de barbearias. O visual original foi preservado, sempre em modo claro. Após entrar ou confirmar o cadastro, o usuário retorna à listagem.

## Executar

Requer Node.js compatível com Angular 21 (validado com Node 24).

```sh
npm install
npm start
```

Acesse `http://localhost:4200`.

```sh
npm run build
```

Os arquivos para publicação são gerados em `dist/BarberBook/browser`. O servidor de hospedagem precisa encaminhar as rotas da aplicação para `index.html`; `public/_redirects` já fornece essa regra para hospedagens compatíveis.

## APIs

Estados e municípios são consultados diretamente em `https://servicodados.ibge.gov.br/api/v1/localidades`, com cache por sessão do navegador.

O IBGE fornece localidades, não dados de barbearias. A listagem usa `GET /api/barbearias/search?estado=UF&cidade=Nome` do backend original `https://barberbook-awgp.onrender.com`. Login, cadastro, verificação de e-mail e sessão usam `/api/auth` desse mesmo backend.

Em desenvolvimento, `proxy.conf.json` encaminha `/api` e `/uploads` ao backend original. Em produção, `src/app/auth/auth.interceptor.ts` e `src/app/auth/auth.service.ts` utilizam a URL original diretamente. Para utilizar outro backend, ajuste esses três arquivos. Autenticação em produção depende de CORS e cookies autorizados pelo backend para o domínio utilizado.

O backend e o banco de dados não foram copiados. Sua disponibilidade é necessária para pesquisar barbearias e autenticar usuários. Não há dados fictícios nem criação local de contas. Dashboard, perfil, agendamento, pagamentos, recuperação de senha e login com Google não fazem parte deste recorte.
