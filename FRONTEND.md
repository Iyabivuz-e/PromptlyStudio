# Specifications Document — Frontend Team

## 1) Context & Vision

**Promptly Studio** is an all-in-one platform that transforms:

* **Text prompts** → complete React + Tailwind applications.
* **Figma / Adobe XD designs** → functional React applications.
* Provides a **local component library** (Rwanda Dev Community UI).
* Offers a **zero-configuration experience** with pre-installed components, templates, and dependencies.

The frontend focuses on rendering, editing, live preview, and user interaction with the editor, component library, and imported designs.

---

## 2) Objectives

1. Generate front-end applications without complex setup.
2. Provide an integrated code editor (Monaco) for editing, previewing, and exporting.
3. Direct import of Figma / XD designs → transform into React + Tailwind.
4. Provide a local component library with search, filter, and versioning.
5. Facilitate sharing and customization of templates and components.

---

## 3) MVP (Minimum Viable Product)

* Integrated editor interface (Monaco) for React + Tailwind.
* Prompt-to-code generation.
* Figma/XD import and mapping to JSX/Tailwind.
* Component library (CRUD) and template management.
* Live preview with hot reload.

---

## 4) Technologies & Tools

**Core:** React.js, TailwindCSS, Framer Motion, Vite, TypeScript

**Editor & Dev Tools:** Monaco Editor, Prettier, ESLint, Zustand/Redux, SWC/Vite

**Testing:** Jest, React Testing Library, Cypress

**CI/CD & Deployment:** GitHub Actions, Docker

---

## 5) Component Library / Templates / Snippets

* Components: Button, Input, Modal, Card, Navbar, Sidebar, Table, Chart, Form elements.
* Templates: Dashboard layouts, Landing pages, Auth flows, Forms.
* Snippets: Hooks, utility functions, reusable JSX fragments.
* Features: Versioning & rollback, search & filter by tags, preview before insert, drag & drop into projects

---

## 6) Editor Interface

* File Explorer / Project Tree: CRUD operations on files & folders
* Code Editor: Monaco with syntax highlighting for JSX/TSX
* Preview Panel: live reload
* Snapshots / Versions: track changes, revert, export
* Import Mapping: Figma/XD → JSX/Tailwind

---

## 7) User Interaction & Flows

* Login / Signup (JWT/OAuth)
* Dashboard: projects list, recent activity, templates
* Project Page: editor + preview, component library sidebar, import/export controls
* Prompt-to-Code Flow: submit prompt → job status → update project tree
* Figma/XD Import Flow: select file → mapping → apply → project tree update

---

## 8) API Integration

* Fetch user profile, orgs, projects, components, templates, snippets
* Submit codegen jobs and poll via SSE
* Apply Figma/XD import mappings
* Export project code as zip
* Handle errors and retries gracefully

---

## 9) Non-functional Requirements

* Performance: <100ms editor interactions
* Scalability: support 1000+ files/project
* Responsiveness: desktop, tablet, mobile preview
* Accessibility: WCAG AA, keyboard nav, screen reader support
* Security: prevent XSS, validate API responses
* Observability: logs & error boundaries

---

## 10) Testing & Quality

* Unit tests for components/hooks
* Integration tests for editor, preview, import flows
* E2E tests for full user flows
* Snapshot tests for key UI components

---

## 11) Frontend Roadmap (Simplified Table)

| Phase                   | Duration | Key Deliverables                                                                        |
| ----------------------- | -------- | --------------------------------------------------------------------------------------- |
| Design & Architecture   | 2 weeks  | UI architecture, component library structure, editor mockups, Vite setup                |
| Technical Foundation    | 3 weeks  | Monaco editor integration, file explorer, API clients, state management                 |
| Prompt-based Generation | 4 weeks  | Prompt → codegen flow, live preview, SSE integration, error handling                    |
| Figma/XD Import         | 4 weeks  | Import API, mapping, JSX/Tailwind conversion, preview integration                       |
| Packaging & Marketplace | 3 weeks  | Export project code (zip), template & component marketplace interface                   |
| Testing & Launch        | 2 weeks  | Unit/integration/E2E tests, accessibility validation, performance optimization, release |

---

## 12) Naming Conventions & Code Quality

* Component files: PascalCase (`Button.tsx`)
* Hooks: `useCamelCase.ts`
* State stores: `zustand/projectStore.ts`
* Utilities: `camelCase.ts`
* CSS classes: Tailwind conventions, consistent custom prefixes
* Folder structure: `src/components`, `src/hooks`, `src/pages`, `src/utils`, `src/assets`, `src/store`
* Linting & formatting: ESLint + Prettier with pre-commit hooks
* Logging: error boundaries + toast notifications
