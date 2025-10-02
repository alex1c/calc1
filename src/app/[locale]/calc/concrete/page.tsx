import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import ConcreteCalculator from '@/components/calculators/concrete-calculator';
import SEOContent from '@/components/seo-content';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export default function ConcretePage() {
	const t = useTranslations('calculators.concrete');

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
			<ConcreteCalculator />
			<SEOContent namespace='calculators.concrete' />
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
	const t = (key: string) => messages.calculators.concrete.seo[key];

	return {
		title: t('title'),
		description: t('overview.content'),
		keywords: t('seo'),
	};
}
