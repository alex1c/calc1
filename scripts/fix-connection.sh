#!/bin/bash
# Script to fix connection issues between Apache and Docker

set -e

PROJECT_DIR="/var/www/calc1.ru"
DOCKER_COMPOSE_CMD="docker compose"
APACHE_CONF="/etc/apache2/sites-available/calc1.ru.conf"

echo "🔧 Fixing connection issues..."
echo "=============================="

# 1. Navigate to project directory
cd "$PROJECT_DIR" || { echo "Error: Directory $PROJECT_DIR not found."; exit 1; }

# 2. Ensure Docker container is running
echo "1️⃣ Ensuring Docker container is running..."
if ! docker ps | grep -q "calc1-app"; then
    echo "   Container is not running, starting..."
    $DOCKER_COMPOSE_CMD up -d || docker-compose up -d || { echo "Failed to start container."; exit 1; }
    echo "   Waiting for container to start (10 seconds)..."
    sleep 10
else
    echo "✅ Container is running"
fi

# 3. Check if container is healthy
echo "2️⃣ Checking container health..."
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
    echo "⚠️  Container did not become healthy in time, but continuing..."
fi

# 4. Check if port 3001 is accessible
echo "3️⃣ Checking if port 3001 is accessible..."
if curl -f -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Port 3001 is accessible"
else
    echo "❌ Port 3001 is NOT accessible"
    echo "   Checking container status..."
    docker ps | grep calc1-app || echo "   Container not found in running containers"
    echo "   Checking port mapping..."
    docker port calc1-app 2>/dev/null || echo "   Cannot get port mapping"
    echo "   Attempting to restart container..."
    $DOCKER_COMPOSE_CMD restart calc1 || docker-compose restart calc1 || true
    sleep 10
    if curl -f -s http://localhost:3001 > /dev/null 2>&1; then
        echo "✅ Port 3001 is now accessible after restart"
    else
        echo "❌ Port 3001 is still NOT accessible"
        echo "   This is a critical issue. Check docker-compose.yml port mapping."
        exit 1
    fi
fi

# 5. Update Apache configuration
echo "4️⃣ Updating Apache configuration..."
if [ -f "$APACHE_CONF" ]; then
    # Check if ProxyPass is correct
    if ! sudo grep -q "ProxyPass / http://localhost:3001/" "$APACHE_CONF"; then
        echo "   Updating ProxyPass to use port 3001..."
        sudo sed -i 's|ProxyPass / http://localhost:3000/|ProxyPass / http://localhost:3001/|g' "$APACHE_CONF"
        sudo sed -i 's|ProxyPassReverse / http://localhost:3000/|ProxyPassReverse / http://localhost:3001/|g' "$APACHE_CONF"
        echo "✅ Apache config updated"
    else
        echo "✅ Apache config already uses port 3001"
    fi
else
    echo "   Copying Apache config from repository..."
    if [ -f "$PROJECT_DIR/apache/calc1.ru.conf" ]; then
        sudo cp "$PROJECT_DIR/apache/calc1.ru.conf" "$APACHE_CONF"
        echo "✅ Apache config copied"
    else
        echo "❌ Apache config not found in repository"
        exit 1
    fi
fi

# 6. Enable Apache modules
echo "5️⃣ Ensuring Apache proxy modules are enabled..."
sudo a2enmod proxy proxy_http rewrite headers ssl 2>/dev/null || true
echo "✅ Modules enabled"

# 7. Enable site
echo "6️⃣ Ensuring calc1.ru site is enabled..."
sudo a2ensite calc1.ru.conf 2>/dev/null || true
echo "✅ Site enabled"

# 8. Test Apache configuration
echo "7️⃣ Testing Apache configuration..."
if sudo apache2ctl configtest 2>&1 | grep -q "Syntax OK"; then
    echo "✅ Apache configuration is valid"
else
    echo "❌ Apache configuration has errors:"
    sudo apache2ctl configtest 2>&1
    exit 1
fi

# 9. Reload Apache
echo "8️⃣ Reloading Apache..."
sudo systemctl reload apache2 || { echo "Failed to reload Apache."; exit 1; }
echo "✅ Apache reloaded"

# 10. Test connection from Apache user
echo "9️⃣ Testing connection from Apache user..."
if sudo -u www-data curl -f -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Apache user can connect to http://localhost:3001"
else
    echo "⚠️  Apache user cannot connect to http://localhost:3001"
    echo "   This might be a permission issue, but Apache might still work"
fi

# 11. Final test
echo "🔟 Final test - checking HTTPS response..."
sleep 2
if curl -k -f -s https://localhost > /dev/null 2>&1; then
    echo "✅ HTTPS is responding on localhost"
else
    echo "⚠️  HTTPS is not responding on localhost (this might be normal)"
fi

echo ""
echo "=============================="
echo "✅ Fix script completed!"
echo ""
echo "💡 Test the site:"
echo "   curl -k https://calc1.ru"
echo "   or open in browser: https://calc1.ru"
echo ""
echo "💡 If still not working, check:"
echo "   1. sudo tail -f /var/log/apache2/calc1.ru_ssl_error.log"
echo "   2. $DOCKER_COMPOSE_CMD logs -f calc1"
echo "   3. docker ps | grep calc1-app"

