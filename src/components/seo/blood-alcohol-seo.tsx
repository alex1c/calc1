import { getTranslations } from 'next-intl/server';
import {
	Info,
	AlertTriangle,
	Clock,
	TrendingUp,
	Shield,
	HelpCircle,
} from 'lucide-react';
// import { BAC_STATES } from '@/lib/calculators/alcohol';

export default async function BloodAlcoholSEO() {
	const t = await getTranslations('calculators.bloodAlcohol.seo');

	return (
		<div className='max-w-4xl mx-auto p-6 space-y-8'>
			{/* Таблица состояний BAC */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2'>
					<TrendingUp className='text-blue-600' />
					{t('bacTable.title')}
				</h2>

				<div className='overflow-x-auto'>
					<table className='w-full border-collapse'>
						<thead>
							<tr className='bg-gray-50 dark:bg-gray-700'>
								<th className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white'>
									{t('bacTable.level')}
								</th>
								<th className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white'>
									{t('bacTable.state')}
								</th>
								<th className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white'>
									{t('bacTable.description')}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
									<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'>
										0.0‰ - 0.3‰
									</span>
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
									Трезвое состояние
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									Полное отсутствие алкоголя в крови
								</td>
							</tr>
							<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
									<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'>
										0.3‰ - 0.5‰
									</span>
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
									Лёгкое расслабление
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									Минимальное воздействие алкоголя
								</td>
							</tr>
							<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
									<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'>
										0.5‰ - 1.0‰
									</span>
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
									Лёгкое опьянение
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									Начальные признаки опьянения
								</td>
							</tr>
							<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
									<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'>
										1.0‰ - 2.0‰
									</span>
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
									Среднее опьянение
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									Заметное нарушение координации
								</td>
							</tr>
							<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
									<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'>
										2.0‰ - 3.0‰
									</span>
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
									Сильное опьянение
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									Серьёзное нарушение функций
								</td>
							</tr>
							<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
									<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'>
										3.0‰ - 4.0‰
									</span>
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
									Тяжёлое отравление алкоголем
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									Опасное для здоровья состояние
								</td>
							</tr>
							<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
									<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'>
										4.0‰ - ∞
									</span>
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
									Опасное для жизни состояние
								</td>
								<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
									Критическое состояние, требуется медицинская
									помощь
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			{/* Обзор */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2'>
					<Info className='text-blue-600' />
					{t('overview.title')}
				</h2>
				<div className='prose dark:prose-invert max-w-none'>
					<p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
						{t('overview.content')}
					</p>
				</div>
			</section>

			{/* Как рассчитывается */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2'>
					<TrendingUp className='text-green-600' />
					{t('calculation.title')}
				</h2>
				<div className='space-y-4'>
					<p className='text-gray-600 dark:text-gray-300'>
						{t('calculation.content')}
					</p>
					<div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							{t('calculation.formula')}
						</h3>
						<code className='text-sm text-gray-800 dark:text-gray-200'>
							BAC = (A / (r × W)) × 1000
						</code>
						<div className='mt-3 text-sm text-gray-600 dark:text-gray-400 space-y-1'>
							<p>
								<strong>A</strong> —{' '}
								{t('calculation.variables.alcohol')}
							</p>
							<p>
								<strong>r</strong> —{' '}
								{t('calculation.variables.ratio')}
							</p>
							<p>
								<strong>W</strong> —{' '}
								{t('calculation.variables.weight')}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Время выведения */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2'>
					<Clock className='text-orange-600' />
					{t('elimination.title')}
				</h2>
				<div className='space-y-4'>
					<p className='text-gray-600 dark:text-gray-300'>
						{t('elimination.content')}
					</p>
					<div className='grid md:grid-cols-2 gap-4'>
						<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4'>
							<h3 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>
								{t('elimination.rate')}
							</h3>
							<p className='text-blue-800 dark:text-blue-200 text-sm'>
								{t('elimination.rateDescription')}
							</p>
						</div>
						<div className='bg-green-50 dark:bg-green-900/20 rounded-lg p-4'>
							<h3 className='font-semibold text-green-900 dark:text-green-100 mb-2'>
								{t('elimination.factors')}
							</h3>
							<p className='text-green-800 dark:text-green-200 text-sm'>
								{t('elimination.factorsDescription')}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Безопасность */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2'>
					<Shield className='text-red-600' />
					{t('safety.title')}
				</h2>
				<div className='space-y-4'>
					<p className='text-gray-600 dark:text-gray-300'>
						{t('safety.content')}
					</p>
					<div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4'>
						<div className='flex items-start gap-3'>
							<AlertTriangle className='text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0' />
							<div>
								<h3 className='font-semibold text-red-800 dark:text-red-200 mb-2'>
									{t('safety.warning')}
								</h3>
								<p className='text-red-700 dark:text-red-300 text-sm'>
									{t('safety.warningContent')}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2'>
					<HelpCircle className='text-purple-600' />
					{t('faq.title')}
				</h2>
				<div className='space-y-6'>
					<div className='border-b border-gray-200 dark:border-gray-600 pb-4'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.howToCalculate.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-300'>
							{t('faq.howToCalculate.answer')}
						</p>
					</div>

					<div className='border-b border-gray-200 dark:border-gray-600 pb-4'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.eliminationTime.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-300'>
							{t('faq.eliminationTime.answer')}
						</p>
					</div>

					<div className='border-b border-gray-200 dark:border-gray-600 pb-4'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.accuracy.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-300'>
							{t('faq.accuracy.answer')}
						</p>
					</div>

					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.legalLimit.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-300'>
							{t('faq.legalLimit.answer')}
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
