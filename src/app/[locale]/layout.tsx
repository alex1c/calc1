import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Footer from '@/components/footer';

const locales = ['ru', 'en', 'de', 'es', 'fr', 'it', 'pl', 'tr', 'pt-BR'];

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	// Validate that the incoming `locale` parameter is valid
	if (!locales.includes(locale)) {
		notFound();
	}

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages();

	return (
		<>
			{/* Update HTML lang attribute dynamically based on locale */}
			<script
				dangerouslySetInnerHTML={{
					__html: `document.documentElement.lang = '${locale}';`,
				}}
			/>
			<NextIntlClientProvider messages={messages}>
				<div className='flex flex-col min-h-screen'>
					{children}
					<Footer />
				</div>
			</NextIntlClientProvider>
		</>
	);
}
