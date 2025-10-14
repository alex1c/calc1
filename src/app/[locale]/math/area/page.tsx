import { Metadata } from 'next';
import { useTranslations, useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import AreaCalculator from '@/components/calculators/area-calculator';
import AreaSEO from '@/components/seo/area-seo';

// Supported locales
const locales = ['ru', 'en', 'es', 'de'];

interface PageProps {
	params: {
		locale: string;
	};
}

/**
 * Generate metadata for the area calculator page
 * @param params - Page parameters including locale
 * @returns Metadata object for SEO
 */
export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { locale } = params;

	// Check if locale is supported
	if (!locales.includes(locale)) {
		notFound();
	}

	const messages = (await import(`../../../../../messages/${locale}.json`))
		.default;
	const t = (key: string) => messages.calculators.area[key];

	return {
		title: t('title'),
		description: t('description'),
		keywords: [
			'area calculator',
			'circle area',
			'square area',
			'triangle area',
			'geometry calculator',
			'math calculator',
			'online calculator',
			'площадь круга',
			'площадь квадрата',
			'площадь треугольника',
			'калькулятор площади',
			'calculadora de área',
			'flächenrechner',
		],
	};
}

/**
 * Area Calculator Page Component
 * Displays the area calculator with SEO content and breadcrumbs
 */
export default function AreaCalculatorPage() {
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
					{ label: t('calculators.area.title') },
				]}
			/>
			<AreaCalculator />

			{/* SEO Content */}
			<section className='bg-white py-12'>
				<div className='max-w-4xl mx-auto px-6'>
					<AreaSEO />
				</div>
			</section>
		</div>
	);
}
