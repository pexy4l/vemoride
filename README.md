# VemoRide

Car rental platform for Lagos, Nigeria with airport pickup service.

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Radix UI, Redux Toolkit (RTK Query)
- **Backend:** Node.js, Express, Supabase (PostgreSQL + Storage)
- **API Docs:** Swagger UI at `/api-docs`

## Prerequisites

- Node.js 18+
- npm
- Supabase project with service role key

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/pexy4l/vemoride.git
cd vemoride
```

### 2. Install dependencies

```bash
# Frontend
npm install

# Backend
cd server
npm install
```

### 3. Configure environment

Create `server/.env`:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key
PORT=3001
```

### 4. Run locally

Open two terminals:

```bash
# Terminal 1 - Backend (http://localhost:3001)
cd server
npm run dev

# Terminal 2 - Frontend (http://localhost:3000)
cd ..
npm run dev
```

### 5. Access

- **App:** http://localhost:3000
- **API Docs (Swagger):** http://localhost:3001/api-docs

## Project Structure

```
vemoride/
├── src/                  # React frontend
│   ├── components/       # Reusable UI components
│   ├── pages/            # Route pages
│   ├── store/            # Redux store, RTK Query slices
│   └── lib/              # Utilities
├── server/               # Express backend
│   ├── routes/           # API route handlers
│   ├── swagger.js        # API documentation
│   ├── supabase.js       # Database client
│   └── index.js          # Server entry point
├── public/               # Static assets (logo, favicon)
└── index.html            # App entry point
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signin | Sign in |
| POST | /api/auth/signout | Sign out |
| GET | /api/cars | List all cars |
| GET | /api/cars/available | List available cars |
| GET | /api/cars/:id | Get car details |
| POST | /api/cars | Add a car (admin) |
| PUT | /api/cars/:id | Update a car (admin) |
| DELETE | /api/cars/:id | Delete a car (admin) |
| GET | /api/bookings | List bookings (admin) |
| POST | /api/bookings | Create a booking |
| PATCH | /api/bookings/:id/status | Update booking status (admin) |
| POST | /api/contact | Send contact message |
| GET | /api/premium-cars | List premium cars |
| GET | /api/blocked-dates | List blocked dates |
| POST | /api/upload/:bucket | Upload image |

Full interactive docs available at `/api-docs` when the server is running.

## Database Tables (Supabase)

- `cars` - vehicle inventory
- `bookings` - customer booking requests
- `blocked_dates` - unavailable dates per car
- `premium_cars` - homepage featured cars
- `contact_messages` - contact form submissions

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push: `git push origin feature/your-feature`
4. Open a Pull Request
