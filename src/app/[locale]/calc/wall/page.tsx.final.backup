import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import WallCalculator from '@/components/calculators/wall-calculator';
import WallSEO from '@/components/seo/wall-seo';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export default function WallPage() {
	const t = useTranslations('calculators.wall');

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
			<WallCalculator />
			<WallSEO />
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
	const t = (key: string) => messages.calculators.wall.seo[key];

	return {
		title: t('title'),
		description: t('overview.content'),
		keywords: t('seo'),
	};
}
