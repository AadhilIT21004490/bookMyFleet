# 🚗 BookMyFleet — Online Rent-A-Car Platform

> A full-stack vehicle rental platform connecting car owners (vendors) with customers, managed by an admin portal.

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Default Credentials](#default-credentials)
- [API Reference](#api-reference)
- [User Flows](#user-flows)
- [Portal Overview](#portal-overview)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14 (App Router), TypeScript, Bootstrap 5 |
| **Backend** | Node.js, Express.js, ES Modules |
| **Database** | MongoDB (Mongoose ODM) |
| **Auth** | JWT (JSON Web Tokens), bcryptjs |
| **Security** | Arcjet middleware |

---

## 📁 Project Structure

```
bookMyFleet/
├── backend/
│   └── src/
│       ├── configs/          # DB & env config
│       ├── controllers/      # Business logic
│       │   ├── auth.controller.js
│       │   ├── admin.controller.js
│       │   ├── vendor.dashboard.controller.js
│       │   ├── user.dashboard.controller.js
│       │   └── vehicles.controller.js
│       ├── middlewares/      # JWT auth, Arcjet
│       ├── models/           # Mongoose schemas
│       │   ├── user.model.js
│       │   ├── vendor.model.js
│       │   ├── admin.model.js
│       │   ├── vehicle.model.js
│       │   └── booking.model.js
│       ├── routes/           # Express routers
│       └── server.js
│
└── frontend/
    └── app/
        ├── login/            # Login page
        ├── register/         # Customer & vendor registration
        ├── cars-list-1/      # Public vehicle listing
        ├── vehicles/[id]/    # Vehicle detail + booking form
        ├── admin/            # Admin portal (protected)
        ├── vendor/           # Vendor portal (protected)
        └── user/             # User portal (protected)
```

---

## ⚡ Quick Start

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone & Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

**Backend** — create `backend/.env`:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/bookmyfleet
JWT_SECRET=your_super_secret_jwt_key_here
ARCJET_KEY=your_arcjet_key_here
```

**Frontend** — create `frontend/.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 3. Start the Backend

```bash
cd backend
node src/server.js
```

> ✅ You should see:
> ```
> Database connected on: localhost
> Server is up and running on 3001
> ```

### 4. Start the Frontend

```bash
cd frontend
npm run dev
```

> ✅ Frontend runs at: **http://localhost:3000**

### 5. Seed the Admin Account

Run this **once** to create the default admin user:

```bash
curl -X POST http://localhost:3001/api/admin/seed
```

Or open in browser: `http://localhost:3001/api/admin/seed` (POST via Postman/Thunder Client)

---

## 🔐 Default Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@bookmyfleet.lk` | `Admin@1234` |
| **Vendor** | Register via `/register` | Your chosen password |
| **Customer** | Register via `/register/customer` | Your chosen password |

---

## 🌐 API Reference

### Base URL
```
http://localhost:3001/api
```

### Health Check
```
GET /api/health
```

---

### 🔑 Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/auth/register` | Register a new customer | Public |
| `POST` | `/auth/login` | Login (all roles) | Public |
| `GET` | `/auth/profile` | Get current user profile | 🔒 JWT |

**Login Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123",
  "role": "User"
}
```
> `role` can be `"User"`, `"Vendor"`, or `"Admin"`

**Login Response:**
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "user@example.com",
  "role": "User",
  "token": "eyJhbGci..."
}
```

---

### 🚗 Public Vehicles (`/api/vehicles`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/vehicles` | List all approved vehicles | Public |
| `GET` | `/vehicles/:id` | Get vehicle details | Public |
| `POST` | `/vehicles/:id/book` | Create a booking | 🔒 User |

**List Vehicles Query Params:**
```
?category=SUV&fuelType=Petrol&transmission=Automatic&page=1&limit=12
```

**Create Booking Body:**
```json
{
  "vehicleId": "...",
  "pickupDate": "2026-03-01",
  "dropoffDate": "2026-03-08",
  "pickupLocation": "Colombo Airport",
  "dropoffLocation": "Kandy City",
  "notes": "Need child seat"
}
```

---

### 👤 User Dashboard (`/api/user-dashboard`) — 🔒 User JWT Required

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/user-dashboard/bookings` | My bookings (filter: `?status=Pending`) |
| `PUT` | `/user-dashboard/bookings/:id/cancel` | Cancel a booking |
| `GET` | `/user-dashboard/profile` | Get my profile |
| `PUT` | `/user-dashboard/profile` | Update profile |

---

### 🏢 Vendor Dashboard (`/api/vendor-dashboard`) — 🔒 Vendor JWT Required

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/vendor-dashboard/stats` | Dashboard statistics |
| `GET` | `/vendor-dashboard/vehicles` | My vehicle listings |
| `POST` | `/vendor-dashboard/vehicles` | Add a new vehicle |
| `PUT` | `/vendor-dashboard/vehicles/:id` | Update a vehicle |
| `DELETE` | `/vendor-dashboard/vehicles/:id` | Delete a vehicle |
| `GET` | `/vendor-dashboard/bookings` | My bookings |
| `PUT` | `/vendor-dashboard/bookings/:id/status` | Update booking status |
| `GET` | `/vendor-dashboard/profile` | Get vendor profile |
| `PUT` | `/vendor-dashboard/profile` | Update vendor profile |

---

### 🛡️ Admin (`/api/admin`) — 🔒 Admin JWT Required

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/admin/dashboard` | Platform statistics |
| `GET` | `/admin/vendors` | All vendors (filter: `?status=pending`) |
| `PUT` | `/admin/vendors/:id/approve` | Approve a vendor |
| `PUT` | `/admin/vendors/:id/reject` | Reject a vendor |
| `PUT` | `/admin/vendors/:id/toggle-block` | Block/Unblock a vendor |
| `GET` | `/admin/users` | All users |
| `PUT` | `/admin/users/:id/toggle-active` | Activate/Deactivate user |
| `GET` | `/admin/vehicles` | All vehicles (filter: `?status=pending`) |
| `PUT` | `/admin/vehicles/:id/approve` | Approve a vehicle |
| `PUT` | `/admin/vehicles/:id/reject` | Reject a vehicle |
| `GET` | `/admin/bookings` | All bookings (filter: `?status=Pending`) |
| `POST` | `/admin/seed` | Create default admin account |

---

## 🔄 User Flows

### Customer Booking Flow

```
1. Register at /register/customer
2. Login at /login  →  redirected to /user/dashboard
3. Browse vehicles at /cars-list-1
4. Click "View Details"  →  /vehicles/[id]
5. Click "Book this vehicle"
6. Fill in dates, locations  →  see live price estimate
7. Accept Terms & Conditions  →  "Confirm Booking"
8. Booking appears in /user/bookings with status "Pending"
9. Vendor approves  →  status changes to "Approved"
```

### Vendor Onboarding Flow

```
1. Register at /register (vendor registration form)
2. Admin approves vendor account at /admin/vendors
3. Login at /login  →  redirected to /vendor/dashboard
4. Add vehicles at /vendor/vehicles
5. Admin approves vehicles at /admin/vehicles
6. Vehicles appear publicly at /cars-list-1
7. Manage incoming bookings at /vendor/bookings
```

### Admin Workflow

```
1. Seed admin: POST /api/admin/seed
2. Login at /login  →  redirected to /admin/dashboard
3. Approve pending vendors at /admin/vendors
4. Approve vehicle listings at /admin/vehicles
5. Monitor all bookings at /admin/bookings
6. Manage users at /admin/users
```

---

## 🖥 Portal Overview

### Public Pages
| URL | Description |
|-----|-------------|
| `/` | Home page |
| `/cars-list-1` | Vehicle listing with filters |
| `/vehicles/[id]` | Vehicle detail + booking form |
| `/login` | Login (all roles) |
| `/register/customer` | Customer registration |
| `/register` | Vendor registration |

### User Portal (`/user/*`)
| URL | Description |
|-----|-------------|
| `/user/dashboard` | Booking stats overview |
| `/user/bookings` | Booking history + cancel |
| `/user/profile` | Edit personal info |

### Vendor Portal (`/vendor/*`)
| URL | Description |
|-----|-------------|
| `/vendor/dashboard` | Stats + recent bookings |
| `/vendor/vehicles` | Manage vehicle listings |
| `/vendor/bookings` | Manage customer bookings |
| `/vendor/profile` | Edit business profile |

### Admin Portal (`/admin/*`)
| URL | Description |
|-----|-------------|
| `/admin/dashboard` | Platform overview |
| `/admin/vendors` | Approve/block car owners |
| `/admin/users` | Manage customers |
| `/admin/vehicles` | Approve/reject listings |
| `/admin/bookings` | Monitor all bookings |
| `/admin/profile` | Admin account info |
| `/admin/settings` | Platform settings |

---

## 💡 Pricing Tiers

Vehicles support tiered pricing based on rental duration:

| Duration | Field |
|----------|-------|
| 1 week (7 days) | `pricePerDay1Week` |
| 2 weeks (14 days) | `pricePerDay2Weeks` |
| 3 weeks (21 days) | `pricePerDay3Weeks` |
| 1 month (30 days) | `pricePerDay1Month` |
| 3 months (90 days) | `pricePerDay3Months` |
| 6 months+ (180 days) | `pricePerDay6Months` |

> The system **automatically selects the best rate** based on booking duration.

---

## 🔒 Authentication Flow

All protected routes require a `Bearer` token in the `Authorization` header:

```
Authorization: Bearer <JWT_TOKEN>
```

Tokens are returned on login and stored in `localStorage` by the frontend `AuthProvider`.

Role-based access:
- **Admin** routes → `protect` + `adminOnly` middleware
- **Vendor** routes → `protect` + `vendorOnly` middleware  
- **User** routes → `protect` middleware (any authenticated user)

---

*Built with ❤️ by A2Labz*
