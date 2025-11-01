import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import ContactForm from '@/components/contact-form';
import { MessageSquare } from 'lucide-react';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}

	const messages = (await import(`../../../../messages/${locale}.json`))
		.default;

	// Helper function to get nested translation values
	const getNestedValue = (obj: any, path: string): string => {
		return path.split('.').reduce((current, key) => {
			return current && typeof current === 'object' ? current[key] : undefined;
		}, obj) || path;
	};
	
	const t = (key: string) => {
		const contactMessages = messages.contact || {};
		return getNestedValue(contactMessages, key);
	};

	return {
		title: t('title'),
		description: t('description'),
		authors: [{ name: 'Calc1.ru', url: 'https://calc1.ru' }],
		creator: 'Calc1.ru',
		publisher: 'Calc1.ru',
		metadataBase: new URL('https://calc1.ru'),
		alternates: {
			canonical: `https://calc1.ru/${locale}/contact`,
			languages: {
				ru: 'https://calc1.ru/ru/contact',
				en: 'https://calc1.ru/en/contact',
				es: 'https://calc1.ru/es/contact',
				de: 'https://calc1.ru/de/contact',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/contact`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
		},
		twitter: {
			card: 'summary',
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
		},
		robots: {
			index: true,
			follow: true,
		},
	};
}

export default async function ContactPage({
	params: { locale },
}: Props) {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}

	const messages = (await import(`../../../../messages/${locale}.json`))
		.default;
	
	// Helper function to get nested translation values
	const getNestedValue = (obj: any, path: string): string => {
		return path.split('.').reduce((current, key) => {
			return current && typeof current === 'object' ? current[key] : undefined;
		}, obj) || path;
	};
	
	const t = (key: string) => {
		const contactMessages = messages.contact || {};
		return getNestedValue(contactMessages, key);
	};

	// Breadcrumbs: компонент автоматически добавляет ссылку на главную
	const breadcrumbs = [
		{
			label: t('title'),
			href: undefined,
		},
	];

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			<Header />
			<main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<Breadcrumbs items={breadcrumbs} />

				<div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 md:p-8 mt-6'>
					<div className='flex items-center mb-6'>
						<MessageSquare className='h-8 w-8 text-blue-600 mr-3' />
						<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
							{t('title')}
						</h1>
					</div>

					<div className='prose prose-lg max-w-none dark:prose-invert'>
						<p className='text-gray-700 dark:text-gray-300 mb-8 leading-relaxed'>
							{t('description')}
						</p>


						{/* Форма обратной связи */}
						<div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6'>
							<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
								{t('form.title')}
							</h2>
							<p className='text-gray-700 dark:text-gray-300 mb-4'>
								{t('form.description')}
							</p>
							<ContactForm locale={locale} />
						</div>

						{/* Дополнительная информация */}
						<div className='border-t pt-6'>
							<h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
								{t('additional.title')}
							</h2>
							<p className='text-gray-700 dark:text-gray-300 mb-4'>
								{t('additional.content')}
							</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

