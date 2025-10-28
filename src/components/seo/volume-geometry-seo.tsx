'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

/**
 * SEO Content Component for Volume Geometry Calculator
 * Displays comprehensive information about volume calculations for geometric shapes
 */
export default function VolumeGeometrySEO() {
	const t = useTranslations('calculators.volume.seo');
	const [expandedSections, setExpandedSections] = useState<Set<string>>(
		new Set(['overview'])
	);

	const toggleSection = (section: string) => {
		const newExpanded = new Set(expandedSections);
		if (newExpanded.has(section)) {
			newExpanded.delete(section);
		} else {
			newExpanded.add(section);
		}
		setExpandedSections(newExpanded);
	};

	const sections = [
		{
			id: 'overview',
			title: t('overview.title'),
			content: t('overview.content'),
		},
		{
			id: 'calculation',
			title: t('calculation.title'),
			content: t('calculation.content'),
		},
		{
			id: 'advantages',
			title: t('advantages.title'),
			content: t('advantages.content'),
		},
		{
			id: 'tips',
			title: t('tips.title'),
			content: t('tips.content'),
		},
	];

	return (
		<div className='max-w-4xl mx-auto'>
			{/* Main SEO Content */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8'>
				<h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					{t('title')}
				</h1>
				<h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6'>
					Онлайн калькулятор объёма геометрических тел с формулами и
					примерами
				</h2>

				{/* Expandable Sections */}
				<div className='space-y-4'>
					{sections.map((section) => (
						<div
							key={section.id}
							className='border border-gray-200 dark:border-gray-700 rounded-lg'
						>
							<button
								onClick={() => toggleSection(section.id)}
								className='w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
							>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
									{section.title}
								</h3>
								{expandedSections.has(section.id) ? (
									<ChevronUp className='w-5 h-5 text-gray-500' />
								) : (
									<ChevronDown className='w-5 h-5 text-gray-500' />
								)}
							</button>
							{expandedSections.has(section.id) && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.3 }}
									className='px-6 pb-4'
								>
									<div className='text-gray-700 dark:text-gray-300 leading-relaxed'>
										<p className='mb-4'>
											{section.content}
										</p>

										{/* Examples Section */}
										{section.id === 'overview' && (
											<div className='mt-6'>
												<h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
													Примеры расчётов объёма
												</h4>
												<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
													<div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
														<h5 className='font-semibold text-blue-800 dark:text-blue-200 mb-2'>
															Объём сферы
														</h5>
														<p className='text-sm text-blue-700 dark:text-blue-300 mb-2'>
															Радиус: 5 см
														</p>
														<p className='text-sm text-blue-700 dark:text-blue-300 mb-2'>
															V = (4/3) × π × 5³ =
															523.6 см³
														</p>
														<p className='text-xs text-blue-600 dark:text-blue-400'>
															Пример:
															баскетбольный мяч
														</p>
													</div>
													<div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
														<h5 className='font-semibold text-green-800 dark:text-green-200 mb-2'>
															Объём куба
														</h5>
														<p className='text-sm text-green-700 dark:text-green-300 mb-2'>
															Сторона: 8 см
														</p>
														<p className='text-sm text-green-700 dark:text-green-300 mb-2'>
															V = 8³ = 512 см³
														</p>
														<p className='text-xs text-green-600 dark:text-green-400'>
															Пример: кубик Рубика
														</p>
													</div>
													<div className='p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg'>
														<h5 className='font-semibold text-purple-800 dark:text-purple-200 mb-2'>
															Объём цилиндра
														</h5>
														<p className='text-sm text-purple-700 dark:text-purple-300 mb-2'>
															Радиус: 3 см,
															Высота: 10 см
														</p>
														<p className='text-sm text-purple-700 dark:text-purple-300 mb-2'>
															V = π × 3² × 10 =
															282.7 см³
														</p>
														<p className='text-xs text-purple-600 dark:text-purple-400'>
															Пример: банка
															консервов
														</p>
													</div>
												</div>
											</div>
										)}
									</div>
								</motion.div>
							)}
						</div>
					))}
				</div>
			</div>

			{/* FAQ Section */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
					Часто задаваемые вопросы о расчёте объёма
				</h2>
				<div className='space-y-4'>
					{Array.isArray(t.raw('faq.faqItems'))
						? t
								.raw('faq.faqItems')
								.map((faq: any, index: number) => (
									<div
										key={index}
										className='border border-gray-200 dark:border-gray-700 rounded-lg'
									>
										<button
											onClick={() =>
												toggleSection(`faq-${index}`)
											}
											className='w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
										>
											<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
												{faq.q}
											</h3>
											{expandedSections.has(
												`faq-${index}`
											) ? (
												<ChevronUp className='w-5 h-5 text-gray-500' />
											) : (
												<ChevronDown className='w-5 h-5 text-gray-500' />
											)}
										</button>
										{expandedSections.has(
											`faq-${index}`
										) && (
											<motion.div
												initial={{
													opacity: 0,
													height: 0,
												}}
												animate={{
													opacity: 1,
													height: 'auto',
												}}
												exit={{ opacity: 0, height: 0 }}
												transition={{ duration: 0.3 }}
												className='px-6 pb-4'
											>
												<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
													{faq.a}
												</p>
											</motion.div>
										)}
									</div>
								))
						: null}
				</div>
			</div>
		</div>
	);
}
