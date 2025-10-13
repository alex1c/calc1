import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import RoofCalculator from '@/components/calculators/roof-calculator';
import RoofingSEO from '@/components/seo/roofing-seo';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export default function RoofingPage() {
	const t = useTranslations('calculators.roof');

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
			<RoofCalculator />
			<RoofingSEO />
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
	const t = (key: string) => messages.calculators.roof.seo[key];

	return {
		title: t('title'),
		description: t('overview.content'),
		keywords: t('seo'),
	};
}
