import { promises as fs } from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { SUPPORTED_LOCALES } from '@/lib/constants';

const locales = SUPPORTED_LOCALES;

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

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale;

	if (!locale || !locales.includes(locale as any)) {
		locale = 'ru';
	}

	try {
		// 1) Базовый монолит (обратная совместимость)
		// Use explicit locale map for better webpack static analysis
		const baseMessagesLoader =
			localeMessageMap[locale] ?? localeMessageMap['ru'];
		const baseMessages = (await baseMessagesLoader()).default;

		// 2) Подмешиваем калькуляторы из messages/{locale}/calculators/*.json если существуют
		let calculatorsBundle: any = {};
		try {
			const dir = path.join(
				process.cwd(),
				'messages',
				String(locale),
				'calculators'
			);
			const files = await fs
				.readdir(dir, { withFileTypes: true })
				.then((entries) =>
					entries
						.filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
						.map((entry) => entry.name)
				);

			for (const file of files) {
				const filePath = path.join(dir, file);
				const content = await fs.readFile(filePath, 'utf-8');
				const data = JSON.parse(content);
				const name = file.replace(/\.json$/, '');
				const normalized = data?.calculators
					? data
					: { calculators: { [name]: data[name] ?? data } };
				calculatorsBundle = deepMerge(calculatorsBundle, normalized);
			}
		} catch (error) {
			// ignore missing directory
			if ((error as NodeJS.ErrnoException)?.code !== 'ENOENT') {
				console.warn(
					`Failed to load calculator messages for locale ${locale}:`,
					error
				);
			}
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
