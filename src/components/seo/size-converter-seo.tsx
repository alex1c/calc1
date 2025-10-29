'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Info,
	Ruler,
	Globe,
	Shirt,
	Users,
	HelpCircle,
	Table,
	Calculator,
} from 'lucide-react';

export default function SizeConverterSEO() {
	const t = useTranslations('calculators.size-converter');

	// Generate FAQ items array
	const faqItems = Array.from({ length: 30 }, (_, i) => ({
		q: t(`seo.faq.faqItems.${i}.q`),
		a: t(`seo.faq.faqItems.${i}.a`),
	}));

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='mt-12 space-y-10'
		>
			{/* Overview Section with Examples */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
					<Info className='text-blue-600 dark:text-blue-400' />
					{t('seo.overview.title')}
				</h2>
				<p className='text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed'>
					{t('seo.overview.content')}
				</p>
				<p className='text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
					{t('seo.overview.additionalContent')}
				</p>

				{/* Calculation Examples */}
				<div className='mt-8'>
					<h3 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
						{t('seo.overview.calculationExamples.title')}
					</h3>
					<p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
						{t('seo.overview.calculationExamples.content')}
					</p>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{Array.from({ length: 6 }, (_, i) => {
							const exampleNum = i + 1;
							const categoryColors = [
								{
									bg: 'from-blue-50 to-blue-100',
									border: 'border-blue-200',
									icon: 'text-blue-600',
								},
								{
									bg: 'from-pink-50 to-pink-100',
									border: 'border-pink-200',
									icon: 'text-pink-600',
								},
								{
									bg: 'from-green-50 to-green-100',
									border: 'border-green-200',
									icon: 'text-green-600',
								},
								{
									bg: 'from-purple-50 to-purple-100',
									border: 'border-purple-200',
									icon: 'text-purple-600',
								},
								{
									bg: 'from-orange-50 to-orange-100',
									border: 'border-orange-200',
									icon: 'text-orange-600',
								},
								{
									bg: 'from-teal-50 to-teal-100',
									border: 'border-teal-200',
									icon: 'text-teal-600',
								},
							];
							const colors =
								categoryColors[i % categoryColors.length];

							return (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: i * 0.1 }}
									className={`bg-gradient-to-br ${colors.bg} dark:from-gray-700 dark:to-gray-600 rounded-lg p-6 border-2 ${colors.border} dark:border-gray-600`}
								>
									<div className='flex items-center mb-3'>
										<Ruler
											className={`w-6 h-6 ${colors.icon} dark:text-white mr-2`}
										/>
										<h4 className='font-semibold text-gray-900 dark:text-white'>
											{t(
												`seo.overview.calculationExamples.example${exampleNum}.title`
											)}
										</h4>
									</div>
									<p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
										{t(
											`seo.overview.calculationExamples.example${exampleNum}.description`
										)}
									</p>
									<div className='space-y-2 mb-4'>
										<div className='bg-white dark:bg-gray-700 rounded p-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Входные данные:
											</p>
											<code className='text-xs text-blue-800 dark:text-blue-300 font-mono break-all'>
												{t(
													`seo.overview.calculationExamples.example${exampleNum}.input`
												)}
											</code>
										</div>
										<div className='bg-white dark:bg-gray-700 rounded p-2'>
											<p className='text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1'>
												Конвертация:
											</p>
											<code className='text-xs text-green-800 dark:text-green-300 font-mono break-all'>
												{t(
													`seo.overview.calculationExamples.example${exampleNum}.calculation`
												)}
											</code>
										</div>
									</div>
									<div className='bg-blue-100 dark:bg-blue-900/30 rounded p-2 mb-4'>
										<p className='text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1'>
											Результат:
										</p>
										<p className='text-xs text-blue-900 dark:text-blue-200 font-bold'>
											{t(
												`seo.overview.calculationExamples.example${exampleNum}.result`
											)}
										</p>
									</div>
									<div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-600'>
										<p className='text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1'>
											Категория:{' '}
											{t(
												`seo.overview.calculationExamples.example${exampleNum}.category`
											)}
										</p>
										<p className='text-xs text-gray-600 dark:text-gray-400'>
											{t(
												`seo.overview.calculationExamples.example${exampleNum}.note`
											)}
										</p>
									</div>
								</motion.div>
							);
						})}
					</div>
				</div>
			</motion.section>

			{/* Calculation */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<div className='flex items-center mb-4'>
					<Calculator className='w-8 h-8 text-green-600 dark:text-green-400 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.calculation.title')}
					</h2>
				</div>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
					{t('seo.calculation.content')}
				</p>
			</motion.section>

			{/* Categories */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<div className='flex items-center mb-4'>
					<Table className='w-8 h-8 text-purple-600 dark:text-purple-400 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.categories.title')}
					</h2>
				</div>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
					{t('seo.categories.content')}
				</p>
				<div className='grid md:grid-cols-3 gap-4 mt-6'>
					<div className='bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-800'>
						<Shirt className='w-8 h-8 text-blue-600 dark:text-blue-400 mb-2' />
						<h3 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							Одежда
						</h3>
						<p className='text-blue-800 dark:text-blue-200 text-sm'>
							Верхняя и нижняя одежда, включая футболки, рубашки,
							платья, брюки
						</p>
					</div>
					<div className='bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4 border-2 border-green-200 dark:border-green-800'>
						<Table className='w-8 h-8 text-green-600 dark:text-green-400 mb-2' />
						<h3 className='font-semibold text-green-900 dark:text-green-100 mb-2'>
							Джинсы
						</h3>
						<p className='text-green-800 dark:text-green-200 text-sm'>
							Джинсы мужские и женские по обхвату талии
						</p>
					</div>
					<div className='bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 border-2 border-purple-200 dark:border-purple-800'>
						<Ruler className='w-8 h-8 text-purple-600 dark:text-purple-400 mb-2' />
						<h3 className='font-semibold text-purple-900 dark:text-purple-100 mb-2'>
							Обувь
						</h3>
						<p className='text-purple-800 dark:text-purple-200 text-sm'>
							Обувь мужская, женская и детская по длине стопы
						</p>
					</div>
				</div>
			</motion.section>

			{/* Countries Visualization */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<div className='flex items-center mb-6'>
					<Globe className='w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Поддерживаемые системы размеров
					</h2>
				</div>
				<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
					{[
						{ code: 'RU', name: 'Россия', flag: '🇷🇺' },
						{ code: 'EU', name: 'Европа', flag: '🇪🇺' },
						{ code: 'US', name: 'США', flag: '🇺🇸' },
						{ code: 'UK', name: 'Великобритания', flag: '🇬🇧' },
						{ code: 'JP', name: 'Япония', flag: '🇯🇵' },
						{ code: 'CN', name: 'Китай', flag: '🇨🇳' },
					].map((country, idx) => (
						<div
							key={country.code}
							className='bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-600 text-center'
						>
							<div className='text-3xl mb-2'>{country.flag}</div>
							<div className='font-bold text-gray-900 dark:text-white'>
								{country.code}
							</div>
							<div className='text-sm text-gray-600 dark:text-gray-400'>
								{country.name}
							</div>
						</div>
					))}
				</div>
			</motion.section>

			{/* Advantages */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('seo.advantages.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-6'>
					{t('seo.advantages.content')}
				</p>
				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
					<div className='bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg p-4 border-2 border-yellow-200 dark:border-yellow-800'>
						<h3 className='font-semibold text-yellow-900 dark:text-yellow-100 mb-2'>
							Точные таблицы
						</h3>
						<p className='text-yellow-800 dark:text-yellow-200 text-sm'>
							Основаны на международных стандартах ISO
						</p>
					</div>
					<div className='bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4 border-2 border-green-200 dark:border-green-800'>
						<h3 className='font-semibold text-green-900 dark:text-green-100 mb-2'>
							Мгновенная конвертация
						</h3>
						<p className='text-green-800 dark:text-green-200 text-sm'>
							Результат отображается сразу после ввода
						</p>
					</div>
					<div className='bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-800'>
						<h3 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							Многоязычный интерфейс
						</h3>
						<p className='text-blue-800 dark:text-blue-200 text-sm'>
							Поддержка 4 языков: русский, английский, испанский,
							немецкий
						</p>
					</div>
				</div>
			</motion.section>

			{/* FAQ Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<div className='flex items-center mb-6'>
					<HelpCircle className='w-8 h-8 text-blue-600 dark:text-blue-400 mr-3' />
					<h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
						Часто задаваемые вопросы о конвертации размеров
					</h2>
				</div>
				<div className='space-y-4'>
					{faqItems.map((faq, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.03 }}
							className='bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow'
						>
							<div className='flex items-start gap-3'>
								<div className='flex-shrink-0 w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
									{index + 1}
								</div>
								<div className='flex-1'>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
										{faq.q}
									</h3>
									<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
										{faq.a}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</motion.section>
		</motion.div>
	);
}
