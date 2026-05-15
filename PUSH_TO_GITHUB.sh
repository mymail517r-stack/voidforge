#!/bin/bash

# VoidForge - Push to GitHub Script
# This script will push your VoidForge project to GitHub

set -e

echo "🚀 VoidForge GitHub Upload"
echo "=========================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git is not initialized. Please run: git init"
    exit 1
fi

# Ask for GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ GitHub username cannot be empty"
    exit 1
fi

REPO_URL="https://github.com/$GITHUB_USERNAME/voidforge.git"

echo ""
echo "📋 Configuration:"
echo "   GitHub Username: $GITHUB_USERNAME"
echo "   Repository URL: $REPO_URL"
echo ""

# Check if remote already exists
if git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  Remote origin already exists"
    read -p "Do you want to replace it? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote remove origin
        echo "✓ Removed existing remote"
    else
        echo "Cancelled"
        exit 1
    fi
fi

echo ""
echo "🔗 Adding remote repository..."
git remote add origin "$REPO_URL"
echo "✓ Remote added"

echo ""
echo "📌 Renaming branch to 'main'..."
git branch -M main
echo "✓ Branch renamed to main"

echo ""
echo "📤 Pushing to GitHub..."
echo "Note: You may be prompted for authentication"
echo "If asked for password, use a Personal Access Token from GitHub"
echo ""

if git push -u origin main; then
    echo ""
    echo "✅ SUCCESS! VoidForge is now on GitHub!"
    echo ""
    echo "📊 Repository Details:"
    echo "   URL: $REPO_URL"
    echo "   Website: https://github.com/$GITHUB_USERNAME/voidforge"
    echo ""
    echo "🚀 Next Steps:"
    echo "   1. Go to https://vercel.com"
    echo "   2. Sign up with GitHub"
    echo "   3. Import your voidforge repository"
    echo "   4. Add environment variables"
    echo "   5. Deploy!"
    echo ""
    echo "Your app will be live at: https://voidforge.vercel.app"
else
    echo ""
    echo "❌ Push failed. Common issues:"
    echo "   - Repository already exists on GitHub"
    echo "   - Authentication failed (try Personal Access Token)"
    echo "   - Network error"
    echo ""
    echo "💡 Troubleshooting:"
    echo "   1. Create repository at: https://github.com/new"
    echo "   2. Make sure it's named 'voidforge'"
    echo "   3. Make sure it's PUBLIC"
    echo "   4. Try again"
    exit 1
fi
