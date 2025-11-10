#!/bin/bash
# Script to completely fix Apache configuration for calc1.ru

set -e

APACHE_CONF="/etc/apache2/sites-available/calc1.ru.conf"
PROJECT_DIR="/var/www/calc1.ru"
REPO_CONF="$PROJECT_DIR/apache/calc1.ru.conf"

echo "🔧 Completely fixing Apache configuration..."
echo "============================================"

# 1. Check if repo config exists
echo "1️⃣ Checking repository Apache config..."
if [ -f "$REPO_CONF" ]; then
    echo "✅ Repository config exists: $REPO_CONF"
    echo "   Checking ProxyPass in repo config:"
    grep -i "ProxyPass" "$REPO_CONF" || echo "   No ProxyPass found in repo config"
else
    echo "❌ Repository config NOT found: $REPO_CONF"
    exit 1
fi

# 2. Backup current Apache config
echo ""
echo "2️⃣ Backing up current Apache config..."
if [ -f "$APACHE_CONF" ]; then
    sudo cp "$APACHE_CONF" "${APACHE_CONF}.backup.$(date +%Y%m%d_%H%M%S)"
    echo "✅ Backup created"
else
    echo "⚠️  Current config not found, will create new one"
fi

# 3. Copy correct config from repository
echo ""
echo "3️⃣ Copying correct config from repository..."
sudo cp "$REPO_CONF" "$APACHE_CONF"
echo "✅ Config copied"

# 4. Verify ProxyPass is in the config
echo ""
echo "4️⃣ Verifying ProxyPass configuration..."
if sudo grep -q "ProxyPass / http://localhost:3001/" "$APACHE_CONF"; then
    echo "✅ ProxyPass is configured for port 3001"
    sudo grep -i "ProxyPass" "$APACHE_CONF"
else
    echo "❌ ProxyPass NOT found in config"
    echo "   Adding ProxyPass directives..."
    
    # Find the HTTPS VirtualHost section and add ProxyPass
    sudo sed -i '/<VirtualHost \*:443>/,/<\/VirtualHost>/ {
        /SSLCertificateKeyFile/a\
\
        # Proxy to Docker container running on port 3001\
        ProxyPreserveHost On\
        ProxyPass / http://localhost:3001/\
        ProxyPassReverse / http://localhost:3001/
    }' "$APACHE_CONF"
    
    echo "✅ ProxyPass directives added"
fi

# 5. Ensure ProxyPreserveHost is set
echo ""
echo "5️⃣ Checking ProxyPreserveHost..."
if ! sudo grep -q "ProxyPreserveHost On" "$APACHE_CONF"; then
    echo "   Adding ProxyPreserveHost..."
    sudo sed -i '/ProxyPass / i\        ProxyPreserveHost On' "$APACHE_CONF"
    echo "✅ ProxyPreserveHost added"
else
    echo "✅ ProxyPreserveHost is set"
fi

# 6. Ensure required Apache modules are enabled
echo ""
echo "6️⃣ Ensuring required Apache modules are enabled..."
sudo a2enmod proxy proxy_http rewrite headers ssl 2>/dev/null || true
echo "✅ Modules enabled"

# 7. Enable site
echo ""
echo "7️⃣ Ensuring calc1.ru site is enabled..."
sudo a2ensite calc1.ru.conf 2>/dev/null || true
echo "✅ Site enabled"

# 8. Test Apache configuration syntax
echo ""
echo "8️⃣ Testing Apache configuration syntax..."
if sudo apache2ctl configtest 2>&1 | grep -q "Syntax OK"; then
    echo "✅ Apache configuration syntax is OK"
else
    echo "❌ Apache configuration has errors:"
    sudo apache2ctl configtest 2>&1
    echo ""
    echo "   Showing current config:"
    sudo cat "$APACHE_CONF"
    exit 1
fi

# 9. Show final configuration
echo ""
echo "9️⃣ Final ProxyPass configuration:"
sudo grep -i -A 2 -B 2 "ProxyPass" "$APACHE_CONF" || echo "   No ProxyPass found (this is a problem!)"

# 10. Restart Apache (not reload, to ensure clean state)
echo ""
echo "🔟 Restarting Apache..."
sudo systemctl restart apache2
sleep 3
if sudo systemctl is-active --quiet apache2; then
    echo "✅ Apache restarted successfully"
else
    echo "❌ Apache failed to restart"
    sudo systemctl status apache2 --no-pager -l | head -15
    exit 1
fi

# 11. Test connection
echo ""
echo "1️⃣1️⃣ Testing connection..."
sleep 2
HTTP_CODE=$(curl -k -s -o /dev/null -w "%{http_code}" https://localhost 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "307" ] || [ "$HTTP_CODE" = "302" ]; then
    echo "✅ HTTPS is responding (status: $HTTP_CODE)"
    echo "   Response headers:"
    curl -k -I https://localhost 2>&1 | head -5
else
    echo "❌ HTTPS is not responding correctly (status: $HTTP_CODE)"
    echo "   Checking Apache error log..."
    sudo tail -n 10 /var/log/apache2/calc1.ru_ssl_error.log | grep -iE "proxy|connect|refused|503" || echo "   No specific errors found"
fi

# 12. Test calc1.ru
echo ""
echo "1️⃣2️⃣ Testing calc1.ru..."
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
echo "💡 If still not working:"
echo "   1. Check full config: sudo cat $APACHE_CONF"
echo "   2. Check logs: sudo tail -f /var/log/apache2/calc1.ru_ssl_error.log"
echo "   3. Verify container: curl http://localhost:3001"
echo "   4. Check enabled sites: ls -la /etc/apache2/sites-enabled/"

