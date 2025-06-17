# Liderix - Modern SaaS Platform

A comprehensive full-stack TypeScript monorepo for a modern SaaS platform built with Next.js, Prisma, and pnpm workspaces.

## 🏗️ Architecture

### Apps
- **web** - Main SaaS application (Next.js 14+ App Router)
- **admin** - Internal admin panel for managing tenants
- **landing** - Public marketing website

### Packages
- **ui-kit** - Reusable UI components library
- **prisma** - Database schema and client
- **lib** - Shared utilities, auth config, and stores

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm 8+
- PostgreSQL database

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd liderix-monorepo
\`\`\`

2. Install dependencies
\`\`\`bash
pnpm install
\`\`\`

3. Set up environment variables
\`\`\`bash
cp .env.example .env
# Edit .env with your configuration
\`\`\`

4. Set up the database
\`\`\`bash
pnpm db:generate
pnpm db:push
\`\`\`

5. Start development servers
\`\`\`bash
# Start all apps
pnpm dev

# Or start individual apps
pnpm --filter @liderix/web dev
pnpm --filter @liderix/admin dev
pnpm --filter @liderix/landing dev
\`\`\`

## 📁 Project Structure

\`\`\`
liderix-monorepo/
├── apps/
│   ├── web/           # Main SaaS app (localhost:3000)
│   ├── admin/         # Admin panel (localhost:3001)
│   └── landing/       # Marketing site (localhost:3002)
├── packages/
│   ├── ui-kit/        # Shared UI components
│   ├── prisma/        # Database schema
│   └── lib/           # Shared utilities
└── ...config files
\`\`\`

## 🗄️ Database Schema

Multi-schema PostgreSQL setup:
- **core**: Companies, Users, Roles
- **config**: App modules, settings, integrations
- **billing**: Subscriptions, usage tracking
- **auth**: NextAuth session management

## 🎨 UI Components

Built with:
- Tailwind CSS (light theme only)
- Radix UI primitives
- Lucide React icons
- Recharts for data visualization

## 🔧 Development

### Available Scripts
- `pnpm dev` - Start all development servers
- `pnpm build` - Build all applications
- `pnpm lint` - Run linting across all packages
- `pnpm type-check` - Run TypeScript checks
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push schema changes to database

### Adding New Features
1. Create components in `packages/ui-kit`
2. Add database models to `packages/prisma/schema.prisma`
3. Implement business logic in respective apps
4. Update shared utilities in `packages/lib`

## 🚢 Deployment

Each app can be deployed independently:
- **web**: Main production application
- **admin**: Internal admin dashboard
- **landing**: Marketing website

## 📝 License

MIT License - see LICENSE file for details
