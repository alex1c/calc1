import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

// Configure Inter font with support for all languages used on the site
// fallback to system fonts if Google Fonts fails to load during build
const inter = Inter({
	subsets: ['latin', 'cyrillic', 'latin-ext'], // Support Russian, English, and other European languages
	display: 'swap', // Show fallback font while Inter loads for better performance
	preload: true, // Preload font for faster rendering
	variable: '--font-inter', // CSS variable for custom usage
	fallback: [
		'system-ui',
		'-apple-system',
		'BlinkMacSystemFont',
		'Segoe UI',
		'Roboto',
		'sans-serif',
	], // Fallback fonts
});

export const metadata: Metadata = {
	manifest: '/manifest.json',
	icons: {
		icon: [
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		shortcut: '/favicon.ico',
		apple: '/apple-touch-icon.png',
	},
	verification: {
		google: 'n1vw1VAXAqkdrR3O3KU2h3klhaO8KqrQefEtvWYi8RU',
		yandex: 'ae0a3b638a5ae1ab',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='ru'
			suppressHydrationWarning
		>
			<head>
				{/* Google Search Console verification */}
				<meta
					name='google-site-verification'
					content='n1vw1VAXAqkdrR3O3KU2h3klhaO8KqrQefEtvWYi8RU'
				/>
				{/* Yandex Webmaster verification */}
				<meta
					name='yandex-verification'
					content='ae0a3b638a5ae1ab'
				/>
				{/* Preconnect to Google Fonts for better performance */}
				<link
					rel='preconnect'
					href='https://fonts.googleapis.com'
				/>
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='anonymous'
				/>
				{/* Preconnect to external resources for better performance */}
				<link
					rel='preconnect'
					href='https://mc.yandex.ru'
				/>
				<link
					rel='dns-prefetch'
					href='https://mc.yandex.ru'
				/>
			</head>
			<body
				className={`${inter.className} ${inter.variable}`}
				suppressHydrationWarning
			>
				{children}

				{/* Organization Schema - Global structured data */}
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'Organization',
							name: 'Calc1.ru',
							url: 'https://calc1.ru',
							logo: 'https://calc1.ru/logo.png',
							description:
								'Более 100 бесплатных онлайн калькуляторов: финансовые, математические, строительные, медицинские, конвертеры единиц измерения и многое другое',
							sameAs: [
								// Add your social media profiles here when available
								// 'https://twitter.com/calc1ru',
								// 'https://facebook.com/calc1ru',
								// 'https://vk.com/calc1ru',
							],
							contactPoint: {
								'@type': 'ContactPoint',
								contactType: 'customer service',
								email: 'support@calc1.ru',
								availableLanguage: [
									'Russian',
									'English',
									'German',
									'Spanish',
									'French',
									'Italian',
									'Polish',
									'Turkish',
									'Portuguese',
								],
							},
							address: {
								'@type': 'PostalAddress',
								addressCountry: 'RU',
							},
						}),
					}}
				/>

				{/* Yandex.Metrika counter */}
				<Script
					id='yandex-metrika'
					strategy='afterInteractive'
					dangerouslySetInnerHTML={{
						__html: `
							(function(m,e,t,r,i,k,a){
								m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
								m[i].l=1*new Date();
								for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
								k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
							})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=105184285', 'ym');

							ym(105184285, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
						`,
					}}
				/>
				<noscript>
					<div>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src='https://mc.yandex.ru/watch/105184285'
							style={{ position: 'absolute', left: '-9999px' }}
							alt=''
						/>
					</div>
				</noscript>
			</body>
		</html>
	);
}
