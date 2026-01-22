#!/bin/bash

# RSYWX SvelteKit Production Deployment Script

echo "🚀 Starting RSYWX SvelteKit deployment..."

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "❌ PM2 is not installed. Installing PM2..."
    npm install -g pm2
fi

# Stop existing PM2 processes
echo "🛑 Stopping existing PM2 processes..."
pm2 stop rsywx-svelte 2>/dev/null || echo "No existing process to stop"
pm2 delete rsywx-svelte 2>/dev/null || echo "No existing process to delete"

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Start with PM2
echo "🚀 Starting application with PM2..."
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
echo "💾 Saving PM2 configuration..."
pm2 save

# Setup PM2 startup script (run once)
echo "⚙️  Setting up PM2 startup script..."
pm2 startup

echo "✅ Deployment complete!"
echo "📊 Check status with: pm2 status"
echo "📝 View logs with: pm2 logs rsywx-svelte"
echo "🔄 Restart with: pm2 restart rsywx-svelte"