#!/bin/bash

echo "🚀 Elite Fitness Pro - GitHub Setup"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Initializing..."
    git init
    git add .
    git commit -m "Initial commit - Elite Fitness Pro with complete database integration"
fi

echo ""
echo "📋 Current git status:"
git status --short

echo ""
echo "📦 Recent commits:"
git log --oneline -5

echo ""
echo "🔗 Current remotes:"
git remote -v

echo ""
echo "📝 To connect to GitHub:"
echo "1. Create a new repository on GitHub.com"
echo "2. Copy the repository URL (https://github.com/username/repo-name.git)"
echo "3. Run these commands:"
echo ""
echo "   git remote add origin YOUR_GITHUB_URL"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "🎯 Example:"
echo "   git remote add origin https://github.com/yourusername/elite-fitness-app.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "✅ After pushing to GitHub, Vercel will automatically deploy!"
