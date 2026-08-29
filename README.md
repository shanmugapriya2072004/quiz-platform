# Quiz Application Platform — MERN Stack

Full-stack quiz platform: user registration/login, interactive MCQ quiz with instant
green/red answer feedback, score cards, quiz history, and an admin dashboard for managing
categories, questions, users and results.

## Stack
- **Frontend:** React + Vite, React Router, Axios, React Toastify, Lucide icons, custom CSS (app-like UI)
- **Backend:** Node.js + Express, MongoDB + Mongoose, JWT auth, bcrypt password hashing

## Project structure
```
quiz-platform/
├── frontend/     React app (Vite)
└── backend/      Express REST API
```

## 1. Backend setup
```bash
cd backend
npm install
cp .env.example .env
# edit .env: set MONGO_URI (local or MongoDB Atlas) and a strong JWT_SECRET
npm run dev        # starts on http://localhost:5000
```

Optional — seed an admin account and sample quiz data:
```bash
node seed.js
# creates admin@quizplatform.com / Admin@123
# plus a "JavaScript Basics" category with 4 sample questions
```

## 2. Frontend setup
```bash
cd frontend
npm install
cp .env.example .env      # VITE_API_URL=http://localhost:5000/api
npm run dev                # starts on http://localhost:5173
```

Open http://localhost:5173 in your browser.

## 3. Using the app
1. Register a normal user account, or log in as the seeded admin
   (`admin@quizplatform.com` / `Admin@123`).
2. As **admin**: go to `/admin/questions` to add categories and MCQ questions
   (each question needs exactly 4 options and a `correctAnswer` matching one option exactly).
3. As **user**: go to `/dashboard`, pick a category, and take the quiz.
   Selecting an option immediately shows green (correct) or red (wrong + reveals the
   correct answer), then click **Next**. At the end you'll see an animated **score card**
   and can review history under `/history`.

## REST API summary
| Method | Endpoint | Access |
|---|---|---|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET  | /api/auth/me | Logged-in |
| GET  | /api/categories | Public |
| POST/PUT/DELETE | /api/categories(/:id) | Admin |
| GET  | /api/questions?category=&difficulty= | Public |
| POST/PUT/DELETE | /api/questions(/:id) | Admin |
| POST | /api/results | Logged-in (save quiz attempt, scored server-side) |
| GET  | /api/results/my | Logged-in (own history) |
| GET  | /api/results/:id | Owner or admin |
| GET  | /api/admin/stats | Admin |
| GET  | /api/admin/results | Admin |
| GET  | /api/admin/users | Admin |
| PUT  | /api/admin/users/:id/status | Admin (block/unblock) |
| DELETE | /api/admin/users/:id | Admin |

## Notes
- Passwords are hashed with bcrypt; never stored in plain text.
- Admin routes are protected by JWT + role-check middleware (`middleware/auth.js`).
- Quiz scoring is verified/finalized on the **server** in `resultController.js` even
  though the UI reveals correct/wrong instantly for a smooth experience.
- Extend ideas (per the original spec): timers, leaderboards, certificates, negative
  marking, randomized question order, difficulty selection, analytics charts.
