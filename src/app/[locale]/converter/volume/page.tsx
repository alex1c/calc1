import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import VolumeCalculator from '@/components/calculators/volume-calculator';
import VolumeSEO from '@/components/seo/volume-seo';
import SoftwareApplicationSchema from '@/components/seo/software-application-schema';
import {
	getSafeTitle,
	getSafeDescription,
} from '@/lib/metadata-utils';

/**
 * Generate metadata for the volume converter page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.volume-converter.seo',
	});

	const title = getSafeTitle(t('title'), 'Конвертер объёма');
	const description = getSafeDescription(
		t('description'),
		'Бесплатный онлайн конвертер единиц объёма: литры, миллилитры, галлоны, пинты, кубические метры. Быстрый перевод между метрическими и имперскими единицами измерения объёма.'
	);
	const keywordsValue = t('keywords');

	return {
		title,
		description,
		keywords: keywordsValue ? keywordsValue.split(',').map((k: string) => k.trim()) : [],
	};
}

/**
 * Volume Converter Page
 * Interactive converter for volume units
 */
export default async function VolumePage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.volume-converter',
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
		namespace: 'calculators.volume-converter.seo',
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
				calculatorId='volume'
				namespace='calculators.volume-converter.seo'
				featureKeys={['unitConversion', 'multipleUnits', 'instantCalculation', 'multilingualInterface']}
				ratingValue='4.9'
				ratingCount='150'
				screenshot='https://calc1.ru/images/volume-screenshot.jpg'
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

					<VolumeCalculator />

					<div className='mt-12'>
						<VolumeSEO />
					</div>
				</div>
			</div>
		</>
	);
}
