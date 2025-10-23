# PDF Export Component - Универсальный компонент для экспорта в PDF

## Описание

`PDFExport` - это универсальный React компонент для создания и скачивания PDF файлов с результатами расчетов. Компонент автоматически добавляет брендинг "calc1.ru калькулятор #1 в мире" и поддерживает многоязычность.

## Установка зависимостей

```bash
npm install jspdf
```

## Импорт

```typescript
import PDFExport from '@/components/common/pdf-export';
```

## Использование

### Базовое использование

```tsx
<PDFExport
	title='Результаты расчета кредита'
	content='Детальный текст с результатами...'
	fileName='credit-results'
/>
```

### С кастомными стилями

```tsx
<PDFExport
	title='Результаты расчета'
	content={generatePDFContent()}
	fileName='calculation-results'
	className='mb-4 bg-blue-500 hover:bg-blue-600'
/>
```

## Параметры

| Параметр    | Тип      | Обязательный | Описание                                                       |
| ----------- | -------- | ------------ | -------------------------------------------------------------- |
| `title`     | `string` | ✅           | Заголовок документа                                            |
| `content`   | `string` | ✅           | Текст содержимого                                              |
| `fileName`  | `string` | ❌           | Имя файла без расширения (по умолчанию: 'calculation-results') |
| `className` | `string` | ❌           | CSS классы для стилизации кнопки                               |

## Особенности

### Автоматические функции

-   ✅ Добавляет брендинг "calc1.ru калькулятор #1 в мире"
-   ✅ Создает активную ссылку на calc1.ru
-   ✅ Автоматически разбивает длинный контент на страницы
-   ✅ Добавляет нумерацию страниц
-   ✅ Добавляет дату и время генерации
-   ✅ Использует универсальный шрифт helvetica для всех языков

### Многоязычность

Компонент использует переводы из `common.pdf`:

```json
{
	"common": {
		"pdf": {
			"header": "calc1.ru калькулятор #1 в мире",
			"savePdf": "Сохранить в PDF",
			"generated": "Сгенерировано",
			"page": "Страница",
			"of": "из"
		}
	}
}
```

## Примеры использования в калькуляторах

### 1. Кредитный калькулятор

```tsx
const generatePDFContent = () => {
	if (!result) return '';

	const formatCurrencyForPDF = (amount: number) => `$${amount.toFixed(2)}`;

	let content = `${t('results.summary')}\n\n`;
	content += `${t('results.monthlyPayment')}: ${formatCurrencyForPDF(
		result.monthlyPayment
	)}\n`;
	content += `${t('results.totalAmount')}: ${formatCurrencyForPDF(
		result.totalAmount
	)}\n`;
	content += `${t('results.totalInterest')}: ${formatCurrencyForPDF(
		result.totalInterest
	)}\n`;
	content += `${t('results.effectiveRate')}: ${result.effectiveRate.toFixed(
		2
	)}%\n\n`;

	content += `${t('results.scheduleTitle')}\n\n`;
	content += `${t('results.table.month')}\t${t('results.table.payment')}\t${t(
		'results.table.interest'
	)}\t${t('results.table.principal')}\t${t('results.table.balance')}\n`;

	result.paymentSchedule.slice(0, 24).forEach((payment) => {
		content += `${payment.month}\t${formatCurrencyForPDF(
			payment.monthlyPayment
		)}\t${formatCurrencyForPDF(
			payment.interestPayment
		)}\t${formatCurrencyForPDF(
			payment.principalPayment
		)}\t${formatCurrencyForPDF(payment.remainingBalance)}\n`;
	});

	if (result.paymentSchedule.length > 24) {
		content += `\n... ${result.paymentSchedule.length - 24} ${t(
			'results.table.moreMonths'
		)}`;
	}

	return content;
};

// В JSX
<PDFExport
	title={t('results.title')}
	content={generatePDFContent()}
	fileName='credit-loan-results'
	className='inline-flex'
/>;
```

### 2. Налоговый калькулятор

```tsx
const generatePDFContent = () => {
	if (!result) return '';

	let content = `${t('results.title')}\n\n`;
	content += `${t('results.netAmount')}: $${result.netAmount.toFixed(2)}\n`;
	content += `${t('results.vatAmount')} (${
		result.vatRate
	}%): $${result.vatAmount.toFixed(2)}\n`;
	content += `${t('results.totalAmount')}: $${result.totalAmount.toFixed(
		2
	)}\n`;

	if (result.additionalTaxes > 0) {
		content += `${t(
			'results.additionalTaxes'
		)}: $${result.additionalTaxes.toFixed(2)}\n`;
	}

	content += `\n${t('results.finalTotal')}: $${result.finalTotal.toFixed(
		2
	)}\n`;

	return content;
};

// В JSX
<PDFExport
	title={t('results.title')}
	content={generatePDFContent()}
	fileName='tax-calculator-results'
	className='flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors'
/>;
```

## Стилизация кнопки

Компонент принимает `className` для кастомизации внешнего вида:

```tsx
// Стандартная синяя кнопка
<PDFExport
  title="Заголовок"
  content="Контент"
  className="bg-blue-600 hover:bg-blue-700"
/>

// Серая кнопка (как в налоговом калькуляторе)
<PDFExport
  title="Заголовок"
  content="Контент"
  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
/>

// Зеленая кнопка
<PDFExport
  title="Заголовок"
  content="Контент"
  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
/>
```

## Структура PDF файла

Созданный PDF файл содержит:

1. **Заголовок**: "calc1.ru калькулятор #1 в мире" (переводится)
2. **Активная ссылка**: calc1.ru
3. **Заголовок документа**: переданный параметр `title`
4. **Дата и время**: автоматически добавляется
5. **Содержимое**: переданный параметр `content`
6. **Нумерация страниц**: "Страница X из Y" (переводится)

## Переводы для всех языков

### Русский (ru.json)

```json
{
	"common": {
		"pdf": {
			"header": "calc1.ru калькулятор #1 в мире",
			"savePdf": "Сохранить в PDF",
			"generated": "Сгенерировано",
			"page": "Страница",
			"of": "из"
		}
	}
}
```

### Английский (en.json)

```json
{
	"common": {
		"pdf": {
			"header": "calc1.ru calculator #1 in the world",
			"savePdf": "Save as PDF",
			"generated": "Generated",
			"page": "Page",
			"of": "of"
		}
	}
}
```

### Испанский (es.json)

```json
{
	"common": {
		"pdf": {
			"header": "calc1.ru calculadora #1 en el mundo",
			"savePdf": "Guardar como PDF",
			"generated": "Generado",
			"page": "Página",
			"of": "de"
		}
	}
}
```

### Немецкий (de.json)

```json
{
	"common": {
		"pdf": {
			"header": "calc1.ru Rechner #1 in der Welt",
			"savePdf": "Als PDF speichern",
			"generated": "Generiert",
			"page": "Seite",
			"of": "von"
		}
	}
}
```

## Рекомендации по использованию

1. **Всегда создавайте функцию `generatePDFContent()`** для каждого калькулятора
2. **Используйте переводы** для всех текстов в PDF
3. **Ограничивайте количество строк** в таблицах (рекомендуется до 24 строк)
4. **Используйте табуляцию** для выравнивания колонок в таблицах
5. **Добавляйте проверку на существование результата** в функции генерации контента

## Пример полной интеграции

```tsx
// 1. Импорт
import PDFExport from '@/components/common/pdf-export';

// 2. Функция генерации контента
const generatePDFContent = () => {
	if (!result) return '';

	let content = `${t('results.title')}\n\n`;
	// ... логика генерации контента
	return content;
};

// 3. Использование в JSX
<div className='flex gap-4'>
	<button onClick={handleCopy}>
		<Copy className='w-4 h-4' />
		{t('results.copy')}
	</button>

	<PDFExport
		title={t('results.title')}
		content={generatePDFContent()}
		fileName='my-calculator-results'
		className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
	/>
</div>;
```

Этот компонент значительно упрощает добавление PDF экспорта в любой калькулятор и обеспечивает единообразный стиль всех PDF файлов на сайте.
