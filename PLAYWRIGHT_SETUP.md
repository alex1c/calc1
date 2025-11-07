# Установка браузеров Playwright

Для запуска E2E тестов нужно установить браузеры Playwright.

## Быстрая установка (только Chromium)

```bash
npx playwright install chromium
```

## Полная установка (все браузеры)

```bash
npx playwright install
```

## После установки

Запустите тесты:
```bash
npm run test:e2e
```

## Примечание

Конфигурация настроена на запуск только Chromium для ускорения тестов.
Чтобы тестировать другие браузеры, раскомментируйте их в `playwright.config.ts`.

