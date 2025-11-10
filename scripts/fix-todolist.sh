#!/bin/bash
# Script to fix todolist.su service

set -e

TODOLIST_DIR="/var/www/todolist.su"
APACHE_CONF="/etc/apache2/sites-available/todolist.su.conf"

echo "🔧 Fixing todolist.su service..."
echo "================================="

# 1. Check if todolist directory exists
echo "1️⃣ Checking todolist.su directory..."
if [ ! -d "$TODOLIST_DIR" ]; then
    echo "❌ Directory $TODOLIST_DIR not found"
    echo "   Please check the correct path to todolist.su"
    exit 1
else
    echo "✅ Directory exists: $TODOLIST_DIR"
fi

cd "$TODOLIST_DIR" || { echo "Error: Cannot access $TODOLIST_DIR"; exit 1; }

# 2. Check Docker containers
echo ""
echo "2️⃣ Checking Docker containers..."
if [ -f "docker-compose.yml" ]; then
    echo "✅ docker-compose.yml exists"
    echo "   Checking container status..."
    docker compose ps || docker-compose ps || echo "   Cannot check containers"
    
    # Check if containers are running
    RUNNING_CONTAINERS=$(docker ps --format "{{.Names}}" | grep -i todolist || echo "")
    if [ -n "$RUNNING_CONTAINERS" ]; then
        echo "✅ Found running todolist containers:"
        echo "$RUNNING_CONTAINERS"
    else
        echo "❌ No running todolist containers found"
        echo "   Attempting to start containers..."
        docker compose up -d || docker-compose up -d || { echo "Failed to start containers."; exit 1; }
        echo "   Waiting for containers to start (15 seconds)..."
        sleep 15
    fi
else
    echo "❌ docker-compose.yml not found in $TODOLIST_DIR"
    exit 1
fi

# 3. Check port 3000 (frontend)
echo ""
echo "3️⃣ Checking port 3000 (frontend)..."
if netstat -tuln 2>/dev/null | grep -q ':3000 ' || ss -tuln 2>/dev/null | grep -q ':3000 '; then
    echo "✅ Port 3000 is listening"
    netstat -tuln 2>/dev/null | grep ':3000 ' || ss -tuln 2>/dev/null | grep ':3000 '
    echo "   Testing connection..."
    if curl -f -s http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ Application responds on http://localhost:3000"
    else
        echo "❌ Application does NOT respond on http://localhost:3000"
    fi
else
    echo "❌ Port 3000 is NOT listening"
    echo "   This is the problem! Frontend container is not exposing port 3000"
fi

# 4. Check port 5000 (backend)
echo ""
echo "4️⃣ Checking port 5000 (backend)..."
if netstat -tuln 2>/dev/null | grep -q ':5000 ' || ss -tuln 2>/dev/null | grep -q ':5000 '; then
    echo "✅ Port 5000 is listening"
    netstat -tuln 2>/dev/null | grep ':5000 ' || ss -tuln 2>/dev/null | grep ':5000 '
    echo "   Testing connection..."
    if curl -f -s http://localhost:5000 > /dev/null 2>&1; then
        echo "✅ Backend responds on http://localhost:5000"
    else
        echo "❌ Backend does NOT respond on http://localhost:5000"
    fi
else
    echo "⚠️  Port 5000 is NOT listening (this might be normal if backend is internal)"
fi

# 5. Check Apache configuration
echo ""
echo "5️⃣ Checking Apache configuration..."
if [ -f "$APACHE_CONF" ]; then
    echo "✅ Apache config exists: $APACHE_CONF"
    echo "   Current ProxyPass configuration:"
    sudo grep -i "ProxyPass" "$APACHE_CONF" || echo "   No ProxyPass found"
    
    # Check if ProxyPass uses correct port
    if sudo grep -q "ProxyPass / http://localhost:3000/" "$APACHE_CONF"; then
        echo "✅ ProxyPass is configured for port 3000 (correct for frontend)"
    elif sudo grep -q "ProxyPass / http://localhost:3001/" "$APACHE_CONF"; then
        echo "❌ ProxyPass is configured for port 3001 (WRONG - should be 3000)"
        echo "   Fixing..."
        sudo sed -i 's|ProxyPass / http://localhost:3001/|ProxyPass / http://localhost:3000/|g' "$APACHE_CONF"
        sudo sed -i 's|ProxyPassReverse / http://localhost:3001/|ProxyPassReverse / http://localhost:3000/|g' "$APACHE_CONF"
        echo "✅ Fixed"
    else
        echo "⚠️  ProxyPass not found or has unexpected format"
    fi
else
    echo "❌ Apache config NOT found: $APACHE_CONF"
    echo "   You need to create Apache configuration for todolist.su"
    exit 1
fi

# 6. Test Apache user connectivity
echo ""
echo "6️⃣ Testing Apache user connectivity..."
if sudo -u www-data curl -f -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Apache user can connect to http://localhost:3000"
else
    echo "❌ Apache user CANNOT connect to http://localhost:3000"
    echo "   Testing with 127.0.0.1..."
    if sudo -u www-data curl -f -s http://127.0.0.1:3000 > /dev/null 2>&1; then
        echo "✅ Apache user can connect via 127.0.0.1:3000"
        echo "   Updating Apache config to use 127.0.0.1..."
        sudo sed -i 's|ProxyPass / http://localhost:3000/|ProxyPass / http://127.0.0.1:3000/|g' "$APACHE_CONF"
        sudo sed -i 's|ProxyPassReverse / http://localhost:3000/|ProxyPassReverse / http://127.0.0.1:3000/|g' "$APACHE_CONF"
        echo "✅ Updated"
    else
        echo "❌ Apache user cannot connect via 127.0.0.1:3000 either"
        echo "   This indicates the container is not running or port is not exposed"
    fi
fi

# 7. Check if site is enabled
echo ""
echo "7️⃣ Checking if todolist.su site is enabled..."
if ls -la /etc/apache2/sites-enabled/ 2>/dev/null | grep -q "todolist.su.conf"; then
    echo "✅ Site todolist.su.conf is enabled"
else
    echo "❌ Site todolist.su.conf is NOT enabled"
    echo "   Enabling..."
    sudo a2ensite todolist.su.conf 2>/dev/null || { echo "Failed to enable site."; exit 1; }
    echo "✅ Site enabled"
fi

# 8. Test Apache configuration
echo ""
echo "8️⃣ Testing Apache configuration..."
if sudo apache2ctl configtest 2>&1 | grep -q "Syntax OK"; then
    echo "✅ Apache configuration syntax is OK"
else
    echo "❌ Apache configuration has errors:"
    sudo apache2ctl configtest 2>&1
    exit 1
fi

# 9. Restart Apache
echo ""
echo "9️⃣ Restarting Apache..."
sudo systemctl restart apache2
sleep 3
if sudo systemctl is-active --quiet apache2; then
    echo "✅ Apache restarted"
else
    echo "❌ Apache failed to restart"
    exit 1
fi

# 10. Final test
echo ""
echo "🔟 Final test..."
sleep 2
HTTP_CODE=$(curl -k -s -o /dev/null -w "%{http_code}" https://todolist.su 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "307" ] || [ "$HTTP_CODE" = "302" ]; then
    echo "✅ todolist.su is responding (status: $HTTP_CODE)"
    echo "   Response headers:"
    curl -k -I https://todolist.su 2>&1 | head -5
else
    echo "❌ todolist.su is not responding correctly (status: $HTTP_CODE)"
    echo "   Latest Apache errors:"
    if [ -f "/var/log/apache2/todolist.su_ssl_error.log" ]; then
        sudo tail -n 10 /var/log/apache2/todolist.su_ssl_error.log | grep -iE "proxy|connect|3000|5000" || echo "   No specific errors found"
    else
        echo "   Error log not found"
    fi
    echo ""
    echo "   Container status:"
    docker ps | grep -i todolist || echo "   No todolist containers running"
    echo ""
    echo "   Port 3000 status:"
    netstat -tuln 2>/dev/null | grep ':3000 ' || ss -tuln 2>/dev/null | grep ':3000 ' || echo "   Port 3000 not listening"
fi

echo ""
echo "================================="
echo "✅ Fix script completed!"
echo ""
echo "💡 If still not working:"
echo "   1. Check containers: cd $TODOLIST_DIR && docker compose ps"
echo "   2. Check logs: cd $TODOLIST_DIR && docker compose logs"
echo "   3. Check Apache config: sudo cat $APACHE_CONF"
echo "   4. Check Apache logs: sudo tail -f /var/log/apache2/todolist.su_ssl_error.log"

