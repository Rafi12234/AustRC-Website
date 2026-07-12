# AUSTRC Sub-Executive Registration

This is **not a separate frontend website**.

The registration frontend is integrated into the existing AUSTRC React app at:

- Route: `/sub-executive-registration`
- Source: `src/features/subExecutiveRegistration/`

Only the Node.js + Express backend is kept in this folder:

- `Sub Executive Registration/backend/`

## Local development

### 1. Main AUSTRC frontend

From the main project root:

```powershell
Copy-Item .env.example .env.local
npm install
npm run dev
```

The website runs on `http://localhost:3000` and the form is available at:

```text
http://localhost:3000/sub-executive-registration
```

### 2. Registration backend

Open a second terminal:

```powershell
cd "Sub Executive Registration\backend"
Copy-Item .env.example .env
npm install
npm run dev
```

Add your real Neon pooled connection string to `backend/.env`.

The backend runs on `http://localhost:5000`.
