#!/bin/bash
# Script to fix missing Docker containers and port conflicts

set -e

PROJECT_DIR="/var/www/calc1.ru"
DOCKER_COMPOSE_CMD="docker compose"

echo "🔧 Fixing missing containers and port conflicts..."
echo "=================================================="

cd "$PROJECT_DIR" || { echo "Error: Directory $PROJECT_DIR not found."; exit 1; }

# 1. Kill any processes using port 3001
echo "1️⃣ Checking for processes using port 3001..."
if netstat -tuln 2>/dev/null | grep -q ':3001 ' || ss -tuln 2>/dev/null | grep -q ':3001 '; then
    echo "   Port 3001 is in use, finding and killing processes..."
    PID=$(lsof -ti:3001 2>/dev/null || fuser 3001/tcp 2>/dev/null | awk '{print $1}' || echo "")
    if [ -n "$PID" ]; then
        echo "   Killing process $PID on port 3001..."
        kill -9 $PID 2>/dev/null || true
        sleep 2
    else
        echo "   Could not find process ID, trying to kill by port..."
        fuser -k 3001/tcp 2>/dev/null || true
        sleep 2
    fi
    echo "✅ Done"
else
    echo "✅ Port 3001 is free"
fi

# 2. Kill any processes using port 3000
echo ""
echo "2️⃣ Checking for processes using port 3000..."
if netstat -tuln 2>/dev/null | grep -q ':3000 ' || ss -tuln 2>/dev/null | grep -q ':3000 '; then
    echo "   Port 3000 is in use, finding and killing processes..."
    PID=$(lsof -ti:3000 2>/dev/null || fuser 3000/tcp 2>/dev/null | awk '{print $1}' || echo "")
    if [ -n "$PID" ]; then
        echo "   Killing process $PID on port 3000..."
        kill -9 $PID 2>/dev/null || true
        sleep 2
    else
        echo "   Could not find process ID, trying to kill by port..."
        fuser -k 3000/tcp 2>/dev/null || true
        sleep 2
    fi
    echo "✅ Done"
else
    echo "✅ Port 3000 is free"
fi

# 3. Stop any existing calc1 containers
echo ""
echo "3️⃣ Stopping existing calc1 containers..."
$DOCKER_COMPOSE_CMD down 2>/dev/null || docker-compose down 2>/dev/null || true
docker stop calc1-app 2>/dev/null || true
docker rm calc1-app 2>/dev/null || true
sleep 2
echo "✅ Done"

# 4. Check docker-compose.yml
echo ""
echo "4️⃣ Checking docker-compose.yml..."
if [ -f "docker-compose.yml" ]; then
    echo "✅ docker-compose.yml exists"
    if grep -q "3001:3000" docker-compose.yml; then
        echo "✅ Port mapping 3001:3000 is correct"
    else
        echo "❌ Port mapping is incorrect in docker-compose.yml"
        echo "   Current port mapping:"
        grep -i "ports" -A 2 docker-compose.yml || echo "   No ports found"
    fi
else
    echo "❌ docker-compose.yml not found"
    exit 1
fi

# 5. Start calc1 container
echo ""
echo "5️⃣ Starting calc1 container..."
$DOCKER_COMPOSE_CMD up -d || docker-compose up -d || { echo "Failed to start container."; exit 1; }
echo "   Waiting for container to start (10 seconds)..."
sleep 10

# 6. Check container status
echo ""
echo "6️⃣ Checking container status..."
if docker ps | grep -q "calc1-app"; then
    echo "✅ calc1-app container is running"
    docker ps | grep calc1-app
else
    echo "❌ calc1-app container is NOT running"
    echo "   Checking logs..."
    $DOCKER_COMPOSE_CMD logs --tail=50 calc1 || docker-compose logs --tail=50 calc1 || true
    exit 1
fi

# 7. Check container health
echo ""
echo "7️⃣ Checking container health..."
MAX_WAIT=60
WAITED=0
while [ $WAITED -lt $MAX_WAIT ]; do
    if docker exec calc1-app wget --quiet --tries=1 --spider http://localhost:3000 2>/dev/null; then
        echo "✅ Container is healthy and responding"
        break
    fi
    echo "   Waiting for container to become healthy... ($WAITED/$MAX_WAIT seconds)"
    sleep 5
    WAITED=$((WAITED + 5))
done

if [ $WAITED -ge $MAX_WAIT ]; then
    echo "⚠️  Container did not become healthy in time"
    echo "   Checking logs..."
    $DOCKER_COMPOSE_CMD logs --tail=50 calc1 || docker-compose logs --tail=50 calc1 || true
fi

# 8. Check port 3001
echo ""
echo "8️⃣ Checking port 3001..."
if netstat -tuln 2>/dev/null | grep -q ':3001 ' || ss -tuln 2>/dev/null | grep -q ':3001 '; then
    echo "✅ Port 3001 is listening"
    netstat -tuln 2>/dev/null | grep ':3001 ' || ss -tuln 2>/dev/null | grep ':3001 '
else
    echo "❌ Port 3001 is NOT listening"
    echo "   Checking port mapping..."
    docker port calc1-app 2>/dev/null || echo "   Cannot get port mapping"
    exit 1
fi

# 9. Test application
echo ""
echo "9️⃣ Testing application on http://localhost:3001..."
if curl -f -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Application responds on http://localhost:3001"
    curl -I http://localhost:3001 2>&1 | head -5
else
    echo "❌ Application does NOT respond on http://localhost:3001"
    echo "   Checking container logs..."
    $DOCKER_COMPOSE_CMD logs --tail=50 calc1 || docker-compose logs --tail=50 calc1 || true
    exit 1
fi

# 10. Test Apache connectivity
echo ""
echo "🔟 Testing Apache user connectivity..."
if sudo -u www-data curl -f -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Apache user can connect to http://localhost:3001"
else
    echo "❌ Apache user CANNOT connect to http://localhost:3001"
    echo "   This might be a permission issue, but checking anyway..."
fi

# 11. Restart Apache
echo ""
echo "1️⃣1️⃣ Restarting Apache..."
sudo systemctl restart apache2
sleep 3
if sudo systemctl is-active --quiet apache2; then
    echo "✅ Apache restarted successfully"
else
    echo "❌ Apache failed to restart"
    sudo systemctl status apache2 --no-pager -l | head -10
    exit 1
fi

# 12. Final test
echo ""
echo "1️⃣2️⃣ Final test - checking HTTPS response..."
sleep 2
HTTP_CODE=$(curl -k -s -o /dev/null -w "%{http_code}" https://localhost 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ HTTPS is responding with 200 OK"
elif [ "$HTTP_CODE" = "503" ]; then
    echo "⚠️  Still getting 503 - checking Apache error log..."
    sudo tail -n 5 /var/log/apache2/calc1.ru_ssl_error.log
else
    echo "⚠️  HTTPS responded with status code: $HTTP_CODE"
fi

echo ""
echo "=================================================="
echo "✅ Fix script completed!"
echo ""
echo "💡 Next steps for todolist.su:"
echo "   cd /var/www/todolist.su"
echo "   docker compose up -d"
echo "   docker compose ps"

