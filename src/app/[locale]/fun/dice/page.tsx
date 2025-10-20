import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import DiceRoller from '@/components/calculators/dice-roller';
import DiceRollerSEO from '@/components/seo/dice-roller-seo';

/**
 * Generate metadata for the dice roller page
 */
export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const messages = (await import(`../../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages.calculators.diceRoller.seo[key];

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

/**
 * Dice Roller Page
 * Interactive dice rolling simulator
 */
export default async function DiceRollerPage({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.diceRoller',
	});

	return (
		<div className='min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50'>
			<Header />
			<Breadcrumbs
				items={[
					{ label: t('breadcrumbs.home'), href: `/${locale}` },
					{ label: t('breadcrumbs.fun'), href: `/${locale}/fun` },
					{
						label: t('breadcrumbs.diceRoller'),
						href: `/${locale}/fun/dice`,
					},
				]}
			/>

			<main className='container mx-auto px-4 py-8'>
				{/* Header */}
				<div className='text-center mb-8'>
					<h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
						{t('title')}
					</h1>
					<p className='text-xl text-gray-600 max-w-3xl mx-auto'>
						{t('description')}
					</p>
				</div>

				{/* Roller */}
				<div className='max-w-4xl mx-auto'>
					<DiceRoller />
				</div>

				{/* SEO Content */}
				<div className='max-w-4xl mx-auto mt-16'>
					<DiceRollerSEO />
				</div>
			</main>
		</div>
	);
}
