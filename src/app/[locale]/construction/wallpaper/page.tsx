import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import WallpaperCalculator from '@/components/calculators/wallpaper-calculator';
import WallpaperSEO from '@/components/seo/wallpaper-seo';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export default function WallpaperPage() {
	const t = useTranslations('calculators.wallpaper');
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
			<WallpaperCalculator />
			<WallpaperSEO />
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
