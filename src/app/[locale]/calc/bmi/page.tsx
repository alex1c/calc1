import { useTranslations } from 'next-intl';
import Header from '@/components/header';
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
			<BMICalculator />
		</div>
	);
}





