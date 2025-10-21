import { useTranslations, useLocale } from 'next-intl';
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

export default function FunPage() {
	const t = useTranslations();
	const locale = useLocale();
	const calculators = getCalculators(t);

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header Section */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-4'>
						{t('categories.fun.title')}
					</h1>
					<p className='text-lg text-gray-600'>
						{t('categories.fun.description')}
					</p>
				</div>

				{/* Calculators Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{calculators.map((calculator) => (
						<Link
							key={calculator.id}
							href={`/${locale}${calculator.href}`}
							className='bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200'
						>
							<div className='flex items-center mb-4'>
								<calculator.icon className='h-8 w-8 text-blue-600 mr-3' />
								<h3 className='text-xl font-semibold text-gray-900'>
									{calculator.title}
								</h3>
							</div>
							<p className='text-gray-600'>
								{calculator.description}
							</p>
						</Link>
					))}
				</div>
			</main>
		</div>
	);
}
