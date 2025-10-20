import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Header from '@/components/header';
import PlanetWeightCalculator from '@/components/calculators/planet-weight-calculator';
import PlanetWeightSeo from '@/components/seo/planet-weight-seo';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const messages = (await import(`../../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages.calculators.planetWeight.seo[key];

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
		openGraph: {
			title: t('title'),
			description: t('description'),
			type: 'website',
		},
	};
}

export default function PlanetWeightPage() {
	const t = useTranslations('calculators.planetWeight');

	return (
		<div className='min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'>
			<Header />
			<div className='container mx-auto px-4 py-8'>
				{/* Breadcrumbs */}
				<nav className='mb-6'>
					<ol className='flex items-center space-x-2 text-sm text-gray-600'>
						<li>
							<a
								href='/'
								className='hover:text-indigo-600'
							>
								{t('breadcrumbs.home')}
							</a>
						</li>
						<li className='text-gray-400'>/</li>
						<li>
							<a
								href='/fun'
								className='hover:text-indigo-600'
							>
								{t('breadcrumbs.fun')}
							</a>
						</li>
						<li className='text-gray-400'>/</li>
						<li className='text-gray-900 font-medium'>
							{t('breadcrumbs.planetWeight')}
						</li>
					</ol>
				</nav>

				{/* Header */}
				<div className='text-center mb-8'>
					<h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
						{t('title')}
					</h1>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
						{t('description')}
					</p>
				</div>

				{/* Calculator */}
				<div className='max-w-4xl mx-auto'>
					<PlanetWeightCalculator />
				</div>

				{/* SEO Content */}
				<div className='max-w-4xl mx-auto mt-16'>
					<PlanetWeightSeo />
				</div>
			</div>
		</div>
	);
}
