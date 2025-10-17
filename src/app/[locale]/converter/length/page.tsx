import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import LengthCalculator from '@/components/calculators/length-calculator';
import LengthSEO from '@/components/seo/length-seo';

/**
 * Generate metadata for the length converter page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.length.seo',
	});

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
	};
}

/**
 * Length Converter Page
 * Interactive converter for length units
 */
export default async function LengthPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.length',
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
		namespace: 'calculators.length.seo',
	});

	// WebApplication structured data
	const webApplicationStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: t('title'),
		url: `https://calc1.ru/${locale}/converter/length`,
		description: t('description'),
		applicationCategory: 'UtilityApplication',
		operatingSystem: 'Any',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD',
		},
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.9',
			reviewCount: '150',
		},
		featureList: [
			'Length unit conversion',
			'Multiple units support',
			'Instant calculation',
			'Multilingual interface',
		],
	};

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
			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(webApplicationStructuredData),
				}}
			/>
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

					<LengthCalculator />

					<div className='mt-12'>
						<LengthSEO />
					</div>
				</div>
			</div>
		</>
	);
}
