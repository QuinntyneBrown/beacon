# Beacon Implementation Plan

A roadmap for taking Beacon — a radically simple Material 3 kanban board for small teams — from the current scaffolding to a working full-stack MVP. All work must adhere to `docs/technology-guidance-and-practices.md` and align with the screens already mocked under `docs/mocks/`.

---

## 1. Current state (snapshot)

### Backend (`backend/`)
Already in place, following clean architecture + CQS:

- **Domain** entities: `AppUser`, `Role`, `UserRole`, `Board`, `BoardColumn`, `WorkItemCard`, `RefreshToken`, `PasswordResetToken`, `SecurityAuditLog`.
- **Application** abstractions (`IBeaconDbContext`, `ICurrentUserService`, `IPasswordHasher`, `ITokenFactory`, `ITokenHashingService`), MediatR `ValidationBehavior`, and feature folders for:
  - `Auth/Register`, `Auth/SignIn`, `Auth/SignOut`, `Auth/RequestPasswordReset`, `Auth/ResetPassword`
  - `Boards/GetBoard`, `Boards/CreateCard`, `Boards/MoveCard`
  - `Profile/GetProfile`, `Profile/UpdateProfile`, `Profile/DeleteAccount`
- **Infrastructure**: `BeaconDbContext`, `Pbkdf2PasswordHasher`, `JwtTokenFactory`, `Sha256TokenHashingService`, `HttpContextCurrentUserService`, `DevelopmentDataSeederHostedService`.
- **Api** controllers: `AuthController`, `BoardsController`, `ProfileController`; request DTOs; `ExceptionHandlingMiddleware`.
- **Tests**: a few handler/validator tests for `Register` and `MoveCard`.

### Frontend (`frontend/`)
Angular workspace already split per the guidance:

- `projects/api` — models + services with `*.service.contract.ts` interfaces and tokens for auth, boards, profile.
- `projects/components` — `shell-header` only.
- `projects/domain` — `kanban-board`, `profile-panel`, `sign-in-form` plus `kanban-board-state` and `session` services with contracts.
- `projects/main` — bootstrap, routes (only `home-page` + `auth-callback`), `auth.interceptor`, `app-environment`.

### Mocks (`docs/mocks/`)
Material 3 HTML mocks + screenshots for: `index`, `login`, `boards`, `board`, `card`, `settings`, `components`. These are the visual contract for the Angular app.

---

## 2. Gaps to close (target MVP)

### Backend gaps
1. **Persistence wiring** — register `BeaconDbContext` (SQL Server), `IBeaconDbContext`, EF migrations, connection strings (`Beacon` DB), and the dev seeder.
2. **Authentication wiring** — `AddAuthentication().AddJwtBearer(...)` using `JwtOptions`; `AddAuthorization` with `Owner`/`Member`/`Viewer` policies; bind `AuthenticationOptions`.
3. **Refresh token flow** — `RefreshTokenCommand` + endpoint; persist hashed refresh tokens; rotation + revoke on sign-out.
4. **Rate limiting + lockout** — ASP.NET Core rate limiter on `/auth/sign-in` + lockout counter on `AppUser` with `SecurityAuditLog` entries.
5. **Boards feature completeness** — commands/queries for the rest of the board/card lifecycle:
   - `Boards/ListBoards` (Q), `Boards/CreateBoard` (C), `Boards/RenameBoard` (C), `Boards/DeleteBoard` (C), `Boards/AddColumn`, `Boards/RenameColumn`, `Boards/ReorderColumns`, `Boards/DeleteColumn`.
   - `Cards/UpdateCard` (title, description, due date, assignee), `Cards/DeleteCard`, `Cards/AddChecklistItem`, `Cards/ToggleChecklistItem`, `Cards/AddComment`, `Cards/AddAttachment` (metadata only for MVP).
   - Domain additions: `Comment`, `ChecklistItem`, `Attachment`, `BoardMember` (link `AppUser` ↔ `Board` with role).
6. **Authorization** — board membership check via a small `IBoardAuthorizationService` used by handlers; controller-level `[Authorize]`.
7. **OpenAPI** — keep `MapOpenApi` and add a `dotnet swagger` style export later for the frontend codegen task (out of scope for MVP).
8. **Test coverage** — add handler + validator tests for the new commands/queries; one integration test per controller using `WebApplicationFactory` + SQLite in-memory.

### Frontend gaps
1. **Material 3 theming** — wire Angular Material with an M3 theme using the mocks' palette tokens (primary `#006782`, primary-container `#B5F1F5`, secondary `#4EB2EF`, tertiary `#3ACFF5`, surface `#F3F3F3`); centralize tokens in `projects/main/src/styles.scss` and a shared `_design-tokens.scss` consumed by libraries.
2. **App shell** — top app bar, responsive nav (drawer/rail/bottom-nav) matching mocks. Live in `components` library as `app-shell`, `app-nav-rail`, `app-nav-drawer`, `app-bottom-nav`, `notification-snackbar`, `confirm-dialog`, `empty-state`, `page-heading`. Each component as separate `.ts/.html/.scss` files. BEM class names.
3. **Routing + guards** — add routes for `/sign-in`, `/sign-up`, `/forgot-password`, `/reset-password`, `/boards`, `/boards/:id`, `/boards/:id/cards/:cardId`, `/settings`. Add `authGuard` + `unauthGuard`.
4. **Auth flow** — registration page + form, password reset request/reset pages, sign-in form (already partially scaffolded), token refresh in `auth.interceptor`, session persistence via `SessionService`.
5. **Boards feature**
   - `domain/boards-list` page (cards of boards + create dialog).
   - `domain/board-page` hosting the existing `kanban-board` with drag-and-drop (`@angular/cdk/drag-drop`) wired to `MoveCardCommand`.
   - `domain/card-detail` page with editable title/description, checklist, comments.
   - `domain/settings-page` with profile + appearance + danger-zone.
6. **State** — extend `KanbanBoardStateService` with optimistic updates for create/move/update card; add `BoardsStateService` for boards list. Keep all consumed via service contracts (interface + injection token) per guidance.
7. **API services** — add the client-side counterparts for every new backend endpoint in `projects/api`, each with `*.service.contract.ts`.
8. **Testing** — Karma unit specs for new services/components; Playwright POMs for sign-in, board interaction, and card detail under `frontend/e2e/`.

### Cross-cutting
1. **Docs** — update `README.md` with the run-from-zero steps (SQL Server via Docker, EF migrations, `npm start`, `dotnet run`).
2. **Local dev orchestration** — `docker-compose.yml` for SQL Server only; `appsettings.Development.json` defaults that work out of the box.
3. **CI sanity** — verify `dotnet build beacon.sln`, `dotnet test`, `npm run build`, `npm test`, `npm run e2e` all pass on a clean clone.

---

## 3. Phased delivery

### Phase A — Backend foundation
A1. Wire `BeaconDbContext` (SQL Server) + `IBeaconDbContext` registration; add `ConnectionStrings:Beacon`.
A2. Create initial EF migration `InitialSchema`; document `dotnet ef database update` workflow.
A3. Wire JWT authentication + authorization policies; bind `JwtOptions` and `AuthenticationOptions`; add `[Authorize]` to non-auth controllers.
A4. Add rate limiter + lockout for sign-in; persist `SecurityAuditLog` entries on success/failure.
A5. Add `RefreshTokenCommand` + endpoint and rotation logic; revoke tokens on sign-out.
A6. Verify with existing tests and add handler tests for refresh + lockout.

### Phase B — Boards & cards domain
B1. Add domain types `BoardMember`, `Comment`, `ChecklistItem`, `Attachment`; update `BeaconDbContext` + new migration.
B2. `Boards/ListBoards`, `CreateBoard`, `RenameBoard`, `DeleteBoard` commands/queries + validators + controller actions.
B3. Column commands: `AddColumn`, `RenameColumn`, `ReorderColumns`, `DeleteColumn`.
B4. Card commands: `UpdateCard`, `DeleteCard`, `AddComment`, `AddChecklistItem`, `ToggleChecklistItem`.
B5. `IBoardAuthorizationService` enforcing membership in every handler.
B6. Tests: validator + handler for each command/query; one `WebApplicationFactory` integration test per controller.

### Phase C — Frontend foundation
C1. Install `@angular/material` + `@angular/cdk`; configure M3 theme using mock palette; add `_design-tokens.scss`.
C2. Build `components` library: `app-shell`, `app-nav-rail`, `app-nav-drawer`, `app-bottom-nav`, `page-heading`, `empty-state`, `confirm-dialog`, `notification-snackbar`. One file per type (ts/html/scss). BEM.
C3. Routes + guards: add all routes; `authGuard`, `unauthGuard`. Replace placeholder `home-page` with a redirect.
C4. `AuthInterceptor` token refresh + 401 handling; `SessionService` persistence (storage abstraction with contract).

### Phase D — Frontend features
D1. `domain/sign-up-form`, `domain/forgot-password-form`, `domain/reset-password-form` + matching pages in `main`.
D2. Polish `domain/sign-in-form`; wire to `IAuthService`; pages: `sign-in-page`, `sign-up-page`.
D3. `domain/boards-list` page + `IBoardsService.list/create/rename/delete`. Boards dashboard matching `boards.html` mock.
D4. Extend `domain/kanban-board` with `@angular/cdk/drag-drop`; wire `MoveCardCommand`; matching `board.html` mock.
D5. `domain/card-detail` page (editable title/description, checklist, comments) matching `card.html` mock.
D6. `domain/settings-page` (profile, appearance toggles, delete account) matching `settings.html` mock.
D7. Extend `KanbanBoardStateService` with optimistic updates + add `BoardsStateService`.

### Phase E — Quality
E1. Unit tests for new services/components (Karma).
E2. Playwright POMs and specs for: sign-in, create board, move card via DnD, edit card, sign-out.
E3. Run all validation gates on clean clone:
   - `dotnet build backend/beacon.sln`
   - `dotnet test backend/tests/Beacon.Application.Tests/Beacon.Application.Tests.csproj`
   - `npm run build` / `npm test` / `npm run e2e` from `frontend/`.
E4. README + run-from-zero docs; `docker-compose.yml` for SQL Server.

---

## 4. Notes & conventions reminders

- Backend: one type per file; FluentValidation only; no repositories/UoW; handlers depend on `IBeaconDbContext`.
- Frontend: one file per type per component (ts/html/scss); Angular Material everywhere; BEM; libraries depend only on what guidance allows (`components` ⟂ `api`; `domain` → `api`; `main` → all).
- Interface-driven service consumption: every service in `api` and `domain` exposes `*.service.contract.ts` (interface + `InjectionToken`) and is provided in `app.config.ts` (or library providers) using `{ provide: TOKEN, useClass: ConcreteService }`.
- All UI must match the M3 mocks in `docs/mocks/` — re-shoot Playwright screenshots from the live app for parity once Phase D is done.
- No new lint/test tooling beyond what already exists.
