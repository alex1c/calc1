import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import { FileText, AlertCircle, CheckCircle, XCircle, Shield } from 'lucide-react';

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
		const termsMessages = messages.legal?.terms || {};
		return getNestedValue(termsMessages, key);
	};

	return {
		title: t('title'),
		description: t('description'),
		authors: [{ name: 'Calc1.ru', url: 'https://calc1.ru' }],
		creator: 'Calc1.ru',
		publisher: 'Calc1.ru',
		metadataBase: new URL('https://calc1.ru'),
		alternates: {
			canonical: `https://calc1.ru/${locale}/terms`,
			languages: {
				ru: 'https://calc1.ru/ru/terms',
				en: 'https://calc1.ru/en/terms',
				es: 'https://calc1.ru/es/terms',
				de: 'https://calc1.ru/de/terms',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/terms`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'article',
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

export default async function TermsPage({
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
		const termsMessages = messages.legal?.terms || {};
		return getNestedValue(termsMessages, key);
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
						<FileText className='h-8 w-8 text-blue-600 mr-3' />
						<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
							{t('title')}
						</h1>
					</div>

					<p className='text-gray-600 dark:text-gray-300 mb-8 text-lg'>
						{t('lastUpdated')}
					</p>

					<div className='prose prose-lg max-w-none dark:prose-invert'>
						{/* Введение */}
						<section className='mb-8'>
							<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
								{t('introduction')}
							</p>
						</section>

						{/* 1. Принятие условий */}
						<section className='mb-8'>
							<div className='flex items-start mb-4'>
								<CheckCircle className='h-6 w-6 text-blue-600 mr-2 mt-1 flex-shrink-0' />
								<h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
									{t('section1.title')}
								</h2>
							</div>
							<div className='ml-8'>
								<p className='text-gray-700 dark:text-gray-300'>
									{t('section1.content')}
								</p>
							</div>
						</section>

						{/* 2. Использование сервиса */}
						<section className='mb-8'>
							<div className='flex items-start mb-4'>
								<Shield className='h-6 w-6 text-blue-600 mr-2 mt-1 flex-shrink-0' />
								<h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
									{t('section2.title')}
								</h2>
							</div>
							<div className='ml-8'>
								<p className='text-gray-700 dark:text-gray-300 mb-4'>
									{t('section2.content')}
								</p>
								<ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4'>
									<li>{t('section2.item1')}</li>
									<li>{t('section2.item2')}</li>
									<li>{t('section2.item3')}</li>
									<li>{t('section2.item4')}</li>
								</ul>
							</div>
						</section>

						{/* 3. Ограничения ответственности */}
						<section className='mb-8'>
							<div className='flex items-start mb-4'>
								<AlertCircle className='h-6 w-6 text-orange-600 mr-2 mt-1 flex-shrink-0' />
								<h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
									{t('section3.title')}
								</h2>
							</div>
							<div className='ml-8'>
								<p className='text-gray-700 dark:text-gray-300 mb-4'>
									{t('section3.content')}
								</p>
								<p className='text-gray-700 dark:text-gray-300'>
									{t('section3.additional')}
								</p>
							</div>
						</section>

						{/* 4. Интеллектуальная собственность */}
						<section className='mb-8'>
							<h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
								{t('section4.title')}
							</h2>
							<p className='text-gray-700 dark:text-gray-300'>
								{t('section4.content')}
							</p>
						</section>

						{/* 5. Запрещенные действия */}
						<section className='mb-8'>
							<div className='flex items-start mb-4'>
								<XCircle className='h-6 w-6 text-red-600 mr-2 mt-1 flex-shrink-0' />
								<h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
									{t('section5.title')}
								</h2>
							</div>
							<div className='ml-8'>
								<ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4'>
									<li>{t('section5.item1')}</li>
									<li>{t('section5.item2')}</li>
									<li>{t('section5.item3')}</li>
									<li>{t('section5.item4')}</li>
									<li>{t('section5.item5')}</li>
								</ul>
							</div>
						</section>

						{/* 6. Изменения в условиях */}
						<section className='mb-8'>
							<h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
								{t('section6.title')}
							</h2>
							<p className='text-gray-700 dark:text-gray-300'>
								{t('section6.content')}
							</p>
						</section>

						{/* 7. Контакты */}
						<section className='mb-8 border-t pt-8'>
							<h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
								{t('contact.title')}
							</h2>
							<p className='text-gray-700 dark:text-gray-300'>
								{t('contact.content')}
							</p>
							<p className='text-gray-700 dark:text-gray-300 mt-4'>
								<a
									href={`/${locale}/contact`}
									className='text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline'
								>
									{t('contact.link')}
								</a>
							</p>
						</section>
					</div>
				</div>
			</main>
		</div>
	);
}

