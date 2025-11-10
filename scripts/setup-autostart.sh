#!/bin/bash
# Script to setup autostart for both sites using systemd

set -e

echo "🔧 Setting up autostart for calc1.ru and todolist.su..."
echo "======================================================"

PROJECT_DIR="/var/www/calc1.ru"
CALC1_SERVICE="/etc/systemd/system/calc1.service"
TODOLIST_SERVICE="/etc/systemd/system/todolist.service"

# 1. Check if we're in the right directory
cd "$PROJECT_DIR" || { echo "Error: Directory $PROJECT_DIR not found."; exit 1; }

# 2. Copy systemd service files
echo "1️⃣ Copying systemd service files..."
if [ -f "systemd/calc1.service" ]; then
    sudo cp systemd/calc1.service "$CALC1_SERVICE"
    echo "✅ calc1.service copied"
else
    echo "❌ systemd/calc1.service not found"
    exit 1
fi

if [ -f "systemd/todolist.service" ]; then
    sudo cp systemd/todolist.service "$TODOLIST_SERVICE"
    echo "✅ todolist.service copied"
else
    echo "❌ systemd/todolist.service not found"
    exit 1
fi

# 3. Reload systemd
echo ""
echo "2️⃣ Reloading systemd daemon..."
sudo systemctl daemon-reload
echo "✅ Systemd reloaded"

# 4. Enable services
echo ""
echo "3️⃣ Enabling services for autostart..."
sudo systemctl enable calc1.service
sudo systemctl enable todolist.service
echo "✅ Services enabled"

# 5. Start services
echo ""
echo "4️⃣ Starting services..."
sudo systemctl start calc1.service
sudo systemctl start todolist.service
echo "✅ Services started"

# 6. Check status
echo ""
echo "5️⃣ Checking service status..."
echo "   calc1.service:"
sudo systemctl status calc1.service --no-pager -l | head -10 || true
echo ""
echo "   todolist.service:"
sudo systemctl status todolist.service --no-pager -l | head -10 || true

# 7. Verify containers are running
echo ""
echo "6️⃣ Verifying containers are running..."
sleep 5
if docker ps | grep -q "calc1-app"; then
    echo "✅ calc1-app container is running"
else
    echo "⚠️  calc1-app container is not running"
fi

TODOLIST_CONTAINERS=$(docker ps --format "{{.Names}}" | grep -i -E "todolist|eisenhower|matrix" || echo "")
if [ -n "$TODOLIST_CONTAINERS" ]; then
    echo "✅ todolist containers are running:"
    echo "$TODOLIST_CONTAINERS"
else
    echo "⚠️  todolist containers are not running"
fi

echo ""
echo "======================================================"
echo "✅ Autostart setup completed!"
echo ""
echo "💡 Service management commands:"
echo "   Start:   sudo systemctl start calc1.service todolist.service"
echo "   Stop:    sudo systemctl stop calc1.service todolist.service"
echo "   Restart: sudo systemctl restart calc1.service todolist.service"
echo "   Status:  sudo systemctl status calc1.service todolist.service"
echo ""
echo "💡 Services will automatically start on server boot"

