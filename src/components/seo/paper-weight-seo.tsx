'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FileText, Scale, Calculator, Info } from 'lucide-react';

export default function PaperWeightSEO() {
	const t = useTranslations('calculators.paper-weight');

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
											<FileText className='w-5 h-5 text-blue-600 dark:text-blue-400' />
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
													Формат:
												</p>
												<p className='text-xs text-purple-900 dark:text-purple-200'>
													{t(
														`seo.overview.calculationExamples.example${exampleNum}.format`
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
						{t('seo.methods.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('seo.methods.content')}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{/* Density Method */}
						<div className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2'>
								{t('seo.methods.density.title')}
							</h3>
							<p className='text-blue-800 dark:text-blue-200 text-sm'>
								{t('seo.methods.density.description')}
							</p>
						</div>
						{/* Area Method */}
						<div className='bg-green-50 dark:bg-green-900/20 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-green-900 dark:text-green-100 mb-2'>
								{t('seo.methods.area.title')}
							</h3>
							<p className='text-green-800 dark:text-green-200 text-sm'>
								{t('seo.methods.area.description')}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Paper Types */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.paperTypes.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('seo.paperTypes.content')}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{/* Office Paper */}
						<div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								{t('seo.paperTypes.office.title')}
							</h3>
							<p className='text-gray-700 dark:text-gray-300 text-sm mb-2'>
								{t('seo.paperTypes.office.description')}
							</p>
							<div className='text-sm text-gray-600 dark:text-gray-400'>
								{t('seo.paperTypes.office.weight')}
							</div>
						</div>
						{/* Cardstock */}
						<div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								{t('seo.paperTypes.cardstock.title')}
							</h3>
							<p className='text-gray-700 dark:text-gray-300 text-sm mb-2'>
								{t('seo.paperTypes.cardstock.description')}
							</p>
							<div className='text-sm text-gray-600 dark:text-gray-400'>
								{t('seo.paperTypes.cardstock.weight')}
							</div>
						</div>
						{/* Photo Paper */}
						<div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								{t('seo.paperTypes.photo.title')}
							</h3>
							<p className='text-gray-700 dark:text-gray-300 text-sm mb-2'>
								{t('seo.paperTypes.photo.description')}
							</p>
							<div className='text-sm text-gray-600 dark:text-gray-400'>
								{t('seo.paperTypes.photo.weight')}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Applications */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('seo.applications.title')}
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						{t('seo.applications.content')}
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{/* Professional Use */}
						<div className='bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2'>
								{t('seo.applications.professional.title')}
							</h3>
							{renderList([
								t('seo.applications.professional.printing'),
								t('seo.applications.professional.packaging'),
								t('seo.applications.professional.publishing'),
								t(
									'seo.applications.professional.manufacturing'
								),
							])}
						</div>
						{/* Personal Use */}
						<div className='bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg'>
							<h3 className='text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2'>
								{t('seo.applications.personal.title')}
							</h3>
							{renderList([
								t('seo.applications.personal.crafts'),
								t('seo.applications.personal.art'),
								t('seo.applications.personal.education'),
								t('seo.applications.personal.hobbies'),
							])}
						</div>
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
					{renderList([
						t('seo.tips.measurement'),
						t('seo.tips.accuracy'),
						t('seo.tips.calculation'),
						t('seo.tips.verification'),
					])}
				</div>
			</div>

			{/* Visual Chart: Paper Density Comparison */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Таблица плотности бумаги
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Стандартные значения плотности различных типов бумаги:
					</p>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{[
							{
								type: 'Тонкая бумага',
								density: '60-70 г/м²',
								use: 'Книги, блокноты',
							},
							{
								type: 'Офисная',
								density: '80-100 г/м²',
								use: 'Принтеры, копиры',
							},
							{
								type: 'Плотная',
								density: '120-150 г/м²',
								use: 'Брошюры, реклама',
							},
							{
								type: 'Фотобумага',
								density: '150-250 г/м²',
								use: 'Печать фото',
							},
							{
								type: 'Картон',
								density: '200-300 г/м²',
								use: 'Упаковка',
							},
							{
								type: 'Газетная',
								density: '45-60 г/м²',
								use: 'Газеты',
							},
							{
								type: 'Мелованная',
								density: '90-150 г/м²',
								use: 'Журналы',
							},
							{
								type: 'Самоклеящаяся',
								density: '120-180 г/м²',
								use: 'Наклейки',
							},
						].map((item, idx) => (
							<div
								key={idx}
								className='bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center'
							>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
									{item.type}
								</h3>
								<p className='text-gray-700 dark:text-gray-300 text-sm mb-1 font-bold'>
									{item.density}
								</p>
								<div className='text-xs text-gray-600 dark:text-gray-400'>
									{item.use}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Visual Chart: Paper Format Areas */}
			<div className='bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
				<div className='mb-4'>
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						Площади стандартных форматов бумаги
					</h2>
				</div>
				<div>
					<p className='text-gray-700 dark:text-gray-300 mb-4'>
						Площади листов различных форматов для расчёта веса:
					</p>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						{[
							{
								format: 'A4',
								size: '210×297 мм',
								area: '0.06237 м²',
								weight80: '4.99 г',
							},
							{
								format: 'A3',
								size: '297×420 мм',
								area: '0.12474 м²',
								weight80: '9.98 г',
							},
							{
								format: 'A5',
								size: '148×210 мм',
								area: '0.03108 м²',
								weight80: '2.49 г',
							},
							{
								format: 'Letter',
								size: '216×279 мм',
								area: '0.060264 м²',
								weight80: '4.82 г',
							},
						].map((item, idx) => (
							<div
								key={idx}
								className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center border-2 border-blue-200 dark:border-blue-800'
							>
								<div className='font-bold text-gray-900 dark:text-white mb-1 text-xl'>
									{item.format}
								</div>
								<div className='text-sm text-gray-600 dark:text-gray-400 mb-1'>
									{item.size}
								</div>
								<div className='text-xs text-blue-700 dark:text-blue-300 mb-1'>
									Площадь: {item.area}
								</div>
								<div className='text-xs text-gray-600 dark:text-gray-400'>
									Вес (80 г/м²): {item.weight80}
								</div>
							</div>
						))}
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
