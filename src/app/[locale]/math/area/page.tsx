import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import {
	Circle,
	Square,
	Triangle,
	Calculator,
	Ruler,
	Target,
	BarChart3,
} from 'lucide-react';
import Header from '@/components/header';
import AreaCalculator from '@/components/calculators/area-calculator';
import AreaSEO from '@/components/seo/area-seo';
import Breadcrumbs from '@/components/breadcrumbs';
import SoftwareApplicationSchema from '@/components/seo/software-application-schema';

interface Props {
	params: { locale: string };
}

export default async function AreaCalculatorPage({
	params: { locale },
}: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.area',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.area.seo',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	// Validate locale
	if (!['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'].includes(locale)) {
		notFound();
	}

	const breadcrumbItems = [
		{
			label: tCategories('math.title'),
			href: '/math',
		},
		{
			label: t('title'),
		},
	];

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			{/* Header */}
			<Header />

			{/* Breadcrumbs */}
			<div className='bg-white dark:bg-gray-800 shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
					<Breadcrumbs items={breadcrumbItems} />
				</div>
			</div>

			{/* Hero Section */}
			<div className='bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Calculator className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{t('title')}
							</h1>
						</div>
						<p className='text-xl text-indigo-100 max-w-3xl mx-auto mb-8'>
							{t('description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Circle className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									πr²
								</div>
								<div className='text-indigo-100'>
									{t('form.figureTypes.circle')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Square className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									a²
								</div>
								<div className='text-indigo-100'>
									{t('form.figureTypes.square')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Triangle className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									½ah
								</div>
								<div className='text-indigo-100'>
									{t('form.figureTypes.triangle')}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<AreaCalculator />

				{/* SEO Content */}
				<AreaSEO />
			</div>

			{/* Structured Data - SoftwareApplication */}
			<SoftwareApplicationSchema
				category='math'
				calculatorId='area'
				namespace='calculators.area.seo'
				featureKeys={['circle', 'square', 'triangle', 'accurateFormulas', 'instantCalculations', 'multilingual']}
				featureNamespace='calculators.area.form.figureTypes'
				ratingValue='4.8'
				ratingCount='189'
				screenshot='https://calc1.ru/images/area-screenshot.jpg'
			/>
			{/* FAQ Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'FAQPage',
						mainEntity: [
							{
								'@type': 'Question',
								name: tSeo('faq.faqItems.0.q'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.faqItems.0.a'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.faqItems.1.q'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.faqItems.1.a'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.faqItems.2.q'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.faqItems.2.a'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.faqItems.3.q'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.faqItems.3.a'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.faqItems.4.q'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.faqItems.4.a'),
								},
							},
						],
					}),
				}}
			/>
		</div>
	);
}
