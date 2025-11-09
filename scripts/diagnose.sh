#!/bin/bash
# Diagnostic script for calc1.ru deployment

echo "🔍 Diagnostic Script for calc1.ru"
echo "=================================="
echo ""

# Check Docker container status
echo "1️⃣ Checking Docker container status..."
cd /var/www/calc1.ru 2>/dev/null || { echo "❌ Cannot access /var/www/calc1.ru"; exit 1; }
docker compose ps || docker-compose ps
echo ""

# Check if container is running
echo "2️⃣ Checking if calc1-app container is running..."
if docker ps | grep -q calc1-app; then
    echo "✅ Container calc1-app is running"
else
    echo "❌ Container calc1-app is NOT running"
    echo "   Attempting to start..."
    docker compose up -d || docker-compose up -d
    sleep 5
fi
echo ""

# Check container health
echo "3️⃣ Checking container health..."
docker inspect calc1-app --format='Status: {{.State.Status}} | Health: {{.State.Health.Status}}' 2>/dev/null || echo "❌ Cannot inspect container"
echo ""

# Check if port 3001 is listening
echo "4️⃣ Checking if port 3001 is listening..."
if netstat -tuln 2>/dev/null | grep -q ':3001 ' || ss -tuln 2>/dev/null | grep -q ':3001 '; then
    echo "✅ Port 3001 is listening"
    netstat -tuln 2>/dev/null | grep ':3001 ' || ss -tuln 2>/dev/null | grep ':3001 '
else
    echo "❌ Port 3001 is NOT listening"
fi
echo ""

# Check if application responds
echo "5️⃣ Checking if application responds on localhost:3001..."
if curl -f -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Application responds on http://localhost:3001"
    curl -I http://localhost:3001 2>/dev/null | head -5
else
    echo "❌ Application does NOT respond on http://localhost:3001"
    echo "   Checking container logs..."
    docker compose logs --tail=50 calc1 2>/dev/null || docker-compose logs --tail=50 calc1 2>/dev/null
fi
echo ""

# Check Apache modules
echo "6️⃣ Checking Apache modules..."
if apache2ctl -M 2>/dev/null | grep -q proxy_module; then
    echo "✅ proxy_module is enabled"
else
    echo "❌ proxy_module is NOT enabled"
fi
if apache2ctl -M 2>/dev/null | grep -q proxy_http_module; then
    echo "✅ proxy_http_module is enabled"
else
    echo "❌ proxy_http_module is NOT enabled"
fi
if apache2ctl -M 2>/dev/null | grep -q rewrite_module; then
    echo "✅ rewrite_module is enabled"
else
    echo "❌ rewrite_module is NOT enabled"
fi
if apache2ctl -M 2>/dev/null | grep -q headers_module; then
    echo "✅ headers_module is enabled"
else
    echo "❌ headers_module is NOT enabled"
fi
if apache2ctl -M 2>/dev/null | grep -q ssl_module; then
    echo "✅ ssl_module is enabled"
else
    echo "❌ ssl_module is NOT enabled"
fi
echo ""

# Check Apache configuration
echo "7️⃣ Checking Apache configuration syntax..."
if sudo apache2ctl configtest 2>&1 | grep -q "Syntax OK"; then
    echo "✅ Apache configuration is valid"
else
    echo "❌ Apache configuration has errors:"
    sudo apache2ctl configtest 2>&1
fi
echo ""

# Check if site is enabled
echo "8️⃣ Checking if calc1.ru site is enabled..."
if [ -L /etc/apache2/sites-enabled/calc1.ru.conf ] || [ -f /etc/apache2/sites-enabled/calc1.ru.conf ]; then
    echo "✅ Site calc1.ru.conf is enabled"
else
    echo "❌ Site calc1.ru.conf is NOT enabled"
    echo "   Run: sudo a2ensite calc1.ru.conf"
fi
echo ""

# Check Apache error log
echo "9️⃣ Last 20 lines of Apache SSL error log..."
if [ -f /var/log/apache2/calc1.ru_ssl_error.log ]; then
    sudo tail -20 /var/log/apache2/calc1.ru_ssl_error.log
else
    echo "⚠️  Error log file not found"
fi
echo ""

# Check Apache access log
echo "🔟 Last 10 lines of Apache SSL access log..."
if [ -f /var/log/apache2/calc1.ru_ssl_access.log ]; then
    sudo tail -10 /var/log/apache2/calc1.ru_ssl_access.log
else
    echo "⚠️  Access log file not found"
fi
echo ""

# Check Docker container logs
echo "1️⃣1️⃣ Last 50 lines of Docker container logs..."
docker compose logs --tail=50 calc1 2>/dev/null || docker-compose logs --tail=50 calc1 2>/dev/null
echo ""

# Test HTTPS connection
echo "1️⃣2️⃣ Testing HTTPS connection..."
if curl -k -f -s https://localhost > /dev/null 2>&1; then
    echo "✅ HTTPS responds on localhost"
    curl -k -I https://localhost 2>/dev/null | head -5
else
    echo "❌ HTTPS does NOT respond on localhost"
fi
echo ""

echo "=================================="
echo "✅ Diagnostic complete!"
echo ""
echo "💡 Common fixes:"
echo "   1. If container is not running: cd /var/www/calc1.ru && docker compose up -d"
echo "   2. If modules are missing: sudo a2enmod proxy proxy_http rewrite headers ssl"
echo "   3. If site is not enabled: sudo a2ensite calc1.ru.conf && sudo systemctl reload apache2"
echo "   4. Check logs: sudo tail -f /var/log/apache2/calc1.ru_ssl_error.log"

