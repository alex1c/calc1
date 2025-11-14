import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import DoseCalculator from '@/components/calculators/dose-calculator';
import DoseSEO from '@/components/seo/dose-seo';
import SoftwareApplicationSchema from '@/components/seo/software-application-schema';
import {
	getSafeTitle,
	getSafeDescription,
} from '@/lib/metadata-utils';

/**
 * Generate metadata for the dose calculator page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.dose.seo',
	});

	const title = getSafeTitle(t('title'), 'Калькулятор дозировки');
	const description = getSafeDescription(
		t('description'),
		'Бесплатный онлайн калькулятор для расчёта дозировки лекарств. Точный расчёт дозы препарата на основе веса, возраста и других параметров.'
	);
	const keywordsValue = t('keywords');

	return {
		title,
		description,
		keywords: keywordsValue ? keywordsValue.split(',').map((k: string) => k.trim()) : [],
	};
}

/**
 * Dose Calculator Page
 * Interactive calculator for weight-based medication dosing
 */
export default async function DosePage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.dose',
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
		namespace: 'calculators.dose.seo',
	});

	// FAQ structured data
	const faqStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: tSeo('faq.howCalculated.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.howCalculated.answer'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.children.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.children.answer'),
				},
			},
			{
				'@type': 'Question',
				name: tSeo('faq.exceeded.question'),
				acceptedAnswer: {
					'@type': 'Answer',
					text: tSeo('faq.exceeded.answer'),
				},
			},
		],
	};

	return (
		<>
			{/* Structured Data - SoftwareApplication */}
			<SoftwareApplicationSchema
				category='health'
				calculatorId='dose'
				namespace='calculators.dose.seo'
				featureKeys={['weightBasedCalculation', 'unitConversion', 'safetyWarnings', 'frequencyOptions', 'multilingualSupport']}
				ratingValue='4.9'
				ratingCount='180'
				screenshot='https://calc1.ru/images/dose-screenshot.jpg'
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

					<DoseCalculator />

					<div className='mt-12'>
						<DoseSEO />
					</div>
				</div>
			</div>
		</>
	);
}
