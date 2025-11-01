import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Home, Search, Calculator } from 'lucide-react';
import Header from '@/components/header';

export default async function NotFound() {
	const t = await getTranslations('common');

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
			<Header />
			<main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<div className='text-center'>
					{/* 404 Icon */}
					<div className='mb-8 flex justify-center'>
						<div className='relative'>
							<Calculator className='h-32 w-32 text-gray-300 dark:text-gray-600' />
							<div className='absolute inset-0 flex items-center justify-center'>
								<span className='text-6xl font-bold text-gray-400 dark:text-gray-500'>
									404
								</span>
							</div>
						</div>
					</div>

					{/* Error Message */}
					<h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
						{t('notFound.title') || 'Страница не найдена'}
					</h1>
					<p className='text-xl text-gray-600 dark:text-gray-400 mb-8'>
						{t('notFound.description') ||
							'Извините, запрашиваемая страница не существует.'}
					</p>

					{/* Actions */}
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
						<Link
							href='/'
							className='inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
						>
							<Home className='h-5 w-5 mr-2' />
							{t('notFound.goHome') || 'На главную'}
						</Link>
						<Link
							href='/search'
							className='inline-flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
						>
							<Search className='h-5 w-5 mr-2' />
							{t('search') || 'Поиск калькуляторов'}
						</Link>
					</div>

					{/* Suggestions */}
					<div className='mt-12 text-left max-w-2xl mx-auto'>
						<h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
							{t('notFound.suggestions.title') ||
								'Возможно, вы искали:'}
						</h2>
						<ul className='space-y-2 text-gray-600 dark:text-gray-400'>
							<li>
								•{' '}
								{t('notFound.suggestions.checkUrl') ||
									'Проверьте правильность введённого адреса'}
							</li>
							<li>
								•{' '}
								{t('notFound.suggestions.useSearch') ||
									'Воспользуйтесь поиском калькуляторов'}
							</li>
							<li>
								•{' '}
								{t('notFound.suggestions.goToHome') ||
									'Вернитесь на главную страницу'}
							</li>
						</ul>
					</div>
				</div>
			</main>
		</div>
	);
}

