import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import VitaminsCalculator from '@/components/calculators/vitamins-calculator';
import VitaminsSEO from '@/components/seo/vitamins-seo';
import SoftwareApplicationSchema from '@/components/seo/software-application-schema';

/**
 * Generate metadata for the vitamins calculator page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.vitamins.seo',
	});

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
	};
}

/**
 * Vitamins Calculator Page
 * Interactive calculator for daily vitamin and mineral requirements
 */
export default async function VitaminsPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.vitamins',
	});
	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	// Breadcrumb items
	const breadcrumbItems = [
		{
			label: tCategories('health.title'),
			href: '/health',
		},
		{ label: t('title') },
	];

	// SEO translations
	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.vitamins.seo',
	});

	// FAQ structured data - with fallback for missing translations
	const faqItems = [
		{ key: 'dailyRequirements' },
		{ key: 'activityImpact' },
		{ key: 'supplements' },
		{ key: 'accuracy' },
	];

	const faqStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqItems
			.map((item) => {
				try {
					const question = tSeo(`faq.${item.key}.question`);
					const answer = tSeo(`faq.${item.key}.answer`);
					// Only include if both question and answer exist
					if (question && answer && !question.includes('MISSING_MESSAGE') && !answer.includes('MISSING_MESSAGE')) {
						return {
							'@type': 'Question',
							name: question,
							acceptedAnswer: {
								'@type': 'Answer',
								text: answer,
							},
						};
					}
					return null;
				} catch {
					// Skip if translation is missing
					return null;
				}
			})
			.filter((item): item is NonNullable<typeof item> => item !== null),
	};

	return (
		<>
			{/* Structured Data - SoftwareApplication */}
			<SoftwareApplicationSchema
				category='health'
				calculatorId='vitamins'
				namespace='calculators.vitamins.seo'
				featureKeys={['dailyRequirements', 'mineralCalculation', 'ageGenderSpecific', 'activityAdjustment', 'multilingualSupport']}
				ratingValue='4.9'
				ratingCount='200'
				screenshot='https://calc1.ru/images/vitamins-screenshot.jpg'
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

					<VitaminsCalculator />

					<div className='mt-12'>
						<VitaminsSEO />
					</div>
				</div>
			</div>
		</>
	);
}
