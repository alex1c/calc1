#!/bin/bash
# Check application errors in Docker logs

echo "🔍 Checking application errors..."
echo ""

# Check Docker container logs for errors
echo "1️⃣ Checking Docker container logs for errors..."
cd /var/www/calc1.ru || { echo "❌ Cannot access /var/www/calc1.ru"; exit 1; }
echo "Last 100 lines of logs:"
docker compose logs --tail=100 calc1 2>/dev/null || docker-compose logs --tail=100 calc1 2>/dev/null | grep -E "error|Error|ERROR|exception|Exception|EXCEPTION|failed|Failed|FAILED" -A 5 -B 5
echo ""

# Check for specific pt-BR errors
echo "2️⃣ Checking for pt-BR related errors..."
docker compose logs calc1 2>/dev/null || docker-compose logs calc1 2>/dev/null | grep -i "pt-BR\|pt_BR\|ptBR" -A 10 -B 5 | tail -30
echo ""

# Check for locale errors
echo "3️⃣ Checking for locale errors..."
docker compose logs calc1 2>/dev/null || docker-compose logs calc1 2>/dev/null | grep -i "locale\|translation\|message" -A 5 -B 5 | tail -30
echo ""

# Test the problematic URL
echo "4️⃣ Testing problematic URL..."
echo "Testing: http://localhost:3001/pt-BR/life"
curl -I http://localhost:3001/pt-BR/life 2>&1 | head -10
echo ""

# Check if pt-BR messages exist
echo "5️⃣ Checking if pt-BR messages exist..."
if [ -f /var/www/calc1.ru/messages/pt-BR.json ]; then
    echo "✅ pt-BR.json exists"
    ls -lh /var/www/calc1.ru/messages/pt-BR.json
else
    echo "❌ pt-BR.json NOT found"
fi
echo ""

# Check container status
echo "6️⃣ Container status:"
docker compose ps
echo ""

# Check recent errors in real-time
echo "7️⃣ Monitoring logs for 10 seconds (watch for new errors)..."
timeout 10 docker compose logs -f calc1 2>/dev/null || timeout 10 docker-compose logs -f calc1 2>/dev/null || true
echo ""

echo "========================================"
echo "✅ Error check complete!"
echo ""
echo "💡 Common fixes:"
echo "   1. Check if pt-BR.json exists in messages/"
echo "   2. Restart container: docker compose restart calc1"
echo "   3. Check full logs: docker compose logs calc1"

