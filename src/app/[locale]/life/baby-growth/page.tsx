import { getTranslations } from 'next-intl/server';
import HeaderWrapper from '@/components/header-wrapper';
import Breadcrumbs from '@/components/breadcrumbs';
import BabyGrowthCalculator from '@/components/calculators/baby-growth-calculator';
import BabyGrowthSEO from '@/components/seo/baby-growth-seo';

interface BabyGrowthPageProps {
	params: {
		locale: string;
	};
}

export default async function BabyGrowthPage({ params }: BabyGrowthPageProps) {
	const t = await getTranslations({
		locale: params.locale,
		namespace: 'calculators.babyGrowth',
	});
	const tSeo = await getTranslations({
		locale: params.locale,
		namespace: 'calculators.babyGrowth.seo',
	});

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			<HeaderWrapper />

			{/* Breadcrumbs */}
			<div className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
				<div className='max-w-4xl mx-auto px-6 py-4'>
					<Breadcrumbs />
				</div>
			</div>

			{/* Hero Section */}
			<section className='bg-gradient-to-r from-pink-500 to-blue-500 text-white py-16'>
				<div className='max-w-4xl mx-auto px-6 text-center'>
					<div className='flex items-center justify-center gap-3 text-5xl mb-6'>
						<span>👶</span>
						<span>📏</span>
						<span>⚖️</span>
					</div>
					<h1 className='text-4xl md:text-5xl font-bold mb-6'>
						{t('title')}
					</h1>
					<p className='text-xl md:text-2xl text-pink-100 mb-8 max-w-3xl mx-auto'>
						{t('description')}
					</p>

					{/* Quick Stats */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto'>
						<div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
							<div className='text-2xl font-bold'>
								{t('hero.who')}
							</div>
							<div className='text-pink-100 text-sm'>
								{t('hero.whoDesc')}
							</div>
						</div>
						<div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
							<div className='text-2xl font-bold'>
								{t('hero.accuracy')}
							</div>
							<div className='text-pink-100 text-sm'>
								{t('hero.accuracyDesc')}
							</div>
						</div>
						<div className='bg-white/10 backdrop-blur-sm rounded-lg p-4'>
							<div className='text-2xl font-bold'>
								{t('hero.ageRange')}
							</div>
							<div className='text-pink-100 text-sm'>
								{t('hero.ageRangeDesc')}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Calculator */}
			<section className='py-12'>
				<BabyGrowthCalculator />
			</section>

			{/* SEO Content */}
			<section className='py-12 bg-white dark:bg-gray-800'>
				<BabyGrowthSEO />
			</section>

			{/* JSON-LD Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebApplication',
						name: tSeo('title'),
						description: tSeo('description'),
						url: `https://calc1.ru/${params.locale}/life/baby-growth`,
						applicationCategory: 'HealthApplication',
						operatingSystem: 'Any',
						offers: {
							'@type': 'Offer',
							price: '0',
							priceCurrency: 'USD',
						},
						featureList: [
							t('features.whoStandards'),
							t('features.percentileCalculation'),
							t('features.growthAssessment'),
							t('features.recommendations'),
						],
					}),
				}}
			/>

			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'FAQPage',
						mainEntity: [
							{
								'@type': 'Question',
								name: tSeo('faq.howToUse.question'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.howToUse.answer'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.whoStandards.question'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.whoStandards.answer'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.percentileMeaning.question'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.percentileMeaning.answer'),
								},
							},
							{
								'@type': 'Question',
								name: tSeo('faq.ageLimit.question'),
								acceptedAnswer: {
									'@type': 'Answer',
									text: tSeo('faq.ageLimit.answer'),
								},
							},
						],
					}),
				}}
			/>
		</div>
	);
}
