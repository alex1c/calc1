#!/bin/bash

# Webhook deployment script
# This script can be called by GitHub webhook or manually
# Make sure to set proper permissions: chmod +x scripts/webhook-deploy.sh

set -e

PROJECT_DIR="/var/www/calc1.ru"
LOG_FILE="/var/log/calc1-deploy.log"

# Log function
log() {
	echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "🚀 Starting deployment via webhook..."

# Navigate to project directory
cd "$PROJECT_DIR" || {
	log "❌ Failed to navigate to $PROJECT_DIR"
	exit 1
}

# Pull latest changes
log "📥 Pulling latest changes..."
git pull origin main || {
	log "❌ Failed to pull changes"
	exit 1
}

# Rebuild and restart container
log "🔨 Rebuilding container..."
docker-compose down || true
docker-compose build --no-cache || {
	log "❌ Failed to build container"
	exit 1
}

docker-compose up -d || {
	log "❌ Failed to start container"
	exit 1
}

# Wait and verify
sleep 10
if docker ps | grep -q "calc1-app"; then
	log "✅ Deployment successful"
else
	log "❌ Container failed to start"
	docker-compose logs >> "$LOG_FILE"
	exit 1
fi

# Cleanup
docker system prune -f

log "✅ Deployment completed"

