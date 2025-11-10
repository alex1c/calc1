#!/bin/bash
# Diagnostic script for connection issues between Apache and Docker

set -e

PROJECT_DIR="/var/www/calc1.ru"
DOCKER_COMPOSE_CMD="docker compose"
APACHE_CONF="/etc/apache2/sites-available/calc1.ru.conf"

echo "🔍 Diagnosing connection issues..."
echo "=================================="

# 1. Check Docker container status
echo ""
echo "1️⃣ Checking Docker container status..."
cd "$PROJECT_DIR" || { echo "Error: Directory $PROJECT_DIR not found."; exit 1; }
$DOCKER_COMPOSE_CMD ps || docker-compose ps || true

# 2. Check if container is running
echo ""
echo "2️⃣ Checking if calc1-app container is running..."
if docker ps | grep -q "calc1-app"; then
    echo "✅ Container calc1-app is running"
    docker ps | grep calc1-app
else
    echo "❌ Container calc1-app is NOT running"
    echo "   Attempting to start..."
    $DOCKER_COMPOSE_CMD up -d || docker-compose up -d || true
    sleep 5
    if docker ps | grep -q "calc1-app"; then
        echo "✅ Container started"
    else
        echo "❌ Failed to start container"
        echo "   Checking logs..."
        $DOCKER_COMPOSE_CMD logs --tail=50 calc1 || docker-compose logs --tail=50 calc1 || true
    fi
fi

# 3. Check container health
echo ""
echo "3️⃣ Checking container health..."
HEALTH=$(docker inspect calc1-app --format='{{.State.Health.Status}}' 2>/dev/null || echo "no-health")
STATUS=$(docker inspect calc1-app --format='{{.State.Status}}' 2>/dev/null || echo "not-found")
echo "   Status: $STATUS"
echo "   Health: $HEALTH"

# 4. Check if port 3001 is listening
echo ""
echo "4️⃣ Checking if port 3001 is listening..."
if netstat -tuln 2>/dev/null | grep -q ':3001 ' || ss -tuln 2>/dev/null | grep -q ':3001 '; then
    echo "✅ Port 3001 is listening"
    netstat -tuln 2>/dev/null | grep ':3001 ' || ss -tuln 2>/dev/null | grep ':3001 '
else
    echo "❌ Port 3001 is NOT listening"
    echo "   This means the container is not exposing the port correctly"
fi

# 5. Check if application responds inside container
echo ""
echo "5️⃣ Checking if application responds inside container (port 3000)..."
if docker exec calc1-app wget --quiet --tries=1 --spider http://localhost:3000 2>/dev/null; then
    echo "✅ Application responds inside container on port 3000"
else
    echo "❌ Application does NOT respond inside container"
    echo "   Checking container logs..."
    $DOCKER_COMPOSE_CMD logs --tail=30 calc1 || docker-compose logs --tail=30 calc1 || true
fi

# 6. Check if application responds on host (port 3001)
echo ""
echo "6️⃣ Checking if application responds on host (port 3001)..."
if curl -f -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Application responds on http://localhost:3001"
    curl -I http://localhost:3001 2>&1 | head -5
else
    echo "❌ Application does NOT respond on http://localhost:3001"
    echo "   This is the problem! Apache cannot connect to the container."
fi

# 7. Check Apache configuration
echo ""
echo "7️⃣ Checking Apache configuration..."
if [ -f "$APACHE_CONF" ]; then
    echo "✅ Apache config file exists: $APACHE_CONF"
    if sudo grep -q "ProxyPass / http://localhost:3001/" "$APACHE_CONF"; then
        echo "✅ ProxyPass configured for port 3001"
    else
        echo "❌ ProxyPass NOT configured for port 3001"
        echo "   Current ProxyPass configuration:"
        sudo grep -i "ProxyPass" "$APACHE_CONF" || echo "   No ProxyPass found"
    fi
else
    echo "❌ Apache config file NOT found: $APACHE_CONF"
fi

# 8. Check if Apache can connect to localhost:3001
echo ""
echo "8️⃣ Testing if Apache user can connect to localhost:3001..."
if sudo -u www-data curl -f -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Apache user (www-data) can connect to http://localhost:3001"
else
    echo "❌ Apache user CANNOT connect to http://localhost:3001"
    echo "   This is likely the root cause of ERR_TUNNEL_CONNECTION_FAILED"
fi

# 9. Check Apache error logs
echo ""
echo "9️⃣ Checking Apache SSL error log (last 20 lines)..."
if [ -f "/var/log/apache2/calc1.ru_ssl_error.log" ]; then
    echo "   Recent errors:"
    sudo tail -n 20 /var/log/apache2/calc1.ru_ssl_error.log | grep -i "proxy\|connect\|timeout\|error" || echo "   No proxy/connection errors found"
else
    echo "   Error log not found"
fi

# 10. Check Apache modules
echo ""
echo "🔟 Checking Apache proxy modules..."
if apache2ctl -M 2>/dev/null | grep -q "proxy_module"; then
    echo "✅ proxy_module is enabled"
else
    echo "❌ proxy_module is NOT enabled"
fi

if apache2ctl -M 2>/dev/null | grep -q "proxy_http_module"; then
    echo "✅ proxy_http_module is enabled"
else
    echo "❌ proxy_http_module is NOT enabled"
fi

# 11. Check if site is enabled
echo ""
echo "1️⃣1️⃣ Checking if calc1.ru site is enabled..."
if ls -la /etc/apache2/sites-enabled/ 2>/dev/null | grep -q "calc1.ru.conf"; then
    echo "✅ Site calc1.ru.conf is enabled"
else
    echo "❌ Site calc1.ru.conf is NOT enabled"
    echo "   Run: sudo a2ensite calc1.ru.conf && sudo systemctl reload apache2"
fi

# 12. Test Apache configuration
echo ""
echo "1️⃣2️⃣ Testing Apache configuration syntax..."
if sudo apache2ctl configtest 2>&1 | grep -q "Syntax OK"; then
    echo "✅ Apache configuration syntax is OK"
else
    echo "❌ Apache configuration has errors:"
    sudo apache2ctl configtest 2>&1
fi

echo ""
echo "=================================="
echo "✅ Diagnostic complete!"
echo ""
echo "💡 Common fixes:"
echo "   1. If container is not running: cd $PROJECT_DIR && $DOCKER_COMPOSE_CMD up -d"
echo "   2. If port 3001 is not listening: Check docker-compose.yml port mapping"
echo "   3. If Apache cannot connect: Check firewall and ensure port 3001 is accessible"
echo "   4. If ProxyPass is wrong: Update $APACHE_CONF and reload Apache"

