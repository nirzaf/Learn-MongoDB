# Learn MongoDB - Interactive Learning Platform

A sophisticated, interactive learning platform for MongoDB built with Next.js 15, Prisma ORM, and TailwindCSS. This platform guides users through a structured learning path from foundational concepts to expert-level mastery.

## 🚀 Project Status

**Foundation Complete!** ✅

### ✅ Completed Features

#### SETUP Phase
- **Next.js 15+ Project**: TypeScript, App Router, ESLint, Prettier configured
- **TailwindCSS Integration**: Custom MongoDB-themed design system with brand colors
- **Environment Management**: Comprehensive .env configuration for development/production
- **Component Library**: Reusable UI components with consistent styling

#### DATABASE Phase
- **Prisma ORM**: Fully configured for MongoDB with type-safe client
- **Data Models**: Complete schema for Users, Modules, Lessons, Challenges, and UserProgress
- **Database Seeding**: Automated seeding script with MongoDB Fundamentals content
- **Connection Management**: Optimized Prisma client with connection pooling

#### UI Foundation
- **Modern Design**: MongoDB-branded color scheme and typography
- **Responsive Layout**: Mobile-first design with TailwindCSS
- **Component System**: Extensible UI component library
- **Hero Landing Page**: Professional landing page showcasing platform features

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS v4 with custom theme
- **Database**: MongoDB with Prisma ORM
- **Development**: ESLint, Prettier, Turbopack
- **Utilities**: clsx, tailwind-merge for class management

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── globals.css     # Global styles with custom theme
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Landing page
│   ├── components/
│   │   └── ui/             # Reusable UI components
│   └── lib/
│       ├── prisma.ts       # Prisma client configuration
│       └── utils.ts        # Utility functions
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts            # Database seeding script
├── .env.local             # Environment variables
└── .env.example           # Environment template
```

## 🎨 Design System

### Color Palette
- **Primary**: MongoDB Green (#00ed64)
- **Secondary**: MongoDB Navy (#001e2b)
- **Accent**: MongoDB Slate (#42494f)
- **Success/Warning/Error**: Semantic colors for UI feedback

### Components
- **Button**: Multiple variants (primary, secondary, outline, ghost)
- **Typography**: Consistent heading and text styles
- **Cards**: Feature cards with hover effects
- **Layout**: Responsive grid system

## 📚 Learning Content

### Tier 1: MongoDB Fundamentals (Seeded)
1. **Introduction to MongoDB** - Core concepts and advantages
2. **Documents and Collections** - Data structure deep dive
3. **Basic CRUD Operations** - Create, Read, Update, Delete operations

*Additional tiers and advanced content ready for implementation*

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance (local or Atlas)
- npm/yarn/pnpm

### Installation

1. **Clone and install dependencies**:
```bash
git clone <repository-url>
cd Learn-MongoDB
npm install
```

2. **Environment setup**:
```bash
cp .env.example .env.local
# Edit .env.local with your MongoDB connection string
```

3. **Database setup**:
```bash
# Generate Prisma client
npx prisma generate

# Seed the database (requires MongoDB connection)
npm run db:seed
```

4. **Start development server**:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:seed` - Seed database with initial content
- `npm run db:studio` - Open Prisma Studio

## 🔧 Configuration

### Database
Configure your MongoDB connection in `.env.local`:
```env
DATABASE_URL="mongodb://localhost:27017/learn-mongodb"
SANDBOX_DATABASE_URL="mongodb://localhost:27017/learn-mongodb-sandbox"
```

### Environment Variables
See `.env.example` for all required environment variables.

## 🎯 Next Steps

The foundation is complete! Ready for:

1. **User Authentication** - NextAuth.js integration
2. **Learning Module Interface** - Browse and navigate lessons
3. **Interactive Playground** - Monaco Editor with query execution
4. **Progress Tracking** - User progress and achievements
5. **Advanced Features** - Schema visualization, challenges, collaborative features

## 🤝 Contributing

This project follows modern development practices:
- TypeScript for type safety
- ESLint + Prettier for code quality
- Conventional commits
- Component-driven development

## 📄 License

MIT License - see LICENSE file for details.
