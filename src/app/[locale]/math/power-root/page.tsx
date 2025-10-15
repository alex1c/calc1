import { Metadata } from 'next';
import { useTranslations, useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import PowerRootCalculator from '@/components/calculators/power-root-calculator';
import PowerRootSEO from '@/components/seo/power-root-seo';

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
	const t = (key: string) => messages.calculators.powerRoot[key];

	return {
		title: t('title'),
		description: t('description'),
		keywords: [
			'power calculator',
			'root calculator',
			'exponent calculator',
			'math calculator',
			'online calculator',
			'калькулятор степеней',
			'калькулятор корней',
			'возведение в степень',
			'извлечение корня',
			'calculadora de potencias',
			'calculadora de raíces',
			'potenzrechner',
			'wurzelrechner',
		],
		alternates: {
			canonical: `https://calc1.ru/${locale}/math/power-root`,
			languages: {
				ru: 'https://calc1.ru/ru/math/power-root',
				en: 'https://calc1.ru/en/math/power-root',
				es: 'https://calc1.ru/es/math/power-root',
				de: 'https://calc1.ru/de/math/power-root',
			},
		},
		openGraph: {
			title: t('title'),
			description: t('description'),
			url: `https://calc1.ru/${locale}/math/power-root`,
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

export default function PowerRootCalculatorPage() {
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
					{ label: t('calculators.powerRoot.title') },
				]}
			/>
			<PowerRootCalculator />

			{/* SEO Content */}
			<section className='bg-white py-12'>
				<div className='max-w-4xl mx-auto px-6'>
					<PowerRootSEO />
				</div>
			</section>
		</div>
	);
}
