import Header from '@/components/header';
import Link from 'next/link';
import {
	CreditCard,
	Calculator,
	TrendingUp,
	PiggyBank,
	Car,
	Home,
} from 'lucide-react';

const getCalculators = () => [
	{
		id: 'credit-loan',
		title: 'Кредитный калькулятор',
		description:
			'Рассчитать ежемесячные платежи, общую сумму выплат и создать детальный график платежей для любого кредита',
		icon: CreditCard,
		href: '/calc/credit-loan',
	},
	{
		id: 'mortgage',
		title: 'Ипотечный калькулятор',
		description:
			'Рассчитать ежемесячные платежи по ипотеке, общую сумму выплат и создать детальный график платежей для покупки недвижимости',
		icon: Home,
		href: '/calc/mortgage',
	},
	{
		id: 'auto-loan',
		title: 'Калькулятор автокредита',
		description:
			'Рассчитать ежемесячные платежи по автокредиту, общую сумму выплат и создать детальный график платежей для покупки автомобиля',
		icon: Car,
		href: '/calc/auto-loan',
	},
	{
		id: 'consumer-loan',
		title: 'Калькулятор потребительского кредита',
		description:
			'Рассчитать ежемесячные платежи по потребительскому кредиту, общую сумму выплат и создать детальный график платежей',
		icon: Calculator,
		href: '/calc/consumer-loan',
	},
	{
		id: 'investment',
		title: 'Калькулятор вкладов',
		description:
			'Рассчитать доходность банковского вклада с учётом капитализации, пополнений и снятий',
		icon: TrendingUp,
		href: '/calc/investment',
	},
	{
		id: 'savings',
		title: 'Калькулятор накоплений',
		description:
			'Рассчитать накопления с учётом процентов, пополнений и целей',
		icon: PiggyBank,
		href: '/calc/savings',
	},
];

export default function FinancePage() {
	const calculators = getCalculators();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header Section */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-gray-900 mb-4'>
						Финансовые калькуляторы
					</h1>
					<p className='text-lg text-gray-600'>
						Кредиты, вклады, ипотека, налоги и инвестиции
					</p>
				</div>

				{/* Calculators Grid */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{calculators.map((calculator) => {
						const IconComponent = calculator.icon;
						return (
							<Link
								key={calculator.id}
								href={`/ru/calc/${calculator.id}`}
								className='bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200'
							>
								<div className='flex items-center mb-4'>
									<IconComponent className='h-8 w-8 text-blue-600 mr-3' />
									<h3 className='text-xl font-semibold text-gray-900'>
										{calculator.title}
									</h3>
								</div>
								<p className='text-gray-600'>
									{calculator.description}
								</p>
							</Link>
						);
					})}
				</div>
			</main>
		</div>
	);
}
