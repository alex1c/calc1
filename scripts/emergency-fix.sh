#!/bin/bash
# Emergency fix script for calc1.ru server issues

echo "🚨 Emergency Diagnostic and Fix Script"
echo "========================================"
echo ""

# Check system resources
echo "1️⃣ Checking system resources..."
echo "CPU Load:"
uptime
echo ""
echo "Memory usage:"
free -h
echo ""
echo "Disk usage:"
df -h / | tail -1
echo ""

# Check Docker containers
echo "2️⃣ Checking Docker containers..."
docker ps -a | grep calc1 || echo "No calc1 containers found"
echo ""

# Check if containers are consuming resources
echo "3️⃣ Checking Docker resource usage..."
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}" 2>/dev/null | head -5
echo ""

# Stop all calc1 containers
echo "4️⃣ Stopping all calc1 containers..."
cd /var/www/calc1.ru 2>/dev/null || { echo "Cannot access /var/www/calc1.ru"; exit 1; }
docker compose down 2>/dev/null || docker-compose down 2>/dev/null || true
echo "Containers stopped"
echo ""

# Check Apache status
echo "5️⃣ Checking Apache status..."
systemctl status apache2 --no-pager -l | head -20
echo ""

# Check if Apache is consuming resources
echo "6️⃣ Checking Apache processes..."
ps aux | grep apache2 | grep -v grep | head -5
echo "Apache processes count: $(ps aux | grep apache2 | grep -v grep | wc -l)"
echo ""

# Check port 3001
echo "7️⃣ Checking port 3001..."
if netstat -tuln 2>/dev/null | grep -q ':3001 ' || ss -tuln 2>/dev/null | grep -q ':3001 '; then
    echo "⚠️  Port 3001 is still in use:"
    netstat -tuln 2>/dev/null | grep ':3001 ' || ss -tuln 2>/dev/null | grep ':3001 '
    echo "Killing processes on port 3001..."
    lsof -ti:3001 | xargs kill -9 2>/dev/null || fuser -k 3001/tcp 2>/dev/null || true
    sleep 2
else
    echo "✅ Port 3001 is free"
fi
echo ""

# Clean up Docker
echo "8️⃣ Cleaning up Docker..."
docker system prune -f 2>/dev/null || true
echo ""

# Check for stuck processes
echo "9️⃣ Checking for stuck Node.js processes..."
ps aux | grep node | grep -v grep
if [ $? -eq 0 ]; then
    echo "⚠️  Found Node.js processes, killing them..."
    pkill -9 node 2>/dev/null || true
    sleep 2
fi
echo ""

# Restart Docker service if needed
echo "🔟 Checking Docker service..."
if ! systemctl is-active --quiet docker; then
    echo "⚠️  Docker service is not active, starting..."
    systemctl start docker
    sleep 3
fi
echo ""

# Start containers with limited resources
echo "1️⃣1️⃣ Starting containers with resource limits..."
cd /var/www/calc1.ru
docker compose up -d 2>&1 | tail -10
echo ""

# Wait a bit
echo "⏳ Waiting 10 seconds for containers to start..."
sleep 10

# Check container status
echo "1️⃣2️⃣ Checking container status..."
docker compose ps || docker-compose ps
echo ""

# Check if application responds
echo "1️⃣3️⃣ Testing application..."
if curl -f -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Application responds on localhost:3001"
else
    echo "❌ Application does NOT respond"
    echo "Container logs:"
    docker compose logs --tail=30 calc1 2>/dev/null || docker-compose logs --tail=30 calc1 2>/dev/null
fi
echo ""

# Check Apache configuration
echo "1️⃣4️⃣ Checking Apache configuration..."
if sudo apache2ctl configtest 2>&1 | grep -q "Syntax OK"; then
    echo "✅ Apache configuration is valid"
else
    echo "❌ Apache configuration has errors:"
    sudo apache2ctl configtest 2>&1
fi
echo ""

# Restart Apache if needed
echo "1️⃣5️⃣ Restarting Apache..."
sudo systemctl restart apache2
sleep 3
if systemctl is-active --quiet apache2; then
    echo "✅ Apache is running"
else
    echo "❌ Apache failed to start"
    sudo systemctl status apache2 --no-pager -l | tail -20
fi
echo ""

echo "========================================"
echo "✅ Emergency fix complete!"
echo ""
echo "📊 Final system status:"
uptime
free -h | head -2
echo ""
echo "💡 Next steps:"
echo "   1. Monitor: watch -n 1 'docker stats --no-stream'"
echo "   2. Check logs: docker compose logs -f calc1"
echo "   3. Check Apache: sudo tail -f /var/log/apache2/calc1.ru_ssl_error.log"

