import { useTranslations } from 'next-intl'

/**
 * SEO Content Component for Equations Calculator
 * Provides rich content for search engines and users
 */
export default function EquationsSEO() {
	const t = useTranslations('calculators.equations.seo')
	
	return (
		<div className="mt-12 space-y-8 prose dark:prose-invert max-w-none">
			{/* Overview */}
			<section>
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
					{t('overview.title')}
				</h2>
				<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
					{t('overview.content')}
				</p>
			</section>

			{/* Calculation Examples */}
			<section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl">
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
					{t('overview.calculationExamples.title')}
				</h2>
				
				{/* Linear Equations Examples */}
				<div className="mb-8">
					<h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
						{t('overview.calculationExamples.linearExamples.title')}
					</h3>
					<div className="grid md:grid-cols-3 gap-6">
						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
							<h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
								Пример 1
							</h4>
							<div className="space-y-2">
								<p className="font-mono text-lg text-gray-800 dark:text-gray-200">
									{t('overview.calculationExamples.linearExamples.example1.equation')}
								</p>
								<p className="text-green-600 dark:text-green-400 font-semibold">
									Ответ: {t('overview.calculationExamples.linearExamples.example1.solution')}
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{t('overview.calculationExamples.linearExamples.example1.steps')}
								</p>
							</div>
						</div>
						
						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
							<h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
								Пример 2
							</h4>
							<div className="space-y-2">
								<p className="font-mono text-lg text-gray-800 dark:text-gray-200">
									{t('overview.calculationExamples.linearExamples.example2.equation')}
								</p>
								<p className="text-green-600 dark:text-green-400 font-semibold">
									Ответ: {t('overview.calculationExamples.linearExamples.example2.solution')}
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{t('overview.calculationExamples.linearExamples.example2.steps')}
								</p>
							</div>
						</div>
						
						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
							<h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
								Пример 3
							</h4>
							<div className="space-y-2">
								<p className="font-mono text-lg text-gray-800 dark:text-gray-200">
									{t('overview.calculationExamples.linearExamples.example3.equation')}
								</p>
								<p className="text-green-600 dark:text-green-400 font-semibold">
									Ответ: {t('overview.calculationExamples.linearExamples.example3.solution')}
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{t('overview.calculationExamples.linearExamples.example3.steps')}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Quadratic Equations Examples */}
				<div>
					<h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
						{t('overview.calculationExamples.quadraticExamples.title')}
					</h3>
					<div className="grid md:grid-cols-3 gap-6">
						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
							<h4 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-3">
								Два корня
							</h4>
							<div className="space-y-2">
								<p className="font-mono text-lg text-gray-800 dark:text-gray-200">
									{t('overview.calculationExamples.quadraticExamples.example1.equation')}
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{t('overview.calculationExamples.quadraticExamples.example1.discriminant')}
								</p>
								<p className="text-green-600 dark:text-green-400 font-semibold">
									{t('overview.calculationExamples.quadraticExamples.example1.solutions')}
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{t('overview.calculationExamples.quadraticExamples.example1.steps')}
								</p>
							</div>
						</div>
						
						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
							<h4 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-3">
								Один корень
							</h4>
							<div className="space-y-2">
								<p className="font-mono text-lg text-gray-800 dark:text-gray-200">
									{t('overview.calculationExamples.quadraticExamples.example2.equation')}
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{t('overview.calculationExamples.quadraticExamples.example2.discriminant')}
								</p>
								<p className="text-green-600 dark:text-green-400 font-semibold">
									{t('overview.calculationExamples.quadraticExamples.example2.solutions')}
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{t('overview.calculationExamples.quadraticExamples.example2.steps')}
								</p>
							</div>
						</div>
						
						<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
							<h4 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-3">
								Нет корней
							</h4>
							<div className="space-y-2">
								<p className="font-mono text-lg text-gray-800 dark:text-gray-200">
									{t('overview.calculationExamples.quadraticExamples.example3.equation')}
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{t('overview.calculationExamples.quadraticExamples.example3.discriminant')}
								</p>
								<p className="text-red-600 dark:text-red-400 font-semibold">
									{t('overview.calculationExamples.quadraticExamples.example3.solutions')}
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{t('overview.calculationExamples.quadraticExamples.example3.steps')}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			
			{/* Linear Equations */}
			<section>
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
					{t('linearEquations.title')}
				</h2>
				<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					{t('linearEquations.content')}
				</p>
				<div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
					<p className="font-mono text-lg text-blue-900 dark:text-blue-300">
						{t('linearEquations.formula')}
					</p>
					<p className="text-sm text-blue-800 dark:text-blue-400 mt-2">
						{t('linearEquations.example')}
					</p>
				</div>
			</section>
			
			{/* Quadratic Equations */}
			<section>
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
					{t('quadraticEquations.title')}
				</h2>
				<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					{t('quadraticEquations.content')}
				</p>
				<div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500 mb-4">
					<p className="font-mono text-lg text-purple-900 dark:text-purple-300">
						{t('quadraticEquations.formula')}
					</p>
					<p className="text-sm text-purple-800 dark:text-purple-400 mt-2">
						{t('quadraticEquations.discriminant')}
					</p>
				</div>
				<div className="grid md:grid-cols-3 gap-4">
					<div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
						<p className="font-semibold text-green-900 dark:text-green-300 mb-2">
							{t('quadraticEquations.twoRoots')}
						</p>
						<p className="text-sm text-green-800 dark:text-green-400">
							D &gt; 0
						</p>
					</div>
					<div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
						<p className="font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
							{t('quadraticEquations.oneRoot')}
						</p>
						<p className="text-sm text-yellow-800 dark:text-yellow-400">
							D = 0
						</p>
					</div>
					<div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
						<p className="font-semibold text-red-900 dark:text-red-300 mb-2">
							{t('quadraticEquations.noRoots')}
						</p>
						<p className="text-sm text-red-800 dark:text-red-400">
							D &lt; 0
						</p>
					</div>
				</div>
			</section>
			
			{/* What are Roots */}
			<section>
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
					{t('roots.title')}
				</h2>
				<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
					{t('roots.content')}
				</p>
				<ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mt-4">
					<li>{t('roots.real')}</li>
					<li>{t('roots.complex')}</li>
					<li>{t('roots.repeated')}</li>
				</ul>
			</section>
			
			{/* Advantages */}
			<section>
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
					{t('advantages.title')}
				</h2>
				<p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
					{t('advantages.content')}
				</p>
				<div className="grid md:grid-cols-2 gap-4">
					{Array.isArray(t.raw('advantages.items')) ? (t.raw('advantages.items') as string[]).map((item: string, index: number) => (
						<div key={index} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<svg
								className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
							<p className="text-gray-700 dark:text-gray-300">{item}</p>
						</div>
					)) : null}
				</div>
			</section>

			{/* FAQ Section */}
			<section className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 p-8 rounded-xl">
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
					Часто задаваемые вопросы о решении уравнений
				</h2>
				<div className="grid md:grid-cols-2 gap-6">
					{Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
						<div key={num} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
							<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
								{t(`faq.question${num}`)}
							</h3>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
								{t(`faq.answer${num}`)}
							</p>
						</div>
					))}
				</div>
			</section>
			
			{/* Online Calculator Info */}
			<section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 rounded-xl">
				<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
					{t('onlineCalculator.title')}
				</h2>
				<p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
					{t('onlineCalculator.content')}
				</p>
			</section>
		</div>
	)
}

