# Инструкция по исправлению зависших процессов сборки

## Проблема

После деплоя на сервере остались зависшие процессы сборки Next.js, которые грузят процессор:
- `node app/node_modules//bin/next`
- 4 процесса build

## Быстрое решение

Выполните на сервере:

```bash
cd /var/www/calc1.ru

# Запустите скрипт исправления
bash scripts/fix-hanging-builds.sh
```

## Ручное исправление

Если скрипт недоступен, выполните вручную:

```bash
# 1. Убить все процессы Next.js
pkill -9 -f "node.*next" || true
pkill -9 -f "next build" || true
pkill -9 -f "npm.*build" || true

# 2. Остановить Docker контейнеры
cd /var/www/calc1.ru
docker compose down

# 3. Очистить зависшие Docker процессы
docker ps -a | grep -E "build|calc1" | awk '{print $1}' | xargs docker rm -f 2>/dev/null || true
docker system prune -f

# 4. Перезапустить контейнеры
docker compose up -d

# 5. Проверить статус
docker compose ps
docker compose logs --tail=50 calc1

# 6. Проверить работу приложения
curl http://localhost:3001
```

## Проверка процессов

```bash
# Проверить процессы Next.js на хосте
ps aux | grep -E "next|build" | grep -v grep

# Проверить процессы в контейнере
docker exec calc1-app ps aux

# Проверить загрузку CPU
top -bn1 | head -20
```

## Если проблема повторяется

1. **Проверьте логи Docker:**
   ```bash
   docker compose logs calc1
   ```

2. **Проверьте, не запущена ли сборка внутри контейнера:**
   ```bash
   docker exec calc1-app ps aux | grep next
   ```

3. **Ограничьте ресурсы Docker:**
   Добавьте в `docker-compose.yml`:
   ```yaml
   services:
     calc1:
       deploy:
         resources:
           limits:
             cpus: '2'
             memory: 2G
   ```

4. **Проверьте, не остались ли процессы сборки от предыдущего деплоя:**
   ```bash
   ps aux | grep docker
   docker ps -a
   ```

## Профилактика

Чтобы предотвратить проблему в будущем:

1. **Убедитесь, что сборка завершается корректно** - проверьте логи сборки
2. **Используйте `--no-cache` только при необходимости** - это замедляет сборку
3. **Мониторьте процессы во время деплоя:**
   ```bash
   watch -n 1 'ps aux | grep -E "next|build" | grep -v grep'
   ```

