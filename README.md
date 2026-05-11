# Beacon

A radically simple Material 3 kanban board for small project teams.

- **Backend**: .NET 10 minimal API (clean architecture, MediatR, FluentValidation, EF Core, JWT auth).
- **Frontend**: Angular 20 standalone workspace with Material 3 theming and CDK drag-and-drop.

## Prerequisites

- .NET SDK 10
- Node.js 20+ and npm
- (Optional) SQL Server for production; the API uses EF Core's in-memory creation in development.

## Quick start

```pwsh
# 1. Restore + run backend (API on https://localhost:7028 by default)
dotnet run --project backend\src\Beacon.Api

# 2. In a second terminal, install + run the frontend (http://localhost:4200)
cd frontend
npm install
npm start
```

A demo account is seeded on first run:

- Email: `demo@beacon.local`
- Password: `Password12345!`

Open http://localhost:4200, sign in, and you'll land on the boards list.

## Routes

- `/sign-in` — sign in, register, or reset password.
- `/boards` — list, create, and delete boards.
- `/boards/:boardId` — kanban board with drag-and-drop columns and cards.
- `/boards/:boardId/cards/:cardId` — card detail with checklist and comments.
- `/settings` — profile management.

## Validation commands

```pwsh
# Backend
dotnet build backend\beacon.sln
dotnet test backend\tests\Beacon.Application.Tests\Beacon.Application.Tests.csproj

# Frontend (run from frontend\)
npm run build
npm test
```

## Documentation

- `docs\technology-guidance-and-practices.md` — architectural conventions.
- `docs\implementation-plan.md` — feature roadmap and status.
- `docs\mocks\` — Material 3 HTML design mocks and screenshots.
