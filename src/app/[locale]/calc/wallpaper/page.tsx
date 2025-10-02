import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import WallpaperCalculator from '@/components/calculators/wallpaper-calculator';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export default function WallpaperPage() {
	const t = useTranslations('calculators.wallpaper');

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
			<WallpaperCalculator />
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
	const t = (key: string) => messages.calculators.wallpaper.seo[key];

	return {
		title: t('title'),
		description: t('overview.content'),
		keywords: t('seo'),
	};
}
