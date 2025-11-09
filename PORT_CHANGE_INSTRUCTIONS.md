# Инструкция по изменению порта с 3000 на 3001

## Что было изменено

Порт для calc1.ru изменён с **3000** на **3001**, чтобы избежать конфликта с другим сайтом, который использует порт 3000.

## Что нужно сделать на сервере

### 1. Обновить код из репозитория

```bash
cd /var/www/calc1.ru
git pull origin main
```

### 2. Обновить Apache конфигурацию

```bash
# Скопировать новую конфигурацию
sudo cp /var/www/calc1.ru/apache/calc1.ru.conf /etc/apache2/sites-available/calc1.ru.conf

# Проверить синтаксис
sudo apache2ctl configtest

# Перезагрузить Apache
sudo systemctl reload apache2
```

### 3. Перезапустить Docker контейнер

```bash
cd /var/www/calc1.ru

# Остановить старый контейнер
docker compose down

# Запустить с новой конфигурацией
docker compose up -d

# Проверить статус
docker compose ps

# Проверить, что приложение отвечает на новом порту
curl http://localhost:3001
```

### 4. Проверить работу сайта

```bash
# Проверить через Apache
curl -k https://calc1.ru/ru

# Проверить напрямую на порту 3001
curl http://localhost:3001/ru
```

## Важные замечания

- **Внутри контейнера** приложение по-прежнему работает на порту 3000
- **Снаружи контейнера** (на хосте) приложение доступно на порту 3001
- Apache теперь проксирует запросы на `localhost:3001` вместо `localhost:3000`
- Другой сайт может использовать порт 3000 без конфликтов

## Если что-то пошло не так

1. Проверьте логи Docker:
   ```bash
   docker compose logs calc1
   ```

2. Проверьте логи Apache:
   ```bash
   sudo tail -f /var/log/apache2/calc1.ru_ssl_error.log
   ```

3. Проверьте, что порт 3001 свободен:
   ```bash
   netstat -tuln | grep 3001
   ```

4. Используйте диагностический скрипт:
   ```bash
   cd /var/www/calc1.ru
   bash scripts/diagnose.sh
   ```

