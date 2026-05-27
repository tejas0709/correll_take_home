# Status Board — Backend

Flask REST API for the Status Board application.

**Quick start**

1. Install dependencies

```bash
cd backend
pip install -r requirements.txt
```

2. Run the server

```bash
python app.py
```

The server runs on `http://localhost:5000` by default.

**API Endpoints**

- `GET /api/statuses` — Fetch all statuses sorted newest first
- `POST /api/statuses` — Create a new status
  - Body: `{ "title": string, "message": string, "severity": "low" | "medium" | "high" | "warning" | "critical" | "info" }`
  - Returns: `{ "id": string, "title": string, "message": string, "severity": string, "createdAt": number }`

**Storage**

Statuses are stored in-memory (not persisted to disk). The server will lose all data on restart.

