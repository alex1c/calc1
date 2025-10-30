'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Wind,
	Home,
	Users,
	Calculator,
	BarChart3,
	TrendingUp,
} from 'lucide-react';

export default function VentilationSEO() {
	const t = useTranslations('calculators.ventilation');
	const tSeo = useTranslations('calculators.ventilation.seo');

	const borderColors = [
		'border-blue-500',
		'border-green-500',
		'border-purple-500',
		'border-orange-500',
		'border-red-500',
		'border-indigo-500',
		'border-pink-500',
		'border-teal-500',
		'border-yellow-500',
		'border-cyan-500',
	];

	// Get FAQ items dynamically
	const faqItemsRaw = tSeo.raw('faq.faqItems');
	const faqItems = Array.isArray(faqItemsRaw)
		? (faqItemsRaw as Array<{ q: string; a: string }>)
		: [];

	// Room type vs capacity data for visualization
	const roomTypesData = [
		{ type: 'Жилая', capacity: 100, color: 'bg-blue-500' },
		{ type: 'Кухня', capacity: 300, color: 'bg-green-500' },
		{ type: 'Ванная', capacity: 250, color: 'bg-purple-500' },
		{ type: 'Офис', capacity: 200, color: 'bg-orange-500' },
		{ type: 'Ресторан', capacity: 500, color: 'bg-red-500' },
	];

	// People count vs capacity data
	const peopleCapacity = [
		{ people: '1', capacity: 30, color: 'bg-green-500' },
		{ people: '5', capacity: 150, color: 'bg-yellow-500' },
		{ people: '10', capacity: 300, color: 'bg-orange-500' },
		{ people: '20', capacity: 600, color: 'bg-red-500' },
	];

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='mt-12 space-y-10'
		>
			{/* Overview */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
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
									<div
										key={i}
										className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600'
									>
										<h4 className='font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2'>
											<Wind className='w-5 h-5 text-blue-600 dark:text-blue-400' />
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
											<div className='bg-yellow-100 dark:bg-yellow-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-yellow-800 dark:text-yellow-300 mb-1'>
													Результат:
												</p>
												<p className='text-xs text-yellow-900 dark:text-yellow-200 font-bold'>
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
									</div>
								);
							})}
						</div>
					</div>

					{/* Visual Charts */}
					<div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
						{/* Room Type vs Capacity Chart */}
						<div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
							<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
								Производительность вентиляции по типам помещений
								(пример для 20 м³)
							</h4>
							<div className='space-y-3'>
								{roomTypesData.map((item, index) => (
									<div key={index}>
										<div className='flex justify-between mb-1'>
											<span className='text-sm text-gray-700 dark:text-gray-300'>
												{item.type}
											</span>
											<span className='text-sm font-medium text-gray-900 dark:text-white'>
												{item.capacity} м³/ч
											</span>
										</div>
										<div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4'>
											<div
												className={`${item.color} h-4 rounded-full flex items-center justify-end pr-2`}
												style={{
													width: `${
														(item.capacity / 600) *
														100
													}%`,
												}}
											>
												<span className='text-xs text-white font-medium'>
													{item.capacity}
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* People Count vs Capacity Chart */}
						<div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
							<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
								Производительность вентиляции в зависимости от
								количества людей (30 м³/ч на человека)
							</h4>
							<div className='space-y-3'>
								{peopleCapacity.map((item, index) => (
									<div key={index}>
										<div className='flex justify-between mb-1'>
											<span className='text-sm text-gray-700 dark:text-gray-300'>
												{item.people} человек
											</span>
											<span className='text-sm font-medium text-gray-900 dark:text-white'>
												{item.capacity} м³/ч
											</span>
										</div>
										<div className='w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4'>
											<div
												className={`${item.color} h-4 rounded-full flex items-center justify-end pr-2`}
												style={{
													width: `${
														(item.capacity / 600) *
														100
													}%`,
												}}
											>
												<span className='text-xs text-white font-medium'>
													{item.capacity}
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

			{/* Calculation Methods */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{tSeo('calculation.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{tSeo('calculation.content')}
					</p>
					<div className='bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg'>
						<h3 className='text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2'>
							Формулы расчёта:
						</h3>
						<ul className='space-y-2 text-yellow-800 dark:text-yellow-200 text-sm'>
							<li>
								<strong>Объём помещения:</strong>{' '}
								{tSeo('calculation.volume')}
							</li>
							<li>
								<strong>Производительность по объёму:</strong>{' '}
								{tSeo('calculation.capacityByVolume')}
							</li>
							<li>
								<strong>Производительность по людям:</strong>{' '}
								{tSeo('calculation.capacityByPeople')}
							</li>
							<li>
								<strong>Требуемая производительность:</strong>{' '}
								{tSeo('calculation.requiredCapacity')}
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Advantages */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{tSeo('advantages.title')}
					</h2>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{[
						{
							title: tSeo('advantages.health.title'),
							description: tSeo('advantages.health.description'),
							icon: Users,
						},
						{
							title: tSeo('advantages.efficiency.title'),
							description: tSeo(
								'advantages.efficiency.description'
							),
							icon: TrendingUp,
						},
						{
							title: tSeo('advantages.comfort.title'),
							description: tSeo('advantages.comfort.description'),
							icon: Home,
						},
					].map((advantage, idx) => {
						const Icon = advantage.icon;
						return (
							<div
								key={idx}
								className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800'
							>
								<Icon className='w-8 h-8 text-blue-600 dark:text-blue-400 mb-3' />
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{advantage.title}
								</h3>
								<p className='text-gray-700 dark:text-gray-300 text-sm'>
									{advantage.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>

			{/* Tips */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{tSeo('tips.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{tSeo('tips.content')}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<div className='bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
							<h3 className='font-semibold text-green-900 dark:text-green-100 mb-2'>
								Выбор системы
							</h3>
							<ul className='text-sm text-green-800 dark:text-green-200 space-y-1'>
								<li>• {tSeo('tips.system.natural')}</li>
								<li>• {tSeo('tips.system.mechanical')}</li>
								<li>• {tSeo('tips.system.combined')}</li>
							</ul>
						</div>
						<div className='bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg'>
							<h3 className='font-semibold text-orange-900 dark:text-orange-100 mb-2'>
								Монтаж
							</h3>
							<ul className='text-sm text-orange-800 dark:text-orange-200 space-y-1'>
								<li>• {tSeo('tips.installation.ducts')}</li>
								<li>• {tSeo('tips.installation.location')}</li>
								<li>• {tSeo('tips.installation.noise')}</li>
							</ul>
						</div>
						<div className='bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg'>
							<h3 className='font-semibold text-purple-900 dark:text-purple-100 mb-2'>
								Обслуживание
							</h3>
							<ul className='text-sm text-purple-800 dark:text-purple-200 space-y-1'>
								<li>• {tSeo('tips.maintenance.cleaning')}</li>
								<li>• {tSeo('tips.maintenance.filters')}</li>
								<li>• {tSeo('tips.maintenance.check')}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* FAQ */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
						{tSeo('faq.title')}
					</h2>
				</div>
				<div className='space-y-4'>
					{faqItems.map((item, index) => (
						<div
							key={index}
							className={`border-l-4 ${
								borderColors[index % borderColors.length]
							} bg-gray-50 dark:bg-gray-700 p-4 rounded-r-lg`}
						>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								{item.q}
							</h3>
							<p className='text-gray-700 dark:text-gray-300'>
								{item.a}
							</p>
						</div>
					))}
				</div>
			</div>
		</motion.div>
	);
}
