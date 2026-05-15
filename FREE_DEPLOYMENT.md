# 🆓 VoidForge - Free Deployment Guide

Deploy VoidForge **completely free** using these options!

---

## 🥇 Option 1: Vercel (RECOMMENDED - Easiest Free Option)

**Best for:** Zero configuration, automatic deployments, generous free tier

### Why Vercel?
- ✅ Free tier includes unlimited deployments
- ✅ 100GB bandwidth/month free
- ✅ Auto-deploys on git push
- ✅ Free SSL/HTTPS
- ✅ Serverless functions included
- ✅ Perfect for Next.js

### Step 1: Create GitHub Repository

```bash
cd /workspace/voidforge
git init
git add .
git commit -m "Initial VoidForge commit"
```

### Step 2: Push to GitHub

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/voidforge.git
git push -u origin main
```

### Step 3: Deploy on Vercel

1. Go to **[vercel.com](https://vercel.com)**
2. Click **"Sign Up"** → Choose **"Continue with GitHub"**
3. Authorize Vercel
4. Click **"Add New"** → **"Project"**
5. Select your **voidforge** repository
6. Click **"Import"**

### Step 4: Add Environment Variables

In Vercel Dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add these variables:

```
JWT_SECRET=voidforge_super_secret_key_2026_FREE_DEPLOY
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dummycloud
CLOUDINARY_API_KEY=dummykey
CLOUDINARY_API_SECRET=dummysecret
NEXT_PUBLIC_APP_URL=https://YOUR_PROJECT_NAME.vercel.app
```

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your app is live! 🎉

**Your URL:** `https://voidforge.vercel.app`

---

## 🥈 Option 2: Railway (Free Tier Available)

**Best for:** Easy self-hosting feel, 500 hours/month free

### Step 1: Create Railway Account

1. Go to **[railway.app](https://railway.app)**
2. Click **"Start Project"**
3. Choose **"GitHub"** and authorize
4. Select your voidforge repository

### Step 2: Add Environment Variables

1. Go to **Variables**
2. Add the same `.env` variables as above

### Step 3: Deploy

Click **"Deploy"** and Railway handles everything!

**Free Tier:** 500 hours/month (plenty for personal use)

---

## 🥉 Option 3: Netlify (Alternative Free Option)

**Best for:** Global CDN, generous free tier

### Step 1: Create Netlify Account

1. Go to **[netlify.com](https://netlify.com)**
2. Click **"Sign up"** → **"GitHub"**
3. Authorize Netlify

### Step 2: New Site from Git

1. Click **"Add new site"** → **"Import an existing project"**
2. Select GitHub
3. Choose your voidforge repository

### Step 3: Build Settings

Set these build settings:
```
Build command: npm run build
Publish directory: .next
```

### Step 4: Environment Variables

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Add your `.env` variables

### Step 5: Deploy

Netlify auto-deploys!

---

## 💻 Option 4: Heroku (Free Tier Removed - But Still Options)

**Note:** Heroku removed free tier in Nov 2022.

**Alternative:**
- Use Railway (Option 2) instead - very similar experience
- Free 500 hours/month

---

## 🐳 Option 5: Docker + Fly.io (Free Tier)

**Best for:** Docker enthusiasts, more control

### Step 1: Install Fly CLI

```bash
curl -L https://fly.io/install.sh | sh
```

### Step 2: Create Fly App

```bash
cd /workspace/voidforge
fly launch
```

Choose:
- App name: `voidforge`
- Region: Choose closest to you
- Postgres: No (we use JSON)
- Redis: No

### Step 3: Create Dockerfile

```dockerfile
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY .next ./
COPY public ./public

EXPOSE 3000
CMD ["npm", "start"]
```

### Step 4: Set Secrets

```bash
fly secrets set JWT_SECRET=your_secret_key
fly secrets set ADMIN_USERNAME=admin
fly secrets set ADMIN_PASSWORD=admin123
fly secrets set NEXT_PUBLIC_APP_URL=https://voidforge.fly.dev
```

### Step 5: Deploy

```bash
fly deploy
```

**Free Tier:** 3 shared-cpu VMs with 3GB storage

---

## ⚡ Option 6: Replit (Easiest for Beginners)

**Best for:** Quick testing, no setup needed

### Step 1: Go to Replit

1. Visit **[replit.com](https://replit.com)**
2. Click **"Create"**
3. Choose **"Import from GitHub"**
4. Paste your voidforge GitHub URL

### Step 2: Add Secrets

Click **Secrets** (lock icon) and add:
```
JWT_SECRET=voidforge_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Step 3: Run

Click **"Run"** button - app starts instantly!

**Pros:** No setup, instant preview
**Cons:** Limited RAM, slower for production

---

## 🌐 Option 7: Oracle Cloud (Free Tier - 4GB RAM)

**Best for:** More powerful free option

### Step 1: Create Oracle Account

1. Go to **[oracle.com/cloud/free](https://oracle.com/cloud/free)**
2. Sign up for **Always Free** tier
3. Create Ubuntu VM (4GB RAM free forever!)

### Step 2: SSH into Server

```bash
ssh -i your-key.key ubuntu@your-instance-ip
```

### Step 3: Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs git
```

### Step 4: Clone VoidForge

```bash
git clone https://github.com/YOUR_USERNAME/voidforge.git
cd voidforge
npm install
npm run build
```

### Step 5: Install PM2

```bash
sudo npm install -g pm2
pm2 start npm --name "voidforge" -- start
pm2 save
pm2 startup
```

### Step 6: Setup Nginx

```bash
sudo apt-get install -y nginx
```

Create `/etc/nginx/sites-available/voidforge`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

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

Enable it:
```bash
sudo ln -s /etc/nginx/sites-available/voidforge /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**Free:** 4GB RAM, 200GB storage, unlimited bandwidth

---

## 📊 Comparison Table

| Option | Cost | Setup | Performance | Best For |
|--------|------|-------|-------------|----------|
| **Vercel** ⭐ | Free | 5 min | Excellent | Easiest option |
| **Railway** | Free | 10 min | Great | Self-hosted feel |
| **Netlify** | Free | 10 min | Great | Global CDN |
| **Fly.io** | Free | 15 min | Good | Docker users |
| **Replit** | Free | 2 min | Fair | Quick testing |
| **Oracle Cloud** | Free | 30 min | Great | Powerful |

---

## ⚠️ Important Notes for Free Deployment

### 1. Cloudinary Free Account

For image uploads, sign up free at [cloudinary.com](https://cloudinary.com):
- ✅ Free 25GB storage
- ✅ Free 25GB bandwidth/month
- ✅ Unlimited uploads
- ✅ Easy integration

```bash
# Add to your .env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 2. Custom Domain (Free)

**Option A: Free Subdomain**
- Vercel: `voidforge.vercel.app` (included)
- Railway: `voidforge.up.railway.app` (included)
- Fly.io: `voidforge.fly.dev` (included)

**Option B: Custom Domain (Free)**
- Get free domain at [freenom.com](https://freenom.com)
- Point to your Vercel/Railway via DNS

### 3. SSL Certificate (Free)

All free options include **free SSL/HTTPS** automatically ✅

### 4. Database (Optional, Free)

When ready to upgrade from JSON:
- **MongoDB Atlas:** Free 512MB tier
- **PlanetScale:** Free MySQL tier
- **Supabase:** Free PostgreSQL tier

---

## 🚀 Quick Start: Vercel (Recommended)

```bash
# 1. Create GitHub repo
cd /workspace/voidforge
git init
git add .
git commit -m "VoidForge initial commit"

# 2. Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/voidforge.git
git push -u origin main

# 3. Go to vercel.com
# - Sign up with GitHub
# - Import repository
# - Add environment variables
# - Deploy!

# Done! 🎉
# Your app is live at: https://voidforge.vercel.app
```

---

## 💰 Upgrade When Needed

All free options allow easy upgrades:

**Vercel Paid:** $20/month for Pro features
**Railway Paid:** Pay per usage (~$5-50/month)
**Netlify Paid:** $19/month for Pro
**Fly.io Paid:** Pay per usage

---

## 🆘 Troubleshooting Free Deployment

### App Won't Deploy

**Check:**
1. `.env` variables set correctly
2. No build errors: `npm run build`
3. Package.json includes all dependencies

### Images Not Loading

1. Set up Cloudinary account (free)
2. Add API keys to environment variables
3. Restart deployment

### Slow Performance

- Free tier can be slower
- Upgrade to paid for better performance
- Or use multiple options simultaneously

### Need Custom Domain

1. Get free domain: [freenom.com](https://freenom.com)
2. Point DNS to your deployment
3. Enable custom domain in hosting dashboard

---

## 📈 Scaling from Free to Production

### Phase 1: Testing (FREE)
- Deploy on Vercel free tier
- Use Cloudinary free tier
- Test all features

### Phase 2: Small Scale (≈$5-10/month)
- Keep Vercel free or go Pro
- Upgrade Cloudinary as needed
- Add custom domain

### Phase 3: Production (≈$20-50/month)
- Vercel Pro ($20/month)
- Upgrade database if needed
- Enhanced monitoring

---

## 🎯 My Recommendation

**For you:** Use **Vercel** (Option 1)

### Why?
1. **Easiest:** 5-minute setup
2. **Best for Next.js:** Perfect integration
3. **Free tier is great:** 100GB bandwidth/month
4. **Auto-deploy:** Push to GitHub → live
5. **Professional:** Used by major companies
6. **Can scale:** Easy upgrade path

### Steps (5 minutes):
1. Push to GitHub
2. Sign up on vercel.com with GitHub
3. Import repository
4. Add env variables
5. Click Deploy

**Done!** Your app is live. 🎉

---

## 📚 Additional Resources

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Free Tier Comparison:** https://www.freecodecamp.org/news/free-tier-hosting
- **Cloudinary Free:** https://cloudinary.com/pricing

---

**Total Cost to Deploy VoidForge: $0 (FREE!)** ✅

Deploy now and start building! 🚀
