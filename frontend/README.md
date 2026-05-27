# Status Board — Frontend

This folder contains the React + TypeScript frontend for the Take-Home Status Board.

Quick start

1. Install dependencies

```bash
cd frontend
npm install
```

2. Run dev server

```bash
npm run dev
```

The dev server runs on port 3000 by default. The frontend expects a backend at `/api/statuses` (GET/POST). If the backend is not running yet, the app will still function with a local fallback so you can build and test the UI.

Next steps
- Implement the Flask backend to provide `GET /api/statuses` and `POST /api/statuses`.
- Add delete and filter features (bonus).
