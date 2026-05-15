# VoidForge - Premium Gaming & Creator Platform

A production-ready, futuristic gaming platform built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Premium UI Design**: Dark black/purple gaming theme with neon glow effects, glassmorphism cards, and smooth animations
- **Real JWT Authentication**: Cookie-based auth with middleware protection
- **Admin Dashboard**: Full admin panel with role-based access control
- **Project Management**: Upload, edit, and manage gaming resources with Cloudinary integration
- **Community Features**: Like, comment, bookmark, and share projects
- **Creator Profiles**: Beautiful creator profiles with social links and badges
- **Public Submissions**: Users can submit projects for moderation
- **Search & Filtering**: Advanced search with category filters and sorting
- **Responsive Design**: Fully mobile-responsive interface
- **Production Ready**: Vercel deployment ready, optimized images, SEO support

## 📋 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Authentication**: JWT with HTTP-only cookies
- **Storage**: Local JSON (easily upgradeable to database)
- **Image Hosting**: Cloudinary
- **Icons**: Lucide React
- **Deployment**: Vercel ready

## 🛠️ Installation

### 1. Clone and Install

```bash
cd voidforge
npm install
```

### 2. Environment Setup

Create `.env.local`:

```env
# Authentication
JWT_SECRET=voidforge_super_secret_key_2026
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Cloudinary (Sign up at cloudinary.com for free account)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Admin Access

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

Access admin panel at `/admin/login`

## 📁 Project Structure

```
voidforge/
├── app/                      # Next.js app router
│   ├── page.tsx             # Home page
│   ├── explore/             # Explore projects
│   ├── trending/            # Trending page
│   ├── team/                # Team/creators page
│   ├── project/[slug]/      # Project details
│   ├── submit/              # User submission form
│   ├── admin/               # Admin pages
│   │   ├── login/           # Admin login
│   │   ├── dashboard/       # Admin dashboard
│   │   ├── upload/          # Project upload
│   │   ├── projects/        # Manage projects
│   │   └── submissions/     # Review submissions
│   ├── api/                 # API routes
│   │   ├── auth/            # Authentication
│   │   ├── projects/        # Project CRUD
│   │   ├── submissions/     # Submission management
│   │   └── upload/          # Cloudinary upload
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── ui/                  # UI components
│   ├── layout/              # Layout components
│   └── project/             # Project components
├── lib/                     # Utilities
│   ├── auth.ts              # Auth functions
│   └── data.ts              # Data management
├── types/                   # TypeScript types
├── data/                    # JSON data storage
│   ├── projects.json
│   ├── admins.json
│   ├── creators.json
│   └── submissions.json
└── middleware.ts            # Auth middleware

```

## 🌐 Public Routes

- `/` - Home
- `/explore` - Browse projects
- `/trending` - Trending projects
- `/categories` - Browse by category
- `/team` - Meet creators
- `/submit` - Submit project
- `/project/[slug]` - Project details
- `/about` - About VoidForge
- `/contact` - Contact page
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/dmca` - DMCA notice

## 👨‍💼 Admin Routes (Protected)

- `/admin/login` - Login page
- `/admin/dashboard` - Main dashboard
- `/admin/upload` - Upload new project
- `/admin/projects` - Manage projects
- `/admin/submissions` - Review submissions

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Projects
- `GET /api/projects` - List projects (with search/filter/sort)
- `POST /api/projects` - Create project
- `GET /api/projects/[id]` - Get project details
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Submissions
- `GET /api/submissions` - List submissions
- `POST /api/submissions` - Create submission
- `PUT /api/submissions` - Update submission status

### Upload
- `POST /api/upload` - Upload image to Cloudinary

## 🎨 Customization

### Colors & Theme

Edit `app/globals.css` to customize the theme:

```css
/* Adjust gradients */
.gradient-text {
  @apply bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent;
}

/* Adjust primary colors */
/* Change purple-600 to your desired color throughout */
```

### Sample Data

Initialize with sample data by copying sample-data.json:

```bash
cp data/sample-data.json data/projects.json
cp data/sample-data.json data/admins.json
```

## 🚀 Deployment

### Vercel

1. Push to GitHub
2. Import in Vercel
3. Set environment variables
4. Deploy

### Environment Variables (Production)

```env
JWT_SECRET=your_production_secret_key
ADMIN_USERNAME=secure_username
ADMIN_PASSWORD=secure_password
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## 📦 Building for Production

```bash
npm run build
npm run start
```

## 🔒 Security Notes

1. Change default admin credentials
2. Use strong JWT_SECRET
3. Enable HTTPS in production
4. Set secure Cloudinary credentials
5. Implement rate limiting for API routes
6. Validate all user inputs

## 🤝 Contributing

Create pull requests with improvements!

## 📄 License

MIT License - Feel free to use VoidForge for commercial projects.

## 🆘 Support

For issues or questions:
- Email: support@voidforge.dev
- Discord: Join our community
- GitHub Issues: Report bugs

---

**Built with ⚡ for premium gaming creators**
