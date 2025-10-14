import { Metadata } from 'next';
import { useTranslations, useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import VolumeCalculator from '@/components/calculators/volume-calculator';
import VolumeSEO from '@/components/seo/volume-seo';

const locales = ['ru', 'en', 'es', 'de'];

interface PageProps {
	params: {
		locale: string;
	};
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { locale } = params;
	if (!locales.includes(locale)) {
		notFound();
	}
	const messages = (await import(`../../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages.calculators.volume[key];

	return {
		title: t('title'),
		description: t('description'),
		keywords: [
			'volume calculator',
			'sphere volume',
			'cube volume',
			'cylinder volume',
			'geometry calculator',
			'math calculator',
			'online calculator',
			'калькулятор объёма',
			'объём сферы',
			'объём куба',
			'объём цилиндра',
			'calculadora de volumen',
			'volumenrechner',
		],
		alternates: {
			canonical: `https://calc1.ru/${locale}/math/volume`,
			languages: {
				ru: 'https://calc1.ru/ru/math/volume',
				en: 'https://calc1.ru/en/math/volume',
				es: 'https://calc1.ru/es/math/volume',
				de: 'https://calc1.ru/de/math/volume',
			},
		},
		openGraph: {
			title: t('title'),
			description: t('description'),
			url: `https://calc1.ru/${locale}/math/volume`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
		},
	};
}

export default function VolumeCalculatorPage() {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{
						label: t('categories.math.title'),
						href: '/math',
					},
					{ label: t('calculators.volume.title') },
				]}
			/>
			<VolumeCalculator />

			{/* SEO Content */}
			<section className='bg-white py-12'>
				<div className='max-w-4xl mx-auto px-6'>
					<VolumeSEO />
				</div>
			</section>
		</div>
	);
}
