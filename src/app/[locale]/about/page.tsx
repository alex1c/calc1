import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import { Info, Target, Users, Award, Calculator } from 'lucide-react';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}

	const messages = (await import(`../../../../messages/${locale}.json`))
		.default;

	const t = (key: string) => messages.about?.[key] || key;

	return {
		title: t('title'),
		description: t('description'),
		authors: [{ name: 'Calc1.ru', url: 'https://calc1.ru' }],
		creator: 'Calc1.ru',
		publisher: 'Calc1.ru',
		metadataBase: new URL('https://calc1.ru'),
		alternates: {
			canonical: `https://calc1.ru/${locale}/about`,
			languages: {
				ru: 'https://calc1.ru/ru/about',
				en: 'https://calc1.ru/en/about',
				es: 'https://calc1.ru/es/about',
				de: 'https://calc1.ru/de/about',
			},
		},
		openGraph: {
			title: `${t('title')} | Calc1.ru`,
			description: t('description'),
			url: `https://calc1.ru/${locale}/about`,
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

export default async function AboutPage({
	params: { locale },
}: Props) {
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
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
		const aboutMessages = messages.about || {};
		return getNestedValue(aboutMessages, key);
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
						<Info className='h-8 w-8 text-blue-600 mr-3' />
						<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
							{t('title')}
						</h1>
					</div>

					<div className='prose prose-lg max-w-none dark:prose-invert'>
						{/* О проекте */}
						<section className='mb-8'>
							<div className='flex items-start mb-4'>
								<Calculator className='h-6 w-6 text-blue-600 mr-2 mt-1 flex-shrink-0' />
								<h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
									{t('section1.title')}
								</h2>
							</div>
							<div className='ml-8'>
								<p className='text-gray-700 dark:text-gray-300 mb-4 leading-relaxed'>
									{t('section1.content')}
								</p>
							</div>
						</section>

						{/* Наша миссия */}
						<section className='mb-8'>
							<div className='flex items-start mb-4'>
								<Target className='h-6 w-6 text-blue-600 mr-2 mt-1 flex-shrink-0' />
								<h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
									{t('section2.title')}
								</h2>
							</div>
							<div className='ml-8'>
								<p className='text-gray-700 dark:text-gray-300 mb-4 leading-relaxed'>
									{t('section2.content')}
								</p>
							</div>
						</section>

						{/* Кто мы */}
						<section className='mb-8'>
							<div className='flex items-start mb-4'>
								<Users className='h-6 w-6 text-blue-600 mr-2 mt-1 flex-shrink-0' />
								<h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
									{t('section3.title')}
								</h2>
							</div>
							<div className='ml-8'>
								<p className='text-gray-700 dark:text-gray-300 mb-4 leading-relaxed'>
									{t('section3.content')}
								</p>
							</div>
						</section>

						{/* Почему мы */}
						<section className='mb-8'>
							<div className='flex items-start mb-4'>
								<Award className='h-6 w-6 text-blue-600 mr-2 mt-1 flex-shrink-0' />
								<h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>
									{t('section4.title')}
								</h2>
							</div>
							<div className='ml-8'>
								<p className='text-gray-700 dark:text-gray-300 mb-4 leading-relaxed'>
									{t('section4.content')}
								</p>
								<ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4'>
									<li>{t('section4.item1')}</li>
									<li>{t('section4.item2')}</li>
									<li>{t('section4.item3')}</li>
									<li>{t('section4.item4')}</li>
									<li>{t('section4.item5')}</li>
								</ul>
							</div>
						</section>

						{/* Контакты */}
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

