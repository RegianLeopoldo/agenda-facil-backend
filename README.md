# 📅 Agenda Fácil — Backend

Backend da aplicação **Agenda Fácil**, desenvolvido com **Node.js**, **Express**, **TypeScript** e **Prisma ORM**.

A API é responsável pelo gerenciamento dos compromissos, autenticação de usuários, notificações e envio de lembretes por e-mail, utilizando **PostgreSQL** como banco de dados.

---

## 📷 Demonstração

> Em breve serão adicionadas imagens da API e da documentação.

---

## 🚀 Tecnologias

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* CORS
* Dotenv
* ts-node-dev
* Resend
* Google OAuth

---

## ✨ Funcionalidades

* ✅ Autenticação com Google OAuth
* ✅ Cadastro de compromissos
* ✅ Listagem de compromissos
* ✅ Busca de compromisso por ID
* ✅ Atualização de compromissos
* ✅ Exclusão de compromissos
* ✅ Controle de status dos compromissos
* ✅ Cadastro e gerenciamento de notificações
* ✅ Envio de lembretes por e-mail
* ✅ Verificação automática de lembretes
* ✅ Integração com PostgreSQL utilizando Prisma ORM

---

## 📁 Estrutura do Projeto

```text
backend
│
├── prisma
│   ├── migrations
│   │   ├── 20260730114414_init
│   │   ├── 20260730145832_adicionar_status
│   │   ├── 20260731122452_adicionar_usuario
│   │   ├── 20260802081100_adicionar_lembrete_email
│   │   └── 20260803184216_adicionar_notificacoes
│   │
│   └── schema.prisma
│
├── src
│   │
│   ├── controllers
│   │   └── authController.ts
│   │
│   ├── lib
│   │   └── prisma.ts
│   │
│   ├── middleware
│   │   └── auth.ts
│   │
│   ├── routes
│   │   ├── auth.ts
│   │   ├── compromissos.ts
│   │   └── notificacoes.ts
│   │
│   ├── services
│   │   ├── email.ts
│   │   ├── googleAuth.ts
│   │   ├── lembrete.ts
│   │   └── lembreteScheduler.ts
│   │
│   └── server.ts
│
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/RegianLeopoldo/agenda-facil-backend.git
```

### 2. Entre na pasta

```bash
cd agenda-facil-backend
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo chamado:

```text
.env
```

Exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/agenda_facil"

PORT=3333

FRONTEND_URL="http://localhost:3000"

GOOGLE_CLIENT_ID="seu_google_client_id"
GOOGLE_CLIENT_SECRET="seu_google_client_secret"

RESEND_API_KEY="sua_resend_api_key"
```

> ⚠️ **Nunca envie o arquivo `.env` para o GitHub.** Ele deve permanecer no `.gitignore`.

### 5. Execute as migrations

```bash
npx prisma migrate dev
```

### 6. Inicie o servidor

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3333
```

---

## 📌 Endpoints

### 🔐 Autenticação

| Método | Endpoint                | Descrição                       |
| ------ | ----------------------- | ------------------------------- |
| GET    | `/auth/google`          | Inicia autenticação com Google  |
| GET    | `/auth/google/callback` | Callback da autenticação Google |

### 📅 Compromissos

| Método | Endpoint            | Descrição                   |
| ------ | ------------------- | --------------------------- |
| GET    | `/compromissos`     | Lista os compromissos       |
| GET    | `/compromissos/:id` | Busca um compromisso por ID |
| POST   | `/compromissos`     | Cadastra um compromisso     |
| PUT    | `/compromissos/:id` | Atualiza um compromisso     |
| DELETE | `/compromissos/:id` | Remove um compromisso       |

### 🔔 Notificações

| Método | Endpoint        | Descrição            |
| ------ | --------------- | -------------------- |
| GET    | `/notificacoes` | Lista notificações   |
| POST   | `/notificacoes` | Cria uma notificação |

> Os endpoints podem sofrer alterações conforme a evolução do projeto.

---

## 🗄️ Banco de Dados

O projeto utiliza **PostgreSQL** como banco de dados e **Prisma ORM** para modelagem, migrations e acesso aos dados.

### Criar uma migration

Após alterações no arquivo `schema.prisma`:

```bash
npx prisma migrate dev
```

### Gerar o Prisma Client

```bash
npx prisma generate
```

### Abrir o Prisma Studio

```bash
npx prisma studio
```

O Prisma Studio permite visualizar e gerenciar os dados do banco de dados durante o desenvolvimento.

---

## 📧 Sistema de Lembretes

O Agenda Fácil possui um sistema automático de lembretes.

O backend possui um **scheduler** responsável por verificar periodicamente os compromissos que possuem lembretes configurados.

Quando um lembrete precisa ser enviado, o sistema utiliza o **Resend** para realizar o envio do e-mail.

Componentes relacionados:

```text
src/services/
├── email.ts
├── lembrete.ts
└── lembreteScheduler.ts
```

---

## 🔐 Autenticação

A aplicação utiliza **Google OAuth** para autenticação dos usuários.

A implementação está organizada em:

```text
src/
├── controllers/
│   └── authController.ts
│
├── middleware/
│   └── auth.ts
│
├── routes/
│   └── auth.ts
│
└── services/
    └── googleAuth.ts
```

O middleware de autenticação é responsável por proteger as rotas que necessitam de usuário autenticado.

---

## 🌐 CORS

O backend permite requisições provenientes do frontend da aplicação.

Durante o desenvolvimento:

```text
http://localhost:3000
```

Em produção:

```text
https://agenda-facil-frontend-omega.vercel.app
```

---

## ☁️ Deploy

### Backend

O backend está preparado para execução em ambiente de produção.

URL:

```text
https://agenda-facil-backend-xm0w.onrender.com
```

### Frontend

O frontend da aplicação está hospedado na Vercel:

```text
https://agenda-facil-frontend-omega.vercel.app
```

---

## 🔗 Frontend

Este backend é consumido pelo frontend desenvolvido com **Next.js**.

Repositório:

https://github.com/RegianLeopoldo/agenda-facil-frontend

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos, de estudo e portfólio.

---

## 👨‍💻 Grupo

* **Severino Regian Leopoldo da Silva Vieira**
* **Aline Oliveira Gomes**
* **Robério Madson Dias da Cunha**
* **Taliane de Souza Louzeiro Alves**


### GitHub

https://github.com/RegianLeopoldo

### LinkedIn

https://www.linkedin.com/in/regian-vieira-463777304
