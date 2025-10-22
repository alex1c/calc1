'use client';

import { useTranslations } from 'next-intl';
import { Droplets, Calculator, Zap, Shield, CheckCircle } from 'lucide-react';

export default function WaterPipeSEO() {
	const t = useTranslations('calculators.waterPipeCalculator.seo');

	return (
		<div className='space-y-12'>
			{/* Overview Section */}
			<section className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
				<div className='flex items-center mb-6'>
					<Droplets className='w-8 h-8 text-cyan-600 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('overview.title')}
					</h2>
				</div>
				<div className='prose dark:prose-invert max-w-none'>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
						{t('overview.content')}
					</p>

					{/* Examples Section */}
					<div className='mt-8'>
						<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-6'>
							{t('overview.examples.title')}
						</h3>

						<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
							{/* Diameter Example */}
							<div className='bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-6'>
								<h4 className='font-semibold text-cyan-900 dark:text-cyan-100 mb-3'>
									{t(
										'overview.examples.diameterExample.title'
									)}
								</h4>
								<p className='text-gray-700 dark:text-gray-300 mb-3'>
									{t(
										'overview.examples.diameterExample.scenario'
									)}
								</p>
								<div className='bg-white dark:bg-gray-800 rounded p-3 mb-3'>
									<code className='text-sm text-gray-800 dark:text-gray-200'>
										{t(
											'overview.examples.diameterExample.calculation'
										)}
									</code>
								</div>
								<p className='text-green-700 dark:text-green-300 font-medium'>
									{t(
										'overview.examples.diameterExample.result'
									)}
								</p>
							</div>

							{/* Flow Example */}
							<div className='bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-6'>
								<h4 className='font-semibold text-cyan-900 dark:text-cyan-100 mb-3'>
									{t('overview.examples.flowExample.title')}
								</h4>
								<p className='text-gray-700 dark:text-gray-300 mb-3'>
									{t(
										'overview.examples.flowExample.scenario'
									)}
								</p>
								<div className='bg-white dark:bg-gray-800 rounded p-3 mb-3'>
									<code className='text-sm text-gray-800 dark:text-gray-200'>
										{t(
											'overview.examples.flowExample.calculation'
										)}
									</code>
								</div>
								<p className='text-green-700 dark:text-green-300 font-medium'>
									{t('overview.examples.flowExample.result')}
								</p>
							</div>

							{/* Pressure Example */}
							<div className='bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-6'>
								<h4 className='font-semibold text-cyan-900 dark:text-cyan-100 mb-3'>
									{t(
										'overview.examples.pressureExample.title'
									)}
								</h4>
								<p className='text-gray-700 dark:text-gray-300 mb-3'>
									{t(
										'overview.examples.pressureExample.scenario'
									)}
								</p>
								<div className='bg-white dark:bg-gray-800 rounded p-3 mb-3'>
									<code className='text-sm text-gray-800 dark:text-gray-200'>
										{t(
											'overview.examples.pressureExample.calculation'
										)}
									</code>
								</div>
								<p className='text-green-700 dark:text-green-300 font-medium'>
									{t(
										'overview.examples.pressureExample.result'
									)}
								</p>
							</div>

							{/* Material Example */}
							<div className='bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-6'>
								<h4 className='font-semibold text-cyan-900 dark:text-cyan-100 mb-3'>
									{t(
										'overview.examples.materialExample.title'
									)}
								</h4>
								<p className='text-gray-700 dark:text-gray-300 mb-3'>
									{t(
										'overview.examples.materialExample.scenario'
									)}
								</p>
								<div className='space-y-2 mb-3'>
									<div className='bg-white dark:bg-gray-800 rounded p-2'>
										<span className='text-sm text-gray-600 dark:text-gray-400'>
											Сталь:{' '}
										</span>
										<code className='text-sm text-gray-800 dark:text-gray-200'>
											{t(
												'overview.examples.materialExample.steel'
											)}
										</code>
									</div>
									<div className='bg-white dark:bg-gray-800 rounded p-2'>
										<span className='text-sm text-gray-600 dark:text-gray-400'>
											Пластик:{' '}
										</span>
										<code className='text-sm text-gray-800 dark:text-gray-200'>
											{t(
												'overview.examples.materialExample.plastic'
											)}
										</code>
									</div>
								</div>
								<p className='text-green-700 dark:text-green-300 font-medium'>
									{t(
										'overview.examples.materialExample.result'
									)}
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Calculation Method Section */}
			<section className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
				<div className='flex items-center mb-6'>
					<Calculator className='w-8 h-8 text-cyan-600 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('calculation.title')}
					</h2>
				</div>
				<div className='prose dark:prose-invert max-w-none'>
					<p className='text-lg text-gray-700 dark:text-gray-300 mb-6'>
						{t('calculation.content')}
					</p>

					{/* Methods Section */}
					<div className='mb-8'>
						<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
							{t('calculation.methods.title')}
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4'>
								<h4 className='font-semibold text-cyan-900 dark:text-cyan-100 mb-2'>
									{t('calculation.methods.continuity')}
								</h4>
							</div>
							<div className='bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4'>
								<h4 className='font-semibold text-cyan-900 dark:text-cyan-100 mb-2'>
									{t('calculation.methods.bernoulli')}
								</h4>
							</div>
							<div className='bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4'>
								<h4 className='font-semibold text-cyan-900 dark:text-cyan-100 mb-2'>
									{t('calculation.methods.darcy')}
								</h4>
							</div>
							<div className='bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4'>
								<h4 className='font-semibold text-cyan-900 dark:text-cyan-100 mb-2'>
									{t('calculation.methods.reynolds')}
								</h4>
							</div>
							<div className='bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4'>
								<h4 className='font-semibold text-cyan-900 dark:text-cyan-100 mb-2'>
									{t('calculation.methods.moody')}
								</h4>
							</div>
							<div className='bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4'>
								<h4 className='font-semibold text-cyan-900 dark:text-cyan-100 mb-2'>
									{t('calculation.methods.hazen')}
								</h4>
							</div>
						</div>
					</div>

					{/* Parameters Section */}
					<div className='mb-8'>
						<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
							{t('calculation.parameters.title')}
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4'>
								<h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>
									{t('calculation.parameters.flowRate')}
								</h4>
							</div>
							<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4'>
								<h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>
									{t('calculation.parameters.velocity')}
								</h4>
							</div>
							<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4'>
								<h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>
									{t('calculation.parameters.diameter')}
								</h4>
							</div>
							<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4'>
								<h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>
									{t('calculation.parameters.length')}
								</h4>
							</div>
							<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4'>
								<h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>
									{t('calculation.parameters.pressure')}
								</h4>
							</div>
							<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4'>
								<h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>
									{t('calculation.parameters.density')}
								</h4>
							</div>
							<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4'>
								<h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>
									{t('calculation.parameters.viscosity')}
								</h4>
							</div>
							<div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4'>
								<h4 className='font-semibold text-blue-900 dark:text-blue-100 mb-2'>
									{t('calculation.parameters.roughness')}
								</h4>
							</div>
						</div>
					</div>

					{/* Flow Regimes Section */}
					<div className='mb-8'>
						<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
							{t('calculation.regimes.title')}
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
							<div className='bg-green-50 dark:bg-green-900/20 rounded-lg p-4'>
								<h4 className='font-semibold text-green-900 dark:text-green-100 mb-2'>
									{t('calculation.regimes.laminar')}
								</h4>
							</div>
							<div className='bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4'>
								<h4 className='font-semibold text-yellow-900 dark:text-yellow-100 mb-2'>
									{t('calculation.regimes.transitional')}
								</h4>
							</div>
							<div className='bg-red-50 dark:bg-red-900/20 rounded-lg p-4'>
								<h4 className='font-semibold text-red-900 dark:text-red-100 mb-2'>
									{t('calculation.regimes.turbulent')}
								</h4>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
				<div className='flex items-center mb-6'>
					<Zap className='w-8 h-8 text-cyan-600 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('features.title')}
					</h2>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='flex items-start'>
						<CheckCircle className='w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								{t('features.diameterCalculation')}
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								{t('features.diameterCalculationDesc')}
							</p>
						</div>
					</div>
					<div className='flex items-start'>
						<CheckCircle className='w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								{t('features.flowCalculation')}
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								{t('features.flowCalculationDesc')}
							</p>
						</div>
					</div>
					<div className='flex items-start'>
						<CheckCircle className='w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								{t('features.pressureCalculation')}
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								{t('features.pressureCalculationDesc')}
							</p>
						</div>
					</div>
					<div className='flex items-start'>
						<CheckCircle className='w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								{t('features.materialSupport')}
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								{t('features.materialSupportDesc')}
							</p>
						</div>
					</div>
					<div className='flex items-start'>
						<CheckCircle className='w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								{t('features.accuracy')}
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								{t('features.accuracyDesc')}
							</p>
						</div>
					</div>
					<div className='flex items-start'>
						<CheckCircle className='w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0' />
						<div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								{t('features.export')}
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								{t('features.exportDesc')}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Advantages Section */}
			<section className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
				<div className='flex items-center mb-6'>
					<Shield className='w-8 h-8 text-cyan-600 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('advantages.title')}
					</h2>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-6'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-3'>
							{t('advantages.professional')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							{t('advantages.professionalDesc')}
						</p>
					</div>
					<div className='bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-6'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-3'>
							{t('advantages.accuracy')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							{t('advantages.accuracyDesc')}
						</p>
					</div>
					<div className='bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-6'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-3'>
							{t('advantages.timeSaving')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							{t('advantages.timeSavingDesc')}
						</p>
					</div>
					<div className='bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-6'>
						<h3 className='font-semibold text-gray-900 dark:text-white mb-3'>
							{t('advantages.costEffective')}
						</h3>
						<p className='text-gray-600 dark:text-gray-400'>
							{t('advantages.costEffectiveDesc')}
						</p>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
				<div className='flex items-center mb-6'>
					<Calculator className='w-8 h-8 text-cyan-600 mr-3' />
					<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
						{t('faq.title')}
					</h2>
				</div>
				<div className='space-y-6'>
					{t.raw('faq.faqItems').map((item: any, index: number) => (
						<div
							key={index}
							className='border-b border-gray-200 dark:border-gray-700 pb-4'
						>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
								{item.q}
							</h3>
							<p className='text-gray-600 dark:text-gray-400'>
								{item.a}
							</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
