# Specifications Document — Backend Team

## 1) Context & Vision

**Promptly Studio** is a platform that transforms:

* a **text prompt** → into a ready-to-use **React + Tailwind** application;
* a **Figma / Adobe XD design** → into a functional **React** application;
* providing a **local component library** (Rwanda Dev Community UI), an **integrated editor** (Monaco), and **full code export**.

The backend provides APIs, orchestration for AI jobs, project management, authentication/authorization, persistence (Supabase/Firebase), artifact storage, billing hooks (later), and observability.

---

## 2) Scope

### Included

* REST APIs (Express) + Webhooks + SSE for job progress.
* JWT + OAuth (GitHub/Figma) authentication and role-based access control (RBAC).
* Organizations/teams, projects, environments management.
* Prompt → Code jobs using OpenAI/Anthropic.
* Figma/XD import via official APIs + parsers (html-to-jsx, etc.).
* Component library (CRUD, versioning, tags), templates, and snippets.
* Editor/Preview: file storage, tree, versions, exports.
* Project export (zip), artifact registry, private CDN.
* Quotas, rate limiting, audit logs, telemetry.
* CI (GitHub Actions), Docker, staging/prod pipelines.

### Excluded (post-MVP)

* Public marketplace with payments.
* Advanced billing/credits.
* Real-time collaborative editor (CRDTs).
* Third-party plugin ecosystem.

---

## 3) Technical Architecture

* **Node.js 20+**, **Express.js**.
* **Database**: Supabase (Postgres) or Firebase (use a DAL). MVP: **Supabase** preferred.
* **Storage**: Supabase Storage / S3-compatible for artifacts and assets.
* **Queue / Jobs**: BullMQ (Redis) or cloud task queues. MVP: **BullMQ + Redis**.
* **AI Providers**: OpenAI, Anthropic (keys per environment).
* **Integrations**: Figma API (OAuth2), GitHub (optional), user webhooks.
* **Observability**: pino + OpenTelemetry (traces), Prometheus metrics, Sentry for errors.
* **Security**: JWT RS256, RBAC, schema validation (Zod), rate limiting, CORS, Helmet.

---

## 4) Data Model (Postgres / Supabase)

> Table prefix: `ps_`

* `ps_users` (id, email, name, avatar\_url, provider, created\_at, last\_login\_at)
* `ps_orgs` (id, name, slug, owner\_user\_id, plan, created\_at)
* `ps_org_members` (org\_id, user\_id, role\[owner|admin|editor|viewer], invited\_at, joined\_at)
* `ps_projects` (id, org\_id, name, slug, type\[prompt|figma|mixed], created\_at, updated\_at, archived\_at)
* `ps_envs` (id, project\_id, name\[dev|staging|prod], config\_json)
* `ps_files` (id, project\_id, path, type\[file|dir], content\_hash, size, storage\_key, created\_at, updated\_at)
* `ps_components` (id, org\_id, name, version, tags\[], props\_schema\_json, code\_storage\_key, created\_at)
* `ps_templates` (id, org\_id|null, name, description, tags\[], snapshot\_storage\_key, created\_at)
* `ps_snippets` (id, org\_id|null, name, kind\[ui|logic|hook], code\_storage\_key, created\_at)
* `ps_codegen_jobs` (id, project\_id, kind\[prompt|figma], provider, status\[pending|running|succeeded|failed|canceled], prompt\_text, design\_ref, result\_storage\_key, logs\_storage\_key, cost\_cents, created\_at, finished\_at)
* `ps_imports` (id, project\_id, source\[figma|xd], file\_key, status, mapping\_json, created\_at, finished\_at)
* `ps_exports` (id, project\_id, format\[zip|tar], status, artifact\_storage\_key, created\_at, finished\_at)
* `ps_webhooks` (id, org\_id, url, secret, events\[], active, created\_at)
* `ps_audit_logs` (id, org\_id, user\_id, action, entity\_type, entity\_id, metadata\_json, created\_at)
* `ps_api_keys` (id, org\_id, name, hashed\_key, scopes\[], created\_at, revoked\_at)
* `ps_rate_limits` (org\_id, window\_start, count)
* `ps_settings` (org\_id, key, value\_json)

**Indexes**: index by `org_id`, `project_id`, `status`, `created_at`, and full-text on `name`, `tags`.

---

## 5) API Conventions

* **Base URL**: `/api/v1`.
* **Auth**: Header `Authorization: Bearer <JWT|API_KEY>`.
* **Content-Type**: `application/json`.
* **Error format**:

```json
{ "error": { "code": "string", "message": "string", "details": {} } }
```

* **Pagination**: `?limit=50&cursor=<opaque>` → returns `{ items: [...], nextCursor: "..." }`.
* **Idempotency**: support header `Idempotency-Key` for sensitive POSTs.
* **SSE**: `text/event-stream` for job updates: `/stream/codegen/:jobId`.

---

## 6) Proposed Endpoints

> All endpoints are resource namespaced; RBAC enforced via middleware.

### 6.1 Auth & Users

* `POST /auth/signup` — create user (email/password).
* `POST /auth/login` — email/password → JWT.
* `POST /auth/refresh` — refresh token → new JWT.
* `POST /auth/logout` — revoke refresh token.
* `GET /auth/me` — current user profile.
* `GET /oauth/figma/start` — OAuth redirect.
* `GET /oauth/figma/callback` — link Figma account.
* `POST /auth/api-keys` — create organization API key (owner/admin).
* `DELETE /auth/api-keys/:id` — revoke API key.

### 6.2 Organizations & Members

* `POST /orgs` — create organization.
* `GET /orgs` — list organizations the user belongs to.
* `GET /orgs/:orgId` — organization details.
* `PATCH /orgs/:orgId` — update org (plan, name, settings).
* `POST /orgs/:orgId/invite` — invite member.
* `POST /orgs/:orgId/members` — accept invite (token).
* `PATCH /orgs/:orgId/members/:userId` — change role.
* `DELETE /orgs/:orgId/members/:userId` — remove member.

### 6.3 Projects & Environments

* `POST /orgs/:orgId/projects` — create project {name, type}.
* `GET /orgs/:orgId/projects` — list projects.
* `GET /projects/:projectId` — project detail.
* `PATCH /projects/:projectId` — update (archive, rename).
* `DELETE /projects/:projectId` — delete/archive.
* `POST /projects/:projectId/envs` — create environment.
* `GET /projects/:projectId/envs` — list envs.
* `PATCH /envs/:envId` — update env config (providers, encrypted tokens).

### 6.4 Files / Editor / Tree

* `GET /projects/:projectId/files?path=/src` — list files.
* `GET /projects/:projectId/files/content?path=/src/App.tsx` — file content.
* `PUT /projects/:projectId/files/content` — write {path, base64Content, sha} (optimistic concurrency).
* `POST /projects/:projectId/files/rename` — rename/move.
* `DELETE /projects/:projectId/files` — delete {path}.
* `POST /projects/:projectId/files/import` — import zip.
* `POST /projects/:projectId/files/snapshot` — create snapshot (linked to exports/templates).

### 6.5 Component Library / Templates / Snippets

* `POST /orgs/:orgId/components` — publish component {name, version, props\_schema, code}.
* `GET /orgs/:orgId/components` — list (filter tags, q).
* `GET /components/:componentId` — detail + download code.
* `POST /orgs/:orgId/templates` — publish template.
* `GET /orgs/:orgId/templates` — list templates.
* `POST /orgs/:orgId/snippets` — publish snippet.
* `GET /orgs/:orgId/snippets` — list snippets.

### 6.6 Codegen (Prompt → Code)

* `POST /projects/:projectId/codegen` — start a job.

  * body: `{ promptText, model?: "gpt-4.1"|"claude-3", framework:"react-tailwind", options:{codingStyle, i18n, accessibility}}`
* `GET /codegen/jobs/:jobId` — status + metadata.
* `GET /stream/codegen/:jobId` — SSE for step logs.
* `POST /codegen/jobs/:jobId/cancel` — cancel job.

### 6.7 Figma / XD Import

* `POST /projects/:projectId/imports/figma` — create import `{ fileKey, page?, frames?[] }`.
* `GET /imports/:importId` — status, mapping, errors.
* `GET /stream/imports/:importId` — SSE.
* `POST /imports/:importId/apply` — apply mapping to project files.

### 6.8 Project Export

* `POST /projects/:projectId/exports` — start export {format:"zip"}.
* `GET /exports/:exportId` — status + signed download URL.

### 6.9 Webhooks

* `POST /orgs/:orgId/webhooks` — create webhook {url, events:\["codegen.succeeded", ...]}.
* `GET /orgs/:orgId/webhooks` — list.
* `POST /webhooks/test` — ping endpoint.

### 6.10 Audit / Quotas / Health

* `GET /orgs/:orgId/audit` — paginated audit logs.
* `GET /orgs/:orgId/quotas` — consumption (jobs, IA tokens, exports).
* `GET /health` — liveness/readiness.
* `GET /metrics` — Prometheus metrics.

---

## 7) Functional Specifications (Details)

### 7.1 Auth & RBAC

* JWT RS256; refresh tokens stored (rotation + theft detection).
* Organization roles: `owner`, `admin`, `editor`, `viewer`.
* Permissions:

  * `owner`: full access + billing + API keys.
  * `admin`: manage members, projects, webhooks.
  * `editor`: write files, run jobs.
  * `viewer`: read-only.
* Organization API keys with `scopes` (read, write, codegen, imports, exports).

### 7.2 Project Management

* Quick creation using starter template (React + Vite + Tailwind).
* Project types: `prompt`, `figma`, `mixed`.
* Environments: encrypted variables (KMS or libsodium) + provider config.

### 7.3 Editor & Files

* Atomic save with `sha` for conflict detection.
* Support binary assets via storage + hash.
* Snapshots history linked to exports & templates.

### 7.4 Codegen Jobs

* Orchestrator steps:

  1. Normalize prompt → internal spec.
  2. Call models (OpenAI/Anthropic) with guardrails (content filters).
  3. Generate tree, components, styles, hooks.
  4. Post-process: Prettier, lint, minimal tests.
  5. Write files + persist logs.
* Real-time tracking via SSE + persisted logs.
* Optional idempotence via hash(prompt+config).

### 7.5 Figma Import

* Figma OAuth per-user → encrypted token storage.
* Import by `fileKey`, optionally filtering pages/frames.
* Mapping: Figma components → local UI components (heuristics and naming rules).
* Output: JSX + Tailwind, exported assets, design variables.

### 7.6 Export

* Build final tree → archive (zip).
* Export manifest (component versions, file hashes, timestamp).
* Signed short-lived URL for download; record in `ps_exports`.

### 7.7 Webhooks & Integrations

* Events: `codegen.(queued|running|succeeded|failed|canceled)`, `import.*`, `export.*`, `project.file.changed`.
* Signature: HMAC-SHA256 in `X-Promptly-Signature`.
* Exponential retries on failures.

### 7.8 Observability & Security

* Per-request trace (correlation id), metrics for RPS/latency/errors.
* Global and per-key rate limiting.
* Strict validation via Zod/TypeBox.
* Daily backups, log rotation, secure secrets handling.

---

## 8) Request/Response Examples (samples)

### 8.1 POST /projects/\:projectId/codegen

**Request**

```json
{
  "promptText": "SaaS dashboard with sidebar, charts, auth",
  "model": "gpt-4.1",
  "framework": "react-tailwind",
  "options": { "i18n": true, "accessibility": "wcag-aa" }
}
```

**Response 202**

```json
{
  "jobId": "cgj_01J8...",
  "status": "queued",
  "etaSeconds": 45
}
```

### 8.2 GET /codegen/jobs/\:jobId

```json
{
  "id": "cgj_01J8...",
  "projectId": "prj_...",
  "status": "running",
  "steps": [
    {"name":"normalize_prompt","startedAt":"..."},
    {"name":"call_model","startedAt":"...","progress":0.3}
  ],
  "logsUrl": "https://storage/.../logs.txt",
  "result": null
}
```

### 8.3 Webhook payload

```json
{
  "event": "codegen.succeeded",
  "timestamp": 173...,
  "data": {
    "jobId": "cgj_...",
    "projectId": "prj_...",
    "artifactUrl": "https://storage/.../snapshot.zip",
    "costCents": 124
  }
}
```

---

## 9) Non-functional Requirements

* **Performance**: p95 < 300ms on non-job endpoints; stable SSE.
* **Availability**: 99.9% for public API.
* **Security**: encryption at rest (KMS) for secrets; CSP; auditing.
* **Scalability**: horizontal workers (BullMQ) and sharding by org.
* **Compliance**: GDPR-like controls (data export, deletion, optional EU regions).

---

## 10) Deployment & Environments

* **Environments**: `dev`, `staging`, `prod`.
* **CI**: run tests, lint, typecheck, build Docker image, deploy (tags → staging, releases → prod).
* **Migrations**: Prisma/Drizzle migrations with idempotent scripts.
* **Secrets**: Vault / Parameter Store; never stored in plaintext.

---

## 11) Testing & Quality

* **Unit tests**: services and utilities (Jest).
* **Integration tests**: Express routes (Supertest) with ephemeral DB.
* **End-to-end tests**: core flows (signup → codegen → export).
* **Contract tests**: OpenAPI spec (Zod → OpenAPI) validated with Dredd/Prism.
* **Load testing**: k6 for RPS and concurrent job scenarios.

---

## 12) Backend Roadmap (MVP → Post-MVP)

**MVP (priority)**

1. Auth, Orgs, Projects, Files.
2. Codegen (prompt) with SSE tracking.
3. Basic Figma import (frames → JSX/Tailwind).
4. Export zip + snapshots.
5. Components/Templates CRUD.
6. Observability, rate limiting, webhooks.

**Post-MVP**

* Marketplace, advanced billing/quotas, collaborative editor, plugins, one-click deployment.

---

## 13) Naming Conventions & Code Quality

* Routes: kebab-case; IDs prefixed (`prj_`, `cgj_`, `imp_`).
* Project folders: `src/routes`, `src/services`, `src/jobs`, `src/db`, `src/middlewares`, `src/integrations`.
* Logging: pino with `info`/`error` levels; do not log sensitive data.
* Feature flags via `ps_settings` table.

---

Parfait 👍 tu veux donc que je complète **à partir de la section 14 – Risks & Mitigations** avec des points supplémentaires. Voici une proposition de continuation :

---

## 14) Risks & Mitigations

* **AI costs**: per-org quotas + caching and idempotence.
* **LLM variability**: acceptance tests + strict post-processing (validation, schema enforcement).
* **Security breaches**: use of JWT rotation, rate limiting, input sanitization, and regular penetration testing.
* **Data consistency**: enforce strong typing in DB models, use transactions where necessary, and implement retry logic.
* **Scalability bottlenecks**: horizontal scaling with workers (queue consumers) and load balancing at API layer.
* **Vendor lock-in (e.g., Figma API, AI providers)**: abstraction layers and adapter pattern to switch providers.
* **Monitoring gaps**: enforce structured logging, alerts on error spikes, and synthetic tests.
* **Team handover risk**: detailed documentation + onboarding playbook for new developers.

---
Parfait 🙌 je vais ajouter une **section 15 – Roadmap (Phases)** qui enchaîne après la partie *Risks & Mitigations*. Voici une version claire et structurée :

---

## 15) Roadmap (Phases)

### **Phase 1 — Foundation (Weeks 1–4)**

* Monorepo setup with pnpm workspaces.
* Core packages: `ui`, `editor`, `codegen`, `design-importer`, `common`.
* Authentication & multi-tenant support (org-level).
* Initial documentation + CI/CD pipeline.

### **Phase 2 — Core Features (Weeks 5–8)**

* Prompt → React codegen (MVP).
* Figma/XD importer integration.
* Local component library (`ui`).
* First acceptance tests & basic caching layer.

### **Phase 3 — Collaboration & Scalability (Weeks 9–12)**

* Multi-user collaboration (shared projects).
* Role-based access control.
* API rate limiting + monitoring.
* Improved editor UX (Monaco wrapper + preview runtime).

### **Phase 4 — Advanced Capabilities (Weeks 13–16)**

* Fine-tuned AI pipelines (code style enforcement).
* Idempotence in AI requests.
* Partner integration layer (external plugins).
* Load testing + scalability validation.

### **Phase 5 — Launch & Growth (Weeks 17–20)**

* Public beta launch.
* Documentation & developer onboarding playbook.
* Collect feedback, fix critical bugs.
* Marketing & community outreach.

---
Parfait 🙌 Voici la **Roadmap sous forme de tableau clair et compact** :

---

## 15) Roadmap (Phases)

| **Phase**                                 | **Durée**  | **Objectifs clés / Livrables**                                                                                                                                                                                 |
| ----------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Phase 1 — Foundation**                  | Sem. 1–4   | - Mise en place du monorepo (pnpm workspaces) <br> - Création des packages (`ui`, `editor`, `codegen`, `design-importer`, `common`) <br> - Auth multi-tenant (org-level) <br> - Documentation initiale + CI/CD |
| **Phase 2 — Core Features**               | Sem. 5–8   | - Génération de code React via prompt (MVP) <br> - Import Figma/XD <br> - Librairie de composants (`ui`) <br> - Premiers tests d’acceptance + caching basique                                                  |
| **Phase 3 — Collaboration & Scalability** | Sem. 9–12  | - Collaboration multi-utilisateurs (projets partagés) <br> - RBAC (Role-Based Access Control) <br> - API rate limiting + monitoring <br> - UX améliorée pour l’éditeur (Monaco + preview runtime)              |
| **Phase 4 — Advanced Capabilities**       | Sem. 13–16 | - Pipelines IA avancés (enforcement du style de code) <br> - Idempotence des requêtes IA <br> - Intégration partenaires (plugins externes) <br> - Tests de charge + validation scalabilité                     |
| **Phase 5 — Launch & Growth**             | Sem. 17–20 | - Lancement public (beta) <br> - Documentation & playbook onboarding devs <br> - Collecte feedback + bugfix <br> - Marketing & communauté                                                                      |

---