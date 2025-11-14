import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import {
	generateLanguageAlternates,
	getSafeTitle,
	getSafeDescription,
} from '@/lib/metadata-utils';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.pregnancy.seo',
	});

	const baseUrl = 'https://calc1.ru';
	const currentPath = `/${locale}/life/pregnancy`;

	const title = getSafeTitle(t('title'), 'Калькулятор беременности');
	const description = getSafeDescription(
		t('description'),
		'Бесплатный онлайн калькулятор беременности. Определите срок беременности, дату родов, неделю беременности и другие важные параметры.'
	);
	const keywordsValue = t('keywords');

	return {
		title,
		description,
		keywords: keywordsValue ? keywordsValue.split(',').map((k: string) => k.trim()) : [],
		authors: [{ name: 'Calc1.ru' }],
		creator: 'Calc1.ru',
		publisher: 'Calc1.ru',
		formatDetection: {
			email: false,
			address: false,
			telephone: false,
		},
		metadataBase: new URL(baseUrl),
		alternates: {
			canonical: currentPath,
			languages: generateLanguageAlternates('/life/pregnancy'),
		},
		openGraph: {
			title: t('title'),
			description: t('description'),
			url: `${baseUrl}${currentPath}`,
			siteName: 'Calc1.ru',
			images: [
				{
					url: `${baseUrl}/images/pregnancy-calculator-og.jpg`,
					width: 1200,
					height: 630,
					alt: t('title'),
				},
			],
			locale: locale,
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
			images: [`${baseUrl}/images/pregnancy-calculator-og.jpg`],
		},
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		verification: {
			google: 'your-google-verification-code',
			yandex: 'ae0a3b638a5ae1ab',
		},
	};
}

export default function PregnancyLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
