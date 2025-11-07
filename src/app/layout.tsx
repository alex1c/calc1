import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
		yandex: 'ae0a3b638a5ae1ab',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<body className={inter.className}>
				{children}
				
				{/* Yandex.Metrika counter */}
				<Script
					id="yandex-metrika"
					strategy="afterInteractive"
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
						<img
							src="https://mc.yandex.ru/watch/105184285"
							style={{ position: 'absolute', left: '-9999px' }}
							alt=""
						/>
					</div>
				</noscript>
			</body>
		</html>
	);
}
