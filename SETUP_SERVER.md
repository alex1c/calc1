# 🔧 Инструкция по настройке сервера

## Проблема: файлы не найдены на сервере

Если вы видите ошибки:
- `chmod: cannot access 'scripts/*.sh': No such file or directory`
- `no configuration file provided: not found`

Это означает, что новые файлы еще не закоммичены и не запушены в GitHub.

## ✅ Решение

### Шаг 1: Закоммитьте и запушьте файлы в GitHub

На вашем локальном компьютере выполните:

```bash
# Проверьте статус
git status

# Закоммитьте все новые файлы
git commit -m "Add Docker configuration and deployment scripts"

# Запушьте в GitHub
git push origin main
```

### Шаг 2: На сервере обновите репозиторий

```bash
cd /var/www/calc1.ru
git pull origin main
```

### Шаг 3: Проверьте наличие файлов

```bash
# Проверьте скрипты
ls -la scripts/*.sh

# Проверьте Docker файлы
ls -la Dockerfile docker-compose.yml
```

### Шаг 4: Установите права на скрипты

```bash
chmod +x scripts/*.sh
```

### Шаг 5: Запустите Docker Compose

**Важно:** В новых версиях Docker используется `docker compose` (без дефиса) вместо `docker-compose`.

Попробуйте оба варианта:

```bash
# Вариант 1 (новый синтаксис)
docker compose up -d --build

# Вариант 2 (старый синтаксис, если первый не работает)
docker-compose up -d --build
```

Если оба не работают, проверьте установку Docker Compose:

```bash
# Проверьте версию
docker compose version
# или
docker-compose --version

# Если не установлен, установите:
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## 🔍 Проверка установки Docker Compose

```bash
# Проверьте, какая команда работает
which docker-compose
which docker

# Если docker-compose не найден, используйте docker compose
docker compose version
```

## 📝 Полная последовательность команд на сервере

```bash
# 1. Перейдите в директорию проекта
cd /var/www/calc1.ru

# 2. Обновите репозиторий
git pull origin main

# 3. Проверьте файлы
ls -la scripts/
ls -la Dockerfile docker-compose.yml

# 4. Установите права
chmod +x scripts/*.sh

# 5. Запустите Docker (попробуйте оба варианта)
docker compose up -d --build
# или
docker-compose up -d --build

# 6. Проверьте статус
docker compose ps
# или
docker-compose ps

# 7. Просмотрите логи
docker compose logs -f
# или
docker-compose logs -f
```

## 🆘 Если проблемы продолжаются

### Проблема: docker-compose не найден

```bash
# Установите Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Проверьте установку
docker-compose --version
```

### Проблема: файлы все еще не найдены после git pull

```bash
# Убедитесь, что вы в правильной директории
pwd
# Должно быть: /var/www/calc1.ru

# Проверьте, что это git репозиторий
git remote -v

# Принудительно обновите
git fetch origin
git reset --hard origin/main
```

### Проблема: права доступа

```bash
# Установите правильные права
sudo chown -R $USER:$USER /var/www/calc1.ru
chmod +x scripts/*.sh
```

---

**После успешного запуска:** Приложение будет доступно на `http://localhost:3000` и через Apache на `http://calc1.ru`

