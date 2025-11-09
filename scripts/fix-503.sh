#!/bin/bash
# Fix 503 Service Unavailable error

echo "🔧 Fixing 503 Service Unavailable error..."
echo ""

# Check if Docker container is running
echo "1️⃣ Checking Docker container..."
cd /var/www/calc1.ru || { echo "❌ Cannot access /var/www/calc1.ru"; exit 1; }
if docker compose ps | grep -q "calc1-app.*Up"; then
    echo "✅ Container is running"
    docker compose ps
else
    echo "❌ Container is NOT running"
    echo "Starting container..."
    docker compose up -d
    sleep 10
fi
echo ""

# Check if application responds on localhost:3000
echo "2️⃣ Testing localhost:3000..."
if curl -f -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Application responds on localhost:3000"
    curl -I http://localhost:3000 2>&1 | head -3
else
    echo "❌ Application does NOT respond on localhost:3000"
    echo "Container logs:"
    docker compose logs --tail=30 calc1 2>/dev/null || docker-compose logs --tail=30 calc1 2>/dev/null
    echo ""
    echo "Restarting container..."
    docker compose restart calc1
    sleep 15
    if curl -f -s http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ Application now responds"
    else
        echo "❌ Application still does not respond"
        exit 1
    fi
fi
echo ""

# Check Apache modules
echo "3️⃣ Checking Apache modules..."
REQUIRED_MODULES=("proxy_module" "proxy_http_module")
for module in "${REQUIRED_MODULES[@]}"; do
    if apache2ctl -M 2>/dev/null | grep -q "$module"; then
        echo "✅ $module is enabled"
    else
        echo "❌ $module is NOT enabled - enabling..."
        sudo a2enmod ${module/_module/} 2>/dev/null || true
    fi
done
echo ""

# Check Apache error log for 503 errors
echo "4️⃣ Checking Apache error log for 503 errors..."
if [ -f /var/log/apache2/calc1.ru_ssl_error.log ]; then
    echo "Last 20 lines with errors:"
    sudo tail -20 /var/log/apache2/calc1.ru_ssl_error.log | grep -E "503|proxy|connection|refused" || sudo tail -20 /var/log/apache2/calc1.ru_ssl_error.log
else
    echo "⚠️  Error log file not found"
fi
echo ""

# Check if Apache can connect to localhost:3000
echo "5️⃣ Testing Apache connection to localhost:3000..."
# Run curl as www-data user (Apache user)
sudo -u www-data curl -f -s http://localhost:3000 > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Apache user can connect to localhost:3000"
else
    echo "❌ Apache user CANNOT connect to localhost:3000"
    echo "This might be a network/Docker issue"
fi
echo ""

# Check Docker network
echo "6️⃣ Checking Docker network..."
docker network ls | grep calc1
echo ""

# Check if port 3000 is accessible
echo "7️⃣ Checking port 3000 accessibility..."
if netstat -tuln 2>/dev/null | grep -q ':3000 ' || ss -tuln 2>/dev/null | grep -q ':3000 '; then
    echo "✅ Port 3000 is listening"
    netstat -tuln 2>/dev/null | grep ':3000 ' || ss -tuln 2>/dev/null | grep ':3000 '
else
    echo "❌ Port 3000 is NOT listening"
fi
echo ""

# Restart Apache
echo "8️⃣ Restarting Apache..."
sudo systemctl restart apache2
sleep 3
if systemctl is-active --quiet apache2; then
    echo "✅ Apache restarted successfully"
else
    echo "❌ Apache failed to restart"
    sudo systemctl status apache2 --no-pager -l | tail -10
fi
echo ""

# Test through Apache
echo "9️⃣ Testing through Apache..."
sleep 2
if curl -k -f -s https://localhost > /dev/null 2>&1; then
    echo "✅ Apache responds"
    curl -k -I https://localhost 2>&1 | head -5
else
    echo "❌ Apache still returns error"
    echo "Check error log: sudo tail -f /var/log/apache2/calc1.ru_ssl_error.log"
fi
echo ""

echo "========================================"
echo "✅ Fix attempt complete!"
echo ""
echo "💡 If still getting 503:"
echo "   1. Check: docker compose logs -f calc1"
echo "   2. Check: sudo tail -f /var/log/apache2/calc1.ru_ssl_error.log"
echo "   3. Verify: curl http://localhost:3000"
echo "   4. Restart: docker compose restart calc1"

