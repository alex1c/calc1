'use client';

import { useTranslations } from 'next-intl';

export default function CharacterTraitsSEO() {
	const t = useTranslations('calculators.characterTraits.seo');

	// Get FAQ items for structured data
	const faqRaw = t.raw('faqItems');
	const faq = Array.isArray(faqRaw)
		? (faqRaw as Array<{ q: string; a: string }>)
		: [];

	return (
		<div className='space-y-12'>
			{/* Overview */}
			<section className='prose prose-lg max-w-none'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('overview.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
					{t('overview.content')}
				</p>
				{t('overview.additionalContent') && (
					<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
						{t('overview.additionalContent')}
					</p>
				)}
			</section>

			{/* Calculation Examples */}
			{t.raw('overview.calculationExamples') &&
				Array.isArray(t.raw('overview.calculationExamples')) &&
				t.raw('overview.calculationExamples').length > 0 && (
					<section className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl shadow-lg p-8'>
						<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
							Примеры расчёта
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{(
								t.raw(
									'overview.calculationExamples'
								) as Array<{
									title: string;
									description: string;
									input: string;
									calculation: string;
									result: string;
									type: string;
								}>
							).map((example, index) => (
								<div
									key={index}
									className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-purple-200 dark:border-purple-800'
								>
									<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
										{example.title}
									</h3>
									<p className='text-sm text-gray-600 dark:text-gray-400 mb-4'>
										{example.description}
									</p>
									<div className='bg-blue-50 dark:bg-blue-900/30 rounded p-3 mb-3'>
										<p className='text-xs font-semibold text-blue-800 dark:text-blue-300 mb-1'>
											Входные данные:
										</p>
										<code className='text-xs text-blue-900 dark:text-blue-200 font-mono break-all whitespace-pre-wrap'>
											{example.input}
										</code>
									</div>
									<div className='bg-green-50 dark:bg-green-900/30 rounded p-3 mb-3'>
										<p className='text-xs font-semibold text-green-800 dark:text-green-300 mb-1'>
											Расчёт:
										</p>
										<code className='text-xs text-green-900 dark:text-green-200 font-mono break-all whitespace-pre-wrap'>
											{example.calculation}
										</code>
									</div>
									<div className='bg-yellow-50 dark:bg-yellow-900/30 rounded p-3'>
										<p className='text-xs font-semibold text-yellow-800 dark:text-yellow-300 mb-1'>
											Результат:
										</p>
										<p className='text-xs text-yellow-900 dark:text-yellow-200 font-bold'>
											{example.result}
										</p>
										<p className='text-xs text-yellow-700 dark:text-yellow-400 mt-1'>
											Тип: {example.type}
										</p>
									</div>
								</div>
							))}
						</div>
					</section>
				)}

			{/* How it works */}
			<section className='prose prose-lg max-w-none'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('calculation.title')}
				</h2>
				<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
					{t('calculation.content')}
				</p>
			</section>

			{/* Advantages */}
			<section className='prose prose-lg max-w-none'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('advantages.title')}
				</h2>
				<ul className='space-y-3'>
					{t.raw('advantages.items') &&
						Array.isArray(t.raw('advantages.items')) &&
						(t.raw('advantages.items') as string[]).map((item, index) => (
							<li
								key={index}
								className='flex items-start gap-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-100 dark:border-purple-800'
							>
								<span className='text-purple-600 dark:text-purple-400 mt-1'>
									💡
								</span>
								<span className='text-gray-700 dark:text-gray-300'>{item}</span>
							</li>
						))}
				</ul>
			</section>

			{/* Tips */}
			<section className='prose prose-lg max-w-none'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
					{t('tips.title')}
				</h2>
				<ul className='space-y-3'>
					{t.raw('tips.items') &&
						Array.isArray(t.raw('tips.items')) &&
						(t.raw('tips.items') as string[]).map((item, index) => (
							<li
								key={index}
								className='flex items-start gap-3'
							>
								<span className='text-purple-600 dark:text-purple-400 mt-1'>
									💡
								</span>
								<span className='text-gray-700 dark:text-gray-300'>{item}</span>
							</li>
						))}
				</ul>
			</section>

			{/* Facts */}
			{t.raw('facts.items') &&
				Array.isArray(t.raw('facts.items')) &&
				t.raw('facts.items').length > 0 && (
					<section className='prose prose-lg max-w-none'>
						<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
							{t('facts.title')}
						</h2>
						<div className='space-y-4'>
							{(t.raw('facts.items') as Array<{
								title: string;
								content: string;
							}>).map((fact, index) => (
								<div
									key={index}
									className='border-l-4 border-purple-400 dark:border-purple-600 pl-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-r-lg p-4'
								>
									<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
										{fact.title}
									</h3>
									<p className='text-gray-700 dark:text-gray-300'>{fact.content}</p>
								</div>
							))}
						</div>
					</section>
				)}

			{/* FAQ */}
			<section className='prose prose-lg max-w-none'>
				<h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					{t('faq.title')}
				</h2>
				<div className='space-y-6'>
					{faq.slice(0, 30).map((item, index) => (
						<div
							key={index}
							className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow'
						>
							<h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-3'>
								{item.q}
							</h3>
							<p className='text-gray-700 dark:text-gray-300'>{item.a}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}