#!/bin/bash
# Script to fix Apache configuration

echo "🔧 Fixing Apache configuration for calc1.ru"
echo "============================================="
echo ""

# Check current configuration
echo "1️⃣ Checking current Apache configuration..."
if [ -f /etc/apache2/sites-available/calc1.ru.conf ]; then
    echo "Current configuration:"
    sudo cat /etc/apache2/sites-available/calc1.ru.conf
else
    echo "❌ Configuration file not found!"
    exit 1
fi
echo ""

# Check if DocumentRoot exists in config
if grep -q "DocumentRoot" /etc/apache2/sites-available/calc1.ru.conf; then
    echo "⚠️  WARNING: DocumentRoot found in configuration!"
    echo "   This will cause Apache to show directory listing instead of proxying"
    echo ""
    echo "2️⃣ Creating backup of current configuration..."
    sudo cp /etc/apache2/sites-available/calc1.ru.conf /etc/apache2/sites-available/calc1.ru.conf.backup
    echo "✅ Backup created: calc1.ru.conf.backup"
    echo ""
    
    echo "3️⃣ Updating configuration..."
    # Copy correct configuration from repository
    cd /var/www/calc1.ru
    if [ -f apache/calc1.ru.conf ]; then
        sudo cp apache/calc1.ru.conf /etc/apache2/sites-available/calc1.ru.conf
        echo "✅ Configuration updated from repository"
    else
        echo "❌ Repository configuration not found!"
        echo "   Please update /etc/apache2/sites-available/calc1.ru.conf manually"
        exit 1
    fi
else
    echo "✅ No DocumentRoot found in configuration"
fi
echo ""

# Check for other conflicting configurations
echo "4️⃣ Checking for other site configurations..."
echo "Enabled sites:"
ls -la /etc/apache2/sites-enabled/ | grep -E "\.conf$"
echo ""

# Check if default site is enabled (might conflict)
if [ -L /etc/apache2/sites-enabled/000-default.conf ]; then
    echo "⚠️  WARNING: Default site (000-default.conf) is enabled"
    echo "   This might conflict with calc1.ru"
    read -p "   Disable default site? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        sudo a2dissite 000-default.conf
        echo "✅ Default site disabled"
    fi
fi
echo ""

# Verify configuration syntax
echo "5️⃣ Verifying Apache configuration syntax..."
if sudo apache2ctl configtest 2>&1 | grep -q "Syntax OK"; then
    echo "✅ Configuration syntax is valid"
else
    echo "❌ Configuration has syntax errors:"
    sudo apache2ctl configtest 2>&1
    exit 1
fi
echo ""

# Reload Apache
echo "6️⃣ Reloading Apache..."
sudo systemctl reload apache2
if [ $? -eq 0 ]; then
    echo "✅ Apache reloaded successfully"
else
    echo "❌ Failed to reload Apache"
    exit 1
fi
echo ""

# Test configuration
echo "7️⃣ Testing configuration..."
echo "Testing HTTP (should redirect to HTTPS):"
curl -I http://calc1.ru 2>&1 | head -5
echo ""

echo "Testing HTTPS root (should redirect to /ru):"
curl -I https://calc1.ru 2>&1 | head -5
echo ""

echo "Testing HTTPS /ru (should return 200 OK):"
curl -I https://calc1.ru/ru 2>&1 | head -5
echo ""

echo "============================================="
echo "✅ Configuration fix complete!"
echo ""
echo "💡 If issues persist:"
echo "   1. Check logs: sudo tail -f /var/log/apache2/calc1.ru_ssl_error.log"
echo "   2. Check Docker: docker compose logs calc1"
echo "   3. Verify proxy: curl http://localhost:3001/ru"

