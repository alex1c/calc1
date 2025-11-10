#!/bin/bash
# Final check and fix script

set -e

PROJECT_DIR="/var/www/calc1.ru"
DOCKER_COMPOSE_CMD="docker compose"

echo "🔍 Final check and fix..."
echo "========================="

cd "$PROJECT_DIR" || { echo "Error: Directory $PROJECT_DIR not found."; exit 1; }

# 1. Check Docker container
echo "1️⃣ Checking Docker container..."
if docker ps | grep -q "calc1-app"; then
    echo "✅ calc1-app container is running"
    docker ps | grep calc1-app
else
    echo "❌ calc1-app container is NOT running"
    echo "   Starting container..."
    $DOCKER_COMPOSE_CMD up -d || docker-compose up -d || { echo "Failed to start container."; exit 1; }
    echo "   Waiting for container to start (15 seconds)..."
    sleep 15
fi

# 2. Check container health
echo ""
echo "2️⃣ Checking container health..."
if docker exec calc1-app wget --quiet --tries=1 --spider http://localhost:3000 2>/dev/null; then
    echo "✅ Container is healthy"
else
    echo "⚠️  Container health check failed"
    echo "   Checking logs..."
    $DOCKER_COMPOSE_CMD logs --tail=30 calc1 || docker-compose logs --tail=30 calc1 || true
fi

# 3. Check port 3001
echo ""
echo "3️⃣ Checking port 3001..."
if netstat -tuln 2>/dev/null | grep -q ':3001 ' || ss -tuln 2>/dev/null | grep -q ':3001 '; then
    echo "✅ Port 3001 is listening"
    netstat -tuln 2>/dev/null | grep ':3001 ' || ss -tuln 2>/dev/null | grep ':3001 '
else
    echo "❌ Port 3001 is NOT listening"
    echo "   Checking port mapping..."
    docker port calc1-app 2>/dev/null || echo "   Cannot get port mapping"
    echo "   Restarting container..."
    $DOCKER_COMPOSE_CMD restart calc1 || docker-compose restart calc1 || true
    sleep 10
    if netstat -tuln 2>/dev/null | grep -q ':3001 ' || ss -tuln 2>/dev/null | grep -q ':3001 '; then
        echo "✅ Port 3001 is now listening after restart"
    else
        echo "❌ Port 3001 is still NOT listening"
        exit 1
    fi
fi

# 4. Test application on port 3001
echo ""
echo "4️⃣ Testing application on http://localhost:3001..."
MAX_ATTEMPTS=5
for i in $(seq 1 $MAX_ATTEMPTS); do
    if curl -f -s http://localhost:3001 > /dev/null 2>&1; then
        echo "✅ Application responds on http://localhost:3001"
        echo "   Response headers:"
        curl -I http://localhost:3001 2>&1 | head -5
        break
    else
        if [ $i -eq $MAX_ATTEMPTS ]; then
            echo "❌ Application does NOT respond on http://localhost:3001 after $MAX_ATTEMPTS attempts"
            echo "   Checking container logs..."
            $DOCKER_COMPOSE_CMD logs --tail=50 calc1 || docker-compose logs --tail=50 calc1 || true
            exit 1
        fi
        echo "   Attempt $i/$MAX_ATTEMPTS: Waiting 3 seconds..."
        sleep 3
    fi
done

# 5. Test Apache user connectivity
echo ""
echo "5️⃣ Testing Apache user connectivity..."
if sudo -u www-data curl -f -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Apache user can connect to http://localhost:3001"
else
    echo "❌ Apache user CANNOT connect to http://localhost:3001"
    echo "   This might be a permission issue"
    echo "   Testing with 127.0.0.1 instead of localhost..."
    if sudo -u www-data curl -f -s http://127.0.0.1:3001 > /dev/null 2>&1; then
        echo "✅ Apache user can connect via 127.0.0.1:3001"
        echo "   Updating Apache config to use 127.0.0.1..."
        sudo sed -i 's|ProxyPass / http://localhost:3001/|ProxyPass / http://127.0.0.1:3001/|g' /etc/apache2/sites-available/calc1.ru.conf
        sudo sed -i 's|ProxyPassReverse / http://localhost:3001/|ProxyPassReverse / http://127.0.0.1:3001/|g' /etc/apache2/sites-available/calc1.ru.conf
        sudo systemctl restart apache2
        sleep 3
    else
        echo "❌ Apache user cannot connect via 127.0.0.1:3001 either"
    fi
fi

# 6. Restart Apache
echo ""
echo "6️⃣ Restarting Apache..."
sudo systemctl restart apache2
sleep 3
if sudo systemctl is-active --quiet apache2; then
    echo "✅ Apache restarted"
else
    echo "❌ Apache failed to restart"
    exit 1
fi

# 7. Final test
echo ""
echo "7️⃣ Final test..."
sleep 2
HTTP_CODE=$(curl -k -s -o /dev/null -w "%{http_code}" https://calc1.ru 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "307" ] || [ "$HTTP_CODE" = "302" ]; then
    echo "✅ calc1.ru is responding (status: $HTTP_CODE)"
    echo "   Testing full response:"
    curl -k -I https://calc1.ru 2>&1 | head -10
else
    echo "❌ calc1.ru is not responding correctly (status: $HTTP_CODE)"
    echo "   Latest Apache errors:"
    sudo tail -n 10 /var/log/apache2/calc1.ru_ssl_error.log | grep -iE "proxy|connect|3001" || echo "   No specific errors found"
    echo ""
    echo "   Container status:"
    docker ps | grep calc1-app || echo "   Container not running"
    echo ""
    echo "   Port 3001 status:"
    netstat -tuln 2>/dev/null | grep ':3001 ' || ss -tuln 2>/dev/null | grep ':3001 ' || echo "   Port 3001 not listening"
fi

echo ""
echo "========================="
echo "✅ Check complete!"

