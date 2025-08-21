

# Promptly Studio

**Promptly Studio** is an all-in-one platform that transforms text prompts or Figma/Adobe XD designs into fully functional React applications with TailwindCSS. It comes with a **local component library**, **zero-configuration setup**, and a **powerful integrated code editor**.

---

## 🚀 Project Vision

* Transform a **text prompt** → complete React application (components, styles, logic).
* Transform a **Figma / Adobe XD design** → production-ready React app.
* Provide a **community component library** (Rwanda Dev Community UI).
* Offer a **zero-configuration experience**: everything works out-of-the-box (templates, dependencies, editor).

---

## 🎯 Objectives

1. Generate front-end applications without complex setup.
2. Provide an **integrated code editor** for editing, previewing, and exporting.
3. Allow direct import of Figma/XD designs to React + Tailwind code.
4. Provide a **local component library**.
5. Facilitate sharing and customization of templates.

---

## 🏗 Minimum Viable Product (MVP)

* Integrated code editor (Monaco Editor).
* Prompt-to-code generation → React + Tailwind.
* Figma/XD design import via API.
* Pre-integrated Rwanda Dev Community UI.
* Full project export with one-time installation.

---

## 🛠 Backend & AI

* **Backend:** Node.js + Express
* **Database:** Supabase or Firebase
* **AI & Code Generation:** OpenAI / Anthropic API
* **Design Parsing:** Figma API, html-to-jsx parser
* **Dev Tools:** GitHub Actions, Docker

---

## 📅 Project Timeline

| Phase   | Duration | Description                                                              |
| ------- | -------- | ------------------------------------------------------------------------ |
| Phase 1 | 2 weeks  | Design & Architecture                                                    |
| Phase 2 | 3 weeks  | Technical foundation (Vite, Tailwind, editor shell, generation pipeline) |
| Phase 3 | 4 weeks  | Prompt-based generation                                                  |
| Phase 4 | 4 weeks  | Figma/XD design import                                                   |
| Phase 5 | 3 weeks  | Packaging & Marketplace                                                  |
| Phase 6 | 2 weeks  | Testing & Launch                                                         |

---

## 💻 Frontend Technologies

* React.js
* TailwindCSS
* Framer Motion
* Vite

---

## 📦 Quickstart / Installation

```bash
git clone https://github.com/yourusername/promptly-studio.git
cd promptly-studio
corepack enable
pnpm i
pnpm dev        # Start web UI
pnpm dev:api    # Start backend API
```

Create `.env` from `.env.example` and fill your API keys.

---

## 🏗 Monorepo Structure (pnpm workspaces)

```
---

## 🏗 Monorepo Structure 
```
```
promptly-studio/
├─ apps/
│  ├─ web/                    # React + Vite app (Editor + Preview + Export)
│  └─ api/                    # Express API (codegen, Figma import, export)
├─ packages/
│  ├─ ui/                     # Rwanda Dev Community UI components
│  ├─ editor/                 # Monaco editor wrapper + preview runtime
│  ├─ codegen/                # Prompt → React + Tailwind pipeline
│  ├─ design-importer/        # Figma/XD → React converter
│  └─ common/                 # Shared types, utils, schema validators
├─ .github/
│  └─ workflows/ci.yml        # Lint + Typecheck + Build + Test
├─ docker/
│  ├─ api.Dockerfile
│  └─ web.Dockerfile
├─ .env.example
├─ package.json
├─ pnpm-workspace.yaml
├─ README.md
├─ CONTRIBUTING.md
├─ CODE_OF_CONDUCT.md
├─ LICENSE (MIT)
└─ .gitignore
```

---

## 🔧 Architecture Overview

* **apps/web** → React + Vite (UI, editor, preview)
* **apps/api** → Express API (codegen, design import)
* **packages/editor** → Monaco editor wrapper
* **packages/codegen** → Prompt → React + Tailwind pipeline
* **packages/design-importer** → Figma/XD → React
* **packages/ui** → Local component library
* **packages/common** → Shared types & utils

---

## ⚡ Scripts

* `pnpm dev` → start web UI
* `pnpm dev:api` → start API backend
* `pnpm build` → build all packages
* `pnpm lint` → lint all packages
* `pnpm typecheck` → TypeScript type check
* `pnpm test` → run tests

---

## 🤝 Contribution Guidelines

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for instructions on forking, coding, testing, and PRs.

---

## 📜 Code of Conduct

See [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md). Please be respectful and collaborative.

---

## 📝 License

This project is licensed under the **MIT License** – see [`LICENSE`](LICENSE) for details.

---

## 🗺 Roadmap

1. **Phase 1 – Design & Architecture**: data model, UX flows, component library tokens
2. **Phase 2 – Technical Foundation**: Monaco integration, export to ZIP, API scaffolding
3. **Phase 3 – Prompt Generation**: templates, model adapters, HTML → JSX
4. **Phase 4 – Figma/XD Import**: API fetch, node mapping, styles
5. **Phase 5 – Packaging & Marketplace**: component registry, versioning
6. **Phase 6 – Testing & Launch**: E2E tests, docs site

---

## ⚡ Zero‑Config Developer Experience

* Prewired paths `@promptly/*` from web → packages
* Single `pnpm i` installs everything
* `pnpm dev` starts the web UI; `pnpm dev:api` starts the API
* Minimal `.env` setup for MVP; advanced features require API keys

---

## 📝 Next Steps

1. Initialize a GitHub repository and paste these files.
2. Run `corepack enable && pnpm i`.
3. Duplicate `.env.example` → `.env` and fill API keys.
4. Start `pnpm dev` + `pnpm dev:api`.
5. Open PRs for new templates, Figma node mapping, or export enhancements.

