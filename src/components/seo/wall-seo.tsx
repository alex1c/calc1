'use client';

import { useTranslations } from 'next-intl';

export default function WallSEO() {
	const t = useTranslations('calculators.wall');

	return (
		<div className='max-w-4xl mx-auto px-4 py-8'>
			{/* Overview Section */}
			<div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('seo.overview.title')}
				</h2>
				<p className='text-gray-700 leading-relaxed'>
					{t('seo.overview.content')}
				</p>
			</div>

			{/* Calculation Steps */}
			<div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('seo.calculation.title')}
				</h2>
				<p className='text-gray-700 mb-4'>
					{t('seo.calculation.content')}
				</p>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div className='space-y-3'>
						<div className='flex items-start'>
							<span className='bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3 mt-1'>
								1
							</span>
							<p className='text-gray-700'>
								{t('seo.calculation.steps.area')}
							</p>
						</div>
						<div className='flex items-start'>
							<span className='bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3 mt-1'>
								2
							</span>
							<p className='text-gray-700'>
								{t('seo.calculation.steps.thickness')}
							</p>
						</div>
						<div className='flex items-start'>
							<span className='bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3 mt-1'>
								3
							</span>
							<p className='text-gray-700'>
								{t('seo.calculation.steps.material')}
							</p>
						</div>
					</div>
					<div className='space-y-3'>
						<div className='flex items-start'>
							<span className='bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3 mt-1'>
								4
							</span>
							<p className='text-gray-700'>
								{t('seo.calculation.steps.reserve')}
							</p>
						</div>
						<div className='flex items-start'>
							<span className='bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3 mt-1'>
								5
							</span>
							<p className='text-gray-700'>
								{t('seo.calculation.steps.mortar')}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Materials Section */}
			<div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('seo.materials.title')}
				</h2>
				<p className='text-gray-700 mb-6'>
					{t('seo.materials.content')}
				</p>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='text-lg font-semibold text-gray-900 mb-2'>
							{t('seo.materials.bricks.title')}
						</h3>
						<p className='text-gray-700 text-sm'>
							{t('seo.materials.bricks.content')}
						</p>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='text-lg font-semibold text-gray-900 mb-2'>
							{t('seo.materials.blocks.title')}
						</h3>
						<p className='text-gray-700 text-sm'>
							{t('seo.materials.blocks.content')}
						</p>
					</div>
				</div>
			</div>

			{/* Wall Thickness Section */}
			<div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('seo.thickness.title')}
				</h2>
				<p className='text-gray-700 mb-6'>
					{t('seo.thickness.content')}
				</p>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='text-lg font-semibold text-gray-900 mb-2'>
							{t('seo.thickness.half')}
						</h3>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='text-lg font-semibold text-gray-900 mb-2'>
							{t('seo.thickness.single')}
						</h3>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='text-lg font-semibold text-gray-900 mb-2'>
							{t('seo.thickness.double')}
						</h3>
					</div>
					<div className='border border-gray-200 rounded-lg p-4'>
						<h3 className='text-lg font-semibold text-gray-900 mb-2'>
							{t('seo.thickness.triple')}
						</h3>
					</div>
				</div>
			</div>

			{/* Tips Section */}
			<div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('seo.tips.title')}
				</h2>
				<p className='text-gray-700 mb-4'>{t('seo.tips.content')}</p>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<ul className='space-y-2'>
						<li className='flex items-start'>
							<span className='text-green-500 mr-2'>✓</span>
							<span className='text-gray-700'>
								{t('seo.tips.dimensions')}
							</span>
						</li>
						<li className='flex items-start'>
							<span className='text-green-500 mr-2'>✓</span>
							<span className='text-gray-700'>
								{t('seo.tips.thickness')}
							</span>
						</li>
						<li className='flex items-start'>
							<span className='text-green-500 mr-2'>✓</span>
							<span className='text-gray-700'>
								{t('seo.tips.joints')}
							</span>
						</li>
					</ul>
					<ul className='space-y-2'>
						<li className='flex items-start'>
							<span className='text-green-500 mr-2'>✓</span>
							<span className='text-gray-700'>
								{t('seo.tips.reserve')}
							</span>
						</li>
						<li className='flex items-start'>
							<span className='text-green-500 mr-2'>✓</span>
							<span className='text-gray-700'>
								{t('seo.tips.price')}
							</span>
						</li>
					</ul>
				</div>
			</div>

			{/* Benefits Section */}
			<div className='bg-white rounded-lg shadow-lg p-6'>
				<h2 className='text-2xl font-bold text-gray-900 mb-4'>
					{t('seo.benefits.title')}
				</h2>
				<p className='text-gray-700 mb-6'>
					{t('seo.benefits.content')}
				</p>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					<div className='text-center'>
						<div className='bg-blue-100 text-blue-800 text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3'>
							🎯
						</div>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('seo.benefits.accuracy')}
						</h3>
					</div>
					<div className='text-center'>
						<div className='bg-blue-100 text-blue-800 text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3'>
							💰
						</div>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('seo.benefits.cost')}
						</h3>
					</div>
					<div className='text-center'>
						<div className='bg-blue-100 text-blue-800 text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3'>
							📋
						</div>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('seo.benefits.planning')}
						</h3>
					</div>
					<div className='text-center'>
						<div className='bg-blue-100 text-blue-800 text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3'>
							♻️
						</div>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('seo.benefits.waste')}
						</h3>
					</div>
					<div className='text-center'>
						<div className='bg-blue-100 text-blue-800 text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3'>
							⏱️
						</div>
						<h3 className='font-semibold text-gray-900 mb-2'>
							{t('seo.benefits.time')}
						</h3>
					</div>
				</div>
			</div>
		</div>
	);
}









