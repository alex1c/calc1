import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import TileLaminateCalculator from '@/components/calculators/tile-laminate-calculator';
import SEOContent from '@/components/seo-content';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export default function TileLaminatePage() {
	const t = useTranslations('calculators.tile-laminate');

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
			<SEOContent namespace='calculators.tile-laminate' />
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
	const t = (key: string) => messages.calculators['tile-laminate'].seo[key];

	return {
		title: t('title'),
		description: t('overview.content'),
		keywords: t('seo'),
	};
}
