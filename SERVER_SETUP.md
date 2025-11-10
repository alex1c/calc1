# 🚀 Настройка сервера для calc1.ru и todolist.su

## 📋 Обзор

На сервере работают два сайта:
- **calc1.ru** - работает на порту **3001** (Docker контейнер `calc1-app`)
- **todolist.su** - работает на порту **3000** (Docker контейнеры в `/var/www/eisenhower-matrix`)

Оба сайта проксируются через Apache на HTTPS (порт 443).

## 🏗️ Структура директорий

```
/var/www/
├── calc1.ru/              # calc1.ru проект
│   ├── docker-compose.yml
│   └── ...
└── eisenhower-matrix/      # todolist.su проект
    ├── docker-compose.yml
    └── ...
```

## 🔧 Первоначальная настройка

### 1. Установка Docker и Docker Compose

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Добавление пользователя в группу docker
sudo usermod -aG docker $USER
newgrp docker

# Установка Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Настройка calc1.ru

```bash
# Клонирование репозитория
sudo mkdir -p /var/www/calc1.ru
sudo chown $USER:$USER /var/www/calc1.ru
cd /var/www/calc1.ru
git clone https://github.com/alex1c/calc1.git .

# Запуск контейнера
docker compose up -d --build
```

### 3. Настройка todolist.su

```bash
# Переход в директорию todolist.su
cd /var/www/eisenhower-matrix

# Запуск контейнеров
docker compose up -d
```

### 4. Настройка Apache

```bash
# Включение необходимых модулей
sudo a2enmod proxy proxy_http rewrite headers ssl

# Копирование конфигураций
sudo cp /var/www/calc1.ru/apache/calc1.ru.conf /etc/apache2/sites-available/calc1.ru.conf

# Включение сайтов
sudo a2ensite calc1.ru.conf
sudo a2ensite todolist.su.conf  # если конфиг уже существует

# Проверка конфигурации
sudo apache2ctl configtest

# Запуск Apache
sudo systemctl start apache2
sudo systemctl enable apache2
```

## 🔄 Автозапуск при старте сервера

### Вариант 1: Docker Compose restart policy (уже настроено)

В `docker-compose.yml` уже установлено `restart: unless-stopped`, что означает автоматический запуск контейнеров при старте Docker.

### Вариант 2: Systemd сервисы (рекомендуется)

Создайте systemd сервисы для гарантированного запуска:

#### Сервис для calc1.ru

```bash
sudo nano /etc/systemd/system/calc1.service
```

Содержимое:

```ini
[Unit]
Description=Calc1.ru Docker Compose Service
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/var/www/calc1.ru
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

#### Сервис для todolist.su

```bash
sudo nano /etc/systemd/system/todolist.service
```

Содержимое:

```ini
[Unit]
Description=Todolist.su Docker Compose Service
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/var/www/eisenhower-matrix
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

#### Активация сервисов

```bash
# Перезагрузка systemd
sudo systemctl daemon-reload

# Включение автозапуска
sudo systemctl enable calc1.service
sudo systemctl enable todolist.service

# Запуск сервисов
sudo systemctl start calc1.service
sudo systemctl start todolist.service

# Проверка статуса
sudo systemctl status calc1.service
sudo systemctl status todolist.service
```

## 🛠️ Управление сайтами

### Запуск обоих сайтов

```bash
# Использовать скрипт
cd /var/www/calc1.ru
bash scripts/fix-both-sites.sh

# Или вручную
cd /var/www/calc1.ru && docker compose up -d
cd /var/www/eisenhower-matrix && docker compose up -d
```

### Остановка обоих сайтов

```bash
cd /var/www/calc1.ru && docker compose down
cd /var/www/eisenhower-matrix && docker compose down
```

### Перезапуск обоих сайтов

```bash
cd /var/www/calc1.ru && docker compose restart
cd /var/www/eisenhower-matrix && docker compose restart
```

### Проверка статуса

```bash
# Все контейнеры
docker ps

# Контейнеры calc1.ru
cd /var/www/calc1.ru && docker compose ps

# Контейнеры todolist.su
cd /var/www/eisenhower-matrix && docker compose ps

# Проверка портов
netstat -tuln | grep -E "3000|3001|5000"
```

## 🔍 Диагностика проблем

### Если сайты не работают после перезагрузки

```bash
# 1. Проверить Docker
sudo systemctl status docker

# 2. Проверить контейнеры
docker ps -a

# 3. Запустить оба сайта
cd /var/www/calc1.ru && docker compose up -d
cd /var/www/eisenhower-matrix && docker compose up -d

# 4. Проверить Apache
sudo systemctl status apache2

# 5. Проверить порты
netstat -tuln | grep -E "3000|3001"
```

### Просмотр логов

```bash
# Логи calc1.ru
cd /var/www/calc1.ru && docker compose logs -f calc1

# Логи todolist.su
cd /var/www/eisenhower-matrix && docker compose logs -f

# Логи Apache
sudo tail -f /var/log/apache2/calc1.ru_ssl_error.log
sudo tail -f /var/log/apache2/todolist.su_ssl_error.log
```

## 📝 Важные замечания

1. **Порты:**
   - calc1.ru использует порт **3001** (внешний) → 3000 (внутри контейнера)
   - todolist.su использует порт **3000** (внешний) → 3000 (внутри контейнера)
   - todolist.su backend использует порт **5000** (обычно внутренний)

2. **Apache конфигурации:**
   - calc1.ru: `/etc/apache2/sites-available/calc1.ru.conf` → ProxyPass на `localhost:3001`
   - todolist.su: `/etc/apache2/sites-available/todolist.su.conf` → ProxyPass на `localhost:3000`

3. **Автозапуск:**
   - Docker Compose автоматически запускает контейнеры при старте Docker (благодаря `restart: unless-stopped`)
   - Systemd сервисы обеспечивают дополнительную гарантию запуска

4. **Обновления:**
   - calc1.ru обновляется автоматически через GitHub Actions при push в `main`
   - todolist.su обновляется вручную или через свой CI/CD

## 🔐 Безопасность

- Контейнеры работают с ограничениями ресурсов (CPU, память)
- Используется не-root пользователь внутри контейнеров
- Apache настроен с SSL/TLS
- Включены security headers

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи контейнеров
2. Проверьте логи Apache
3. Убедитесь, что порты не заняты другими процессами
4. Используйте скрипт `scripts/fix-both-sites.sh` для автоматического исправления

