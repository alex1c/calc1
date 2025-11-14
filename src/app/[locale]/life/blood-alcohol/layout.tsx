import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import {
	getSafeTitle,
	getSafeDescription,
} from '@/lib/metadata-utils';

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

	const title = getSafeTitle(t('title'), 'Калькулятор содержания алкоголя в крови');
	const description = getSafeDescription(
		t('description'),
		'Бесплатный онлайн калькулятор для определения содержания алкоголя в крови. Расчёт промилле на основе количества выпитого алкоголя, веса и времени.'
	);
	const keywordsValue = t('keywords');

	return {
		title,
		description,
		keywords: keywordsValue ? keywordsValue.split(',').map((k: string) => k.trim()) : [],
		openGraph: {
			title,
			description,
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
			title,
			description,
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
