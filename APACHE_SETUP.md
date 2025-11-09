# 🔧 Настройка Apache для calc1.ru

## Проблема
Apache показывает директорию вместо приложения, потому что он настроен на `DocumentRoot`, а не как reverse proxy к Docker контейнеру.

## Решение

### 1. Включите необходимые модули Apache

```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod ssl
sudo systemctl restart apache2
```

### 2. Обновите конфигурацию виртуального хоста

**Замените содержимое файла `/etc/apache2/sites-available/calc1.ru.conf` на:**

```apache
# HTTP Configuration (port 80) - Redirects to HTTPS
<VirtualHost *:80>
	ServerName calc1.ru
	ServerAlias www.calc1.ru

	# Redirect to HTTPS
	RewriteEngine On
	RewriteCond %{SERVER_NAME} =calc1.ru [OR]
	RewriteCond %{SERVER_NAME} =www.calc1.ru
	RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]

	# Logging
	ErrorLog ${APACHE_LOG_DIR}/calc1.ru_error.log
	CustomLog ${APACHE_LOG_DIR}/calc1.ru_access.log combined
</VirtualHost>

# HTTPS Configuration (port 443) - Reverse Proxy to Docker
<IfModule mod_ssl.c>
	<VirtualHost *:443>
		ServerName calc1.ru
		ServerAlias www.calc1.ru

		# SSL Configuration
		SSLEngine on
		Include /etc/letsencrypt/options-ssl-apache.conf
		SSLCertificateFile /etc/letsencrypt/live/calc1.ru/fullchain.pem
		SSLCertificateKeyFile /etc/letsencrypt/live/calc1.ru/privkey.pem

		# Proxy to Docker container running on port 3000
		ProxyPreserveHost On
		ProxyPass / http://localhost:3000/
		ProxyPassReverse / http://localhost:3000/

		# Forward headers for proper request handling
		RequestHeader set X-Forwarded-Proto "https"
		RequestHeader set X-Forwarded-Port "443"
		RequestHeader set X-Real-IP "%{REMOTE_ADDR}s"

		# Security headers
		Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
		Header always set X-Content-Type-Options "nosniff"
		Header always set X-Frame-Options "SAMEORIGIN"
		Header always set X-XSS-Protection "1; mode=block"
		Header always set Referrer-Policy "strict-origin-when-cross-origin"

		# Logging
		ErrorLog ${APACHE_LOG_DIR}/calc1.ru_ssl_error.log
		CustomLog ${APACHE_LOG_DIR}/calc1.ru_ssl_access.log combined
	</VirtualHost>
</IfModule>
```

**Важно:** Убедитесь, что:
- ❌ Удален `DocumentRoot /var/www/calc1.ru`
- ❌ Удален блок `<Directory /var/www/calc1.ru>`
- ✅ Добавлены `ProxyPass` и `ProxyPassReverse` в конфигурацию HTTPS
- ✅ Порт 80 перенаправляет на HTTPS
- ✅ Порт 443 проксирует запросы к Docker контейнеру на порту 3000

### 4. Проверьте конфигурацию и перезагрузите Apache

```bash
# Проверка синтаксиса
sudo apache2ctl configtest

# Если все ОК, перезагрузите Apache
sudo systemctl reload apache2
```

### 5. Проверьте, что Docker контейнер запущен

```bash
# Проверка статуса контейнера
docker compose ps || docker-compose ps

# Если контейнер не запущен, запустите его
cd /var/www/calc1.ru
docker compose up -d || docker-compose up -d

# Проверьте логи
docker compose logs calc1 || docker-compose logs calc1
```

### 6. Проверьте работу приложения

```bash
# Проверка локально (на сервере)
curl http://localhost:3000

# Проверка через Apache
curl http://calc1.ru
```

## 🔍 Отладка

### Если приложение все еще не работает:

1. **Проверьте логи Apache:**
   ```bash
   sudo tail -f /var/log/apache2/calc1.ru_error.log
   ```

2. **Проверьте, что контейнер слушает порт 3000:**
   ```bash
   netstat -tuln | grep 3000
   # или
   ss -tuln | grep 3000
   ```

3. **Проверьте статус контейнера:**
   ```bash
   docker ps | grep calc1
   docker inspect calc1-app | grep -A 5 "Health"
   ```

4. **Проверьте, что модули Apache включены:**
   ```bash
   apache2ctl -M | grep proxy
   ```

## 📝 Быстрая команда для применения изменений

```bash
# Включите модули
sudo a2enmod proxy proxy_http rewrite headers ssl

# Скопируйте правильную конфигурацию из репозитория
cd /var/www/calc1.ru
sudo cp apache/calc1.ru.conf /etc/apache2/sites-available/calc1.ru.conf

# Или отредактируйте вручную (используйте nano или vim)
sudo nano /etc/apache2/sites-available/calc1.ru.conf

# Проверьте синтаксис
sudo apache2ctl configtest

# Если все ОК, перезагрузите Apache
sudo systemctl reload apache2

# Проверьте контейнер
cd /var/www/calc1.ru
docker compose ps || docker-compose ps

# Проверьте работу
curl http://localhost:3000
curl https://calc1.ru
```

## ⚠️ Важные изменения в конфигурации

### Что нужно удалить:
- `DocumentRoot /var/www/calc1.ru`
- Блок `<Directory /var/www/calc1.ru>`
- `Options Indexes FollowSymLinks` (не нужен для proxy)

### Что нужно добавить:
- `ProxyPass / http://localhost:3000/`
- `ProxyPassReverse / http://localhost:3000/`
- `ProxyPreserveHost On`
- Заголовки `X-Forwarded-Proto`, `X-Forwarded-Port`, `X-Real-IP`

