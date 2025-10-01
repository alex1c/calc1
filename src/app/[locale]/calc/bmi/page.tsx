import { useTranslations } from 'next-intl';
import Header from '@/components/header';
import Breadcrumbs from '@/components/breadcrumbs';
import BMICalculator from '@/components/calculators/bmi-calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'BMI Calculator | Calc1',
	description:
		'Calculate your Body Mass Index (BMI) to assess your weight status and health.',
	keywords:
		'BMI calculator, body mass index, normal weight, health calculator',
};

export default function BMIPage() {
	return (
		<div className='min-h-screen bg-gray-50'>
			<Header />
			<Breadcrumbs
				items={[
					{ label: 'Здоровье', href: '/health' },
					{ label: 'Калькулятор ИМТ' },
				]}
			/>
			<BMICalculator />
		</div>
	);
}
