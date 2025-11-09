#!/bin/bash
# Kill stuck Node.js processes and PM2

echo "🔪 Killing stuck processes..."
echo ""

# Kill the stuck Node.js process (PID 29382 or any other)
echo "1️⃣ Killing stuck Node.js processes..."
pkill -9 -f "node.*62.2g" 2>/dev/null || true
kill -9 29382 2>/dev/null || true
# Kill all Node.js processes outside Docker
ps aux | grep node | grep -v grep | grep -v docker | awk '{print $2}' | xargs kill -9 2>/dev/null || true
sleep 2
echo "✅ Done"
echo ""

# Stop PM2 if running
echo "2️⃣ Stopping PM2..."
pm2 stop all 2>/dev/null || true
pm2 kill 2>/dev/null || true
systemctl stop pm2-root 2>/dev/null || true
systemctl disable pm2-root 2>/dev/null || true
echo "✅ Done"
echo ""

# Check what's left
echo "3️⃣ Checking remaining Node.js processes..."
ps aux | grep -E "node|PM2" | grep -v grep
echo ""

# Check Docker container
echo "4️⃣ Checking Docker container status..."
cd /var/www/calc1.ru
docker compose ps
echo ""

# Check if application responds
echo "5️⃣ Testing application..."
if curl -f -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Application responds"
else
    echo "❌ Application does NOT respond"
fi
echo ""

# Check system load
echo "6️⃣ Current system load:"
uptime
echo ""

echo "✅ Process cleanup complete!"

