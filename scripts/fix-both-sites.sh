#!/bin/bash
# Script to fix both calc1.ru and todolist.su (eisenhower-matrix)

set -e

CALC1_DIR="/var/www/calc1.ru"
TODOLIST_DIR="/var/www/eisenhower-matrix"

echo "🔧 Fixing both sites (calc1.ru and todolist.su)..."
echo "=================================================="

# 1. Fix calc1.ru
echo ""
echo "1️⃣ Fixing calc1.ru..."
cd "$CALC1_DIR" || { echo "Error: Directory $CALC1_DIR not found."; exit 1; }

# Check container
if ! docker ps | grep -q "calc1-app"; then
    echo "   Container calc1-app is not running, starting..."
    docker compose up -d || docker-compose up -d || { echo "Failed to start calc1 container."; exit 1; }
    echo "   Waiting for container to start (15 seconds)..."
    sleep 15
else
    echo "✅ calc1-app container is running"
fi

# Check port 3001
if netstat -tuln 2>/dev/null | grep -q ':3001 ' || ss -tuln 2>/dev/null | grep -q ':3001 '; then
    echo "✅ Port 3001 is listening"
    if curl -f -s http://localhost:3001 > /dev/null 2>&1; then
        echo "✅ calc1.ru application responds on port 3001"
    else
        echo "❌ calc1.ru application does NOT respond on port 3001"
        echo "   Restarting container..."
        docker compose restart calc1 || docker-compose restart calc1 || true
        sleep 10
    fi
else
    echo "❌ Port 3001 is NOT listening"
    echo "   Restarting container..."
    docker compose restart calc1 || docker-compose restart calc1 || true
    sleep 10
fi

# Check Apache config for calc1.ru
CALC1_APACHE="/etc/apache2/sites-available/calc1.ru.conf"
if [ -f "$CALC1_APACHE" ]; then
    if sudo grep -q "ProxyPass / http://localhost:3001/" "$CALC1_APACHE" || sudo grep -q "ProxyPass / http://127.0.0.1:3001/" "$CALC1_APACHE"; then
        echo "✅ calc1.ru Apache config uses port 3001"
    else
        echo "❌ calc1.ru Apache config does NOT use port 3001"
        echo "   Fixing..."
        sudo sed -i 's|ProxyPass / http://localhost:3000/|ProxyPass / http://localhost:3001/|g' "$CALC1_APACHE"
        sudo sed -i 's|ProxyPassReverse / http://localhost:3000/|ProxyPassReverse / http://localhost:3001/|g' "$CALC1_APACHE"
        echo "✅ Fixed"
    fi
fi

# 2. Fix todolist.su (eisenhower-matrix)
echo ""
echo "2️⃣ Fixing todolist.su (eisenhower-matrix)..."
if [ ! -d "$TODOLIST_DIR" ]; then
    echo "⚠️  Directory $TODOLIST_DIR not found, skipping todolist.su"
else
    cd "$TODOLIST_DIR" || { echo "Error: Cannot access $TODOLIST_DIR"; }
    
    # Check containers
    RUNNING_CONTAINERS=$(docker ps --format "{{.Names}}" | grep -i -E "todolist|eisenhower|matrix" || echo "")
    if [ -n "$RUNNING_CONTAINERS" ]; then
        echo "✅ Found running todolist containers:"
        echo "$RUNNING_CONTAINERS"
    else
        echo "   No running todolist containers found, starting..."
        if [ -f "docker-compose.yml" ]; then
            docker compose up -d || docker-compose up -d || echo "   Failed to start todolist containers"
            sleep 10
        else
            echo "⚠️  docker-compose.yml not found in $TODOLIST_DIR"
        fi
    fi
    
    # Check port 3000
    if netstat -tuln 2>/dev/null | grep -q ':3000 ' || ss -tuln 2>/dev/null | grep -q ':3000 '; then
        echo "✅ Port 3000 is listening"
        if curl -f -s http://localhost:3000 > /dev/null 2>&1; then
            echo "✅ todolist.su application responds on port 3000"
        else
            echo "❌ todolist.su application does NOT respond on port 3000"
        fi
    else
        echo "❌ Port 3000 is NOT listening"
    fi
    
    # Check Apache config for todolist.su
    TODOLIST_APACHE="/etc/apache2/sites-available/todolist.su.conf"
    if [ -f "$TODOLIST_APACHE" ]; then
        if sudo grep -q "ProxyPass / http://localhost:3000/" "$TODOLIST_APACHE" || sudo grep -q "ProxyPass / http://127.0.0.1:3000/" "$TODOLIST_APACHE"; then
            echo "✅ todolist.su Apache config uses port 3000"
        else
            echo "❌ todolist.su Apache config does NOT use port 3000"
            echo "   Fixing..."
            sudo sed -i 's|ProxyPass / http://localhost:3001/|ProxyPass / http://localhost:3000/|g' "$TODOLIST_APACHE"
            sudo sed -i 's|ProxyPassReverse / http://localhost:3001/|ProxyPassReverse / http://localhost:3000/|g' "$TODOLIST_APACHE"
            echo "✅ Fixed"
        fi
    fi
fi

# 3. Ensure both sites are enabled
echo ""
echo "3️⃣ Ensuring both sites are enabled..."
sudo a2ensite calc1.ru.conf 2>/dev/null || true
sudo a2ensite todolist.su.conf 2>/dev/null || true
echo "✅ Sites enabled"

# 4. Disable conflicting old configs
echo ""
echo "4️⃣ Disabling conflicting old configs..."
sudo a2dissite calc1.ru-le-ssl.conf 2>/dev/null || true
echo "✅ Old configs disabled"

# 5. Test Apache configuration
echo ""
echo "5️⃣ Testing Apache configuration..."
if sudo apache2ctl configtest 2>&1 | grep -q "Syntax OK"; then
    echo "✅ Apache configuration syntax is OK"
else
    echo "❌ Apache configuration has errors:"
    sudo apache2ctl configtest 2>&1
    exit 1
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

# 7. Final tests
echo ""
echo "7️⃣ Final tests..."
sleep 2

# Test calc1.ru
echo "   Testing calc1.ru..."
HTTP_CODE=$(curl -k -s -o /dev/null -w "%{http_code}" https://calc1.ru 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "307" ] || [ "$HTTP_CODE" = "302" ]; then
    echo "✅ calc1.ru is responding (status: $HTTP_CODE)"
else
    echo "❌ calc1.ru is not responding correctly (status: $HTTP_CODE)"
    echo "   Checking container..."
    docker ps | grep calc1-app || echo "   Container not running"
    echo "   Checking port 3001..."
    netstat -tuln 2>/dev/null | grep ':3001 ' || ss -tuln 2>/dev/null | grep ':3001 ' || echo "   Port 3001 not listening"
fi

# Test todolist.su
echo "   Testing todolist.su..."
HTTP_CODE=$(curl -k -s -o /dev/null -w "%{http_code}" https://todolist.su 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "307" ] || [ "$HTTP_CODE" = "302" ]; then
    echo "✅ todolist.su is responding (status: $HTTP_CODE)"
else
    echo "❌ todolist.su is not responding correctly (status: $HTTP_CODE)"
    echo "   Checking containers..."
    docker ps | grep -i -E "todolist|eisenhower|matrix" || echo "   Containers not running"
    echo "   Checking port 3000..."
    netstat -tuln 2>/dev/null | grep ':3000 ' || ss -tuln 2>/dev/null | grep ':3000 ' || echo "   Port 3000 not listening"
fi

# 8. Show summary
echo ""
echo "8️⃣ Summary of running containers and ports..."
echo "   Docker containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -E "calc1|todolist|eisenhower|matrix|NAMES" || docker ps
echo ""
echo "   Listening ports:"
netstat -tuln 2>/dev/null | grep -E ":3000|:3001|:5000" || ss -tuln 2>/dev/null | grep -E ":3000|:3001|:5000" || echo "   No relevant ports found"

echo ""
echo "=================================================="
echo "✅ Fix script completed!"
echo ""
echo "💡 If issues persist:"
echo "   1. Check calc1: cd $CALC1_DIR && docker compose logs calc1"
echo "   2. Check todolist: cd $TODOLIST_DIR && docker compose logs"
echo "   3. Check Apache: sudo tail -f /var/log/apache2/*_ssl_error.log"

