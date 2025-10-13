import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import TileLaminateCalculator from '@/components/calculators/tile-laminate-calculator';
import TileLaminateSEO from '@/components/seo/tile-laminate-seo';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export default function TileLaminatePage() {
	const t = useTranslations('tile-laminate');

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{
						label: t('breadcrumbs.construction'),
						href: '/construction',
					},
					{ label: t('title') },
				]}
			/>
			<TileLaminateCalculator />
			<TileLaminateSEO />
		</div>
	);
}

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const messages = (await import(`../../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages['tile-laminate'].seo[key];

	return {
		title: t('title'),
		description: t('overview.content'),
		keywords:
			'калькулятор плитки, калькулятор ламината, расчёт плитки, расчёт ламината, количество плитки, количество ламината, упаковки плитки, упаковки ламината, запас материала, подрезка плитки',
	};
}
