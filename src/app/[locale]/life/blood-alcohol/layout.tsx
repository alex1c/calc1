import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

interface BloodAlcoholLayoutProps {
	children: React.ReactNode;
	params: {
		locale: string;
	};
}

export async function generateMetadata({
	params,
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale: params.locale,
		namespace: 'calculators.bloodAlcohol.seo',
	});

	return {
		title: t('title'),
		description: t('description'),
		keywords: t('keywords'),
		openGraph: {
			title: t('title'),
			description: t('description'),
			type: 'website',
			url: `https://calc1.ru/${params.locale}/life/blood-alcohol`,
			siteName: 'Calc1.ru',
			images: [
				{
					url: 'https://calc1.ru/og-blood-alcohol.jpg',
					width: 1200,
					height: 630,
					alt: t('title'),
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
			images: ['https://calc1.ru/og-blood-alcohol.jpg'],
		},
		alternates: {
			canonical: `https://calc1.ru/${params.locale}/life/blood-alcohol`,
			languages: {
				ru: 'https://calc1.ru/ru/life/blood-alcohol',
				en: 'https://calc1.ru/en/life/blood-alcohol',
				de: 'https://calc1.ru/de/life/blood-alcohol',
				es: 'https://calc1.ru/es/life/blood-alcohol',
			},
		},
	};
}

export default function BloodAlcoholLayout({
	children,
}: BloodAlcoholLayoutProps) {
	return <>{children}</>;
}
