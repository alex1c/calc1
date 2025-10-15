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
							D > 0
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

