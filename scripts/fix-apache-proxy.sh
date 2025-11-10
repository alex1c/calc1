#!/bin/bash
# Script to fix Apache proxy configuration for calc1.ru

set -e

APACHE_CONF="/etc/apache2/sites-available/calc1.ru.conf"
PROJECT_DIR="/var/www/calc1.ru"

echo "🔧 Fixing Apache proxy configuration..."
echo "========================================"

# 1. Check current Apache configuration
echo "1️⃣ Checking current Apache configuration..."
if [ -f "$APACHE_CONF" ]; then
    echo "✅ Apache config file exists: $APACHE_CONF"
    echo "   Current ProxyPass configuration:"
    sudo grep -i "ProxyPass" "$APACHE_CONF" || echo "   No ProxyPass found"
else
    echo "❌ Apache config file NOT found: $APACHE_CONF"
    echo "   Copying from repository..."
    if [ -f "$PROJECT_DIR/apache/calc1.ru.conf" ]; then
        sudo cp "$PROJECT_DIR/apache/calc1.ru.conf" "$APACHE_CONF"
        echo "✅ Config copied"
    else
        echo "❌ Config not found in repository"
        exit 1
    fi
fi

# 2. Check if ProxyPass uses port 3000 (wrong)
echo ""
echo "2️⃣ Checking if ProxyPass uses wrong port..."
if sudo grep -q "ProxyPass / http://localhost:3000/" "$APACHE_CONF"; then
    echo "❌ ProxyPass is using port 3000 (WRONG)"
    echo "   Updating to port 3001..."
    sudo sed -i 's|ProxyPass / http://localhost:3000/|ProxyPass / http://localhost:3001/|g' "$APACHE_CONF"
    sudo sed -i 's|ProxyPassReverse / http://localhost:3000/|ProxyPassReverse / http://localhost:3001/|g' "$APACHE_CONF"
    echo "✅ Updated to port 3001"
elif sudo grep -q "ProxyPass / http://localhost:3001/" "$APACHE_CONF"; then
    echo "✅ ProxyPass is using port 3001 (CORRECT)"
else
    echo "⚠️  ProxyPass not found or has unexpected format"
    echo "   Current ProxyPass lines:"
    sudo grep -i "ProxyPass" "$APACHE_CONF" || echo "   No ProxyPass found"
fi

# 3. Verify configuration
echo ""
echo "3️⃣ Verifying updated configuration..."
echo "   ProxyPass configuration:"
sudo grep -i "ProxyPass" "$APACHE_CONF" || echo "   No ProxyPass found"

# 4. Test Apache configuration syntax
echo ""
echo "4️⃣ Testing Apache configuration syntax..."
if sudo apache2ctl configtest 2>&1 | grep -q "Syntax OK"; then
    echo "✅ Apache configuration syntax is OK"
else
    echo "❌ Apache configuration has errors:"
    sudo apache2ctl configtest 2>&1
    exit 1
fi

# 5. Reload Apache
echo ""
echo "5️⃣ Reloading Apache..."
if sudo systemctl is-active --quiet apache2; then
    sudo systemctl reload apache2 || { echo "Failed to reload Apache."; exit 1; }
    echo "✅ Apache reloaded"
else
    echo "⚠️  Apache is not running, starting..."
    sudo systemctl start apache2 || { echo "Failed to start Apache."; exit 1; }
    echo "✅ Apache started"
fi

# 6. Wait a moment for Apache to reload
sleep 2

# 7. Test connection
echo ""
echo "6️⃣ Testing connection..."
if curl -k -f -s https://localhost > /dev/null 2>&1; then
    HTTP_CODE=$(curl -k -s -o /dev/null -w "%{http_code}" https://localhost 2>/dev/null || echo "000")
    if [ "$HTTP_CODE" = "200" ]; then
        echo "✅ HTTPS is responding with 200 OK"
    elif [ "$HTTP_CODE" = "307" ] || [ "$HTTP_CODE" = "302" ]; then
        echo "✅ HTTPS is responding with redirect (normal for root path)"
    else
        echo "⚠️  HTTPS responded with status code: $HTTP_CODE"
    fi
else
    echo "❌ HTTPS is not responding"
    echo "   Checking Apache error log..."
    sudo tail -n 10 /var/log/apache2/calc1.ru_ssl_error.log | grep -iE "proxy|connect|refused|503" || echo "   No specific errors found"
fi

# 8. Test direct connection to calc1.ru
echo ""
echo "7️⃣ Testing direct connection to calc1.ru..."
if curl -k -f -s https://calc1.ru > /dev/null 2>&1; then
    HTTP_CODE=$(curl -k -s -o /dev/null -w "%{http_code}" https://calc1.ru 2>/dev/null || echo "000")
    if [ "$HTTP_CODE" = "200" ]; then
        echo "✅ calc1.ru is responding with 200 OK"
    elif [ "$HTTP_CODE" = "307" ] || [ "$HTTP_CODE" = "302" ]; then
        echo "✅ calc1.ru is responding with redirect (normal)"
    else
        echo "⚠️  calc1.ru responded with status code: $HTTP_CODE"
    fi
else
    echo "❌ calc1.ru is not responding"
fi

echo ""
echo "========================================"
echo "✅ Fix script completed!"
echo ""
echo "💡 If still getting 503:"
echo "   1. Check: sudo tail -f /var/log/apache2/calc1.ru_ssl_error.log"
echo "   2. Verify: curl http://localhost:3001"
echo "   3. Test: curl -k https://calc1.ru"
echo ""
echo "💡 For todolist.su:"
echo "   1. Check Apache config: sudo grep -i ProxyPass /etc/apache2/sites-available/todolist.su.conf"
echo "   2. Ensure it uses port 3000: ProxyPass / http://localhost:3000/"
echo "   3. Start container: cd /var/www/todolist.su && docker compose up -d"

