Liderix – Modern SaaS Platform

A comprehensive full-stack TypeScript monorepo for a modern SaaS platform built with Next.js, Prisma, PostgreSQL, and pnpm workspaces.

🏗️ Architecture

Apps
	•	web – Main SaaS application (Next.js 14+ App Router)
	•	admin – Internal admin panel for managing tenants and configurations
	•	landing – Public marketing website with lead forms and demos

Packages
	•	ui-kit – Reusable UI components library
	•	prisma – Centralized database schema and Prisma client
	•	lib – Shared logic: auth, utils, config, stores

🚀 Getting Started

Prerequisites
	•	Node.js 18+
	•	pnpm 8+
	•	PostgreSQL database

Installation
	1.	Clone the repository:

git clone https://github.com/kproleev-ugai/Liderixapp.git
cd Liderixapp

	2.	Install dependencies:

pnpm install

	3.	Set up environment variables:

cp .env.example .env
# Then edit .env with your DB credentials and secrets

	4.	Set up the database:

pnpm db:generate
pnpm db:push

	5.	Start development:

# Run all apps in parallel
pnpm dev

# Or run individually
pnpm --filter @liderix/web dev
pnpm --filter @liderix/admin dev
pnpm --filter @liderix/landing dev

📁 Project Structure

liderix-monorepo/
├── apps/
│   ├── web/           # Main SaaS app (localhost:3000)
│   ├── admin/         # Admin panel (localhost:3001)
│   └── landing/       # Marketing site (localhost:3002)
├── packages/
│   ├── ui-kit/        # Shared UI components
│   ├── prisma/        # Prisma schema + client
│   └── lib/           # Shared utilities and logic
└── ...config files

🗄️ Database Schema

Supports multi-tenant architecture via PostgreSQL schemas:
	•	core: tenants, users, roles
	•	config: app modules, integrations
	•	billing: subscriptions, usage
	•	auth: session & account handling

🎨 UI System
	•	Tailwind CSS (light theme only)
	•	Shadcn & Radix UI
	•	Lucide icons
	•	Recharts (analytics)

🔧 Development Scripts

pnpm dev          # Start all apps
pnpm build        # Build all apps
pnpm lint         # Run ESLint
pnpm type-check   # TypeScript checks
pnpm db:generate  # Generate Prisma client
pnpm db:push      # Apply schema to DB

📦 Feature Development

To add a new feature:
	1.	Add components to packages/ui-kit
	2.	Add DB models in packages/prisma/schema.prisma
	3.	Implement logic in one of the apps (web, admin, etc.)
	4.	Use packages/lib for shared helpers

🚢 Deployment

Each app can be containerized and deployed separately:
	•	web: main application
	•	admin: internal control panel
	•	landing: public website

Deployment supported via Docker + environment variables.

📄 License

MIT – see LICENSE file.

