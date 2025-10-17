'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

/**
 * SEO Content Component for Temperature Converter
 * Displays comprehensive information about temperature conversion
 */
export default function TemperatureSEO() {
	const t = useTranslations('calculators.temperature.seo');
	const [expandedSections, setExpandedSections] = useState<Set<string>>(
		new Set(['overview'])
	);

	const toggleSection = (section: string) => {
		const newExpanded = new Set(expandedSections);
		if (newExpanded.has(section)) {
			newExpanded.delete(section);
		} else {
			newExpanded.add(section);
		}
		setExpandedSections(newExpanded);
	};

	const sections = [
		{
			id: 'overview',
			title: t('overview.title'),
			content: t('overview.content'),
		},
		{
			id: 'calculation',
			title: t('calculation.title'),
			content: t('calculation.content'),
		},
		{
			id: 'units',
			title: t('units.title'),
			content: t('units.content'),
		},
		{
			id: 'advantages',
			title: t('advantages.title'),
			content: t('advantages.content'),
		},
	];

	return (
		<div className='max-w-4xl mx-auto'>
			{/* Main SEO Content */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8'>
				<h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
					{t('h1')}
				</h1>
				<h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6'>
					{t('h2')}
				</h2>

				{/* Expandable Sections */}
				<div className='space-y-4'>
					{sections.map((section) => (
						<div
							key={section.id}
							className='border border-gray-200 dark:border-gray-700 rounded-lg'
						>
							<button
								onClick={() => toggleSection(section.id)}
								className='w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
							>
								<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
									{section.title}
								</h3>
								{expandedSections.has(section.id) ? (
									<ChevronUp className='w-5 h-5 text-gray-500' />
								) : (
									<ChevronDown className='w-5 h-5 text-gray-500' />
								)}
							</button>
							{expandedSections.has(section.id) && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.3 }}
									className='px-6 pb-4'
								>
									<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
										{section.content}
									</p>
								</motion.div>
							)}
						</div>
					))}
				</div>
			</div>

			{/* FAQ Section */}
			<div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8'>
				<h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
					{t('faq.title')}
				</h2>
				<div className='space-y-4'>
					{Array.isArray(t.raw('faqItems'))
						? t.raw('faqItems').map((faq: any, index: number) => (
								<div
									key={index}
									className='border border-gray-200 dark:border-gray-700 rounded-lg'
								>
									<button
										onClick={() =>
											toggleSection(`faq-${index}`)
										}
										className='w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
									>
										<h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
											{faq.q}
										</h3>
										{expandedSections.has(
											`faq-${index}`
										) ? (
											<ChevronUp className='w-5 h-5 text-gray-500' />
										) : (
											<ChevronDown className='w-5 h-5 text-gray-500' />
										)}
									</button>
									{expandedSections.has(`faq-${index}`) && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{
												opacity: 1,
												height: 'auto',
											}}
											exit={{ opacity: 0, height: 0 }}
											transition={{ duration: 0.3 }}
											className='px-6 pb-4'
										>
											<p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
												{faq.a}
											</p>
										</motion.div>
									)}
								</div>
						  ))
						: null}
				</div>
			</div>
		</div>
	);
}
