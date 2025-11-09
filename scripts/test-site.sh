#!/bin/bash
# Test script to check site accessibility

echo "🌐 Testing calc1.ru site accessibility"
echo "========================================"
echo ""

echo "1️⃣ Testing HTTP (should redirect to HTTPS)..."
curl -I http://calc1.ru 2>&1 | head -10
echo ""

echo "2️⃣ Testing HTTPS..."
curl -I https://calc1.ru 2>&1 | head -10
echo ""

echo "3️⃣ Testing HTTPS with follow redirects..."
curl -L -I https://calc1.ru 2>&1 | head -15
echo ""

echo "4️⃣ Testing root path with locale..."
curl -L -I https://calc1.ru/ru 2>&1 | head -15
echo ""

echo "5️⃣ Testing direct access to localhost:3001..."
curl -I http://localhost:3001 2>&1 | head -10
echo ""

echo "6️⃣ Testing localhost:3001 with follow redirects..."
curl -L -I http://localhost:3001 2>&1 | head -15
echo ""

echo "7️⃣ Checking Apache access log for recent requests..."
if [ -f /var/log/apache2/calc1.ru_ssl_access.log ]; then
    echo "Last 10 access log entries:"
    sudo tail -10 /var/log/apache2/calc1.ru_ssl_access.log
else
    echo "⚠️  Access log not found"
fi
echo ""

echo "8️⃣ Checking Apache error log for recent errors..."
if [ -f /var/log/apache2/calc1.ru_ssl_error.log ]; then
    echo "Last 10 error log entries:"
    sudo tail -10 /var/log/apache2/calc1.ru_ssl_error.log
else
    echo "⚠️  Error log not found or empty"
fi
echo ""

echo "9️⃣ Testing with curl to get actual HTML response..."
echo "First 500 characters of response:"
curl -L -s https://calc1.ru 2>&1 | head -c 500
echo ""
echo ""

echo "========================================"
echo "✅ Test complete!"

