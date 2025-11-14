import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import AngleCalculator from '@/components/calculators/angle-calculator';
import AngleSEO from '@/components/seo/angle-seo';
import SoftwareApplicationSchema from '@/components/seo/software-application-schema';
import {
	getSafeTitle,
	getSafeDescription,
} from '@/lib/metadata-utils';

/**
 * Generate metadata for the angle converter page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.angle-converter.seo',
	});

	const title = getSafeTitle(t('title'), 'Конвертер углов');
	const description = getSafeDescription(
		t('description'),
		'Бесплатный онлайн конвертер единиц углов: градусы, радианы, грады. Быстрый перевод между единицами измерения углов.'
	);
	const keywordsValue = t('keywords');

	return {
		title,
		description,
		keywords: keywordsValue ? keywordsValue.split(',').map((k: string) => k.trim()) : [],
	};
}

/**
 * Angle Converter Page
 * Interactive converter for angle units
 */
export default async function AnglePage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.angle-converter',
	});
	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	const { loadMergedConverterTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedConverterTranslations(locale);

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
		namespace: 'calculators.angle-converter.seo',
	});

	// FAQ structured data
	const faqData = tSeo.raw('faqItems');
	const faqArray = Array.isArray(faqData) ? faqData : [];
	const faqStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqArray.slice(0, 30).map((faq: any) => ({
			'@type': 'Question',
			name: faq.q,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.a,
			},
		})),
	};

	// BreadcrumbList structured data
	const breadcrumbListStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: messages.breadcrumbs?.home || 'Home',
				item: `https://calc1.ru/${locale}`,
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: tCategories('converter.title'),
				item: `https://calc1.ru/${locale}/converter`,
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: t('title'),
				item: `https://calc1.ru/${locale}/converter/angle`,
			},
		],
	};

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			<Header />

			{/* Breadcrumbs */}
			<div className='bg-white dark:bg-gray-800 shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
					<Breadcrumbs items={breadcrumbItems} />
				</div>
			</div>

			{/* Calculator */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<AngleCalculator />
			</div>

			{/* SEO Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12'>
				<AngleSEO />
			</div>

			{/* Structured Data - SoftwareApplication */}
			<SoftwareApplicationSchema
				category='converter'
				calculatorId='angle'
				namespace='calculators.angle-converter.seo'
				featureKeys={['unitConversion', 'multipleUnits', 'instantCalculation', 'multilingualInterface']}
				ratingValue='4.9'
				ratingCount='150'
				screenshot='https://calc1.ru/images/angle-screenshot.jpg'
			/>
			{/* FAQ Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(faqStructuredData),
				}}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbListStructuredData),
				}}
			/>
		</div>
	);
}

