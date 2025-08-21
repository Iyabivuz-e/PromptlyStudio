# 🚀 Express API (Codegen, Figma Import, Export)

Cette API backend est développée avec **Express.js**.
Elle fournit trois fonctionnalités principales :

* **Codegen** → Génération de code à partir d’un prompt texte.
* **Figma Import** → Import de données depuis Figma.
* **Export** → Export de projets ou de fichiers générés.

---

## 📂 Structure du projet

```
api-express/
├─ src/
│  ├─ routes/
│  │  ├─ codegen.js           # Routes pour la génération de code
│  │  ├─ figma.js             # Routes pour l'import depuis Figma
│  │  └─ export.js            # Routes pour l'export des données
│  ├─ controllers/
│  │  ├─ codegenController.js # Logique métier de la génération de code
│  │  ├─ figmaController.js   # Logique métier de l'import Figma
│  │  └─ exportController.js  # Logique métier de l’export
│  ├─ app.js                  # Configuration de l'application Express
│  └─ server.js               # Point d’entrée du serveur
├─ .env                       # Variables d'environnement
├─ package.json               # Dépendances & scripts NPM
└─ README.md                  # Documentation du projet
```

---

## ⚙️ Installation

1. **Cloner le projet**

```bash
git clone <repo_url>
cd api-express
```

2. **Installer les dépendances**

```bash
npm install
```

---

## 🚦 Lancer l’API

### Mode développement (auto-restart avec nodemon)

```bash
npm run dev
```

### Mode production

```bash
npm start
```

Le serveur sera disponible par défaut sur :
👉 `http://localhost:5000`

---

## 🔑 Configuration

Créer un fichier `.env` à la racine du projet pour stocker les variables d’environnement :

```
PORT=5000
FIGMA_API_KEY=your_figma_api_key_here
```

---

## 📌 Endpoints disponibles

| Méthode | Endpoint            | Description                          |
| ------- | ------------------- | ------------------------------------ |
| POST    | `/api/codegen`      | Générer du code à partir d’un prompt |
| POST    | `/api/figma/import` | Importer des données depuis Figma    |
| GET     | `/api/export`       | Exporter un projet ou un fichier     |

---

## 🛠 Scripts utiles

Dans le fichier `package.json`, les scripts suivants sont disponibles :

```json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js"
}
```

---

✨ Tu es prêt à développer et étendre ton API !

---
