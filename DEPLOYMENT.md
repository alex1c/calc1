# 🚀 Инструкция по развертыванию calc1.ru

Это руководство описывает процесс настройки автоматического деплоя приложения calc1 на Ubuntu сервер с использованием Docker и GitHub Actions.

## 📋 Требования

- Ubuntu сервер с установленным Docker и Docker Compose
- Git установлен на сервере
- SSH доступ к серверу
- Домен calc1.ru настроен и указывает на сервер

## 🔧 Настройка сервера

### 1. Установка Docker и Docker Compose

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Добавление пользователя в группу docker
sudo usermod -aG docker $USER

# Установка Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Проверка установки
docker --version
docker-compose --version
```

### 2. Клонирование репозитория

```bash
# Создание директории
sudo mkdir -p /var/www/calc1.ru
sudo chown $USER:$USER /var/www/calc1.ru

# Клонирование репозитория
cd /var/www/calc1.ru
git clone https://github.com/alex1c/calc1.git .

# Установка прав на скрипты
chmod +x scripts/*.sh
```

### 3. Настройка переменных окружения (если необходимо)

```bash
# Создание .env файла (если нужны переменные окружения)
cp .env.example .env
nano .env
```

## 🐳 Первый запуск с Docker

```bash
cd /var/www/calc1.ru

# Сборка и запуск контейнера
docker-compose up -d --build

# Проверка статуса
docker-compose ps

# Просмотр логов
docker-compose logs -f
```

## 🔄 Настройка автоматического деплоя

### Вариант 1: GitHub Actions (Рекомендуется)

1. **Настройка GitHub Secrets:**

   Перейдите в настройки репозитория: `Settings > Secrets and variables > Actions`

   Добавьте следующие секреты:

   - `SERVER_HOST` - IP адрес или домен вашего сервера
   - `SERVER_USER` - имя пользователя для SSH (обычно `root` или ваш пользователь)
   - `SERVER_SSH_KEY` - приватный SSH ключ для доступа к серверу
   - `SERVER_PORT` - порт SSH (по умолчанию 22, можно не указывать)

2. **Генерация SSH ключа (если еще нет):**

   ```bash
   # На сервере
   ssh-keygen -t ed25519 -C "github-actions"
   
   # Добавление публичного ключа в authorized_keys
   cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys
   
   # Копирование приватного ключа для GitHub Secrets
   cat ~/.ssh/id_ed25519
   ```

3. **Проверка работы:**

   После настройки секретов, каждый push в ветку `main` будет автоматически деплоить приложение на сервер.

### Вариант 2: GitHub Webhook

1. **Установка webhook сервера (опционально):**

   ```bash
   # Установка webhook сервера
   sudo apt install webhook
   ```

2. **Создание конфигурации webhook:**

   Создайте файл `/etc/webhook/hooks.json`:

   ```json
   [
     {
       "id": "calc1-deploy",
       "execute-command": "/var/www/calc1.ru/scripts/webhook-deploy.sh",
       "command-working-directory": "/var/www/calc1.ru",
       "response-message": "Deployment started"
     }
   ]
   ```

3. **Настройка GitHub Webhook:**

   - Перейдите в `Settings > Webhooks > Add webhook`
   - URL: `http://your-server-ip:9000/hooks/calc1-deploy`
   - Content type: `application/json`
   - Events: `Just the push event`

## 🌐 Настройка Apache как Reverse Proxy

Поскольку у вас уже настроен Apache, можно использовать его как reverse proxy для Docker контейнера:

### 1. Включение необходимых модулей Apache

```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
sudo a2enmod headers
```

### 2. Создание конфигурации виртуального хоста

Создайте файл `/etc/apache2/sites-available/calc1.ru.conf`:

```apache
<VirtualHost *:80>
    ServerName calc1.ru
    ServerAlias www.calc1.ru

    # Proxy to Docker container
    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/

    # Headers
    RequestHeader set X-Forwarded-Proto "http"
    RequestHeader set X-Forwarded-Port "80"

    # Logging
    ErrorLog ${APACHE_LOG_DIR}/calc1.ru_error.log
    CustomLog ${APACHE_LOG_DIR}/calc1.ru_access.log combined
</VirtualHost>
```

### 3. Активация сайта

```bash
sudo a2ensite calc1.ru.conf
sudo systemctl reload apache2
```

### 4. Настройка SSL (Let's Encrypt)

```bash
# Установка Certbot
sudo apt install certbot python3-certbot-apache

# Получение сертификата
sudo certbot --apache -d calc1.ru -d www.calc1.ru

# Автоматическое обновление (уже настроено в cron)
```

После настройки SSL, обновите конфигурацию Apache для поддержки HTTPS:

```apache
<VirtualHost *:443>
    ServerName calc1.ru
    ServerAlias www.calc1.ru

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/calc1.ru/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/calc1.ru/privkey.pem

    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/

    RequestHeader set X-Forwarded-Proto "https"
    RequestHeader set X-Forwarded-Port "443"
</VirtualHost>
```

## 📝 Полезные команды

### Управление контейнером

```bash
# Запуск
docker-compose up -d

# Остановка
docker-compose down

# Перезапуск
docker-compose restart

# Просмотр логов
docker-compose logs -f

# Просмотр статуса
docker-compose ps
```

### Обновление вручную

```bash
cd /var/www/calc1.ru
./scripts/deploy.sh
```

### Просмотр логов

```bash
# Логи контейнера
docker-compose logs -f calc1

# Логи деплоя (если используется webhook)
tail -f /var/log/calc1-deploy.log
```

### Очистка Docker

```bash
# Удаление неиспользуемых образов
docker system prune -a

# Удаление всех остановленных контейнеров
docker container prune
```

## 🔍 Мониторинг и отладка

### Проверка здоровья контейнера

```bash
# Проверка статуса
docker ps | grep calc1

# Проверка здоровья
docker inspect calc1-app | grep Health -A 10
```

### Проверка работы приложения

```bash
# Проверка локально
curl http://localhost:3000

# Проверка через Apache
curl http://calc1.ru
```

## 🛠️ Решение проблем

### Контейнер не запускается

```bash
# Просмотр логов
docker-compose logs calc1

# Проверка конфигурации
docker-compose config

# Пересборка с нуля
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### Проблемы с портами

```bash
# Проверка занятых портов
sudo netstat -tulpn | grep 3000

# Изменение порта в docker-compose.yml
# Измените '3000:3000' на '3001:3000' если порт занят
```

### Проблемы с правами доступа

```bash
# Исправление прав на файлы
sudo chown -R $USER:$USER /var/www/calc1.ru
chmod +x scripts/*.sh
```

## 📚 Дополнительные ресурсы

- [Docker Documentation](https://docs.docker.com/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Actions](https://docs.github.com/en/actions)

## 🔐 Безопасность

- Регулярно обновляйте Docker образы
- Используйте сильные SSH ключи
- Настройте firewall (UFW)
- Регулярно проверяйте логи на подозрительную активность
- Используйте HTTPS для всех соединений

---

**Примечание:** После первого деплоя, все последующие обновления будут происходить автоматически при push в ветку `main` на GitHub.

