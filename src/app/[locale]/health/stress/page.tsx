import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import StressCalculator from '@/components/calculators/stress-calculator';
import StressSEO from '@/components/seo/stress-seo';
import SoftwareApplicationSchema from '@/components/seo/software-application-schema';

/**
 * Generate metadata for the stress calculator page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.stress.seo',
	});

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
	};
}

/**
 * Stress Calculator Page
 * Interactive calculator for stress level assessment
 */
export default async function StressPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.stress',
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
		namespace: 'calculators.stress.seo',
	});

	// FAQ structured data
	const faqStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: tSeo('faq.whatIsStress.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.whatIsStress.answer'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.howAccurate.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.howAccurate.answer'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.whenToSeekHelp.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.whenToSeekHelp.answer'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.howToReduce.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.howToReduce.answer'),
				},
			},
		],
	};

	return (
		<>
			{/* Structured Data - SoftwareApplication */}
			<SoftwareApplicationSchema
				category='health'
				calculatorId='stress'
				namespace='calculators.stress.seo'
				featureKeys={['stressAssessment', 'questionTest', 'personalizedResults', 'managementAdvice', 'multilingualSupport']}
				ratingValue='4.8'
				ratingCount='150'
				screenshot='https://calc1.ru/images/stress-screenshot.jpg'
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

					<StressCalculator />

					<div className='mt-12'>
						<StressSEO />
					</div>
				</div>
			</div>
		</>
	);
}
