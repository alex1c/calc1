import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/header';
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
	const t = (key: string) => messages.categories['fun'][key];

	const title = `${t(
		'title'
	)} — Онлайн развлекательные калькуляторы | Calc1.ru`;
	const description =
		'Развлекательные калькуляторы онлайн: генераторы паролей, никнеймов, имен, случайных чисел, калькуляторы совместимости и любви, зодиак, игры с кубиками и монетами. Бесплатные онлайн калькуляторы для развлечений и творчества.';

	const keywordsString = t('seo.keywords') || '';
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

	const t = await getTranslations();
	const calculators = getCalculators(t);

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			<Header />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header Section */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
						{t('categories.fun.title')}
					</h1>
					<p className='text-lg text-gray-600 dark:text-gray-400'>
						{t('categories.fun.description')}
					</p>
				</div>

				{/* Calculators Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{calculators.map((calculator) => (
						<Link
							key={calculator.id}
							href={`/${locale}${calculator.href}`}
							className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200'
						>
							<div className='flex items-center mb-4'>
								<calculator.icon className='h-8 w-8 text-blue-600 dark:text-blue-400 mr-3' />
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
			</main>
		</div>
	);
}
