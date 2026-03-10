# StoryVerse Creator

> A full-stack creator studio for planning, producing, and growing serialised content — with real-time collaboration, AI story assistance, and audience sentiment analytics.

**Live demo:** [https://storycrater-3e997.web.app](https://storycrater-3e997.web.app)

---

## Architecture

```text
┌──────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React SPA)                      │
│  React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui        │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────┐   │
│  │ Pages    │  │ Hooks    │  │ UI (40+) │  │ Search &      │   │
│  │ 10 routes│  │ Firestore│  │ shadcn   │  │ Pagination    │   │
│  │          │  │ onSnap   │  │ Radix    │  │ hooks         │   │
│  └────┬─────┘  └────┬─────┘  └──────────┘  └───────────────┘   │
│       │              │                                           │
│       │   ┌──────────▼──────────┐                               │
│       │   │ Firebase Client SDK │                               │
│       │   │ Auth · Firestore    │                               │
│       └───┴─────────────────────┘                               │
└──────────────────┬───────────────────────────┬──────────────────┘
                   │                           │
       ┌───────────▼───────────┐   ┌───────────▼───────────┐
       │   EXPRESS BACKEND     │   │   FLASK AI BACKEND     │
       │   Node.js · MongoDB   │   │   Gemini 1.5 Flash     │
       │   Atlas               │   │   Sentiment API        │
       │                       │   │                        │
       │ • /api/me  (profile)  │   │ • /chat  (AI story)    │
       │ • Firebase Admin auth │   │ • /api/analyze (NLP)   │
       │ • Token verification  │   │ • /api/stats  (agg.)   │
       └───────────┬───────────┘   └───────────┬───────────┘
                   │                           │
       ┌───────────▼───────────┐   ┌───────────▼───────────┐
       │   MongoDB Atlas       │   │   Gemini API +        │
       │   (User profiles)     │   │   TF-IDF / LogReg     │
       │                       │   │   (Sentiment model)   │
       └───────────────────────┘   └───────────────────────┘
                   │
       ┌───────────▼───────────┐
       │   Cloud Firestore     │
       │   (Shows, episodes,   │
       │    creator stats)     │
       │   Real-time sync via  │
       │   onSnapshot          │
       └───────────────────────┘
```

---

## Tech Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| **Frontend** | React 18, TypeScript 5.8, Vite 5 | SPA with SWC compiler |
| **Styling** | Tailwind CSS 3.4, shadcn/ui (40+ components) | Dark theme, responsive |
| **State** | React hooks, `onSnapshot` listeners | Real-time Firestore sync |
| **Auth** | Firebase Authentication | Email/password, auto-logout |
| **Databases** | Cloud Firestore, MongoDB Atlas | Real-time + document store |
| **Backend API** | Express.js, Firebase Admin SDK | REST, token auth middleware |
| **AI Engine** | Flask, Google Gemini 1.5 Flash | Conversational story assistant |
| **ML/NLP** | scikit-learn, TF-IDF, Logistic Regression, Random Forest | Sentiment analysis, genre analysis |
| **Search** | Client-side full-text filter + pagination hook | Instant search overlay |
| **Testing** | Vitest, React Testing Library, jsdom | 61 tests across 9 suites |
| **CI/CD** | GitHub Actions (lint → typecheck → test → build → deploy) | Automated pipeline |
| **Hosting** | Firebase Hosting | Production CDN |

---

## Features

### 🎬 Content Management

- **20 shows / 112 episodes** with branching storylines (choice A / choice B)
- Netflix-style horizontal scroll carousels with "View All" grid toggle
- Paginated grid view with "Show more" lazy loading
- Show detail pages with episode lists, character info, and story choices

### 🤖 AI Story Lab

- Real-time chat with Google Gemini 1.5 Flash
- Brainstorm hooks, outlines, character names, plot twists
- Full conversation history with multi-turn context
- Offline fallback with keyword-based local replies

### 📊 Audience Sentiment Dashboard

- ML-powered review classification (positive/negative)
- Live review analyzer — paste any text for instant sentiment prediction
- KPI cards: total reviews, positive %, avg confidence
- Sentiment distribution bar chart
- Recent reviews table with keyword highlighting

### 🔐 Authentication & Security

- Firebase Auth (email/password)
- Auto-logout after 10 minutes of inactivity
- Firebase Admin SDK token verification on backend
- Firestore security rules (owner-based access)
- Protected routes via `RequireAuth` component

### 🔍 Search & Discovery

- Full-text search overlay (title, genre, description)
- Instant results with show thumbnails
- Keyboard navigation (Escape to close)

### 🔄 Real-time Collaboration

- Firestore `onSnapshot` listeners on shows and stats
- Live updates across all connected clients
- Automatic fallback to mock data when offline

### 📱 Responsive Design

- Mobile hamburger menu with full-screen overlay
- Responsive card widths (160px → 200px → 260px)
- Stacked layouts on small screens
- Full-width AI chat sheet on mobile

### �� ML / Data Science (Python)

- `trainModel.py` — Random Forest classifier for rating prediction
- `sentimentAnalysis.py` — TF-IDF + Logistic Regression sentiment model
- `analyzeGenres.py` — Genre popularity analysis from CSV data
- `suggestusers.py` — User similarity scoring for recommendations
- `sentiment_api.py` — Flask REST API serving predictions to frontend

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- Python ≥ 3.9
- Firebase CLI (`npm i -g firebase-tools`)
- MongoDB Atlas cluster (for backend)

### 1. Clone & Install

```bash
git clone https://github.com/hema-hema123/-storyverse_creator.git
cd storyverse-creator
npm install
```

### 2. Environment Variables

Create `.env` in the project root:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:5000
VITE_SENTIMENT_API_URL=http://localhost:5001
```

### 3. Run Frontend

```bash
npm run dev
```

### 4. Run Backend (Express + MongoDB)

```bash
cd backend
npm install
cp .env.example .env   # Add MONGODB_URI, DB_NAME
node server.js
```

### 5. Run AI Backend (Flask + Gemini)

```bash
cd story_bot
pip install -r requirements.txt
export GEMINI_API_KEY=your_key
python app.py
```

### 6. Run Sentiment API

```bash
cd backend
pip install flask flask-cors numpy
python sentiment_api.py
```

### 7. Seed Firestore

```bash
node scripts/seedFirestore.mjs
```

---

## Testing

```bash
# Run all 61 tests
npm test

# Watch mode
npm run test:watch

# Verbose output
npx vitest run --reporter=verbose
```

### Test Coverage

| Suite | Tests | Covers |
| --- | --- | --- |
| ShowCard | 8 | Rendering, badges, links, images |
| ShowRow | 8 | View All toggle, expand/collapse, grid vs scroll |
| StoryChatSheet | 9 | Open/close, send/receive, clear, initial prompt |
| RequireAuth | 3 | Auth redirect, protected content, loading state |
| Login | 7 | Form input, submit, error handling, loading state |
| Landing | 7 | Headlines, features, FAQ, logo |
| mockData | 9 | Type validation, sorting, filtering, formatting |
| useShowSearch | 9 | Query filter, pagination, page reset, edge cases |
| example | 1 | Smoke test |

---

## CI/CD Pipeline

```text
Push to main
    │
    ├── Lint (ESLint)
    ├── Type Check (tsc --noEmit)
    └── Test (Vitest, 61 tests)
         │
         └── Build (Vite production)
              │
              └── Deploy (Firebase Hosting)
```

Configured in `.github/workflows/ci.yml`.

---

## Project Structure

```text
storyverse-creator/
├── src/
│   ├── components/          # 40+ UI components (shadcn/ui + custom)
│   │   ├── Navbar.tsx       # Responsive nav with hamburger + search
│   │   ├── ShowCard.tsx     # Netflix-style show card
│   │   ├── ShowRow.tsx      # Horizontal carousel with pagination
│   │   ├── SearchOverlay.tsx# Full-screen search
│   │   ├── StoryChatSheet.tsx # AI chat side panel
│   │   └── ui/             # 40+ shadcn/ui primitives
│   ├── hooks/
│   │   ├── useFirestoreShows.ts  # Real-time Firestore listener
│   │   ├── useFirestoreStats.ts  # Real-time stats listener
│   │   └── useShowSearch.ts      # Search + pagination hook
│   ├── pages/
│   │   ├── Index.tsx        # Main browse page (studio dashboard)
│   │   ├── ShowDetail.tsx   # Show info + episode list
│   │   ├── EpisodeDetail.tsx# Episode viewer
│   │   ├── StoryChoice.tsx  # Branching story choices
│   │   ├── CreatorStats.tsx # Creator analytics dashboard
│   │   ├── SentimentDashboard.tsx # ML sentiment dashboard
│   │   ├── Login.tsx / Signup.tsx
│   │   └── Landing.tsx      # Public landing page
│   ├── data/
│   │   ├── mockData.ts      # 20 shows, 112 episodes
│   │   ├── trainModel.py    # Random Forest classifier
│   │   ├── sentimentAnalysis.py # TF-IDF + LogReg
│   │   ├── analyzeGenres.py # Genre analysis
│   │   └── suggestusers.py  # User recommendation
│   └── test/                # 9 test suites, 61 tests
├── backend/
│   ├── server.js            # Express REST API
│   ├── firebaseAdmin.js     # Token auth middleware
│   ├── db.js                # MongoDB connection
│   └── sentiment_api.py     # Flask sentiment API
├── story_bot/
│   └── app.py               # Flask + Gemini AI chat
├── .github/workflows/ci.yml # CI/CD pipeline
├── firestore.rules          # Security rules
└── firebase.json            # Hosting + Firestore config
```

---

## Key Design Decisions

| Decision | Rationale |
| --- | --- |
| Firestore `onSnapshot` + mock fallback | Graceful degradation when DB is empty or offline |
| Client-side search over Algolia | Sufficient for <1000 items, zero cost |
| Keyword sentiment classifier over full ML model | Predictable, fast, no Python runtime needed in production frontend |
| shadcn/ui over Material UI | Tree-shakeable, copy-paste components, full Tailwind integration |
| Vite over CRA/Next.js | Fastest DX, SWC compiler, simple SPA (no SSR needed) |
| Firebase Hosting over Vercel | Unified Firebase ecosystem (Auth + Firestore + Hosting) |

---

## Developed by

Inika Goyal, Parth Prajapati, Joonyoung Ma, Abdul Samad, and Bisher Hamdan

## License

MIT
