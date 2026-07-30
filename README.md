# 📅 Agenda Fácil - Backend

Backend da aplicação **Agenda Fácil**, desenvolvido com **Node.js**, **Express**, **TypeScript** e **Prisma ORM**.

A API é responsável pelo gerenciamento completo dos compromissos, oferecendo operações de cadastro, consulta, atualização e exclusão, além do controle de status dos compromissos.

---

## 📷 Demonstração

> Em breve serão adicionadas imagens da API e da documentação.

---

## 🚀 Tecnologias

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- CORS
- Dotenv
- ts-node-dev

---

## ✨ Funcionalidades

- ✅ Cadastrar compromissos
- ✅ Listar todos os compromissos
- ✅ Buscar compromisso por ID
- ✅ Atualizar compromisso
- ✅ Excluir compromisso
- ✅ Alterar status do compromisso
- ✅ Integração com PostgreSQL utilizando Prisma ORM

---

## 📁 Estrutura do Projeto

```text
src
│
├── lib
│   └── prisma.ts
│
├── routes
│   └── compromissos.ts
│
└── server.ts

prisma
│
├── migrations
└── schema.prisma
```

---

## ⚙️ Instalação

Clone o repositório:

```bash
git clone https://github.com/RegianLeopoldo/agenda-facil-backend.git
```

Entre na pasta:

```bash
cd agenda-facil-backend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo:

```text
.env
```

Exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/agenda_facil"
PORT=3333
```

Execute as migrations:

```bash
npx prisma migrate dev
```

Inicie o servidor:

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3333
```

---

## 📌 Endpoints

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| GET | `/compromissos` | Lista todos os compromissos |
| GET | `/compromissos/:id` | Busca um compromisso por ID |
| POST | `/compromissos` | Cadastra um compromisso |
| PUT | `/compromissos/:id` | Atualiza um compromisso |
| DELETE | `/compromissos/:id` | Remove um compromisso |

---

## 🗄️ Banco de Dados

O projeto utiliza **PostgreSQL** como banco de dados e **Prisma ORM** para modelagem e acesso aos dados.

Após qualquer alteração no schema execute:

```bash
npx prisma migrate dev
```

Para abrir o Prisma Studio:

```bash
npx prisma studio
```

---

## 🔗 Frontend

Este backend é utilizado pelo projeto frontend desenvolvido em Next.js.

Repositório:

https://github.com/RegianLeopoldo/agenda-facil-frontend

---

## 📄 Licença

Este projeto foi desenvolvido para fins de estudo e portfólio.

---

## 👨‍💻 Desenvolvedor

**Regian Leopoldo**

GitHub

https://github.com/RegianLeopoldo

LinkedIn

https://www.linkedin.com/in/regian-vieira-463777304