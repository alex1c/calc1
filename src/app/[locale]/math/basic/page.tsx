import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import BasicMathCalculator from '@/components/calculators/basic-math-calculator';
import { Metadata } from 'next';

/**
 * Metadata for the Basic Math Calculator page
 * Includes SEO-optimized title, description, and keywords
 */
export const metadata: Metadata = {
	title: 'Online Basic Math Calculator - Addition, Subtraction, Multiplication, Division | Calc1',
	description:
		'Simple online calculator for basic arithmetic operations. Quickly calculate sum, difference, product and quotient. Supports English, German, Spanish and Russian languages.',
	keywords:
		'basic math calculator, addition calculator, subtraction calculator, multiplication calculator, division calculator, arithmetic operations, online calculator, math calculator',
	openGraph: {
		title: 'Online Basic Math Calculator',
		description:
			'Simple online calculator for basic arithmetic operations. Quickly calculate sum, difference, product and quotient.',
		type: 'website',
	},
	twitter: {
		card: 'summary',
		title: 'Online Basic Math Calculator',
		description:
			'Simple online calculator for basic arithmetic operations. Quickly calculate sum, difference, product and quotient.',
	},
};

/**
 * Basic Math Calculator Page Component
 *
 * This page provides a user interface for performing basic arithmetic operations
 * including addition, subtraction, multiplication, and division. It includes
 * proper SEO optimization, breadcrumb navigation, and schema.org markup.
 */
export default function BasicMathPage() {
	const t = useTranslations('math_basic');
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
						name: t('seo_title'),
						description: t('seo_description'),
						url: `https://calc1.ru/${locale}/math/basic`,
						applicationCategory: 'MathApplication',
						operatingSystem: 'Web Browser',
						offers: {
							'@type': 'Offer',
							price: '0',
							priceCurrency: 'USD',
						},
						featureList: [
							'Addition',
							'Subtraction',
							'Multiplication',
							'Division',
							'Keyboard Support',
							'Multi-language Support',
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
						label: t('categories.math.title'),
						href: '/math',
					},
					{ label: t('title') },
				]}
			/>

			{/* Main Content */}
			<main className='container mx-auto px-4 py-8'>
				{/* Calculator Component */}
				<BasicMathCalculator />

				{/* SEO Content Section */}
				<section className='mt-8 max-w-4xl mx-auto'>
					<div className='bg-white rounded-lg shadow-sm p-6'>
						<h2 className='text-xl font-semibold text-gray-900 mb-4'>
							{t('seo_content.title')}
						</h2>
						<div className='prose prose-gray max-w-none'>
							<p className='text-gray-600 leading-relaxed'>
								{t('seo_content.content')}
							</p>
						</div>
					</div>
				</section>

				{/* Additional Features Section */}
				<section className='mt-8 max-w-4xl mx-auto'>
					<div className='bg-white rounded-lg shadow-sm p-6'>
						<h3 className='text-lg font-semibold text-gray-900 mb-4'>
							{t('features.title')}
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='space-y-3'>
								<div className='flex items-center space-x-3'>
									<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
									<span className='text-gray-700'>
										{t('features.keyboard_support')}
									</span>
								</div>
								<div className='flex items-center space-x-3'>
									<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
									<span className='text-gray-700'>
										{t('features.enter_key')}
									</span>
								</div>
								<div className='flex items-center space-x-3'>
									<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
									<span className='text-gray-700'>
										{t('features.auto_formatting')}
									</span>
								</div>
							</div>
							<div className='space-y-3'>
								<div className='flex items-center space-x-3'>
									<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
									<span className='text-gray-700'>
										{t('features.division_protection')}
									</span>
								</div>
								<div className='flex items-center space-x-3'>
									<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
									<span className='text-gray-700'>
										{t('features.multi_language')}
									</span>
								</div>
								<div className='flex items-center space-x-3'>
									<div className='w-2 h-2 bg-blue-500 rounded-full'></div>
									<span className='text-gray-700'>
										{t('features.mobile_responsive')}
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
