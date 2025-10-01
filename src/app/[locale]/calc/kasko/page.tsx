import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import KaskoCalculator from '@/components/calculators/kasko-calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'KASKO Calculator | Калькулятор #1',
	description:
		'Calculate KASKO comprehensive auto insurance cost based on car value, driver age, experience, region and other factors.',
	keywords:
		'калькулятор КАСКО, расчёт КАСКО, стоимость КАСКО, страхование КАСКО, полное КАСКО, автострахование',
};

export default function KaskoPage() {
	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{ label: 'Авто', href: '/auto' },
					{ label: 'Калькулятор КАСКО' },
				]}
			/>
			<KaskoCalculator />
		</div>
	);
}
