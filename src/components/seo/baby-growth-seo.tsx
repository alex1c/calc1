import { getTranslations } from 'next-intl/server';
import {
	Info,
	AlertTriangle,
	TrendingUp,
	Shield,
	HelpCircle,
	Baby,
	Ruler,
	Weight,
} from 'lucide-react';

export default async function BabyGrowthSEO() {
	const t = await getTranslations('calculators.babyGrowth.seo');

	return (
		<div className='max-w-4xl mx-auto p-6 space-y-8'>
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

			{/* Стандарты ВОЗ */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2'>
					<Shield className='text-green-600' />
					{t('whoStandards.title')}
				</h2>
				<div className='space-y-4'>
					<p className='text-gray-600 dark:text-gray-300'>
						{t('whoStandards.content')}
					</p>
					<div className='grid md:grid-cols-2 gap-4'>
						<div className='bg-green-50 dark:bg-green-900/20 rounded-lg p-4'>
							<h3 className='font-semibold text-green-900 dark:text-green-100 mb-2'>
								{t('whoStandards.benefits')}
							</h3>
							<p className='text-green-800 dark:text-green-200 text-sm'>
								{t('whoStandards.benefitsDescription')}
							</p>
						</div>
						<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4'>
							<h3 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>
								{t('whoStandards.reliability')}
							</h3>
							<p className='text-blue-800 dark:text-blue-200 text-sm'>
								{t('whoStandards.reliabilityDescription')}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Процентили */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2'>
					<TrendingUp className='text-purple-600' />
					{t('percentiles.title')}
				</h2>
				<div className='space-y-4'>
					<p className='text-gray-600 dark:text-gray-300'>
						{t('percentiles.content')}
					</p>
					<div className='overflow-x-auto'>
						<table className='w-full border-collapse'>
							<thead>
								<tr className='bg-gray-50 dark:bg-gray-700'>
									<th className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white'>
										{t('percentiles.table.percentile')}
									</th>
									<th className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white'>
										{t('percentiles.table.category')}
									</th>
									<th className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-900 dark:text-white'>
										{t('percentiles.table.description')}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
										<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'>
											&lt; 5%
										</span>
									</td>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
										{t('percentiles.table.belowNormal')}
									</td>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
										{t('percentiles.table.belowNormalDesc')}
									</td>
								</tr>
								<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
										<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'>
											5-25%
										</span>
									</td>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
										{t('percentiles.table.belowAverage')}
									</td>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
										{t(
											'percentiles.table.belowAverageDesc'
										)}
									</td>
								</tr>
								<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
										<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'>
											25-75%
										</span>
									</td>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
										{t('percentiles.table.normal')}
									</td>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
										{t('percentiles.table.normalDesc')}
									</td>
								</tr>
								<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
										<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'>
											75-95%
										</span>
									</td>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
										{t('percentiles.table.aboveAverage')}
									</td>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
										{t(
											'percentiles.table.aboveAverageDesc'
										)}
									</td>
								</tr>
								<tr className='hover:bg-gray-50 dark:hover:bg-gray-700/50'>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3'>
										<span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'>
											&gt; 95%
										</span>
									</td>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white'>
										{t('percentiles.table.aboveNormal')}
									</td>
									<td className='border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-600 dark:text-gray-400'>
										{t('percentiles.table.aboveNormalDesc')}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</section>

			{/* Как использовать */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2'>
					<Baby className='text-pink-600' />
					{t('howToUse.title')}
				</h2>
				<div className='space-y-4'>
					<p className='text-gray-600 dark:text-gray-300'>
						{t('howToUse.content')}
					</p>
					<div className='grid md:grid-cols-2 gap-4'>
						<div className='bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4'>
							<h3 className='font-semibold text-pink-900 dark:text-pink-100 mb-2 flex items-center gap-2'>
								<Ruler className='w-4 h-4' />
								{t('howToUse.measurements')}
							</h3>
							<p className='text-pink-800 dark:text-pink-200 text-sm'>
								{t('howToUse.measurementsDescription')}
							</p>
						</div>
						<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4'>
							<h3 className='font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2'>
								<Weight className='w-4 h-4' />
								{t('howToUse.accuracy')}
							</h3>
							<p className='text-blue-800 dark:text-blue-200 text-sm'>
								{t('howToUse.accuracyDescription')}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Важные замечания */}
			<section className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2'>
					<AlertTriangle className='text-orange-600' />
					{t('importantNotes.title')}
				</h2>
				<div className='space-y-4'>
					<p className='text-gray-600 dark:text-gray-300'>
						{t('importantNotes.content')}
					</p>
					<div className='bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4'>
						<div className='flex items-start gap-3'>
							<AlertTriangle className='text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0' />
							<div>
								<h3 className='font-semibold text-orange-800 dark:text-orange-200 mb-2'>
									{t('importantNotes.warning')}
								</h3>
								<p className='text-orange-700 dark:text-orange-300 text-sm'>
									{t('importantNotes.warningContent')}
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
							{t('faq.howToUse.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-300'>
							{t('faq.howToUse.answer')}
						</p>
					</div>

					<div className='border-b border-gray-200 dark:border-gray-600 pb-4'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.whoStandards.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-300'>
							{t('faq.whoStandards.answer')}
						</p>
					</div>

					<div className='border-b border-gray-200 dark:border-gray-600 pb-4'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.percentileMeaning.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-300'>
							{t('faq.percentileMeaning.answer')}
						</p>
					</div>

					<div>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
							{t('faq.ageLimit.question')}
						</h3>
						<p className='text-gray-600 dark:text-gray-300'>
							{t('faq.ageLimit.answer')}
						</p>
					</div>
				</div>
			</section>
		</div>
	);
}
