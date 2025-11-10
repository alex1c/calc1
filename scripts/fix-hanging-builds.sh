#!/bin/bash
# Script to fix hanging Next.js build processes and restart container

set -e

PROJECT_DIR="/var/www/calc1.ru"
DOCKER_COMPOSE_CMD="docker compose"

echo "🔧 Fixing hanging build processes..."
echo "===================================="

# 1. Kill all hanging Next.js build processes (both on host and in containers)
echo "1️⃣ Killing hanging Next.js build processes..."
# Kill processes on host
pkill -9 -f "node.*next" 2>/dev/null || true
pkill -9 -f "next build" 2>/dev/null || true
pkill -9 -f "node.*app/node_modules.*next" 2>/dev/null || true
pkill -9 -f "npm.*build" 2>/dev/null || true
# Kill processes in Docker containers (remove -it for non-interactive mode)
docker ps -q | xargs -r -I {} docker exec {} pkill -9 -f "next" 2>/dev/null || true
sleep 2
echo "✅ Done"

# 2. Check for remaining processes
echo "2️⃣ Checking for remaining build processes..."
BUILD_PROCS=$(ps aux | grep -E "next|build" | grep -v grep | grep -v docker | wc -l)
if [ "$BUILD_PROCS" -gt 0 ]; then
    echo "⚠️  Found $BUILD_PROCS remaining processes:"
    ps aux | grep -E "next|build" | grep -v grep | grep -v docker || true
    echo "Killing them..."
    ps aux | grep -E "next|build" | grep -v grep | grep -v docker | awk '{print $2}' | xargs kill -9 2>/dev/null || true
    sleep 2
fi
echo "✅ Done"

# 3. Navigate to project directory
cd "$PROJECT_DIR" || { echo "Error: Directory $PROJECT_DIR not found."; exit 1; }

# 4. Stop Docker containers
echo "3️⃣ Stopping Docker containers..."
$DOCKER_COMPOSE_CMD down 2>/dev/null || docker-compose down 2>/dev/null || true
sleep 3
echo "✅ Done"

# 5. Clean up any stuck Docker build processes
echo "4️⃣ Cleaning up Docker build processes..."
docker ps -a | grep -E "build|calc1" | awk '{print $1}' | xargs docker rm -f 2>/dev/null || true
docker system prune -f 2>/dev/null || true
echo "✅ Done"

# 6. Check system load
echo "5️⃣ Current system load:"
uptime
echo ""

# 7. Check CPU usage
echo "6️⃣ Top CPU processes:"
top -bn1 | head -15
echo ""

# 8. Start containers fresh
echo "7️⃣ Starting Docker containers..."
$DOCKER_COMPOSE_CMD up -d || docker-compose up -d || { echo "Failed to start containers."; exit 1; }
echo "✅ Containers started"

# 9. Wait for container to be ready
echo "8️⃣ Waiting for container to be ready (30 seconds)..."
sleep 30

# 10. Check container status
echo "9️⃣ Checking container status..."
$DOCKER_COMPOSE_CMD ps || docker-compose ps || true
echo ""

# 11. Check container logs
echo "🔟 Checking container logs (last 30 lines)..."
$DOCKER_COMPOSE_CMD logs --tail=30 calc1 2>/dev/null || docker-compose logs --tail=30 calc1 2>/dev/null || true
echo ""

# 12. Test application
echo "1️⃣1️⃣ Testing application on port 3001..."
if curl -f -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Application responds on http://localhost:3001"
    curl -I http://localhost:3001 2>&1 | head -5
else
    echo "❌ Application does NOT respond on http://localhost:3001"
    echo "Checking container logs for errors..."
    $DOCKER_COMPOSE_CMD logs --tail=50 calc1 2>/dev/null || docker-compose logs --tail=50 calc1 2>/dev/null || true
fi

echo ""
echo "===================================="
echo "✅ Fix script completed"
echo ""
echo "💡 If issues persist:"
echo "   1. Check logs: $DOCKER_COMPOSE_CMD logs -f calc1"
echo "   2. Check processes: ps aux | grep next"
echo "   3. Check system load: top"

