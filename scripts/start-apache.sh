#!/bin/bash
# Quick script to start Apache and verify configuration

set -e

echo "🚀 Starting Apache..."
echo "===================="

# Check if Apache is installed
if ! command -v apache2ctl &> /dev/null; then
    echo "❌ Apache is not installed"
    exit 1
fi

# Check current status
if sudo systemctl is-active --quiet apache2; then
    echo "✅ Apache is already running"
    echo "   Reloading configuration..."
    sudo systemctl reload apache2
    echo "✅ Apache configuration reloaded"
else
    echo "⚠️  Apache is not running"
    echo "   Starting Apache..."
    sudo systemctl start apache2
    echo "✅ Apache started"
fi

# Enable Apache to start on boot
echo "   Enabling Apache to start on boot..."
sudo systemctl enable apache2

# Check status
echo ""
echo "📊 Apache status:"
sudo systemctl status apache2 --no-pager -l | head -10

# Test configuration
echo ""
echo "🔍 Testing Apache configuration..."
if sudo apache2ctl configtest 2>&1 | grep -q "Syntax OK"; then
    echo "✅ Apache configuration is valid"
else
    echo "❌ Apache configuration has errors:"
    sudo apache2ctl configtest 2>&1
    exit 1
fi

# Check if port 443 is listening
echo ""
echo "🔍 Checking if Apache is listening on port 443..."
if netstat -tuln 2>/dev/null | grep -q ':443 ' || ss -tuln 2>/dev/null | grep -q ':443 '; then
    echo "✅ Apache is listening on port 443"
else
    echo "⚠️  Apache is not listening on port 443"
    echo "   This might be normal if SSL is not configured yet"
fi

echo ""
echo "===================="
echo "✅ Apache setup complete!"
echo ""
echo "💡 Test the site:"
echo "   curl -k https://calc1.ru"
echo "   or open in browser: https://calc1.ru"

