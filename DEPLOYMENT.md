# VoidForge Deployment Guide

## 🚀 Quick Start (Local Development)

```bash
cd voidforge
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Admin Login:**
- Username: `admin`
- Password: `admin123`

---

## 🌐 Vercel Deployment (Recommended)

VoidForge is optimized for Vercel deployment. Follow these steps:

### Step 1: Prepare Repository

```bash
git init
git add .
git commit -m "Initial VoidForge commit"
git push origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Select your GitHub repository
4. Click "Import"

### Step 3: Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

```
JWT_SECRET=your_production_secret_key_here
ADMIN_USERNAME=secure_admin_username
ADMIN_PASSWORD=secure_admin_password
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_APP_URL=https://yourdomain.vercel.app
```

### Step 4: Deploy

Click "Deploy" and Vercel will automatically build and deploy your application.

---

## 🖥️ Self-Hosted Deployment (Docker)

### Step 1: Create Dockerfile

```dockerfile
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY .next ./
COPY public ./public
COPY .env.production .env.production

EXPOSE 3000
CMD ["npm", "start"]
```

### Step 2: Build Production

```bash
npm run build
```

### Step 3: Create .env.production

```env
JWT_SECRET=your_production_secret
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_password
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Step 4: Build and Run Docker Image

```bash
docker build -t voidforge:latest .
docker run -d -p 3000:3000 --env-file .env.production voidforge:latest
```

---

## ☁️ AWS Deployment

### Option 1: AWS Amplify

1. Connect GitHub repository
2. Set build settings:
   ```
   Build command: npm run build
   Start command: npm start
   ```
3. Add environment variables in Amplify Console
4. Deploy

### Option 2: AWS EC2

1. Launch Ubuntu 22.04 EC2 instance
2. Install Node.js 18+:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. Clone repository and setup:
   ```bash
   git clone your-repo.git
   cd voidforge
   npm install
   npm run build
   ```

4. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start npm --name "voidforge" -- start
   pm2 save
   pm2 startup
   ```

5. Setup Nginx reverse proxy:
   ```nginx
   server {
     listen 80;
     server_name yourdomain.com;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

---

## 🔧 Cloudinary Setup

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard and copy:
   - Cloud Name
   - API Key
   - API Secret
3. Add to `.env.local` or `.env.production`

**Note:** Free tier includes 25 GB of storage and 25 GB of bandwidth per month.

---

## 📊 Database Migration (Optional)

To upgrade from JSON storage to a database:

### PostgreSQL Setup

1. Update `/lib/data.ts` to use database queries
2. Update API routes to use database calls
3. Create migration scripts for JSON → database

Example PostgreSQL functions:

```sql
CREATE TABLE projects (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  content TEXT,
  thumbnail VARCHAR(255),
  category VARCHAR(100),
  views INTEGER DEFAULT 0,
  downloads INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  verified BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admins (
  id VARCHAR(255) PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'Editor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Update `/lib/data.ts`:

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getProjects(): Promise<Project[]> {
  const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
  return result.rows;
}
```

---

## 🔒 Security Checklist

- [ ] Change default admin credentials
- [ ] Use strong JWT_SECRET (min 32 characters)
- [ ] Enable HTTPS (mandatory for production)
- [ ] Set secure cookie flags
- [ ] Implement rate limiting
- [ ] Add CORS configuration
- [ ] Validate all user inputs
- [ ] Sanitize database queries
- [ ] Use environment variables (never commit secrets)
- [ ] Enable WAF on Cloudflare/AWS
- [ ] Regular security audits
- [ ] Backup data regularly

---

## 📈 Performance Optimization

### 1. Enable Caching

```javascript
// next.config.js
const nextConfig = {
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
      {
        source: '/api/projects:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
    ];
  },
};
```

### 2. Image Optimization

VoidForge uses Next.js Image component with:
- Automatic WebP conversion
- Responsive images
- Lazy loading
- Blur placeholder support

### 3. Database Indexing

```sql
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_admins_username ON admins(username);
```

---

## 📊 Monitoring & Analytics

### 1. Vercel Analytics

Automatically enabled on Vercel. View at: Vercel Dashboard → Analytics

### 2. Cloudinary Analytics

Dashboard → Reports for image metrics

### 3. Custom Analytics

Add to `/lib/analytics.ts`:

```typescript
export async function logEvent(event: string, data: any) {
  // Log to your analytics service
  console.log(`[${new Date().toISOString()}] ${event}:`, data);
}
```

---

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use

```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>
```

### Authentication Issues

- Clear cookies: `Application → Cookies → Delete vf_token`
- Check `.env.local` has correct JWT_SECRET
- Verify admin credentials match ADMIN_USERNAME/PASSWORD

### Image Upload Failures

- Verify Cloudinary credentials
- Check cloud name format
- Ensure API key/secret are correct
- Check file size limits

---

## 📞 Support

- **Documentation**: See README.md
- **Issues**: GitHub Issues
- **Email**: support@voidforge.dev
- **Discord**: Join our community

---

## 🎯 Roadmap

- [ ] Database migration (PostgreSQL/MongoDB)
- [ ] Payment system (Stripe)
- [ ] Creator monetization
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] API marketplace
- [ ] Advanced moderation
- [ ] Multi-language support

---

**Last Updated:** May 15, 2026
**VoidForge Version:** 1.0.0
