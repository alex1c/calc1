#!/bin/bash

# Deployment script for calc1.ru
# This script should be run on the server

set -e

PROJECT_DIR="/var/www/calc1.ru"
CONTAINER_NAME="calc1-app"

echo "🚀 Starting deployment..."

# Navigate to project directory
cd "$PROJECT_DIR"

# Pull latest changes from GitHub
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# Stop and remove old container
echo "🛑 Stopping old container..."
docker-compose down || true

# Build new image
echo "🔨 Building new Docker image..."
docker-compose build --no-cache

# Start new container
echo "▶️  Starting new container..."
docker-compose up -d

# Wait for container to be healthy
echo "⏳ Waiting for container to be ready..."
sleep 10

# Check if container is running
if docker ps | grep -q "$CONTAINER_NAME"; then
	echo "✅ Container is running"
else
	echo "❌ Container failed to start"
	docker-compose logs
	exit 1
fi

# Clean up old images
echo "🧹 Cleaning up old Docker images..."
docker system prune -f

# Show container status
echo "📊 Container status:"
docker-compose ps

echo "✅ Deployment completed successfully!"

