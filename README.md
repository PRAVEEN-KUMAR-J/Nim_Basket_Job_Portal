# 🧺 Nim Basket — Job Portal

A modern employee recruitment portal built with **React + TypeScript + Vite**, powered by **Supabase** for backend storage.

Live Site → [nim-basket-job-portal.vercel.app](https://nim-basket-job-portal.vercel.app)

---

## 📋 Features

- 🏠 **Hero Section** — Brand intro with quick-action buttons
- 💼 **Open Positions** — Lists all available job roles with apply buttons
- 🛵 **Delivery Partner** — Dedicated section for delivery partner applications (Google Form)
- 📬 **Contact Section** — Company contact details
- 🔐 **Admin Panel** — Password-protected dashboard to view all applications
- 📦 **Supabase Integration** — Applications stored securely in the cloud

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/PRAVEEN/Nim_Basket_Job_Portal.git

# Navigate to the project folder
cd Nim_Basket_Job_Portal

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

### Run Locally

```bash
npm run dev
```

App will be available at → `http://localhost:5173`

---

## 🔐 Admin Panel

Visit the admin panel by appending `#admin` to any URL:

```
http://localhost:5173/#admin          ← Local
https://nim-basket-job-portal.vercel.app/#admin  ← Production
```

| Credential | Value |
|------------|-------|
| Password   | Set in `AdminLogin.tsx` |

> Session is saved in `sessionStorage` — refreshing keeps you logged in, but closing the tab logs you out.

---

## 🗂️ Project Structure

```
EMPLOYEE RECRUITMENT/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminLogin.tsx       # Admin login screen
│   │   │   └── AdminDashboard.tsx   # View all submitted applications
│   │   ├── ApplicationForm.tsx      # Job application modal form
│   │   ├── Contact.tsx              # Contact section
│   │   ├── DeliveryPartner.tsx      # Delivery partner CTA
│   │   ├── Footer.tsx               # Site footer (includes leadership team)
│   │   ├── Hero.tsx                 # Hero / banner section
│   │   ├── LeadershipTeam.tsx       # Co-founders component (footer only)
│   │   ├── Logo.tsx                 # Nim Basket logo component
│   │   └── OpenPositions.tsx        # Job listings
│   ├── App.tsx                      # Root app component & routing logic
│   ├── index.css                    # Global styles
│   └── main.tsx                     # App entry point
├── supabase/                # Supabase migrations & config
├── .env                     # Environment variables (not committed)
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS | Styling |
| Supabase | Database & backend |
| Lucide React | Icons |
| Vercel | Hosting & deployment |

---

## ☁️ Deployment (Vercel)

1. Push code to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Set **Framework Preset** to `Vite`
4. Add Environment Variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click **Deploy** 🎉

Every `git push` to `main` triggers an automatic redeployment.

---

## 👥 Leadership Team

| Name | Role |
|------|------|
| Praveen Kumar J | Co-Founder |
| Selvarajan E | Co-Founder |
| Pugazheshwar D | Co-Founder |

---

## 📬 Contact

- 🌐 [nim-basket-job-portal.vercel.app](https://nim-basket-job-portal.vercel.app)
- 📧 nimbasket.official@gmail.com
- 📞 7200729718

---

© 2025 Nim Basket. All rights reserved.
