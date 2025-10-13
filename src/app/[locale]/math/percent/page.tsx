import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import PercentCalculator from '@/components/calculators/percent-calculator';
import { Metadata } from 'next';

/**
 * Metadata for the Percentage Calculator page
 * Includes SEO-optimized title, description, and keywords
 */
export const metadata: Metadata = {
	title: 'Online Percentage Calculator - Calculate Percentages Fast | Calc1',
	description:
		'Simple online percentage calculator: calculate percentage of a number, find what percent one number is of another, or increase a number by percent. Available in 4 languages.',
	keywords: [
		'percentage calculator',
		'percent calculator',
		'online calculator',
		'math calculator',
		'percentage of number',
		'percent increase',
		'percent decrease',
		'percentage ratio',
		'math tools',
		'online math',
	],
	openGraph: {
		title: 'Online Percentage Calculator - Calculate Percentages Fast',
		description:
			'Simple online percentage calculator: calculate percentage of a number, find what percent one number is of another, or increase a number by percent.',
		type: 'website',
	},
	twitter: {
		card: 'summary',
		title: 'Online Percentage Calculator',
		description:
			'Simple online percentage calculator: calculate percentage of a number, find what percent one number is of another, or increase a number by percent.',
	},
};

/**
 * Percentage Calculator Page Component
 *
 * This page provides a comprehensive percentage calculator with multiple calculation modes:
 * - Find percentage of a number
 * - Find what percentage one number is of another
 * - Find number from percentage
 * - Increase/decrease number by percentage
 *
 * Features:
 * - Multilingual support (EN, DE, ES, RU)
 * - Responsive design
 * - Real-time calculations
 * - SEO optimized
 * - Structured data for search engines
 */
export default function PercentCalculatorPage() {
	const t = useTranslations('math_percent');
	const tCommon = useTranslations();
	const locale = useLocale();

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Schema.org structured data for CalculatorApplication */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'CalculatorApplication',
						name: t('title'),
						description: t('description'),
						url: `https://calc1.ru/${locale}/math/percent`,
						applicationCategory: 'MathApplication',
						operatingSystem: 'Web Browser',
						offers: {
							'@type': 'Offer',
							price: '0',
							priceCurrency: 'USD',
						},
						featureList: [
							t('find_percent_of_number'),
							t('what_percent_is'),
							t('find_number_from_percent'),
							t('increase_or_decrease'),
						],
						inLanguage: locale,
						author: {
							'@type': 'Organization',
							name: 'Calculator #1',
							url: 'https://calc1.ru',
						},
					}),
				}}
			/>

			<Header />

			<Breadcrumbs
				items={[
					{
						label: tCommon('categories.math.title'),
						href: '/math',
					},
					{ label: t('title') },
				]}
			/>

			{/* Main Content */}
			<main className='container mx-auto px-4 py-8'>
				{/* Calculator Component */}
				<PercentCalculator />

				{/* SEO Content Section */}
				<section className='mt-8 max-w-4xl mx-auto'>
					<div className='bg-white rounded-lg shadow-sm p-6'>
						<h2 className='text-xl font-semibold text-gray-900 mb-4'>
							{t('seo.content.title')}
						</h2>
						<div className='prose prose-gray max-w-none'>
							<p className='text-gray-600 leading-relaxed mb-6'>
								{t('seo.content.description')}
							</p>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className='mt-8 max-w-4xl mx-auto'>
					<div className='bg-white rounded-lg shadow-sm p-6'>
						<h3 className='text-lg font-semibold text-gray-900 mb-4'>
							Calculator Features
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='space-y-3'>
								<div className='flex items-center space-x-3'>
									<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
									<span className='text-gray-700'>
										{t('find_percent_of_number')}
									</span>
								</div>
								<div className='flex items-center space-x-3'>
									<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
									<span className='text-gray-700'>
										{t('what_percent_is')}
									</span>
								</div>
								<div className='flex items-center space-x-3'>
									<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
									<span className='text-gray-700'>
										{t('find_number_from_percent')}
									</span>
								</div>
							</div>
							<div className='space-y-3'>
								<div className='flex items-center space-x-3'>
									<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
									<span className='text-gray-700'>
										{t('increase_or_decrease')}
									</span>
								</div>
								<div className='flex items-center space-x-3'>
									<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
									<span className='text-gray-700'>
										Real-time calculations
									</span>
								</div>
								<div className='flex items-center space-x-3'>
									<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
									<span className='text-gray-700'>
										Mobile responsive design
									</span>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
