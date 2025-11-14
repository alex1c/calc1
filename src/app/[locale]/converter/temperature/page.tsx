import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import TemperatureCalculator from '@/components/calculators/temperature-calculator';
import TemperatureSEO from '@/components/seo/temperature-seo';
import SoftwareApplicationSchema from '@/components/seo/software-application-schema';
import {
	getSafeTitle,
	getSafeDescription,
} from '@/lib/metadata-utils';

/**
 * Generate metadata for the temperature converter page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.temperature.seo',
	});

	const title = getSafeTitle(t('title'), 'Конвертер температуры');
	const description = getSafeDescription(
		t('description'),
		'Бесплатный онлайн конвертер температуры: Цельсий, Фаренгейт, Кельвин. Быстрый перевод между единицами измерения температуры.'
	);
	const keywordsValue = t('keywords');

	return {
		title,
		description,
		keywords: keywordsValue ? keywordsValue.split(',').map((k: string) => k.trim()) : [],
	};
}

/**
 * Temperature Converter Page
 * Interactive converter for temperature units
 */
export default async function TemperaturePage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.temperature',
	});
	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	// Breadcrumb items
	const breadcrumbItems = [
		{
			label: tCategories('converter.title'),
			href: '/converter',
		},
		{ label: t('title') },
	];

	// SEO translations
	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.temperature.seo',
	});

	// FAQ structured data
	const faqData = tSeo.raw('faqItems');
	const faqArray = Array.isArray(faqData) ? faqData : [];
	const faqStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqArray.map((faq: any) => ({
			'@type': 'Question',
			name: faq.q,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.a,
			},
		})),
	};

	return (
		<>
			{/* Structured Data - SoftwareApplication */}
			<SoftwareApplicationSchema
				category='converter'
				calculatorId='temperature'
				namespace='calculators.temperature.seo'
				featureKeys={['unitConversion', 'multipleUnits', 'instantCalculation', 'multilingualInterface']}
				ratingValue='4.9'
				ratingCount='150'
				screenshot='https://calc1.ru/images/temperature-screenshot.jpg'
			/>
			{/* FAQ Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(faqStructuredData),
				}}
			/>

			<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
				<Header />

				<div className='container mx-auto px-4 py-8'>
					<Breadcrumbs items={breadcrumbItems} />

					<TemperatureCalculator />

					<div className='mt-12'>
						<TemperatureSEO />
					</div>
				</div>
			</div>
		</>
	);
}
