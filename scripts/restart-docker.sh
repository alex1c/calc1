#!/bin/bash
# Restart Docker container properly

echo "🔄 Restarting Docker container..."
echo ""

# Kill npm processes
echo "1️⃣ Killing npm processes..."
pkill -9 npm 2>/dev/null || true
kill -9 40678 2>/dev/null || true
sleep 2
echo "✅ Done"
echo ""

# Go to project directory
cd /var/www/calc1.ru || { echo "❌ Cannot access /var/www/calc1.ru"; exit 1; }

# Stop any running containers
echo "2️⃣ Stopping containers..."
docker compose down 2>/dev/null || docker-compose down 2>/dev/null || true
sleep 3
echo "✅ Done"
echo ""

# Check if port 3001 is free
echo "3️⃣ Checking port 3001..."
if netstat -tuln 2>/dev/null | grep -q ':3001 ' || ss -tuln 2>/dev/null | grep -q ':3001 '; then
    echo "⚠️  Port 3001 is still in use, killing processes..."
    lsof -ti:3001 | xargs kill -9 2>/dev/null || fuser -k 3001/tcp 2>/dev/null || true
    sleep 2
else
    echo "✅ Port 3001 is free"
fi
echo ""

# Start containers
echo "4️⃣ Starting Docker containers..."
docker compose up -d 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Containers started"
else
    echo "❌ Failed to start containers"
    exit 1
fi
echo ""

# Wait for container to start
echo "5️⃣ Waiting for container to start (30 seconds)..."
sleep 30
echo ""

# Check container status
echo "6️⃣ Checking container status..."
docker compose ps
echo ""

# Check container logs
echo "7️⃣ Checking container logs (last 30 lines)..."
docker compose logs --tail=30 calc1 2>/dev/null || docker-compose logs --tail=30 calc1 2>/dev/null
echo ""

# Test application
echo "8️⃣ Testing application..."
MAX_ATTEMPTS=10
for i in $(seq 1 $MAX_ATTEMPTS); do
    if curl -f -s http://localhost:3001 > /dev/null 2>&1; then
        echo "✅ Application responds on http://localhost:3001"
        curl -I http://localhost:3001 2>&1 | head -5
        exit 0
    fi
    echo "⏳ Attempt $i/$MAX_ATTEMPTS: Waiting 5 seconds..."
    sleep 5
done

echo "❌ Application did not start after $((MAX_ATTEMPTS * 5)) seconds"
echo "Container logs:"
docker compose logs --tail=50 calc1 2>/dev/null || docker-compose logs --tail=50 calc1 2>/dev/null
exit 1

