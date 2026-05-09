# Bangalore Pincode Explorer

Bangalore Pincode Explorer is a simple full-stack web app for Bangalore users to quickly find:

- Area name from a pincode
- Pincode from an area name

Users can enter either a Bangalore pincode or a Bangalore area/post office name, and the app will fetch and display the matching result using the India Post API in a clean and responsive UI.

## Tech Stack

- Frontend: React + Tailwind CSS + Vite
- Backend: Node.js + Express
- API calls: Axios

## Project Structure

```
frontend/
backend/
```

## Features

- Search by pincode or area/post office name
- Two clean tabs for switching modes
- Loading spinner and error states
- Responsive layout with result cards
- Basic validation to prevent bad requests

## Installation Steps

### 1) Backend setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The backend runs at `http://localhost:5000` by default.

### 2) Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend runs at `http://localhost:5173` by default.

Note: In development, the Vite dev server proxies `/api` requests to `http://localhost:5000`, so keep the backend running.

## API Routes

- `GET /api/pincode/:pin`
- `GET /api/area/:name`

## Environment Variables

### Backend

```
PORT=5000
INDIA_POST_API_BASE=https://api.postalpincode.in
```

### Frontend

```
VITE_API_BASE_URL=http://localhost:5000
```

## Commands to Run Locally

```bash
# backend
cd backend
npm run dev

# frontend
cd frontend
npm run dev
```

## Screenshots

- Add your screenshots here
- Example: `screenshots/home.png`

## Deployment Links

- Frontend (Vercel): <add-your-link>
- Backend (Render): <add-your-link>

## Deployment Steps

### Frontend on Vercel

1. Push the repository to GitHub.
2. In Vercel, import the repo and select the `frontend` folder.
3. Set the build command to `npm run build` and output to `dist`.
4. Add env var: `VITE_API_BASE_URL` pointing to the Render backend URL.
5. Deploy.

### Backend on Render

1. Create a new Web Service in Render.
2. Select the repo and set the root directory to `backend`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add env vars: `PORT` (Render provides) and `INDIA_POST_API_BASE`.
6. Deploy.