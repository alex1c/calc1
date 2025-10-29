'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
	Info,
	Gem,
	Ruler,
	Calculator,
	Globe,
	HelpCircle,
	Table,
	Sparkles,
	AlertCircle,
} from 'lucide-react';

export default function RingSizeSEO() {
	const t = useTranslations('calculators.ringSize');
	const tTable = useTranslations('calculators.ringSize.table');

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
									bg: 'from-pink-50 to-rose-50',
									border: 'border-pink-200',
									icon: 'text-pink-600',
								},
								{
									bg: 'from-blue-50 to-indigo-50',
									border: 'border-blue-200',
									icon: 'text-blue-600',
								},
								{
									bg: 'from-purple-50 to-violet-50',
									border: 'border-purple-200',
									icon: 'text-purple-600',
								},
								{
									bg: 'from-emerald-50 to-teal-50',
									border: 'border-emerald-200',
									icon: 'text-emerald-600',
								},
								{
									bg: 'from-amber-50 to-yellow-50',
									border: 'border-amber-200',
									icon: 'text-amber-600',
								},
								{
									bg: 'from-cyan-50 to-sky-50',
									border: 'border-cyan-200',
									icon: 'text-cyan-600',
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
										<Gem
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
									<div className='grid grid-cols-2 gap-2 mb-4'>
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
												Диаметр:
											</p>
											<p className='text-xs text-purple-900 dark:text-purple-200'>
												{t(
													`seo.overview.calculationExamples.example${exampleNum}.diameter`
												)}
											</p>
										</div>
									</div>
									<div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-600'>
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
				<div className='mt-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-600'>
					<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
						Принцип конвертации:
					</h3>
					<p className='text-sm text-gray-700 dark:text-gray-300'>
						Все системы размеров колец основаны на внутреннем
						диаметре кольца в миллиметрах. Независимо от системы
						(RU, EU, US, UK, JP, CN), один и тот же диаметр
						соответствует одному и тому же размеру в разных
						системах. Например, диаметр 16.5 мм всегда соответствует
						RU 16, EU 52, US 6, UK J, JP 10, CN 16.
					</p>
				</div>
			</motion.section>

			{/* Measurement Guide */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<div className='flex items-center mb-4'>
					<Ruler className='w-8 h-8 text-purple-600 dark:text-purple-400 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.measurement.title')}
					</h2>
				</div>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-6'>
					{t('seo.measurement.content')}
				</p>
				<div className='grid md:grid-cols-2 gap-6'>
					<div className='bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border-2 border-blue-200 dark:border-blue-800'>
						<h3 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							{t('seo.measurement.byDiameter.title')}
						</h3>
						<ul className='space-y-2 text-blue-800 dark:text-blue-200 text-sm'>
							<li>• {t('seo.measurement.byDiameter.step1')}</li>
							<li>• {t('seo.measurement.byDiameter.step2')}</li>
							<li>• {t('seo.measurement.byDiameter.step3')}</li>
						</ul>
					</div>
					<div className='bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg p-4 border-2 border-pink-200 dark:border-pink-800'>
						<h3 className='font-semibold text-pink-900 dark:text-pink-100 mb-2'>
							{t('seo.measurement.byFinger.title')}
						</h3>
						<ul className='space-y-2 text-pink-800 dark:text-pink-200 text-sm'>
							<li>• {t('seo.measurement.byFinger.step1')}</li>
							<li>• {t('seo.measurement.byFinger.step2')}</li>
							<li>• {t('seo.measurement.byFinger.step3')}</li>
						</ul>
					</div>
				</div>
			</motion.section>

			{/* Size Systems Table */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<div className='flex items-center mb-6'>
					<Table className='w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Таблица систем размеров колец
					</h2>
				</div>
				<div className='overflow-x-auto'>
					<table className='w-full border-collapse'>
						<thead>
							<tr className='bg-gray-50 dark:bg-gray-700'>
								<th className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white'>
									{tTable('country')}
								</th>
								<th className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white'>
									{tTable('sizeRange')}
								</th>
								<th className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white'>
									{tTable('description')}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
									🇷🇺 RU
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									14-24
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									{tTable('ruDescription')}
								</td>
							</tr>
							<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
									🇪🇺 EU
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									44-64
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									{tTable('euDescription')}
								</td>
							</tr>
							<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
									🇺🇸 US
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									3-8
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									{tTable('usDescription')}
								</td>
							</tr>
							<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
									🇬🇧 UK
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									F-P
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									{tTable('ukDescription')}
								</td>
							</tr>
							<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
									🇯🇵 JP
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									1-21
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									{tTable('jpDescription')}
								</td>
							</tr>
							<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
									🇨🇳 CN
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									4-24
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									{tTable('cnDescription')}
								</td>
							</tr>
						</tbody>
					</table>
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
							className='bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4 border-2 border-gray-200 dark:border-gray-600 text-center'
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
				<div className='grid md:grid-cols-3 gap-4'>
					<div className='bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg p-4 border-2 border-yellow-200 dark:border-yellow-800'>
						<h3 className='font-semibold text-yellow-900 dark:text-yellow-100 mb-2 flex items-center gap-2'>
							<Sparkles className='w-5 h-5' />
							{t('seo.advantages.precise.title')}
						</h3>
						<p className='text-yellow-800 dark:text-yellow-200 text-sm'>
							{t('seo.advantages.precise.content')}
						</p>
					</div>
					<div className='bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4 border-2 border-green-200 dark:border-green-800'>
						<h3 className='font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2'>
							<Calculator className='w-5 h-5' />
							{t('seo.advantages.fast.title')}
						</h3>
						<p className='text-green-800 dark:text-green-200 text-sm'>
							{t('seo.advantages.fast.content')}
						</p>
					</div>
					<div className='bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 border-2 border-purple-200 dark:border-purple-800'>
						<h3 className='font-semibold text-purple-900 dark:text-purple-100 mb-2 flex items-center gap-2'>
							<Globe className='w-5 h-5' />
							{t('seo.advantages.multilingual.title')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200 text-sm'>
							{t('seo.advantages.multilingual.content')}
						</p>
					</div>
				</div>
			</motion.section>

			{/* Tips Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2'>
					<AlertCircle className='w-6 h-6 text-amber-600 dark:text-amber-400' />
					{t('seo.tips.title')}
				</h2>
				<div className='grid md:grid-cols-2 gap-6'>
					<div className='bg-white dark:bg-gray-700 rounded-lg p-4'>
						<h3 className='font-semibold text-amber-900 dark:text-amber-100 mb-3'>
							{t('seo.tips.measurement.title')}
						</h3>
						<ul className='space-y-2 text-amber-800 dark:text-amber-200 text-sm'>
							<li>• {t('seo.tips.measurement.tip1')}</li>
							<li>• {t('seo.tips.measurement.tip2')}</li>
							<li>• {t('seo.tips.measurement.tip3')}</li>
						</ul>
					</div>
					<div className='bg-white dark:bg-gray-700 rounded-lg p-4'>
						<h3 className='font-semibold text-amber-900 dark:text-amber-100 mb-3'>
							{t('seo.tips.ordering.title')}
						</h3>
						<ul className='space-y-2 text-amber-800 dark:text-amber-200 text-sm'>
							<li>• {t('seo.tips.ordering.tip1')}</li>
							<li>• {t('seo.tips.ordering.tip2')}</li>
							<li>• {t('seo.tips.ordering.tip3')}</li>
						</ul>
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
						Часто задаваемые вопросы о размерах колец
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
							className='bg-gradient-to-r from-gray-50 to-pink-50 dark:from-gray-700 dark:to-pink-900/20 border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow'
						>
							<div className='flex items-start gap-3'>
								<div className='flex-shrink-0 w-8 h-8 bg-pink-600 dark:bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
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

			{/* Visual Chart: Size to Diameter */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8'
			>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
					Таблица соответствия размеров и диаметров (US)
				</h2>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
					{[
						{ size: 'US 5', diameter: '15.7 мм' },
						{ size: 'US 6', diameter: '16.5 мм' },
						{ size: 'US 7', diameter: '17.3 мм' },
						{ size: 'US 8', diameter: '18.1 мм' },
						{ size: 'US 9', diameter: '18.9 мм' },
						{ size: 'US 10', diameter: '19.7 мм' },
					].map((item, idx) => (
						<div
							key={idx}
							className='bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-4 border-2 border-pink-200 dark:border-pink-800 text-center'
						>
							<div className='font-bold text-gray-900 dark:text-white mb-1'>
								{item.size}
							</div>
							<div className='text-sm text-gray-600 dark:text-gray-400'>
								{item.diameter}
							</div>
						</div>
					))}
				</div>
				<p className='text-sm text-gray-600 dark:text-gray-400 mt-4'>
					*Диаметр указан для внутреннего размера кольца
				</p>
			</motion.section>
		</motion.div>
	);
}
