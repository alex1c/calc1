# Структура переводов - Документация

## Обзор

После миграции структура переводов была унифицирована для обеспечения согласованности и упрощения поддержки.

## Новая структура

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

## Ключевые изменения

### 1. Унифицированные пути useTranslations

**Было (несогласованно):**

```typescript
// Разные пути для разных калькуляторов
const t = useTranslations('wall'); // корень
const t = useTranslations('tile-laminate'); // корень
const t = useTranslations('calculators.traffic-fines'); // в секции
const t = useTranslations('calculators.concrete'); // в секции
```

**Стало (согласованно):**

```typescript
// Все калькуляторы используют calculators.* namespace
const t = useTranslations('calculators.wall');
const t = useTranslations('calculators.tile-laminate');
const t = useTranslations('calculators.traffic-fines');
const t = useTranslations('calculators.concrete');
```

### 2. Унифицированные SEO пути

**Было (несогласованно):**

```typescript
// Разные пути для SEO
const t = (key: string) => messages.wall.seo[key]; // корень
const t = (key: string) => messages.calculators['tile-laminate'].seo[key]; // в секции
const t = (key: string) => messages.concrete.seo[key]; // корень
```

**Стало (согласованно):**

```typescript
// Все SEO используют calculators.* namespace
const t = (key: string) => messages.calculators.wall.seo[key];
const t = (key: string) => messages.calculators['tile-laminate'].seo[key];
const t = (key: string) => messages.calculators.concrete.seo[key];
```

### 3. Устранение дублирования

**Было:**

-   Дублирование данных в `categories.construction.calculators` и в корне/calculators секции
-   Полные данные с формами, результатами, SEO в нескольких местах

**Стало:**

-   `categories.construction.calculators` содержит только навигационные данные (title, description)
-   Полные данные калькуляторов находятся только в `calculators.*` namespace

## Список калькуляторов

Все следующие калькуляторы теперь используют `calculators.*` namespace:

### Строительные калькуляторы

-   `calculators.wall` - Калькулятор кирпича и блоков
-   `calculators.materials` - Калькулятор строительных материалов
-   `calculators.tile-laminate` - Калькулятор плитки и ламината
-   `calculators.concrete` - Калькулятор бетона
-   `calculators.roof` - Калькулятор кровли
-   `calculators.wallpaper` - Калькулятор обоев

### Финансовые калькуляторы

-   `calculators.credit-loan` - Кредитный калькулятор
-   `calculators.mortgage` - Ипотечный калькулятор
-   `calculators.deposit` - Калькулятор вкладов
-   `calculators.consumer-loan` - Калькулятор потребительского кредита
-   `calculators.auto-loan` - Калькулятор автокредита
-   `calculators.car-loan` - Калькулятор автокредита
-   `calculators.savings` - Калькулятор накоплений
-   `calculators.investment` - Калькулятор инвестиций

### Автомобильные калькуляторы

-   `calculators.osago` - Калькулятор ОСАГО
-   `calculators.kasko` - Калькулятор КАСКО
-   `calculators.fuel-consumption` - Калькулятор расхода топлива
-   `calculators.vehicle-tax` - Калькулятор транспортного налога
-   `calculators.traffic-fines` - Калькулятор штрафов ГИБДД
-   `calculators.car-ownership` - Калькулятор стоимости владения авто
-   `calculators.car-depreciation` - Калькулятор амортизации автомобиля
-   `calculators.leasing` - Калькулятор автолизинга
-   `calculators.customs` - Калькулятор растаможки автомобиля

### Другие калькуляторы

-   `calculators.paper-weight` - Калькулятор веса бумаги
-   `calculators.bmi` - Индекс массы тела

## Использование в компонентах

### Page компоненты

```typescript
export default function WallPage() {
	const t = useTranslations('calculators.wall');

	return (
		<div>
			<Breadcrumbs
				items={[
					{
						label: t('breadcrumbs.construction'),
						href: '/construction',
					},
					{ label: t('title') },
				]}
			/>
			<WallCalculator />
		</div>
	);
}

export async function generateMetadata({ params: { locale } }) {
	const messages = (await import(`../../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages.calculators.wall.seo[key];

	return {
		title: t('title'),
		description: t('overview.content'),
		keywords: t('seo'),
	};
}
```

### Компоненты калькуляторов

```typescript
export default function WallCalculator() {
	const t = useTranslations('calculators.wall');

	return (
		<div>
			<h1>{t('title')}</h1>
			<form>
				<label>{t('form.wallLength')}</label>
				{/* ... */}
			</form>
		</div>
	);
}
```

### SEO компоненты

```typescript
export default function WallSEO() {
	const t = useTranslations('calculators.wall');

	return (
		<div>
			<h2>{t('seo.overview.title')}</h2>
			<p>{t('seo.overview.content')}</p>
		</div>
	);
}
```

## Миграция

Миграция была выполнена с помощью скрипта `migrate-translations.js`, который:

1. Переместил данные калькуляторов из корня в `calculators.*` namespace
2. Очистил `categories.construction.calculators` (оставил только навигационные данные)
3. Обновил пути `useTranslations` в page.tsx файлах
4. Обновил SEO пути в `generateMetadata` функциях
5. Создал резервные копии всех измененных файлов

## Преимущества новой структуры

1. **Согласованность** - все калькуляторы используют единый namespace
2. **Предсказуемость** - легко понять, где искать переводы
3. **Масштабируемость** - простое добавление новых калькуляторов
4. **Отсутствие дублирования** - данные хранятся в одном месте
5. **Упрощенная поддержка** - меньше путаницы при разработке

## Рекомендации

1. При добавлении нового калькулятора всегда используйте `calculators.*` namespace
2. В `categories.*.calculators` храните только навигационные данные (title, description)
3. Полные данные калькулятора (form, results, seo) размещайте в `calculators.*`
4. Используйте единообразные пути в `useTranslations` и `generateMetadata`
