import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import {
	Calculator,
	Plus,
	Minus,
	X,
	Divide,
	Keyboard,
	Smartphone,
} from 'lucide-react';
import Header from '@/components/header';
import BasicMathCalculator from '@/components/calculators/basic-math-calculator';
import BasicMathSEO from '@/components/seo/basic-math-seo';
import Breadcrumbs from '@/components/breadcrumbs';

interface Props {
	params: { locale: string };
}

export default async function BasicMathPage({ params: { locale } }: Props) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.basic',
	});

	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.basic.seo',
	});

	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});

	// Validate locale
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
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
			<div className='bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Calculator className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{t('title')}
							</h1>
						</div>
						<p className='text-xl text-blue-100 max-w-3xl mx-auto mb-8'>
							{t('description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Plus className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									+
								</div>
								<div className='text-blue-100'>
									{t('form.operations.add')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Minus className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									−
								</div>
								<div className='text-blue-100'>
									{t('form.operations.subtract')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<X className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									×
								</div>
								<div className='text-blue-100'>
									{t('form.operations.multiply')}
								</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Divide className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-2xl font-bold text-white mb-1'>
									÷
								</div>
								<div className='text-blue-100'>
									{t('form.operations.divide')}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Calculator */}
				<BasicMathCalculator />

				{/* SEO Content */}
				<BasicMathSEO />
			</div>

			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebApplication',
						name: tSeo('title'),
						description: tSeo('description'),
						url: `https://calc1.ru/${locale}/math/basic`,
						applicationCategory: 'MathApplication',
						operatingSystem: 'Any',
						offers: {
							'@type': 'Offer',
							price: '0',
							priceCurrency: 'RUB',
						},
						author: {
							'@type': 'Organization',
							name: 'Calc1.ru',
							url: 'https://calc1.ru',
						},
						aggregateRating: {
							'@type': 'AggregateRating',
							ratingValue: '4.8',
							ratingCount: '156',
						},
						featureList: [
							t('form.operations.add'),
							t('form.operations.subtract'),
							t('form.operations.multiply'),
							t('form.operations.divide'),
							'Поддержка клавиатуры',
							'Многоязычность',
						],
					}),
				}}
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
