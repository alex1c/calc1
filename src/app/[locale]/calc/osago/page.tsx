import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import OsagoCalculator from '@/components/calculators/osago-calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'OSAGO Calculator | Калькулятор #1',
	description:
		'Calculate OSAGO insurance cost based on region, engine power, driver age and experience, and other factors.',
	keywords:
		'калькулятор ОСАГО, расчёт ОСАГО, стоимость ОСАГО, страхование ОСАГО, КБМ, коэффициент бонус-малус',
};

export default function OsagoPage() {
	const t = useTranslations();
	const locale = useLocale();

	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{
						label: t('categories.auto.title'),
						href: `/${locale}/auto`,
					},
					{ label: t('calculators.osago.title') },
				]}
			/>
			<OsagoCalculator />
		</div>
	);
}
