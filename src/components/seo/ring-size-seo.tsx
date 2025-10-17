import { useTranslations } from 'next-intl';

export default function RingSizeSEO() {
	const t = useTranslations('calculators.ringSize.seo');
	const tTable = useTranslations('calculators.ringSize.table');

	return (
		<div className='max-w-4xl mx-auto mt-12 space-y-8'>
			{/* Overview Section */}
			<section className='bg-white rounded-lg shadow-md p-6'>
				<h2 className='text-2xl font-bold text-gray-800 mb-4'>
					{t('overview.title')}
				</h2>
				<p className='text-gray-600 leading-relaxed'>
					{t('overview.content')}
				</p>
			</section>

			{/* Calculation Method Section */}
			<section className='bg-white rounded-lg shadow-md p-6'>
				<h2 className='text-2xl font-bold text-gray-800 mb-4'>
					{t('calculation.title')}
				</h2>
				<p className='text-gray-600 leading-relaxed mb-4'>
					{t('calculation.content')}
				</p>

				{/* Size Systems Table */}
				<div className='overflow-x-auto'>
					<table className='w-full border-collapse border border-gray-300 mt-4'>
						<thead>
							<tr className='bg-gray-50'>
								<th className='border border-gray-300 px-4 py-2 text-left'>
									{tTable('country')}
								</th>
								<th className='border border-gray-300 px-4 py-2 text-left'>
									{tTable('sizeRange')}
								</th>
								<th className='border border-gray-300 px-4 py-2 text-left'>
									{tTable('description')}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className='border border-gray-300 px-4 py-2 font-medium'>
									🇷🇺 RU
								</td>
								<td className='border border-gray-300 px-4 py-2'>
									14-24
								</td>
								<td className='border border-gray-300 px-4 py-2'>
									{tTable('ruDescription')}
								</td>
							</tr>
							<tr>
								<td className='border border-gray-300 px-4 py-2 font-medium'>
									🇪🇺 EU
								</td>
								<td className='border border-gray-300 px-4 py-2'>
									44-64
								</td>
								<td className='border border-gray-300 px-4 py-2'>
									{tTable('euDescription')}
								</td>
							</tr>
							<tr>
								<td className='border border-gray-300 px-4 py-2 font-medium'>
									🇺🇸 US
								</td>
								<td className='border border-gray-300 px-4 py-2'>
									3-8
								</td>
								<td className='border border-gray-300 px-4 py-2'>
									{tTable('usDescription')}
								</td>
							</tr>
							<tr>
								<td className='border border-gray-300 px-4 py-2 font-medium'>
									🇬🇧 UK
								</td>
								<td className='border border-gray-300 px-4 py-2'>
									F-P
								</td>
								<td className='border border-gray-300 px-4 py-2'>
									{tTable('ukDescription')}
								</td>
							</tr>
							<tr>
								<td className='border border-gray-300 px-4 py-2 font-medium'>
									🇯🇵 JP
								</td>
								<td className='border border-gray-300 px-4 py-2'>
									1-21
								</td>
								<td className='border border-gray-300 px-4 py-2'>
									{tTable('jpDescription')}
								</td>
							</tr>
							<tr>
								<td className='border border-gray-300 px-4 py-2 font-medium'>
									🇨🇳 CN
								</td>
								<td className='border border-gray-300 px-4 py-2'>
									4-24
								</td>
								<td className='border border-gray-300 px-4 py-2'>
									{tTable('cnDescription')}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			{/* Measurement Guide Section */}
			<section className='bg-white rounded-lg shadow-md p-6'>
				<h2 className='text-2xl font-bold text-gray-800 mb-4'>
					{t('measurement.title')}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold text-gray-700'>
							{t('measurement.byDiameter.title')}
						</h3>
						<ul className='space-y-2 text-gray-600'>
							<li>• {t('measurement.byDiameter.step1')}</li>
							<li>• {t('measurement.byDiameter.step2')}</li>
							<li>• {t('measurement.byDiameter.step3')}</li>
						</ul>
					</div>
					<div className='space-y-4'>
						<h3 className='text-lg font-semibold text-gray-700'>
							{t('measurement.byFinger.title')}
						</h3>
						<ul className='space-y-2 text-gray-600'>
							<li>• {t('measurement.byFinger.step1')}</li>
							<li>• {t('measurement.byFinger.step2')}</li>
							<li>• {t('measurement.byFinger.step3')}</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Advantages Section */}
			<section className='bg-white rounded-lg shadow-md p-6'>
				<h2 className='text-2xl font-bold text-gray-800 mb-4'>
					{t('advantages.title')}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
					<div className='p-4 bg-blue-50 rounded-lg'>
						<h3 className='font-semibold text-blue-800 mb-2'>
							{t('advantages.precise.title')}
						</h3>
						<p className='text-blue-700 text-sm'>
							{t('advantages.precise.content')}
						</p>
					</div>
					<div className='p-4 bg-green-50 rounded-lg'>
						<h3 className='font-semibold text-green-800 mb-2'>
							{t('advantages.fast.title')}
						</h3>
						<p className='text-green-700 text-sm'>
							{t('advantages.fast.content')}
						</p>
					</div>
					<div className='p-4 bg-purple-50 rounded-lg'>
						<h3 className='font-semibold text-purple-800 mb-2'>
							{t('advantages.multilingual.title')}
						</h3>
						<p className='text-purple-700 text-sm'>
							{t('advantages.multilingual.content')}
						</p>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className='bg-white rounded-lg shadow-md p-6'>
				<h2 className='text-2xl font-bold text-gray-800 mb-6'>
					{t('faq.title')}
				</h2>
				<div className='space-y-4'>
					{t.raw('faqItems').map((faq: any, index: number) => (
						<div
							key={index}
							className='border border-gray-200 rounded-lg p-4'
						>
							<h3 className='font-semibold text-gray-800 mb-2'>
								{faq.q}
							</h3>
							<p className='text-gray-600'>{faq.a}</p>
						</div>
					))}
				</div>
			</section>

			{/* Tips Section */}
			<section className='bg-yellow-50 rounded-lg p-6'>
				<h2 className='text-2xl font-bold text-yellow-800 mb-4'>
					{t('tips.title')}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div className='space-y-2'>
						<h3 className='font-semibold text-yellow-800'>
							{t('tips.measurement.title')}
						</h3>
						<ul className='space-y-1 text-yellow-700 text-sm'>
							<li>• {t('tips.measurement.tip1')}</li>
							<li>• {t('tips.measurement.tip2')}</li>
							<li>• {t('tips.measurement.tip3')}</li>
						</ul>
					</div>
					<div className='space-y-2'>
						<h3 className='font-semibold text-yellow-800'>
							{t('tips.ordering.title')}
						</h3>
						<ul className='space-y-1 text-yellow-700 text-sm'>
							<li>• {t('tips.ordering.tip1')}</li>
							<li>• {t('tips.ordering.tip2')}</li>
							<li>• {t('tips.ordering.tip3')}</li>
						</ul>
					</div>
				</div>
			</section>
		</div>
	);
}
