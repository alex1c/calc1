import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['ru', 'en', 'de', 'es'];

function deepMerge(a: any, b: any) {
	if (Array.isArray(a) || Array.isArray(b)) return b;
	if (a && typeof a === 'object' && b && typeof b === 'object') {
		const out: any = { ...a };
		for (const k of Object.keys(b)) {
			out[k] = k in a ? deepMerge(a[k], b[k]) : b[k];
		}
		return out;
	}
	return b;
}

async function loadJson(path: string) {
	try {
		const mod = await import(path);
		return mod?.default ?? {};
	} catch {
		return {};
	}
}

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale;

	if (!locale || !locales.includes(locale as any)) {
		locale = 'ru';
	}

	try {
		// 1) Базовый монолит (обратная совместимость)
		const baseMessages = (
			await import(`../messages/${locale}.json`).catch(() => ({
				default: {} as any,
			}))
		).default;

		// 2) Подмешиваем калькуляторы из messages/{locale}/calculators/*.json если существуют
		let calculatorsBundle: any = {};
		try {
			// Используем fs только на сервере
			const fs = await import('node:fs');
			const path = await import('node:path');
			const dir = path.join(
				process.cwd(),
				'messages',
				String(locale),
				'calculators'
			);
			if (fs.existsSync(dir)) {
				const files = fs
					.readdirSync(dir)
					.filter((f) => f.endsWith('.json'));
				for (const file of files) {
					const mod = await import(
						`../messages/${locale}/calculators/${file}`
					);
					const data = mod?.default ?? {};
					// Поддерживаем два варианта структуры файла:
					// 1) { calculators: { name: { ... } } }
					// 2) { name: { ... } } → оборачиваем в calculators.name
					const name = file.replace(/\.json$/, '');
					const normalized = data?.calculators
						? data
						: { calculators: { [name]: data[name] ?? data } };
					calculatorsBundle = deepMerge(
						calculatorsBundle,
						normalized
					);
				}
			}
		} catch {
			// игнорируем, если папки нет или рантайм не поддерживает fs
		}

		const messages = deepMerge(baseMessages, calculatorsBundle);
		return { locale, messages };
	} catch (error) {
		console.error(`Failed to load messages for locale ${locale}:`, error);
		const fallbackMessages = (
			await import(`../messages/ru.json`).catch(() => ({
				default: {} as any,
			}))
		).default;
		return { locale: 'ru', messages: fallbackMessages };
	}
});
