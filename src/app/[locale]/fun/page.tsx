import { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import Link from 'next/link';
import {
	Globe,
	Users,
	User,
	Shuffle,
	Ticket,
	Lock,
	Dice1,
	Coins,
	Star,
	FileText,
	UserCheck,
	Sparkles,
	Calculator,
	Zap,
	CheckCircle,
} from 'lucide-react';

interface Props {
	params: { locale: string };
}

export async function generateMetadata({
	params: { locale },
}: Props): Promise<Metadata> {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}
	const messages = (await import(`../../../../messages/${locale}.json`))
		.default;
	const seoData = messages.categories?.fun?.seo || {};
	const t = (key: string) => messages.categories['fun'][key];

	const title = seoData.title || `${t(
		'title'
	)} — Онлайн развлекательные калькуляторы | Calc1.ru`;
	const description = seoData.description ||
		'Развлекательные калькуляторы онлайн: генераторы паролей, никнеймов, имен, случайных чисел, калькуляторы совместимости и любви, зодиак, игры с кубиками и монетами. Бесплатные онлайн калькуляторы для развлечений и творчества.';

	const keywordsString = seoData.keywords || '';
	const keywords = keywordsString
		? keywordsString
				.split(',')
				.map((k: string) => k.trim())
				.filter(Boolean)
		: [
				'развлекательные калькуляторы',
				'генератор паролей',
				'генератор никнеймов',
		  ];

	return {
		title,
		description,
		keywords,
		authors: [{ name: 'Calc1.ru', url: 'https://calc1.ru' }],
		creator: 'Calc1.ru',
		publisher: 'Calc1.ru',
		formatDetection: {
			email: false,
			address: false,
			telephone: false,
		},
		metadataBase: new URL('https://calc1.ru'),
		alternates: {
			canonical: `https://calc1.ru/${locale}/fun`,
			languages: {
				ru: 'https://calc1.ru/ru/fun',
				en: 'https://calc1.ru/en/fun',
				es: 'https://calc1.ru/es/fun',
				de: 'https://calc1.ru/de/fun',
			},
		},
		openGraph: {
			title: `${title} | Calc1.ru`,
			description,
			url: `https://calc1.ru/${locale}/fun`,
			siteName: 'Calc1.ru',
			locale: locale,
			type: 'website',
			images: [
				{
					url: 'https://calc1.ru/images/fun-calculators-og.jpg',
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: `${title} | Calc1.ru`,
			description,
			images: ['https://calc1.ru/images/fun-calculators-og.jpg'],
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
			yandex: 'your-yandex-verification-code',
		},
	};
}

const getCalculators = (t: any) => [
	{
		id: 'planet-weight',
		title: t('calculators.planetWeight.title'),
		description: t('calculators.planetWeight.description'),
		icon: Globe,
		href: '/fun/planet-weight',
	},
	{
		id: 'love',
		title: t('calculators.loveCompatibility.title'),
		description: t('calculators.loveCompatibility.description'),
		icon: Users,
		href: '/fun/love',
	},
	{
		id: 'nickname',
		title: t('calculators.nicknameGenerator.title'),
		description: t('calculators.nicknameGenerator.description'),
		icon: User,
		href: '/fun/nickname',
	},
	{
		id: 'random',
		title: t('calculators.randomNumberGenerator.title'),
		description: t('calculators.randomNumberGenerator.description'),
		icon: Shuffle,
		href: '/fun/random',
	},
	{
		id: 'lottery',
		title: t('calculators.lotteryGenerator.title'),
		description: t('calculators.lotteryGenerator.description'),
		icon: Ticket,
		href: '/fun/lottery',
	},
	{
		id: 'password',
		title: t('calculators.passwordGenerator.title'),
		description: t('calculators.passwordGenerator.description'),
		icon: Lock,
		href: '/fun/password',
	},
	{
		id: 'dice',
		title: t('calculators.diceRoller.title'),
		description: t('calculators.diceRoller.description'),
		icon: Dice1,
		href: '/fun/dice',
	},
	{
		id: 'coin',
		title: t('calculators.coinFlipper.title'),
		description: t('calculators.coinFlipper.description'),
		icon: Coins,
		href: '/fun/coin',
	},
	{
		id: 'zodiac',
		title: t('calculators.zodiacCalculator.title'),
		description: t('calculators.zodiacCalculator.description'),
		icon: Star,
		href: '/fun/zodiac',
	},
	{
		id: 'name-generator',
		title: t('calculators.nameGenerator.title'),
		description: t('calculators.nameGenerator.description'),
		icon: FileText,
		href: '/fun/name-generator',
	},
	{
		id: 'character-traits',
		title: t('calculators.characterTraits.title'),
		description: t('calculators.characterTraits.description'),
		icon: UserCheck,
		href: '/fun/character-traits',
	},
	{
		id: 'fantasy-world',
		title: t('calculators.fantasyWorld.title'),
		description: t('calculators.fantasyWorld.description'),
		icon: Sparkles,
		href: '/fun/fantasy-world',
	},
];

export default async function FunPage({ params: { locale } }: Props) {
	if (!['ru', 'en', 'es', 'de'].includes(locale)) {
		notFound();
	}

	const t = await getTranslations({ locale });
	const tCategories = await getTranslations({
		locale,
		namespace: 'categories',
	});
	const currentLocale = await getLocale();

	const calculators = getCalculators(t);
	const breadcrumbItems = [
		{ label: t('breadcrumbs.home'), href: '/' },
		{ label: tCategories('fun.title') },
	];

	// Get SEO content
	const messages = (await import(`../../../../messages/${locale}.json`))
		.default;
	const seoData = messages.categories?.fun?.seo || {};
	const faqItems = seoData.faq?.faqItems || [];

	// Prepare structured data for calculators
	const calculatorItems = calculators.map((calc, index) => ({
		'@type': 'ListItem',
		position: index + 1,
		name: calc.title,
		description: calc.description,
		item: `https://calc1.ru/${locale}${calc.href}`,
	}));

	// Structured data
	const breadcrumbSchema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: t('breadcrumbs.home'),
				item: `https://calc1.ru/${locale}`,
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: tCategories('fun.title'),
				item: `https://calc1.ru/${locale}/fun`,
			},
		],
	};

	const collectionPageSchema = {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: tCategories('fun.title'),
		description: seoData.description || tCategories('fun.description'),
		url: `https://calc1.ru/${locale}/fun`,
		mainEntity: {
			'@type': 'ItemList',
			numberOfItems: calculators.length,
			itemListElement: calculatorItems,
		},
	};

	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqItems.slice(0, 30).map((item: { q: string; a: string }) => ({
			'@type': 'Question',
			name: item.q,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.a,
			},
		})),
	};

	const organizationSchema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Calc1.ru',
		url: 'https://calc1.ru',
		logo: 'https://calc1.ru/logo.png',
		sameAs: [],
	};

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			<Header />

			{/* Structured Data */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
			/>
			{faqItems.length > 0 && (
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
				/>
			)}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
			/>

			{/* Breadcrumbs */}
			<div className='bg-white dark:bg-gray-800 shadow-sm'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
					<Breadcrumbs items={breadcrumbItems} />
				</div>
			</div>

			{/* Hero Section */}
			<div className='bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-800 dark:via-pink-800 dark:to-red-800'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
					<div className='text-center'>
						<div className='flex items-center justify-center mb-6'>
							<Sparkles className='w-12 h-12 text-white mr-4' />
							<h1 className='text-4xl md:text-5xl font-bold text-white'>
								{tCategories('fun.title')}
							</h1>
						</div>
						<p className='text-xl text-purple-100 max-w-3xl mx-auto mb-8'>
							{tCategories('fun.description')}
						</p>

						{/* Quick Stats */}
						<div className='grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto'>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Calculator className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-3xl font-bold text-white mb-1'>
									{calculators.length}
								</div>
								<div className='text-purple-100 text-sm'>Калькуляторов</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Zap className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-3xl font-bold text-white mb-1'>
									Мгновенно
								</div>
								<div className='text-purple-100 text-sm'>Результаты</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<CheckCircle className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-3xl font-bold text-white mb-1'>
									Бесплатно
								</div>
								<div className='text-purple-100 text-sm'>Использование</div>
							</div>
							<div className='bg-white/10 backdrop-blur-sm rounded-lg p-6'>
								<Globe className='w-8 h-8 text-white mx-auto mb-2' />
								<div className='text-3xl font-bold text-white mb-1'>Онлайн</div>
								<div className='text-purple-100 text-sm'>24/7</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* SEO Overview Section */}
				{seoData.overview && (
					<section className='mb-12'>
						<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
							{seoData.overview.title}
						</h2>
						<p className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
							{seoData.overview.content}
						</p>
						{seoData.overview.additionalContent && (
							<p className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed'>
								{seoData.overview.additionalContent}
							</p>
						)}
					</section>
				)}

				{/* Calculators Grid */}
				<section className='mb-12'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
						Доступные калькуляторы
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{calculators.map((calculator) => (
							<Link
								key={calculator.id}
								href={`/${locale}${calculator.href}`}
								className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md transition-all duration-200'
							>
								<div className='flex items-center mb-4'>
									<calculator.icon className='h-8 w-8 text-purple-600 dark:text-purple-400 mr-3' />
									<h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
										{calculator.title}
									</h3>
								</div>
								<p className='text-gray-600 dark:text-gray-400'>
									{calculator.description}
								</p>
							</Link>
						))}
					</div>
				</section>

				{/* Advantages Section */}
				{seoData.advantages && (
					<section className='mb-12'>
						<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
							{seoData.advantages.title}
						</h2>
						<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
							{seoData.advantages.content}
						</p>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{seoData.advantages.free && (
								<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 border border-purple-100 dark:border-purple-800'>
									<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
										{seoData.advantages.free.title}
									</h3>
									<p className='text-gray-700 dark:text-gray-300'>
										{seoData.advantages.free.content}
									</p>
								</div>
							)}
							{seoData.advantages.instant && (
								<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 border border-purple-100 dark:border-purple-800'>
									<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
										{seoData.advantages.instant.title}
									</h3>
									<p className='text-gray-700 dark:text-gray-300'>
										{seoData.advantages.instant.content}
									</p>
								</div>
							)}
							{seoData.advantages.secure && (
								<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 border border-purple-100 dark:border-purple-800'>
									<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
										{seoData.advantages.secure.title}
									</h3>
									<p className='text-gray-700 dark:text-gray-300'>
										{seoData.advantages.secure.content}
									</p>
								</div>
							)}
							{seoData.advantages.comprehensive && (
								<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 border border-purple-100 dark:border-purple-800'>
									<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
										{seoData.advantages.comprehensive.title}
									</h3>
									<p className='text-gray-700 dark:text-gray-300'>
										{seoData.advantages.comprehensive.content}
									</p>
								</div>
							)}
							{seoData.advantages.mobile && (
								<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 border border-purple-100 dark:border-purple-800'>
									<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
										{seoData.advantages.mobile.title}
									</h3>
									<p className='text-gray-700 dark:text-gray-300'>
										{seoData.advantages.mobile.content}
									</p>
								</div>
							)}
							{seoData.advantages.creative && (
								<div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6 border border-purple-100 dark:border-purple-800'>
									<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
										{seoData.advantages.creative.title}
									</h3>
									<p className='text-gray-700 dark:text-gray-300'>
										{seoData.advantages.creative.content}
									</p>
								</div>
							)}
						</div>
					</section>
				)}

				{/* Tips Section */}
				{seoData.tips && (
					<section className='mb-12'>
						<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
							{seoData.tips.title}
						</h2>
						<p className='text-lg text-gray-700 dark:text-gray-300 mb-4'>
							{seoData.tips.content}
						</p>
						<ul className='space-y-3'>
							{seoData.tips.tip1 && (
								<li className='flex items-start gap-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-100 dark:border-purple-800'>
									<span className='text-purple-600 dark:text-purple-400 mt-1'>
										✓
									</span>
									<span className='text-gray-700 dark:text-gray-300'>
										{seoData.tips.tip1}
									</span>
								</li>
							)}
							{seoData.tips.tip2 && (
								<li className='flex items-start gap-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-100 dark:border-purple-800'>
									<span className='text-purple-600 dark:text-purple-400 mt-1'>
										✓
									</span>
									<span className='text-gray-700 dark:text-gray-300'>
										{seoData.tips.tip2}
									</span>
								</li>
							)}
							{seoData.tips.tip3 && (
								<li className='flex items-start gap-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-100 dark:border-purple-800'>
									<span className='text-purple-600 dark:text-purple-400 mt-1'>
										✓
									</span>
									<span className='text-gray-700 dark:text-gray-300'>
										{seoData.tips.tip3}
									</span>
								</li>
							)}
							{seoData.tips.tip4 && (
								<li className='flex items-start gap-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-100 dark:border-purple-800'>
									<span className='text-purple-600 dark:text-purple-400 mt-1'>
										✓
									</span>
									<span className='text-gray-700 dark:text-gray-300'>
										{seoData.tips.tip4}
									</span>
								</li>
							)}
						</ul>
					</section>
				)}

				{/* FAQ Section */}
				{faqItems.length > 0 && (
					<section className='mb-12'>
						<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
							{seoData.faq?.title || 'Часто задаваемые вопросы'}
						</h2>
						<div className='space-y-6'>
							{faqItems.slice(0, 30).map((item: { q: string; a: string }, index: number) => (
								<div
									key={index}
									className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow'
								>
									<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3'>
										{item.q}
									</h3>
									<p className='text-gray-700 dark:text-gray-300'>{item.a}</p>
								</div>
							))}
						</div>
					</section>
				)}
			</main>
		</div>
	);
}
