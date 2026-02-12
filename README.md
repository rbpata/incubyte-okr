# 🚀 OKR Management Application

A full-stack **OKR (Objectives & Key Results)** management application built with:

- ⚛️ Frontend: React (Vite)
- 🧠 Backend: NestJS
- 🗄️ ORM: Prisma
- 🐘 Database: PostgreSQL
- 🐳 Containerization: Docker
- 🧪 Testing: Vitest

---

## 📌 Tech Stack

| Layer    | Technology   |
|----------|--------------|
| Frontend | React + Vite |
| Backend  | NestJS       |
| ORM      | Prisma       |
| Database | PostgreSQL   |
| Testing  | Vitest       |

---

# 🛠️ Project Setup Guide

Follow the steps below to set up the project locally.

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/rbpata/incubyte-okr.git .
```

---

# 🔧 Backend Setup

## 📂 Navigate to Backend

```bash
cd incubyte-okr/backend
```

---

## 📦 Install Dependencies

```bash
pnpm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder and add:

```env
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/okrs"
AUTH_TOKEN="secretkey"
```

> Replace `<username>` and `<password>` with your PostgreSQL credentials.

---

## 🐳 Setup PostgreSQL using Docker

1. Start Docker Desktop
2. Run:

```bash
docker compose up
```

This will start the PostgreSQL database container.

---

## 🧬 Prisma Setup

### Generate Prisma Client

```bash
pnpx prisma generate
```

### Sync Database with Schema

```bash
pnpx prisma db push
```

---

## ▶️ Start Backend Server

```bash
pnpm run start:dev
```

Backend runs at:

```
http://localhost:3000
```

---

# 🎨 Frontend Setup

## 📂 Open a New Terminal and Navigate to Frontend

```bash
cd incubyte-okr/frontend
```

---

## 📦 Install Dependencies

```bash
pnpm install
```

---

## ▶️ Start Frontend Server

```bash
pnpm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🧪 Running Tests

We use **Vitest** for testing in both frontend and backend.

To run tests in either module, navigate to the respective folder (`backend` or `frontend`) and run:

```bash
pnpm test
```

---

# 📡 Application URLs

| Service  | URL                   |
|----------|-----------------------|
| Backend  | http://localhost:3000 |
| Frontend | http://localhost:5173 |
| Database | http://localhost:5432 |

---

# 📂 Project Structure

```
incubyte-okr/
│
├── backend/        # NestJS + Prisma
├── frontend/       # React (Vite)
└── docker-compose.yml
```

---

# ✅ Requirements

- Node.js (v18+ recommended)
- pnpm
- Docker Desktop

---

# 🧪 Development Notes

- Backend runs in watch mode.
- Docker must be running before starting the backend.
- Ensure ports `3000`, `5173`, and `5432` are available.
- Run `prisma db push` after schema changes.
- Use `pnpm test` to execute unit tests.

---

# 📌 License

This project is for learning and development purposes.
