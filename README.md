# OKR Management Application

A full-stack application for managing Objectives and Key Results (OKRs). Track team goals and measure progress through key results.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)

## Tech Stack

| Layer              | Technology         |
|--------------------|-------------------|
| Frontend           | React + Vite      |
| Backend            | NestJS            |
| ORM                | Prisma            |
| Database           | PostgreSQL        |
| Containerization   | Docker            |
| Testing            | Vitest            |

## Database Schema

```mermaid
erDiagram
    Objective ||--o{ KeyResult : "has many"
    
    Objective {
        int id PK "Auto-increment"
        string title "NOT NULL"
        datetime createdAt "DEFAULT now()"
    }
    
    KeyResult {
        int id PK "Auto-increment"
        int objectiveId FK "NOT NULL"
        string description "NOT NULL"
        int progress "DEFAULT 0, Range: 0-100"
        datetime createdAt "DEFAULT now()"
    }
```

The schema defines two main entities:
- **Objective**: Represents a goal with a title
- **KeyResult**: Measurable outcomes linked to an objective with progress tracking (0-100%)

Relationships:
- One Objective can have multiple KeyResults
- Deleting an Objective cascades to delete all its KeyResults

## Getting Started

### Prerequisites

- Node.js v18+
- pnpm
- Docker Desktop

### Quick Setup

```bash
# Clone repository
git clone https://github.com/rbpata/incubyte-okr.git
cd incubyte-okr

# Backend setup
cd backend
pnpm install
docker compose up -d
pnpx prisma generate
pnpx prisma db push
pnpm run start:dev

# Frontend setup (new terminal)
cd frontend
pnpm install
pnpm run dev
```

Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- **API Documentation (Swagger):** http://localhost:3000/api

### Detailed Installation

#### Backend

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pnpm install
```

3. Create `.env` file:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/okrs"
AUTH_TOKEN="your-secret-token"
```

4. Start PostgreSQL:
```bash
docker compose up -d
```

5. Initialize database:
```bash
pnpx prisma generate
pnpx prisma db push
```

6. Start server:
```bash
pnpm run start:dev
```

#### Frontend

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
pnpm install
```

3. Start development server:
```bash
pnpm run dev
```


## API Documentation

### 🌐 Interactive Swagger UI

Access the **interactive API documentation** at: **http://localhost:3000/api**

The Swagger UI provides:
- ✅ **Try It Out** - Test APIs directly from your browser
- ✅ **Request Examples** - Pre-filled example data for all endpoints
- ✅ **Response Schemas** - Clear documentation of all responses
- ✅ **Validation Rules** - See all field constraints and requirements

### 📊 OpenAPI JSON Schema

Access the raw OpenAPI/Swagger JSON schema at: **http://localhost:3000/api-json**

### 📚 API Endpoints Overview

Base URL: `http://localhost:3000/okr`

#### Objectives
- `GET /okr/objectives` - Get all objectives
- `GET /okr/objectives/:id` - Get objective by ID
- `GET /okr/objectives/:id/status` - Get objective status with progress
- `POST /okr/objectives` - Create new objective
- `PUT /okr/objectives/:id` - Update objective
- `DELETE /okr/objectives/:id` - Delete objective

#### Key Results
- `GET /okr/objectives/:objectiveId/key-results` - Get all key results
- `GET /okr/objectives/:objectiveId/key-results/:id` - Get key result by ID
- `POST /okr/objectives/:objectiveId/key-results` - Create key results (array)
- `PUT /okr/objectives/:objectiveId/key-results/:id` - Update key result
- `DELETE /okr/objectives/:objectiveId/key-results/:id` - Delete key result

**For detailed documentation, request/response examples, and interactive testing, visit the Swagger UI.**

## Testing

```bash
# Backend tests
cd backend
pnpm test                 # Run all tests
pnpm run test:watch       # Watch mode
pnpm run test:e2e         # E2E tests
pnpm run test:cov         # Coverage report

# Frontend tests
cd frontend
pnpm test                 # Run all tests
pnpm run test:watch       # Watch mode
```

## Project Structure

```
incubyte-okr/
├── backend/
│   ├── src/
│   │   ├── objectives/          # Objectives module
│   │   ├── key-results/         # Key Results module
│   │   ├── common/              # Shared utilities, guards, pipes
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   └── prisma.service.ts
│   ├── prisma/
│   │   └── schema.prisma        # Database schema
│   ├── test/                    # E2E tests
│   ├── docker-compose.yml
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── Contexts/
│   │   ├── Types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
└── README.md
```

## Troubleshooting

**Port already in use**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Docker not starting**
- Ensure Docker Desktop is running
- Try restarting Docker Desktop

**Database connection failed**
```bash
docker ps                    # Check if container is running
docker compose restart       # Restart database
```

**Prisma client not found**
```bash
cd backend
pnpx prisma generate
```

**Development tips**
- Use `http://localhost:3000/api` for interactive API documentation and testing
- Use `pnpx prisma studio` to view database in browser
- Both frontend and backend support hot reload
- Run `pnpm lint` and `pnpm format` for code quality

## License

This project is for learning and development purposes.
