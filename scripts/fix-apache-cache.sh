#!/bin/bash
# Script to fix Apache configuration cache issue

set -e

APACHE_AVAILABLE="/etc/apache2/sites-available/calc1.ru.conf"
APACHE_ENABLED="/etc/apache2/sites-enabled/calc1.ru.conf"

echo "🔧 Fixing Apache configuration cache issue..."
echo "=============================================="

# 1. Check if enabled config is a symlink or actual file
echo "1️⃣ Checking enabled site configuration..."
if [ -L "$APACHE_ENABLED" ]; then
    echo "✅ Enabled config is a symlink (correct)"
    echo "   Symlink points to: $(readlink -f $APACHE_ENABLED)"
elif [ -f "$APACHE_ENABLED" ]; then
    echo "⚠️  Enabled config is a file (not a symlink)"
    echo "   This might be the problem - there's a separate file in sites-enabled"
    echo "   Checking if it differs from sites-available..."
    if ! diff -q "$APACHE_AVAILABLE" "$APACHE_ENABLED" > /dev/null 2>&1; then
        echo "❌ Files differ! Enabled config has different content"
        echo "   Showing differences:"
        diff "$APACHE_AVAILABLE" "$APACHE_ENABLED" || true
        echo ""
        echo "   Backing up enabled config and replacing with symlink..."
        sudo mv "$APACHE_ENABLED" "${APACHE_ENABLED}.backup.$(date +%Y%m%d_%H%M%S)"
        sudo ln -s "$APACHE_AVAILABLE" "$APACHE_ENABLED"
        echo "✅ Replaced with symlink"
    else
        echo "✅ Files are identical"
    fi
else
    echo "❌ Enabled config not found"
    echo "   Creating symlink..."
    sudo ln -s "$APACHE_AVAILABLE" "$APACHE_ENABLED"
    echo "✅ Symlink created"
fi

# 2. Check for other calc1.ru configs
echo ""
echo "2️⃣ Checking for other calc1.ru configurations..."
OTHER_CONFIGS=$(find /etc/apache2 -name "*calc1*" -type f 2>/dev/null | grep -v ".backup" || true)
if [ -n "$OTHER_CONFIGS" ]; then
    echo "⚠️  Found other calc1.ru configs:"
    echo "$OTHER_CONFIGS"
    for config in $OTHER_CONFIGS; do
        echo "   Checking $config for ProxyPass:"
        sudo grep -i "ProxyPass" "$config" || echo "   No ProxyPass found"
    done
else
    echo "✅ No other calc1.ru configs found"
fi

# 3. Verify current ProxyPass in enabled config
echo ""
echo "3️⃣ Verifying ProxyPass in enabled config..."
ENABLED_CONFIG=$(readlink -f "$APACHE_ENABLED" 2>/dev/null || echo "$APACHE_ENABLED")
echo "   Checking: $ENABLED_CONFIG"
if sudo grep -q "ProxyPass / http://localhost:3001/" "$ENABLED_CONFIG"; then
    echo "✅ ProxyPass is configured for port 3001"
    sudo grep -i "ProxyPass" "$ENABLED_CONFIG"
else
    echo "❌ ProxyPass is NOT configured for port 3001"
    if sudo grep -q "ProxyPass / http://localhost:3000/" "$ENABLED_CONFIG"; then
        echo "❌ Found ProxyPass for port 3000 (WRONG)"
        echo "   Fixing..."
        sudo sed -i 's|ProxyPass / http://localhost:3000/|ProxyPass / http://localhost:3001/|g' "$ENABLED_CONFIG"
        sudo sed -i 's|ProxyPassReverse / http://localhost:3000/|ProxyPassReverse / http://localhost:3001/|g' "$ENABLED_CONFIG"
        echo "✅ Fixed"
    else
        echo "❌ No ProxyPass found at all"
        echo "   Adding ProxyPass directives..."
        sudo sed -i '/SSLCertificateKeyFile/a\
\
        # Proxy to Docker container running on port 3001\
        ProxyPreserveHost On\
        ProxyPass / http://localhost:3001/\
        ProxyPassReverse / http://localhost:3001/' "$ENABLED_CONFIG"
        echo "✅ Added"
    fi
fi

# 4. Check Apache config cache
echo ""
echo "4️⃣ Clearing Apache configuration cache..."
# Apache doesn't have a traditional cache, but we'll restart it completely
sudo systemctl stop apache2
sleep 2
sudo systemctl start apache2
sleep 3

if sudo systemctl is-active --quiet apache2; then
    echo "✅ Apache restarted"
else
    echo "❌ Apache failed to start"
    sudo systemctl status apache2 --no-pager -l | head -15
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

# 6. Verify what Apache is actually using
echo ""
echo "6️⃣ Verifying what Apache is actually using..."
echo "   Checking running Apache processes..."
APACHE_PID=$(pgrep -f "apache2" | head -1)
if [ -n "$APACHE_PID" ]; then
    echo "   Apache PID: $APACHE_PID"
    echo "   Checking loaded configuration..."
    sudo apache2ctl -S 2>&1 | grep -i calc1 || echo "   calc1.ru not found in virtual hosts"
fi

# 7. Test connection
echo ""
echo "7️⃣ Testing connection..."
sleep 2
HTTP_CODE=$(curl -k -s -o /dev/null -w "%{http_code}" https://localhost 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "307" ] || [ "$HTTP_CODE" = "302" ]; then
    echo "✅ HTTPS is responding (status: $HTTP_CODE)"
else
    echo "❌ HTTPS is not responding correctly (status: $HTTP_CODE)"
    echo "   Checking latest error log..."
    sudo tail -n 5 /var/log/apache2/calc1.ru_ssl_error.log | grep -iE "proxy|connect|3000|3001" || echo "   No specific errors found"
fi

# 8. Show final configuration
echo ""
echo "8️⃣ Final configuration check:"
echo "   Enabled config file:"
ENABLED_FILE=$(readlink -f "$APACHE_ENABLED" 2>/dev/null || echo "$APACHE_ENABLED")
echo "   $ENABLED_FILE"
echo "   ProxyPass configuration:"
sudo grep -i -A 1 -B 1 "ProxyPass" "$ENABLED_FILE" || echo "   No ProxyPass found"

echo ""
echo "=============================================="
echo "✅ Fix script completed!"
echo ""
echo "💡 If still getting 503:"
echo "   1. Check: sudo apache2ctl -S | grep calc1"
echo "   2. Check: sudo grep -r '3000' /etc/apache2/sites-enabled/"
echo "   3. Verify container: curl http://localhost:3001"
echo "   4. Check all configs: find /etc/apache2 -name '*calc1*' -exec grep -H 'ProxyPass' {} \\;"

