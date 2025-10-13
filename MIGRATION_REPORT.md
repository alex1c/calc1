# Отчет о миграции структуры переводов

## Выполненные задачи ✅

### 1. Анализ текущей структуры

-   Проанализированы все файлы переводов (en.json, ru.json, de.json, es.json)
-   Выявлены несогласованности в путях useTranslations
-   Обнаружено дублирование данных в categories.construction.calculators и корне/calculators секциях

### 2. Создание скрипта миграции

-   Создан скрипт `migrate-translations.js` для автоматической миграции
-   Скрипт поддерживает резервное копирование файлов
-   Автоматическое обновление page.tsx файлов

### 3. Миграция переводов

-   Перемещены калькуляторы из корня в `calculators.*` namespace:
    -   `wall` → `calculators.wall`
    -   `materials` → `calculators.materials`
    -   `tile-laminate` → `calculators.tile-laminate`
    -   `concrete` → `calculators.concrete`
    -   `roof` → `calculators.roof`
    -   `wallpaper` → `calculators.wallpaper`
-   Очищены `categories.construction.calculators` (оставлены только навигационные данные)

### 4. Обновление page.tsx файлов

-   Обновлены пути useTranslations:
    -   `useTranslations('wall')` → `useTranslations('calculators.wall')`
    -   `useTranslations('tile-laminate')` → `useTranslations('calculators.tile-laminate')`
-   Обновлены SEO пути в generateMetadata:
    -   `messages.wall.seo[key]` → `messages.calculators.wall.seo[key]`
    -   `messages.concrete.seo[key]` → `messages.calculators.concrete.seo[key]`

### 5. Обновление компонентов

-   Исправлены пути в `materials-calculator.tsx`
-   Исправлены пути в `tile-laminate-calculator.tsx`
-   Проверены все остальные компоненты (уже использовали правильные пути)

### 6. Тестирование

-   Проверена работа dev сервера
-   Убедились, что приложение запускается без ошибок
-   Проверены линтеры - ошибок нет

## Результаты

### До миграции (проблемы):

```typescript
// Несогласованные пути useTranslations
const t = useTranslations('wall'); // корень
const t = useTranslations('tile-laminate'); // корень
const t = useTranslations('calculators.traffic-fines'); // в секции
const t = useTranslations('calculators.concrete'); // в секции

// Несогласованные SEO пути
const t = (key: string) => messages.wall.seo[key]; // корень
const t = (key: string) => messages.calculators['tile-laminate'].seo[key]; // в секции
const t = (key: string) => messages.concrete.seo[key]; // корень
```

### После миграции (решение):

```typescript
// Согласованные пути useTranslations
const t = useTranslations('calculators.wall');
const t = useTranslations('calculators.tile-laminate');
const t = useTranslations('calculators.traffic-fines');
const t = useTranslations('calculators.concrete');

// Согласованные SEO пути
const t = (key: string) => messages.calculators.wall.seo[key];
const t = (key: string) => messages.calculators['tile-laminate'].seo[key];
const t = (key: string) => messages.calculators.concrete.seo[key];
```

## Структура после миграции

```json
{
  "common": { ... },
  "brand": { ... },
  "breadcrumbs": { ... },
  "navigation": { ... },
  "categories": {
    "construction": {
      "calculators": {
        "wall": { "title": "...", "description": "..." },
        "materials": { "title": "...", "description": "..." }
      }
    }
  },
  "calculators": {
    "wall": {
      "title": "...",
      "description": "...",
      "form": { ... },
      "results": { ... },
      "seo": { ... }
    },
    "materials": { ... },
    "concrete": { ... }
  }
}
```

## Файлы, созданные в процессе миграции

1. `migrate-translations.js` - скрипт миграции
2. `TRANSLATION_STRUCTURE.md` - документация по новой структуре
3. `MIGRATION_REPORT.md` - данный отчет
4. Резервные копии всех измененных файлов (\*.backup)

## Преимущества новой структуры

1. **Согласованность** - все калькуляторы используют единый namespace
2. **Предсказуемость** - легко понять, где искать переводы
3. **Масштабируемость** - простое добавление новых калькуляторов
4. **Отсутствие дублирования** - данные хранятся в одном месте
5. **Упрощенная поддержка** - меньше путаницы при разработке

## Следующие шаги

1. ✅ Протестировать приложение в браузере
2. ✅ Убедиться, что все калькуляторы работают корректно
3. ⏳ После успешного тестирования удалить backup файлы
4. ⏳ Обновить документацию для разработчиков
5. ⏳ Применить аналогичную структуру к новым калькуляторам

## Статус: ✅ ЗАВЕРШЕНО

Миграция структуры переводов успешно завершена. Все задачи выполнены, приложение работает корректно.
