'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Fuel,
	Car,
	Route,
	Calculator,
	BarChart3,
	TrendingDown,
	Gauge,
} from 'lucide-react';

export default function FuelConsumptionSEO() {
	const t = useTranslations('calculators.fuel-consumption');
	const tSeo = useTranslations('calculators.fuel-consumption.seo');

	const borderColors = [
		'border-blue-500',
		'border-green-500',
		'border-purple-500',
		'border-orange-500',
		'border-red-500',
		'border-indigo-500',
	];

	// Get FAQ items dynamically
	const faqItemsRaw = tSeo.raw('faq.faqItems');
	const faqItems = Array.isArray(faqItemsRaw)
		? (faqItemsRaw as Array<{ q: string; a: string }>)
		: [];

	// Chart data for visualization - Consumption by car type
	const consumptionByType = [
		{
			type: 'Малолитражка',
			consumption: 6.5,
			example: 'Renault Logan, Lada Granta',
			color: 'bg-green-500',
		},
		{
			type: 'Средний класс',
			consumption: 9.2,
			example: 'Toyota Camry, Volkswagen Passat',
			color: 'bg-blue-500',
		},
		{
			type: 'Кроссовер',
			consumption: 11.5,
			example: 'Hyundai Creta, Kia Sportage',
			color: 'bg-orange-500',
		},
		{
			type: 'Внедорожник',
			consumption: 14.8,
			example: 'Toyota Land Cruiser, Nissan Patrol',
			color: 'bg-red-500',
		},
		{
			type: 'Микроавтобус',
			consumption: 13.2,
			example: 'Mercedes Sprinter, Ford Transit',
			color: 'bg-purple-500',
		},
	];

	// Distance comparison chart
	const distanceComparison = [
		{
			fuel: '30 л',
			distance: '352 км',
			consumption: '8.5 л/100км',
			color: 'bg-green-500',
		},
		{
			fuel: '50 л',
			distance: '588 км',
			consumption: '8.5 л/100км',
			color: 'bg-blue-500',
		},
		{
			fuel: '60 л',
			distance: '706 км',
			consumption: '8.5 л/100км',
			color: 'bg-orange-500',
		},
		{
			fuel: '70 л',
			distance: '824 км',
			consumption: '8.5 л/100км',
			color: 'bg-purple-500',
		},
	];

	const maxConsumption = Math.max(
		...consumptionByType.map((item) => item.consumption)
	);
	const maxDistance = 824; // Maximum distance for comparison

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='mt-12 space-y-10'
		>
			{/* Overview */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-8'>
				<div className='mb-4'>
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
						{tSeo('overview.title')}
					</h2>
				</div>
				<div>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-4'>
						{tSeo('overview.content')}
					</p>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
						{tSeo('overview.additionalContent')}
					</p>

					{/* Calculation Examples */}
					<div className='mt-8'>
						<h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
							{tSeo('overview.calculationExamples.title')}
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-6'>
							{tSeo('overview.calculationExamples.content')}
						</p>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{Array.from({ length: 6 }, (_, i) => {
								const exampleNum = i + 1;
								return (
									<motion.div
										key={i}
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: i * 0.1 }}
										className={`bg-gray-50 dark:bg-gray-700 p-5 rounded-lg border-2 ${
											borderColors[
												i % borderColors.length
											]
										}`}
									>
										<h4 className='font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2'>
											<Car className='w-5 h-5 text-blue-600 dark:text-blue-400' />
											{tSeo(
												`overview.calculationExamples.example${exampleNum}.title`
											)}
										</h4>
										<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
											{tSeo(
												`overview.calculationExamples.example${exampleNum}.description`
											)}
										</p>
										<div className='bg-white dark:bg-gray-600 rounded p-2 mb-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Входные данные:
											</p>
											<code className='text-xs text-blue-800 dark:text-blue-300 font-mono break-all whitespace-pre-wrap'>
												{tSeo(
													`overview.calculationExamples.example${exampleNum}.input`
												)}
											</code>
										</div>
										<div className='bg-white dark:bg-gray-600 rounded p-2 mb-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Расчёт:
											</p>
											<code className='text-xs text-green-800 dark:text-green-300 font-mono break-all whitespace-pre-wrap'>
												{tSeo(
													`overview.calculationExamples.example${exampleNum}.calculation`
												)}
											</code>
										</div>
										<div className='grid grid-cols-2 gap-2 mb-2'>
											<div className='bg-green-100 dark:bg-green-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-green-800 dark:text-green-300 mb-1'>
													Результат:
												</p>
												<p className='text-xs text-green-900 dark:text-green-200 font-bold'>
													{tSeo(
														`overview.calculationExamples.example${exampleNum}.result`
													)}
												</p>
											</div>
											<div className='bg-purple-100 dark:bg-purple-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-purple-800 dark:text-purple-300 mb-1'>
													Тип:
												</p>
												<p className='text-xs text-purple-900 dark:text-purple-200'>
													{tSeo(
														`overview.calculationExamples.example${exampleNum}.type`
													)}
												</p>
											</div>
										</div>
										<p className='text-xs text-gray-600 dark:text-gray-400 mt-2 pt-2 border-t border-gray-200 dark:border-gray-600'>
											{tSeo(
												`overview.calculationExamples.example${exampleNum}.note`
											)}
										</p>
									</motion.div>
								);
							})}
						</div>
					</div>

					{/* Visual Charts */}
					<div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
						{/* Consumption by Car Type */}
						<div className='bg-gray-50 dark:bg-gray-700 p-5 rounded-lg'>
							<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
								<BarChart3 className='w-5 h-5 text-blue-600 dark:text-blue-400' />
								Средний расход топлива по типам автомобилей
							</h4>
							<div className='space-y-3'>
								{consumptionByType.map((item, index) => (
									<div key={index}>
										<div className='flex justify-between mb-1'>
											<div>
												<span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
													{item.type}
												</span>
												<p className='text-xs text-gray-500 dark:text-gray-400'>
													{item.example}
												</p>
											</div>
											<span className='text-sm font-medium text-gray-900 dark:text-white'>
												{item.consumption} л/100км
											</span>
										</div>
										<div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4'>
											<div
												className={`${item.color} h-4 rounded-full flex items-center justify-end pr-2`}
												style={{
													width: `${
														(item.consumption /
															maxConsumption) *
														100
													}%`,
												}}
											>
												<span className='text-xs text-white font-medium'>
													{item.consumption} л/100км
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Distance Comparison */}
						<div className='bg-gray-50 dark:bg-gray-700 p-5 rounded-lg'>
							<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
								<Route className='w-5 h-5 text-purple-600 dark:text-purple-400' />
								Дистанция на разных объёмах топлива (расход 8.5
								л/100км)
							</h4>
							<div className='space-y-3'>
								{distanceComparison.map((item, index) => (
									<div key={index}>
										<div className='flex justify-between mb-1'>
											<span className='text-sm text-gray-700 dark:text-gray-300'>
												{item.fuel}
											</span>
											<span className='text-sm font-medium text-gray-900 dark:text-white'>
												{item.distance}
											</span>
										</div>
										<div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4'>
											<div
												className={`${item.color} h-4 rounded-full flex items-center justify-end pr-2`}
												style={{
													width: `${
														(parseInt(
															item.distance
														) /
															maxDistance) *
														100
													}%`,
												}}
											>
												<span className='text-xs text-white font-medium'>
													{item.distance}
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Calculation Method */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-8'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
					<Calculator className='w-6 h-6 text-blue-600 dark:text-blue-400' />
					{tSeo('calculation.title')}
				</h2>
				<p className='text-lg text-gray-700 dark:text-gray-300 mb-4'>
					{tSeo('calculation.content')}
				</p>
				<div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mt-4'>
					<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
						Формула расчёта дистанции:
					</h3>
					<div className='bg-white dark:bg-gray-600 rounded p-3 mb-3'>
						<code className='text-sm text-blue-800 dark:text-blue-300 font-mono'>
							{tSeo('calculation.distanceFormula')}
						</code>
					</div>
					<h3 className='font-semibold text-gray-900 dark:text-white mb-2 mt-4'>
						Формула расчёта количества топлива:
					</h3>
					<div className='bg-white dark:bg-gray-600 rounded p-3'>
						<code className='text-sm text-green-800 dark:text-green-300 font-mono'>
							{tSeo('calculation.fuelFormula')}
						</code>
					</div>
				</div>
			</div>

			{/* Advantages */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-8'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{tSeo('advantages.title')}
				</h2>
				<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
					{tSeo('advantages.content')}
				</p>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					{[
						{ key: 'quick', text: tSeo('advantages.quick') },
						{ key: 'accurate', text: tSeo('advantages.accurate') },
						{ key: 'planning', text: tSeo('advantages.planning') },
						{ key: 'savings', text: tSeo('advantages.savings') },
					].map((advantage) => {
						return (
							<div
								key={advantage.key}
								className='bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800'
							>
								<p className='text-sm text-blue-800 dark:text-blue-300'>
									{advantage.text}
								</p>
							</div>
						);
					})}
				</div>
			</div>

			{/* Tips */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-8'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{tSeo('tips.title')}
				</h2>
				<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
					{tSeo('tips.content')}
				</p>
				<div className='space-y-4'>
					{[
						{ key: 'measurement', text: tSeo('tips.measurement') },
						{ key: 'driving', text: tSeo('tips.driving') },
						{ key: 'maintenance', text: tSeo('tips.maintenance') },
						{ key: 'planning', text: tSeo('tips.planning') },
					].map((section) => {
						return (
							<div
								key={section.key}
								className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'
							>
								<p className='text-gray-700 dark:text-gray-300'>
									{section.text}
								</p>
							</div>
						);
					})}
				</div>
			</div>

			{/* FAQ */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-8'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
					{tSeo('faq.title')}
				</h2>
				<div className='space-y-4'>
					{faqItems.map((item, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.05 }}
							className='border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-500 transition-colors'
						>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2 flex items-start'>
								<Fuel className='w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0' />
								<span>{item.q}</span>
							</h3>
							<p className='text-gray-700 dark:text-gray-300 ml-7'>
								{item.a}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</motion.div>
	);
}
