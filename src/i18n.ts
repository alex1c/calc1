import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['ru', 'en', 'de', 'es'];

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale;

	if (!locale || !locales.includes(locale as any)) {
		locale = 'ru';
	}

	try {
		const messages = (await import(`../messages/${locale}.json`)).default;
		return { locale, messages };
	} catch (error) {
		console.error(`Failed to load messages for locale ${locale}:`, error);
		// Fallback to Russian if locale fails to load
		const fallbackMessages = (await import(`../messages/ru.json`)).default;
		return { locale: 'ru', messages: fallbackMessages };
	}
});
