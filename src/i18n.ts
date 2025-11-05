import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'];

// Explicit imports for all locales to ensure webpack includes them in the build
// These imports are not executed but help webpack statically analyze the module graph
import ruMessages from '../messages/ru.json';
import enMessages from '../messages/en.json';
import deMessages from '../messages/de.json';
import esMessages from '../messages/es.json';
import frMessages from '../messages/fr.json';
import itMessages from '../messages/it.json';
import plMessages from '../messages/pl.json';
import trMessages from '../messages/tr.json';
import ptBRMessages from '../messages/pt-BR.json';

// Map of locale to their message imports for runtime loading
const localeMessageMap: Record<string, () => Promise<{ default: any }>> = {
	ru: () => Promise.resolve({ default: ruMessages }),
	en: () => Promise.resolve({ default: enMessages }),
	de: () => Promise.resolve({ default: deMessages }),
	es: () => Promise.resolve({ default: esMessages }),
	fr: () => Promise.resolve({ default: frMessages }),
	it: () => Promise.resolve({ default: itMessages }),
	pl: () => Promise.resolve({ default: plMessages }),
	tr: () => Promise.resolve({ default: trMessages }),
	'pt-BR': () => Promise.resolve({ default: ptBRMessages }),
};

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
		// Use explicit locale map for better webpack static analysis
		const baseMessagesLoader = localeMessageMap[locale];
		const baseMessages = baseMessagesLoader
			? (await baseMessagesLoader()).default
			: (
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
		// Use explicit import for fallback
		const fallbackMessages = (await localeMessageMap['ru']()).default;
		return { locale: 'ru', messages: fallbackMessages };
	}
});
