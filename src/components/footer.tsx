'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	Calculator,
	Facebook,
	Twitter,
	Share2,
	Mail,
	Link2,
	MessageCircle,
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
	const t = useTranslations();
	const locale = useLocale();
	const pathname = usePathname();
	const [copySuccess, setCopySuccess] = useState(false);
	const [currentUrl, setCurrentUrl] = useState('');
	const [pageTitle, setPageTitle] = useState('Calc1.ru — Онлайн калькуляторы');
	const [hasNativeShare, setHasNativeShare] = useState(false);

	// Get current page URL and title (client-side only)
	useEffect(() => {
		if (typeof window !== 'undefined') {
			setCurrentUrl(window.location.href);
			setPageTitle(document.title || 'Calc1.ru — Онлайн калькуляторы');
			setHasNativeShare('share' in navigator);
		} else {
			setCurrentUrl(`https://calc1.ru${pathname}`);
		}
	}, [pathname]);

	// Copy URL to clipboard
	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(currentUrl);
			setCopySuccess(true);
			setTimeout(() => setCopySuccess(false), 2000);
		} catch (err) {
			console.error('Failed to copy URL:', err);
		}
	};

	// Share functions for different platforms
	const shareToFacebook = () => {
		const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
		window.open(url, '_blank', 'width=600,height=400');
	};

	const shareToTwitter = () => {
		const text = encodeURIComponent(pageTitle);
		const url = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(currentUrl)}`;
		window.open(url, '_blank', 'width=600,height=400');
	};

	const shareToVK = () => {
		const url = `https://vk.com/share.php?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(pageTitle)}`;
		window.open(url, '_blank', 'width=600,height=400');
	};

	const shareToTelegram = () => {
		const url = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(pageTitle)}`;
		window.open(url, '_blank', 'width=600,height=400');
	};

	const shareToWhatsApp = () => {
		const url = `https://wa.me/?text=${encodeURIComponent(pageTitle + ' ' + currentUrl)}`;
		window.open(url, '_blank');
	};

	const shareToEmail = () => {
		const subject = encodeURIComponent(pageTitle);
		const body = encodeURIComponent(
			`${pageTitle}\n\n${currentUrl}\n\nПоделитесь этим калькулятором с друзьями!`
		);
		window.location.href = `mailto:?subject=${subject}&body=${body}`;
	};

	// Native Web Share API (if available)
	const handleNativeShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: pageTitle,
					url: currentUrl,
				});
			} catch (err) {
				// User cancelled or error occurred
				console.log('Share cancelled');
			}
		}
	};

	const categories = [
		{ id: 'finance', name: t('navigation.finance') || 'Финансы' },
		{ id: 'auto', name: t('navigation.auto') || 'Авто' },
		{ id: 'math', name: t('navigation.math') || 'Математика' },
		{ id: 'life', name: t('navigation.life') || 'Быт' },
		{ id: 'construction', name: t('navigation.construction') || 'Строительство' },
		{ id: 'health', name: t('navigation.health') || 'Здоровье' },
		{ id: 'time', name: t('navigation.time') || 'Время' },
		{ id: 'converter', name: t('navigation.converter') || 'Конвертеры' },
		{ id: 'fun', name: t('navigation.fun') || 'Развлечения' },
		{ id: 'it', name: t('navigation.it') || 'IT' },
		{ id: 'science', name: t('navigation.science') || 'Наука' },
	];

	return (
		<footer className='bg-gray-900 dark:bg-gray-950 text-gray-300 mt-auto'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
					{/* Brand Section */}
					<div className='col-span-1 lg:col-span-1'>
						<Link
							href={`/${locale}`}
							className='flex items-center space-x-2 mb-4'
						>
							<Calculator className='h-8 w-8 text-blue-500' />
							<div>
								<h3 className='text-xl font-bold text-white'>
									{t('brand.name') || 'Calc1.ru'}
								</h3>
								<p className='text-sm text-gray-400'>
									{t('brand.slogan') || 'Один сайт. Все калькуляторы.'}
								</p>
							</div>
						</Link>
						<p className='text-sm text-gray-400 mb-4'>
							{t('footer.description') ||
								'Бесплатные онлайн калькуляторы для всех сфер жизни. Финансы, математика, строительство, здоровье и многое другое.'}
						</p>
					</div>

					{/* Categories */}
					<div>
						<h4 className='text-lg font-semibold text-white mb-4'>
							{t('footer.categories') || 'Категории'}
						</h4>
						<ul className='space-y-2'>
							{categories.map((category) => (
								<li key={category.id}>
									<Link
										href={`/${locale}/${category.id}`}
										className='text-gray-400 hover:text-white transition-colors text-sm'
									>
										{category.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className='text-lg font-semibold text-white mb-4'>
							{t('footer.quickLinks') || 'Быстрые ссылки'}
						</h4>
						<ul className='space-y-2'>
							<li>
								<Link
									href={`/${locale}`}
									className='text-gray-400 hover:text-white transition-colors text-sm'
								>
									{t('navigation.home') || 'Главная'}
								</Link>
							</li>
							<li>
								<Link
									href={`/${locale}/search`}
									className='text-gray-400 hover:text-white transition-colors text-sm'
								>
									{t('common.search') || 'Поиск'}
								</Link>
							</li>
							<li>
								<Link
									href={`/${locale}/about`}
									className='text-gray-400 hover:text-white transition-colors text-sm'
								>
									{t('footer.about') || 'О сайте'}
								</Link>
							</li>
							<li>
								<Link
									href={`/${locale}/contact`}
									className='text-gray-400 hover:text-white transition-colors text-sm'
								>
									{t('footer.contact') || 'Контакты'}
								</Link>
							</li>
							<li>
								<Link
									href={`/${locale}/cookies`}
									className='text-gray-400 hover:text-white transition-colors text-sm'
								>
									{t('footer.cookies') || 'Политика cookie'}
								</Link>
							</li>
						</ul>
					</div>

					{/* Share Section - SEO Optimized */}
					<div>
						<h4 className='text-lg font-semibold text-white mb-4 flex items-center'>
							<Share2 className='h-5 w-5 mr-2' />
							{t('footer.share') || 'Поделиться'}
						</h4>
						<p className='text-sm text-gray-400 mb-4'>
							{t('footer.shareDescription') ||
								'Поделитесь калькулятором с друзьями и коллегами!'}
						</p>

						{/* Share Buttons Grid */}
						<div className='grid grid-cols-2 gap-2 mb-4'>
							{/* Facebook */}
							<button
								onClick={shareToFacebook}
								aria-label={t('footer.shareFacebook') || 'Поделиться в Facebook'}
								className='flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white text-sm'
							>
								<Facebook className='h-4 w-4 mr-1' />
								<span className='hidden sm:inline'>Facebook</span>
							</button>

							{/* Twitter */}
							<button
								onClick={shareToTwitter}
								aria-label={t('footer.shareTwitter') || 'Поделиться в Twitter'}
								className='flex items-center justify-center px-3 py-2 bg-sky-500 hover:bg-sky-600 rounded-lg transition-colors text-white text-sm'
							>
								<Twitter className='h-4 w-4 mr-1' />
								<span className='hidden sm:inline'>Twitter</span>
							</button>

							{/* VK */}
							<button
								onClick={shareToVK}
								aria-label={t('footer.shareVK') || 'Поделиться ВКонтакте'}
								className='flex items-center justify-center px-3 py-2 bg-[#0077FF] hover:bg-[#0066DD] rounded-lg transition-colors text-white text-sm'
							>
								<MessageCircle className='h-4 w-4 mr-1' />
								<span className='hidden sm:inline'>VK</span>
							</button>

							{/* Telegram */}
							<button
								onClick={shareToTelegram}
								aria-label={t('footer.shareTelegram') || 'Поделиться в Telegram'}
								className='flex items-center justify-center px-3 py-2 bg-[#0088cc] hover:bg-[#0077bb] rounded-lg transition-colors text-white text-sm'
							>
								<MessageCircle className='h-4 w-4 mr-1' />
								<span className='hidden sm:inline'>Telegram</span>
							</button>

							{/* WhatsApp */}
							<button
								onClick={shareToWhatsApp}
								aria-label={t('footer.shareWhatsApp') || 'Поделиться в WhatsApp'}
								className='flex items-center justify-center px-3 py-2 bg-[#25D366] hover:bg-[#20BA5A] rounded-lg transition-colors text-white text-sm'
							>
								<MessageCircle className='h-4 w-4 mr-1' />
								<span className='hidden sm:inline'>WhatsApp</span>
							</button>

							{/* Email */}
							<button
								onClick={shareToEmail}
								aria-label={t('footer.shareEmail') || 'Поделиться по email'}
								className='flex items-center justify-center px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-white text-sm'
							>
								<Mail className='h-4 w-4 mr-1' />
								<span className='hidden sm:inline'>Email</span>
							</button>
						</div>

						{/* Copy Link */}
						<button
							onClick={handleCopyLink}
							className='w-full flex items-center justify-center px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-white text-sm border border-gray-700'
						>
							{copySuccess ? (
								<>
									<Link2 className='h-4 w-4 mr-2' />
									{t('footer.linkCopied') || 'Ссылка скопирована!'}
								</>
							) : (
								<>
									<Link2 className='h-4 w-4 mr-2' />
									{t('footer.copyLink') || 'Копировать ссылку'}
								</>
							)}
						</button>

						{/* Native Share (mobile) */}
						{hasNativeShare && (
							<button
								onClick={handleNativeShare}
								className='w-full mt-2 flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white text-sm'
								aria-label={t('footer.shareNative') || 'Поделиться'}
							>
								<Share2 className='h-4 w-4 mr-2' />
								{t('footer.shareNative') || 'Поделиться'}
							</button>
						)}
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='border-t border-gray-800 pt-8 mt-8'>
					<div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
						<div className='text-sm text-gray-400 text-center md:text-left'>
							<p>
								© {new Date().getFullYear()} Calc1.ru.{' '}
								{t('footer.rights') || 'Все права защищены.'}
							</p>
							<p className='mt-1'>
								{t('footer.disclaimer') ||
									'Калькуляторы предназначены для информационных целей. Результаты могут отличаться от фактических значений.'}
							</p>
						</div>
						<div className='flex flex-wrap gap-4 text-sm'>
							<Link
								href={`/${locale}/privacy`}
								className='text-gray-400 hover:text-white transition-colors'
							>
								{t('footer.privacy') || 'Политика конфиденциальности'}
							</Link>
							<Link
								href={`/${locale}/terms`}
								className='text-gray-400 hover:text-white transition-colors'
							>
								{t('footer.terms') || 'Условия использования'}
							</Link>
							<Link
								href={`/${locale}/cookies`}
								className='text-gray-400 hover:text-white transition-colors'
							>
								{t('footer.cookies') || 'Политика cookie'}
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Structured Data for Social Media Sharing - SEO Optimized */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebSite',
						name: 'Calc1.ru',
						alternateName: 'Калькулятор #1',
						url: 'https://calc1.ru',
						description:
							t('footer.siteDescription') ||
							'Бесплатные онлайн калькуляторы для всех сфер жизни',
						inLanguage: locale,
						publisher: {
							'@type': 'Organization',
							name: 'Calc1.ru',
							url: 'https://calc1.ru',
							logo: {
								'@type': 'ImageObject',
								url: 'https://calc1.ru/logo.png',
							},
						},
						potentialAction: {
							'@type': 'SearchAction',
							target: {
								'@type': 'EntryPoint',
								urlTemplate: `https://calc1.ru/${locale}/search?q={search_term_string}`,
							},
							'query-input': 'required name=search_term_string',
						},
						sameAs: [
							'https://www.facebook.com/calc1ru',
							'https://twitter.com/calc1ru',
							'https://vk.com/calc1ru',
							'https://t.me/calc1ru',
						],
					}),
				}}
			/>
		</footer>
	);
}

