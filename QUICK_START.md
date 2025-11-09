# ⚡ Быстрый старт для развертывания calc1.ru

## 🚀 Быстрая настройка на сервере

### 1. Подключитесь к серверу по SSH

```bash
ssh user@your-server-ip
```

### 2. Установите Docker и Docker Compose (если еще не установлены)

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

**Важно:** После добавления пользователя в группу docker, перелогиньтесь или выполните:
```bash
newgrp docker
```

### 3. Клонируйте репозиторий

```bash
sudo mkdir -p /var/www/calc1.ru
sudo chown $USER:$USER /var/www/calc1.ru
cd /var/www/calc1.ru
git clone https://github.com/alex1c/calc1.git .
```

### 4. Установите права на скрипты

```bash
chmod +x scripts/*.sh
```

### 5. Запустите приложение

```bash
docker-compose up -d --build
```

### 6. Проверьте работу

```bash
# Проверка статуса контейнера
docker-compose ps

# Просмотр логов
docker-compose logs -f

# Проверка работы приложения
curl http://localhost:3000
```

### 7. Настройте Apache как Reverse Proxy

```bash
# Включите необходимые модули
sudo a2enmod proxy proxy_http rewrite headers

# Скопируйте конфигурацию
sudo cp apache/calc1.ru.conf /etc/apache2/sites-available/calc1.ru.conf

# Включите сайт
sudo a2ensite calc1.ru.conf

# Перезагрузите Apache
sudo systemctl reload apache2
```

### 8. Настройте SSL (опционально, но рекомендуется)

```bash
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d calc1.ru -d www.calc1.ru
```

## 🔄 Настройка автоматического деплоя через GitHub Actions

### 1. Создайте SSH ключ на сервере

```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions
cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
```

### 2. Добавьте приватный ключ в GitHub Secrets

1. Перейдите в репозиторий: https://github.com/alex1c/calc1
2. Settings > Secrets and variables > Actions
3. Добавьте следующие секреты:

   - **SERVER_HOST**: IP адрес или домен вашего сервера
   - **SERVER_USER**: имя пользователя для SSH
   - **SERVER_SSH_KEY**: содержимое файла `~/.ssh/github_actions` (приватный ключ)
   - **SERVER_PORT**: порт SSH (обычно 22, можно не указывать)

### 3. Проверьте работу

Сделайте любой коммит и push в ветку `main`:

```bash
git commit --allow-empty -m "Test deployment"
git push origin main
```

GitHub Actions автоматически задеплоит изменения на сервер.

## 📝 Полезные команды

```bash
# Ручное обновление
cd /var/www/calc1.ru
./scripts/deploy.sh

# Просмотр логов
docker-compose logs -f

# Перезапуск контейнера
docker-compose restart

# Остановка
docker-compose down

# Запуск
docker-compose up -d
```

## 🆘 Решение проблем

### Контейнер не запускается

```bash
# Проверьте логи
docker-compose logs calc1

# Пересоберите с нуля
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### Порт 3000 занят

Измените порт в `docker-compose.yml`:
```yaml
ports:
  - '3001:3000'  # Вместо 3000:3000
```

И обновите конфигурацию Apache соответственно.

### Проблемы с правами

```bash
sudo chown -R $USER:$USER /var/www/calc1.ru
chmod +x scripts/*.sh
```

---

**Подробная документация:** См. [DEPLOYMENT.md](./DEPLOYMENT.md)

