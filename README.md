# Progression

A workout tracking app built around percentage-based training. Create a program, set your one rep maxes, and the app calculates your working weights each session. Log your sets, track body weight, and watch your lifts progress over time.

## Features

- **Program Management** — Create custom programs or use the built-in Stronger by Science template. Configure exercises, sets, reps, and intensity percentages per training day.
- **One Rep Max Tracking** — Track original and current 1RM values for every exercise. Sortable and searchable table with progress indicators.
- **Workout Logging** — Daily view of your current week's workouts with calculated working weights based on your 1RM and programmed intensity.
- **Body Weight Tracking** — Log body weight over time with a chart visualization.
- **Workout History** — Review completed weeks and past workout logs.
- **Demo Mode** — One-click demo login with pre-seeded data for trying out the app.
- **Authentication** — JWT-based login and registration.

## Tech Stack

- **React 19** with TypeScript
- **Vite** for dev server and builds
- **Material UI** for components
- **TanStack Router** for file-based routing
- **TanStack React Query** for data fetching and caching
- **Recharts** for charts
- **Zod** for schema validation

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` and expects the backend API at `http://127.0.0.1:8000`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
