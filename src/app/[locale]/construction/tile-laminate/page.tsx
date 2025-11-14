import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import TileLaminateCalculator from '@/components/calculators/tile-laminate-calculator';
import TileLaminateSEO from '@/components/seo/tile-laminate-seo';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import {
	getSafeTitle,
	getSafeDescription,
} from '@/lib/metadata-utils';

export default function TileLaminatePage() {
	const t = useTranslations('calculators.tile-laminate');
	const tBreadcrumbs = useTranslations('breadcrumbs');

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{
						label: tBreadcrumbs('categories.construction'),
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
	const { loadMergedConstructionTranslations } = await import('@/lib/i18n-utils');
	const messages = await loadMergedConstructionTranslations(locale);
	const t = (key: string) => messages.calculators['tile-laminate'].seo[key];

	const title = getSafeTitle(t('title'), 'Калькулятор плитки и ламината');
	const description = getSafeDescription(
		t('overview.content') || t('description'),
		'Бесплатный онлайн калькулятор для расчёта количества плитки и ламината. Определите необходимое количество материала с учётом подрезки и запаса.'
	);

	return {
		title,
		description,
		keywords:
			'калькулятор плитки, калькулятор ламината, расчёт плитки, расчёт ламината, количество плитки, количество ламината, упаковки плитки, упаковки ламината, запас материала, подрезка плитки',
	};
}
