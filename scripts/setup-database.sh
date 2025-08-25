#!/bin/bash

echo "🗄️ Elite Fitness Pro - Database Setup"
echo "======================================"

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL environment variable is not set"
    echo "Please set it in your .env file or environment"
    exit 1
fi

echo "✅ DATABASE_URL found"

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

if [ $? -eq 0 ]; then
    echo "✅ Prisma client generated successfully"
else
    echo "❌ Failed to generate Prisma client"
    exit 1
fi

# Push schema to database
echo "🚀 Pushing schema to database..."
npx prisma db push

if [ $? -eq 0 ]; then
    echo "✅ Database schema pushed successfully"
else
    echo "❌ Failed to push schema to database"
    exit 1
fi

echo ""
echo "🎉 Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Set DATABASE_URL in Vercel dashboard"
echo "2. Deploy your app: git push origin main"
echo "3. Test the database integration"
echo ""
echo "Optional: Run 'npx prisma studio' to view your database"
