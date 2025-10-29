import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Package } from 'lucide-react';
import Header from '@/components/header';
import PuttyCalculator from '@/components/calculators/putty-calculator';
import Breadcrumbs from '@/components/breadcrumbs';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}
	const messages = (await import(`../../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages.calculators?.putty?.seo?.[key] || key;

	return {
		title: `${t('title') || 'Putty Calculator'} | Calc1.ru`,
		description: t('description') || 'Calculate putty amount',
	};
}

export default async function PuttyPage({ params: { locale } }: Props) {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}

	const t = await getTranslations({
		locale,
		namespace: 'calculators.putty',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	const breadcrumbItems = [
		{
			label: tCategories('construction.title'),
			href: '/construction',
		},
		{
			label: t('title'),
		},
	];

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			<Header />

			<div className='bg-white dark:bg-gray-800 shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
					<Breadcrumbs items={breadcrumbItems} />
				</div>
			</div>

			<div className='bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Package className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{t('title')}
							</h1>
						</div>
						<p className='text-xl text-blue-100 max-w-3xl mx-auto'>
							{t('description')}
						</p>
					</div>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<PuttyCalculator />
			</div>
		</div>
	);
}
