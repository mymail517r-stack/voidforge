# 🚀 VoidForge - One-Click Deploy

## Deploy to Vercel (Easiest - 1 Click!)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmymail517r-stack%2Fvoidforge&project-name=voidforge&repository-name=voidforge&env=JWT_SECRET,ADMIN_USERNAME,ADMIN_PASSWORD,NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET&envDescription=VoidForge%20Environment%20Variables&envLink=https%3A%2F%2Fgithub.com%2Fmymail517r-stack%2Fvoidforge&demo-title=VoidForge&demo-description=Premium%20Gaming%20%26%20Creator%20Platform&demo-url=https%3A%2F%2Fvoidforge.vercel.app&stores=%5B%7B%22type%22:%22postgres%22%7D%5D)

---

## Manual Deploy Steps

### 1. Upload to GitHub
```bash
cd voidforge
git init
git add .
git commit -m "Initial VoidForge commit"
git branch -M main
git remote add origin https://github.com/mymail517r-stack/voidforge.git
git push -u origin main
```

### 2. Deploy on Vercel
- Go to https://vercel.com
- Click "Add New" → "Project"
- Import your repository
- Add environment variables
- Deploy!

---

## Environment Variables

```
JWT_SECRET=voidforge_super_secret_key_2026
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dummycloud
CLOUDINARY_API_KEY=dummykey
CLOUDINARY_API_SECRET=dummysecret
```

---

## Admin Credentials

```
Username: admin
Password: admin123
```

