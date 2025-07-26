# MongoDB Learning Platform - Complete Guide

## 🎉 Platform Overview

A comprehensive, interactive MongoDB learning platform built with Next.js 15, TypeScript, and MongoDB Atlas. The platform provides a structured learning experience with progress tracking, rich content rendering, and modern UI/UX.

## ✨ Key Features

### 🎓 Learning Experience
- **Structured Curriculum**: Organized by tiers and difficulty levels
- **Rich Content**: Markdown-based lessons with syntax highlighting
- **Progress Tracking**: Local storage-based progress for anonymous users
- **Reading Time**: Estimated reading time for each lesson
- **Table of Contents**: Auto-generated TOC for longer lessons
- **Keyboard Navigation**: Arrow keys for lesson navigation, Ctrl+C to mark complete

### 🎨 User Interface
- **Modern Design**: MongoDB-branded color scheme and typography
- **Responsive Layout**: Mobile-first design with TailwindCSS v4
- **Interactive Sidebar**: Module/lesson navigation with completion status
- **Progress Dashboard**: Visual progress tracking with completion percentages
- **Smooth Navigation**: Client-side routing with loading states

### 🛠 Technical Excellence
- **Next.js 15**: Latest features with App Router and Turbopack
- **TypeScript**: Full type safety throughout the application
- **MongoDB Atlas**: Cloud database with optimized queries
- **Prisma ORM**: Type-safe database operations
- **Server-Side Rendering**: Optimized for performance and SEO

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/nirzaf/Learn-MongoDB.git
cd Learn-MongoDB

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your MongoDB Atlas connection strings

# Seed the database
npm run db:seed

# Start development server
npm run dev
```

### Environment Variables
```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/learn-mongodb
SANDBOX_DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/learn-mongodb-sandbox
```

## 📚 Content Structure

### Database Schema
- **Modules**: Learning modules organized by tier (1-4)
- **Lessons**: Individual lessons with markdown content
- **Challenges**: Interactive coding challenges (future feature)
- **UserProgress**: Progress tracking (future feature)

### Current Content
1. **MongoDB Fundamentals** (Tier 1)
   - Introduction to MongoDB
   - Documents and Collections
   - Basic CRUD Operations

## 🎯 Usage Guide

### For Learners
1. Visit the homepage at `http://localhost:3000`
2. Click "Start Learning" to begin
3. Navigate through lessons using the sidebar or keyboard shortcuts
4. Mark lessons as complete to track progress
5. Use the table of contents for longer lessons

### For Developers
1. Add new content by updating the seed script in `prisma/seed.ts`
2. Customize the UI by modifying components in `src/components/`
3. Add new features by extending the API routes in `src/app/api/`

## 🔧 API Endpoints

### GET /api/modules
Returns all modules with their lessons
```json
[
  {
    "id": "...",
    "title": "MongoDB Fundamentals",
    "description": "...",
    "tier": 1,
    "lessons": [...]
  }
]
```

### GET /api/lessons/[id]
Returns a specific lesson with full content
```json
{
  "id": "...",
  "title": "Introduction to MongoDB",
  "content": "# Introduction...",
  "module": {...},
  "challenges": [...]
}
```

## 🎨 Customization

### Theming
The platform uses a MongoDB-inspired color scheme defined in `src/app/globals.css`:
- Primary: MongoDB Green (#00ED64)
- Secondary: MongoDB Dark Green (#00684A)
- Background: Clean whites and grays

### Adding Content
1. Update `prisma/seed.ts` with new modules/lessons
2. Run `npm run db:seed` to update the database
3. Content supports full Markdown with code syntax highlighting

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The platform is compatible with any Node.js hosting platform that supports:
- Next.js 15
- MongoDB connections
- Environment variables

## 🔮 Future Enhancements

### Interactive Code Playground
- Monaco Editor integration
- Real-time MongoDB query execution
- Query result visualization
- Sandbox database for safe experimentation

### Advanced Features
- User authentication and profiles
- Community features and discussions
- Advanced MongoDB topics (Aggregation, Indexing, etc.)
- Certificate generation
- Mobile app companion

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- MongoDB for the excellent database and documentation
- Next.js team for the amazing framework
- Prisma for the type-safe ORM
- TailwindCSS for the utility-first CSS framework

---

**Ready to learn MongoDB?** 🚀 Visit `http://localhost:3000` and start your journey!
