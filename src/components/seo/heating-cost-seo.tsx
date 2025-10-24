import { useTranslations } from 'next-intl';

export default function HeatingCostSEO() {
	const t = useTranslations('calculators.heatingCost.seo');

	return (
		<div className='max-w-4xl mx-auto mt-12 space-y-8'>
			{/* Overview Section */}
			<section className='bg-white rounded-lg shadow-md p-6'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('overview.title')}
				</h2>
				<p className='text-gray-700 leading-relaxed'>
					{t('overview.content')}
				</p>
			</section>

			{/* Calculation Method Section */}
			<section className='bg-white rounded-lg shadow-md p-6'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('calculation.title')}
				</h2>
				<p className='text-gray-700 leading-relaxed mb-4'>
					{t('calculation.content')}
				</p>

				<div className='bg-orange-50 p-4 rounded-lg'>
					<h3 className='text-lg font-semibold text-orange-900 mb-2'>
						Формула расчёта мощности:
					</h3>
					<p className='text-orange-800 text-sm'>
						<strong>
							Мощность (Вт) = Площадь × Мощность на м² ×
							Коэффициент температуры
						</strong>
					</p>
					<p className='text-orange-800 text-sm mt-2'>
						<strong>
							Потребление (кВт⋅ч) = (Мощность × Часы × Дни) /
							(1000 × КПД)
						</strong>
					</p>
				</div>
			</section>

			{/* Advantages Section */}
			<section className='bg-white rounded-lg shadow-md p-6'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('advantages.title')}
				</h2>
				<p className='text-gray-700 leading-relaxed'>
					{t('advantages.content')}
				</p>
			</section>

			{/* Tips Section */}
			<section className='bg-white rounded-lg shadow-md p-6'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('tips.title')}
				</h2>
				<div className='space-y-3'>
					<div className='flex items-start space-x-3'>
						<div className='w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
							<span className='text-orange-600 text-sm font-bold'>
								1
							</span>
						</div>
						<p className='text-gray-700'>{t('tips.tip1')}</p>
					</div>
					<div className='flex items-start space-x-3'>
						<div className='w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
							<span className='text-orange-600 text-sm font-bold'>
								2
							</span>
						</div>
						<p className='text-gray-700'>{t('tips.tip2')}</p>
					</div>
					<div className='flex items-start space-x-3'>
						<div className='w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
							<span className='text-orange-600 text-sm font-bold'>
								3
							</span>
						</div>
						<p className='text-gray-700'>{t('tips.tip3')}</p>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className='bg-white rounded-lg shadow-md p-6'>
				<h2 className='text-2xl font-bold text-gray-900 mb-6'>
					{t('faq.title')}
				</h2>
				<div className='space-y-6'>
					{Array.isArray(t.raw('faqItems'))
						? (
								t.raw('faqItems') as Array<{
									q: string;
									a: string;
								}>
						  ).map((faq, index) => (
								<div
									key={index}
									className='border-l-4 border-orange-500 pl-4'
								>
									<h3 className='text-lg font-semibold text-gray-900 mb-2'>
										{faq.q}
									</h3>
									<p className='text-gray-700 leading-relaxed'>
										{faq.a}
									</p>
								</div>
						  ))
						: []}
				</div>
			</section>

			{/* Additional Information */}
			<section className='bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6'>
				<h2 className='text-xl font-bold text-gray-900 mb-4'>
					Дополнительная информация
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<h3 className='font-semibold text-gray-800 mb-2'>
							Типы систем отопления:
						</h3>
						<ul className='text-sm text-gray-700 space-y-1'>
							<li>• Электрические конвекторы</li>
							<li>• Газовые котлы и конвекторы</li>
							<li>• Твердотопливные печи</li>
							<li>• Централизованное отопление</li>
						</ul>
					</div>
					<div>
						<h3 className='font-semibold text-gray-800 mb-2'>
							Факторы влияющие на стоимость:
						</h3>
						<ul className='text-sm text-gray-700 space-y-1'>
							<li>• Тип энергоносителя</li>
							<li>• КПД системы отопления</li>
							<li>• Качество утепления дома</li>
							<li>• Режим работы системы</li>
						</ul>
					</div>
				</div>
			</section>
		</div>
	);
}






