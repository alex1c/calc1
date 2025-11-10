#!/bin/bash
# Script to check all Docker services and Apache connectivity

set -e

echo "🔍 Checking all Docker services and Apache connectivity..."
echo "========================================================="

# 1. Check Docker service status
echo ""
echo "1️⃣ Checking Docker service status..."
if systemctl is-active --quiet docker; then
    echo "✅ Docker service is running"
else
    echo "❌ Docker service is NOT running"
    echo "   Starting Docker..."
    sudo systemctl start docker
    sleep 3
fi

# 2. Check all Docker containers
echo ""
echo "2️⃣ Checking all Docker containers..."
docker ps -a || echo "❌ Cannot list Docker containers"

# 3. Check calc1.ru container
echo ""
echo "3️⃣ Checking calc1.ru container (calc1-app)..."
if docker ps | grep -q "calc1-app"; then
    echo "✅ calc1-app container is running"
    docker ps | grep calc1-app
    echo "   Container health:"
    docker inspect calc1-app --format='Status: {{.State.Status}} | Health: {{.State.Health.Status}}' 2>/dev/null || echo "   Health check not available"
else
    echo "❌ calc1-app container is NOT running"
    echo "   Attempting to start..."
    cd /var/www/calc1.ru 2>/dev/null && docker compose up -d 2>/dev/null || echo "   Failed to start calc1-app"
fi

# 4. Check port 3001 (calc1.ru)
echo ""
echo "4️⃣ Checking port 3001 (calc1.ru)..."
if netstat -tuln 2>/dev/null | grep -q ':3001 ' || ss -tuln 2>/dev/null | grep -q ':3001 '; then
    echo "✅ Port 3001 is listening"
    netstat -tuln 2>/dev/null | grep ':3001 ' || ss -tuln 2>/dev/null | grep ':3001 '
    echo "   Testing connection..."
    if curl -f -s http://localhost:3001 > /dev/null 2>&1; then
        echo "✅ Application responds on http://localhost:3001"
    else
        echo "❌ Application does NOT respond on http://localhost:3001"
    fi
else
    echo "❌ Port 3001 is NOT listening"
fi

# 5. Check port 3000 (todolist.su)
echo ""
echo "5️⃣ Checking port 3000 (todolist.su)..."
if netstat -tuln 2>/dev/null | grep -q ':3000 ' || ss -tuln 2>/dev/null | grep -q ':3000 '; then
    echo "✅ Port 3000 is listening"
    netstat -tuln 2>/dev/null | grep ':3000 ' || ss -tuln 2>/dev/null | grep ':3000 '
    echo "   Testing connection..."
    if curl -f -s http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ Application responds on http://localhost:3000"
    else
        echo "❌ Application does NOT respond on http://localhost:3000"
    fi
else
    echo "❌ Port 3000 is NOT listening"
fi

# 6. Check Apache connectivity to ports
echo ""
echo "6️⃣ Testing Apache user (www-data) connectivity..."
if sudo -u www-data curl -f -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ Apache can connect to http://localhost:3001 (calc1.ru)"
else
    echo "❌ Apache CANNOT connect to http://localhost:3001 (calc1.ru)"
fi

if sudo -u www-data curl -f -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Apache can connect to http://localhost:3000 (todolist.su)"
else
    echo "❌ Apache CANNOT connect to http://localhost:3000 (todolist.su)"
fi

# 7. Check Apache error logs
echo ""
echo "7️⃣ Checking Apache error logs..."
if [ -f "/var/log/apache2/calc1.ru_ssl_error.log" ]; then
    echo "   calc1.ru SSL errors (last 10 lines):"
    sudo tail -n 10 /var/log/apache2/calc1.ru_ssl_error.log | grep -iE "proxy|connect|refused|503" || echo "   No proxy errors found"
fi

if [ -f "/var/log/apache2/todolist.su_ssl_error.log" ]; then
    echo "   todolist.su SSL errors (last 10 lines):"
    sudo tail -n 10 /var/log/apache2/todolist.su_ssl_error.log | grep -iE "proxy|connect|refused|503" || echo "   No proxy errors found"
fi

# 8. Check Docker network
echo ""
echo "8️⃣ Checking Docker network..."
docker network ls
echo "   Checking if containers are on the same network..."
CALC1_NETWORK=$(docker inspect calc1-app --format='{{range $net, $conf := .NetworkSettings.Networks}}{{$net}}{{end}}' 2>/dev/null || echo "unknown")
echo "   calc1-app network: $CALC1_NETWORK"

# 9. Check firewall/iptables
echo ""
echo "9️⃣ Checking firewall rules..."
if command -v ufw &> /dev/null; then
    echo "   UFW status:"
    sudo ufw status | head -5
fi

# 10. Check if localhost is accessible
echo ""
echo "🔟 Testing localhost connectivity..."
if curl -f -s http://127.0.0.1:3001 > /dev/null 2>&1; then
    echo "✅ Port 3001 accessible via 127.0.0.1"
else
    echo "❌ Port 3001 NOT accessible via 127.0.0.1"
fi

if curl -f -s http://127.0.0.1:3000 > /dev/null 2>&1; then
    echo "✅ Port 3000 accessible via 127.0.0.1"
else
    echo "❌ Port 3000 NOT accessible via 127.0.0.1"
fi

# 11. Check system resources
echo ""
echo "1️⃣1️⃣ Checking system resources..."
echo "   CPU load:"
uptime
echo "   Memory usage:"
free -h | head -2
echo "   Disk usage:"
df -h / | tail -1

# 12. Recommendations
echo ""
echo "========================================================="
echo "✅ Diagnostic complete!"
echo ""
echo "💡 Common fixes:"
echo "   1. If containers are not running:"
echo "      cd /var/www/calc1.ru && docker compose up -d"
echo "      cd /var/www/todolist.su && docker compose up -d"
echo ""
echo "   2. If ports are not listening, check docker-compose.yml port mappings"
echo ""
echo "   3. If Apache cannot connect, check:"
echo "      - Firewall rules: sudo ufw status"
echo "      - AppArmor: sudo aa-status"
echo "      - SELinux: getenforce"
echo ""
echo "   4. Restart Apache: sudo systemctl restart apache2"
echo ""
echo "   5. Check Docker logs:"
echo "      docker compose logs calc1"
echo "      docker compose logs <todolist-service>"

