import { useTranslations } from 'next-intl';

export default function GasUsageSEO() {
	const t = useTranslations('calculators.gasUsage.seo');

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

				<div className='bg-blue-50 p-4 rounded-lg'>
					<h3 className='text-lg font-semibold text-blue-900 mb-2'>
						Формула расчёта расхода газа:
					</h3>
					<p className='text-blue-800 text-sm'>
						<strong>
							Расход газа (м³/ч) = Мощность (кВт) / 10 / КПД
						</strong>
					</p>
					<p className='text-blue-800 text-sm mt-2'>
						<strong>
							Суточный расход = Расход в час × Часы работы
						</strong>
					</p>
					<p className='text-blue-800 text-sm mt-2'>
						<strong>Стоимость = Расход газа × Тариф</strong>
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
						<div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
							<span className='text-blue-600 text-sm font-bold'>
								1
							</span>
						</div>
						<p className='text-gray-700'>{t('tips.tip1')}</p>
					</div>
					<div className='flex items-start space-x-3'>
						<div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
							<span className='text-blue-600 text-sm font-bold'>
								2
							</span>
						</div>
						<p className='text-gray-700'>{t('tips.tip2')}</p>
					</div>
					<div className='flex items-start space-x-3'>
						<div className='w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
							<span className='text-blue-600 text-sm font-bold'>
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
									className='border-l-4 border-blue-500 pl-4'
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
			<section className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6'>
				<h2 className='text-xl font-bold text-gray-900 mb-4'>
					Дополнительная информация
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<h3 className='font-semibold text-gray-800 mb-2'>
							Типы газового оборудования:
						</h3>
						<ul className='text-sm text-gray-700 space-y-1'>
							<li>• Газовые котлы для отопления</li>
							<li>• Газовые колонки для воды</li>
							<li>• Газовые плиты для приготовления</li>
							<li>• Газовые конвекторы</li>
						</ul>
					</div>
					<div>
						<h3 className='font-semibold text-gray-800 mb-2'>
							Факторы влияющие на расход:
						</h3>
						<ul className='text-sm text-gray-700 space-y-1'>
							<li>• Мощность оборудования</li>
							<li>• КПД системы</li>
							<li>• Время работы</li>
							<li>• Температура окружающей среды</li>
						</ul>
					</div>
				</div>
			</section>

			{/* Gas Safety Tips */}
			<section className='bg-red-50 border border-red-200 rounded-lg p-6'>
				<h2 className='text-xl font-bold text-red-900 mb-4'>
					⚠️ Безопасность при работе с газом
				</h2>
				<div className='space-y-3 text-sm text-red-800'>
					<div className='flex items-start space-x-2'>
						<span className='text-red-600 font-bold'>•</span>
						<span>Регулярно проверяйте газовое оборудование</span>
					</div>
					<div className='flex items-start space-x-2'>
						<span className='text-red-600 font-bold'>•</span>
						<span>Устанавливайте датчики утечки газа</span>
					</div>
					<div className='flex items-start space-x-2'>
						<span className='text-red-600 font-bold'>•</span>
						<span>Обеспечивайте хорошую вентиляцию</span>
					</div>
					<div className='flex items-start space-x-2'>
						<span className='text-red-600 font-bold'>•</span>
						<span>
							При запахе газа немедленно перекройте подачу
						</span>
					</div>
				</div>
			</section>
		</div>
	);
}

