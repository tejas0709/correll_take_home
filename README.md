# Status Board — Full Stack

A small full-stack application where users can post status updates (with title, message, and severity level) and view them in a feed, sorted newest first.

**Stack**
- Frontend: React 18 + TypeScript + Vite
- Backend: Flask 2.3 + Flask-CORS (in-memory storage)

**Quick Start**

1. **Terminal 1: Start the backend**

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend runs on `http://localhost:5000`.

2. **Terminal 2: Start the frontend**

```bash
cd frontend
npm install  # (if not already done)
npm run dev
```

Frontend runs on `http://localhost:3000`.

3. **Open browser**

Navigate to `http://localhost:3000` and start submitting statuses!

**Architecture**

- Frontend sends `POST /api/statuses` to submit new statuses
- Frontend fetches `GET /api/statuses` to load the feed
- Backend validates input and returns all statuses sorted by creation time (newest first)
- Severity levels: `low`, `medium`, `high`, `warning`, `critical`, `info`
- Each status displays with a color-coded severity badge

**Project Structure**

```
.
├── frontend/           # React + TypeScript + Vite
│   ├── src/
│   │   ├── App.tsx
│   │   ├── api/
│   │   │   └── client.ts
│   │   ├── components/
│   │   │   ├── StatusForm.tsx
│   │   │   └── StatusFeed.tsx
│   │   ├── styles.css
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── README.md
├── backend/            # Flask REST API
│   ├── app.py
│   ├── requirements.txt
│   └── README.md
└── README.md           # (this file)
```

**Features Implemented**

- ✅ Form with title, message, and severity selector
- ✅ Form clears on successful submit
- ✅ New status appears in feed without page reload
- ✅ Feed displays all statuses, sorted newest first
- ✅ Severity-based visual differentiation (colors + badges)
- ✅ Loading state while request is in flight
- ✅ Error state if request fails
- ✅ Input validation (title and message required, severity must be valid)
- ✅ Clean README with run instructions

**Next Steps (Bonus)**

- [ ] Delete a status (add `DELETE /api/statuses/:id`)
- [ ] Filter by severity
- [ ] Persist to PostgreSQL database
- [ ] Add authentication

