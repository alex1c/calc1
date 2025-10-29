'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Flame,
	Calculator,
	Droplets,
	Utensils,
	Thermometer,
} from 'lucide-react';

export default function GasUsageSEO() {
	const t = useTranslations('calculators.gasUsage');

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

	// Generate FAQ items array
	const faqItems = Array.from({ length: 30 }, (_, i) => ({
		q: t(`seo.faqItems.${i}.q`),
		a: t(`seo.faqItems.${i}.a`),
	}));

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
						{t('seo.overview.title')}
					</h2>
				</div>
				<div>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-4'>
						{t('seo.overview.content')}
					</p>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
						{t('seo.overview.additionalContent')}
					</p>

					{/* Calculation Examples */}
					<div className='mt-8'>
						<h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
							{t('seo.overview.calculationExamples.title')}
						</h3>
						<p className='text-gray-700 dark:text-gray-300 mb-6'>
							{t('seo.overview.calculationExamples.content')}
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
											<Flame className='w-5 h-5 text-blue-600 dark:text-blue-400' />
											{t(
												`seo.overview.calculationExamples.example${exampleNum}.title`
											)}
										</h4>
										<p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
											{t(
												`seo.overview.calculationExamples.example${exampleNum}.description`
											)}
										</p>
										<div className='bg-white dark:bg-gray-600 rounded p-2 mb-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Входные данные:
											</p>
											<code className='text-xs text-blue-800 dark:text-blue-300 font-mono break-all whitespace-pre-wrap'>
												{t(
													`seo.overview.calculationExamples.example${exampleNum}.input`
												)}
											</code>
										</div>
										<div className='bg-white dark:bg-gray-600 rounded p-2 mb-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Расчёт:
											</p>
											<code className='text-xs text-green-800 dark:text-green-300 font-mono break-all whitespace-pre-wrap'>
												{t(
													`seo.overview.calculationExamples.example${exampleNum}.calculation`
												)}
											</code>
										</div>
										<div className='grid grid-cols-2 gap-2 mb-2'>
											<div className='bg-blue-100 dark:bg-blue-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1'>
													Результат:
												</p>
												<p className='text-xs text-blue-900 dark:text-blue-200 font-bold'>
													{t(
														`seo.overview.calculationExamples.example${exampleNum}.result`
													)}
												</p>
											</div>
											<div className='bg-purple-100 dark:bg-purple-900/30 rounded p-2'>
												<p className='text-xs font-semibold text-purple-800 dark:text-purple-300 mb-1'>
													Тип:
												</p>
												<p className='text-xs text-purple-900 dark:text-purple-200'>
													{t(
														`seo.overview.calculationExamples.example${exampleNum}.type`
													)}
												</p>
											</div>
										</div>
										<p className='text-xs text-gray-600 dark:text-gray-400 mt-2 pt-2 border-t border-gray-200 dark:border-gray-600'>
											{t(
												`seo.overview.calculationExamples.example${exampleNum}.note`
											)}
										</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			{/* Calculation Methods */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.calculation.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('seo.calculation.content')}
					</p>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
						<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							Формула расчёта расхода газа:
						</h3>
						<p className='text-blue-800 dark:text-blue-200 text-sm mb-2'>
							<strong>
								Расход газа (м³/ч) = Мощность (кВт) / 10 / КПД
							</strong>
						</p>
						<p className='text-blue-800 dark:text-blue-200 text-sm mb-2'>
							<strong>
								Суточный расход = Расход в час × Часы работы
							</strong>
						</p>
						<p className='text-blue-800 dark:text-blue-200 text-sm'>
							<strong>Стоимость = Расход газа × Тариф</strong>
						</p>
					</div>
				</div>
			</div>

			{/* Visual Chart: Gas Purposes */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Назначения природного газа
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Основные направления использования природного газа:
					</p>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{[
							{
								purpose: 'Отопление',
								icon: Thermometer,
								power: '10-40 кВт',
								consumption: '1.2-4.5 м³/ч',
								description:
									'Обогрев помещений газовыми котлами и конвекторами',
							},
							{
								purpose: 'Горячая вода',
								icon: Droplets,
								power: '15-30 кВт',
								consumption: '1.5-2.5 м³/ч',
								description:
									'Нагрев воды газовыми колонками и бойлерами',
							},
							{
								purpose: 'Приготовление пищи',
								icon: Utensils,
								power: '3-8 кВт',
								consumption: '0.6-1.2 м³/ч',
								description:
									'Использование газа на кухне для готовки',
							},
						].map((item, idx) => {
							const Icon = item.icon;
							return (
								<div
									key={idx}
									className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center border-2 border-blue-200 dark:border-blue-800'
								>
									<Icon className='w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2' />
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
										{item.purpose}
									</h3>
									<p className='text-gray-700 dark:text-gray-300 text-sm mb-1 font-bold'>
										Мощность: {item.power}
									</p>
									<p className='text-sm text-blue-700 dark:text-blue-300 mb-1'>
										Расход: {item.consumption}
									</p>
									<div className='text-xs text-gray-600 dark:text-gray-400'>
										{item.description}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Visual Chart: Typical Consumption by Equipment */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Типовой расход газа по оборудованию
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Средний расход газа для различных типов газового
						оборудования:
					</p>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{[
							{
								equipment: 'Газовая плита',
								consumption: '0.6-1.2 м³/ч',
								power: '3-8 кВт',
							},
							{
								equipment: 'Газовая колонка',
								consumption: '1.5-2.5 м³/ч',
								power: '15-30 кВт',
							},
							{
								equipment: 'Котёл 10-20 кВт',
								consumption: '1.2-2.4 м³/ч',
								power: '10-20 кВт',
							},
							{
								equipment: 'Котёл 30-40 кВт',
								consumption: '3.0-4.5 м³/ч',
								power: '30-40 кВт',
							},
						].map((item, idx) => (
							<div
								key={idx}
								className='bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center'
							>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{item.equipment}
								</h3>
								<p className='text-gray-700 dark:text-gray-300 text-sm mb-1 font-bold'>
									{item.consumption}
								</p>
								<div className='text-xs text-gray-600 dark:text-gray-400'>
									Мощность: {item.power}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Advantages */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.advantages.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300'>
						{t('seo.advantages.content')}
					</p>
				</div>
			</div>

			{/* Tips */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.tips.title')}
					</h2>
				</div>
				<div className='space-y-3'>
					<div className='flex items-start space-x-3'>
						<div className='w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
							<span className='text-blue-600 dark:text-blue-400 text-sm font-bold'>
								1
							</span>
						</div>
						<p className='text-gray-700 dark:text-gray-300'>
							{t('seo.tips.tip1')}
						</p>
					</div>
					<div className='flex items-start space-x-3'>
						<div className='w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
							<span className='text-blue-600 dark:text-blue-400 text-sm font-bold'>
								2
							</span>
						</div>
						<p className='text-gray-700 dark:text-gray-300'>
							{t('seo.tips.tip2')}
						</p>
					</div>
					<div className='flex items-start space-x-3'>
						<div className='w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
							<span className='text-blue-600 dark:text-blue-400 text-sm font-bold'>
								3
							</span>
						</div>
						<p className='text-gray-700 dark:text-gray-300'>
							{t('seo.tips.tip3')}
						</p>
					</div>
				</div>
			</div>

			{/* FAQ */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.faq.title')}
					</h2>
				</div>
				<div className='space-y-4'>
					{faqItems.map((item, idx) => (
						<div
							key={idx}
							className={`border-l-4 ${
								borderColors[idx % borderColors.length]
							} pl-4`}
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
