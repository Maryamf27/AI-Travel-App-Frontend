<div align="center">

# 🌍 AI Travel Planner — Frontend

**A Next.js App Router application with role-based dashboards for Travelers, Travel Agents, and Admins**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Theming](https://img.shields.io/badge/Theme-Dark%20%2F%20Light-6366F1?style=flat-square)]()
[![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)]()

</div>

---

## Overview

The client for the AI Travel Planner platform. Built with the Next.js App Router, it delivers a fast, polished, dark-mode-ready experience across three distinct role-based interfaces — **Traveler**, **Travel Agent**, and **Admin** — all sharing one design system.

## ✨ Features

### 🧳 Traveler
- AI Trip Planner & saved trip history
- AI Hotel Search & saved search history
- Budget Planner & Safety Scores
- Travel recommendations
- Voice Assistant (floating mic widget — talks to a separate Python voice agent service via the backend; see the root-level `voice-agent/README.md` for setup)
- Profile & JWT-protected routes
- Dark / Light theme

### 🧑‍💼 Travel Agent
- Responsive sidebar + top navigation dashboard
- Client, booking, and revenue overview cards
- Quick actions and recent activity feed
- Profile management
- "Coming Soon" states for in-progress modules (Clients, Bookings, Packages)

### 🛡️ Admin 
- Platform-wide statistics (users, travelers, agents, trips) — live data
- User Management with search & account removal
- Agent Management (filtered user view)
- Settings (Coming Soon)
- Profile management

## 🧱 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **Icons:** lucide-react
- **Theming:** next-themes
- **State:** React Context (`AuthContext`)

## 📁 Project Structure

```
frontend/
├── app/
│   ├── page.jsx                    # Landing page
│   ├── login/ · signup/            # Auth pages
│   ├── dashboard/                  # Traveler module
│   ├── hotel-search/ · hotel-history/
│   ├── recommendations/
│   ├── agent/                      # Travel Agent module (new)
│   │   ├── layout.jsx              # Role-gated shell
│   │   ├── dashboard/ · clients/ · bookings/ · packages/ · profile/
│   └── admin/                      # Admin module (new)
│       ├── layout.jsx              # Role-gated shell
│       └── dashboard/ · users/ · agents/ · settings/ · profile/
├── components/
│   ├── AuthPage.jsx · DashboardNav.jsx · ProtectedRoute.jsx
│   ├── ThemeToggle.jsx · Toast.jsx
│   ├── trip/ · hotel/ · recommendation/
│   └── dashboard/                  # Shared Agent/Admin building blocks (new)
│       ├── DashboardShell.jsx      # Sidebar + top nav
│       ├── StatCard.jsx · EmptyState.jsx · ComingSoon.jsx
│       ├── ProfileForm.jsx · UserManagementTable.jsx
├── context/
│   └── AuthContext.jsx             # Auth state, login/register/logout
├── lib/
│   ├── api.js                      # authApi, tripApi, hotelApi, recommendationApi, adminApi
│   ├── roleRedirect.js             # Role → home route mapping (new)
│   ├── uiTokens.js                 # Shared design tokens
│   └── useToast.js
└── public/
```

## 🔐 Role-Based Routing

| Role | Redirects to on login | Protected from |
|---|---|---|
| `traveler` | `/dashboard` | `/agent/*`, `/admin/*` |
| `travel_agent` | `/agent/dashboard` | `/dashboard`, `/admin/*` |
| `admin` | `/admin/dashboard` | `/dashboard`, `/agent/*` |

Enforced client-side via `<ProtectedRoute allowedRoles={[...]}>`, which redirects unauthorized visitors to their own role's home instead of showing a broken page.

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Run the dev server
```bash
npm run dev
```

Visit `http://localhost:3000`.

### 4. Build for production
```bash
npm run build
npm start
```

## 🎨 Design System

All new Agent/Admin UI reuses the existing visual language — no new colors or components were introduced:

- **Accent:** orange → red gradient (`lib/uiTokens.js`)
- **Surfaces:** `rounded-2xl` cards, `zinc` neutral palette
- **Dark mode:** `next-themes`, class-based, applied via `@custom-variant dark`
- **Empty & unfinished states:** consistent `EmptyState` / `ComingSoon` components instead of broken pages

## 🧩 Key Shared Components

| Component | Used by | Purpose |
|---|---|---|
| `DashboardShell` | Agent + Admin | Responsive sidebar, top nav, logout |
| `StatCard` | Agent + Admin | Metric display with loading skeleton |
| `EmptyState` | Traveler + Agent + Admin | Friendly "nothing here yet" block |
| `ComingSoon` | Agent + Admin | Professional placeholder for unbuilt features |
| `ProfileForm` | Agent + Admin | Editable profile, wired to `authApi.updateMe` |
| `UserManagementTable` | Admin | Searchable, filterable, real user list |

## 📜 License

ISC
