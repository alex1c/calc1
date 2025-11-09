#!/bin/bash
# Check Apache configuration and proxy setup

echo "🔍 Checking Apache configuration..."
echo ""

# Check if Apache is running
echo "1️⃣ Checking Apache status..."
if systemctl is-active --quiet apache2; then
    echo "✅ Apache is running"
else
    echo "❌ Apache is NOT running"
    echo "Starting Apache..."
    sudo systemctl start apache2
    sleep 2
fi
echo ""

# Check Apache configuration
echo "2️⃣ Checking Apache configuration file..."
if [ -f /etc/apache2/sites-available/calc1.ru.conf ]; then
    echo "Configuration file exists"
    echo ""
    echo "Checking for DocumentRoot (should NOT be present):"
    if grep -q "DocumentRoot" /etc/apache2/sites-available/calc1.ru.conf; then
        echo "❌ DocumentRoot found - this is the problem!"
        echo "Lines with DocumentRoot:"
        grep -n "DocumentRoot" /etc/apache2/sites-available/calc1.ru.conf
    else
        echo "✅ No DocumentRoot found"
    fi
    echo ""
    echo "Checking for ProxyPass (should be present):"
    if grep -q "ProxyPass" /etc/apache2/sites-available/calc1.ru.conf; then
        echo "✅ ProxyPass found"
        grep -n "ProxyPass" /etc/apache2/sites-available/calc1.ru.conf
    else
        echo "❌ ProxyPass NOT found - this is the problem!"
    fi
    echo ""
    echo "Checking for Directory block (should NOT be present):"
    if grep -q "<Directory" /etc/apache2/sites-available/calc1.ru.conf; then
        echo "❌ Directory block found - this is the problem!"
        grep -n "<Directory" /etc/apache2/sites-available/calc1.ru.conf
    else
        echo "✅ No Directory block found"
    fi
else
    echo "❌ Configuration file not found!"
fi
echo ""

# Check if site is enabled
echo "3️⃣ Checking if site is enabled..."
if [ -L /etc/apache2/sites-enabled/calc1.ru.conf ] || [ -f /etc/apache2/sites-enabled/calc1.ru.conf ]; then
    echo "✅ Site is enabled"
else
    echo "❌ Site is NOT enabled"
    echo "Run: sudo a2ensite calc1.ru.conf"
fi
echo ""

# Check Apache syntax
echo "4️⃣ Checking Apache configuration syntax..."
if sudo apache2ctl configtest 2>&1 | grep -q "Syntax OK"; then
    echo "✅ Apache configuration syntax is valid"
else
    echo "❌ Apache configuration has syntax errors:"
    sudo apache2ctl configtest 2>&1
fi
echo ""

# Check Apache modules
echo "5️⃣ Checking required Apache modules..."
REQUIRED_MODULES=("proxy_module" "proxy_http_module" "rewrite_module" "headers_module" "ssl_module")
for module in "${REQUIRED_MODULES[@]}"; do
    if apache2ctl -M 2>/dev/null | grep -q "$module"; then
        echo "✅ $module is enabled"
    else
        echo "❌ $module is NOT enabled"
        echo "   Run: sudo a2enmod ${module/_module/}"
    fi
done
echo ""

# Test localhost:3001
echo "6️⃣ Testing localhost:3001..."
if curl -f -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Application responds on localhost:3001"
    curl -I http://localhost:3001 2>&1 | head -3
else
    echo "❌ Application does NOT respond on localhost:3001"
fi
echo ""

# Test through Apache
echo "7️⃣ Testing through Apache (HTTPS)..."
if curl -k -f -s https://localhost > /dev/null 2>&1; then
    echo "✅ Apache responds on HTTPS"
    curl -k -I https://localhost 2>&1 | head -5
else
    echo "❌ Apache does NOT respond on HTTPS"
fi
echo ""

# Check Apache error log
echo "8️⃣ Last 10 lines of Apache SSL error log..."
if [ -f /var/log/apache2/calc1.ru_ssl_error.log ]; then
    sudo tail -10 /var/log/apache2/calc1.ru_ssl_error.log
else
    echo "⚠️  Error log file not found"
fi
echo ""

# Check Apache access log
echo "9️⃣ Last 5 lines of Apache SSL access log..."
if [ -f /var/log/apache2/calc1.ru_ssl_access.log ]; then
    sudo tail -5 /var/log/apache2/calc1.ru_ssl_access.log
else
    echo "⚠️  Access log file not found"
fi
echo ""

echo "========================================"
echo "✅ Diagnostic complete!"
echo ""
echo "💡 If DocumentRoot or Directory found:"
echo "   1. sudo nano /etc/apache2/sites-available/calc1.ru.conf"
echo "   2. Remove DocumentRoot and Directory blocks"
echo "   3. Ensure ProxyPass is present"
echo "   4. sudo apache2ctl configtest"
echo "   5. sudo systemctl reload apache2"

