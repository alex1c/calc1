'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Droplets, Calculator, Clock, Zap, FileText } from 'lucide-react';

export default function WaterUsageSEO() {
	const t = useTranslations('calculators.waterUsage');

	const renderList = (items: string[]) => (
		<ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300'>
			{items.map((item, index) => (
				<li key={index}>{item}</li>
			))}
		</ul>
	);

	// Generate FAQ items array
	const faqItems = Array.from({ length: 30 }, (_, i) => ({
		q: t(`seo.faq.faqItems.${i}.q`),
		a: t(`seo.faq.faqItems.${i}.a`),
	}));

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
											<Droplets className='w-5 h-5 text-blue-600 dark:text-blue-400' />
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
													Сценарий:
												</p>
												<p className='text-xs text-purple-900 dark:text-purple-200'>
													{t(
														`seo.overview.calculationExamples.example${exampleNum}.scenario`
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
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<div className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
							<h3 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>
								{t('seo.calculation.residential')}
							</h3>
							<p className='text-blue-800 dark:text-blue-200 text-sm'>
								Жилые помещения: 200-300 л/чел/день
							</p>
						</div>
						<div className='bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
							<h3 className='font-semibold text-green-900 dark:text-green-100 mb-2'>
								{t('seo.calculation.office')}
							</h3>
							<p className='text-green-800 dark:text-green-200 text-sm'>
								Офисы: 50-100 л/чел/день
							</p>
						</div>
						<div className='bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg'>
							<h3 className='font-semibold text-orange-900 dark:text-orange-100 mb-2'>
								{t('seo.calculation.construction')}
							</h3>
							<p className='text-orange-800 dark:text-orange-200 text-sm'>
								Строительство: 500-1000 л/день на объект
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Visual Chart: Water Consumption Norms */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Нормы потребления воды по типам помещений
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Стандартные нормы расхода воды для различных типов
						помещений:
					</p>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{[
							{
								type: 'Квартира',
								norm: '200 л/чел/день',
								features: 'Стирка, готовка, гигиена',
							},
							{
								type: 'Частный дом',
								norm: '250 л/чел/день',
								features:
									'Полив, баня, дополнительное потребление',
							},
							{
								type: 'Офис',
								norm: '80 л/чел/день',
								features: 'Туалет, кухня, уборка',
							},
							{
								type: 'Строительство',
								norm: '500-1000 л/день',
								features: 'Бетон, полив, мойка инструментов',
							},
							{
								type: 'Коммерческое',
								norm: '150 л/чел/день',
								features: 'Кафе, ресторан, магазин',
							},
							{
								type: 'Гостиница',
								norm: '200-300 л/номер/день',
								features: 'Номера, прачечная, ресторан',
							},
							{
								type: 'Бассейн',
								norm: '500-2000 л/месяц',
								features: 'Заполнение, подпитка, фильтрация',
							},
							{
								type: 'Автомойка',
								norm: '50-100 л/авто',
								features: 'Мойка автомобилей',
							},
						].map((item, idx) => (
							<div
								key={idx}
								className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center border-2 border-blue-200 dark:border-blue-800'
							>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{item.type}
								</h3>
								<p className='text-gray-700 dark:text-gray-300 text-sm mb-1 font-bold'>
									{item.norm}
								</p>
								<div className='text-xs text-gray-600 dark:text-gray-400'>
									{item.features}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Visual Chart: Water Usage by Device */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Расход воды бытовыми приборами
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Типичный расход воды бытовыми приборами и сантехникой:
					</p>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{[
							{
								device: 'Душ (5 мин)',
								old: '30-50 л',
								new: '15-25 л',
								saving: '50%',
							},
							{
								device: 'Ванна',
								old: '150-200 л',
								new: '100-150 л',
								saving: '25%',
							},
							{
								device: 'Туалет (смыв)',
								old: '9-12 л',
								new: '3-6 л',
								saving: '50%',
							},
							{
								device: 'Стиральная машина',
								old: '50-60 л',
								new: '40-50 л',
								saving: '20%',
							},
							{
								device: 'Посудомоечная машина',
								old: '10-12 л',
								new: '6-8 л',
								saving: '40%',
							},
							{
								device: 'Кран (1 мин)',
								old: '6-8 л',
								new: '3-5 л',
								saving: '40%',
							},
							{
								device: 'Мойка посуды (ручная)',
								old: '20-40 л',
								new: '15-25 л',
								saving: '30%',
							},
							{
								device: 'Полив сада',
								old: '10 л/м²',
								new: '5-7 л/м²',
								saving: '30%',
							},
						].map((item, idx) => (
							<div
								key={idx}
								className='bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center'
							>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{item.device}
								</h3>
								<div className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
									Старое:{' '}
									<span className='line-through'>
										{item.old}
									</span>
								</div>
								<div className='text-sm text-green-700 dark:text-green-300 mb-1 font-bold'>
									Новое: {item.new}
								</div>
								<div className='text-xs text-green-600 dark:text-green-400'>
									Экономия: {item.saving}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Features */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.features.title')}
					</h2>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div className='space-y-3'>
						<div className='flex items-start'>
							<span className='text-blue-500 mr-2'>•</span>
							<span className='text-gray-700 dark:text-gray-300'>
								{t('seo.features.daily')}
							</span>
						</div>
						<div className='flex items-start'>
							<span className='text-blue-500 mr-2'>•</span>
							<span className='text-gray-700 dark:text-gray-300'>
								{t('seo.features.scenarios')}
							</span>
						</div>
						<div className='flex items-start'>
							<span className='text-blue-500 mr-2'>•</span>
							<span className='text-gray-700 dark:text-gray-300'>
								{t('seo.features.devices')}
							</span>
						</div>
					</div>
					<div className='space-y-3'>
						<div className='flex items-start'>
							<span className='text-green-500 mr-2'>•</span>
							<span className='text-gray-700 dark:text-gray-300'>
								{t('seo.features.losses')}
							</span>
						</div>
						<div className='flex items-start'>
							<span className='text-green-500 mr-2'>•</span>
							<span className='text-gray-700 dark:text-gray-300'>
								{t('seo.features.conversion')}
							</span>
						</div>
						<div className='flex items-start'>
							<span className='text-green-500 mr-2'>•</span>
							<span className='text-gray-700 dark:text-gray-300'>
								{t('seo.features.visualization')}
							</span>
						</div>
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
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
						<h3 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>
							{t('seo.advantages.accurate')}
						</h3>
						<p className='text-blue-800 dark:text-blue-200 text-sm'>
							{t('seo.advantages.accurateDesc')}
						</p>
					</div>
					<div className='bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
						<h3 className='font-semibold text-green-900 dark:text-green-100 mb-2'>
							{t('seo.advantages.flexible')}
						</h3>
						<p className='text-green-800 dark:text-green-200 text-sm'>
							{t('seo.advantages.flexibleDesc')}
						</p>
					</div>
					<div className='bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg'>
						<h3 className='font-semibold text-purple-900 dark:text-purple-100 mb-2'>
							{t('seo.advantages.comprehensive')}
						</h3>
						<p className='text-purple-800 dark:text-purple-200 text-sm'>
							{t('seo.advantages.comprehensiveDesc')}
						</p>
					</div>
					<div className='bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg'>
						<h3 className='font-semibold text-orange-900 dark:text-orange-100 mb-2'>
							{t('seo.advantages.export')}
						</h3>
						<p className='text-orange-800 dark:text-orange-200 text-sm'>
							{t('seo.advantages.exportDesc')}
						</p>
					</div>
				</div>
			</div>

			{/* Tips */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.tips.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('seo.tips.content')}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div className='space-y-3'>
							<h3 className='font-semibold text-gray-900 dark:text-white'>
								{t('seo.tips.equipment.title')}
							</h3>
							<ul className='space-y-2 text-gray-700 dark:text-gray-300'>
								<li className='flex items-start'>
									<span className='text-blue-500 mr-2'>
										•
									</span>
									{t('seo.tips.equipment.faucets')}
								</li>
								<li className='flex items-start'>
									<span className='text-blue-500 mr-2'>
										•
									</span>
									{t('seo.tips.equipment.toilets')}
								</li>
								<li className='flex items-start'>
									<span className='text-blue-500 mr-2'>
										•
									</span>
									{t('seo.tips.equipment.showerheads')}
								</li>
								<li className='flex items-start'>
									<span className='text-blue-500 mr-2'>
										•
									</span>
									{t('seo.tips.equipment.washing')}
								</li>
							</ul>
						</div>
						<div className='space-y-3'>
							<h3 className='font-semibold text-gray-900 dark:text-white'>
								{t('seo.tips.habits.title')}
							</h3>
							<ul className='space-y-2 text-gray-700 dark:text-gray-300'>
								<li className='flex items-start'>
									<span className='text-green-500 mr-2'>
										•
									</span>
									{t('seo.tips.habits.timing')}
								</li>
								<li className='flex items-start'>
									<span className='text-green-500 mr-2'>
										•
									</span>
									{t('seo.tips.habits.repair')}
								</li>
								<li className='flex items-start'>
									<span className='text-green-500 mr-2'>
										•
									</span>
									{t('seo.tips.habits.collection')}
								</li>
								<li className='flex items-start'>
									<span className='text-green-500 mr-2'>
										•
									</span>
									{t('seo.tips.habits.efficient')}
								</li>
							</ul>
						</div>
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
