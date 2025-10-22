import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import GasUsageCalculator from '@/components/calculators/gas-usage-calculator';
import GasUsageSEO from '@/components/seo/gas-usage-seo';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'calculators.gasUsage.seo',
	});
	return {
		title: t('meta.title'),
		description: t('meta.description'),
		keywords: t('meta.keywords'),
		alternates: {
			canonical: 'https://calc1.ru/life/gas-usage',
			languages: {
				ru: 'https://calc1.ru/ru/life/gas-usage',
				en: 'https://calc1.ru/en/life/gas-usage',
				de: 'https://calc1.ru/de/life/gas-usage',
				es: 'https://calc1.ru/es/life/gas-usage',
			},
		},
		openGraph: {
			title: t('meta.title'),
			description: t('meta.description'),
			url: 'https://calc1.ru/life/gas-usage',
			siteName: 'Calc1.ru',
			images: [
				{
					url: 'https://calc1.ru/images/gas-usage-og.jpg',
					width: 1200,
					height: 630,
					alt: t('meta.title'),
				},
			],
			locale,
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: t('meta.title'),
			description: t('meta.description'),
			images: ['https://calc1.ru/images/gas-usage-og.jpg'],
		},
	};
}

export default async function Page({ params: { locale } }: Props) {
	if (!['ru', 'en', 'de', 'es'].includes(locale)) notFound();

	const t = await getTranslations({
		locale,
		namespace: 'calculators.gasUsage',
	});
	const tSeo = await getTranslations({
		locale,
		namespace: 'calculators.gasUsage.seo',
	});

	const breadcrumbs = [
		{ label: t('breadcrumbs.life'), href: '/life' },
		{ label: tSeo('h1') },
	];

	const faqRaw = tSeo.raw('faqItems');
	const faq = Array.isArray(faqRaw)
		? (faqRaw as Array<{ q: string; a: string }>)
		: [];

	const faqStructuredData = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faq.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a },
		})),
	};

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(faqStructuredData),
				}}
			/>
			<div className='min-h-screen bg-gray-50'>
				<Header />
				<div className='container mx-auto px-4 py-8'>
					<Breadcrumbs items={breadcrumbs} />
					<div className='text-center mb-8'>
						<h1 className='text-4xl font-bold text-gray-900 mb-3'>
							{tSeo('h1')}
						</h1>
						<p className='text-gray-600 text-lg'>
							{tSeo('description')}
						</p>
					</div>
					<GasUsageCalculator />
					<GasUsageSEO />
				</div>
			</div>
		</>
	);
}
