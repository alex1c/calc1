#!/bin/bash
# Script to fix 503 Service Unavailable error

set -e

PROJECT_DIR="/var/www/calc1.ru"
DOCKER_COMPOSE_CMD="docker compose"

echo "🔧 Fixing 503 Service Unavailable error..."
echo "=========================================="

cd "$PROJECT_DIR" || { echo "Error: Directory $PROJECT_DIR not found."; exit 1; }

# 1. Check Docker container status
echo "1️⃣ Checking Docker container status..."
if docker ps | grep -q "calc1-app"; then
    echo "✅ Container calc1-app is running"
    docker ps | grep calc1-app
else
    echo "❌ Container calc1-app is NOT running"
    echo "   Starting container..."
    $DOCKER_COMPOSE_CMD up -d || docker-compose up -d || { echo "Failed to start container."; exit 1; }
    echo "   Waiting for container to start (15 seconds)..."
    sleep 15
fi

# 2. Check container health
echo ""
echo "2️⃣ Checking container health..."
CONTAINER_HEALTHY=false
for i in {1..12}; do
    if docker exec calc1-app wget --quiet --tries=1 --spider http://localhost:3000 2>/dev/null; then
        CONTAINER_HEALTHY=true
        echo "✅ Container is healthy"
        break
    fi
    echo "   Waiting for container to become healthy... ($i/12)"
    sleep 5
done

if [ "$CONTAINER_HEALTHY" = false ]; then
    echo "⚠️  Container did not become healthy, but continuing..."
    echo "   Checking container logs..."
    $DOCKER_COMPOSE_CMD logs --tail=30 calc1 || docker-compose logs --tail=30 calc1 || true
fi

# 3. Check if port 3001 is listening
echo ""
echo "3️⃣ Checking if port 3001 is listening..."
if netstat -tuln 2>/dev/null | grep -q ':3001 ' || ss -tuln 2>/dev/null | grep -q ':3001 '; then
    echo "✅ Port 3001 is listening"
    netstat -tuln 2>/dev/null | grep ':3001 ' || ss -tuln 2>/dev/null | grep ':3001 '
else
    echo "❌ Port 3001 is NOT listening"
    echo "   This is the problem! Container is not exposing port 3001"
    echo "   Checking docker-compose.yml..."
    if grep -q "3001:3000" docker-compose.yml; then
        echo "   Port mapping is correct in docker-compose.yml"
        echo "   Restarting container..."
        $DOCKER_COMPOSE_CMD restart calc1 || docker-compose restart calc1 || true
        sleep 10
        if netstat -tuln 2>/dev/null | grep -q ':3001 ' || ss -tuln 2>/dev/null | grep -q ':3001 '; then
            echo "✅ Port 3001 is now listening after restart"
        else
            echo "❌ Port 3001 is still NOT listening"
            echo "   Checking port mapping..."
            docker port calc1-app 2>/dev/null || echo "   Cannot get port mapping"
            exit 1
        fi
    else
        echo "❌ Port mapping is incorrect in docker-compose.yml"
        exit 1
    fi
fi

# 4. Test application on port 3001
echo ""
echo "4️⃣ Testing application on http://localhost:3001..."
if curl -f -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Application responds on http://localhost:3001"
    echo "   Response headers:"
    curl -I http://localhost:3001 2>&1 | head -5
else
    echo "❌ Application does NOT respond on http://localhost:3001"
    echo "   This is the root cause of 503 error!"
    echo "   Checking container logs..."
    $DOCKER_COMPOSE_CMD logs --tail=50 calc1 || docker-compose logs --tail=50 calc1 || true
    exit 1
fi

# 5. Test Apache user connection
echo ""
echo "5️⃣ Testing if Apache user (www-data) can connect to http://localhost:3001..."
if sudo -u www-data curl -f -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Apache user can connect to http://localhost:3001"
else
    echo "❌ Apache user CANNOT connect to http://localhost:3001"
    echo "   This is likely the problem!"
    echo "   Checking firewall/AppArmor..."
    
    # Check if port is accessible from localhost
    if curl -f -s http://127.0.0.1:3001 > /dev/null 2>&1; then
        echo "   Port is accessible from 127.0.0.1"
    else
        echo "   Port is NOT accessible from 127.0.0.1"
    fi
    
    # Try to fix by checking Apache error log
    echo "   Checking Apache error log..."
    sudo tail -n 20 /var/log/apache2/calc1.ru_ssl_error.log 2>/dev/null | grep -i "proxy\|connect\|refused" || echo "   No specific errors found"
fi

# 6. Check Apache ProxyPass configuration
echo ""
echo "6️⃣ Checking Apache ProxyPass configuration..."
APACHE_CONF="/etc/apache2/sites-available/calc1.ru.conf"
if sudo grep -q "ProxyPass / http://localhost:3001/" "$APACHE_CONF"; then
    echo "✅ ProxyPass is configured for port 3001"
else
    echo "❌ ProxyPass is NOT configured for port 3001"
    echo "   Current ProxyPass:"
    sudo grep -i "ProxyPass" "$APACHE_CONF" || echo "   No ProxyPass found"
    echo "   Updating configuration..."
    sudo sed -i 's|ProxyPass / http://localhost:3000/|ProxyPass / http://localhost:3001/|g' "$APACHE_CONF"
    sudo sed -i 's|ProxyPassReverse / http://localhost:3000/|ProxyPassReverse / http://localhost:3001/|g' "$APACHE_CONF"
    echo "✅ Configuration updated"
    sudo systemctl reload apache2
fi

# 7. Check Apache error log for proxy errors
echo ""
echo "7️⃣ Checking Apache error log for proxy errors..."
if [ -f "/var/log/apache2/calc1.ru_ssl_error.log" ]; then
    echo "   Recent proxy/connection errors:"
    sudo tail -n 30 /var/log/apache2/calc1.ru_ssl_error.log | grep -iE "proxy|connect|refused|timeout|503" || echo "   No proxy errors found in last 30 lines"
else
    echo "   Error log not found"
fi

# 8. Restart Apache to clear any cached connections
echo ""
echo "8️⃣ Restarting Apache to clear cached connections..."
sudo systemctl restart apache2
sleep 3
if sudo systemctl is-active --quiet apache2; then
    echo "✅ Apache restarted successfully"
else
    echo "❌ Apache failed to restart"
    sudo systemctl status apache2 --no-pager -l | head -10
    exit 1
fi

# 9. Final test
echo ""
echo "9️⃣ Final test - checking HTTPS response..."
sleep 2
if curl -k -f -s https://localhost > /dev/null 2>&1; then
    echo "✅ HTTPS is responding on localhost"
    echo "   Response:"
    curl -k -I https://localhost 2>&1 | head -5
else
    echo "⚠️  HTTPS is not responding on localhost"
    HTTP_CODE=$(curl -k -s -o /dev/null -w "%{http_code}" https://localhost 2>/dev/null || echo "000")
    echo "   HTTP status code: $HTTP_CODE"
    if [ "$HTTP_CODE" = "503" ]; then
        echo "   Still getting 503 - checking Apache error log..."
        sudo tail -n 10 /var/log/apache2/calc1.ru_ssl_error.log
    fi
fi

echo ""
echo "=========================================="
echo "✅ Fix script completed!"
echo ""
echo "💡 If still getting 503:"
echo "   1. Check: sudo tail -f /var/log/apache2/calc1.ru_ssl_error.log"
echo "   2. Check: $DOCKER_COMPOSE_CMD logs -f calc1"
echo "   3. Verify: curl http://localhost:3001"
echo "   4. Test: curl -k https://calc1.ru"

