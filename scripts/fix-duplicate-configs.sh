#!/bin/bash
# Script to fix duplicate Apache configurations

set -e

echo "🔧 Fixing duplicate Apache configurations..."
echo "============================================"

# 1. Check for duplicate configs
echo "1️⃣ Checking for duplicate calc1.ru configurations..."
DUPLICATES=$(find /etc/apache2/sites-enabled -name "*calc1*" 2>/dev/null || true)
if [ -n "$DUPLICATES" ]; then
    echo "⚠️  Found multiple calc1.ru configs in sites-enabled:"
    echo "$DUPLICATES"
    for config in $DUPLICATES; do
        echo "   $config:"
        sudo grep -i "ProxyPass" "$config" || echo "   No ProxyPass found"
    done
else
    echo "✅ No duplicate configs found"
    exit 0
fi

# 2. Disable the old le-ssl config
echo ""
echo "2️⃣ Disabling old calc1.ru-le-ssl.conf..."
if [ -L "/etc/apache2/sites-enabled/calc1.ru-le-ssl.conf" ] || [ -f "/etc/apache2/sites-enabled/calc1.ru-le-ssl.conf" ]; then
    echo "   Found calc1.ru-le-ssl.conf, disabling..."
    sudo a2dissite calc1.ru-le-ssl.conf 2>/dev/null || sudo rm /etc/apache2/sites-enabled/calc1.ru-le-ssl.conf
    echo "✅ Disabled"
else
    echo "✅ calc1.ru-le-ssl.conf is not enabled"
fi

# 3. Ensure only calc1.ru.conf is enabled
echo ""
echo "3️⃣ Ensuring only calc1.ru.conf is enabled..."
sudo a2ensite calc1.ru.conf 2>/dev/null || true
echo "✅ calc1.ru.conf is enabled"

# 4. Verify enabled configs
echo ""
echo "4️⃣ Verifying enabled configurations..."
ENABLED_CONFIGS=$(ls -la /etc/apache2/sites-enabled/ | grep calc1 || true)
if [ -n "$ENABLED_CONFIGS" ]; then
    echo "   Enabled calc1.ru configs:"
    echo "$ENABLED_CONFIGS"
    echo ""
    echo "   ProxyPass in each:"
    for config in $(echo "$ENABLED_CONFIGS" | awk '{print $9}' | grep calc1); do
        if [ "$config" != "." ] && [ "$config" != ".." ]; then
            FULL_PATH="/etc/apache2/sites-enabled/$config"
            echo "   $FULL_PATH:"
            sudo grep -i "ProxyPass" "$FULL_PATH" || echo "   No ProxyPass found"
        fi
    done
else
    echo "❌ No calc1.ru configs enabled!"
    exit 1
fi

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

# 6. Check what Apache will load
echo ""
echo "6️⃣ Checking what Apache will load..."
APACHE_CONFIG=$(sudo apache2ctl -S 2>&1 | grep -i "calc1" || echo "")
if [ -n "$APACHE_CONFIG" ]; then
    echo "   Apache virtual hosts for calc1.ru:"
    echo "$APACHE_CONFIG"
    if echo "$APACHE_CONFIG" | grep -q "calc1.ru-le-ssl.conf"; then
        echo "⚠️  WARNING: calc1.ru-le-ssl.conf is still being loaded!"
    else
        echo "✅ Only calc1.ru.conf is being loaded"
    fi
else
    echo "⚠️  No calc1.ru configs found in Apache"
fi

# 7. Restart Apache
echo ""
echo "7️⃣ Restarting Apache..."
sudo systemctl restart apache2
sleep 3
if sudo systemctl is-active --quiet apache2; then
    echo "✅ Apache restarted successfully"
else
    echo "❌ Apache failed to restart"
    sudo systemctl status apache2 --no-pager -l | head -15
    exit 1
fi

# 8. Verify what Apache is actually using now
echo ""
echo "8️⃣ Verifying what Apache is actually using..."
APACHE_CONFIG=$(sudo apache2ctl -S 2>&1 | grep -i "calc1" || echo "")
if [ -n "$APACHE_CONFIG" ]; then
    echo "   Apache virtual hosts for calc1.ru:"
    echo "$APACHE_CONFIG"
    if echo "$APACHE_CONFIG" | grep -q "calc1.ru-le-ssl.conf"; then
        echo "❌ calc1.ru-le-ssl.conf is still being loaded!"
        echo "   Trying to force disable..."
        sudo rm -f /etc/apache2/sites-enabled/calc1.ru-le-ssl.conf
        sudo systemctl restart apache2
        sleep 2
    fi
else
    echo "⚠️  No calc1.ru configs found in Apache"
fi

# 9. Test connection
echo ""
echo "9️⃣ Testing connection..."
sleep 2
HTTP_CODE=$(curl -k -s -o /dev/null -w "%{http_code}" https://localhost 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "307" ] || [ "$HTTP_CODE" = "302" ]; then
    echo "✅ HTTPS is responding (status: $HTTP_CODE)"
    echo "   Response headers:"
    curl -k -I https://localhost 2>&1 | head -5
else
    echo "❌ HTTPS is not responding correctly (status: $HTTP_CODE)"
    echo "   Checking latest error log..."
    sudo tail -n 5 /var/log/apache2/calc1.ru_ssl_error.log | grep -iE "proxy|connect|3000|3001" || echo "   No specific errors found"
fi

# 10. Test calc1.ru
echo ""
echo "🔟 Testing calc1.ru..."
HTTP_CODE=$(curl -k -s -o /dev/null -w "%{http_code}" https://calc1.ru 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "307" ] || [ "$HTTP_CODE" = "302" ]; then
    echo "✅ calc1.ru is responding (status: $HTTP_CODE)"
else
    echo "❌ calc1.ru is not responding correctly (status: $HTTP_CODE)"
fi

echo ""
echo "============================================"
echo "✅ Fix script completed!"
echo ""
echo "💡 Summary:"
echo "   - Disabled calc1.ru-le-ssl.conf (old Let's Encrypt config)"
echo "   - Only calc1.ru.conf is now enabled (uses port 3001)"
echo ""
echo "💡 If still not working:"
echo "   1. Check: sudo apache2ctl -S | grep calc1"
echo "   2. Verify: curl http://localhost:3001"
echo "   3. Check logs: sudo tail -f /var/log/apache2/calc1.ru_ssl_error.log"

